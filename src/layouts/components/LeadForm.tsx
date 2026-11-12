import { useState, type FormEvent } from "react";
import { submitForm } from "@/lib/submitForm";

type Status = { kind: "idle" } | { kind: "success"; via: "email-service" | "mail-app" } | { kind: "error"; message: string };

/** "Free checklist" lead capture form. Sent via lib/submitForm (no backend needed). */
export default function LeadForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    setStatus({ kind: "idle" });
    setLoading(true);

    const result = await submitForm("Free checklist request", {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
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
    <form id="lead-form" noValidate onSubmit={onSubmit}>
      <div className="form-control">
        <input type="text" name="name" placeholder="Name" className="form-input w-full mb-5" required />
        <input type="email" name="email" placeholder="Email Address" className="form-input w-full mb-5" required />
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Submitting..." : "Get Free Checklist"}
        </button>
        {status.kind === "success" && (
          <div className="mt-4 text-green-500 font-medium text-sm text-center">
            {status.via === "mail-app"
              ? "✅ Your email app has opened — just press Send."
              : "✅ Free Checklist requested successfully!"}
          </div>
        )}
        {status.kind === "error" && (
          <div className="mt-4 text-red-500 font-medium text-sm text-center">⚠️ {status.message}</div>
        )}
      </div>
    </form>
  );
}
