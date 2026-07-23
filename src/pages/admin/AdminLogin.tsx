import { useState, type FormEvent, type CSSProperties } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Logo } from "../../components/ui/Logo";
import { adminLogin, isBackendConfigured } from "../../utils/api";

const fieldLabel: CSSProperties = { fontSize: "0.85rem", fontWeight: 600, display: "block", marginBottom: 6 };
const fieldInput: CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: "var(--radius-sm)",
  border: "1px solid var(--border-color)",
  fontSize: "0.92rem",
  outline: "none",
};

export function AdminLogin() {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const ok = await adminLogin(token);
    setLoading(false);
    if (ok) {
      navigate("/admin");
    } else {
      setError(
        isBackendConfigured()
          ? "Token salah."
          : "Backend belum dikonfigurasi. Isi apiBaseUrl di siteConfig.ts terlebih dahulu."
      );
    }
  }

  return (
    <div className="section" style={{ minHeight: "70vh", display: "flex", alignItems: "center" }}>
      <div className="container container--narrow" style={{ width: "100%" }}>
        <form onSubmit={handleSubmit} className="feature-card" style={{ maxWidth: 380, margin: "0 auto", padding: 32 }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
            <Logo size={40} />
          </div>
          <h2 style={{ textAlign: "center", fontSize: "1.2rem" }}>Login Admin</h2>
          <p style={{ textAlign: "center", marginBottom: 24 }}>Masuk untuk melihat daftar pendaftar baru.</p>

          <label style={fieldLabel}>Token Admin</label>
          <input
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Masukkan token admin"
            style={fieldInput}
          />

          {error && <p style={{ color: "var(--color-danger)", fontSize: "0.85rem", marginTop: 12 }}>{error}</p>}

          <button type="submit" className="btn btn--primary" style={{ width: "100%", marginTop: 20 }} disabled={loading}>
            {loading ? "Memeriksa..." : "Masuk"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: 20 }}>
          <Link to="/" style={{ color: "var(--color-primary)", fontWeight: 600, fontSize: "0.9rem" }}>
            ← Kembali ke Beranda
          </Link>
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;
