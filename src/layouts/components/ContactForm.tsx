import { useState, type FormEvent } from "react";
import { submitForm } from "@/lib/submitForm";

type Status = { kind: "idle" } | { kind: "success"; via: "email-service" | "mail-app" } | { kind: "error"; message: string };

const fieldClass =
  "w-full rounded-full bg-white/5 backdrop-blur-[44px] px-8 py-5 border border-border text-white placeholder:text-text-dark focus:border-primary focus:outline-none transition-colors";

/** Contact page form. Sent via lib/submitForm (no backend needed). */
export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    setStatus({ kind: "idle" });
    setLoading(true);

    const result = await submitForm("New contact form message", {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      message: String(formData.get("message") ?? ""),
    });
    setLoading(false);
    if (result.ok) {
      setStatus({ kind: "success", via: result.via });
      form.reset();
    } else {
      setStatus({ kind: "error", message: result.error });
    }
  }

  return (
    <form id="contact-form" noValidate className="flex flex-col gap-10" onSubmit={onSubmit}>
      <div className="flex flex-col gap-5">
        <div className="relative">
          <input type="text" name="name" placeholder="Name" required className={fieldClass} />
        </div>
        <div className="relative">
          <input type="email" name="email" placeholder="Email Address" required className={fieldClass} />
        </div>
        <div className="relative">
          <input type="tel" name="phone" placeholder="Phone number" required className={fieldClass} />
        </div>
        <div className="relative">
          <textarea
            name="message"
            placeholder="Write your message..."
            rows={4}
            required
            className="w-full rounded-[20px] bg-white/5 backdrop-blur-[44px] px-8 py-5 border border-border text-white placeholder:text-text-dark focus:border-primary focus:outline-none transition-colors resize-none"
          />
        </div>
      </div>
      <div className="flex flex-col gap-6">
        {status.kind === "success" && (
          <div className="rounded-2xl bg-green-500/10 border border-green-500/30 px-6 py-4 text-green-400 text-base">
            {status.via === "mail-app"
              ? "✅ Your email app has opened with the message — just press Send."
              : "✅ Message sent! We'll be in touch shortly."}
          </div>
        )}
        {status.kind === "error" && (
          <div className="rounded-2xl bg-red-500/10 border border-red-500/30 px-6 py-4 text-red-400 text-base">
            ⚠️ {status.message}
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full py-4 text-lg font-medium transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Sending…" : "Send Message"}
        </button>
      </div>
    </form>
  );
}
