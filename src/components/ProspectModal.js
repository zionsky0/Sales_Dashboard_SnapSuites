import { PROSPECT_STATUSES, PACKAGES } from '../data/initialData.js';

export function renderProspectModal(prospect = null) {
  const isEdit = !!prospect;
  const data = prospect || {
    id: 'prospect-' + Date.now(),
    name: '',
    contactPerson: '',
    category: 'Wedding Venue Partner',
    location: '',
    preferredChannel: 'Email',
    contactEmail: '',
    contactPhone: '',
    status: 'not_contacted',
    notes: '',
    targetPackage: 'birthday-3h'
  };

  return `
    <div class="modal-overlay active" id="prospect-modal-overlay">
      <div class="modal-container" style="max-width: 650px;">
        <div class="modal-header">
          <h3 class="modal-title">${isEdit ? '✏️ Edit Potential Customer' : '🎯 Add Potential Customer / Venue'}</h3>
          <button class="modal-close-btn" id="btn-close-prospect-modal">&times;</button>
        </div>

        <form id="prospect-form" class="modal-body">
          <input type="hidden" id="prospect-id-field" value="${data.id}" />

          <div class="form-grid">
            <div class="form-group">
              <label class="form-label">Business / Prospect Name *</label>
              <input type="text" id="prospect-name" class="form-control" value="${data.name}" required placeholder="e.g. Peckforton Castle / Sarah's 30th" />
            </div>

            <div class="form-group">
              <label class="form-label">Contact Person Name</label>
              <input type="text" id="prospect-contact-person" class="form-control" value="${data.contactPerson}" placeholder="e.g. Claire Higgins" />
            </div>

            <div class="form-group">
              <label class="form-label">Category</label>
              <select id="prospect-category" class="form-control">
                <option value="Wedding Venue Partner" ${data.category === 'Wedding Venue Partner' ? 'selected' : ''}>Wedding Venue Partner</option>
                <option value="Corporate & Party Venue" ${data.category === 'Corporate & Party Venue' ? 'selected' : ''}>Corporate & Party Venue</option>
                <option value="Event Coordinator / Planner" ${data.category === 'Event Coordinator / Planner' ? 'selected' : ''}>Event Coordinator / Planner</option>
                <option value="Private Party Host" ${data.category === 'Private Party Host' ? 'selected' : ''}>Private Party Host</option>
                <option value="Bark Prospect" ${data.category === 'Bark Prospect' ? 'selected' : ''}>Bark Prospect</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Location / Region</label>
              <input type="text" id="prospect-location" class="form-control" value="${data.location}" placeholder="e.g. Tarporley, Cheshire / Manchester" />
            </div>

            <div class="form-group">
              <label class="form-label">Preferred Contact Channel</label>
              <select id="prospect-channel" class="form-control">
                <option value="Email" ${data.preferredChannel === 'Email' ? 'selected' : ''}>Email</option>
                <option value="Instagram DM" ${data.preferredChannel === 'Instagram DM' ? 'selected' : ''}>Instagram DM</option>
                <option value="Phone" ${data.preferredChannel === 'Phone' ? 'selected' : ''}>Phone</option>
                <option value="Bark" ${data.preferredChannel === 'Bark' ? 'selected' : ''}>Bark</option>
                <option value="LinkedIn" ${data.preferredChannel === 'LinkedIn' ? 'selected' : ''}>LinkedIn</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Outreach Status *</label>
              <select id="prospect-status" class="form-control">
                ${PROSPECT_STATUSES.map(s => `<option value="${s.id}" ${s.id === data.status ? 'selected' : ''}>${s.icon} ${s.name}</option>`).join('')}
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Contact Email</label>
              <input type="email" id="prospect-email" class="form-control" value="${data.contactEmail}" placeholder="contact@example.co.uk" />
            </div>

            <div class="form-group">
              <label class="form-label">Contact Phone</label>
              <input type="tel" id="prospect-phone" class="form-control" value="${data.contactPhone}" placeholder="01829 260901" />
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Notes & Follow-up History</label>
            <textarea id="prospect-notes" class="form-control" rows="3" placeholder="Notes on outreach date, response, or preferred package...">${data.notes}</textarea>
          </div>

          <div class="modal-footer" style="padding: 0; margin-top: 12px;">
            ${isEdit ? `<button type="button" class="btn btn-burgundy btn-sm" id="btn-delete-prospect" data-prospect-id="${data.id}">🗑️ Delete</button>` : ''}
            <button type="button" class="btn btn-glass" id="btn-cancel-prospect-modal">Cancel</button>
            <button type="submit" class="btn btn-gold">💾 Save Prospect</button>
          </div>
        </form>
      </div>
    </div>
  `;
}
