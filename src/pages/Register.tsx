import { useState, type FormEvent, type CSSProperties } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { siteConfig } from "../config/siteConfig";
import { useSiteData } from "../hooks/useSiteData";
import { formatRupiah, buildWhatsAppLink } from "../utils/format";
import { submitRegistration } from "../utils/api";

const fieldLabel: CSSProperties = {
  fontSize: "0.85rem",
  fontWeight: 600,
  display: "block",
  marginBottom: 6,
};

const fieldInput: CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: "var(--radius-sm)",
  border: "1px solid var(--border-color)",
  fontSize: "0.92rem",
  outline: "none",
  fontFamily: "inherit",
};

/**
 * Form pendaftaran langsung di website — TIDAK mengarahkan ke WhatsApp.
 * Data dikirim ke backend (Cloudflare Worker + D1) lewat submitRegistration()
 * di utils/api.ts. Kalau siteConfig.apiBaseUrl masih kosong (backend belum
 * dideploy), otomatis fallback ke mode simulasi lokal untuk demo/testing.
 */
export function Register() {
  const [searchParams] = useSearchParams();
  const { packages } = useSiteData();
  const { company, contact } = siteConfig;

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [packageId, setPackageId] = useState(searchParams.get("paket") ?? packages[0]?.id ?? "");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [refCode, setRefCode] = useState<string | null>(null);

  const selectedPackage = packages.find((p) => p.id === packageId);

  const csWaLink = buildWhatsAppLink(
    contact.whatsapp,
    `Halo ${company.name}, saya ada pertanyaan sebelum daftar berlangganan.`
  );

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name || !address || !phone || !packageId) return;

    setSubmitting(true);
    setSubmitError(null);
    try {
      const { refCode } = await submitRegistration({
        name,
        address,
        phone,
        packageId,
        packageName: selectedPackage?.name,
      });
      setRefCode(refCode);
    } catch {
      setSubmitError("Gagal mengirim pendaftaran. Coba lagi sebentar lagi.");
    } finally {
      setSubmitting(false);
    }
  }

  if (refCode) {
    return (
      <div className="section" style={{ minHeight: "70vh", display: "flex", alignItems: "center" }}>
        <div className="container container--narrow">
          <div className="feature-card" style={{ textAlign: "center", padding: 40 }}>
            <span
              className="feature-card__icon"
              style={{
                margin: "0 auto 16px",
                background: "color-mix(in srgb, var(--color-success) 14%, transparent)",
                color: "var(--color-success)",
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
            <h2 style={{ marginBottom: 8 }}>Pendaftaran Terkirim!</h2>
            <p>
              Nomor referensi kamu: <strong style={{ color: "var(--color-text)" }}>{refCode}</strong>
            </p>
            <p>
              Tim kami akan menghubungi <strong style={{ color: "var(--color-text)" }}>{phone}</strong> dalam
              1x24 jam untuk konfirmasi jadwal pemasangan paket <strong>{selectedPackage?.name}</strong>.
            </p>
            <Link to="/" className="btn btn--primary" style={{ marginTop: 12 }}>
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="container container--narrow">
        <div className="section__head">
          <span className="eyebrow">Formulir Pendaftaran</span>
          <h2>Daftar Berlangganan</h2>
          <p>Isi data di bawah, tim kami akan menghubungi Anda untuk proses pemasangan.</p>
        </div>

        <form onSubmit={handleSubmit} className="feature-card" style={{ padding: 32 }}>
          <div style={{ marginBottom: 18 }}>
            <label style={fieldLabel}>Nama Lengkap</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama sesuai KTP" style={fieldInput} required />
          </div>

          <div style={{ marginBottom: 18 }}>
            <label style={fieldLabel}>Alamat Pemasangan</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Jl., No. Rumah, RT/RW, Kelurahan"
              rows={3}
              style={{ ...fieldInput, resize: "vertical" }}
              required
            />
          </div>

          <div style={{ marginBottom: 18 }}>
            <label style={fieldLabel}>Nomor HP/WhatsApp Aktif</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="08xxxxxxxxxx"
              type="tel"
              style={fieldInput}
              required
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={fieldLabel}>Pilih Paket</label>
            <div style={{ display: "grid", gap: 10 }}>
              {packages.map((p) => (
                <label
                  key={p.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "12px 16px",
                    borderRadius: "var(--radius-sm)",
                    border: packageId === p.id ? "1px solid var(--color-primary)" : "1px solid var(--border-color)",
                    cursor: "pointer",
                  }}
                >
                  <span>
                    <input
                      type="radio"
                      name="package"
                      value={p.id}
                      checked={packageId === p.id}
                      onChange={() => setPackageId(p.id)}
                      style={{ marginRight: 10 }}
                    />
                    <strong>{p.name}</strong> — {p.speed}
                  </span>
                  <span>
                    {formatRupiah(p.price)}/{p.period}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <button type="submit" className="btn btn--primary btn--lg" style={{ width: "100%" }} disabled={submitting}>
            {submitting ? "Mengirim..." : "Kirim Pendaftaran"}
          </button>

          {submitError && (
            <p style={{ color: "var(--color-danger)", fontSize: "0.85rem", textAlign: "center", marginTop: 12, marginBottom: 0 }}>
              {submitError}
            </p>
          )}

          <p style={{ textAlign: "center", fontSize: "0.82rem", marginTop: 18, marginBottom: 0 }}>
            Ada pertanyaan sebelum daftar?{" "}
            <a href={csWaLink} target="_blank" rel="noreferrer" style={{ color: "var(--color-primary)", fontWeight: 600 }}>
              Hubungi CS via WhatsApp
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
