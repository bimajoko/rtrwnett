import { Link } from "react-router-dom";
import { formatRupiah } from "../../utils/format";
import { useSiteData } from "../../hooks/useSiteData";

export function Packages() {
  const { packages } = useSiteData();

  return (
    <section className="section" id="paket">
      <div className="container">
        <div className="section__head">
          <span className="eyebrow">Pilihan Paket</span>
          <h2>Paket Internet untuk Setiap Kebutuhan</h2>
          <p>Semua paket unlimited, tanpa FUP tersembunyi.</p>
        </div>

        <div className="pkg-grid">
          {packages.map((pkg) => (
            <div key={pkg.id} className={`pkg-card ${pkg.popular ? "is-popular" : ""}`}>
              {pkg.popular && <span className="pkg-card__tag">Terpopuler</span>}
              <h3>{pkg.name}</h3>
              <div className="pkg-card__speed">{pkg.speed}</div>
              <div className="pkg-card__price">
                {formatRupiah(pkg.price)}
                <span>/{pkg.period}</span>
              </div>
              <ul>
                {pkg.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <Link to={`/daftar?paket=${pkg.id}`} className={`btn ${pkg.popular ? "btn--primary" : "btn--outline"}`}>
                Pilih Paket
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
