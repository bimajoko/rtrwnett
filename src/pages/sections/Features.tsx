import { siteConfig } from "../../config/siteConfig";

const FEATURES = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
        <path d="M12 12l4-4" />
      </svg>
    ),
    title: "Koneksi Stabil",
    desc: "Jaringan fiber & wireless yang andal untuk streaming, kerja, dan gaming tanpa putus.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <rect x="3" y="6" width="18" height="13" rx="2" />
        <path d="M3 10h18M7 15h2" />
      </svg>
    ),
    title: "Harga Terjangkau",
    desc: "Biaya patungan warga membuat internet cepat jadi lebih murah untuk semua.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <path d="M21 19a2 2 0 0 1-2 2h-1v-6h3v4ZM3 19a2 2 0 0 0 2 2h1v-6H3v4Z" />
      </svg>
    ),
    title: "Dukungan Lokal",
    desc: "Tim teknis dari lingkungan sendiri yang siap membantu dengan cepat.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5l-8-3Z" />
      </svg>
    ),
    title: "Tanpa Kontrak",
    desc: "Bayar bulanan tanpa ikatan jangka panjang. Berhenti kapan saja.",
  },
];

export function Features() {
  const { company } = siteConfig;

  return (
    <section className="section section--alt">
      <div className="container">
        <div className="section__head">
          <h2>Kenapa memilih {company.name}?</h2>
          <p>Kami fokus pada kualitas koneksi dan pelayanan yang dekat dengan warga.</p>
        </div>

        <div className="feature-grid">
          {FEATURES.map((f) => (
            <div key={f.title} className="feature-card">
              <span className="feature-card__icon">{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
