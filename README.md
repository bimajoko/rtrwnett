# ISP Landing Page — Template Komersial

Template landing page untuk bisnis internet/WiFi (ISP), dibangun dengan
React + TypeScript + Vite. Dirancang agar bisa **di-white-label ke banyak
pelanggan dalam waktu kurang dari 5 menit**, tanpa menyentuh kode komponen.

## Cara Ganti Branding (< 5 menit)

Edit satu file: `src/config/siteConfig.ts`

| Yang diganti          | Field                                    |
|------------------------|-------------------------------------------|
| Nama perusahaan        | `company.name`, `company.legalName`       |
| Slogan                 | `company.tagline`                         |
| Warna utama/sekunder   | `theme.primary`, `theme.secondary`, dst.  |
| Nomor WhatsApp         | `contact.whatsapp`                        |
| Email, alamat, jam buka| `contact.*`                               |
| Google Maps            | `contact.googleMapsEmbedUrl`              |
| Sosial media           | `social.*`                                |
| Domain                 | `company.domain`                          |

Semua komponen membaca dari `siteConfig`, tidak ada nama/warna yang
di-hardcode di dalam komponen.

## Ganti Logo

- Default: ikon sinyal WiFi (SVG bawaan, otomatis ikut warna primary).
- Untuk logo gambar: taruh file di `src/assets/`, lalu di `siteConfig.ts`
  set `company.logo = { type: "image", src: "/logo.png" }`.
- Favicon: ganti file `public/favicon.svg`.

## Ganti Konten (bukan branding)

Semua konten non-branding ada di `src/data/*.json`:

- `packages.json`, `faq.json`, `testimonials.json`,
  `coverage.json`, `promo.json`, `stats.json`

## Struktur Folder

```
src/
  config/     -> siteConfig.ts (branding)
  data/       -> JSON konten
  components/layout, components/ui
  pages/sections
  hooks/      -> useThemeVars, useSiteData
  utils/      -> types.ts, format.ts
  styles/     -> theme.css (semua warna via CSS variable)
  assets/
```

## Menjalankan

```bash
npm install
npm run dev
npm run build
```

> Seluruh data di atas adalah **data dummy**. Ganti sebelum dipakai produksi.
