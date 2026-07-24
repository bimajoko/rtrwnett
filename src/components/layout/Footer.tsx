import { siteConfig } from "../../config/siteConfig";
import { Logo } from "../ui/Logo";

export function Footer() {
  const { company, contact, social } = siteConfig;
  const year = new Date().getFullYear();

  const socialLinks = [
    { label: "Facebook", href: social.facebook },
    { label: "Instagram", href: social.instagram },
    { label: "TikTok", href: social.tiktok },
    { label: "YouTube", href: social.youtube },
  ];

  return (
    <footer className="footer" id="kontak">
      <div className="container footer__inner">
        <div className="footer__brand">
          <Logo size={30} />
          <p>{company.description}</p>
        </div>

        <div className="footer__col">
          <h4>Kontak</h4>
          <ul>
            <li>{contact.address}</li>
            <li>{contact.email}</li>
            <li>{contact.whatsappDisplay}</li>
            <li>{contact.operatingHours}</li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>Sosial Media</h4>
          <ul className="footer__social">
            {socialLinks.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer__bottom container">
        <span>
          © {year} {company.legalName}. Seluruh hak cipta dilindungi.
        </span>
        <span>{company.domain}</span>
      </div>
    </footer>
  );
}
