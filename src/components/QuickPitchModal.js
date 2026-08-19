export function generateQuickPitchScript(target, repName = 'Founder') {
  if (!target) return '';

  const venueName = target.venueName || target.name || 'Venue';
  const companyName = target.companyName || target.name || 'Company';
  const contactName = target.contactName || (target.category?.toLowerCase().includes('venue') ? 'Weddings & Events Team' : 'Events Team');
  const boothStyle = target.boothStyle || target.bestAngle || 'Vintage Handcrafted Booth';
  const phone = target.phone || '07700 900123';

  const category = (target.category || '').toLowerCase();
  const isVenue = category.includes('venue') || category.includes('hotel') || category.includes('hall') || category.includes('barn') || category.includes('castle') || category.includes('estate') || category.includes('resort') || category.includes('stadium') || category.includes('space') || category.includes('boutique');

  if (isVenue) {
    // Template 1: For Wedding Venues & Coordinators (Strictly Commercial, Vetted Luxury Supplier)
    return `Subject: Supplier Introduction: SnapSuites Photo Booths x ${venueName}

Hi ${contactName},

I hope you're having a great week.

I’m reaching out from SnapSuites (https://www.snapsuites.co.uk/). We provide luxury, aesthetic photo booths across Cheshire and Greater Manchester—specialising in our ${boothStyle} which fits the aesthetic at ${venueName} perfectly.

We work regularly across the North West, carry full £5M Public Liability Insurance (PLI), and all equipment is fully PAT-tested to meet venue compliance standards.

As couples frequently ask venues for trusted supplier recommendations, could you let me know who manages your recommended vendor list or how we can get our brochure over to your events team?

Best regards,

${repName}
Founder | SnapSuites
${phone} | https://www.snapsuites.co.uk/`;
  } else {
    // Template 2: For Planners, DJs, Stylists & PR Agencies
    return `Subject: Preferred Supplier / Collaboration: SnapSuites x ${companyName}

Hi ${contactName},

Hope your event season is going strong.

I’m contacting you from SnapSuites (https://www.snapsuites.co.uk/). We supply high-end photo booths (Vintage Booths, Roamer Booths, Magic Mirrors, and custom backdrops) for luxury weddings and private parties across the North West.

We know how crucial it is to have reliable, professional suppliers on site that make the overall event look incredible. We’d love to connect with ${companyName} as a go-to photo booth partner for any upcoming events where your clients need premium photo entertainment.

If you have a moment, take a quick look at our setups on the site, and let me know if you’d like our trade pricing brochure sent over.

Best regards,

${repName}
SnapSuites | ${phone} | https://www.snapsuites.co.uk/`;
  }
}

export function renderQuickPitchModal(target, repName = 'Founder') {
  if (!target) return '';

  const isVenue = (target.category || '').toLowerCase().includes('venue') || (target.category || '').toLowerCase().includes('hotel') || (target.category || '').toLowerCase().includes('hall') || (target.category || '').toLowerCase().includes('barn') || (target.category || '').toLowerCase().includes('castle') || (target.category || '').toLowerCase().includes('estate');
  const orgName = target.venueName || target.companyName || target.name || 'Organization';
  const pitchScript = generateQuickPitchScript(target, repName);

  const mailtoSubject = encodeURIComponent(
    isVenue
      ? `Supplier Introduction: SnapSuites Photo Booths x ${orgName}`
      : `Preferred Supplier / Collaboration: SnapSuites x ${orgName}`
  );

  // Extract body without the subject line for the mailto URL body parameter
  const bodyText = pitchScript.replace(/^Subject:.*?\n\n/i, '');
  const mailtoBody = encodeURIComponent(bodyText);
  const mailtoUrl = target.email 
    ? `mailto:${target.email}?subject=${mailtoSubject}&body=${mailtoBody}` 
    : `mailto:?subject=${mailtoSubject}&body=${mailtoBody}`;

  return `
    <div class="modal-overlay active" id="quick-pitch-modal-overlay">
      <div class="modal-container" style="max-width: 720px;">
        <div class="modal-header">
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="width: 38px; height: 38px; border-radius: 10px; background: rgba(212,175,55,0.15); border: 1px solid var(--gold-primary); display: flex; align-items: center; justify-content: center; font-size: 20px;">
              ${isVenue ? '🏰' : '🤝'}
            </div>
            <div>
              <h3 class="modal-title" style="font-size: 18px;">
                ${isVenue ? 'Supplier Introduction Pitch' : 'Preferred Partner Collaboration Pitch'}
              </h3>
              <div style="font-size: 12px; color: var(--text-muted);">
                Target: <strong style="color: #FFF;">${orgName}</strong> (${target.category || 'Partner'} • ${target.area || 'North West'})
              </div>
            </div>
          </div>
          <button class="modal-close-btn" id="btn-close-quick-pitch-modal">&times;</button>
        </div>

        <div class="modal-body" style="gap: 16px;">
          <!-- Target Summary Details -->
          <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 14px; display: flex; flex-direction: column; gap: 8px;">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
              <span class="badge" style="background: rgba(212,175,55,0.15); color: var(--gold-primary); font-weight: 700;">
                ${target.category || 'Organization'}
              </span>
              <span style="font-size: 13px; color: #FFF; font-weight: 600;">
                📍 ${target.area || 'North West'}
              </span>
              ${target.email ? `<span style="font-size: 12px; color: var(--gold-light);">📧 ${target.email}</span>` : ''}
              ${target.phone ? `<span style="font-size: 12px; color: var(--text-muted);">📞 ${target.phone}</span>` : ''}
            </div>

            <div style="font-size: 12px; color: var(--text-main); background: rgba(212,175,55,0.08); border: 1px solid var(--border-glass); padding: 8px 12px; border-radius: 6px;">
              <strong style="color: var(--gold-primary);">🎯 Booth Style / Match:</strong> ${target.boothStyle || target.bestAngle || 'Vintage Handcrafted Booth'}
            </div>
          </div>

          <!-- Generated Commercial Pitch Script -->
          <div class="form-group">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <label class="form-label" style="margin-bottom: 0;">Direct Commercial Email Template (Ready to Send)</label>
              <button type="button" class="btn btn-gold btn-sm" id="btn-copy-pitch-script">
                📋 Copy Script
              </button>
            </div>
            <textarea id="pitch-script-textarea" class="form-control" rows="13" style="font-family: monospace; font-size: 12px; line-height: 1.5; color: #E2E8F0; background: rgba(10, 12, 16, 0.95);">${pitchScript}</textarea>
          </div>

          <!-- Action Controls -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; padding-top: 4px;">
            <a href="${mailtoUrl}" class="btn btn-gold" style="text-decoration: none; justify-content: center; font-weight: 700;">
              ✉️ Open in Email Client ↗
            </a>
            <button type="button" class="btn btn-glass" id="btn-mark-pitch-sent" data-id="${target.id}">
              🟣 Mark as "Pitch Sent"
            </button>
            <button type="button" class="btn btn-burgundy btn-convert-partner-to-crm" data-id="${target.id}">
              📥 Push to CRM Deals
            </button>
          </div>
        </div>

        <div class="modal-footer" style="justify-content: space-between;">
          <span style="font-size: 11px; color: var(--text-muted);">
            Tip: Export CSV anytime to run automated batch mailings via Mailmeteor or YAMM.
          </span>
          <button type="button" class="btn btn-glass btn-sm" id="btn-cancel-pitch-modal">Close</button>
        </div>
      </div>
    </div>
  `;
}
