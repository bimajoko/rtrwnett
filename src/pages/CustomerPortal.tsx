import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { useCustomerAuth } from "../hooks/useCustomerAuth";
import { useSiteData } from "../hooks/useSiteData";
import { formatRupiah } from "../utils/format";
import { buildWhatsAppLink } from "../utils/format";
import { siteConfig } from "../config/siteConfig";

export function CustomerPortal() {
  const { subscriber, logout } = useCustomerAuth();
  const { packages } = useSiteData();
  const [changingPackage, setChangingPackage] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState("");
  const [requestSent, setRequestSent] = useState(false);

  if (!subscriber) return <Navigate to="/pelanggan/login" replace />;

  const currentPackage = packages.find((p) => p.id === subscriber.packageId);
  const isPaid = subscriber.status === "paid";

  function handleRequestChange() {
    if (!selectedPackageId) return;
    // Demo: belum tersambung backend, jadi permintaan hanya disimulasikan
    // lewat pesan WhatsApp ke admin. Di production, ini idealnya memanggil
    // endpoint backend yang mencatat permintaan ganti paket ke database.
    setRequestSent(true);
  }

  const targetPackage = packages.find((p) => p.id === selectedPackageId);
  const waLink = buildWhatsAppLink(
    siteConfig.contact.whatsapp,
    `Halo, saya ${subscriber.name} (ID: ${subscriber.id}) ingin ganti paket ke ${targetPackage?.name ?? ""}.`
  );

  return (
    <div className="section" style={{ minHeight: "70vh" }}>
      <div className="container container--narrow">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div>
            <h2 style={{ marginBottom: 4 }}>Halo, {subscriber.name}</h2>
            <p style={{ margin: 0 }}>ID Pelanggan: {subscriber.id}</p>
          </div>
          <button onClick={logout} className="btn btn--ghost" style={{ height: "fit-content" }}>
            Keluar
          </button>
        </div>

        {/* Kartu Status Langganan */}
        <div className="feature-card" style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
            <div>
              <span style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>Paket Aktif</span>
              <h3 style={{ margin: "4px 0 2px", fontSize: "1.3rem" }}>{currentPackage?.name ?? "-"}</h3>
              <p style={{ margin: 0 }}>
                {currentPackage?.speed} — {currentPackage ? formatRupiah(currentPackage.price) : "-"}/{currentPackage?.period}
              </p>
            </div>
            <span
              className="badge"
              style={{
                background: isPaid ? "color-mix(in srgb, var(--color-success) 12%, transparent)" : "color-mix(in srgb, var(--color-danger) 12%, transparent)",
                color: isPaid ? "var(--color-success)" : "var(--color-danger)",
                border: "none",
                marginBottom: 0,
              }}
            >
              <span
                className="badge__dot"
                style={{ background: isPaid ? "var(--color-success)" : "var(--color-danger)" }}
              />
              {isPaid ? "Sudah Bayar" : "Belum Bayar"}
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 20, paddingTop: 20, borderTop: "1px solid var(--border-color)" }}>
            <div>
              <span style={{ fontSize: "0.78rem", color: "var(--color-text-muted)", display: "block" }}>Jatuh Tempo Berikutnya</span>
              <strong style={{ fontSize: "0.92rem" }}>{subscriber.nextBillingDate}</strong>
            </div>
            <div>
              <span style={{ fontSize: "0.78rem", color: "var(--color-text-muted)", display: "block" }}>Pembayaran Terakhir</span>
              <strong style={{ fontSize: "0.92rem" }}>{subscriber.lastPaymentDate ?? "Belum ada"}</strong>
            </div>
          </div>

          {!isPaid && (
            <a
              href={buildWhatsAppLink(
                siteConfig.contact.whatsapp,
                `Halo, saya ${subscriber.name} (ID: ${subscriber.id}) ingin konfirmasi pembayaran tagihan.`
              )}
              target="_blank"
              rel="noreferrer"
              className="btn btn--primary"
              style={{ marginTop: 16, width: "100%" }}
            >
              Konfirmasi Pembayaran via WhatsApp
            </a>
          )}
        </div>

        {/* Ganti Paket */}
        <div className="feature-card">
          <h3 style={{ marginBottom: 4 }}>Ganti Paket</h3>
          <p>Pilih paket baru — permintaan akan diteruskan ke admin untuk diproses.</p>

          {!changingPackage ? (
            <button className="btn btn--outline" onClick={() => setChangingPackage(true)}>
              Ajukan Ganti Paket
            </button>
          ) : requestSent ? (
            <p style={{ color: "var(--color-success)", fontWeight: 600, margin: 0 }}>
              Permintaan terkirim. Admin akan menghubungi Anda untuk konfirmasi.
            </p>
          ) : (
            <>
              <div style={{ display: "grid", gap: 10, marginBottom: 16 }}>
                {packages
                  .filter((p) => p.id !== subscriber.packageId)
                  .map((p) => (
                    <label
                      key={p.id}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "12px 16px",
                        borderRadius: "var(--radius-sm)",
                        border:
                          selectedPackageId === p.id
                            ? "1px solid var(--color-primary)"
                            : "1px solid var(--border-color)",
                        cursor: "pointer",
                      }}
                    >
                      <span>
                        <input
                          type="radio"
                          name="package"
                          value={p.id}
                          checked={selectedPackageId === p.id}
                          onChange={() => setSelectedPackageId(p.id)}
                          style={{ marginRight: 10 }}
                        />
                        <strong>{p.name}</strong> — {p.speed}
                      </span>
                      <span>{formatRupiah(p.price)}/{p.period}</span>
                    </label>
                  ))}
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <a
                  href={selectedPackageId ? waLink : undefined}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn--primary"
                  onClick={handleRequestChange}
                  style={{ pointerEvents: selectedPackageId ? "auto" : "none", opacity: selectedPackageId ? 1 : 0.5 }}
                >
                  Kirim Permintaan
                </a>
                <button className="btn btn--ghost" onClick={() => setChangingPackage(false)}>
                  Batal
                </button>
              </div>
            </>
          )}
        </div>

        <p style={{ textAlign: "center", marginTop: 24 }}>
          <Link to="/" style={{ color: "var(--color-primary)", fontWeight: 600, fontSize: "0.9rem" }}>
            ← Kembali ke Beranda
          </Link>
        </p>
      </div>
    </div>
  );
}

export default CustomerPortal;
