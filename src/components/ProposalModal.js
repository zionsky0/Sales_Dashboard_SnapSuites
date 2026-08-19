import { formatCurrency } from '../utils/helpers.js';

export function renderProposalModal(quoteData) {
  const name = quoteData.clientName || 'Chris';
  const eventType = quoteData.eventType || 'Birthday Celebration';
  const eventDate = quoteData.eventDate || '2027-06-19';
  const timing = quoteData.recommendedTiming || '7pm–10pm';
  const pkgName = quoteData.packageName || '3-Hour Birthday Package';
  const price = quoteData.totalPrice || 350;
  const backdropName = quoteData.backdrop === 'ivory' ? 'Ivory Elegance Silk Curtain' : 'Burgundy Velvet Curtain';

  return `
    <div class="modal-overlay active" id="proposal-modal-overlay">
      <div class="modal-container" style="max-width: 900px;">
        <div class="modal-header">
          <h3 class="modal-title">🖼️ SnapSuites Luxury Client Proposal</h3>
          <div style="display: flex; gap: 8px;">
            <button class="btn btn-gold btn-sm" id="btn-print-proposal">
              🖨️ Print / Save as PDF
            </button>
            <button class="modal-close-btn" id="btn-close-proposal-modal">&times;</button>
          </div>
        </div>

        <div class="modal-body" style="background: #F8FAFC;">
          <div class="printable-proposal-card" id="printable-area">
            <div class="proposal-banner">
              <div>
                <div class="proposal-logo">📸 SNAPSUITES</div>
                <div style="font-size: 12px; color: #64748B; font-weight: 600;">LUXURY PHOTOBOOTH HIRE • NORTH WEST & YORKSHIRE</div>
              </div>
              <div style="text-align: right;">
                <div style="font-size: 14px; font-weight: 700; color: #800020;">OFFICIAL QUOTE PROPOSAL</div>
                <div style="font-size: 12px; color: #64748B;">Date: ${new Date().toLocaleDateString('en-GB')}</div>
              </div>
            </div>

            <div style="margin-bottom: 20px;">
              <h2 style="font-size: 20px; font-weight: 700; color: #0F172A; margin-bottom: 4px;">Prepared for ${name}</h2>
              <p style="font-size: 14px; color: #475569;">${eventType} • ${eventDate}</p>
            </div>

            <div class="proposal-image-gallery">
              <img src="/assets/snapsuites_booth.jpg" alt="SnapSuites Vintage Photobooth" class="proposal-img" />
              <img src="/assets/snapsuites_prints.jpg" alt="SnapSuites Photo Print Strips" class="proposal-img" />
            </div>

            <div style="background: #F1F5F9; border-radius: 12px; padding: 20px; margin: 20px 0;">
              <h3 style="font-size: 16px; font-weight: 700; color: #800020; margin-bottom: 12px;">The Interactive Vintage Photobooth Experience</h3>
              <p style="font-size: 13px; color: #334155; line-height: 1.6; margin-bottom: 12px;">
                Our interactive vintage photobooth is a stylish, statement booth designed to be a centerpiece of the evening rather than just a photo-taking station. It features a large interactive screen on the back, personalised with photos or videos of the guest of honour throughout your event.
              </p>
              <ul style="font-size: 13px; color: #334155; line-height: 1.8; padding-left: 18px;">
                <li><strong>Recommended Hire Time:</strong> ${timing} (the evening sweet-spot)</li>
                <li><strong>Backdrop Choice:</strong> ${backdropName}</li>
                <li><strong>Props:</strong> Luxury curated prop selection</li>
                <li><strong>Sharing:</strong> Instant digital sharing via QR code, SMS & Email</li>
              </ul>
            </div>

            <div style="border: 2px solid #800020; border-radius: 12px; padding: 20px; display: flex; justify-content: space-between; align-items: center; background: #FFF5F7;">
              <div>
                <div style="font-size: 12px; font-weight: 700; color: #800020; text-transform: uppercase;">Selected Package</div>
                <div style="font-size: 18px; font-weight: 800; color: #0F172A;">${pkgName}</div>
              </div>
              <div style="text-align: right;">
                <div style="font-size: 12px; color: #64748B;">Total Investment</div>
                <div style="font-size: 28px; font-weight: 800; color: #800020; font-family: sans-serif;">${formatCurrency(price)}</div>
              </div>
            </div>

            <div style="margin-top: 28px; text-align: center; border-top: 1px solid #E2E8F0; padding-top: 20px; font-size: 12px; color: #64748B;">
              <div>SnapSuites Luxury Photobooth Hire • www.snapsuites.co.uk</div>
              <div>Contact: bookings@snapsuites.co.uk</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
