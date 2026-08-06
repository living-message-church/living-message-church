import type {
  ContactInformation,
  ExternalServiceLink,
  ServiceTime,
  SiteIdentity,
  SocialChannel,
} from "@/types/content";

const productionSource = "https://www.livingmessagechurch.com/";

export const siteIdentity: SiteIdentity = {
  name: {
    value: "Living Message Church",
    status: "verified",
    source: productionSource,
  },
  shortName: "Living Message",
  tagline: {
    value: "A true church community",
    status: "needs-verification",
    source: productionSource,
    note: "Current homepage language; pastoral approval remains outstanding.",
  },
  teachingSummary: {
    value: "Expository, line-by-line Bible teaching in context.",
    status: "needs-verification",
    source: `${productionSource}plan-your-visit/`,
    note: "Repeated current teaching emphasis; final pastoral wording is pending.",
  },
  canonicalUrl: "https://livingmessagechurch.com",
};

// These values are repeated on the current site but remain explicitly unverified
// until church operations signs off in docs/CONTENT_VERIFICATION.md.
export const serviceTimes: ServiceTime[] = [
  {
    id: "sunday-first",
    label: "Sunday gathering",
    day: "Sunday",
    time: "9:00 AM",
    format: "in-person",
    status: "needs-verification",
    source: productionSource,
  },
  {
    id: "sunday-second",
    label: "Sunday gathering",
    day: "Sunday",
    time: "10:45 AM",
    format: "in-person",
    status: "needs-verification",
    source: productionSource,
  },
  {
    id: "sunday-online",
    label: "Online service",
    day: "Sunday",
    time: "10:45 AM",
    format: "online",
    status: "needs-verification",
    source: `${productionSource}online-church/`,
  },
];

export const contactInformation: ContactInformation = {
  address: {
    value: {
      street: "20180 US Highway 27, Suite 308",
      locality: "Clermont",
      region: "FL",
      postalCode: "34715",
      country: "US",
      display: "20180 US Highway 27, Suite 308, Clermont, FL 34715",
    },
    status: "needs-verification",
    source: `${productionSource}contact-living-message-church-clermont/`,
    note: "Current-site value; postal format, map pin, and accessible entrance need operations approval.",
  },
  phone: {
    value: "352-432-6048",
    status: "needs-verification",
    source: `${productionSource}contact-living-message-church-clermont/`,
    note: "Conflicts with the historical 352-617-8484 number.",
  },
  email: {
    value: "info@livingmessagechurch.com",
    status: "needs-verification",
    source: productionSource,
    note: "Deliverability and use as the legal/privacy contact need confirmation.",
  },
  directionsUrl: {
    value:
      "https://www.google.com/maps/search/?api=1&query=20180+US+Highway+27+Suite+308+Clermont+FL+34715",
    status: "needs-verification",
    source: `${productionSource}contact-living-message-church-clermont/`,
    note: "Generated from the current text address; the precise arrival pin requires verification.",
  },
};

export const socialChannels: SocialChannel[] = [
  {
    platform: "Facebook",
    label: "Living Message on Facebook",
    url: {
      value: "https://www.facebook.com/LivingMessageFl",
      status: "needs-verification",
      source: productionSource,
    },
  },
  {
    platform: "Instagram",
    label: "Living Message on Instagram",
    url: {
      value: "https://www.instagram.com/livingmessagefl/",
      status: "needs-verification",
      source: productionSource,
    },
  },
  {
    platform: "YouTube",
    label: "Living Message Church on YouTube",
    url: {
      value: "https://www.youtube.com/@livingmessagechurch/streams",
      status: "verified",
      source: "User-approved source of truth on 2026-08-06; canonical channel ID UC-YctizZq1wTbhgn3tQOJqA.",
    },
  },
];

export const externalServiceLinks: ExternalServiceLink[] = [
  {
    id: "youtube-messages",
    label: "Watch Living Message Church on YouTube",
    provider: "YouTube",
    purpose: "media",
    url: {
      value: "https://www.youtube.com/@livingmessagechurch/streams",
      status: "verified",
      source: "User-approved source of truth on 2026-08-06; canonical channel ID UC-YctizZq1wTbhgn3tQOJqA.",
    },
  },
  {
    id: "giving",
    label: "Give through Church Center",
    provider: "Planning Center / Church Center",
    purpose: "giving",
    url: {
      value: "https://living-message-church-428144.churchcenter.com/giving",
      status: "needs-verification",
      source: productionSource,
      note: "Giving destination is observed, but namespace/account ownership must be confirmed.",
    },
  },
  {
    id: "plan-visit",
    label: "Plan your visit",
    provider: "Planning Center / Church Center",
    purpose: "visit",
    url: {
      value: "https://livingmessagechurch.churchcenter.com/people/forms/1250627",
      status: "needs-verification",
      source: `${productionSource}plan-your-visit/`,
      note: "Form fields, recipient, automation, retention, and account owner are pending verification.",
    },
  },
];
