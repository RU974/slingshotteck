import Accordion from "@/components/Accordion";
import { getSection } from "@/lib/content";
import { jsonLd } from "@/lib/seo";
import { plainify } from "@/lib/utils/textConverter";
import type { Button, Faq as FaqItem } from "@/types";

interface FaqSection {
  enable: boolean;
  title: string;
  description: string;
  button?: Button;
  items: FaqItem[];
}

interface Props {
  title?: string;
  description?: string;
  items?: FaqItem[];
  /** Set to false to skip the FAQPage JSON-LD (avoid duplicates across pages). */
  schema?: boolean;
}

export default function Faq(props: Props) {
  const base = getSection<FaqSection>("faq");
  if (!base.enable && !props.items) return null;

  const faqData: FaqSection = {
    ...base,
    title: props.title ?? base.title,
    description: props.description ?? base.description,
    items: props.items ?? base.items,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.items.map((item) => ({
      "@type": "Question",
      name: plainify(item.question),
      acceptedAnswer: { "@type": "Answer", text: plainify(item.answer) },
    })),
  };

  return (
    <section className="section" id="faq">
      {props.schema !== false && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }} />
      )}
      <div className="container">
        <div className="section-container grid lg:grid-cols-2">
          <div className="section-intro max-lg:text-center">
            <div className="sticky top-(--header-height)">
              <h2 className="title lg:ml-0" dangerouslySetInnerHTML={{ __html: faqData.title }} />
              <p className="subtitle lg:ml-0">{faqData.description}</p>
              {faqData.button?.enable && faqData.button.link && (
                <a href={faqData.button.link} className="btn btn-outline mt-9">
                  {faqData.button.label}
                </a>
              )}
            </div>
          </div>
          <div className="section-content">
            <div className="space-y-4">
              {faqData.items.map((item, i) => (
                <Accordion key={i} title={item.question} content={item.answer} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
