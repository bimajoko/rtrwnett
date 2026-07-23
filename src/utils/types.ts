export interface Package {
  id: string;
  name: string;
  speed: string;
  price: number;
  period: string;
  popular: boolean;
  features: string[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  area: string;
  rating: number;
  quote: string;
}

export interface CoverageArea {
  id: string;
  area: string;
  status: "active" | "coming_soon" | "planned";
}

export interface Promo {
  active: boolean;
  title: string;
  description: string;
  code: string;
  validUntil: string;
}

export interface Stat {
  id: string;
  label: string;
  value: string;
}

export interface Subscriber {
  id: string; // ID Pelanggan, dipakai untuk login
  name: string;
  phone: string;
  address: string;
  packageId: string;
  status: "paid" | "unpaid";
  nextBillingDate: string;
  lastPaymentDate: string | null;
}

export interface Registration {
  id: string;
  name: string;
  address: string;
  phone: string;
  package_id: string | null;
  package_name: string | null;
  status: "baru" | "dihubungi" | "terpasang" | "batal";
  created_at: string;
}
