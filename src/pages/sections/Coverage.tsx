import { siteConfig } from "../../config/siteConfig";
import { useSiteData } from "../../hooks/useSiteData";

const STATUS_LABEL: Record<string, string> = {
  active: "Aktif",
  coming_soon: "Segera Hadir",
  planned: "Rencana Ekspansi",
};

export function Coverage() {
  const { coverage } = useSiteData();
  const { contact } = siteConfig;

  return (
    <section className="section section--alt" id="cakupan">
      <div className="container">
        <div className="section__head">
          <span className="eyebrow">Cakupan Layanan</span>
          <h2>Area yang Sudah Terjangkau</h2>
          <p>{contact.address}</p>
        </div>

        <div className="coverage-grid">
          {coverage.map((c) => (
            <div key={c.id} className={`coverage-chip status--${c.status}`}>
              <span className="coverage-chip__dot" />
              {c.area}
              <em>{STATUS_LABEL[c.status]}</em>
            </div>
          ))}
        </div>

        <div className="coverage-map">
          <iframe
            title="Lokasi kantor"
            src={contact.googleMapsEmbedUrl}
            width="100%"
            height="320"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
