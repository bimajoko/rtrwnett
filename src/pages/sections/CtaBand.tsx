import { Link } from "react-router-dom";

export function CtaBand() {
  return (
    <section className="section">
      <div className="container">
        <div className="cta-band">
          <h2>Siap menikmati internet lebih cepat?</h2>
          <p>Cek apakah area Anda sudah terjangkau, lalu daftar dalam hitungan menit.</p>
          <div className="hero__cta" style={{ justifyContent: "center" }}>
            <a href="#cakupan" className="btn btn--secondary">
              Cek Cakupan Area
            </a>
            <Link to="/daftar" className="btn btn--outline">
              Daftar Sekarang
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
