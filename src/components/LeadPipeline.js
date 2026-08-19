import { STAGES, PACKAGES } from '../data/initialData.js';
import { formatCurrency, formatDate } from '../utils/helpers.js';

export function renderLeadPipeline(leads, searchFilter = '', stageFilter = 'all', sourceFilter = 'all') {
  // Filter leads based on search term and dropdown filters
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = !searchFilter || 
      lead.clientName.toLowerCase().includes(searchFilter.toLowerCase()) ||
      lead.venue.toLowerCase().includes(searchFilter.toLowerCase()) ||
      lead.eventType.toLowerCase().includes(searchFilter.toLowerCase());

    const matchesStage = stageFilter === 'all' || lead.stage === stageFilter;
    const matchesSource = sourceFilter === 'all' || lead.source === sourceFilter;

    return matchesSearch && matchesStage && matchesSource;
  });

  return `
    <div class="pipeline-container">
      <div class="kanban-controls">
        <div class="search-filter-group">
          <input 
            type="text" 
            class="input-search" 
            id="pipeline-search-input" 
            placeholder="🔍 Search client name, venue, event type..." 
            value="${searchFilter}"
          />
          <select class="select-filter" id="pipeline-stage-filter">
            <option value="all" ${stageFilter === 'all' ? 'selected' : ''}>All Stages</option>
            ${STAGES.map(s => `<option value="${s.id}" ${stageFilter === s.id ? 'selected' : ''}>${s.icon} ${s.name}</option>`).join('')}
          </select>
          <select class="select-filter" id="pipeline-source-filter">
            <option value="all" ${sourceFilter === 'all' ? 'selected' : ''}>All Lead Sources</option>
            <option value="Bark" ${sourceFilter === 'Bark' ? 'selected' : ''}>Bark</option>
            <option value="Bridebook" ${sourceFilter === 'Bridebook' ? 'selected' : ''}>Bridebook</option>
            <option value="Instagram DM" ${sourceFilter === 'Instagram DM' ? 'selected' : ''}>Instagram DM</option>
            <option value="Direct Website" ${sourceFilter === 'Direct Website' ? 'selected' : ''}>Direct Website</option>
            <option value="Referral" ${sourceFilter === 'Referral' ? 'selected' : ''}>Referral</option>
          </select>
        </div>
        <div>
          <button class="btn btn-gold btn-sm" id="btn-add-lead-kanban">
            ➕ Add New Lead
          </button>
        </div>
      </div>

      <div class="kanban-board">
        ${STAGES.map(stage => {
          const stageLeads = filteredLeads.filter(l => l.stage === stage.id);
          const stageTotal = stageLeads.reduce((sum, l) => sum + (Number(l.dealValue) || 0), 0);

          return `
            <div class="kanban-column" data-stage-id="${stage.id}">
              <div class="column-header">
                <div class="column-title" style="color: ${stage.color};">
                  <span>${stage.icon}</span>
                  <span>${stage.name}</span>
                </div>
                <div class="column-count">${stageLeads.length} (${formatCurrency(stageTotal)})</div>
              </div>

              <div class="kanban-cards-wrapper">
                ${stageLeads.length === 0 ? `
                  <div style="font-size: 12px; color: var(--text-dim); text-align: center; padding: 24px 0; border: 1px dashed rgba(255,255,255,0.06); border-radius: 8px;">
                    No leads in this stage
                  </div>
                ` : stageLeads.map(lead => renderLeadCard(lead)).join('')}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

function renderLeadCard(lead) {
  const pkg = PACKAGES.find(p => p.id === lead.packageId) || { name: 'Custom Package' };

  return `
    <div class="lead-card" data-lead-id="${lead.id}">
      <div class="lead-card-header">
        <div>
          <div class="client-name">${lead.clientName}</div>
          <span class="event-type-tag">${lead.eventType}</span>
        </div>
        <div class="lead-deal-value">${formatCurrency(lead.dealValue)}</div>
      </div>

      <div class="lead-details">
        <div class="detail-item">
          <span>📅</span> <span>${formatDate(lead.eventDate)}</span>
        </div>
        <div class="detail-item">
          <span>📍</span> <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 180px;">${lead.venue}</span>
        </div>
        <div class="detail-item">
          <span>📸</span> <span>${pkg.name}</span>
        </div>
        ${lead.recommendedTiming ? `
          <div class="detail-item" style="color: var(--gold-light); font-size: 11px;">
            <span>⏰</span> Sweet spot: ${lead.recommendedTiming}
          </div>
        ` : ''}
      </div>

      <div class="lead-card-footer">
        <span class="lead-source">${lead.source || 'Bark'}</span>
        <div style="display: flex; gap: 4px;">
          <button class="btn btn-glass btn-sm btn-lead-quote" data-lead-id="${lead.id}" title="Generate/View Quote">
            🧮 Quote
          </button>          <button class="btn btn-glass btn-sm btn-edit-lead" data-lead-id="${lead.id}" title="Edit details">
            ✏️
          </button>
        </div>
      </div>

      <!-- Quick Stage Switcher Dropdown -->
      <div style="margin-top: 6px;">
        <select class="stage-select-sm stage-change-trigger" data-lead-id="${lead.id}">
          ${STAGES.map(s => `<option value="${s.id}" ${s.id === lead.stage ? 'selected' : ''}>Move to: ${s.icon} ${s.name}</option>`).join('')}
        </select>
      </div>
    </div>
  `;
}
