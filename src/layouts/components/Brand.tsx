// Logo, social links, share buttons and the floating WhatsApp button.
import ImageMod from "@/components/ImageMod";
import config from "@/config/config.json";
import DynamicIcon from "@/helpers/DynamicIcon";
import type { SocialLink } from "@/types";
import { IoLogoFacebook, IoLogoLinkedin, IoLogoPinterest, IoLogoTwitter } from "react-icons/io5";

export function Logo({ src }: { src?: string }) {
  const { logo, logo_width, logo_height, logo_text, title } = config.site;
  const w = Number(String(logo_width).replace("px", ""));
  const h = Number(String(logo_height).replace("px", ""));
  const image = src || logo;

  return (
    <a href="/" className="navbar-brand inline-block">
      {image ? (
        <ImageMod
          src={image}
          className="inline-block"
          width={w * 2}
          height={h * 2}
          alt={title}
          loading="eager"
          style={{ height: `${h}px`, width: `${w}px` }}
        />
      ) : (
        logo_text || title
      )}
    </a>
  );
}

export function Social({ source, className }: { source: SocialLink[]; className?: string }) {
  return (
    <ul className={className}>
      {source
        .filter((s) => s.link && s.link.trim() !== "")
        .map((s) => (
          <li key={s.name}>
            <a aria-label={s.name} href={s.link} target="_blank" rel="noopener noreferrer me">
              <span className="sr-only">{s.name}</span>
              <DynamicIcon className="inline-block" icon={s.icon} />
            </a>
          </li>
        ))}
    </ul>
  );
}

// Placeholder share links (kept as in the original design).
export function Share({ className }: { className?: string }) {
  const items = [
    { label: "facebook share button", Icon: IoLogoFacebook },
    { label: "twitter share button", Icon: IoLogoTwitter },
    { label: "linkedin share button", Icon: IoLogoLinkedin },
    { label: "pinterest share button", Icon: IoLogoPinterest },
  ];
  return (
    <ul className={className}>
      {items.map(({ label, Icon }) => (
        <li key={label} className="inline-block">
          <a aria-label={label} href="#!" rel="noreferrer noopener">
            <Icon />
          </a>
        </li>
      ))}
    </ul>
  );
}

export function WhatsAppButton() {
  const { enable, number, message } = config.whatsapp;
  if (!enable) return null;
  const href = `https://wa.me/${number.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8" aria-hidden="true">
        <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.05 21.8a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.89 9.88zM20.5 3.49A11.8 11.8 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L0 24l6.34-1.66a11.88 11.88 0 0 0 5.71 1.46h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.16-3.45-8.42z" />
      </svg>
    </a>
  );
}
