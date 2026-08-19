import { formatCurrency, calculateMetrics } from '../utils/helpers.js';

export function renderHeader(leads, settings, activeTab) {
  const metrics = calculateMetrics(leads, settings);
  const targetPct = Math.min(Math.round((metrics.securedValue / (settings.monthlyTarget || 3000)) * 100), 100);

  return `
    <header class="top-header">
      <div class="brand-section">
        <div class="brand-logo-container">
          <span class="brand-logo-icon">📸</span>
        </div>
        <div class="brand-text">
          <h1>SnapSuites Sales Hub</h1>
          <div class="brand-subtitle">
            <span>Luxury Photobooth Hire • North West & Yorkshire</span>
            <span class="brand-badge">Sales Rep Portal</span>
          </div>
        </div>
      </div>

      <div class="header-actions">
        <button class="btn btn-gold" id="btn-quick-new-lead">
          <i>➕</i> New Lead
        </button>
        <button class="btn btn-burgundy" id="btn-quick-quote">
          <i>🧮</i> Instant Quote
        </button>
        <button class="btn btn-glass btn-icon" id="btn-settings-trigger" title="Settings">
          ⚙️
        </button>
        <button class="btn btn-glass btn-icon" id="btn-export-trigger" title="Export Backup JSON/CSV">
          📥
        </button>
        <button class="btn btn-glass btn-icon" id="btn-logout-trigger" title="Lock / Logout" style="border-color: rgba(239, 68, 68, 0.4); color: #FCA5A5;">
          🔒
        </button>
      </div>
    </header>

    <!-- Metrics Cards Row -->
    <div class="metrics-grid">
      <div class="metric-card">
        <div class="metric-header">
          <span class="metric-title">Pipeline Value</span>
          <span class="metric-icon">💼</span>
        </div>
        <div class="metric-value">${formatCurrency(metrics.pipelineValue)}</div>
        <div class="metric-subtext">
          <span>${metrics.activeLeadsCount} active opportunities</span>
        </div>
      </div>

      <div class="metric-card" style="border-left-color: var(--accent-success);">
        <div class="metric-header">
          <span class="metric-title">Secured Sales</span>
          <span class="metric-icon">🎉</span>
        </div>
        <div class="metric-value" style="color: var(--accent-success);">${formatCurrency(metrics.securedValue)}</div>
        <div class="metric-subtext">
          <span class="metric-trend-positive">Conversion Rate: ${metrics.conversionRate}%</span>
        </div>
      </div>

      <div class="metric-card" style="border-left-color: var(--gold-primary);">
        <div class="metric-header">
          <span class="metric-title">Earned Commission</span>
          <span class="metric-icon">💰</span>
        </div>
        <div class="metric-value" style="color: var(--gold-light);">${formatCurrency(metrics.totalCommissionEarned)}</div>
        <div class="metric-subtext">
          <span>+ ${formatCurrency(metrics.pendingCommission)} pending quote closure</span>
        </div>
      </div>

      <div class="metric-card" style="border-left-color: var(--accent-info);">
        <div class="metric-header">
          <span class="metric-title">Sales Target Progress</span>
          <span class="metric-icon">🎯</span>
        </div>
        <div class="metric-value">${targetPct}%</div>
        <div class="target-progress-container">
          <div class="progress-bar-bg">
            <div class="progress-bar-fill" style="width: ${targetPct}%;"></div>
          </div>
          <div style="font-size: 11px; color: var(--text-muted); display: flex; justify-content: space-between; margin-top: 4px;">
            <span>Target: ${formatCurrency(settings.monthlyTarget || 3000)}</span>
            <span>${formatCurrency(metrics.securedValue)} won</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation Tabs -->
    <nav class="tab-nav">
      <button class="tab-btn ${activeTab === 'pipeline' ? 'active' : ''}" data-tab="pipeline">
        📊 CRM Lead Pipeline
      </button>
      <button class="tab-btn ${activeTab === 'prospecting' ? 'active' : ''}" data-tab="prospecting">
        🎯 Prospecting Radar
      </button>
      <button class="tab-btn ${activeTab === 'directory' ? 'active' : ''}" data-tab="directory">
        🏢 Target Directory (50 Venues)
      </button>
      <button class="tab-btn ${activeTab === 'guide' ? 'active' : ''}" data-tab="guide">
        🚀 Beginner Sales Guide
      </button>
      <button class="tab-btn ${activeTab === 'quote' ? 'active' : ''}" data-tab="quote">
        🧮 Instant Quote Builder
      </button>
      <button class="tab-btn ${activeTab === 'playbook' ? 'active' : ''}" data-tab="playbook">
        💬 Bark & Outreach Playbook
      </button>
      <button class="tab-btn ${activeTab === 'calendar' ? 'active' : ''}" data-tab="calendar">
        📅 Event Schedule
      </button>
      <button class="tab-btn ${activeTab === 'analytics' ? 'active' : ''}" data-tab="analytics">
        📈 Commission Analytics
      </button>
    </nav>
  `;
}
