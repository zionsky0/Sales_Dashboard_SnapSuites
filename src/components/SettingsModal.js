export function renderSettingsModal(settings) {
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
            <label class="form-label">Default Sales Commission Rate (%)</label>
            <input type="number" id="settings-commission-rate" class="form-control" value="${settings.defaultCommissionRate || 10}" required step="0.5" min="1" max="50" />
            <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">
              E.g., 10% commission on a £350 Birthday booking = £35 payout.
            </div>
          </div>

          <!-- Password & Security Section -->
          <div style="border-top: 1px solid var(--border-light); padding-top: 16px; margin-top: 4px; display: flex; flex-direction: column; gap: 10px;">
            <div style="font-size: 13px; font-weight: 700; color: var(--gold-light); display: flex; align-items: center; gap: 6px;">
              <span>🔐 Access Security & Password</span>
            </div>
            
            <div class="form-group">
              <label class="form-label" style="font-size: 11px;">Change Login Username</label>
              <input type="text" id="settings-new-username" class="form-control" placeholder="Leave blank to keep current" />
            </div>

            <div class="form-group">
              <label class="form-label" style="font-size: 11px;">Change Login Password</label>
              <input type="password" id="settings-new-password" class="form-control" placeholder="Enter new master password" />
              <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">
                You can also configure <code>VITE_AUTH_USERNAME</code> and <code>VITE_AUTH_PASSWORD</code> in Vercel.
              </div>
            </div>
          </div>

          <div style="border-top: 1px solid var(--border-light); padding-top: 16px; margin-top: 4px;">
            <div style="font-size: 13px; font-weight: 700; color: var(--gold-light); margin-bottom: 8px;">Data & Backup Tools</div>
            <div style="display: flex; gap: 8px;">
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
