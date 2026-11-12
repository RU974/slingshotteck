// Sends a form without a backend.
//
// • If `params.web3forms_access_key` is set in src/config/config.json, the form is
//   posted to Web3Forms (https://web3forms.com — free) and emailed to you.
// • If it is empty, the visitor's email app opens with the message pre-filled,
//   addressed to `params.footer_email`.
import config from "@/config/config.json";

export type SubmitResult =
  | { ok: true; via: "email-service" | "mail-app" }
  | { ok: false; error: string };

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export async function submitForm(
  subject: string,
  fields: Record<string, string>,
  required: string[] = ["name", "email"],
): Promise<SubmitResult> {
  const data = Object.fromEntries(Object.entries(fields).map(([k, v]) => [k, String(v ?? "").trim()]));

  if (required.some((key) => !data[key])) return { ok: false, error: "Please fill in all required fields." };
  if (data.email && !isEmail(data.email)) return { ok: false, error: "Please enter a valid email address." };

  const params = config.params as Record<string, string>;
  const accessKey = params.web3forms_access_key?.trim();

  if (!accessKey) {
    const body = Object.entries(data)
      .filter(([, v]) => v)
      .map(([k, v]) => `${k[0].toUpperCase()}${k.slice(1)}: ${v}`)
      .join("\n");
    window.location.href = `mailto:${params.footer_email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    return { ok: true, via: "mail-app" };
  }

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `${subject} — ${config.site.title}`,
        from_name: config.site.title,
        replyto: data.email,
        ...data,
      }),
    });
    const json = await res.json().catch(() => ({}));
    if (res.ok && json.success) return { ok: true, via: "email-service" };
    return { ok: false, error: json.message || "Something went wrong. Please try again." };
  } catch {
    return { ok: false, error: "Network error — please check your connection and try again." };
  }
}
