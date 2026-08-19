import { formatDate, formatCurrency } from '../utils/helpers.js';
import { STAGES } from '../data/initialData.js';

export function renderCalendarView(leads) {
  // Sort leads by date ascending
  const sortedLeads = [...leads].sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));

  return `
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <div style="background: var(--bg-card); border: 1px solid var(--border-glass); border-radius: var(--radius-xl); padding: 24px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h2 style="font-size: 22px; font-weight: 700; color: #FFF; margin-bottom: 4px;">📅 Event Schedule & Date Hold Calendar</h2>
          <p style="font-size: 13px; color: var(--text-muted);">Overview of confirmed bookings, date holds, and upcoming quote dates to avoid scheduling conflicts.</p>
        </div>
        <div>
          <button class="btn btn-gold btn-sm" id="btn-add-event-calendar">
            ➕ Schedule New Event Date
          </button>
        </div>
      </div>

      <!-- Schedule Cards List -->
      <div class="schedule-grid">
        ${sortedLeads.map(lead => {
          const stage = STAGES.find(s => s.id === lead.stage) || { name: lead.stage, color: '#6B7280', icon: '📌' };
          const dateObj = new Date(lead.eventDate);
          const monthName = !isNaN(dateObj.getTime()) ? dateObj.toLocaleString('en-GB', { month: 'short' }).toUpperCase() : 'DEC';
          const dayNum = !isNaN(dateObj.getTime()) ? dateObj.getDate() : '19';
          const yearNum = !isNaN(dateObj.getTime()) ? dateObj.getFullYear() : '2027';

          return `
            <div style="background: var(--bg-card-solid); border: 1px solid var(--border-light); border-left: 4px solid ${stage.color}; border-radius: var(--radius-lg); padding: 18px; display: flex; gap: 16px; align-items: center; position: relative;">
              <!-- Date Block Badge -->
              <div style="background: rgba(0,0,0,0.4); border: 1px solid var(--border-light); border-radius: 12px; min-width: 65px; height: 75px; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                <span style="font-size: 11px; font-weight: 700; color: var(--gold-primary); text-transform: uppercase;">${monthName}</span>
                <span style="font-size: 24px; font-weight: 800; color: #FFF; line-height: 1;">${dayNum}</span>
                <span style="font-size: 10px; color: var(--text-muted);">${yearNum}</span>
              </div>

              <!-- Event Info -->
              <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                  <div style="font-weight: 700; font-size: 16px; color: #FFF;">${lead.clientName}</div>
                  <span class="badge" style="background: ${stage.color}22; color: ${stage.color}; font-size: 10px;">
                    ${stage.icon} ${stage.name}
                  </span>
                </div>

                <div style="font-size: 12px; color: var(--gold-light); font-weight: 600;">${lead.eventType}</div>
                <div style="font-size: 12px; color: var(--text-muted);">📍 ${lead.venue}</div>
                <div style="font-size: 11px; color: var(--text-dim); margin-top: 4px;">
                  ⏰ ${lead.recommendedTiming || '7pm–10pm'} • ${formatCurrency(lead.dealValue)}
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}
