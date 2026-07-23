import packagesData from "../data/packages.json";
import faqData from "../data/faq.json";
import testimonialsData from "../data/testimonials.json";
import coverageData from "../data/coverage.json";
import promoData from "../data/promo.json";
import statsData from "../data/stats.json";
import subscribersData from "../data/subscribers.json";
import type {
  Package,
  FaqItem,
  Testimonial,
  CoverageArea,
  Promo,
  Stat,
  Subscriber,
} from "../utils/types";

/**
 * Titik akses tunggal untuk seluruh data konten (bukan branding).
 * Admin cukup mengubah file JSON di src/data/, komponen tidak perlu disentuh.
 */
export function useSiteData() {
  return {
    packages: packagesData as Package[],
    faq: faqData as FaqItem[],
    testimonials: testimonialsData as Testimonial[],
    coverage: coverageData as CoverageArea[],
    promo: promoData as Promo,
    stats: statsData as Stat[],
    subscribers: subscribersData as Subscriber[],
  };
}
