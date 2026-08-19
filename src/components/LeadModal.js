import { STAGES, PACKAGES, BACKDROPS, ADD_ONS } from '../data/initialData.js';

export function renderLeadModal(lead = null) {
  const isEdit = !!lead;
  const leadData = lead || {
    id: 'lead-' + Date.now(),
    clientName: '',
    contactEmail: '',
    contactPhone: '',
    eventType: 'Birthday Celebration',
    eventDate: new Date().toISOString().slice(0, 10),
    eventTime: '19:00 - 22:00',
    recommendedTiming: '7pm–10pm',
    venue: '',
    source: 'Bark',
    packageId: 'birthday-3h',
    backdrop: 'burgundy',
    guestCount: 75,
    dealValue: 350,
    stage: 'new',
    notes: '',
    addOns: [],
    commissionRate: 10
  };

  return `
    <div class="modal-overlay active" id="lead-modal-overlay">
      <div class="modal-container">
        <div class="modal-header">
          <h3 class="modal-title">${isEdit ? '✏️ Edit Lead Details' : '➕ Add New Sales Lead'}</h3>
          <button class="modal-close-btn" id="btn-close-lead-modal">&times;</button>
        </div>

        <form id="lead-form" class="modal-body">
          <input type="hidden" id="lead-id-field" value="${leadData.id}" />

          <div class="form-grid">
            <div class="form-group">
              <label class="form-label">Client Name *</label>
              <input type="text" id="lead-client-name" class="form-control" value="${leadData.clientName}" required placeholder="e.g. Chris / Sarah & Mark" />
            </div>

            <div class="form-group">
              <label class="form-label">Event Type *</label>
              <input type="text" id="lead-event-type" class="form-control" value="${leadData.eventType}" required placeholder="e.g. Birthday Celebration / Wedding" />
            </div>

            <div class="form-group">
              <label class="form-label">Contact Email</label>
              <input type="email" id="lead-email" class="form-control" value="${leadData.contactEmail}" placeholder="client@example.com" />
            </div>

            <div class="form-group">
              <label class="form-label">Contact Phone</label>
              <input type="tel" id="lead-phone" class="form-control" value="${leadData.contactPhone}" placeholder="07700 900123" />
            </div>

            <div class="form-group">
              <label class="form-label">Event Date *</label>
              <input type="date" id="lead-event-date" class="form-control" value="${leadData.eventDate}" required />
            </div>

            <div class="form-group">
              <label class="form-label">Recommended Hire Times</label>
              <input type="text" id="lead-timing" class="form-control" value="${leadData.recommendedTiming || '7pm–10pm'}" placeholder="e.g. 7pm–10pm" />
            </div>

            <div class="form-group">
              <label class="form-label">Venue / Location *</label>
              <input type="text" id="lead-venue" class="form-control" value="${leadData.venue}" required placeholder="e.g. Peckforton Castle, Cheshire" />
            </div>

            <div class="form-group">
              <label class="form-label">Lead Source</label>
              <select id="lead-source" class="form-control">
                <option value="Bark" ${leadData.source === 'Bark' ? 'selected' : ''}>Bark</option>
                <option value="Bridebook" ${leadData.source === 'Bridebook' ? 'selected' : ''}>Bridebook</option>
                <option value="Instagram DM" ${leadData.source === 'Instagram DM' ? 'selected' : ''}>Instagram DM</option>
                <option value="Direct Website" ${leadData.source === 'Direct Website' ? 'selected' : ''}>Direct Website</option>
                <option value="Referral" ${leadData.source === 'Referral' ? 'selected' : ''}>Referral</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Photobooth Package</label>
              <select id="lead-package" class="form-control">
                ${PACKAGES.map(p => `<option value="${p.id}" ${p.id === leadData.packageId ? 'selected' : ''}>${p.name} (£${p.price})</option>`).join('')}
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Pipeline Stage</label>
              <select id="lead-stage" class="form-control">
                ${STAGES.map(s => `<option value="${s.id}" ${s.id === leadData.stage ? 'selected' : ''}>${s.icon} ${s.name}</option>`).join('')}
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Deal Value (£)</label>
              <input type="number" id="lead-deal-value" class="form-control" value="${leadData.dealValue}" required min="0" step="10" />
            </div>

            <div class="form-group">
              <label class="form-label">Backdrop Choice</label>
              <select id="lead-backdrop" class="form-control">
                ${BACKDROPS.map(b => `<option value="${b.id}" ${b.id === leadData.backdrop ? 'selected' : ''}>${b.name}</option>`).join('')}
              </select>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Notes & Communication History</label>
            <textarea id="lead-notes" class="form-control" rows="3" placeholder="Log client requirements, custom rear screen video details, or Bark messages...">${leadData.notes}</textarea>
          </div>

          <div class="modal-footer" style="padding: 0; margin-top: 12px;">
            ${isEdit ? `<button type="button" class="btn btn-burgundy btn-sm" id="btn-delete-lead" data-lead-id="${leadData.id}">🗑️ Delete Lead</button>` : ''}
            <button type="button" class="btn btn-glass" id="btn-cancel-lead-modal">Cancel</button>
            <button type="submit" class="btn btn-gold">💾 Save Lead</button>
          </div>
        </form>
      </div>
    </div>
  `;
}
