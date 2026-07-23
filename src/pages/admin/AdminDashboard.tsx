import { useEffect, useState, type CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { fetchRegistrations, updateRegistrationStatus, clearAdminToken } from "../../utils/api";
import type { Registration } from "../../utils/types";
import { buildWhatsAppLink } from "../../utils/format";
import { siteConfig } from "../../config/siteConfig";

const STATUS_LABEL: Record<Registration["status"], string> = {
  baru: "Baru",
  dihubungi: "Dihubungi",
  terpasang: "Terpasang",
  batal: "Batal",
};

const STATUS_COLOR: Record<Registration["status"], string> = {
  baru: "var(--color-primary)",
  dihubungi: "var(--color-warning)",
  terpasang: "var(--color-success)",
  batal: "var(--color-danger)",
};

const cellHead: CSSProperties = { padding: "14px 16px", fontWeight: 600, fontSize: "0.78rem" };
const cellBody: CSSProperties = { padding: "14px 16px", verticalAlign: "top" };

export function AdminDashboard() {
  const navigate = useNavigate();
  const [items, setItems] = useState<Registration[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    try {
      const data = await fetchRegistrations();
      setItems(data);
    } catch (e) {
      if (e instanceof Error && e.message === "UNAUTHORIZED") {
        clearAdminToken();
        navigate("/admin/login");
        return;
      }
      setError("Gagal memuat data. Periksa koneksi atau konfigurasi backend.");
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleStatusChange(id: string, status: Registration["status"]) {
    setItems((prev) => prev?.map((r) => (r.id === id ? { ...r, status } : r)) ?? prev);
    try {
      await updateRegistrationStatus(id, status);
    } catch {
      load(); // rollback dengan reload kalau gagal
    }
  }

  function handleLogout() {
    clearAdminToken();
    navigate("/admin/login");
  }

  return (
    <div className="section">
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div>
            <h2 style={{ marginBottom: 4 }}>Pendaftar Baru</h2>
            <p style={{ margin: 0 }}>Daftar orang yang mengisi form pendaftaran di website.</p>
          </div>
          <button onClick={handleLogout} className="btn btn--ghost">
            Keluar
          </button>
        </div>

        {error && (
          <div className="feature-card" style={{ borderColor: "var(--color-danger)", marginBottom: 20 }}>
            <p style={{ color: "var(--color-danger)", margin: 0 }}>{error}</p>
          </div>
        )}

        {!items && !error && <p>Memuat data...</p>}

        {items && items.length === 0 && (
          <div className="feature-card" style={{ textAlign: "center", padding: 40 }}>
            <p style={{ margin: 0 }}>Belum ada pendaftar masuk.</p>
          </div>
        )}

        {items && items.length > 0 && (
          <div className="feature-card" style={{ padding: 0, overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem", minWidth: 720 }}>
              <thead>
                <tr style={{ textAlign: "left", color: "var(--color-text-muted)" }}>
                  <th style={cellHead}>Nama</th>
                  <th style={cellHead}>Alamat</th>
                  <th style={cellHead}>HP</th>
                  <th style={cellHead}>Paket</th>
                  <th style={cellHead}>Tanggal</th>
                  <th style={cellHead}>Status</th>
                </tr>
              </thead>
              <tbody>
                {items.map((r) => {
                  const waLink = buildWhatsAppLink(
                    r.phone.replace(/^0/, "62"),
                    `Halo ${r.name}, terima kasih sudah mendaftar di ${siteConfig.company.name}.`
                  );
                  return (
                    <tr key={r.id} style={{ borderTop: "1px solid var(--border-color)" }}>
                      <td style={cellBody}>{r.name}</td>
                      <td style={{ ...cellBody, maxWidth: 220 }}>{r.address}</td>
                      <td style={cellBody}>
                        <a href={waLink} target="_blank" rel="noreferrer" style={{ color: "var(--color-primary)" }}>
                          {r.phone}
                        </a>
                      </td>
                      <td style={cellBody}>{r.package_name ?? "-"}</td>
                      <td style={cellBody}>{new Date(r.created_at).toLocaleDateString("id-ID")}</td>
                      <td style={cellBody}>
                        <select
                          value={r.status}
                          onChange={(e) => handleStatusChange(r.id, e.target.value as Registration["status"])}
                          style={{
                            padding: "4px 8px",
                            borderRadius: 8,
                            border: `1px solid ${STATUS_COLOR[r.status]}`,
                            color: STATUS_COLOR[r.status],
                            fontWeight: 600,
                            fontSize: "0.82rem",
                            background: "transparent",
                          }}
                        >
                          {(Object.keys(STATUS_LABEL) as Registration["status"][]).map((s) => (
                            <option key={s} value={s}>
                              {STATUS_LABEL[s]}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
