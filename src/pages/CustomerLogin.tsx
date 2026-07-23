import { useState, type CSSProperties, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCustomerAuth } from "../hooks/useCustomerAuth";
import { Logo } from "../components/ui/Logo";

const inputStyle: CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: "var(--radius-sm)",
  border: "1px solid var(--border-color)",
  fontSize: "0.92rem",
  outline: "none",
};

export function CustomerLogin() {
  const { login, error } = useCustomerAuth();
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [phoneLast4, setPhoneLast4] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (login(id, phoneLast4)) {
      navigate("/pelanggan");
    }
  }

  return (
    <div className="section" style={{ minHeight: "70vh", display: "flex", alignItems: "center" }}>
      <div className="container container--narrow" style={{ width: "100%" }}>
        <form
          onSubmit={handleSubmit}
          className="feature-card"
          style={{ maxWidth: 380, margin: "0 auto", padding: 32 }}
        >
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
            <Logo size={40} />
          </div>
          <h2 style={{ textAlign: "center", fontSize: "1.2rem" }}>Area Pelanggan</h2>
          <p style={{ textAlign: "center", marginBottom: 24 }}>
            Masuk untuk cek paket, status tagihan, dan ganti paket.
          </p>

          <label style={{ fontSize: "0.85rem", fontWeight: 600, display: "block", marginBottom: 6 }}>
            ID Pelanggan
          </label>
          <input
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="Contoh: PLG001"
            style={inputStyle}
          />

          <label style={{ fontSize: "0.85rem", fontWeight: 600, display: "block", margin: "16px 0 6px" }}>
            4 Digit Terakhir No. HP Terdaftar
          </label>
          <input
            value={phoneLast4}
            onChange={(e) => setPhoneLast4(e.target.value)}
            placeholder="Contoh: 0001"
            maxLength={4}
            style={inputStyle}
          />

          {error && <p style={{ color: "var(--color-danger)", fontSize: "0.85rem", marginTop: 12 }}>{error}</p>}

          <button type="submit" className="btn btn--primary" style={{ width: "100%", marginTop: 20 }}>
            Masuk
          </button>

          <p style={{ textAlign: "center", fontSize: "0.78rem", marginTop: 16, marginBottom: 0 }}>
            Demo: ID <strong>PLG001</strong>, 4 digit HP <strong>0001</strong>
          </p>
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

export default CustomerLogin;
