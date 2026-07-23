import { siteConfig } from "../config/siteConfig";
import type { Registration } from "./types";

const ADMIN_TOKEN_KEY = "isp_admin_token";

function apiUrl(path: string) {
  return `${siteConfig.apiBaseUrl}${path}`;
}

/** true kalau backend sudah dikonfigurasi (apiBaseUrl diisi di siteConfig.ts) */
export const isBackendConfigured = () => siteConfig.apiBaseUrl.trim().length > 0;

export function getAdminToken() {
  return sessionStorage.getItem(ADMIN_TOKEN_KEY);
}

export function setAdminToken(token: string) {
  sessionStorage.setItem(ADMIN_TOKEN_KEY, token);
}

export function clearAdminToken() {
  sessionStorage.removeItem(ADMIN_TOKEN_KEY);
}

/**
 * Kirim pendaftaran baru ke backend.
 * Kalau backend belum dikonfigurasi, otomatis fallback ke simulasi lokal
 * (dipakai untuk demo/testing sebelum worker dideploy).
 */
export async function submitRegistration(data: {
  name: string;
  address: string;
  phone: string;
  packageId?: string;
  packageName?: string;
}): Promise<{ refCode: string }> {
  if (!isBackendConfigured()) {
    await new Promise((r) => setTimeout(r, 600));
    return { refCode: `REG-DEMO-${Date.now().toString().slice(-8)}` };
  }

  const res = await fetch(apiUrl("/api/registrations"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Gagal mengirim pendaftaran");
  return res.json();
}

/** Verifikasi token admin ke backend saat login */
export async function adminLogin(token: string): Promise<boolean> {
  if (!isBackendConfigured()) return false;
  const res = await fetch(apiUrl("/api/admin/login"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });
  if (!res.ok) return false;
  setAdminToken(token);
  return true;
}

/** Ambil semua data pendaftar (butuh admin token) */
export async function fetchRegistrations(): Promise<Registration[]> {
  const token = getAdminToken();
  const res = await fetch(apiUrl("/api/registrations"), {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.status === 401) throw new Error("UNAUTHORIZED");
  if (!res.ok) throw new Error("Gagal memuat data pendaftar");
  return res.json();
}

/** Update status satu pendaftar (butuh admin token) */
export async function updateRegistrationStatus(id: string, status: Registration["status"]) {
  const token = getAdminToken();
  const res = await fetch(apiUrl(`/api/registrations/${id}`), {
    method: "PATCH",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error("Gagal memperbarui status");
}
