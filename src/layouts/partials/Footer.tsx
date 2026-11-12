import { Social } from "@/components/Brand";
import ImageMod from "@/components/ImageMod";
import config from "@/config/config.json";
import menu from "@/config/menu.json";
import social from "@/config/social.json";
import { markdownify } from "@/lib/utils/textConverter";
import type { Menu, NavLink, SocialLink } from "@/types";

function LinkColumn({ title, links }: { title: string; links: NavLink[] }) {
  return (
    <div>
      <h3 className="footer-label">{title}</h3>
      <ul>
        {links?.map((item) => (
          <li key={item.url} className="mb-5">
            <a href={item.url} className="footer-link">
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const { footer_primary, footer_resource, footer_legal, footer_col_1_title, footer_col_2_title, footer_col_3_title } =
    menu as Menu;
  const socialLinks = social.main as SocialLink[];

  return (
    <footer className="section pb-0 relative overflow-hidden">
      <div className="container pb-10">
        <div className="flex lg:justify-between flex-wrap gap-x-10 gap-y-10">
          {/* Column 1 - Logo & Contact */}
          <div className="max-w-95 mb-20 text-lg text-text">
            <a href="/" className="inline-block">
              <ImageMod
                src="/images/slingshot-logo-light.png"
                width={170}
                height={130}
                className="h-16 w-auto"
                alt="Slingshotteck logo"
              />
            </a>
            <p className="mt-6">{config.params.footer_tagline}</p>
            <a className="link mt-6 inline-block underline" href={`mailto:${config.params.footer_email}`}>
              {config.params.footer_email}
            </a>
            <a className="link mt-4 block" href={`tel:${config.params.footer_phone.replace(/\s/g, "")}`}>
              {config.params.footer_phone}
            </a>
            <address className="not-italic mt-4 text-base">
              Lahore, Pakistan &middot; Serving the UK, USA &amp; worldwide
            </address>
          </div>
          <LinkColumn title={footer_col_1_title} links={footer_primary} />
          <LinkColumn title={footer_col_2_title} links={footer_resource} />
          <LinkColumn title={footer_col_3_title} links={footer_legal} />
        </div>
      </div>
      {/* Bottom Area */}
      <hr className="h-px bg-linear-to-r from-transparent from-25% via-white/50 to-75% to-transparent border-0" />
      <div className="container py-7">
        <div className="flex justify-between lg:items-center flex-col lg:flex-row gap-y-6 w-full">
          <p className="text-base text-text" dangerouslySetInnerHTML={{ __html: markdownify(config.params.copyright) }} />
          <Social className="social-icons lg:ml-auto" source={socialLinks} />
        </div>
      </div>

      <div
        className="absolute bottom-0 left-1/2 size-280 blur-2xl -translate-x-1/2 translate-y-1/2 -z-10"
        style={{
          background: "radial-gradient(circle, color-mix(in srgb, var(--color-primary) 30%, transparent) 0%, transparent 80%)",
        }}
      />
    </footer>
  );
}
