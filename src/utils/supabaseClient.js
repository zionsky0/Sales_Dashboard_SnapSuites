/**
 * SnapSuites Supabase Cloud Client
 * Seamless 24/7 real-time cloud sync across all devices with zero self-hosting needed.
 */

import { createClient } from '@supabase/supabase-js';
import {
  getStoredLeads,
  getStoredProspects,
  getStoredDirectory,
  getStoredSettings,
  getStoredSocialPosts,
  saveLeads,
  saveProspects,
  saveDirectory,
  saveSettings,
  saveSocialPosts
} from './storage.js';

let supabase = null;
let isSyncing = false;

// SQL snippet to create the table in Supabase SQL Editor
export const SUPABASE_SQL_SETUP = `-- Copy and paste this into Supabase -> SQL Editor -> Run:
create table if not exists snapsuites_data (
  id text primary key,
  data jsonb not null,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

alter table snapsuites_data enable row level security;
create policy "Allow all operations" on snapsuites_data for all using (true) with check (true);
`;

/**
 * Initialize or get active Supabase client instance
 */
export function getSupabaseClient(customUrl, customKey) {
  const settings = getStoredSettings();
  const url = customUrl || settings.supabaseUrl || (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL) || '';
  const key = customKey || settings.supabaseKey || (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY) || '';

  if (!url || !key) {
    supabase = null;
    return null;
  }

  try {
    supabase = createClient(url.trim(), key.trim(), {
      auth: { persistSession: false }
    });
    return supabase;
  } catch (err) {
    console.error('[Supabase Init Error]', err);
    supabase = null;
    return null;
  }
}

/**
 * Test connectivity with Supabase project
 */
export async function testSupabaseConnection(url, anonKey) {
  if (!url || !anonKey) {
    return { ok: false, message: 'Please provide both Supabase Project URL and Anon API Key.' };
  }

  try {
    const client = createClient(url.trim(), anonKey.trim(), {
      auth: { persistSession: false }
    });

    // Attempt to query snapsuites_data table
    const { data, error } = await client
      .from('snapsuites_data')
      .select('id, updated_at')
      .eq('id', 'main_store')
      .maybeSingle();

    if (error) {
      if (error.code === '42P01' || error.message?.includes('relation "snapsuites_data" does not exist')) {
        return {
          ok: false,
          needsTable: true,
          message: 'Connected to Supabase, but the "snapsuites_data" table is not created yet. Run the 4-line SQL setup in your Supabase SQL Editor.'
        };
      }
      return { ok: false, message: `Supabase Error: ${error.message}` };
    }

    return {
      ok: true,
      message: 'Connected successfully to Supabase cloud database!',
      data
    };
  } catch (err) {
    return { ok: false, message: `Connection failed: ${err.message}` };
  }
}

/**
 * Pull latest data from Supabase and save to local storage
 */
export async function pullFromSupabase(customUrl, customKey) {
  const client = getSupabaseClient(customUrl, customKey);
  if (!client) return { success: false, message: 'Supabase credentials not configured' };

  try {
    const { data: row, error } = await client
      .from('snapsuites_data')
      .select('data, updated_at')
      .eq('id', 'main_store')
      .maybeSingle();

    if (error) throw error;

    if (row && row.data) {
      const { leads, prospects, directory, settings: remoteSettings, socialPosts } = row.data;

      if (Array.isArray(leads)) saveLeads(leads, false);
      if (Array.isArray(prospects)) saveProspects(prospects, false);
      if (Array.isArray(directory) && directory.length) saveDirectory(directory, false);
      if (Array.isArray(socialPosts)) saveSocialPosts(socialPosts, false);

      if (remoteSettings && typeof remoteSettings === 'object') {
        const current = getStoredSettings();
        saveSettings({
          ...current,
          ...remoteSettings,
          supabaseUrl: customUrl || current.supabaseUrl,
          supabaseKey: customKey || current.supabaseKey
        }, false);
      }

      return { success: true, data: row.data, updatedAt: row.updated_at };
    }

    // Table is empty, push initial local data to seed Supabase
    await pushToSupabase();
    return { success: true, seeded: true };
  } catch (err) {
    console.error('[Supabase Pull Error]', err);
    return { success: false, message: err.message };
  }
}

/**
 * Push current local storage state to Supabase
 */
export async function pushToSupabase(customUrl, customKey) {
  const client = getSupabaseClient(customUrl, customKey);
  if (!client || isSyncing) return { success: false, message: 'Skipped' };

  try {
    isSyncing = true;
    const payload = {
      leads: getStoredLeads(),
      prospects: getStoredProspects(),
      directory: getStoredDirectory(),
      settings: getStoredSettings(),
      socialPosts: getStoredSocialPosts()
    };

    const { error } = await client
      .from('snapsuites_data')
      .upsert({
        id: 'main_store',
        data: payload,
        updated_at: new Date().toISOString()
      });

    isSyncing = false;

    if (error) throw error;
    return { success: true, message: 'Synced with Supabase Cloud' };
  } catch (err) {
    isSyncing = false;
    console.error('[Supabase Push Error]', err);
    return { success: false, message: err.message };
  }
}

/**
 * Trigger debounced cloud push whenever local data changes
 */
export function triggerSupabaseAutoPush() {
  const settings = getStoredSettings();
  if (settings.supabaseUrl && settings.supabaseKey) {
    clearTimeout(window.__supabaseSyncTimer);
    window.__supabaseSyncTimer = setTimeout(() => {
      pushToSupabase(settings.supabaseUrl, settings.supabaseKey);
    }, 500);
  }
}
