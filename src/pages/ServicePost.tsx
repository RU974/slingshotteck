import CallToAction from "@/components/CallToAction";
import Faq from "@/components/Faq";
import { GradientBlob } from "@/components/Glows";
import PageHeader from "@/components/PageHeader";
import config from "@/config/config.json";
import DynamicIcon from "@/helpers/DynamicIcon";
import Base from "@/layouts/Base";
import type { Entry } from "@/lib/content";
import { markdownify } from "@/lib/utils/textConverter";
import { getServices } from "@/pages/Services";
import type { Service } from "@/types";

export default function ServicePost({ service }: { service: Entry<Service> }) {
  const data = service.data;
  const related = getServices().filter((s) => data.related.includes(s.id));

  const siteUrl = config.site.base_url.replace(/\/$/, "");
  const pageUrl = `${siteUrl}/services/${service.id}`;
  const serviceSchema = {
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: data.title,
    serviceType: data.service_type,
    description: data.description,
    url: pageUrl,
    provider: { "@id": `${siteUrl}/#organization` },
    areaServed: [
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "Pakistan" },
      { "@type": "Place", name: "Worldwide" },
    ],
    hasOfferCatalog: data.deliverables.length
      ? {
          "@type": "OfferCatalog",
          name: `${data.title} services`,
          itemListElement: data.deliverables.map((d) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: d.title, description: d.content },
          })),
        }
      : undefined,
  };

  return (
    <Base
      {...data}
      schema={serviceSchema}
      breadcrumbs={[
        { name: "Services", url: "/services" },
        { name: data.title, url: `/services/${service.id}` },
      ]}
    >
      <PageHeader title={markdownify(data.h1)} subtitle={data.intro} />

      {/* Highlights + CTA */}
      <section className="section-sm pt-0">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {data.highlights.map((h) => (
              <span key={h} className="bg-body border border-border px-4 py-2 rounded-full text-white font-medium">
                {h}
              </span>
            ))}
          </div>
          <div className="flex gap-4 justify-center flex-wrap">
            <a className="btn btn-primary" href="/contact">
              Get a Free Consultation
            </a>
            <a className="btn btn-outline" href="#faq">
              Read the FAQ
            </a>
          </div>
        </div>
      </section>

      {/* What's included */}
      {data.deliverables.length > 0 && (
        <section className="section relative overflow-hidden">
          <div className="container">
            <div className="section-container">
              <div className="section-intro centralize" data-eyebrow="What's included">
                <h2 className="title hasHighlight">
                  What's included in <strong>{data.title}</strong>
                </h2>
              </div>
              <div className="section-content">
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {data.deliverables.map((d) => (
                    <div key={d.title} className="bento-card p-8 rounded-3xl bg-white/5 border border-border">
                      <h3 className="text-h6 font-bold text-white">{d.title}</h3>
                      <p className="mt-3 text-text-dark">{d.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <GradientBlob />
        </section>
      )}

      {/* Long-form content */}
      <section className="section">
        <div className="container">
          <div className="row justify-center">
            <div className="lg:col-10 xl:col-8">
              <article className="content" dangerouslySetInnerHTML={{ __html: service.html }} />
            </div>
          </div>
        </div>
      </section>

      {data.faqs.length > 0 && (
        <Faq
          title={`${data.title}: frequently asked questions`}
          description={`Straight answers about Slingshotteck ${data.title.toLowerCase()} for businesses in the UK, USA, Pakistan and worldwide.`}
          items={data.faqs}
        />
      )}

      {/* Related services (internal linking) */}
      {related.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-intro centralize" data-eyebrow="Related services">
              <h2 className="title">Often combined with</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-4 mt-10">
              {related.map((r) => (
                <a
                  key={r.id}
                  href={`/services/${r.id}`}
                  className="bento-card block p-8 rounded-3xl bg-white/5 border border-border hover:border-primary transition-colors"
                >
                  <DynamicIcon icon={r.data.icon} className="text-3xl text-primary" />
                  <h3 className="mt-4 text-h6 font-bold text-white">{r.data.title}</h3>
                  <p className="mt-2 text-text-dark">{r.data.short}</p>
                  <span className="mt-4 inline-block text-primary font-semibold">Learn more &rarr;</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <CallToAction />
    </Base>
  );
}
