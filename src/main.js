import confetti from 'canvas-confetti';

import { 
  getStoredLeads, 
  saveLeads, 
  getStoredProspects, 
  saveProspects, 
  getStoredSettings, 
  saveSettings, 
  getStoredSocialPosts, 
  saveSocialPosts, 
  getStoredDirectory,
  saveDirectory,
  exportDirectoryAsCSV,
  resetToInitialData, 
  exportDataAsJSON, 
  exportLeadsAsCSV 
} from './utils/storage.js';

import { isAuthenticated, login, logout, updateCredentials } from './utils/auth.js';
import { PACKAGES, ADD_ONS, OUTREACH_TEMPLATES, INITIAL_SOCIAL_POSTS } from './data/initialData.js';
import {
  testServerConnection,
  pullFromServer,
  pushToServer,
  triggerAutoPush,
  normalizeServerUrl
} from './utils/syncClient.js';
import {
  testSupabaseConnection,
  pullFromSupabase,
  pushToSupabase,
  triggerSupabaseAutoPush,
  SUPABASE_SQL_SETUP
} from './utils/supabaseClient.js';

// Expose global triggers for storage changes
if (typeof window !== 'undefined') {
  window.__triggerAutoPush = triggerAutoPush;
  window.__triggerSupabaseAutoPush = triggerSupabaseAutoPush;
}

import { renderHeader } from './components/Header.js';
import { renderLoginGate } from './components/LoginGate.js';
import { renderLeadPipeline } from './components/LeadPipeline.js';
import { renderProspectingRadar } from './components/ProspectingRadar.js';
import { renderSalesGuide } from './components/SalesGuide.js';
import { renderQuoteBuilder, generateQuoteText } from './components/QuoteBuilder.js';
import { renderPlaybook } from './components/Playbook.js';
import { renderCalendarView } from './components/CalendarView.js';
import { renderAnalytics } from './components/Analytics.js';
import { renderDirectoryView } from './components/DirectoryView.js';
import { renderDirectorySyncModal } from './components/DirectorySyncModal.js';
import { renderLeadModal } from './components/LeadModal.js';
import { renderProspectModal } from './components/ProspectModal.js';
import { renderClipPostModal } from './components/ClipPostModal.js';
import { renderQuickPitchModal } from './components/QuickPitchModal.js';
import { renderProposalModal } from './components/ProposalModal.js';
import { renderSettingsModal } from './components/SettingsModal.js';

// Application State
let leads = getStoredLeads();
let prospects = getStoredProspects();
let settings = getStoredSettings();
let socialPosts = getStoredSocialPosts();
let directory = getStoredDirectory();
let activeTab = 'directory';

// Authentication State
let loginErrorMessage = '';
let isLoginLoading = false;

// Directory Search & Filters
let directorySearch = '';
let directoryCategoryFilter = 'all';
let directoryStatusFilter = 'all';
let directoryWeekFilter = 'all';
let editingDirectoryItem = null;

// Search & Filters
let pipelineSearch = '';
let pipelineStageFilter = 'all';
let pipelineSourceFilter = 'all';

let prospectSearch = '';
let prospectStatusFilter = 'all';

// Quote Builder State
let quoteState = {
  clientName: 'Chris',
  eventType: 'Birthday Celebration',
  eventDate: '2027-06-19',
  recommendedTiming: '7pm–10pm',
  packageId: 'birthday-3h',
  backdrop: 'burgundy',
  selectedAddons: ['rear_screen_custom']
};

let playbookCategory = 'all';

// Modal State
let currentModal = null; // 'lead' | 'prospect' | 'clip' | 'pitch' | 'proposal' | 'settings' | 'directory_sync'
let editingLead = null;
let editingProspect = null;
let activePitchPost = null;
let proposalData = null;

async function init() {
  render();

  if (isAuthenticated()) {
    // 1. Supabase Cloud Sync (Primary)
    if (settings.supabaseUrl && settings.supabaseKey) {
      try {
        const res = await pullFromSupabase(settings.supabaseUrl, settings.supabaseKey);
        if (res.success && res.data) {
          leads = getStoredLeads();
          prospects = getStoredProspects();
          directory = getStoredDirectory();
          socialPosts = getStoredSocialPosts();
          settings = getStoredSettings();
          render();
          console.log('[SnapSuites Supabase] Synchronized with Supabase Cloud.');
        }
      } catch (err) {
        console.warn('[SnapSuites Supabase] Cloud sync note:', err.message);
      }
    } 
    // 2. Playit / Self-Hosted Server fallback
    else if (settings.serverUrl) {
      try {
        const result = await pullFromServer(settings.serverUrl, settings.syncKey);
        if (result.success && result.data) {
          leads = getStoredLeads();
          prospects = getStoredProspects();
          directory = getStoredDirectory();
          socialPosts = getStoredSocialPosts();
          settings = getStoredSettings();
          render();
          console.log('[SnapSuites Sync] Successfully synchronized with remote server.');
        }
      } catch (err) {
        console.warn('[SnapSuites Sync] Background sync note:', err.message);
      }
    }
  }
}

function render() {
  const appContainer = document.getElementById('app');
  const modalRoot = document.getElementById('modal-root');

  // Security Gate: Ensure user is logged in
  if (!isAuthenticated()) {
    modalRoot.innerHTML = '';
    appContainer.innerHTML = renderLoginGate(loginErrorMessage, isLoginLoading);
    attachLoginListeners();
    return;
  }

  // Render Header
  const headerHtml = renderHeader(leads, settings, activeTab);

  // Render Tab Content
  let tabContentHtml = '';
  if (activeTab === 'pipeline') {
    tabContentHtml = renderLeadPipeline(leads, pipelineSearch, pipelineStageFilter, pipelineSourceFilter);
  } else if (activeTab === 'directory') {
    tabContentHtml = renderDirectoryView(
      directory,
      directorySearch,
      directoryCategoryFilter,
      directoryStatusFilter,
      directoryWeekFilter
    );
  } else if (activeTab === 'prospecting') {
    tabContentHtml = renderProspectingRadar(prospects, prospectSearch, prospectStatusFilter);
  } else if (activeTab === 'guide') {
    tabContentHtml = renderSalesGuide();
  } else if (activeTab === 'quote') {
    tabContentHtml = renderQuoteBuilder(quoteState, leads);
  } else if (activeTab === 'playbook') {
    tabContentHtml = renderPlaybook(playbookCategory);
  } else if (activeTab === 'calendar') {
    tabContentHtml = renderCalendarView(leads);
  } else if (activeTab === 'analytics') {
    tabContentHtml = renderAnalytics(leads, settings);
  }

  appContainer.innerHTML = `
    ${headerHtml}
    <main class="tab-content-container">
      ${tabContentHtml}
    </main>
  `;

  // Render Active Modal
  if (currentModal === 'lead') {
    modalRoot.innerHTML = renderLeadModal(editingLead);
  } else if (currentModal === 'prospect') {
    modalRoot.innerHTML = renderProspectModal(editingProspect);
  } else if (currentModal === 'clip') {
    modalRoot.innerHTML = renderClipPostModal();
  } else if (currentModal === 'pitch') {
    modalRoot.innerHTML = renderQuickPitchModal(activePitchPost, settings.salesRepName || 'Luca');
  } else if (currentModal === 'directory_sync') {
    modalRoot.innerHTML = renderDirectorySyncModal(editingDirectoryItem);
  } else if (currentModal === 'proposal') {
    modalRoot.innerHTML = renderProposalModal(proposalData || quoteState);
  } else if (currentModal === 'settings') {
    modalRoot.innerHTML = renderSettingsModal(settings);
  } else {
    modalRoot.innerHTML = '';
  }

  attachEventListeners();
}

function attachEventListeners() {
  // Navigation Tabs
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      activeTab = e.currentTarget.dataset.tab;
      render();
    });
  });

  // Header Actions
  document.getElementById('btn-quick-new-lead')?.addEventListener('click', () => {
    editingLead = null;
    currentModal = 'lead';
    render();
  });

  document.getElementById('btn-quick-quote')?.addEventListener('click', () => {
    activeTab = 'quote';
    render();
  });

  document.getElementById('btn-settings-trigger')?.addEventListener('click', () => {
    currentModal = 'settings';
    render();
  });

  document.getElementById('btn-export-trigger')?.addEventListener('click', () => {
    exportDataAsJSON();
    showToast('📥 Data backup exported successfully as JSON!');
  });

  // Pipeline Handlers
  const searchInput = document.getElementById('pipeline-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      pipelineSearch = e.target.value;
      render();
    });
  }

  document.getElementById('pipeline-stage-filter')?.addEventListener('change', (e) => {
    pipelineStageFilter = e.target.value;
    render();
  });

  document.getElementById('pipeline-source-filter')?.addEventListener('change', (e) => {
    pipelineSourceFilter = e.target.value;
    render();
  });

  document.getElementById('btn-add-lead-kanban')?.addEventListener('click', () => {
    editingLead = null;
    currentModal = 'lead';
    render();
  });

  document.querySelectorAll('.stage-change-trigger').forEach(select => {
    select.addEventListener('change', (e) => {
      const leadId = e.target.dataset.leadId;
      const newStage = e.target.value;
      updateLeadStage(leadId, newStage);
    });
  });

  document.querySelectorAll('.btn-edit-lead').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const leadId = e.currentTarget.dataset.leadId;
      editingLead = leads.find(l => l.id === leadId);
      currentModal = 'lead';
      render();
    });
  });

  document.querySelectorAll('.btn-lead-quote').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const leadId = e.currentTarget.dataset.leadId;
      const lead = leads.find(l => l.id === leadId);
      if (lead) {
        quoteState = {
          clientName: lead.clientName,
          eventType: lead.eventType,
          eventDate: lead.eventDate,
          recommendedTiming: lead.recommendedTiming || '7pm–10pm',
          packageId: lead.packageId || 'birthday-3h',
          backdrop: lead.backdrop || 'burgundy',
          selectedAddons: lead.addOns || []
        };
        activeTab = 'quote';
        render();
      }
    });
  });

  // Prospecting Radar Handlers
  const prospectSearchInput = document.getElementById('prospect-search-input');
  if (prospectSearchInput) {
    prospectSearchInput.addEventListener('input', (e) => {
      prospectSearch = e.target.value;
      render();
    });
  }

  document.getElementById('prospect-status-filter')?.addEventListener('change', (e) => {
    prospectStatusFilter = e.target.value;
    render();
  });

  document.getElementById('btn-add-prospect')?.addEventListener('click', () => {
    editingProspect = null;
    currentModal = 'prospect';
    render();
  });

  document.querySelectorAll('.prospect-status-change').forEach(select => {
    select.addEventListener('change', (e) => {
      const prospectId = e.target.dataset.prospectId;
      const newStatus = e.target.value;
      const target = prospects.find(p => p.id === prospectId);
      if (target) {
        target.status = newStatus;
        saveProspects(prospects);
        showToast('Outreach status updated!');
        render();
      }
    });
  });

  document.querySelectorAll('.btn-edit-prospect').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const prospectId = e.currentTarget.dataset.prospectId;
      editingProspect = prospects.find(p => p.id === prospectId);
      currentModal = 'prospect';
      render();
    });
  });

  document.querySelectorAll('.btn-convert-prospect').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const prospectId = e.currentTarget.dataset.prospectId;
      const prospect = prospects.find(p => p.id === prospectId);
      if (prospect) {
        prospect.status = 'converted';
        saveProspects(prospects);

        const newLead = {
          id: 'lead-' + Date.now(),
          clientName: prospect.contactPerson || prospect.name,
          contactEmail: prospect.contactEmail || '',
          contactPhone: prospect.contactPhone || '',
          eventType: prospect.category.includes('Wedding') ? 'Wedding' : 'Celebration',
          eventDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
          recommendedTiming: '7pm–10pm',
          venue: prospect.name + ' (' + prospect.location + ')',
          source: prospect.preferredChannel || 'Outreach',
          packageId: prospect.targetPackage || 'birthday-3h',
          backdrop: 'burgundy',
          dealValue: 350,
          stage: 'quote_sent',
          notes: `Converted from Prospecting Radar. ${prospect.notes || ''}`,
          addOns: [],
          commissionRate: settings.defaultCommissionRate || 10,
          createdAt: new Date().toISOString()
        };

        leads.unshift(newLead);
        saveLeads(leads);

        showToast(`⚡ ${prospect.name} converted to active CRM lead & quote!`);
        activeTab = 'pipeline';
        render();
      }
    });
  });

  // Directory View Search & Filter Handlers
  const directorySearchInput = document.getElementById('directory-search-input');
  if (directorySearchInput) {
    directorySearchInput.addEventListener('input', (e) => {
      directorySearch = e.target.value;
    });
    directorySearchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        directorySearch = e.target.value;
        render();
      }
    });
  }

  document.getElementById('btn-submit-directory-search')?.addEventListener('click', () => {
    const input = document.getElementById('directory-search-input');
    if (input) directorySearch = input.value;
    render();
  });

  document.getElementById('directory-category-filter')?.addEventListener('change', (e) => {
    directoryCategoryFilter = e.target.value;
    render();
  });

  document.getElementById('directory-status-filter')?.addEventListener('change', (e) => {
    directoryStatusFilter = e.target.value;
    render();
  });

  document.getElementById('directory-week-filter')?.addEventListener('change', (e) => {
    directoryWeekFilter = e.target.value;
    render();
  });

  document.querySelectorAll('.week-filter-card').forEach(card => {
    card.addEventListener('click', (e) => {
      const week = e.currentTarget.dataset.week;
      directoryWeekFilter = directoryWeekFilter === week ? 'all' : week;
      render();
    });
  });

  document.getElementById('btn-reset-directory-filters')?.addEventListener('click', () => {
    directorySearch = '';
    directoryCategoryFilter = 'all';
    directoryStatusFilter = 'all';
    directoryWeekFilter = 'all';
    render();
  });

  document.getElementById('btn-empty-reset-directory')?.addEventListener('click', () => {
    directorySearch = '';
    directoryCategoryFilter = 'all';
    directoryStatusFilter = 'all';
    directoryWeekFilter = 'all';
    render();
  });

  // Export Directory to CSV (Google Sheets compatible)
  document.getElementById('btn-export-directory-csv')?.addEventListener('click', () => {
    exportDirectoryAsCSV(directory);
    showToast('📥 Target Directory exported as CSV for Google Sheets!');
  });

  // Open Add Partner / Sync Modal
  document.getElementById('btn-open-sync-sheet-modal')?.addEventListener('click', () => {
    editingDirectoryItem = null;
    currentModal = 'directory_sync';
    render();
  });

  document.getElementById('btn-add-partner-modal')?.addEventListener('click', () => {
    editingDirectoryItem = null;
    currentModal = 'directory_sync';
    render();
  });

  // Directory Status Dropdown Change
  document.querySelectorAll('.directory-status-select').forEach(select => {
    select.addEventListener('change', (e) => {
      const id = e.target.dataset.id;
      const newStatus = e.target.value;
      const target = directory.find(d => d.id === id);
      if (target) {
        target.status = newStatus;
        saveDirectory(directory);
        showToast(`Updated status for ${target.name}!`);
        render();
      }
    });
  });

  // Tailored Pitch Modal Trigger for Directory Partners
  document.querySelectorAll('.btn-directory-pitch-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.dataset.id;
      activePitchPost = directory.find(d => d.id === id);
      if (activePitchPost) {
        currentModal = 'pitch';
        render();
      }
    });
  });

  // 1-Click Push Partner to CRM Pipeline Deals
  document.querySelectorAll('.btn-convert-partner-to-crm').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.dataset.id;
      const partner = directory.find(d => d.id === id);
      if (partner) {
        const newLead = {
          id: 'lead-' + Date.now(),
          clientName: partner.name + ' (' + partner.category + ')',
          contactEmail: partner.email || '',
          contactPhone: partner.phone || '',
          eventType: 'Strategic B2B Partnership',
          eventDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
          recommendedTiming: '7pm–10pm',
          venue: partner.name + ', ' + partner.area,
          source: 'B2B Directory (' + partner.category + ')',
          packageId: 'birthday-3h',
          backdrop: 'burgundy',
          dealValue: 500,
          stage: partner.status === 'partner_agreed' ? 'won' : (partner.status === 'pitch_sent' ? 'contacted' : 'new'),
          notes: `Target Directory Partner. Best Angle: ${partner.bestAngle}. Phone: ${partner.phone}. Email: ${partner.email}. ${partner.notes || ''}`,
          addOns: ['rear_screen_custom'],
          commissionRate: settings.defaultCommissionRate || 10,
          createdAt: new Date().toISOString()
        };

        leads.unshift(newLead);
        saveLeads(leads);

        // Also update directory status
        partner.status = 'pitch_sent';
        saveDirectory(directory);

        currentModal = null;
        showToast(`🎉 ${partner.name} pushed to CRM Pipeline as an active B2B deal!`);
        activeTab = 'pipeline';
        render();
      }
    });
  });

  // Quick Pitch Script Modal Controls
  document.getElementById('btn-copy-pitch-script')?.addEventListener('click', () => {
    const text = document.getElementById('pitch-script-textarea')?.value;
    if (text) {
      navigator.clipboard.writeText(text);
      showToast('📋 Pitch script copied! Ready to paste into your email or DM.');
    }
  });

  document.getElementById('btn-mark-pitch-sent')?.addEventListener('click', (e) => {
    const id = e.currentTarget.dataset.id;
    const target = directory.find(d => d.id === id);
    if (target) {
      target.status = 'pitch_sent';
      saveDirectory(directory);
    }
    showToast('🟣 Outreach marked as "Pitch Sent"!');
    currentModal = null;
    render();
  });

  document.getElementById('btn-close-quick-pitch-modal')?.addEventListener('click', () => {
    currentModal = null;
    render();
  });
  document.getElementById('btn-cancel-pitch-modal')?.addEventListener('click', () => {
    currentModal = null;
    render();
  });

  // Directory Sync Modal Handlers
  document.getElementById('tab-add-single-partner')?.addEventListener('click', () => {
    const formSingle = document.getElementById('form-single-partner');
    const formBulk = document.getElementById('form-bulk-sheet');
    if (formSingle && formBulk) {
      formSingle.style.display = 'flex';
      formBulk.style.display = 'none';
      document.getElementById('tab-add-single-partner').className = 'btn btn-sm btn-gold';
      document.getElementById('tab-paste-sheet-data').className = 'btn btn-sm btn-glass';
    }
  });

  document.getElementById('tab-paste-sheet-data')?.addEventListener('click', () => {
    const formSingle = document.getElementById('form-single-partner');
    const formBulk = document.getElementById('form-bulk-sheet');
    if (formSingle && formBulk) {
      formSingle.style.display = 'none';
      formBulk.style.display = 'flex';
      document.getElementById('tab-add-single-partner').className = 'btn btn-sm btn-glass';
      document.getElementById('tab-paste-sheet-data').className = 'btn btn-sm btn-gold';
    }
  });

  document.getElementById('form-single-partner')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('partner-id')?.value;
    const name = document.getElementById('partner-name')?.value.trim();
    const category = document.getElementById('partner-category')?.value.trim();
    const contact = document.getElementById('partner-contact')?.value.trim();
    const area = document.getElementById('partner-area')?.value.trim();
    const week = document.getElementById('partner-week')?.value;
    const email = document.getElementById('partner-email')?.value.trim();
    const phone = document.getElementById('partner-phone')?.value.trim();
    const angle = document.getElementById('partner-angle')?.value.trim();
    const notes = document.getElementById('partner-notes')?.value.trim();

    if (id) {
      const idx = directory.findIndex(d => d.id === id);
      if (idx !== -1) {
        directory[idx] = { 
          ...directory[idx], 
          name, 
          venueName: name,
          companyName: name,
          contactName: contact || 'Events Team',
          category, 
          area, 
          targetWeek: week, 
          email, 
          phone, 
          boothStyle: angle,
          bestAngle: angle, 
          notes 
        };
      }
    } else {
      directory.unshift({
        id: 'dir-' + Date.now(),
        name,
        venueName: name,
        companyName: name,
        contactName: contact || 'Events Team',
        category,
        area,
        boothStyle: angle,
        bestAngle: angle,
        email,
        phone,
        status: 'not_contacted',
        targetWeek: week,
        notes
      });
    }

    saveDirectory(directory);
    currentModal = null;
    showToast(`💾 Saved ${name} to Target Directory!`);
    render();
  });

  document.getElementById('btn-submit-bulk-import')?.addEventListener('click', () => {
    const raw = document.getElementById('bulk-csv-input')?.value.trim();
    if (!raw) {
      showToast('⚠️ Please paste CSV lines first.');
      return;
    }

    const lines = raw.split('\n').filter(l => l.trim().length > 0);
    let addedCount = 0;

    lines.forEach(line => {
      // Basic CSV parsing
      const parts = line.split(',').map(p => p.replace(/^"|"$/g, '').trim());
      if (parts.length >= 2 && !parts[0].toLowerCase().includes('email') && !parts[0].toLowerCase().includes('organization')) {
        const isEmailFirst = parts[0].includes('@');
        const email = isEmailFirst ? parts[0] : (parts[4] || '');
        const venueName = isEmailFirst ? (parts[1] || 'Partner Venue') : parts[0];
        const companyName = isEmailFirst ? (parts[2] || venueName) : (parts[1] || venueName);
        const contactName = isEmailFirst ? (parts[3] || 'Events Team') : (parts[2] || 'Events Team');
        const boothStyle = isEmailFirst ? (parts[4] || 'Vintage Handcrafted Booth') : (parts[3] || 'Vintage Handcrafted Booth');
        const category = isEmailFirst ? (parts[5] || 'Luxury Venue') : (parts[1] || 'Luxury Venue');
        const area = isEmailFirst ? (parts[6] || 'Cheshire') : (parts[2] || 'Cheshire');
        const phone = isEmailFirst ? (parts[7] || '') : (parts[5] || '');

        directory.push({
          id: 'dir-' + Math.random().toString(36).substring(2, 9),
          name: venueName,
          venueName,
          companyName,
          contactName,
          boothStyle,
          bestAngle: boothStyle,
          category,
          area,
          email,
          phone,
          status: 'not_contacted',
          targetWeek: 'Week 1',
          notes: 'Imported from Google Sheet / CSV'
        });
        addedCount++;
      }
    });

    saveDirectory(directory);
    currentModal = null;
    showToast(`✅ Imported ${addedCount} organizations into Target Directory!`);
    render();
  });

  document.getElementById('btn-close-sync-modal')?.addEventListener('click', () => {
    currentModal = null;
    render();
  });
  document.getElementById('btn-cancel-sync-modal')?.addEventListener('click', () => {
    currentModal = null;
    render();
  });
  document.getElementById('btn-cancel-bulk-modal')?.addEventListener('click', () => {
    currentModal = null;
    render();
  });

  // Quote Builder Handlers
  document.getElementById('quote-client-name')?.addEventListener('input', (e) => {
    quoteState.clientName = e.target.value;
    updateQuotePreview();
  });
  document.getElementById('quote-event-type')?.addEventListener('input', (e) => {
    quoteState.eventType = e.target.value;
    updateQuotePreview();
  });
  document.getElementById('quote-event-date')?.addEventListener('change', (e) => {
    quoteState.eventDate = e.target.value;
    updateQuotePreview();
  });
  document.getElementById('quote-recommended-timing')?.addEventListener('input', (e) => {
    quoteState.recommendedTiming = e.target.value;
    updateQuotePreview();
  });

  document.querySelectorAll('.package-card').forEach(card => {
    card.addEventListener('click', (e) => {
      quoteState.packageId = e.currentTarget.dataset.packageId;
      render();
    });
  });

  document.querySelectorAll('input[name="backdrop-choice"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      quoteState.backdrop = e.target.value;
      render();
    });
  });

  document.querySelectorAll('.addon-checkbox').forEach(chk => {
    chk.addEventListener('change', (e) => {
      const addonId = e.target.dataset.addonId;
      if (e.target.checked) {
        if (!quoteState.selectedAddons.includes(addonId)) {
          quoteState.selectedAddons.push(addonId);
        }
      } else {
        quoteState.selectedAddons = quoteState.selectedAddons.filter(id => id !== addonId);
      }
      render();
    });
  });

  document.getElementById('btn-copy-quote-text')?.addEventListener('click', () => {
    const textPreview = document.getElementById('proposal-text-preview')?.innerText;
    if (textPreview) {
      navigator.clipboard.writeText(textPreview);
      showToast('📋 Bark / Email Proposal copied to clipboard!');
    }
  });

  document.getElementById('btn-open-printable-proposal')?.addEventListener('click', () => {
    const pkg = PACKAGES.find(p => p.id === quoteState.packageId) || PACKAGES[1];
    let totalPrice = pkg.price;
    (quoteState.selectedAddons || []).forEach(id => {
      const addon = ADD_ONS.find(a => a.id === id);
      if (addon) totalPrice += addon.price;
    });

    proposalData = {
      ...quoteState,
      packageName: pkg.name,
      totalPrice
    };
    currentModal = 'proposal';
    render();
  });

  document.getElementById('btn-save-quote-to-pipeline')?.addEventListener('click', () => {
    const pkg = PACKAGES.find(p => p.id === quoteState.packageId) || PACKAGES[1];
    let totalPrice = pkg.price;
    (quoteState.selectedAddons || []).forEach(id => {
      const addon = ADD_ONS.find(a => a.id === id);
      if (addon) totalPrice += addon.price;
    });

    const newLead = {
      id: 'lead-' + Date.now(),
      clientName: quoteState.clientName || 'New Client',
      contactEmail: '',
      contactPhone: '',
      eventType: quoteState.eventType || 'Party',
      eventDate: quoteState.eventDate || new Date().toISOString().slice(0, 10),
      recommendedTiming: quoteState.recommendedTiming || '7pm–10pm',
      venue: 'North West Venue',
      source: 'Bark',
      packageId: quoteState.packageId,
      backdrop: quoteState.backdrop,
      dealValue: totalPrice,
      stage: 'quote_sent',
      notes: `Generated quote for ${pkg.name}. Total: £${totalPrice}.`,
      addOns: [...quoteState.selectedAddons],
      commissionRate: settings.defaultCommissionRate || 10,
      createdAt: new Date().toISOString()
    };

    leads.unshift(newLead);
    saveLeads(leads);
    showToast('💾 Quote saved as active lead in CRM!');
    activeTab = 'pipeline';
    render();
  });

  // Playbook Handlers
  document.querySelectorAll('.playbook-filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      playbookCategory = e.currentTarget.dataset.category;
      render();
    });
  });

  document.querySelectorAll('.btn-copy-template').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const templateId = e.currentTarget.dataset.templateId;
      const t = OUTREACH_TEMPLATES.find(x => x.id === templateId);
      if (t) {
        navigator.clipboard.writeText(t.body);
        showToast('📋 Script copied to clipboard!');
      }
    });
  });

  document.getElementById('btn-add-event-calendar')?.addEventListener('click', () => {
    editingLead = null;
    currentModal = 'lead';
    render();
  });

  // Lead Modal Submit & Delete
  document.getElementById('lead-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('lead-id-field').value;
    const clientName = document.getElementById('lead-client-name').value;
    const eventType = document.getElementById('lead-event-type').value;
    const contactEmail = document.getElementById('lead-email').value;
    const contactPhone = document.getElementById('lead-phone').value;
    const eventDate = document.getElementById('lead-event-date').value;
    const timing = document.getElementById('lead-timing').value;
    const venue = document.getElementById('lead-venue').value;
    const source = document.getElementById('lead-source').value;
    const packageId = document.getElementById('lead-package').value;
    const stage = document.getElementById('lead-stage').value;
    const dealValue = Number(document.getElementById('lead-deal-value').value) || 350;
    const backdrop = document.getElementById('lead-backdrop').value;
    const notes = document.getElementById('lead-notes').value;

    const existingIndex = leads.findIndex(l => l.id === id);
    const updatedLead = {
      id,
      clientName,
      eventType,
      contactEmail,
      contactPhone,
      eventDate,
      recommendedTiming: timing,
      venue,
      source,
      packageId,
      stage,
      dealValue,
      backdrop,
      notes,
      addOns: existingIndex >= 0 ? leads[existingIndex].addOns || [] : [],
      commissionRate: settings.defaultCommissionRate || 10,
      createdAt: existingIndex >= 0 ? leads[existingIndex].createdAt : new Date().toISOString()
    };

    if (existingIndex >= 0) {
      leads[existingIndex] = updatedLead;
      showToast('✏️ Lead updated successfully!');
    } else {
      leads.unshift(updatedLead);
      showToast('🎉 New lead added to CRM pipeline!');
    }

    saveLeads(leads);
    currentModal = null;
    render();
  });

  document.getElementById('btn-delete-lead')?.addEventListener('click', (e) => {
    const leadId = e.currentTarget.dataset.leadId;
    if (confirm('Are you sure you want to delete this lead?')) {
      leads = leads.filter(l => l.id !== leadId);
      saveLeads(leads);
      currentModal = null;
      showToast('🗑️ Lead deleted.');
      render();
    }
  });

  document.getElementById('btn-cancel-lead-modal')?.addEventListener('click', () => {
    currentModal = null;
    render();
  });
  document.getElementById('btn-close-lead-modal')?.addEventListener('click', () => {
    currentModal = null;
    render();
  });

  // Prospect Modal Submit & Delete
  document.getElementById('prospect-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('prospect-id-field').value;
    const name = document.getElementById('prospect-name').value;
    const contactPerson = document.getElementById('prospect-contact-person').value;
    const category = document.getElementById('prospect-category').value;
    const location = document.getElementById('prospect-location').value;
    const preferredChannel = document.getElementById('prospect-channel').value;
    const status = document.getElementById('prospect-status').value;
    const contactEmail = document.getElementById('prospect-email').value;
    const contactPhone = document.getElementById('prospect-phone').value;
    const notes = document.getElementById('prospect-notes').value;

    const existingIndex = prospects.findIndex(p => p.id === id);
    const updatedProspect = {
      id,
      name,
      contactPerson,
      category,
      location,
      preferredChannel,
      status,
      contactEmail,
      contactPhone,
      notes,
      targetPackage: 'birthday-3h'
    };

    if (existingIndex >= 0) {
      prospects[existingIndex] = updatedProspect;
      showToast('✏️ Prospect updated!');
    } else {
      prospects.unshift(updatedProspect);
      showToast('🎯 New potential customer added to Radar!');
    }

    saveProspects(prospects);
    currentModal = null;
    render();
  });

  document.getElementById('btn-delete-prospect')?.addEventListener('click', (e) => {
    const prospectId = e.currentTarget.dataset.prospectId;
    if (confirm('Delete this potential customer?')) {
      prospects = prospects.filter(p => p.id !== prospectId);
      saveProspects(prospects);
      currentModal = null;
      showToast('🗑️ Prospect deleted.');
      render();
    }
  });

  document.getElementById('btn-cancel-prospect-modal')?.addEventListener('click', () => {
    currentModal = null;
    render();
  });
  document.getElementById('btn-close-prospect-modal')?.addEventListener('click', () => {
    currentModal = null;
    render();
  });

  // Proposal Modal
  document.getElementById('btn-close-proposal-modal')?.addEventListener('click', () => {
    currentModal = null;
    render();
  });
  document.getElementById('btn-print-proposal')?.addEventListener('click', () => {
    window.print();
  });

  // Logout Trigger
  document.getElementById('btn-logout-trigger')?.addEventListener('click', () => {
    if (confirm('Lock dashboard and log out?')) {
      logout();
      loginErrorMessage = '';
      showToast('🔒 Dashboard locked. Logged out.');
      render();
    }
  });

  // Settings Modal
  document.getElementById('settings-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    settings.salesRepName = document.getElementById('settings-rep-name').value;
    settings.monthlyTarget = Number(document.getElementById('settings-monthly-target').value) || 3000;
    settings.defaultCommissionRate = Number(document.getElementById('settings-commission-rate').value) || 10;
    
    // Supabase Cloud Sync config
    const supabaseUrlInput = document.getElementById('settings-supabase-url')?.value?.trim() || '';
    const supabaseKeyInput = document.getElementById('settings-supabase-key')?.value?.trim() || '';
    settings.supabaseUrl = supabaseUrlInput;
    settings.supabaseKey = supabaseKeyInput;

    const newUsername = document.getElementById('settings-new-username')?.value?.trim();
    const newPassword = document.getElementById('settings-new-password')?.value;
    if (newUsername || newPassword) {
      await updateCredentials(newUsername, newPassword);
      showToast('🔐 Login credentials updated!');
    }

    saveSettings(settings);

    // If Supabase configured, push current state
    if (settings.supabaseUrl && settings.supabaseKey) {
      pushToSupabase(settings.supabaseUrl, settings.supabaseKey);
    }

    currentModal = null;
    showToast('⚙️ Settings & cloud sync saved!');
    render();
  });

  // Test Connection & Pull Data Button for Supabase
  document.getElementById('btn-test-supabase-connection')?.addEventListener('click', async () => {
    const urlInput = document.getElementById('settings-supabase-url')?.value?.trim() || '';
    const keyInput = document.getElementById('settings-supabase-key')?.value?.trim() || '';
    const resultBox = document.getElementById('supabase-test-result');
    const testBtn = document.getElementById('btn-test-supabase-connection');

    if (!urlInput || !keyInput) {
      if (resultBox) {
        resultBox.style.display = 'block';
        resultBox.style.background = 'rgba(239, 68, 68, 0.15)';
        resultBox.style.border = '1px solid rgba(239, 68, 68, 0.4)';
        resultBox.style.color = '#FCA5A5';
        resultBox.innerHTML = '⚠️ Please enter both your Supabase Project URL and Anon API Key.';
      }
      return;
    }

    if (testBtn) {
      testBtn.disabled = true;
      testBtn.innerHTML = '⏳ Connecting to Supabase...';
    }

    const testRes = await testSupabaseConnection(urlInput, keyInput);

    if (testRes.ok) {
      // Save credentials and pull data
      settings.supabaseUrl = urlInput;
      settings.supabaseKey = keyInput;
      saveSettings(settings, false);

      const pullRes = await pullFromSupabase(urlInput, keyInput);
      if (pullRes.success) {
        leads = getStoredLeads();
        prospects = getStoredProspects();
        directory = getStoredDirectory();
        socialPosts = getStoredSocialPosts();
      }

      if (resultBox) {
        resultBox.style.display = 'block';
        resultBox.style.background = 'rgba(16, 185, 129, 0.15)';
        resultBox.style.border = '1px solid rgba(16, 185, 129, 0.4)';
        resultBox.style.color = '#6EE7B7';
        resultBox.innerHTML = `✅ <strong>Connected to Supabase!</strong> 24/7 Cloud sync is active.<br/><span style="font-size: 11px; opacity: 0.85;">Synced ${leads.length} leads & ${directory.length} venue targets with cloud database.</span>`;
      }
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      showToast('⚡ Connected to Supabase Cloud!');
    } else {
      if (resultBox) {
        resultBox.style.display = 'block';
        resultBox.style.background = 'rgba(239, 68, 68, 0.15)';
        resultBox.style.border = '1px solid rgba(239, 68, 68, 0.4)';
        resultBox.style.color = '#FCA5A5';
        resultBox.innerHTML = `❌ <strong>Connection Notice:</strong> ${testRes.message}`;
      }
    }

    if (testBtn) {
      testBtn.disabled = false;
      testBtn.innerHTML = '⚡ Connect & Sync Supabase Now';
    }
  });

  // Copy Supabase SQL helper button
  document.getElementById('btn-copy-supabase-sql')?.addEventListener('click', () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SETUP).then(() => {
      showToast('📋 SQL copied to clipboard! Paste into Supabase SQL Editor.');
    }).catch(() => {
      showToast('📋 Please copy the SQL manually.');
    });
  });

  document.getElementById('btn-cancel-settings')?.addEventListener('click', () => {
    currentModal = null;
    render();
  });
  document.getElementById('btn-close-settings-modal')?.addEventListener('click', () => {
    currentModal = null;
    render();
  });

  document.getElementById('btn-reset-demo-data')?.addEventListener('click', () => {
    if (confirm('Reset all leads, directory and prospects to initial demo dataset?')) {
      const res = resetToInitialData();
      leads = res.leads;
      prospects = res.prospects;
      directory = res.directory;
      currentModal = null;
      showToast('🔄 Dataset reset to demo defaults.');
      render();
    }
  });

  document.getElementById('btn-export-csv-settings')?.addEventListener('click', () => {
    exportLeadsAsCSV();
    showToast('📄 Leads exported as CSV!');
  });
}

function attachLoginListeners() {
  const form = document.getElementById('snapsuites-login-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const user = document.getElementById('login-username')?.value || '';
      const pass = document.getElementById('login-password')?.value || '';
      const remember = document.getElementById('login-remember-me')?.checked ?? true;

      isLoginLoading = true;
      loginErrorMessage = '';
      render();

      try {
        const result = await login(user, pass, remember);
        if (result.success) {
          isLoginLoading = false;
          loginErrorMessage = '';
          confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
          showToast('⚡ Welcome to SnapSuites VIP Portal!');
          render();
        } else {
          isLoginLoading = false;
          loginErrorMessage = result.error || 'Authentication failed.';
          render();
        }
      } catch (err) {
        isLoginLoading = false;
        loginErrorMessage = 'Login error. Please try again.';
        render();
      }
    });
  }

  document.getElementById('btn-toggle-password-visibility')?.addEventListener('click', () => {
    const input = document.getElementById('login-password');
    const toggleBtn = document.getElementById('btn-toggle-password-visibility');
    if (input && toggleBtn) {
      if (input.type === 'password') {
        input.type = 'text';
        toggleBtn.textContent = 'Hide';
      } else {
        input.type = 'password';
        toggleBtn.textContent = 'Show';
      }
    }
  });
}

function updateLeadStage(leadId, newStage) {
  const lead = leads.find(l => l.id === leadId);
  if (lead) {
    lead.stage = newStage;
    saveLeads(leads);
    
    if (newStage === 'secured') {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
      showToast(`🎉 CONGRATS! Booking secured for ${lead.clientName} (£${lead.dealValue})!`);
    } else {
      showToast(`Stage updated to ${newStage.replace('_', ' ')}`);
    }
    render();
  }
}

function updateQuotePreview() {
  const selectedPkg = PACKAGES.find(p => p.id === quoteState.packageId) || PACKAGES[1];
  let totalPrice = selectedPkg.price;
  const selectedAddonsList = (quoteState.selectedAddons || []).map(id => ADD_ONS.find(a => a.id === id)).filter(Boolean);
  selectedAddonsList.forEach(a => totalPrice += a.price);

  const previewBox = document.getElementById('proposal-text-preview');
  if (previewBox) {
    previewBox.innerText = generateQuoteText(quoteState, selectedPkg, selectedAddonsList, totalPrice);
  }
}

function showToast(message) {
  const toastHost = document.getElementById('toast-container');
  if (!toastHost) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>${message}</span>`;
  toastHost.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 3500);
}

document.addEventListener('DOMContentLoaded', init);
