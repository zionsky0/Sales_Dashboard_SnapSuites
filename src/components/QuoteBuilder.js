import { PACKAGES, ADD_ONS, BACKDROPS } from '../data/initialData.js';
import { formatCurrency } from '../utils/helpers.js';

export function renderQuoteBuilder(quoteState, leads = []) {
  const selectedPkg = PACKAGES.find(p => p.id === quoteState.packageId) || PACKAGES[1];
  
  // Calculate total price
  let totalPrice = selectedPkg.price;
  const selectedAddonsList = (quoteState.selectedAddons || []).map(id => ADD_ONS.find(a => a.id === id)).filter(Boolean);
  selectedAddonsList.forEach(addon => {
    totalPrice += addon.price;
  });

  const formattedMessage = generateQuoteText(quoteState, selectedPkg, selectedAddonsList, totalPrice);

  return `
    <div class="quote-builder-grid">
      <!-- Left Panel: Calculator Inputs -->
      <div class="calculator-panel">
        <h2 class="panel-title">🧮 Interactive Quote & Package Builder</h2>

        <!-- Event & Client Details -->
        <div class="form-grid">
          <div class="form-group">
            <label class="form-label">Client Name</label>
            <input type="text" id="quote-client-name" class="form-control" value="${quoteState.clientName || 'Chris'}" placeholder="e.g. Chris" />
          </div>
          <div class="form-group">
            <label class="form-label">Event Type</label>
            <input type="text" id="quote-event-type" class="form-control" value="${quoteState.eventType || 'Birthday Celebration'}" placeholder="e.g. Birthday Celebration" />
          </div>
          <div class="form-group">
            <label class="form-label">Event Date</label>
            <input type="date" id="quote-event-date" class="form-control" value="${quoteState.eventDate || '2027-06-19'}" />
          </div>
          <div class="form-group">
            <label class="form-label">Recommended Hire Times</label>
            <input type="text" id="quote-recommended-timing" class="form-control" value="${quoteState.recommendedTiming || '7pm–10pm'}" placeholder="e.g. 7pm–10pm" />
          </div>
        </div>

        <!-- Package Selection Cards -->
        <div class="form-group">
          <label class="form-label">Select Photobooth Package</label>
          <div class="packages-selection-grid">
            ${PACKAGES.map(pkg => `
              <div class="package-card ${pkg.id === selectedPkg.id ? 'selected' : ''}" data-package-id="${pkg.id}">
                ${pkg.badge ? `<span class="package-badge">${pkg.badge}</span>` : ''}
                <div class="package-name">${pkg.name}</div>
                <div class="package-price">${formatCurrency(pkg.price)}</div>
                <div style="font-size: 12px; color: var(--text-muted);">${pkg.description}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Backdrop Selection -->
        <div class="form-group">
          <label class="form-label">Curtain Backdrop Choice</label>
          <div style="display: flex; gap: 12px;">
            ${BACKDROPS.map(b => `
              <label style="flex: 1; background: var(--bg-card-solid); border: 1px solid ${(quoteState.backdrop || 'burgundy') === b.id ? 'var(--gold-primary)' : 'var(--border-light)'}; padding: 10px 14px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; gap: 8px;">
                <input type="radio" name="backdrop-choice" value="${b.id}" ${(quoteState.backdrop || 'burgundy') === b.id ? 'checked' : ''} style="accent-color: var(--gold-primary);" />
                <div>
                  <div style="font-weight: 600; font-size: 13px; color: #FFF;">${b.name}</div>
                  <div style="font-size: 11px; color: var(--text-muted);">${b.description}</div>
                </div>
              </label>
            `).join('')}
          </div>
        </div>

        <!-- Optional Add-ons Checkboxes -->
        <div class="addons-section">
          <label class="form-label">Custom Upgrades & Add-ons</label>
          ${ADD_ONS.map(addon => {
            const isChecked = (quoteState.selectedAddons || []).includes(addon.id);
            return `
              <div class="addon-row" data-addon-id="${addon.id}">
                <div class="addon-info">
                  <input type="checkbox" class="addon-checkbox" ${isChecked ? 'checked' : ''} data-addon-id="${addon.id}" />
                  <div>
                    <div class="addon-title">${addon.name}</div>
                    <div class="addon-desc">${addon.description}</div>
                  </div>
                </div>
                <div class="addon-price">+${formatCurrency(addon.price)}</div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Right Panel: Summary & Live Text Generator -->
      <div class="quote-summary-panel">
        <h2 class="panel-title">📋 Live Quote Breakdown & Sales Copy</h2>

        <div style="background: rgba(212, 175, 55, 0.08); border: 1px solid var(--border-glass); padding: 18px; border-radius: var(--radius-lg); display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div style="font-size: 12px; color: var(--text-muted); text-transform: uppercase;">Total Calculated Deal</div>
            <div style="font-size: 32px; font-weight: 800; color: var(--gold-primary); font-family: 'Outfit', sans-serif;">
              ${formatCurrency(totalPrice)}
            </div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 12px; color: var(--text-muted);">Est. Commission (10%)</div>
            <div style="font-size: 18px; font-weight: 700; color: var(--accent-success);">
              ${formatCurrency(totalPrice * 0.10)}
            </div>
          </div>
        </div>

        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <label class="form-label" style="margin: 0;">Bark / Email Proposal Text</label>
            <button class="btn btn-gold btn-sm" id="btn-copy-quote-text">
              📋 Copy Proposal Text
            </button>
          </div>
          <div class="proposal-text-box" id="proposal-text-preview">${formattedMessage}</div>
        </div>

        <div style="display: flex; gap: 12px; margin-top: auto;">
          <button class="btn btn-burgundy" style="flex: 1;" id="btn-open-printable-proposal">
            🖼️ View Client PDF / HTML Proposal
          </button>
          <button class="btn btn-glass" style="flex: 1;" id="btn-save-quote-to-pipeline">
            💾 Save as Active Lead
          </button>
        </div>
      </div>
    </div>
  `;
}

export function generateQuoteText(quoteState, selectedPkg, selectedAddonsList, totalPrice) {
  const name = quoteState.clientName || 'Chris';
  const eventType = quoteState.eventType || 'birthday celebration';
  const rawDate = quoteState.eventDate ? new Date(quoteState.eventDate) : new Date('2027-06-19');
  
  const formattedDate = !isNaN(rawDate.getTime()) 
    ? rawDate.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    : 'Saturday 19th June 2027';

  const timing = quoteState.recommendedTiming || '7pm–10pm';
  const backdropName = quoteState.backdrop === 'ivory' ? 'ivory curtain' : 'burgundy curtain';

  let addonsText = '';
  if (selectedAddonsList.length > 0) {
    addonsText = `\n\nSelected Tailored Add-ons:\n` + selectedAddonsList.map(a => `• ${a.name} (+£${a.price})`).join('\n');
  }

  return `Hi ${name},

Thanks for getting in touch through Bark regarding your ${eventType} on ${formattedDate}.

Our interactive vintage photobooth is a stylish, statement booth designed to be part of the evening rather than just a photo-taking station. It features a large screen on the back, which can be personalised to display photos or videos of the guest of honour throughout the event.

Guests can enjoy unlimited visits to the booth, with luxury props and a choice of burgundy or ivory curtain backdrop to suit the style of your celebration.

For your evening, we’d recommend ${timing} as the sweet spot — giving everyone time to arrive and settle in, while capturing the fun, lively atmosphere once the celebrations are in full swing.

We have two main packages available:

2-Hour Digital Package – £250
• 2 hours of photobooth hire
• Unlimited visits to the booth
• Instant sharing via email, SMS or QR code
• Luxury props
• Choice of burgundy or ivory curtain backdrop

3-Hour Birthday Package – £350
• 3 hours of photobooth hire
• Unlimited visits to the booth
• Up to 6 prints per visit
• Instant digital sharing
• Luxury props
• Choice of burgundy or ivory curtain backdrop${addonsText}

Total Quote for your selected option (${selectedPkg.name}): £${totalPrice}

If you have any questions or would like to go ahead, just let me know and we’d be happy to get your date secured.

Best wishes,
Luca
SnapSuites Luxury Photobooth Hire
www.snapsuites.co.uk | bookings@snapsuites.co.uk`;
}
