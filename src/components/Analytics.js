import { formatCurrency, calculateMetrics } from '../utils/helpers.js';
import { PACKAGES } from '../data/initialData.js';

export function renderAnalytics(leads, settings) {
  const metrics = calculateMetrics(leads, settings);

  // Group leads by lead source
  const sourceBreakdown = {};
  leads.forEach(l => {
    const src = l.source || 'Bark';
    if (!sourceBreakdown[src]) {
      sourceBreakdown[src] = { count: 0, totalValue: 0, securedValue: 0 };
    }
    sourceBreakdown[src].count += 1;
    sourceBreakdown[src].totalValue += (Number(l.dealValue) || 0);
    if (l.stage === 'secured' || l.stage === 'completed') {
      sourceBreakdown[src].securedValue += (Number(l.dealValue) || 0);
    }
  });

  // Package popularity breakdown
  const packageBreakdown = {};
  leads.forEach(l => {
    const pkg = PACKAGES.find(p => p.id === l.packageId) || { name: 'Custom Package' };
    packageBreakdown[pkg.name] = (packageBreakdown[pkg.name] || 0) + 1;
  });

  return `
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <!-- Header Banner -->
      <div style="background: var(--bg-card); border: 1px solid var(--border-glass); border-radius: var(--radius-xl); padding: 24px;">
        <h2 style="font-size: 22px; font-weight: 700; color: #FFF; margin-bottom: 4px;">📈 Sales Commission & Channel Analytics</h2>
        <p style="font-size: 13px; color: var(--text-muted);">Track your total earnings, high-converting lead channels, and popular photobooth packages.</p>
      </div>

      <!-- Financial Metrics Summary Cards -->
      <div class="metrics-grid">
        <div class="metric-card" style="border-left-color: var(--gold-primary);">
          <div class="metric-header">
            <span class="metric-title">Total Earned Payout</span>
            <span class="metric-icon">💵</span>
          </div>
          <div class="metric-value" style="color: var(--gold-primary);">${formatCurrency(metrics.totalCommissionEarned)}</div>
          <div class="metric-subtext">Based on secured & completed jobs</div>
        </div>

        <div class="metric-card" style="border-left-color: var(--accent-info);">
          <div class="metric-header">
            <span class="metric-title">Pending Quote Commission</span>
            <span class="metric-icon">⏳</span>
          </div>
          <div class="metric-value" style="color: var(--accent-info);">${formatCurrency(metrics.pendingCommission)}</div>
          <div class="metric-subtext">Pending client deposit confirmation</div>
        </div>

        <div class="metric-card" style="border-left-color: var(--accent-success);">
          <div class="metric-header">
            <span class="metric-title">Total Revenue Generated</span>
            <span class="metric-icon">🏆</span>
          </div>
          <div class="metric-value" style="color: var(--accent-success);">${formatCurrency(metrics.securedValue)}</div>
          <div class="metric-subtext">Total photobooth bookings value</div>
        </div>
      </div>

      <!-- Breakdown Grids -->
      <div class="analytics-breakdown-grid">
        <!-- Lead Source ROI Table -->
        <div style="background: var(--bg-card); border: 1px solid var(--border-glass); border-radius: var(--radius-xl); padding: 24px; display: flex; flex-direction: column; gap: 16px;">
          <h3 style="font-size: 18px; font-weight: 700; color: #FFF;">🎯 Lead Channels ROI Breakdown</h3>
          <div class="table-responsive" style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 13px;">
              <thead>
                <tr style="border-bottom: 1px solid var(--border-light); color: var(--text-muted); font-size: 11px; text-transform: uppercase;">
                  <th style="padding: 10px;">Lead Source</th>
                  <th style="padding: 10px;">Enquiries</th>
                  <th style="padding: 10px;">Pipeline Value</th>
                  <th style="padding: 10px;">Secured Value</th>
                  <th style="padding: 10px;">Est. Commission</th>
                </tr>
              </thead>
              <tbody>
                ${Object.entries(sourceBreakdown).map(([source, data]) => `
                  <tr style="border-bottom: 1px solid rgba(255,255,255,0.04);">
                    <td style="padding: 12px 10px; font-weight: 700; color: #FFF;">${source}</td>
                    <td style="padding: 12px 10px;">${data.count}</td>
                    <td style="padding: 12px 10px;">${formatCurrency(data.totalValue)}</td>
                    <td style="padding: 12px 10px; color: var(--accent-success); font-weight: 600;">${formatCurrency(data.securedValue)}</td>
                    <td style="padding: 12px 10px; color: var(--gold-primary); font-weight: 700;">${formatCurrency(data.securedValue * 0.10)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Package Popularity Breakdown -->
        <div style="background: var(--bg-card); border: 1px solid var(--border-glass); border-radius: var(--radius-xl); padding: 24px; display: flex; flex-direction: column; gap: 16px;">
          <h3 style="font-size: 18px; font-weight: 700; color: #FFF;">📸 Package Demand Share</h3>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            ${Object.entries(packageBreakdown).map(([pkgName, count]) => {
              const pct = Math.round((count / (leads.length || 1)) * 100);
              return `
                <div style="background: var(--bg-card-solid); border: 1px solid var(--border-light); padding: 14px; border-radius: 12px; display: flex; flex-direction: column; gap: 6px;">
                  <div style="display: flex; justify-content: space-between; font-weight: 600; font-size: 13px; color: #FFF;">
                    <span>${pkgName}</span>
                    <span style="color: var(--gold-primary);">${count} bookings (${pct}%)</span>
                  </div>
                  <div class="progress-bar-bg">
                    <div class="progress-bar-fill" style="width: ${pct}%;"></div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}
