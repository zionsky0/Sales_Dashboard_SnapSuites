export function renderDirectorySyncModal(editingItem = null) {
  return `
    <div class="modal-overlay active" id="directory-sync-modal-overlay">
      <div class="modal-container" style="max-width: 680px;">
        <div class="modal-header">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 24px;">📊</span>
            <div>
              <h3 class="modal-title" style="font-size: 18px;">
                ${editingItem ? 'Edit Target Organization' : 'Google Sheet & Mailmerge Sync'}
              </h3>
              <div style="font-size: 12px; color: var(--text-muted);">
                Formatted for 1-click export to Google Sheets, Mailmeteor, and YAMM
              </div>
            </div>
          </div>
          <button class="modal-close-btn" id="btn-close-sync-modal">&times;</button>
        </div>

        <div class="modal-body" style="gap: 16px;">
          <!-- Mode Tabs -->
          <div style="display: flex; gap: 10px; border-bottom: 1px solid var(--border-light); padding-bottom: 10px;">
            <button class="btn btn-sm ${!editingItem ? 'btn-gold' : 'btn-glass'}" id="tab-add-single-partner">
              ➕ Add Single Partner
            </button>
            <button class="btn btn-sm btn-glass" id="tab-paste-sheet-data">
              📋 Paste Sheet Data / CSV
            </button>
          </div>

          <!-- Form 1: Single Partner Add/Edit -->
          <form id="form-single-partner" style="display: flex; flex-direction: column; gap: 12px;">
            <input type="hidden" id="partner-id" value="${editingItem?.id || ''}" />

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
              <div class="form-group">
                <label class="form-label" style="font-size: 11px;">Venue_Name / Company_Name *</label>
                <input type="text" id="partner-name" class="form-control" placeholder="e.g. Peckforton Castle / Julie Perry Events" required value="${editingItem?.name || ''}" />
              </div>

              <div class="form-group">
                <label class="form-label" style="font-size: 11px;">Category *</label>
                <input type="text" id="partner-category" class="form-control" placeholder="e.g. Luxury Venue / Wedding Planner / DJ" required value="${editingItem?.category || 'Luxury Venue'}" />
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
              <div class="form-group">
                <label class="form-label" style="font-size: 11px;">Contact_Name (Person / Team) *</label>
                <input type="text" id="partner-contact" class="form-control" placeholder="e.g. Wedding Coordinators / Events Team" required value="${editingItem?.contactName || 'Events Team'}" />
              </div>

              <div class="form-group">
                <label class="form-label" style="font-size: 11px;">Area / Location *</label>
                <input type="text" id="partner-area" class="form-control" placeholder="e.g. Knutsford, Cheshire" required value="${editingItem?.area || ''}" />
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
              <div class="form-group">
                <label class="form-label" style="font-size: 11px;">Email Address (For Mailmerge) *</label>
                <input type="email" id="partner-email" class="form-control" placeholder="enquiries@colshawhall.com" required value="${editingItem?.email || ''}" />
              </div>

              <div class="form-group">
                <label class="form-label" style="font-size: 11px;">Phone Number *</label>
                <input type="text" id="partner-phone" class="form-control" placeholder="01565 724060" required value="${editingItem?.phone || ''}" />
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 12px;">
              <div class="form-group">
                <label class="form-label" style="font-size: 11px;">Booth_Style (Fits into {{Booth_Style}} tag) *</label>
                <input type="text" id="partner-angle" class="form-control" placeholder="e.g. Vintage Handcrafted Booth or Glam Pod" required value="${editingItem?.boothStyle || editingItem?.bestAngle || 'Vintage Handcrafted Booth'}" />
              </div>

              <div class="form-group">
                <label class="form-label" style="font-size: 11px;">Roadmap Week</label>
                <select id="partner-week" class="form-control">
                  <option value="Week 1" ${editingItem?.targetWeek === 'Week 1' ? 'selected' : ''}>Week 1: Venues</option>
                  <option value="Week 2" ${editingItem?.targetWeek === 'Week 2' ? 'selected' : ''}>Week 2: Planners & DJs</option>
                  <option value="Week 3" ${editingItem?.targetWeek === 'Week 3' ? 'selected' : ''}>Week 3: PR Agencies</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" style="font-size: 11px;">Outreach Notes</label>
              <textarea id="partner-notes" class="form-control" rows="2" placeholder="e.g. Fully £5M PLI insured & PAT tested recommended supplier pitch...">${editingItem?.notes || ''}</textarea>
            </div>

            <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 6px;">
              <button type="button" class="btn btn-glass" id="btn-cancel-sync-modal">Cancel</button>
              <button type="submit" class="btn btn-gold" style="font-weight: 700;">
                💾 Save to Target Directory
              </button>
            </div>
          </form>

          <!-- Form 2: Bulk CSV / Sheet Paste (Hidden by default) -->
          <div id="form-bulk-sheet" style="display: none; flex-direction: column; gap: 12px;">
            <div style="font-size: 13px; color: var(--text-muted); line-height: 1.4;">
              Paste rows from your Google Sheet or CSV below (Columns: <code>Email, Venue_Name, Company_Name, Contact_Name, Booth_Style, Category, Area, Phone</code>):
            </div>

            <textarea id="bulk-csv-input" class="form-control" rows="8" style="font-family: monospace; font-size: 12px;" placeholder="Email, Venue_Name, Company_Name, Contact_Name, Booth_Style, Category, Area, Phone
enquiries@colshawhall.com, Colshaw Hall, Colshaw Hall, Events Team, Vintage Handcrafted Booth, Luxury Venue, Knutsford, 01565 724060"></textarea>

            <div style="display: flex; justify-content: flex-end; gap: 10px;">
              <button type="button" class="btn btn-glass" id="btn-cancel-bulk-modal">Cancel</button>
              <button type="button" class="btn btn-gold" id="btn-submit-bulk-import" style="font-weight: 700;">
                ⚡ Import & Append to Directory
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
