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

export interface NavSubLink {
  label: string;
  href: string;
  description?: string;
  badge?: string;
  icon?: string;
}

export interface NavLink {
  label: string;
  href: string;
  badge?: string;
  subLinks?: NavSubLink[];
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
  badge: string;
  name: string;
  tagline: string;
  image: string;
  width?: number;
  height?: number;
  href: string;
  ctaLabel: string;
  keyPoints: string[];
}

export interface HeroData {
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
  heading: string;
  subheading: string;
  technologies: TechItem[];
}

export interface ProductScreenshot {
  title: string;
  caption: string;
  image: string;
  width?: number;
  height?: number;
}

export interface ProductFeature {
  number?: string;
  title: string;
  description: string;
  icon: string;
  badge?: string;
  highlights?: string[];
}

export interface EcosystemStage {
  label: string;
  items: string[];
  role: 'input' | 'hub' | 'output';
}

export interface IdealForBar {
  label: string;
  note: string;
  items: string[];
}

export interface FlagshipProduct {
  id: string;
  productNumber?: string;
  name: string;
  tagline: string;
  category: string;
  summary: string;
  inquiryOption?: string;
  primaryImage: string;
  screenshots: ProductScreenshot[];
  highlights: string[];
  ecosystemFlow?: EcosystemStage[];
  features: ProductFeature[];
  hardwareSupport?: string[];
  idealForBar?: IdealForBar;
  cta: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
}

export interface FlagshipProductsData {
  heading: string;
  highlightedWord: string;
  subheading: string;
  products: FlagshipProduct[];
}

export interface ServiceItem {
  id: string;
  categoryId: 'engineering' | 'marketing';
  inquiryOption?: string;
  title: string;
  tagline: string;
  summary: string;
  icon: string;
  badge?: string;
  highlights?: string[];
  deliverables: string[];
  techStack?: string[];
  cta: {
    label: string;
    href: string;
  };
}

export interface ServicesSectionData {
  heading: string;
  highlightedWord: string;
  subheading: string;
  items: ServiceItem[];
}

export interface IndustryItem {
  id: string;
  productTag?: string;
  inquiryOption?: string;
  title: string;
  summary: string;
  icon: string;
  solutions: string[];
}

export interface IndustriesSectionData {
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
  highlights?: string[];
  activities: string[];
}

export interface Differentiator {
  id?: string;
  title: string;
  tagline?: string;
  badge?: string;
  description: string;
  icon: string;
  highlights?: string[];
  details?: string[];
}

export interface ProcessSectionData {
  heading: string;
  highlightedWord: string;
  subheading: string;
  steps: ProcessStep[];
  differentiatorsHeading: string;
  differentiators: Differentiator[];
}

export interface TestimonialItem {
  id?: string;
  headline?: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  location: string;
  service: string;
  badge?: string;
  rating: number;
  highlights?: string[];
}

export interface TestimonialsSectionData {
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
  heading: string;
  highlightedWord: string;
  subheading: string;
  items: FaqItem[];
}

export interface ContactFormField {
  name: string;
  label: string;
  placeholder: string;
  required: boolean;
}

export interface ContactSectionData {
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
      options?: string[];
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

export interface SiteUiLabels {
  skipToContent: string;
  navbar: {
    primaryLabel: string;
    homeLabel: string;
    menuButtonLabel: string;
    closeMenuLabel: string;
  };
  hero: {
    previewBadge: string;
    windowStatusLabel: string;
    inspectButtonLabel: string;
    dialogTitlePrefix: string;
    closeDialogLabel: string;
    highlightsHeading: string;
    productWidth: number;
    productHeight: number;
  };
  flagship: {
    inspectButtonLabel: string;
    highlightsHeading: string;
    ecosystemHeading: string;
    modulesHeading: string;
    standalonePillarsHeading: string;
    hardwareHeading: string;
    dialogTitlePrefix: string;
    closeDialogLabel: string;
  };
  services: {
    highlightsHeading: string;
    deliverablesHeading: string;
    stackHeading: string;
    viewDetailsLabel: string;
    closeDialogLabel: string;
    closeButtonLabel: string;
  };
  process: {
    stepPrefix: string;
    activitiesHeading: string;
    viewDetailsLabel: string;
    closeDialogLabel: string;
    closeButtonLabel: string;
    ctaLabel: string;
    ctaHref: string;
    whyViewDetailsLabel: string;
    whyDetailsHeading: string;
    closeWhyDialogLabel: string;
  };
  industries: {
    ctaPrefix: string;
  };
  testimonials: {
    ratingLabelTemplate: string;
    highlightsHeading: string;
    viewDetailsLabel: string;
    closeDialogLabel: string;
    closeButtonLabel: string;
    ctaLabel: string;
    ctaHref: string;
  };
  faqs: {
    expandAllLabel: string;
    collapseAllLabel: string;
    supportPrompt: string;
    supportCtaLabel: string;
    supportWhatsappHref: string;
  };
  contact: {
    requiredLegend: string;
    submittingLabel: string;
    whatsAppFollowupLabel: string;
    resetFormLabel: string;
    multiServiceOption: string;
    whatsAppMessageTitle: string;
    channels: {
      whatsappTitle: string;
      whatsappSubtitle: string;
      phoneSubtitle: string;
      emailTitle: string;
      emailSubtitle: string;
      addressTitle: string;
      mapsLinkLabel: string;
      hoursLabel: string;
    };
    errors: {
      fullName: string;
      email: string;
      phone: string;
      serviceSelect: string;
      projectDetails: string;
      summaryHeading: string;
    };
  };
  footer: {
    legalNavLabel: string;
    contactHeading: string;
  };
  floatingActions: {
    dockLabel: string;
    backToTopLabel: string;
  };
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
  contactSection: ContactSectionData;
  footer: FooterData;
  floatingWhatsApp: FloatingWhatsAppConfig;
  ui: SiteUiLabels;
}
