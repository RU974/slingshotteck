// ─── Config File Types ────────────────────────────────────────────────────────

export interface NavLink {
  name: string;
  url: string;
}

export interface NavigationLink extends NavLink {
  hasChildren?: boolean;
  children?: NavLink[];
}

export interface Menu {
  main: NavigationLink[];
  footer_col_1_title: string;
  footer_col_2_title: string;
  footer_col_3_title: string;
  footer_primary: NavLink[];
  footer_resource: NavLink[];
  footer_legal: NavLink[];
}

export interface SocialLink {
  name: string;
  icon: string;
  link: string;
}

// ─── Content Types ──────────────────────────────────────────────────────────
// Front matter is validated by convention, not at runtime. Fields used by the
// templates are typed loosely so editors can add new keys freely.

export interface Faq {
  question: string;
  answer: string;
}

export interface Button {
  enable: boolean;
  label: string;
  link: string;
}

export interface BlogPost {
  title: string;
  meta_title?: string;
  description?: string;
  date?: string;
  updated?: string;
  image?: string;
  draft?: boolean;
  author: string;
  author_image?: string;
  categories: string[];
  tags: string[];
  tag?: string;
  read_time?: string;
  external_url?: string;
  faqs?: Faq[];
}

export interface Service {
  title: string;
  meta_title?: string;
  description?: string;
  image?: string;
  h1: string;
  intro: string;
  service_type: string;
  icon: string;
  order: number;
  short: string;
  highlights: string[];
  deliverables: { title: string; content: string }[];
  faqs: Faq[];
  related: string[];
}

export interface FeatureItem {
  logo: string;
  title: string;
  is_starred: boolean;
}

export interface OurFeaturesSection {
  badge?: string;
  title: string;
  content?: string;
  subtitle?: string;
  items: FeatureItem[];
}

export interface SeoProps {
  title?: string;
  meta_title?: string;
  description?: string;
  image?: string;
  noindex?: boolean;
  canonical?: string;
  type?: "website" | "article";
  date?: Date | string;
  updated?: Date | string;
  author?: string;
  schema?: Record<string, any> | Record<string, any>[];
  breadcrumbs?: { name: string; url: string }[];
}
