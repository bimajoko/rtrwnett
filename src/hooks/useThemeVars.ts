import { useEffect } from "react";
import { siteConfig } from "../config/siteConfig";

/**
 * Menyuntikkan warna dari siteConfig.theme sebagai CSS custom properties
 * di :root, sehingga seluruh stylesheet (lihat theme.css) otomatis
 * mengikuti palet warna baru tanpa perlu diedit satu per satu.
 */
export function useThemeVars() {
  useEffect(() => {
    const root = document.documentElement;
    const { theme } = siteConfig;
    root.style.setProperty("--color-primary", theme.primary);
    root.style.setProperty("--color-primary-dark", theme.primaryDark);
    root.style.setProperty("--color-secondary", theme.secondary);
    root.style.setProperty("--color-accent", theme.accent);
    root.style.setProperty("--color-success", theme.success);
    root.style.setProperty("--color-danger", theme.danger);
    root.style.setProperty("--color-warning", theme.warning);
    root.style.setProperty("--color-background", theme.background);
    root.style.setProperty("--color-surface", theme.surface);
    root.style.setProperty("--color-text", theme.text);
    root.style.setProperty("--color-text-muted", theme.textMuted);

    document.title = `${siteConfig.company.name} — ${siteConfig.company.tagline}`;
  }, []);
}
