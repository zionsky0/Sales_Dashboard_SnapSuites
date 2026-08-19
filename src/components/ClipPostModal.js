export function renderClipPostModal() {
  return `
    <div class="modal-overlay active" id="clip-modal-overlay">
      <div class="modal-container" style="max-width: 550px;">
        <div class="modal-header">
          <h3 class="modal-title">📌 Clip Real Live Social Post to CRM</h3>
          <button class="modal-close-btn" id="btn-close-clip-modal">&times;</button>
        </div>

        <form id="clip-post-form" class="modal-body">
          <div class="form-group">
            <label class="form-label">Real Post or Enquiry URL *</label>
            <input type="url" id="clip-post-url" class="form-control" placeholder="https://www.instagram.com/p/... or Bark link" required />
            <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">
              Paste the exact link to the real Instagram post, Facebook group inquiry, or Bark listing.
            </div>
          </div>

          <div class="form-grid">
            <div class="form-group">
              <label class="form-label">Client / Profile Name *</label>
              <input type="text" id="clip-client-name" class="form-control" placeholder="e.g. @sarah_wedding2027" required />
            </div>

            <div class="form-group">
              <label class="form-label">Platform</label>
              <select id="clip-platform" class="form-control">
                <option value="Instagram">Instagram</option>
                <option value="Facebook">Facebook</option>
                <option value="Bark">Bark</option>
                <option value="TikTok">TikTok</option>
                <option value="Other Web">Other Web</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Event Type</label>
              <input type="text" id="clip-event-type" class="form-control" placeholder="e.g. Wedding / 30th Birthday" value="Wedding" />
            </div>

            <div class="form-group">
              <label class="form-label">Venue / Location</label>
              <input type="text" id="clip-venue" class="form-control" placeholder="e.g. Peckforton Castle, Cheshire" />
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Post Caption / Notes</label>
            <textarea id="clip-caption" class="form-control" rows="3" placeholder="Paste what they said in the post..."></textarea>
          </div>

          <div class="modal-footer" style="padding: 0; margin-top: 12px;">
            <button type="button" class="btn btn-glass" id="btn-cancel-clip-modal">Cancel</button>
            <button type="submit" class="btn btn-gold">📌 Save Real Post</button>
          </div>
        </form>
      </div>
    </div>
  `;
}
