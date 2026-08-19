import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3001;
const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'sales_hub_db.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial DB template
function getInitialDb() {
  return {
    version: '2.0.0',
    lastUpdated: new Date().toISOString(),
    leads: [],
    prospects: [],
    directory: [],
    socialPosts: [],
    settings: {
      salesRepName: 'Sales Representative',
      monthlyTarget: 3000,
      defaultCommissionRate: 10,
      currencySymbol: '£'
    }
  };
}

// Read database
function readDb() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      const initial = getInitialDb();
      fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2), 'utf-8');
      return initial;
    }
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('[SnapSuites Server] Error reading DB file:', err.message);
    return getInitialDb();
  }
}

// Write database atomically
function writeDb(data) {
  try {
    data.lastUpdated = new Date().toISOString();
    const tempFile = `${DB_FILE}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(tempFile, DB_FILE);
    return true;
  } catch (err) {
    console.error('[SnapSuites Server] Error writing DB file:', err.message);
    return false;
  }
}

// CORS & Response Helpers
function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-sync-key');
}

function sendJson(res, statusCode, data) {
  setCorsHeaders(res);
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

// Parse incoming JSON body
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
      if (body.length > 20 * 1024 * 1024) { // 20MB limit
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      if (!body.trim()) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(new Error('Invalid JSON'));
      }
    });
    req.on('error', reject);
  });
}

// Create HTTP Server
const server = http.createServer(async (req, res) => {
  setCorsHeaders(res);

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = url.pathname;

  console.log(`[SnapSuites Server] ${req.method} ${pathname}`);

  // Health check endpoint
  if (pathname === '/api/health' && req.method === 'GET') {
    const db = readDb();
    sendJson(res, 200, {
      status: 'ok',
      service: 'SnapSuites Self-Hosted Sync Engine',
      port: PORT,
      leadsCount: (db.leads || []).length,
      prospectsCount: (db.prospects || []).length,
      directoryCount: (db.directory || []).length,
      lastUpdated: db.lastUpdated,
      serverTime: new Date().toISOString()
    });
    return;
  }

  // Full Database Sync (GET: Fetch all, POST: Push update)
  if (pathname === '/api/sync') {
    if (req.method === 'GET') {
      const db = readDb();
      sendJson(res, 200, {
        success: true,
        data: db
      });
      return;
    }

    if (req.method === 'POST') {
      try {
        const payload = await parseBody(req);
        const currentDb = readDb();

        const updatedDb = {
          ...currentDb,
          version: '2.0.0',
          leads: Array.isArray(payload.leads) ? payload.leads : currentDb.leads,
          prospects: Array.isArray(payload.prospects) ? payload.prospects : currentDb.prospects,
          directory: Array.isArray(payload.directory) && payload.directory.length ? payload.directory : currentDb.directory,
          socialPosts: Array.isArray(payload.socialPosts) ? payload.socialPosts : currentDb.socialPosts,
          settings: payload.settings ? { ...currentDb.settings, ...payload.settings } : currentDb.settings
        };

        const success = writeDb(updatedDb);
        if (success) {
          sendJson(res, 200, {
            success: true,
            message: 'Database synced successfully',
            lastUpdated: updatedDb.lastUpdated,
            leadsCount: updatedDb.leads.length
          });
        } else {
          sendJson(res, 500, { success: false, message: 'Failed to write to database' });
        }
      } catch (err) {
        sendJson(res, 400, { success: false, message: err.message });
      }
      return;
    }
  }

  // Leads Endpoint
  if (pathname === '/api/leads') {
    if (req.method === 'GET') {
      const db = readDb();
      sendJson(res, 200, { success: true, leads: db.leads || [] });
      return;
    }

    if (req.method === 'POST') {
      try {
        const payload = await parseBody(req);
        const db = readDb();
        const leads = Array.isArray(payload.leads) ? payload.leads : (payload ? [payload] : db.leads);
        db.leads = leads;
        writeDb(db);
        sendJson(res, 200, { success: true, leads: db.leads });
      } catch (err) {
        sendJson(res, 400, { success: false, message: err.message });
      }
      return;
    }
  }

  // Directory Endpoint
  if (pathname === '/api/directory') {
    if (req.method === 'GET') {
      const db = readDb();
      sendJson(res, 200, { success: true, directory: db.directory || [] });
      return;
    }

    if (req.method === 'POST') {
      try {
        const payload = await parseBody(req);
        const db = readDb();
        if (Array.isArray(payload)) {
          db.directory = payload;
        } else if (payload.directory) {
          db.directory = payload.directory;
        }
        writeDb(db);
        sendJson(res, 200, { success: true, directory: db.directory });
      } catch (err) {
        sendJson(res, 400, { success: false, message: err.message });
      }
      return;
    }
  }

  // Default 404
  sendJson(res, 404, { error: 'Endpoint not found' });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log('====================================================');
  console.log(`📸 SnapSuites Self-Hosted Sync Server is LIVE!`);
  console.log(`📡 Local Access URL:    http://localhost:${PORT}`);
  console.log(`🔗 Health Check:        http://localhost:${PORT}/api/health`);
  console.log(`🌐 Playit.gg Config:    Point your tunnel to port ${PORT}`);
  console.log(`💾 Database file:       ${DB_FILE}`);
  console.log('====================================================');
});
