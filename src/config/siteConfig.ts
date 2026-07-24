/**
 * siteConfig.ts
 * -----------------------------------------------------------------------
 * SATU-SATUNYA file yang perlu diubah untuk white-label / rebranding.
 * Ganti nilai di bawah ini, lalu seluruh website akan otomatis
 * menggunakan identitas baru (nama, logo, warna, kontak, dll).
 *
 * Untuk mengganti logo: cukup ganti file di `src/assets/logo.tsx`
 * (atau ganti path `logo.src` bila menggunakan file gambar).
 * -----------------------------------------------------------------------
 */

export interface SiteConfig {
  /**
   * URL dasar backend (Cloudflare Worker). Kosongkan ("") kalau backend
   * belum dideploy — form pendaftaran otomatis fallback ke mode simulasi.
   * Setelah worker dideploy, isi contoh:
   * "https://isp-backend.namakamu.workers.dev"
   */
  apiBaseUrl: string;
  company: {
    name: string;
    legalName: string;
    tagline: string;
    description: string;
    domain: string;
    logo: {
      /** 'icon' pakai komponen bawaan (sinyal WiFi), 'image' pakai file di assets */
      type: "icon" | "image";
      src?: string;
    };
    favicon: string;
  };
  theme: {
    primary: string;
    primaryDark: string;
    secondary: string;
    accent: string;
    success: string;
    danger: string;
    warning: string;
    background: string;
    surface: string;
    text: string;
    textMuted: string;
  };
  contact: {
    whatsapp: string; // format: 62xxxxxxxxxx (tanpa +)
    whatsappDisplay: string;
    email: string;
    address: string;
    googleMapsEmbedUrl: string;
    googleMapsLink: string;
    operatingHours: string;
  };
  social: {
    facebook: string;
    instagram: string;
    tiktok: string;
    telegram: string;
    youtube: string;
  };
}

export const siteConfig: SiteConfig = {
apiBaseUrl: "https://isp-backend.bimajokosaputra99.workers.dev",
  company: {
    name: "INSANNET",
    legalName: "Insan Network",
    tagline: "Internet Cepat, Hidup Lebih Cepat",
    description:
      "Penyedia layanan internet fiber optic rumahan dan bisnis dengan jaringan stabil ke seluruh area cakupan.",
    domain: "nexusnet.id",
    logo: {
      type: "icon",
    },
    favicon: "/favicon.svg",
  },
  theme: {
    primary: "#3B6FE0",
    primaryDark: "#2954B8",
    secondary: "#7C3AED",
    accent: "#F97316",
    success: "#16A34A",
    danger: "#DC2626",
    warning: "#F59E0B",
    background: "#FFFFFF",
    surface: "#F7F8FA",
    text: "#171923",
    textMuted: "#6B7280",
  },
  contact: {
    whatsapp: "6281234567890",
    whatsappDisplay: "0812-3456-7890",
    email: "halo@nexusnet.id",
    address: "Jl. Merdeka No. 88, Kediri, Jawa Timur",
  googleMapsEmbedUrl: "https://www.google.com/maps?q=Klanderan,+Kec.+Plosoklaten,+Kabupaten+Kediri,+Jawa+Timur&output=embed",
googleMapsLink: "https://www.google.com/maps/place/Klanderan,+Kec.+Plosoklaten,+Kabupaten+Kediri,+Jawa+Timur",
    operatingHours: "Senin - Minggu, 08.00 - 21.00 WIB",
  },
  social: {
    facebook: "https://facebook.com/insannet",
    instagram: "https://instagram.com/insannet",
    tiktok: "https://tiktok.com/@insannet",
    youtube: "https://youtube.com/insannet",
  },
};

export default siteConfig;
