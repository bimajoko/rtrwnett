import { useState } from "react";
import { Link } from "react-router-dom";
import { Logo } from "../ui/Logo";

const NAV_LINKS = [
  { label: "Paket", href: "/#paket" },
  { label: "Cakupan Area", href: "/#cakupan" },
  { label: "Testimoni", href: "/#testimoni" },
  { label: "FAQ", href: "/#faq" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <div className="container header__inner">
        <a href="/" className="header__brand">
          <Logo size={32} />
        </a>

        <nav className={`header__nav ${open ? "is-open" : ""}`}>
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          <Link to="/speedtest" onClick={() => setOpen(false)}>
            Speed Test
          </Link>
          <Link to="/pelanggan/login" onClick={() => setOpen(false)}>
            Area Pelanggan
          </Link>
        </nav>

        <div className="header__actions">
          <Link to="/daftar" className="btn btn--primary" onClick={() => setOpen(false)}>
            Daftar Sekarang
          </Link>
          <button
            className="header__burger"
            aria-label="Buka menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
