const STEPS = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12Z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
    title: "Cek Area",
    desc: "Pastikan lokasi Anda berada dalam cakupan layanan kami.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M6 20a14 14 0 0 1 12 0M3 15a19 19 0 0 1 18 0M9 12a9 9 0 0 1 6 0" />
        <circle cx="12" cy="19.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
    title: "Pilih Paket",
    desc: "Pilih paket internet sesuai kebutuhan dan jumlah perangkat.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
      </svg>
    ),
    title: "Pemasangan",
    desc: "Teknisi memasang perangkat dalam 1–3 hari kerja. Langsung online!",
  },
];

export function Steps() {
  return (
    <section className="section">
      <div className="container steps-grid">
        <div className="steps-visual" aria-hidden="true">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <rect x="3" y="4" width="18" height="14" rx="2" />
            <path d="M8 21h8M12 18v3" />
          </svg>
        </div>

        <div>
          <h2>Cara Berlangganan</h2>
          <p>Hanya tiga langkah mudah untuk menikmati internet cepat di rumah Anda.</p>

          <div className="steps-list">
            {STEPS.map((s, i) => (
              <div key={s.title} className="step">
                <span className="step__icon">{s.icon}</span>
                <div>
                  <h3>{i + 1}. {s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
