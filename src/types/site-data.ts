export interface LinkItem {
  label: string;
  href: string;
}

export interface ImageItem {
  src: string;
  alt: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface HighlightItem {
  icon: string;
  title: string;
  text: string;
}

export interface ServiceItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface ClientItem {
  name: string;
  logo: string;
}

export interface TestimonialItem {
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  quote: string;
}

export interface FooterColumn {
  title: string;
  links: LinkItem[];
}

export interface SocialItem {
  platform: string;
  url: string;
  icon: string;
}

export interface SiteMeta {
  title: string;
  description: string;
  language: string;
}

export interface BrandData {
  name: string;
  tagline: string;
  logo: string;
}

export interface NavbarData {
  links: LinkItem[];
  cta: LinkItem;
}

export interface HeroData {
  eyebrow: string;
  heading: string;
  highlightedWord: string;
  subheading: string;
  primaryCta: LinkItem;
  secondaryCta: LinkItem;
  image: ImageItem;
  stats: StatItem[];
}

export interface AboutData {
  title: string;
  subtitle: string;
  description: string[];
  image: ImageItem;
  highlights: HighlightItem[];
  missionTitle?: string;
  mission: string;
  visionTitle?: string;
  vision: string;
  valuesTitle?: string;
  values: string[];
}

export interface ServicesData {
  title: string;
  subtitle: string;
  items: ServiceItem[];
}

export interface ClientsData {
  title: string;
  logos: ClientItem[];
}

export interface TestimonialsData {
  title: string;
  subtitle: string;
  items: TestimonialItem[];
}

export interface ContactData {
  heading: string;
  text: string;
  button: LinkItem;
  email: string;
  phone: string;
  address: string;
}

export interface FooterData {
  description: string;
  columns: FooterColumn[];
  socials: SocialItem[];
  copyright: string;
}

export interface SiteData {
  meta: SiteMeta;
  brand: BrandData;
  navbar: NavbarData;
  hero: HeroData;
  about: AboutData;
  services: ServicesData;
  clients: ClientsData;
  testimonials: TestimonialsData;
  contact: ContactData;
  footer: FooterData;
}
