import { PROSPECT_STATUSES, PACKAGES } from '../data/initialData.js';
import { formatDate } from '../utils/helpers.js';

export function renderProspectingRadar(prospects, searchFilter = '', statusFilter = 'all') {
  const filteredProspects = prospects.filter(p => {
    const matchesSearch = !searchFilter ||
      p.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.contactPerson.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.location.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.category.toLowerCase().includes(searchFilter.toLowerCase());

    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return `
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <!-- Header Banner -->
      <div style="background: var(--bg-card); border: 1px solid var(--border-glass); border-radius: var(--radius-xl); padding: 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
        <div>
          <h2 style="font-size: 22px; font-weight: 700; color: #FFF; margin-bottom: 4px;">🎯 Potential Customers & Outreach Radar</h2>
          <p style="font-size: 13px; color: var(--text-muted);">Track potential venues, event coordinators, Bark prospects, and whether you've contacted them yet.</p>
        </div>
        <button class="btn btn-gold" id="btn-add-prospect">
          ➕ Add Potential Customer / Venue
        </button>
      </div>

      <!-- Controls & Search -->
      <div class="kanban-controls">
        <div class="search-filter-group">
          <input 
            type="text" 
            class="input-search" 
            id="prospect-search-input" 
            placeholder="🔍 Search prospect name, venue, contact person, location..." 
            value="${searchFilter}"
          />
          <select class="select-filter" id="prospect-status-filter">
            <option value="all" ${statusFilter === 'all' ? 'selected' : ''}>All Outreach Statuses</option>
            ${PROSPECT_STATUSES.map(s => `<option value="${s.id}" ${statusFilter === s.id ? 'selected' : ''}>${s.icon} ${s.name}</option>`).join('')}
          </select>
        </div>
      </div>

      <!-- Prospects Data Grid -->
      <div class="prospects-grid">
        ${filteredProspects.length === 0 ? `
          <div style="grid-column: 1 / -1; background: var(--bg-card); border: 1px dashed var(--border-light); padding: 40px; text-align: center; border-radius: 16px; color: var(--text-muted);">
            No potential customers found matching filter. Click "Add Potential Customer" to add one!
          </div>
        ` : filteredProspects.map(p => renderProspectCard(p)).join('')}
      </div>
    </div>
  `;
}

function renderProspectCard(prospect) {
  const status = PROSPECT_STATUSES.find(s => s.id === prospect.status) || PROSPECT_STATUSES[0];
  const pkg = PACKAGES.find(x => x.id === prospect.targetPackage) || PACKAGES[1];

  return `
    <div class="lead-card" style="border-left: 4px solid ${status.color};">
      <div class="lead-card-header">
        <div>
          <div class="client-name">${prospect.name}</div>
          <span class="event-type-tag" style="background: rgba(255,255,255,0.06); color: var(--text-main);">${prospect.category}</span>
        </div>
        <span class="badge" style="background: ${status.color}22; color: ${status.color}; border: 1px solid ${status.color}55;">
          ${status.icon} ${status.name}
        </span>
      </div>

      <div class="lead-details">
        <div class="detail-item">
          <span>👤 Contact:</span> <strong style="color: #FFF;">${prospect.contactPerson}</strong>
        </div>
        <div class="detail-item">
          <span>📍 Location:</span> <span>${prospect.location}</span>
        </div>
        <div class="detail-item">
          <span>📱 Preferred:</span> <span class="badge" style="background: rgba(212,175,55,0.1); color: var(--gold-light); font-size: 11px;">${prospect.preferredChannel || 'Email'}</span>
        </div>
        ${prospect.contactEmail ? `
          <div class="detail-item">
            <span>✉️ Email:</span> <a href="mailto:${prospect.contactEmail}" style="color: var(--gold-primary);">${prospect.contactEmail}</a>
          </div>
        ` : ''}
        ${prospect.contactPhone ? `
          <div class="detail-item">
            <span>📞 Phone:</span> <span>${prospect.contactPhone}</span>
          </div>
        ` : ''}
        <div class="detail-item" style="color: var(--text-dim); font-size: 11px;">
          <span>📝 Notes:</span> ${prospect.notes || 'No notes added'}
        </div>
      </div>

      <!-- Footer Actions -->
      <div class="lead-card-footer">
        <select class="stage-select-sm prospect-status-change" data-prospect-id="${prospect.id}">
          ${PROSPECT_STATUSES.map(s => `<option value="${s.id}" ${s.id === prospect.status ? 'selected' : ''}>Status: ${s.icon} ${s.name}</option>`).join('')}
        </select>
        
        <div style="display: flex; gap: 6px;">
          <button class="btn btn-gold btn-sm btn-convert-prospect" data-prospect-id="${prospect.id}" title="Convert into active CRM Lead & Quote">
            ⚡ Convert to Lead
          </button>
          <button class="btn btn-glass btn-sm btn-edit-prospect" data-prospect-id="${prospect.id}">
            ✏️
          </button>
        </div>
      </div>
    </div>
  `;
}
