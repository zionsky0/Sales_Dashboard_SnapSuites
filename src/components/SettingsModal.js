import { SUPABASE_CONFIG } from '../config/supabase.js';

export function renderSettingsModal(settings) {
  const activeUrl = settings.supabaseUrl || SUPABASE_CONFIG.projectUrl || 'https://yokejsxbmoffrskbrdnl.supabase.co';
  const activeKey = settings.supabaseKey || SUPABASE_CONFIG.anonKey || '';
  const isCloudActive = !!activeKey;

  return `
    <div class="modal-overlay active" id="settings-modal-overlay">
      <div class="modal-container" style="max-width: 520px;">
        <div class="modal-header">
          <h3 class="modal-title">⚙️ Sales Rep & Security Settings</h3>
          <button class="modal-close-btn" id="btn-close-settings-modal">&times;</button>
        </div>

        <form id="settings-form" class="modal-body">
          <div class="form-group">
            <label class="form-label">Sales Representative Name</label>
            <input type="text" id="settings-rep-name" class="form-control" value="${settings.salesRepName || 'Sales Representative'}" required />
          </div>

          <div class="form-group">
            <label class="form-label">Monthly Sales Revenue Target (£)</label>
            <input type="number" id="settings-monthly-target" class="form-control" value="${settings.monthlyTarget || 3000}" required step="100" min="500" />
          </div>

          <div class="form-group">
            <label class="form-label">Default Commission Rate (%)</label>
            <input type="number" id="settings-commission-rate" class="form-control" value="${settings.defaultCommissionRate || 10}" required step="0.5" min="1" max="50" />
          </div>

          <div style="border-top: 1px solid var(--border-light); padding-top: 16px; margin-top: 4px;">
            <div style="font-size: 13px; font-weight: 700; color: var(--gold-light); margin-bottom: 8px;">🔐 Portal Access Credentials</div>
            <div class="form-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
              <div class="form-group">
                <label class="form-label" style="font-size: 11px;">Update Username</label>
                <input type="text" id="settings-new-username" class="form-control" placeholder="Current: snapsuites" />
              </div>
              <div class="form-group">
                <label class="form-label" style="font-size: 11px;">Update Password</label>
                <input type="password" id="settings-new-password" class="form-control" placeholder="New password" />
              </div>
            </div>
          </div>

          <!-- Cloud Sync Section (Supabase / Self-Hosted) -->
          <div style="border-top: 1px solid var(--border-light); padding-top: 16px; margin-top: 4px; display: flex; flex-direction: column; gap: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div style="font-size: 13px; font-weight: 700; color: var(--gold-light); display: flex; align-items: center; gap: 6px;">
                <span>⚡ 24/7 Cloud Sync (Supabase)</span>
              </div>
              <span id="supabase-status-badge" class="badge" style="background: ${isCloudActive ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.06)'}; color: ${isCloudActive ? 'var(--accent-success)' : 'var(--text-muted)'}; font-size: 10px;">
                ${isCloudActive ? '● 24/7 Cloud Active' : '○ Local Storage Only'}
              </span>
            </div>

            ${isCloudActive ? `
              <div style="background: rgba(16,185,129,0.12); border: 1px solid rgba(16,185,129,0.3); border-radius: 8px; padding: 10px 12px; font-size: 12px; color: #6EE7B7; display: flex; align-items: center; gap: 8px;">
                <span>☁️</span>
                <div><strong>Global Cloud Sync Active:</strong> All leads, quotes, and venues are synced across all devices and sales reps in real time.</div>
              </div>
            ` : `
              <div style="background: rgba(245,158,11,0.12); border: 1px solid rgba(245,158,11,0.3); border-radius: 8px; padding: 10px 12px; font-size: 12px; color: #FCD34D; display: flex; align-items: center; gap: 8px;">
                <span>⚠️</span>
                <div><strong>Cloud Key Needed:</strong> Add your Supabase Anon API key below (or in <code>src/config/supabase.js</code>) to enable cross-device sync.</div>
              </div>
            `}

            <div class="form-group">
              <label class="form-label" style="font-size: 11px;">Supabase Project URL</label>
              <input 
                type="text" 
                id="settings-supabase-url" 
                class="form-control" 
                value="${activeUrl}" 
                placeholder="https://yokejsxbmoffrskbrdnl.supabase.co" 
              />
            </div>

            <div class="form-group">
              <label class="form-label" style="font-size: 11px;">Supabase Anon API Key</label>
              <input 
                type="password" 
                id="settings-supabase-key" 
                class="form-control" 
                value="${activeKey}" 
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." 
              />
            </div>

            <div style="display: flex; gap: 8px; align-items: center;">
              <button type="button" class="btn btn-gold btn-sm" id="btn-test-supabase-connection" style="flex: 1;">
                ⚡ Test & Sync Supabase Now
              </button>
            </div>
            
            <div id="supabase-test-result" style="font-size: 12px; display: none; padding: 10px 12px; border-radius: 8px;"></div>

            <!-- 1-Click SQL Copy Accordion -->
            <details style="background: rgba(0,0,0,0.3); border: 1px solid var(--border-light); border-radius: 8px; padding: 8px 12px; font-size: 11px;">
              <summary style="cursor: pointer; color: var(--gold-light); font-weight: 600; user-select: none;">
                📋 1-Click Database Table SQL (Paste in Supabase SQL Editor)
              </summary>
              <div style="margin-top: 8px;">
                <pre style="background: #0A0C10; padding: 8px; border-radius: 6px; color: #A7F3D0; overflow-x: auto; font-family: monospace; font-size: 11px;">create table if not exists snapsuites_data (
  id text primary key,
  data jsonb not null,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

alter table snapsuites_data enable row level security;
create policy "Allow all operations" on snapsuites_data for all using (true) with check (true);</pre>
                <button type="button" class="btn btn-glass btn-sm" id="btn-copy-supabase-sql" style="width: 100%; margin-top: 6px; font-size: 11px;">
                  📋 Copy SQL Code
                </button>
              </div>
            </details>
          </div>

          <div style="border-top: 1px solid var(--border-light); padding-top: 16px; margin-top: 4px;">
            <div style="font-size: 13px; font-weight: 700; color: var(--gold-light); margin-bottom: 8px;">Data & Backup Tools</div>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              <button type="button" class="btn btn-glass btn-sm" id="btn-reset-demo-data">
                🔄 Reset to Demo Data
              </button>
              <button type="button" class="btn btn-glass btn-sm" id="btn-export-csv-settings">
                📄 Export Leads CSV
              </button>
            </div>
          </div>

          <div class="modal-footer" style="padding: 0; margin-top: 12px;">
            <button type="button" class="btn btn-glass" id="btn-cancel-settings">Cancel</button>
            <button type="submit" class="btn btn-gold">💾 Save Settings</button>
          </div>
        </form>
      </div>
    </div>
  `;
}
