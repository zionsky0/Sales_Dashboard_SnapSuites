import { getLockoutStatus } from '../utils/auth.js';

export function renderLoginGate(errorMessage = '', isLoading = false) {
  const lockout = getLockoutStatus();

  return `
    <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: radial-gradient(circle at 50% 20%, rgba(128, 0, 32, 0.45), rgba(10, 12, 16, 0.98) 70%); padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
      
      <div style="width: 100%; max-width: 440px; background: rgba(18, 22, 32, 0.85); backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px); border: 1px solid rgba(212, 175, 55, 0.3); border-radius: 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.7), 0 0 35px rgba(212, 175, 55, 0.15); padding: 36px 32px; display: flex; flex-direction: column; gap: 24px; position: relative; overflow: hidden;">
        
        <!-- Decorative Top Gold Border Glow -->
        <div style="position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, transparent, #D4AF37, #FFDF73, #D4AF37, transparent);"></div>

        <!-- Brand Header -->
        <div style="text-align: center; display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <div style="width: 60px; height: 60px; border-radius: 16px; background: linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(128, 0, 32, 0.4)); border: 1px solid rgba(212, 175, 55, 0.4); display: flex; align-items: center; justify-content: center; font-size: 28px; box-shadow: 0 8px 24px rgba(0,0,0,0.4);">
            🔐
          </div>
          <h1 style="font-size: 24px; font-weight: 800; color: #FFFFFF; letter-spacing: -0.5px; margin-top: 6px;">
            SnapSuites VIP Portal
          </h1>
          <div style="font-size: 13px; color: #D4AF37; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
            Commercial Sales & Directory Engine
          </div>
        </div>

        <!-- Error Notification -->
        ${errorMessage ? `
          <div style="background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.5); border-radius: 10px; padding: 12px 14px; font-size: 13px; color: #FCA5A5; display: flex; align-items: center; gap: 8px; animation: shake 0.3s ease;">
            <span>⚠️</span>
            <div>${errorMessage}</div>
          </div>
        ` : ''}

        ${lockout.isLocked ? `
          <div style="background: rgba(234, 179, 8, 0.15); border: 1px solid rgba(234, 179, 8, 0.5); border-radius: 10px; padding: 12px 14px; font-size: 13px; color: #FDE047; text-align: center;">
            ⏳ Access paused. Retry in <strong>${lockout.remainingSeconds}s</strong>
          </div>
        ` : ''}

        <!-- Login Form -->
        <form id="snapsuites-login-form" style="display: flex; flex-direction: column; gap: 18px;">
          
          <div class="form-group" style="display: flex; flex-direction: column; gap: 6px;">
            <label style="font-size: 12px; font-weight: 700; color: #94A3B8; text-transform: uppercase; letter-spacing: 0.5px;">Username</label>
            <div style="position: relative;">
              <input 
                type="text" 
                id="login-username" 
                class="form-control" 
                placeholder="Enter username" 
                required 
                autocomplete="username"
                style="width: 100%; padding: 12px 14px 12px 40px; background: rgba(10, 12, 16, 0.8); border: 1px solid rgba(255,255,255,0.15); border-radius: 10px; color: #FFF; font-size: 14px; outline: none; transition: border-color 0.2s;"
              />
              <span style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #D4AF37; font-size: 15px;">👤</span>
            </div>
          </div>

          <div class="form-group" style="display: flex; flex-direction: column; gap: 6px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <label style="font-size: 12px; font-weight: 700; color: #94A3B8; text-transform: uppercase; letter-spacing: 0.5px;">Password</label>
              <span id="btn-toggle-password-visibility" style="font-size: 11px; color: #D4AF37; cursor: pointer; user-select: none;">Show</span>
            </div>
            <div style="position: relative;">
              <input 
                type="password" 
                id="login-password" 
                class="form-control" 
                placeholder="Enter password" 
                required 
                autocomplete="current-password"
                style="width: 100%; padding: 12px 14px 12px 40px; background: rgba(10, 12, 16, 0.8); border: 1px solid rgba(255,255,255,0.15); border-radius: 10px; color: #FFF; font-size: 14px; outline: none; transition: border-color 0.2s;"
              />
              <span style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #D4AF37; font-size: 15px;">🔑</span>
            </div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: -4px;">
            <label style="display: flex; align-items: center; gap: 8px; font-size: 13px; color: #94A3B8; cursor: pointer; user-select: none;">
              <input type="checkbox" id="login-remember-me" checked style="accent-color: #D4AF37; width: 15px; height: 15px;" />
              Keep me signed in
            </label>
          </div>

          <button 
            type="submit" 
            id="btn-login-submit" 
            class="btn btn-gold" 
            style="width: 100%; padding: 13px; font-size: 15px; font-weight: 800; border-radius: 10px; background: linear-gradient(135deg, #D4AF37, #AA820A); color: #000; border: none; cursor: pointer; box-shadow: 0 4px 20px rgba(212, 175, 55, 0.35); transition: transform 0.15s ease;"
            ${lockout.isLocked || isLoading ? 'disabled' : ''}
          >
            ${isLoading ? 'Verifying Credentials...' : 'Unlock Dashboard ⚡'}
          </button>
        </form>

        <!-- Security Badge -->
        <div style="border-top: 1px solid rgba(255,255,255,0.08); padding-top: 16px; display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 11px; color: #64748B;">
          <span>🔒 SHA-256 Encrypted Session Protection</span>
        </div>

      </div>

    </div>
  `;
}
