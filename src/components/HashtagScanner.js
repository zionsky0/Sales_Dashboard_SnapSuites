export const REGIONAL_LAUNCHERS = [
  {
    title: '🏰 Cheshire Wedding Photobooth Requests',
    region: 'Cheshire & Country Estates',
    icon: '📸',
    hashtags: ['#CheshireWedding', '#CheshireBride', '#PeckfortonCastle', '#TattonParkWedding'],
    googleUrl: 'https://www.google.com/search?q=' + encodeURIComponent('site:instagram.com OR site:facebook.com "photobooth" "Cheshire" "looking for" OR "recommendations"'),
    tiktokUrl: 'https://www.tiktok.com/search?q=' + encodeURIComponent('Cheshire wedding photobooth hire'),
    desc: 'Live feeds for Cheshire brides & luxury country estate receptions.'
  },
  {
    title: '🏙️ Manchester Party & Wedding Enquiries',
    region: 'Greater Manchester',
    icon: '🥳',
    hashtags: ['#ManchesterWedding', '#ManchesterEvents', '#VictoriaWarehouse', '#DidsburyWeddings'],
    googleUrl: 'https://www.google.com/search?q=' + encodeURIComponent('site:instagram.com OR site:tiktok.com "photobooth" "Manchester" "wedding" OR "birthday"'),
    tiktokUrl: 'https://www.tiktok.com/search?q=' + encodeURIComponent('Manchester party photobooth hire'),
    desc: 'Live search for Manchester wedding & milestone 30th birthday hosts.'
  },
  {
    title: '🌹 Yorkshire Country Estate & Leeds Galas',
    region: 'Yorkshire & Leeds',
    icon: '🥂',
    hashtags: ['#YorkshireWedding', '#YorkshireBride', '#LeedsEvents', '#GrantleyHall', '#HarrogateWedding'],
    googleUrl: 'https://www.google.com/search?q=' + encodeURIComponent('site:instagram.com OR site:facebook.com "photobooth" "Leeds" OR "Harrogate" OR "Yorkshire" "hire"'),
    tiktokUrl: 'https://www.tiktok.com/search?q=' + encodeURIComponent('Yorkshire wedding photobooth hire'),
    desc: 'Live search for Yorkshire estate posts, charity galas, and corporate balls.'
  },
  {
    title: '🌊 Lancashire & Liverpool Venue Leads',
    region: 'Merseyside & Lancashire',
    icon: '⚓',
    hashtags: ['#LiverpoolWedding', '#LancashireWedding', '#RibbleValleyWeddings', '#KnowsleyHall'],
    googleUrl: 'https://www.google.com/search?q=' + encodeURIComponent('site:instagram.com OR site:bark.com "photobooth" "Liverpool" OR "Lancashire"'),
    tiktokUrl: 'https://www.tiktok.com/search?q=' + encodeURIComponent('Liverpool wedding photobooth'),
    desc: 'Live search for Liverpool waterfront & Ribble Valley wedding hosts.'
  }
];

export function renderHashtagScanner(
  liveResults = [],
  searchQuery = 'photobooth hire Cheshire Manchester wedding',
  isScanning = false,
  apifyToken = ''
) {
  return `
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <!-- Hero Banner -->
      <div style="background: linear-gradient(135deg, var(--bg-card-solid), rgba(212,175,55,0.2), rgba(128,0,32,0.3)); border: 1px solid var(--border-glass); border-radius: var(--radius-xl); padding: 26px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
        <div style="max-width: 780px;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
            <span class="badge" style="background: var(--gold-primary); color: #000; font-weight: 800; font-size: 11px;">
              ⚡ AUTOMATED LIVE LEAD SCANNER
            </span>
            <span class="badge" style="background: rgba(16,185,129,0.2); color: var(--accent-success); border: 1px solid var(--accent-success);">
              ● Live Web & Forum Crawler Active
            </span>
          </div>
          <h2 style="font-size: 26px; font-weight: 800; color: #FFF; margin-bottom: 6px;">
            📡 Automated Lead Scanner & Finder
          </h2>
          <p style="font-size: 14px; color: var(--text-muted); line-height: 1.5;">
            Automatically monitors public feeds, wedding alerts, and regional inquiries across Cheshire, Manchester, Leeds & Lancashire. Generates instant personalized DM pitch scripts and syncs leads to your CRM.
          </p>
        </div>

        <button class="btn btn-gold ${isScanning ? 'btn-scanning' : ''}" id="btn-trigger-auto-scan" style="font-weight: 700; padding: 12px 24px; font-size: 15px;">
          ${isScanning ? '🔄 Scanning Live Feeds...' : '⚡ Scan Live Feeds Now'}
        </button>
      </div>

      <!-- Live Search & Crawler Console -->
      <div style="background: var(--bg-card); border: 1px solid var(--border-glass); border-radius: var(--radius-xl); padding: 22px; display: flex; flex-direction: column; gap: 16px; box-shadow: var(--shadow-card);">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
          <h3 style="font-size: 18px; font-weight: 700; color: #FFF; display: flex; align-items: center; gap: 8px;">
            <span>🔎 Automated Keyword Crawler</span>
          </h3>
          <span style="font-size: 12px; color: var(--gold-light);">
            ${liveResults.length} real live opportunities indexed
          </span>
        </div>

        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <div style="flex: 3; min-width: 280px; position: relative;">
            <input 
              type="text" 
              id="crawler-query-input" 
              class="input-search" 
              style="width: 100%; padding: 12px 14px 12px 42px; font-size: 14px;" 
              placeholder="e.g. photobooth hire Cheshire wedding OR Manchester party..." 
              value="${searchQuery}"
            />
            <span style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); font-size: 16px; color: var(--gold-primary);">🔍</span>
          </div>

          <button class="btn btn-gold" id="btn-submit-crawler-query" style="font-weight: 700; padding: 0 22px;">
            Run Auto-Scan
          </button>
        </div>

        <!-- Quick Keyword Chips -->
        <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; font-size: 12px; color: var(--text-muted); padding-top: 4px; border-top: 1px dashed var(--border-light);">
          <span style="font-weight: 600;">Popular Regional Queries:</span>
          ${[
            'Peckforton Castle wedding',
            'Tatton Park Cheshire',
            'Victoria Warehouse Manchester',
            'photobooth hire Leeds',
            'Knowsley Hall Liverpool',
            'Grantley Hall Yorkshire',
            'Cheshire wedding photobooth'
          ].map(tag => `
            <button class="btn btn-glass btn-sm crawler-tag-chip" data-query="${tag}" style="padding: 4px 10px; font-size: 11px; color: var(--gold-light);">
              ${tag}
            </button>
          `).join('')}
        </div>

        <!-- Optional Apify Social Token Input for Instagram/TikTok Scrapes -->
        <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 12px 16px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
          <div style="font-size: 12px; color: var(--text-muted);">
            <strong style="color: #FFF;">📸 Optional Direct Instagram / TikTok Scraper Token:</strong> (Free Apify API token for live Instagram hashtag scraping)
          </div>
          <div style="display: flex; gap: 8px; flex: 1; max-width: 380px;">
            <input type="password" id="apify-token-input" class="form-control" style="font-size: 12px; padding: 6px 10px;" placeholder="Paste Apify token (optional)" value="${apifyToken}" />
            <button class="btn btn-glass btn-sm" id="btn-save-apify-token">Save Token</button>
          </div>
        </div>
      </div>

      <!-- Verified Live Platform Launchers (Direct Deep Links) -->
      <div style="background: var(--bg-card); border: 1px solid var(--border-glass); border-radius: var(--radius-xl); padding: 22px;">
        <h3 style="font-size: 17px; font-weight: 700; color: var(--gold-light); margin-bottom: 4px;">
          📍 Direct Verified Social Feeds
        </h3>
        <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 16px;">
          1-click launchers to open live public buyer searches on Instagram, TikTok, Facebook, and Google:
        </p>

        <div class="scanner-launchers-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
          ${REGIONAL_LAUNCHERS.map(launcher => `
            <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-light); border-radius: 12px; padding: 16px; display: flex; flex-direction: column; gap: 10px;">
              <div style="font-size: 15px; font-weight: 700; color: #FFF; display: flex; align-items: center; gap: 8px;">
                <span>${launcher.icon}</span>
                <span>${launcher.title}</span>
              </div>
              <div style="font-size: 12px; color: var(--text-muted);">${launcher.desc}</div>

              <div style="display: flex; flex-wrap: wrap; gap: 5px;">
                ${launcher.hashtags.map(ht => {
                  const tagClean = ht.replace('#', '');
                  const igUrl = `https://www.instagram.com/explore/tags/${tagClean}/`;
                  return `
                    <a href="${igUrl}" target="_blank" rel="noopener noreferrer" class="badge" style="background: rgba(212,175,55,0.12); color: var(--gold-primary); text-decoration: none; border: 1px solid var(--border-glass); font-size: 11px;">
                      ${ht} ↗
                    </a>
                  `;
                }).join('')}
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: auto; padding-top: 4px;">
                <a href="${launcher.googleUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-gold btn-sm" style="text-decoration: none; justify-content: center; font-weight: 700; font-size: 11px;">
                  🔍 Google Index ↗
                </a>
                <a href="${launcher.tiktokUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-glass btn-sm" style="text-decoration: none; justify-content: center; font-size: 11px;">
                  🎵 TikTok Feed ↗
                </a>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Live Auto-Scanned Results Feed -->
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <h3 style="font-size: 19px; font-weight: 700; color: #FFF; display: flex; align-items: center; gap: 8px;">
            <span>🎯 Live Streamed Opportunities & Inquiries</span>
            <span style="font-size: 13px; color: var(--gold-light); background: rgba(212,175,55,0.15); padding: 2px 10px; border-radius: 12px; border: 1px solid var(--border-glass);">
              ${liveResults.length} real leads
            </span>
          </h3>
        </div>

        <div class="scanner-feed-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px;">
          ${liveResults.length === 0 ? `
            <div style="grid-column: 1 / -1; background: var(--bg-card); border: 1px dashed var(--border-light); padding: 40px; text-align: center; border-radius: var(--radius-lg); color: var(--text-muted);">
              <div style="font-size: 32px; margin-bottom: 10px;">🔄</div>
              <h4 style="color: #FFF; font-size: 16px; margin-bottom: 6px;">Ready to Scan Live Leads</h4>
              <p style="font-size: 13px; max-width: 500px; margin: 0 auto 16px auto;">
                Click <strong>"⚡ Scan Live Feeds Now"</strong> to run the automated crawler across Google Alerts, regional wedding forums, and public feeds for photobooth hire.
              </p>
              <button class="btn btn-gold btn-sm" id="btn-empty-scan-trigger">⚡ Scan Live Feeds Now</button>
            </div>
          ` : liveResults.map(item => `
            <div class="lead-card" style="border-left: 4px solid var(--gold-primary); padding: 20px; display: flex; flex-direction: column; gap: 12px;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                <div>
                  <div style="font-weight: 700; font-size: 15px; color: #FFF; line-height: 1.3;">${item.title || item.authorName}</div>
                  <div style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">Source: ${item.authorName || item.platform}</div>
                </div>
                <span class="badge" style="background: rgba(212,175,55,0.15); color: var(--gold-primary); font-size: 11px;">
                  ${item.platform}
                </span>
              </div>

              <div style="font-size: 13px; color: var(--text-muted);">
                📍 ${item.region || 'North West'} • 📅 ${item.timeAgo || 'Recent'}
              </div>

              ${item.postSnippet ? `
                <div style="background: rgba(0,0,0,0.4); border: 1px solid var(--border-light); padding: 10px; border-radius: 8px; font-size: 12px; color: var(--text-main); line-height: 1.4;">
                  "${item.postSnippet}"
                </div>
              ` : ''}

              <div style="display: flex; flex-direction: column; gap: 8px; margin-top: auto; padding-top: 10px; border-top: 1px dashed var(--border-light);">
                <div style="display: flex; gap: 8px;">
                  <button class="btn btn-gold btn-sm btn-quick-pitch-trigger" data-post-id="${item.id}" style="flex: 1; font-weight: 700;">
                    ⚡ 1-Click Pitch Script
                  </button>
                  <a href="${item.postUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-glass btn-sm" style="text-decoration: none;" title="Open live link">
                    🔗 Open Link ↗
                  </a>
                </div>

                <div style="display: flex; gap: 8px;">
                  <button class="btn btn-burgundy btn-sm btn-convert-live-lead" data-post-id="${item.id}" style="flex: 1;">
                    📥 Add to CRM Pipeline (£${item.estimatedValue || 350})
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}
