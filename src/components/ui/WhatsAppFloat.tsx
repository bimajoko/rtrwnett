import { siteConfig } from "../../config/siteConfig";
import { buildWhatsAppLink } from "../../utils/format";

export function WhatsAppFloat() {
  const { company, contact } = siteConfig;
  const link = buildWhatsAppLink(
    contact.whatsapp,
    `Halo ${company.name}, saya ingin tanya-tanya soal internet.`
  );

  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className="wa-float"
      aria-label="Chat via WhatsApp"
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.42-1.36a9.9 9.9 0 0 0 4.62 1.15h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm5.8 14.05c-.24.69-1.4 1.32-1.94 1.4-.5.08-1.13.11-1.83-.11-.42-.13-.96-.31-1.65-.6-2.9-1.25-4.79-4.17-4.94-4.36-.14-.2-1.18-1.57-1.18-3 0-1.42.75-2.12 1.02-2.41.26-.28.57-.35.76-.35.19 0 .38 0 .55.01.18.01.42-.07.65.5.24.6.82 2.05.89 2.2.07.14.12.31.02.5-.1.19-.15.31-.3.48-.15.17-.31.38-.44.51-.14.14-.29.29-.13.57.17.28.75 1.24 1.62 2 1.11.99 2.04 1.3 2.33 1.44.29.14.46.12.63-.07.17-.19.72-.84.92-1.13.19-.28.38-.24.64-.14.26.1 1.65.78 1.94.92.28.14.47.21.54.33.07.12.07.68-.17 1.37Z" />
      </svg>
    </a>
  );
}
