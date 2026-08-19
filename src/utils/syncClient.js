/**
 * SnapSuites Sync Client (Playit.gg / Self-Hosted Server)
 * Enables seamless cross-device synchronization with your home server.
 */

import {
  getStoredLeads,
  getStoredProspects,
  getStoredDirectory,
  getStoredSettings,
  getStoredSocialPosts,
  saveLeads,
  saveProspects,
  saveDirectory,
  saveSettings,
  saveSocialPosts
} from './storage.js';

let isSyncing = false;
let syncStatusListener = null;

export function setSyncStatusListener(callback) {
  syncStatusListener = callback;
}

function notifyStatus(status, details = {}) {
  if (typeof syncStatusListener === 'function') {
    syncStatusListener({ status, ...details });
  }
}

/**
 * Clean URL format (strip trailing slash)
 */
export function normalizeServerUrl(rawUrl) {
  if (!rawUrl || typeof rawUrl !== 'string') return '';
  let url = rawUrl.trim();
  if (!url) return '';
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'https://' + url;
  }
  return url.replace(/\/+$/, '');
}

/**
 * Test connectivity to a server / tunnel URL
 */
export async function testServerConnection(serverUrl, syncKey = '') {
  const cleanUrl = normalizeServerUrl(serverUrl);
  if (!cleanUrl) {
    return { ok: false, message: 'Please enter a valid server or tunnel URL.' };
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 7000);

    const headers = { 'Content-Type': 'application/json' };
    if (syncKey) headers['x-sync-key'] = syncKey;

    const res = await fetch(`${cleanUrl}/api/health`, {
      method: 'GET',
      headers,
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      return { ok: false, message: `Server returned status ${res.status} (${res.statusText})` };
    }

    const data = await res.json();
    return {
      ok: true,
      message: `Connected! Server has ${data.leadsCount || 0} leads & ${data.directoryCount || 0} partners.`,
      data
    };
  } catch (err) {
    if (err.name === 'AbortError') {
      return { ok: false, message: 'Connection timed out (7s). Check that Playit.gg and server.js are running.' };
    }
    return { ok: false, message: `Connection failed: ${err.message}` };
  }
}

/**
 * Fetch latest state from server and update local storage
 */
export async function pullFromServer(serverUrl, syncKey = '') {
  const cleanUrl = normalizeServerUrl(serverUrl);
  if (!cleanUrl) return { success: false, message: 'No server URL configured' };

  try {
    notifyStatus('syncing', { direction: 'pull' });
    const headers = { 'Content-Type': 'application/json' };
    if (syncKey) headers['x-sync-key'] = syncKey;

    const res = await fetch(`${cleanUrl}/api/sync`, {
      method: 'GET',
      headers
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();

    if (json.success && json.data) {
      const { leads, prospects, directory, settings, socialPosts } = json.data;

      if (Array.isArray(leads)) saveLeads(leads, false);
      if (Array.isArray(prospects)) saveProspects(prospects, false);
      if (Array.isArray(directory) && directory.length) saveDirectory(directory, false);
      if (Array.isArray(socialPosts)) saveSocialPosts(socialPosts, false);
      if (settings && typeof settings === 'object') {
        const currentSettings = getStoredSettings();
        saveSettings({ ...currentSettings, ...settings, serverUrl: cleanUrl, syncKey }, false);
      }

      notifyStatus('online', { lastSync: new Date().toISOString() });
      return { success: true, data: json.data };
    }

    notifyStatus('error', { message: 'Invalid payload from server' });
    return { success: false, message: 'Invalid response from server' };
  } catch (err) {
    notifyStatus('offline', { error: err.message });
    return { success: false, message: err.message };
  }
}

/**
 * Push local changes to the server
 */
export async function pushToServer(serverUrl, syncKey = '', specificPayload = null) {
  const cleanUrl = normalizeServerUrl(serverUrl);
  if (!cleanUrl || isSyncing) return { success: false, message: 'Skipped' };

  try {
    isSyncing = true;
    notifyStatus('syncing', { direction: 'push' });

    const payload = specificPayload || {
      leads: getStoredLeads(),
      prospects: getStoredProspects(),
      directory: getStoredDirectory(),
      settings: getStoredSettings(),
      socialPosts: getStoredSocialPosts()
    };

    const headers = { 'Content-Type': 'application/json' };
    if (syncKey) headers['x-sync-key'] = syncKey;

    const res = await fetch(`${cleanUrl}/api/sync`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload)
    });

    isSyncing = false;

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();

    notifyStatus('online', { lastSync: new Date().toISOString() });
    return { success: true, message: json.message || 'Synced' };
  } catch (err) {
    isSyncing = false;
    notifyStatus('offline', { error: err.message });
    return { success: false, message: err.message };
  }
}

/**
 * Convenience helper to push whenever any local data changes
 */
export function triggerAutoPush() {
  const settings = getStoredSettings();
  if (settings.serverUrl) {
    // Debounce slightly to prevent rapid network spam
    clearTimeout(window.__syncDebounceTimer);
    window.__syncDebounceTimer = setTimeout(() => {
      pushToServer(settings.serverUrl, settings.syncKey);
    }, 400);
  }
}
