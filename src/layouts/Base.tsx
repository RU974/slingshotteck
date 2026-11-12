import type { ReactNode } from "react";
import { WhatsAppButton } from "@/components/Brand";
import config from "@/config/config.json";
import { usePage } from "@/lib/page";
import Footer from "@/partials/Footer";
import Header from "@/partials/Header";
import type { SeoProps } from "@/types";

type Props = SeoProps & { children: ReactNode; [key: string]: any };

/**
 * Page shell: header, main, footer. The SEO props are handed to the server
 * renderer (via PageContext), which turns them into <head> tags — see lib/seo.ts.
 */
export default function Base({ children, ...props }: Props) {
  const page = usePage();
  const {
    title,
    meta_title,
    description,
    image,
    noindex,
    canonical,
    type,
    date,
    updated,
    author,
    schema,
    breadcrumbs,
  } = props;
  page.seo = { title, meta_title, description, image, noindex, canonical, type, date, updated, author, schema, breadcrumbs };

  const gtm = config.google_tag_manager;

  return (
    <>
      {gtm.enable && (
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${gtm.gtm_id}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
      )}
      <Header />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded"
      >
        Skip to content
      </a>
      <main id="main-content" className="overflow-x-hidden md:overflow-x-auto">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
