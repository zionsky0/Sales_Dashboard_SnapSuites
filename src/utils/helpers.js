export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0
  }).format(amount || 0);
}

export function formatDate(dateString) {
  if (!dateString) return 'TBD';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  } catch (e) {
    return dateString;
  }
}

export function calculateMetrics(leads, settings) {
  const totalLeads = leads.length;
  const activeLeads = leads.filter(l => l.stage !== 'lost' && l.stage !== 'completed');
  
  const pipelineValue = activeLeads.reduce((sum, l) => sum + (Number(l.dealValue) || 0), 0);
  
  const securedLeads = leads.filter(l => l.stage === 'secured' || l.stage === 'completed');
  const securedValue = securedLeads.reduce((sum, l) => sum + (Number(l.dealValue) || 0), 0);
  
  const closedOrLostCount = leads.filter(l => l.stage === 'secured' || l.stage === 'completed' || l.stage === 'lost').length;
  const conversionRate = closedOrLostCount > 0 
    ? Math.round((securedLeads.length / closedOrLostCount) * 100)
    : Math.round((securedLeads.length / (totalLeads || 1)) * 100);

  // Commission calculation
  const totalCommissionEarned = securedLeads.reduce((sum, l) => {
    const rate = Number(l.commissionRate) || settings.defaultCommissionRate || 10;
    return sum + (Number(l.dealValue) * (rate / 100));
  }, 0);

  const pendingCommission = leads
    .filter(l => l.stage === 'quote_sent' || l.stage === 'negotiation')
    .reduce((sum, l) => {
      const rate = Number(l.commissionRate) || settings.defaultCommissionRate || 10;
      return sum + (Number(l.dealValue) * (rate / 100));
    }, 0);

  return {
    totalLeads,
    activeLeadsCount: activeLeads.length,
    pipelineValue,
    securedValue,
    conversionRate,
    totalCommissionEarned,
    pendingCommission
  };
}

export function getStageBadge(stageId, stages) {
  const stage = stages.find(s => s.id === stageId) || { name: stageId, color: '#6B7280', icon: '📌' };
  return `<span class="badge" style="background:${stage.color}22; color:${stage.color}; border: 1px solid ${stage.color}55;">
    <i>${stage.icon}</i> ${stage.name}
  </span>`;
}
