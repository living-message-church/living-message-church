import { getResendContactConfig } from "@/lib/resend/config";
import { contactTopics, type ContactSubmission } from "@/lib/resend/types";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function cleanSubject(value: string) {
  return value.replace(/[\r\n]+/g, " ").slice(0, 100);
}

export async function sendContactEmail(submission: ContactSubmission) {
  const config = getResendContactConfig();
  const topic = contactTopics[submission.topic];
  const phoneLine = submission.phone || "Not provided";
  const text = [
    "New message from livingmessagechurch.com",
    "",
    `Name: ${submission.name}`,
    `Email: ${submission.email}`,
    `Phone: ${phoneLine}`,
    `Topic: ${topic}`,
    "",
    submission.message,
  ].join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#1b1b19;max-width:640px">
      <h1 style="font-size:24px;margin:0 0 24px">New website contact</h1>
      <table style="border-collapse:collapse;width:100%;margin-bottom:24px">
        <tr><td style="font-weight:700;padding:6px 16px 6px 0">Name</td><td>${escapeHtml(submission.name)}</td></tr>
        <tr><td style="font-weight:700;padding:6px 16px 6px 0">Email</td><td>${escapeHtml(submission.email)}</td></tr>
        <tr><td style="font-weight:700;padding:6px 16px 6px 0">Phone</td><td>${escapeHtml(phoneLine)}</td></tr>
        <tr><td style="font-weight:700;padding:6px 16px 6px 0">Topic</td><td>${escapeHtml(topic)}</td></tr>
      </table>
      <div style="border-top:1px solid #dedbd5;padding-top:24px;white-space:pre-wrap">${escapeHtml(submission.message)}</div>
    </div>`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: config.from,
        to: config.to,
        reply_to: submission.email,
        subject: `[Website] ${cleanSubject(topic)} from ${cleanSubject(submission.name)}`,
        text,
        html,
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`RESEND_DELIVERY_FAILED_${response.status}`);
    }
  } finally {
    clearTimeout(timeout);
  }
}
