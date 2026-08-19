import { OUTREACH_TEMPLATES, OBJECTION_HANDLING, COMPETITOR_BENCHMARK } from '../data/initialData.js';

export function renderPlaybook(activeCategory = 'all') {
  return `
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <!-- Header Banner -->
      <div style="background: linear-gradient(135deg, var(--bg-card-solid), rgba(128,0,32,0.3)); border: 1px solid var(--border-glass); border-radius: var(--radius-xl); padding: 24px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h2 style="font-size: 22px; font-weight: 700; color: #FFF; margin-bottom: 4px;">💬 Bark & Venue Sales Playbook</h2>
          <p style="font-size: 13px; color: var(--text-muted);">High-converting response scripts, venue cold outreach templates, competitor benchmarks, and objection handling.</p>
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="btn btn-glass btn-sm playbook-filter-btn ${activeCategory === 'all' ? 'active' : ''}" data-category="all">
            All Guides
          </button>
          <button class="btn btn-glass btn-sm playbook-filter-btn ${activeCategory === 'Bark Lead Reply' ? 'active' : ''}" data-category="Bark Lead Reply">
            Bark Replies
          </button>
          <button class="btn btn-glass btn-sm playbook-filter-btn ${activeCategory === 'Venue Outreach' ? 'active' : ''}" data-category="Venue Outreach">
            Venue Outreach
          </button>
        </div>
      </div>

      <!-- Competitor Value Benchmark Matrix -->
      <div class="playbook-card" style="border-color: var(--border-glass);">
        <h3 style="font-size: 18px; font-weight: 700; color: var(--gold-primary);">⚔️ Competitor Comparison Matrix (Why SnapSuites Wins)</h3>
        <p style="font-size: 13px; color: var(--text-muted);">Use these points when clients ask why SnapSuites costs £250–£350 compared to cheap £150 selfie pods:</p>

        <div style="overflow-x: auto; margin-top: 12px;">
          <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 13px;">
            <thead>
              <tr style="border-bottom: 1px solid var(--border-light); color: var(--gold-light); font-size: 12px; text-transform: uppercase;">
                <th style="padding: 10px;">Feature / Value</th>
                <th style="padding: 10px; color: var(--gold-primary);">📸 SnapSuites Vintage Booth</th>
                <th style="padding: 10px; color: #94A3B8;">📱 Cheap Selfie Pod (£150)</th>
                <th style="padding: 10px; color: #94A3B8;">🪞 Magic Mirror (£350)</th>
              </tr>
            </thead>
            <tbody>
              ${COMPETITOR_BENCHMARK.map(row => `
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.04);">
                  <td style="padding: 12px 10px; font-weight: 700; color: #FFF;">${row.feature}</td>
                  <td style="padding: 12px 10px; color: var(--gold-primary); font-weight: 700; background: rgba(212,175,55,0.05);">${row.snapsuites}</td>
                  <td style="padding: 12px 10px; color: var(--text-muted);">${row.cheapPod}</td>
                  <td style="padding: 12px 10px; color: var(--text-muted);">${row.magicMirror}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
        <!-- Column 1: Fast Outreach & Response Templates -->
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <h3 style="font-size: 18px; font-weight: 700; color: var(--gold-light);">📤 Outreach & Response Scripts</h3>
          
          ${OUTREACH_TEMPLATES.filter(t => activeCategory === 'all' || t.category === activeCategory).map(template => `
            <div class="playbook-card">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span class="badge" style="background: rgba(212, 175, 55, 0.15); color: var(--gold-primary);">${template.category}</span>
                <button class="btn btn-gold btn-sm btn-copy-template" data-template-id="${template.id}">
                  📋 Copy Script
                </button>
              </div>
              <h4 style="font-size: 16px; color: #FFF; font-weight: 700;">${template.title}</h4>
              <div style="font-size: 12px; color: var(--gold-light); font-family: monospace;">Subject: ${template.subject}</div>
              <div style="background: rgba(0,0,0,0.4); border: 1px solid var(--border-light); padding: 14px; border-radius: 8px; font-size: 12px; color: var(--text-muted); white-space: pre-wrap; max-height: 200px; overflow-y: auto;">${template.body}</div>
            </div>
          `).join('')}
        </div>

        <!-- Column 2: Objection Handling Cheatsheet -->
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <h3 style="font-size: 18px; font-weight: 700; color: var(--gold-light);">🛡️ Sales Objection Handling Cheatsheet</h3>
          
          <div class="playbook-card">
            <p style="font-size: 13px; color: var(--text-muted);">Key answers when potential clients ask about pricing comparisons, photobooth timing, or features:</p>
            
            ${OBJECTION_HANDLING.map(item => `
              <div class="objection-box">
                <div class="objection-title">${item.objection}</div>
                <ul class="talking-points-list">
                  ${item.talkingPoints.map(tp => `<li>${formatTalkingPoint(tp)}</li>`).join('')}
                </ul>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

function formatTalkingPoint(text) {
  return text.replace(/\*\*(.*?)\*\*/g, '<strong style="color: #FFF;">$1</strong>');
}
