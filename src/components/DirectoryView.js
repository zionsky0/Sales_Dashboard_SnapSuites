export function renderDirectoryView(
  directory = [],
  searchTerm = '',
  categoryFilter = 'all',
  statusFilter = 'all',
  weekFilter = 'all'
) {
  // Compute metrics
  const totalCount = directory.length;
  const contactedCount = directory.filter(d => d.status === 'pitch_sent' || d.status === 'meeting_booked' || d.status === 'partner_agreed').length;
  const agreedCount = directory.filter(d => d.status === 'partner_agreed').length;
  const meetingsCount = directory.filter(d => d.status === 'meeting_booked').length;

  // Filter items
  const filtered = directory.filter(item => {
    if (searchTerm && searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim();
      const matchName = (item.name || '').toLowerCase().includes(q);
      const matchArea = (item.area || '').toLowerCase().includes(q);
      const matchCategory = (item.category || '').toLowerCase().includes(q);
      const matchAngle = (item.bestAngle || '').toLowerCase().includes(q);
      const matchEmail = (item.email || '').toLowerCase().includes(q);
      const matchPhone = (item.phone || '').toLowerCase().includes(q);
      const matchNotes = (item.notes || '').toLowerCase().includes(q);
      if (!matchName && !matchArea && !matchCategory && !matchAngle && !matchEmail && !matchPhone && !matchNotes) {
        return false;
      }
    }

    if (categoryFilter !== 'all') {
      if (categoryFilter === 'Venues' && !item.category.toLowerCase().includes('venue') && !item.category.toLowerCase().includes('hotel') && !item.category.toLowerCase().includes('hall') && !item.category.toLowerCase().includes('barn') && !item.category.toLowerCase().includes('estate') && !item.category.toLowerCase().includes('resort') && !item.category.toLowerCase().includes('stadium') && !item.category.toLowerCase().includes('castle')) {
        return false;
      }
      if (categoryFilter === 'Planners' && !item.category.toLowerCase().includes('planner') && !item.category.toLowerCase().includes('production') && !item.category.toLowerCase().includes('management')) {
        return false;
      }
      if (categoryFilter === 'Entertainment' && !item.category.toLowerCase().includes('music') && !item.category.toLowerCase().includes('dj') && !item.category.toLowerCase().includes('entertainment') && !item.category.toLowerCase().includes('decor') && !item.category.toLowerCase().includes('decorator')) {
        return false;
      }
      if (categoryFilter === 'PR' && !item.category.toLowerCase().includes('pr') && !item.category.toLowerCase().includes('comms')) {
        return false;
      }
    }

    if (statusFilter !== 'all' && item.status !== statusFilter) {
      return false;
    }

    if (weekFilter !== 'all' && item.targetWeek !== weekFilter) {
      return false;
    }

    return true;
  });

  return `
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <!-- Hero Banner -->
      <div style="background: linear-gradient(135deg, var(--bg-card-solid), rgba(212,175,55,0.2), rgba(128,0,32,0.3)); border: 1px solid var(--border-glass); border-radius: var(--radius-xl); padding: 26px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
        <div style="max-width: 780px;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
            <span class="badge" style="background: var(--gold-primary); color: #000; font-weight: 800; font-size: 11px;">
              🏢 50 NORTH WEST VENUES & PARTNERS DIRECTORY
            </span>
            <span class="badge" style="background: rgba(16,185,129,0.2); color: var(--accent-success); border: 1px solid var(--accent-success);">
              ● Google Sheet Sync Enabled
            </span>
          </div>
          <h2 style="font-size: 26px; font-weight: 800; color: #FFF; margin-bottom: 6px;">
            Target Venues, Planners, PR & Agency Directory
          </h2>
          <p style="font-size: 14px; color: var(--text-muted); line-height: 1.5;">
            Unified target database of 50 luxury venues, high-end wedding planners, music agencies, and PR firms across Cheshire, Manchester, and the North West with direct emails, phone numbers, and tailored pitch angles.
          </p>
        </div>

        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
          <button class="btn btn-gold" id="btn-export-directory-csv" style="font-weight: 700;">
            📥 Export to Google Sheet (CSV)
          </button>
          <button class="btn btn-glass" id="btn-open-sync-sheet-modal">
            📋 Sync / Paste Sheet Data
          </button>
          <button class="btn btn-burgundy" id="btn-add-partner-modal">
            ➕ Add Partner
          </button>
        </div>
      </div>

      <!-- Quick Stats Metrics Row -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
        <div style="background: var(--bg-card); border: 1px solid var(--border-glass); border-radius: var(--radius-lg); padding: 18px; border-left: 4px solid var(--gold-primary);">
          <div style="font-size: 12px; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">Total Target Directory</div>
          <div style="font-size: 24px; font-weight: 800; color: #FFF; margin-top: 4px;">${totalCount} Organizations</div>
          <div style="font-size: 11px; color: var(--gold-light); margin-top: 4px;">Cheshire, MCR, Ribble Valley & NW</div>
        </div>

        <div style="background: var(--bg-card); border: 1px solid var(--border-glass); border-radius: var(--radius-lg); padding: 18px; border-left: 4px solid var(--accent-info);">
          <div style="font-size: 12px; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">Outreach Initiated</div>
          <div style="font-size: 24px; font-weight: 800; color: var(--accent-info); margin-top: 4px;">${contactedCount} / ${totalCount}</div>
          <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">${Math.round((contactedCount / (totalCount || 1)) * 100)}% coverage</div>
        </div>

        <div style="background: var(--bg-card); border: 1px solid var(--border-glass); border-radius: var(--radius-lg); padding: 18px; border-left: 4px solid var(--gold-light);">
          <div style="font-size: 12px; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">Meetings & Demos Booked</div>
          <div style="font-size: 24px; font-weight: 800; color: var(--gold-light); margin-top: 4px;">${meetingsCount} Booked</div>
          <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">Open days & showroom visits</div>
        </div>

        <div style="background: var(--bg-card); border: 1px solid var(--border-glass); border-radius: var(--radius-lg); padding: 18px; border-left: 4px solid var(--accent-success);">
          <div style="font-size: 12px; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">Preferred Partnerships Won</div>
          <div style="font-size: 24px; font-weight: 800; color: var(--accent-success); margin-top: 4px;">${agreedCount} Agreed</div>
          <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">Active referral engines</div>
        </div>
      </div>

      <!-- Outreach Plan of Attack Interactive Roadmap -->
      <div style="background: var(--bg-card); border: 1px solid var(--border-glass); border-radius: var(--radius-xl); padding: 22px; display: flex; flex-direction: column; gap: 14px;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
          <h3 style="font-size: 17px; font-weight: 700; color: var(--gold-light); display: flex; align-items: center; gap: 8px;">
            <span>🎯 3-Week Targeted Outreach Plan of Attack</span>
          </h3>
          <span style="font-size: 12px; color: var(--text-muted);">Click a week to filter directory</span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 14px;">
          <div class="week-filter-card ${weekFilter === 'Week 1' ? 'active-week-card' : ''}" data-week="Week 1" style="background: rgba(255,255,255,0.03); border: 1px solid ${weekFilter === 'Week 1' ? 'var(--gold-primary)' : 'var(--border-light)'}; border-radius: 12px; padding: 16px; cursor: pointer; transition: all 0.2s ease;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <span class="badge" style="background: rgba(212,175,55,0.15); color: var(--gold-primary); font-weight: 800;">WEEK 1 STRATEGY</span>
              <span style="font-size: 11px; color: var(--gold-light); font-weight: 700;">36 Venues</span>
            </div>
            <h4 style="font-size: 15px; font-weight: 700; color: #FFF; margin-bottom: 4px;">Cheshire & North West Wedding Venues</h4>
            <p style="font-size: 12px; color: var(--text-muted); line-height: 1.4;">
              Pitch <strong>Colshaw, Merrydale, Delamere, Peckforton & Oak Tree</strong> positioning SnapSuites as a vetted, £5M PLI / PAT-tested luxury supplier to join their recommended vendor list.
            </p>
          </div>

          <div class="week-filter-card ${weekFilter === 'Week 2' ? 'active-week-card' : ''}" data-week="Week 2" style="background: rgba(255,255,255,0.03); border: 1px solid ${weekFilter === 'Week 2' ? 'var(--gold-primary)' : 'var(--border-light)'}; border-radius: 12px; padding: 16px; cursor: pointer; transition: all 0.2s ease;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <span class="badge" style="background: rgba(16,185,129,0.15); color: var(--accent-success); font-weight: 800;">WEEK 2 STRATEGY</span>
              <span style="font-size: 11px; color: var(--accent-success); font-weight: 700;">11 Planners & DJs</span>
            </div>
            <h4 style="font-size: 15px; font-weight: 700; color: #FFF; margin-bottom: 4px;">Luxury Wedding Planners, DJs & Stylists</h4>
            <p style="font-size: 12px; color: var(--text-muted); line-height: 1.4;">
              Contact <strong>Julie Perry, Kate Park, Charlotte Elise, Six15 & DFC</strong> as their go-to photo booth partner, sending over trade pricing brochures and cross-referral packages.
            </p>
          </div>

          <div class="week-filter-card ${weekFilter === 'Week 3' ? 'active-week-card' : ''}" data-week="Week 3" style="background: rgba(255,255,255,0.03); border: 1px solid ${weekFilter === 'Week 3' ? 'var(--gold-primary)' : 'var(--border-light)'}; border-radius: 12px; padding: 16px; cursor: pointer; transition: all 0.2s ease;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <span class="badge" style="background: rgba(59,130,246,0.15); color: var(--accent-info); font-weight: 800;">WEEK 3 STRATEGY</span>
              <span style="font-size: 11px; color: var(--accent-info); font-weight: 700;">3 PR Agencies</span>
            </div>
            <h4 style="font-size: 15px; font-weight: 700; color: #FFF; margin-bottom: 4px;">Manchester PR & Brand Comms Agencies</h4>
            <p style="font-size: 12px; color: var(--text-muted); line-height: 1.4;">
              Pitch <strong>Carousel PR, Brazen PR & Tangerine</strong> for corporate brand activations, roamer pods, and custom vinyl wrap photo experiences.
            </p>
          </div>
        </div>
      </div>

      <!-- Search & Filters Toolbar -->
      <div style="background: var(--bg-card); border: 1px solid var(--border-glass); border-radius: var(--radius-xl); padding: 22px; display: flex; flex-direction: column; gap: 16px;">
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <div style="flex: 3; min-width: 280px; position: relative;">
            <input 
              type="text" 
              id="directory-search-input" 
              class="input-search" 
              style="width: 100%; padding: 12px 14px 12px 42px; font-size: 14px;" 
              placeholder="Search by venue name, area, angle, email, or phone (e.g. Colshaw, Knutsford, Julie Perry, 01565)..." 
              value="${searchTerm}"
            />
            <span style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); font-size: 16px; color: var(--gold-primary);">🔍</span>
          </div>

          <button class="btn btn-gold" id="btn-submit-directory-search" style="font-weight: 700; padding: 0 24px;">
            Search Directory
          </button>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
          <div>
            <label style="font-size: 11px; color: var(--text-muted); font-weight: 700; text-transform: uppercase; margin-bottom: 4px; display: block;">Category</label>
            <select id="directory-category-filter" class="select-filter" style="width: 100%;">
              <option value="all" ${categoryFilter === 'all' ? 'selected' : ''}>🏢 All Categories (50 Orgs)</option>
              <option value="Venues" ${categoryFilter === 'Venues' ? 'selected' : ''}>🏰 Luxury Venues, Barns & Castles</option>
              <option value="Planners" ${categoryFilter === 'Planners' ? 'selected' : ''}>📋 Wedding & Event Planners</option>
              <option value="Entertainment" ${categoryFilter === 'Entertainment' ? 'selected' : ''}>🎵 Music, DJs & Stylists</option>
              <option value="PR" ${categoryFilter === 'PR' ? 'selected' : ''}>📣 PR & Brand Comms</option>
            </select>
          </div>

          <div>
            <label style="font-size: 11px; color: var(--text-muted); font-weight: 700; text-transform: uppercase; margin-bottom: 4px; display: block;">Outreach Status</label>
            <select id="directory-status-filter" class="select-filter" style="width: 100%;">
              <option value="all" ${statusFilter === 'all' ? 'selected' : ''}>🎯 All Outreach Statuses</option>
              <option value="not_contacted" ${statusFilter === 'not_contacted' ? 'selected' : ''}>⚪ Not Contacted</option>
              <option value="pitch_sent" ${statusFilter === 'pitch_sent' ? 'selected' : ''}>🟣 Pitch Sent</option>
              <option value="meeting_booked" ${statusFilter === 'meeting_booked' ? 'selected' : ''}>🟡 Meeting / Demo Booked</option>
              <option value="partner_agreed" ${statusFilter === 'partner_agreed' ? 'selected' : ''}>🟢 Preferred Partner Agreed</option>
            </select>
          </div>

          <div>
            <label style="font-size: 11px; color: var(--text-muted); font-weight: 700; text-transform: uppercase; margin-bottom: 4px; display: block;">Roadmap Week</label>
            <select id="directory-week-filter" class="select-filter" style="width: 100%;">
              <option value="all" ${weekFilter === 'all' ? 'selected' : ''}>📅 All Strategy Weeks</option>
              <option value="Week 1" ${weekFilter === 'Week 1' ? 'selected' : ''}>Week 1: Cheshire Barns & Venues</option>
              <option value="Week 2" ${weekFilter === 'Week 2' ? 'selected' : ''}>Week 2: Planners & Music</option>
              <option value="Week 3" ${weekFilter === 'Week 3' ? 'selected' : ''}>Week 3: Manchester PR Agencies</option>
            </select>
          </div>
        </div>

        ${(searchTerm || categoryFilter !== 'all' || statusFilter !== 'all' || weekFilter !== 'all') ? `
          <div style="display: flex; justify-content: flex-end;">
            <button class="btn btn-burgundy btn-sm" id="btn-reset-directory-filters">
              ✕ Clear All Filters
            </button>
          </div>
        ` : ''}
      </div>

      <!-- Directory Cards Grid Header -->
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <h3 style="font-size: 19px; font-weight: 700; color: #FFF; display: flex; align-items: center; gap: 8px;">
          <span>📋 Target Partners & Venues</span>
          <span style="font-size: 13px; color: var(--gold-light); background: rgba(212,175,55,0.15); padding: 2px 10px; border-radius: 12px; border: 1px solid var(--border-glass);">
            ${filtered.length} matching
          </span>
        </h3>
      </div>

      <!-- Directory Cards Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 20px;">
        ${filtered.length === 0 ? `
          <div style="grid-column: 1 / -1; background: var(--bg-card); border: 1px dashed var(--border-light); padding: 40px; text-align: center; border-radius: var(--radius-lg); color: var(--text-muted);">
            <div style="font-size: 32px; margin-bottom: 10px;">🔍</div>
            <h4 style="color: #FFF; font-size: 16px; margin-bottom: 6px;">No organizations match your filters</h4>
            <p style="font-size: 13px; margin-bottom: 16px;">Try clearing your search term or selecting "All Categories".</p>
            <button class="btn btn-gold btn-sm" id="btn-empty-reset-directory">Show All 50 Organizations</button>
          </div>
        ` : filtered.map(item => {
          let statusBadge = `<span class="badge" style="background: rgba(255,255,255,0.1); color: var(--text-muted);">⚪ Not Contacted</span>`;
          if (item.status === 'pitch_sent') {
            statusBadge = `<span class="badge" style="background: rgba(168,85,247,0.2); color: #C084FC; border: 1px solid #C084FC;">🟣 Pitch Sent</span>`;
          } else if (item.status === 'meeting_booked') {
            statusBadge = `<span class="badge" style="background: rgba(234,179,8,0.2); color: #FACC15; border: 1px solid #FACC15;">🟡 Meeting Booked</span>`;
          } else if (item.status === 'partner_agreed') {
            statusBadge = `<span class="badge" style="background: rgba(16,185,129,0.2); color: var(--accent-success); border: 1px solid var(--accent-success);">🟢 Preferred Partner</span>`;
          }

          return `
            <div class="lead-card" style="border-left: 4px solid var(--gold-primary); padding: 20px; display: flex; flex-direction: column; gap: 14px;">
              <!-- Card Header -->
              <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 10px;">
                <div>
                  <h4 style="font-size: 17px; font-weight: 800; color: #FFF; margin-bottom: 2px;">${item.name}</h4>
                  <div style="font-size: 13px; color: var(--gold-light); font-weight: 600;">
                    ${item.category} • <span style="color: var(--text-muted); font-weight: 400;">${item.area}</span>
                  </div>
                </div>
                <div>${statusBadge}</div>
              </div>

              <!-- Best Angle Callout Box -->
              <div style="background: rgba(212,175,55,0.08); border: 1px solid var(--border-glass); border-radius: 8px; padding: 10px 12px;">
                <div style="font-size: 11px; color: var(--gold-primary); font-weight: 800; text-transform: uppercase; margin-bottom: 2px;">
                  ⚡ Best Angle for SnapSuites:
                </div>
                <div style="font-size: 13px; color: #FFF; font-weight: 600;">
                  ${item.bestAngle}
                </div>
              </div>

              <!-- Contact Info -->
              <div style="background: rgba(0,0,0,0.3); border: 1px solid var(--border-light); border-radius: 8px; padding: 10px 12px; display: flex; flex-direction: column; gap: 6px; font-size: 13px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="color: var(--text-muted);">📧 Email:</span>
                  <a href="mailto:${item.email}" style="color: var(--gold-light); text-decoration: none; font-weight: 600; word-break: break-all;">
                    ${item.email}
                  </a>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="color: var(--text-muted);">📞 Phone:</span>
                  <a href="tel:${item.phone.replace(/\s+/g, '')}" style="color: #FFF; text-decoration: none; font-weight: 600;">
                    ${item.phone}
                  </a>
                </div>
                ${item.notes ? `
                  <div style="font-size: 11px; color: var(--text-dim); margin-top: 4px; border-top: 1px dashed var(--border-light); padding-top: 4px;">
                    📝 <em>${item.notes}</em>
                  </div>
                ` : ''}
              </div>

              <!-- Outreach Status Selector -->
              <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px;">
                <span style="font-size: 12px; color: var(--text-muted); font-weight: 600;">Status:</span>
                <select class="directory-status-select select-filter" data-id="${item.id}" style="padding: 4px 8px; font-size: 12px; flex: 1;">
                  <option value="not_contacted" ${item.status === 'not_contacted' ? 'selected' : ''}>⚪ Not Contacted</option>
                  <option value="pitch_sent" ${item.status === 'pitch_sent' ? 'selected' : ''}>🟣 Pitch Sent</option>
                  <option value="meeting_booked" ${item.status === 'meeting_booked' ? 'selected' : ''}>🟡 Meeting / Demo Booked</option>
                  <option value="partner_agreed" ${item.status === 'partner_agreed' ? 'selected' : ''}>🟢 Preferred Partner</option>
                </select>
              </div>

              <!-- Action Suite -->
              <div style="display: flex; flex-direction: column; gap: 8px; margin-top: auto; padding-top: 10px; border-top: 1px dashed var(--border-light);">
                <button class="btn btn-gold btn-sm btn-directory-pitch-trigger" data-id="${item.id}" style="width: 100%; font-weight: 700;">
                  ⚡ 1-Click Tailored Pitch Script
                </button>

                <div style="display: flex; gap: 8px;">
                  <button class="btn btn-burgundy btn-sm btn-convert-partner-to-crm" data-id="${item.id}" style="flex: 1;">
                    📥 Push to CRM Deals
                  </button>
                  <a href="mailto:${item.email}?subject=${encodeURIComponent('Exclusive Luxury Photobooth Partnership - SnapSuites x ' + item.name)}" class="btn btn-glass btn-sm" style="text-decoration: none;" title="Send direct email">
                    ✉️ Email
                  </a>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}
