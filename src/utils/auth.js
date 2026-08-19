// SnapSuites Secure Authentication Module
const AUTH_SESSION_KEY = 'snapsuites_auth_session_v1';
const AUTH_ATTEMPTS_KEY = 'snapsuites_auth_attempts_v1';

// Default Master Credentials (can be overridden via Vercel Environment Variables: VITE_AUTH_USERNAME & VITE_AUTH_PASSWORD)
const DEFAULT_USERNAME = 'snapsuites';
const DEFAULT_PASSWORD = 'SnapSuites2026!'; // Changeable in .env or settings

// SHA-256 Hash utility using browser native Web Crypto API
export async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Configured credentials
function getConfiguredCredentials() {
  const envUser = import.meta.env?.VITE_AUTH_USERNAME;
  const envPass = import.meta.env?.VITE_AUTH_PASSWORD;
  const storedCustomPassHash = localStorage.getItem('snapsuites_custom_pass_hash');
  const storedCustomUser = localStorage.getItem('snapsuites_custom_user');

  return {
    username: storedCustomUser || envUser || DEFAULT_USERNAME,
    password: envPass || DEFAULT_PASSWORD,
    customPassHash: storedCustomPassHash
  };
}

// Check if current user is logged in with valid session
export function isAuthenticated() {
  try {
    const sessionStr = sessionStorage.getItem(AUTH_SESSION_KEY) || localStorage.getItem(AUTH_SESSION_KEY);
    if (!sessionStr) return false;
    
    const session = JSON.parse(sessionStr);
    if (!session || !session.token || !session.expiresAt) return false;

    // Check expiry (7 days)
    if (Date.now() > session.expiresAt) {
      logout();
      return false;
    }

    return true;
  } catch (err) {
    return false;
  }
}

// Get lockout status (brute force protection)
export function getLockoutStatus() {
  try {
    const data = JSON.parse(localStorage.getItem(AUTH_ATTEMPTS_KEY) || '{}');
    const { count = 0, lockedUntil = 0 } = data;
    if (lockedUntil && Date.now() < lockedUntil) {
      const remainingSeconds = Math.ceil((lockedUntil - Date.now()) / 1000);
      return { isLocked: true, remainingSeconds };
    }
    return { isLocked: false, remainingSeconds: 0 };
  } catch {
    return { isLocked: false, remainingSeconds: 0 };
  }
}

function recordFailedAttempt() {
  try {
    const data = JSON.parse(localStorage.getItem(AUTH_ATTEMPTS_KEY) || '{}');
    const count = (data.count || 0) + 1;
    let lockedUntil = 0;
    if (count >= 5) {
      lockedUntil = Date.now() + 30 * 1000; // 30 second cooldown after 5 failed attempts
    }
    localStorage.setItem(AUTH_ATTEMPTS_KEY, JSON.stringify({ count, lockedUntil }));
  } catch (e) {
    console.error(e);
  }
}

function resetFailedAttempts() {
  try {
    localStorage.removeItem(AUTH_ATTEMPTS_KEY);
  } catch {}
}

// Perform login verification
export async function login(inputUsername, inputPassword, rememberMe = true) {
  const lockout = getLockoutStatus();
  if (lockout.isLocked) {
    return {
      success: false,
      error: `Too many failed attempts. Please wait ${lockout.remainingSeconds} seconds.`
    };
  }

  const { username, password, customPassHash } = getConfiguredCredentials();

  const userMatches = inputUsername.trim().toLowerCase() === username.trim().toLowerCase();
  
  let passMatches = false;
  if (customPassHash) {
    const inputHash = await sha256(inputPassword);
    passMatches = inputHash === customPassHash;
  } else {
    passMatches = inputPassword === password;
  }

  if (userMatches && passMatches) {
    resetFailedAttempts();
    
    // Generate secure session token with 7-day validity
    const sessionToken = await sha256(`${username}-${Date.now()}-${Math.random()}`);
    const sessionData = {
      user: username,
      token: sessionToken,
      loggedInAt: Date.now(),
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
    };

    const sessionJson = JSON.stringify(sessionData);
    sessionStorage.setItem(AUTH_SESSION_KEY, sessionJson);
    if (rememberMe) {
      localStorage.setItem(AUTH_SESSION_KEY, sessionJson);
    }

    return { success: true };
  } else {
    recordFailedAttempt();
    return {
      success: false,
      error: 'Invalid username or password. Please check your credentials.'
    };
  }
}

// Log out and clear session
export function logout() {
  sessionStorage.removeItem(AUTH_SESSION_KEY);
  localStorage.removeItem(AUTH_SESSION_KEY);
}

// Change dashboard credentials
export async function updateCredentials(newUsername, newPassword) {
  if (newUsername) {
    localStorage.setItem('snapsuites_custom_user', newUsername.trim());
  }
  if (newPassword) {
    const hash = await sha256(newPassword);
    localStorage.setItem('snapsuites_custom_pass_hash', hash);
  }
  return true;
}
