export const contactTopics = {
  general: "General question",
  visit: "Plan a visit",
  ministries: "Ministries and next steps",
  events: "Events",
  other: "Other",
} as const;

export type ContactTopic = keyof typeof contactTopics;

export type ContactSubmission = {
  name: string;
  email: string;
  phone: string;
  topic: ContactTopic;
  message: string;
};
