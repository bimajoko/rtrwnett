import { useSiteData } from "../../hooks/useSiteData";

export function Testimonials() {
  const { testimonials } = useSiteData();

  return (
    <section className="section" id="testimoni">
      <div className="container">
        <div className="section__head">
          <span className="eyebrow">Testimoni</span>
          <h2>Apa Kata Pelanggan Kami</h2>
        </div>

        <div className="testi-grid">
          {testimonials.map((t) => (
            <div key={t.id} className="testi-card">
              <div className="testi-card__rating">{"★".repeat(t.rating)}{"☆".repeat(5 - t.rating)}</div>
              <p>"{t.quote}"</p>
              <div className="testi-card__author">
                <strong>{t.name}</strong>
                <span>{t.role} · {t.area}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
