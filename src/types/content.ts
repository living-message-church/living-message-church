export type VerificationStatus =
  | "verified"
  | "needs-verification"
  | "deprecated"
  | "approved-temporary";

export interface SourcedValue<T> {
  value: T;
  status: VerificationStatus;
  source: string;
  note?: string;
}

export interface SeoContent {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
}

export interface SiteIdentity {
  name: SourcedValue<string>;
  shortName: string;
  tagline: SourcedValue<string>;
  teachingSummary: SourcedValue<string>;
  canonicalUrl: string;
}

export interface Address {
  street: string;
  locality: string;
  region: string;
  postalCode: string;
  country: string;
  display: string;
}

export interface ContactInformation {
  address: SourcedValue<Address>;
  phone: SourcedValue<string>;
  email: SourcedValue<string>;
  directionsUrl: SourcedValue<string>;
}

export interface ServiceTime {
  id: string;
  label: string;
  day: "Sunday";
  time: string;
  format: "in-person" | "online";
  status: VerificationStatus;
  source: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  availability: "implemented" | "staged" | "external";
}

export interface FooterGroup {
  title: string;
  links: NavigationItem[];
}

export interface LeadershipPerson {
  id: string;
  name: SourcedValue<string>;
  title: SourcedValue<string>;
  group: "pastoral" | "elder" | "deacon" | "ministry";
  biography?: SourcedValue<string>;
  image?: ContentImage;
}

export interface Ministry {
  id: string;
  name: SourcedValue<string>;
  summary: SourcedValue<string>;
  audience?: SourcedValue<string>;
  href: string;
  availability: "staged" | "published";
}

export interface Message {
  id: string;
  slug?: string;
  title: SourcedValue<string>;
  speaker?: SourcedValue<string>;
  date?: SourcedValue<string>;
  scripture?: SourcedValue<string>;
  summary: SourcedValue<string>;
  mediaUrl?: SourcedValue<string>;
  youtubeVideoId?: SourcedValue<string>;
  thumbnailUrl?: SourcedValue<string>;
  categories?: SourcedValue<string[]>;
  meta?: {
    title: string;
    description: string;
    keywords: string[];
  };
  featured?: boolean;
  availability: "pending-verification" | "published";
}

export interface ChurchEvent {
  id: string;
  title: SourcedValue<string>;
  summary: SourcedValue<string>;
  start?: SourcedValue<string>;
  location?: SourcedValue<string>;
  registrationUrl?: SourcedValue<string>;
  image?: ContentImage;
  availability: "pending-verification" | "published";
}

export interface OutreachPartner {
  id: string;
  name: SourcedValue<string>;
  relationship: SourcedValue<string>;
  summary: SourcedValue<string>;
  website?: SourcedValue<string>;
}

export interface SocialChannel {
  platform: "Facebook" | "Instagram" | "YouTube" | "X";
  label: string;
  url: SourcedValue<string>;
}

export interface ExternalServiceLink {
  id: string;
  label: string;
  provider: string;
  url: SourcedValue<string>;
  purpose: "giving" | "registration" | "visit" | "media" | "directions";
}

export interface ContentImage {
  src: string;
  alt: string;
  status: VerificationStatus;
  credit?: string;
}

export interface CallToAction {
  label: string;
  href: string;
  style: "primary" | "secondary" | "text";
  external?: boolean;
}

export interface HomepageSection {
  id: string;
  eyebrow?: string;
  title: string;
  body: string;
  tone: "paper" | "ink" | "sun" | "sage";
  actions?: CallToAction[];
}

export interface PageContent {
  seo: SeoContent;
  eyebrow?: string;
  title: string;
  intro: string;
}

export interface EditorialPanel {
  number: string;
  title: string;
  body: string;
  href?: string;
  linkLabel?: string;
}

export interface PriorityRouteContent extends PageContent {
  statusLabel: string;
  statusBody: string;
  panels: EditorialPanel[];
  nextAction?: CallToAction;
}

export interface ContentFeedResult<T> {
  status: "available" | "unavailable";
  provider: "youtube" | "church-center" | "local" | "unconfigured";
  items: T[];
  message: string;
  checkedAt: string;
}
