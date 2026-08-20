# Project Instructions & Development Principles (SnapSuites Sales Hub)

## 1. Zero-Friction & 100% Foolproof Architecture
- **Always prioritize 100% foolproof, zero-friction, out-of-the-box client implementations.**
- Never rely on manual user configuration steps, fragile external environment variable handoffs, or multi-step manual setup across end-user devices (sales reps, phones, tablets).
- Public client-side configuration (such as Supabase public Project URL and Public Anon Key) must be baked directly into the project configuration (`src/config/supabase.js`) so that any device that opens the site is instantly connected with zero manual key copying or settings configuration required.

## 2. Mobile-First & Real-Time Sync
- Maintain full responsiveness across mobile, tablet, and desktop interfaces.
- Ensure cross-device state updates are automatically pushed and pulled in real-time.
