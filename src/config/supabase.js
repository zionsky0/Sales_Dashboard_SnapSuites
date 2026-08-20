/**
 * SnapSuites Cloud Database Configuration
 * 
 * Paste your Supabase Anon API key below (or set VITE_SUPABASE_ANON_KEY in Vercel).
 * Setting it here ensures 100% automatic sync on all devices without any manual setup.
 */

export const SUPABASE_CONFIG = {
  projectUrl: import.meta.env?.VITE_SUPABASE_URL || 'https://yokejsxbmoffrskbrdnl.supabase.co',
  anonKey: import.meta.env?.VITE_SUPABASE_ANON_KEY || ''
};
