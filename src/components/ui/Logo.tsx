import { siteConfig } from "../../config/siteConfig";

interface LogoProps {
  size?: number;
  showName?: boolean;
}

/**
 * Placeholder logo berbentuk ikon sinyal WiFi.
 * Untuk mengganti logo permanen: set `company.logo.type = "image"` dan
 * `company.logo.src = "/logo.png"` di siteConfig.ts — komponen ini akan
 * otomatis merender <img> sebagai gantinya. Tidak perlu mengedit file lain.
 */
export function Logo({ size = 36, showName = true }: LogoProps) {
  const { logo, name } = siteConfig.company;

  return (
    <div className="logo">
      {logo.type === "image" && logo.src ? (
        <img src={logo.src} alt={`${name} logo`} width={size} height={size} style={{ borderRadius: 10 }} />
      ) : (
        <span className="logo__icon" style={{ width: size, height: size }}>
          <svg
            width={size * 0.55}
            height={size * 0.55}
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label={`${name} logo`}
          >
            <circle cx="24" cy="36" r="4" fill="#fff" />
            <path d="M14 28a14 14 0 0 1 20 0" stroke="#fff" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M6 20a24 24 0 0 1 36 0" stroke="#fff" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.65" />
          </svg>
        </span>
      )}
      {showName && <span className="logo__name">{name}</span>}
    </div>
  );
}
