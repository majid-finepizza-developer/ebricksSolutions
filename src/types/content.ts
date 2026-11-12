/**
 * TypeScript definitions for EBRICKS SOLUTIONS (PRIVATE) LIMITED
 * 100% JSON-Driven Content Architecture
 */

export interface MetaData {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  language: string;
}

export interface BrandData {
  name: string;
  legalName: string;
  tagline: string;
  logo: string;
  icon: string;
  yearEstablished: number;
}

export interface ContactChannel {
  label: string;
  value: string;
  href: string;
  display: string;
  icon: string;
}

export interface CompanyContact {
  phone: ContactChannel;
  whatsapp: ContactChannel;
  email: ContactChannel;
  address: {
    line1: string;
    city: string;
    country: string;
    formatted: string;
    googleMapsUrl: string;
    icon: string;
  };
  officeHours: {
    days: string;
    hours: string;
    icon: string;
  };
}

export interface TopBarData {
  enabled: boolean;
  announcement?: {
    text: string;
    badge: string;
  };
}

export interface NavLink {
  label: string;
  href: string;
  badge?: string;
}

export interface NavbarData {
  links: NavLink[];
  ctaButton: {
    label: string;
    href: string;
    icon?: string;
  };
  whatsappButton: {
    label: string;
    href: string;
    icon: string;
  };
}

export interface HeroTrustBadge {
  label: string;
  icon: string;
}

export interface HeroStat {
  value: string;
  label: string;
  description: string;
}

export interface HeroProductPreview {
  id: string;
  tabLabel: string;
  name: string;
  badge: string;
  tagline: string;
  image: string;
  keyPoints: string[];
}

export interface HeroData {
  badge: {
    text: string;
    icon: string;
  };
  headline: {
    prefix: string;
    highlight: string;
    suffix: string;
  };
  subheadline: string;
  primaryCta: {
    label: string;
    href: string;
    icon: string;
  };
  secondaryCta: {
    label: string;
    href: string;
    icon: string;
  };
  trustBadges: HeroTrustBadge[];
  stats: HeroStat[];
  previewProducts: HeroProductPreview[];
}

export interface TechItem {
  name: string;
  category: string;
  icon: string;
}

export interface TechStackData {
  badge: string;
  heading: string;
  subheading: string;
  technologies: TechItem[];
}

export interface ProductScreenshot {
  title: string;
  caption: string;
  image: string;
  badge: string;
}

export interface ProductFeature {
  title: string;
  description: string;
  icon: string;
}

export interface ReportQuestion {
  question: string;
  description: string;
  icon: string;
}

export interface FlagshipProduct {
  id: string;
  name: string;
  tagline: string;
  category: string;
  badge: string;
  summary: string;
  primaryImage: string;
  screenshots: ProductScreenshot[];
  highlights: string[];
  features: ProductFeature[];
  reportQuestions?: ReportQuestion[];
  hardwareSupport?: string[];
  cta: {
    label: string;
    href: string;
  };
}

export interface FlagshipProductsData {
  badge: string;
  heading: string;
  highlightedWord: string;
  subheading: string;
  products: FlagshipProduct[];
}

export interface ServiceCategory {
  id: string;
  label: string;
  description: string;
}

export interface ServiceItem {
  id: string;
  categoryId: 'engineering' | 'marketing';
  title: string;
  tagline: string;
  summary: string;
  icon: string;
  badge?: string;
  deliverables: string[];
  techStack?: string[];
  cta: {
    label: string;
    href: string;
  };
}

export interface ServicesSectionData {
  badge: string;
  heading: string;
  highlightedWord: string;
  subheading: string;
  categories: ServiceCategory[];
  items: ServiceItem[];
}

export interface IndustryItem {
  id: string;
  title: string;
  summary: string;
  icon: string;
  solutions: string[];
}

export interface IndustriesSectionData {
  badge: string;
  heading: string;
  highlightedWord: string;
  subheading: string;
  items: IndustryItem[];
}

export interface ProcessStep {
  number: string;
  title: string;
  timeline: string;
  summary: string;
  icon: string;
  activities: string[];
}

export interface Differentiator {
  title: string;
  description: string;
  icon: string;
}

export interface ProcessSectionData {
  badge: string;
  heading: string;
  highlightedWord: string;
  subheading: string;
  steps: ProcessStep[];
  differentiatorsBadge: string;
  differentiatorsHeading: string;
  differentiators: Differentiator[];
}

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  company: string;
  location: string;
  service: string;
  rating: number;
}

export interface TestimonialsSectionData {
  badge: string;
  heading: string;
  highlightedWord: string;
  subheading: string;
  items: TestimonialItem[];
}

export interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}

export interface FaqSectionData {
  badge: string;
  heading: string;
  highlightedWord: string;
  subheading: string;
  items: FaqItem[];
}

export interface CtaBannerData {
  badge: string;
  heading: string;
  highlightedWord: string;
  subheading: string;
  primaryCta: {
    label: string;
    href: string;
    icon: string;
  };
  secondaryCta: {
    label: string;
    href: string;
    icon: string;
  };
  guarantees: string[];
}

export interface ContactFormField {
  name: string;
  label: string;
  placeholder: string;
  required: boolean;
}

export interface ContactSectionData {
  badge: string;
  heading: string;
  highlightedWord: string;
  subheading: string;
  formTitle: string;
  formSubtitle: string;
  fields: {
    fullName: ContactFormField;
    email: ContactFormField;
    phone: ContactFormField;
    serviceSelect: {
      label: string;
      placeholder: string;
      required: boolean;
    };
    budgetRange?: {
      label: string;
      placeholder: string;
      options: string[];
    };
    projectDetails: ContactFormField;
  };
  submitButtonText: string;
  successMessage: {
    title: string;
    message: string;
  };
  directContactTitle: string;
  directContactSubtitle: string;
}

export interface FooterLinkGroup {
  title: string;
  links: {
    label: string;
    href: string;
  }[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface FooterData {
  description: string;
  linkGroups: FooterLinkGroup[];
  socials: SocialLink[];
  copyright: string;
  disclaimer: string;
}

export interface FloatingWhatsAppConfig {
  enabled: boolean;
  tooltipText: string;
  initialMessage: string;
}

export interface SiteContent {
  meta: MetaData;
  brand: BrandData;
  contact: CompanyContact;
  topBar: TopBarData;
  navbar: NavbarData;
  hero: HeroData;
  flagshipProducts: FlagshipProductsData;
  techStack: TechStackData;
  services: ServicesSectionData;
  industries: IndustriesSectionData;
  process: ProcessSectionData;
  testimonials: TestimonialsSectionData;
  faqs: FaqSectionData;
  ctaBanner: CtaBannerData;
  contactSection: ContactSectionData;
  footer: FooterData;
  floatingWhatsApp: FloatingWhatsAppConfig;
}
