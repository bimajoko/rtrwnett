import { Link } from "react-router-dom";
import { siteConfig } from "../../config/siteConfig";
import { useSiteData } from "../../hooks/useSiteData";

export function Hero() {
  const { company } = siteConfig;
  const { stats, promo } = useSiteData();

  return (
    <section className="hero" id="top">
      <div className="container hero__inner">
        <div className="hero__copy">
          {promo.active && (
            <span className="badge">
              <span className="badge__dot" />
              {promo.title}
            </span>
          )}
          <h1>{company.tagline}</h1>
          <p>{company.description}</p>
          <div className="hero__cta">
            <Link to="/daftar" className="btn btn--primary btn--lg">
              Daftar Sekarang
            </Link>
            <a href="#paket" className="btn btn--ghost btn--lg">
              Lihat Paket
            </a>
          </div>

          <div className="hero__stats">
            {stats.map((s) => (
              <div key={s.id} className="hero__stat">
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero__visual" aria-hidden="true">
          <div className="hero__grid" />
          <div className="hero__visual-icon">
            <svg width="88" height="88" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="24" cy="36" r="4" fill="currentColor" />
              <path d="M14 28a14 14 0 0 1 20 0" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
              <path d="M6 20a24 24 0 0 1 36 0" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.5" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
