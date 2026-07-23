/**
 * Speed test sederhana memakai endpoint publik Cloudflare
 * (speed.cloudflare.com) — gratis, tidak butuh server sendiri.
 * Cara kerja sama seperti yang dipakai oleh speed.cloudflare.com resmi:
 * - __down?bytes=N  -> download N byte data, dipakai ukur kecepatan unduh & ping
 * - __up             -> upload data, dipakai ukur kecepatan unggah
 */

const BASE = "https://speed.cloudflare.com";

async function timeFetch(url: string, init?: RequestInit): Promise<number> {
  const start = performance.now();
  const res = await fetch(url, { ...init, cache: "no-store" });
  await res.arrayBuffer();
  return performance.now() - start;
}

export async function measurePing(samples = 4): Promise<number> {
  const times: number[] = [];
  for (let i = 0; i < samples; i++) {
    const ms = await timeFetch(`${BASE}/__down?bytes=0&t=${Date.now()}`);
    times.push(ms);
  }
  times.sort((a, b) => a - b);
  // pakai median biar tidak terpengaruh outlier
  return times[Math.floor(times.length / 2)];
}

export async function measureDownloadMbps(bytes = 10_000_000): Promise<number> {
  const start = performance.now();
  const res = await fetch(`${BASE}/__down?bytes=${bytes}&t=${Date.now()}`, { cache: "no-store" });
  const buf = await res.arrayBuffer();
  const seconds = (performance.now() - start) / 1000;
  const bits = buf.byteLength * 8;
  return bits / seconds / 1_000_000;
}

export async function measureUploadMbps(bytes = 4_000_000): Promise<number> {
  const data = new Uint8Array(bytes);
  crypto.getRandomValues(data.subarray(0, Math.min(bytes, 65536))); // isi sebagian acak, cukup untuk uji kecepatan
  const start = performance.now();
  await fetch(`${BASE}/__up`, {
    method: "POST",
    body: data,
    cache: "no-store",
  });
  const seconds = (performance.now() - start) / 1000;
  const bits = bytes * 8;
  return bits / seconds / 1_000_000;
}
