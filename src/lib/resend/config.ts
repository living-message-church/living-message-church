export type ResendContactConfig = {
  apiKey: string;
  from: string;
  to: string[];
};

function configuredValue(name: "RESEND_API_KEY" | "CONTACT_FROM_EMAIL" | "CONTACT_TO_EMAIL") {
  return process.env[name]?.trim() ?? "";
}

export function getResendContactConfig(): ResendContactConfig {
  const apiKey = configuredValue("RESEND_API_KEY");
  const fromEmail = configuredValue("CONTACT_FROM_EMAIL");
  const to = configuredValue("CONTACT_TO_EMAIL")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  if (!apiKey || !fromEmail || to.length === 0) {
    throw new Error("CONTACT_EMAIL_NOT_CONFIGURED");
  }

  const from = fromEmail.includes("<")
    ? fromEmail
    : `Living Message Church Website <${fromEmail}>`;

  return { apiKey, from, to };
}

export function getResendContactStatus() {
  return {
    apiKeyConfigured: Boolean(configuredValue("RESEND_API_KEY")),
    fromConfigured: Boolean(configuredValue("CONTACT_FROM_EMAIL")),
    toConfigured: Boolean(configuredValue("CONTACT_TO_EMAIL")),
  };
}
