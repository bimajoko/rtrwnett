import { useState } from "react";
import { measurePing, measureDownloadMbps, measureUploadMbps } from "../utils/speedtest";

type Phase = "idle" | "ping" | "download" | "upload" | "done" | "error";

export function SpeedTest() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [ping, setPing] = useState<number | null>(null);
  const [download, setDownload] = useState<number | null>(null);
  const [upload, setUpload] = useState<number | null>(null);

  async function runTest() {
    setPing(null);
    setDownload(null);
    setUpload(null);

    try {
      setPhase("ping");
      const p = await measurePing();
      setPing(p);

      setPhase("download");
      const d = await measureDownloadMbps();
      setDownload(d);

      setPhase("upload");
      const u = await measureUploadMbps();
      setUpload(u);

      setPhase("done");
    } catch {
      setPhase("error");
    }
  }

  const isRunning = phase === "ping" || phase === "download" || phase === "upload";

  return (
    <div className="section" style={{ minHeight: "70vh" }}>
      <div className="container container--narrow">
        <div className="section__head">
          <h2>Speed Test</h2>
          <p>Cek kecepatan internet Anda saat ini. Gratis, tanpa perlu login.</p>
        </div>

        <div className="feature-card" style={{ textAlign: "center", padding: 40 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 16,
              marginBottom: 32,
            }}
          >
            <ResultBox label="Ping" value={ping !== null ? `${ping.toFixed(0)} ms` : "-"} active={phase === "ping"} />
            <ResultBox
              label="Download"
              value={download !== null ? `${download.toFixed(1)} Mbps` : "-"}
              active={phase === "download"}
            />
            <ResultBox
              label="Upload"
              value={upload !== null ? `${upload.toFixed(1)} Mbps` : "-"}
              active={phase === "upload"}
            />
          </div>

          <button className="btn btn--primary btn--lg" onClick={runTest} disabled={isRunning}>
            {isRunning ? statusLabel(phase) : phase === "done" ? "Tes Lagi" : "Mulai Speed Test"}
          </button>

          {phase === "error" && (
            <p style={{ color: "var(--color-danger)", marginTop: 16 }}>
              Tes gagal, kemungkinan koneksi terputus. Coba lagi.
            </p>
          )}

          <p style={{ marginTop: 20, fontSize: "0.78rem" }}>
            Hasil bisa berbeda dari kecepatan langganan tergantung jarak ke server tes, jaringan
            WiFi, dan jumlah perangkat yang sedang aktif.
          </p>
        </div>
      </div>
    </div>
  );
}

function statusLabel(phase: Phase) {
  if (phase === "ping") return "Mengukur ping...";
  if (phase === "download") return "Mengukur unduh...";
  if (phase === "upload") return "Mengukur unggah...";
  return "Menguji...";
}

function ResultBox({ label, value, active }: { label: string; value: string; active: boolean }) {
  return (
    <div
      style={{
        padding: "20px 8px",
        borderRadius: "var(--radius-sm)",
        background: active ? "color-mix(in srgb, var(--color-primary) 8%, transparent)" : "var(--color-surface)",
        border: active ? "1px solid var(--color-primary)" : "1px solid var(--border-color)",
      }}
    >
      <div style={{ fontSize: "1.4rem", fontWeight: 800, fontFamily: "var(--font-display)" }}>{value}</div>
      <div style={{ fontSize: "0.78rem", color: "var(--color-text-muted)", marginTop: 4 }}>{label}</div>
    </div>
  );
}

export default SpeedTest;
