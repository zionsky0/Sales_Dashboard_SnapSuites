import { OUTREACH_TEMPLATES, OBJECTION_HANDLING, COMPETITOR_BENCHMARK } from '../data/initialData.js';

export function renderPlaybook(activeCategory = 'all') {
  const templates = OUTREACH_TEMPLATES || [];
  const benchmarks = COMPETITOR_BENCHMARK || [];
  const objections = OBJECTION_HANDLING || [];

  return `
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <!-- Header Banner -->
      <div style="background: linear-gradient(135deg, var(--bg-card-solid), rgba(128,0,32,0.3)); border: 1px solid var(--border-glass); border-radius: var(--radius-xl); padding: 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
        <div>
          <h2 style="font-size: 22px; font-weight: 700; color: #FFF; margin-bottom: 4px;">💬 Bark & Venue Sales Playbook</h2>
          <p style="font-size: 13px; color: var(--text-muted);">High-converting response scripts, venue cold outreach templates, competitor benchmarks, and objection handling.</p>
        </div>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <button class="btn btn-glass btn-sm playbook-filter-btn ${activeCategory === 'all' ? 'active' : ''}" data-category="all">
            All Guides
          </button>
          <button class="btn btn-glass btn-sm playbook-filter-btn ${activeCategory === 'Bark Lead Reply' ? 'active' : ''}" data-category="Bark Lead Reply">
            Bark Replies
          </button>
          <button class="btn btn-glass btn-sm playbook-filter-btn ${activeCategory === 'Venue Outreach' ? 'active' : ''}" data-category="Venue Outreach">
            Venue Outreach
          </button>
          <button class="btn btn-glass btn-sm playbook-filter-btn ${activeCategory === 'Planner Outreach' ? 'active' : ''}" data-category="Planner Outreach">
            Planner Outreach
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
              ${benchmarks.map(row => `
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

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); gap: 24px;">
        <!-- Column 1: Fast Outreach & Response Templates -->
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <h3 style="font-size: 18px; font-weight: 700; color: var(--gold-light);">📤 Outreach & Response Scripts</h3>
          
          ${templates.filter(t => activeCategory === 'all' || t.category === activeCategory).map(template => `
            <div class="playbook-card">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span class="badge" style="background: rgba(212, 175, 55, 0.15); color: var(--gold-primary);">${template.category}</span>
                <button class="btn btn-gold btn-sm btn-copy-template" data-template-id="${template.id}">
                  📋 Copy Script
                </button>
              </div>
              <h4 style="font-size: 16px; color: #FFF; font-weight: 700; margin-top: 8px;">${template.title}</h4>
              <div style="font-size: 12px; color: var(--gold-light); font-family: monospace; margin: 4px 0 8px 0;">Subject: ${template.subject}</div>
              <div style="background: rgba(0,0,0,0.4); border: 1px solid var(--border-light); padding: 14px; border-radius: 8px; font-size: 12px; color: var(--text-muted); white-space: pre-wrap; max-height: 220px; overflow-y: auto; line-height: 1.5;">${template.body}</div>
            </div>
          `).join('')}
        </div>

        <!-- Column 2: Objection Handling Cheatsheet -->
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <h3 style="font-size: 18px; font-weight: 700; color: var(--gold-light);">🛡️ Sales Objection Handling Cheatsheet</h3>
          
          <div class="playbook-card">
            <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 12px;">Key answers when potential clients ask about pricing comparisons, photobooth timing, or features:</p>
            
            ${objections.map(item => `
              <div class="objection-box" style="background: rgba(0,0,0,0.3); border: 1px solid var(--border-light); border-radius: 8px; padding: 14px; margin-bottom: 12px;">
                <div class="objection-title" style="font-size: 14px; font-weight: 700; color: var(--gold-primary); margin-bottom: 6px;">${item.objection}</div>
                <ul class="talking-points-list" style="padding-left: 18px; margin: 0; font-size: 12px; color: var(--text-main); line-height: 1.6;">
                  ${(item.talkingPoints || (item.response ? [item.response] : [])).map(tp => `<li>${formatTalkingPoint(tp)}</li>`).join('')}
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
  if (typeof text !== 'string') return '';
  return text.replace(/\*\*(.*?)\*\*/g, '<strong style="color: #FFF;">$1</strong>');
}
