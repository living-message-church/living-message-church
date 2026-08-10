import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import { contactTopics } from "@/lib/resend/types";

type FormStatus = { state: "idle" | "submitting" | "success" | "error"; message: string };

function freshStartedAt() {
  return Date.now().toString();
}

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>({ state: "idle", message: "" });
  const startedAt = useRef(freshStartedAt());

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus({ state: "submitting", message: "Sending your message…" });

    const payload = {
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone"),
      topic: data.get("topic"),
      message: data.get("message"),
      company: data.get("company"),
      consent: data.get("consent") === "yes",
      startedAt: startedAt.current,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(result.error || "We could not send your message.");

      form.reset();
      startedAt.current = freshStartedAt();
      setStatus({ state: "success", message: "Thank you. Your message has been sent to Living Message Church." });
    } catch (error) {
      setStatus({
        state: "error",
        message: error instanceof Error ? error.message : "We could not send your message. Please try again.",
      });
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate={false}>
      <div className="contact-form-grid">
        <label>
          <span>Name</span>
          <input name="name" type="text" autoComplete="name" minLength={2} maxLength={100} required />
        </label>
        <label>
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" maxLength={254} required />
        </label>
        <label>
          <span>Phone <small>Optional</small></span>
          <input name="phone" type="tel" autoComplete="tel" maxLength={40} />
        </label>
        <label>
          <span>How can we help?</span>
          <select name="topic" defaultValue="general" required>
            {Object.entries(contactTopics).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </label>
      </div>
      <label>
        <span>Message</span>
        <textarea name="message" minLength={10} maxLength={5000} rows={7} required />
      </label>
      <label className="contact-consent">
        <input name="consent" type="checkbox" value="yes" required />
        <span>I agree that Living Message Church may use these details to respond to my message. See our <Link href="/privacy-policy">privacy policy</Link>.</span>
      </label>
      <div className="contact-honeypot" aria-hidden="true">
        <label>Company<input name="company" type="text" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <div className="contact-form-footer">
        <button type="submit" disabled={status.state === "submitting"}>
          {status.state === "submitting" ? "Sending…" : "Send message"}
          <span aria-hidden="true">→</span>
        </button>
        <p className={`contact-form-status contact-form-status-${status.state}`} aria-live="polite">
          {status.message}
        </p>
      </div>
    </form>
  );
}
