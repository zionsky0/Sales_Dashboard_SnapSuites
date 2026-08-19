import { INITIAL_LEADS, INITIAL_PROSPECTS, INITIAL_SOCIAL_POSTS } from '../data/initialData.js';
import { INITIAL_DIRECTORY_50 } from '../data/directoryData.js';

const STORAGE_KEY = 'snapsuites_sales_leads_clean_v2';
const PROSPECT_KEY = 'snapsuites_sales_prospects_clean_v2';
const SETTINGS_KEY = 'snapsuites_sales_settings_v1';
const SOCIAL_POSTS_KEY = 'snapsuites_social_posts_clean_v2';
const DIRECTORY_KEY = 'snapsuites_target_directory_v1';

export function getStoredDirectory() {
  try {
    const data = localStorage.getItem(DIRECTORY_KEY);
    if (!data) {
      localStorage.setItem(DIRECTORY_KEY, JSON.stringify(INITIAL_DIRECTORY_50));
      return INITIAL_DIRECTORY_50;
    }
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) && parsed.length ? parsed : INITIAL_DIRECTORY_50;
  } catch (err) {
    console.error('Error reading directory:', err);
    return INITIAL_DIRECTORY_50;
  }
}

export function saveDirectory(items) {
  try {
    localStorage.setItem(DIRECTORY_KEY, JSON.stringify(items));
  } catch (err) {
    console.error('Error saving directory:', err);
  }
}

export function getStoredSocialPosts() {
  try {
    const data = localStorage.getItem(SOCIAL_POSTS_KEY);
    if (!data) {
      localStorage.setItem(SOCIAL_POSTS_KEY, JSON.stringify([]));
      return [];
    }
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

export function saveSocialPosts(posts) {
  try {
    localStorage.setItem(SOCIAL_POSTS_KEY, JSON.stringify(posts));
  } catch (err) {
    console.error('Error saving social posts to storage:', err);
  }
}

export function getStoredLeads() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
      return [];
    }
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

export function saveLeads(leads) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
  } catch (err) {
    console.error('Error saving leads to storage:', err);
  }
}

export function getStoredProspects() {
  try {
    const data = localStorage.getItem(PROSPECT_KEY);
    if (!data) {
      localStorage.setItem(PROSPECT_KEY, JSON.stringify([]));
      return [];
    }
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

export function saveProspects(prospects) {
  try {
    localStorage.setItem(PROSPECT_KEY, JSON.stringify(prospects));
  } catch (err) {
    console.error('Error saving prospects:', err);
  }
}

export function getStoredSettings() {
  try {
    const data = localStorage.getItem(SETTINGS_KEY);
    if (!data) {
      const defaultSettings = {
        salesRepName: 'Sales Representative',
        monthlyTarget: 3000,
        defaultCommissionRate: 10,
        currencySymbol: '£'
      };
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(defaultSettings));
      return defaultSettings;
    }
    return JSON.parse(data);
  } catch (err) {
    return {
      salesRepName: 'Sales Representative',
      monthlyTarget: 3000,
      defaultCommissionRate: 10,
      currencySymbol: '£'
    };
  }
}

export function saveSettings(settings) {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (err) {
    console.error('Error saving settings:', err);
  }
}

export function resetToInitialData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  localStorage.setItem(PROSPECT_KEY, JSON.stringify([]));
  localStorage.setItem(SOCIAL_POSTS_KEY, JSON.stringify([]));
  localStorage.setItem(DIRECTORY_KEY, JSON.stringify(INITIAL_DIRECTORY_50));
  return { leads: [], prospects: [], directory: INITIAL_DIRECTORY_50 };
}

export function exportDirectoryAsCSV(directory = []) {
  if (!directory.length) return;
  const headers = ['Email', 'Venue_Name', 'Company_Name', 'Contact_Name', 'Booth_Style', 'Category', 'Area', 'Phone', 'Status', 'Target_Week', 'Notes'];
  const rows = directory.map(d => [
    `"${d.email || ''}"`,
    `"${(d.venueName || d.name || '').replace(/"/g, '""')}"`,
    `"${(d.companyName || d.name || '').replace(/"/g, '""')}"`,
    `"${(d.contactName || 'Events Team').replace(/"/g, '""')}"`,
    `"${(d.boothStyle || d.bestAngle || 'Vintage Handcrafted Booth').replace(/"/g, '""')}"`,
    `"${(d.category || '').replace(/"/g, '""')}"`,
    `"${(d.area || '').replace(/"/g, '""')}"`,
    `"${d.phone || ''}"`,
    `"${d.status || 'not_contacted'}"`,
    `"${d.targetWeek || 'Week 1'}"`,
    `"${(d.notes || '').replace(/"/g, '""')}"`
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `snapsuites_mailmerge_targets_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportLeadsAsCSV() {
  const leads = getStoredLeads();
  if (!leads.length) return;
  const headers = ['Client Name', 'Event Type', 'Event Date', 'Venue', 'Deal Value (£)', 'Stage', 'Source', 'Email', 'Phone'];
  const rows = leads.map(l => [
    `"${l.clientName}"`,
    `"${l.eventType}"`,
    `"${l.eventDate}"`,
    `"${l.venue}"`,
    l.dealValue,
    `"${l.stage}"`,
    `"${l.source}"`,
    `"${l.contactEmail}"`,
    `"${l.contactPhone}"`
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `snapsuites_leads_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportDataAsJSON() {
  const leads = getStoredLeads();
  const prospects = getStoredProspects();
  const settings = getStoredSettings();
  const directory = getStoredDirectory();
  const exportPayload = {
    appName: 'SnapSuites Sales Dashboard',
    exportedAt: new Date().toISOString(),
    leads,
    prospects,
    settings,
    directory
  };
  const jsonStr = JSON.stringify(exportPayload, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `snapsuites_sales_backup_${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}
