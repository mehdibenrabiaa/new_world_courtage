// Public-site customer/partner accounts ("Espace Client" / "Espace
// Partenaire") — entirely separate from the CRM's own staff auth (different
// backend tables, different JWT scope). See the backend's
// app/routers/accounts.py.
const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000").replace(/\/+$/, "");

const ACCESS_TOKEN_KEY = "nwc_account_access_token";
const REFRESH_TOKEN_KEY = "nwc_account_refresh_token";

// Espace client/partenaire are built as separate pages (one per tab), so
// switching tabs is a real Next.js page navigation, not a tab switch within
// one mounted component — each page's layout re-mounts and would otherwise
// have to show a loading spinner while it re-fetches the account from
// scratch, which reads as "the page refreshed". Caching the last-fetched
// account in memory lets the layout render immediately with it on mount
// (no spinner) while still quietly re-fetching in the background to catch
// a changed/expired session.
let cachedAccount = null;

export function getCachedAccount() {
  return cachedAccount;
}

function hasStorage() {
  return typeof window !== "undefined";
}

export function getAccessToken() {
  return hasStorage() ? localStorage.getItem(ACCESS_TOKEN_KEY) : null;
}

export function getRefreshToken() {
  return hasStorage() ? localStorage.getItem(REFRESH_TOKEN_KEY) : null;
}

export function setTokens({ access_token, refresh_token }) {
  if (!hasStorage()) return;
  if (access_token) localStorage.setItem(ACCESS_TOKEN_KEY, access_token);
  if (refresh_token) localStorage.setItem(REFRESH_TOKEN_KEY, refresh_token);
}

export function clearTokens() {
  if (!hasStorage()) return;
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

export function isLoggedIn() {
  return !!getAccessToken();
}

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.detail || `Échec de la requête (${res.status})`);
  }
  return res.status === 204 ? null : res.json();
}

export async function registerAccount({ name, email, password, type }) {
  const data = await request("/api/accounts/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password, type }),
  });
  setTokens(data);
  cachedAccount = data.account;
  return data.account;
}

export async function loginAccount({ email, password }) {
  const data = await request("/api/accounts/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  setTokens(data);
  cachedAccount = data.account;
  return data.account;
}

export async function logoutAccount() {
  const refresh_token = getRefreshToken();
  if (refresh_token) {
    try {
      await request("/api/accounts/logout", { method: "POST", body: JSON.stringify({ refresh_token }) });
    } catch {
      // Best-effort — the refresh token might already be expired/revoked;
      // clearing local tokens below is what actually matters to the user.
    }
  }
  clearTokens();
  cachedAccount = null;
}

export async function forgotPassword(email) {
  await request("/api/accounts/forgot-password", { method: "POST", body: JSON.stringify({ email }) });
}

export async function resetPassword(token, password) {
  await request("/api/accounts/reset-password", { method: "POST", body: JSON.stringify({ token, password }) });
}

async function tryRefresh() {
  const refresh_token = getRefreshToken();
  if (!refresh_token) return false;
  try {
    const res = await fetch(`${API_URL}/api/accounts/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token }),
    });
    if (!res.ok) {
      clearTokens();
      return false;
    }
    setTokens(await res.json());
    return true;
  } catch {
    clearTokens();
    return false;
  }
}

// Authenticated fetch with a single automatic retry after a token refresh —
// mirrors the CRM's own authFetch (lib/api.ts) so a still-valid session
// never gets logged out early just because the access token happened to
// expire mid-visit.
export async function authFetch(path, options = {}) {
  const doFetch = () =>
    fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });

  let res = await doFetch();
  if (res.status === 401 && (await tryRefresh())) {
    res = await doFetch();
  }
  return res;
}

export async function getMe() {
  const res = await authFetch("/api/accounts/me");
  if (!res.ok) throw new Error("unauthorized");
  const account = await res.json();
  cachedAccount = account;
  return account;
}

export async function getMyLeads() {
  const res = await authFetch("/api/accounts/me/leads");
  if (!res.ok) throw new Error(`Échec du chargement (${res.status})`);
  return res.json();
}

export async function getMyReferral() {
  const res = await authFetch("/api/accounts/me/referral");
  if (!res.ok) throw new Error(`Échec du chargement (${res.status})`);
  return res.json();
}

// currentPassword is only required when email is actually changing (the
// backend rejects an email change without it — see routers/accounts.py's
// update_me) — a plain name-only edit doesn't need it.
export async function updateAccount({ name, email, currentPassword }) {
  const res = await authFetch("/api/accounts/me", {
    method: "PATCH",
    body: JSON.stringify({ name, email, current_password: currentPassword }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.detail || `Échec de la mise à jour (${res.status})`);
  }
  const account = await res.json();
  cachedAccount = account;
  return account;
}

export async function changePassword({ currentPassword, newPassword }) {
  const res = await authFetch("/api/accounts/me/change-password", {
    method: "POST",
    body: JSON.stringify({ current_password: currentPassword, new_password: newPassword }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.detail || `Échec du changement de mot de passe (${res.status})`);
  }
}

export async function getMyDocuments() {
  const res = await authFetch("/api/accounts/me/documents");
  if (!res.ok) throw new Error(`Échec du chargement (${res.status})`);
  return res.json();
}

// Downloading needs the Authorization header, so a plain <a href> can't hit
// this endpoint directly — fetch the file as a blob and hand the browser a
// throwaway object URL to save it under its original filename instead.
export async function downloadMyDocument(documentId, filename) {
  const res = await authFetch(`/api/accounts/me/documents/${documentId}/download`);
  if (!res.ok) throw new Error(`Échec du téléchargement (${res.status})`);
  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
}

export function oauthStartUrl(provider, type) {
  return `${API_URL}/api/accounts/oauth/${provider}/start?type=${type}`;
}
