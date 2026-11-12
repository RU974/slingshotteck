import CallToAction from "@/components/CallToAction";
import Faq from "@/components/Faq";
import { GradientBlob } from "@/components/Glows";
import PageHeader from "@/components/PageHeader";
import config from "@/config/config.json";
import DynamicIcon from "@/helpers/DynamicIcon";
import Base from "@/layouts/Base";
import { getSinglePage } from "@/lib/content";
import type { Service } from "@/types";

const faqs = [
  {
    question: "What IT services does Slingshotteck provide?",
    answer:
      "Slingshotteck provides custom software development (web apps, SaaS and ERP), managed IT services, network infrastructure and firewall management, cybersecurity and penetration testing, cloud solutions on AWS, Azure and Google Cloud, and IT consulting. We also build our own HRMS and CRM products.",
  },
  {
    question: "Which countries do you work in?",
    answer:
      "We work with clients in the United Kingdom, the United States, Pakistan and other countries. Software, cloud, security and consulting work is delivered remotely; on-site network installation is available in Lahore, Pakistan and can be arranged elsewhere by agreement.",
  },
  {
    question: "Can I hire Slingshotteck for one service only?",
    answer:
      "Yes. Most clients start with a single project, such as a network security review or a custom web application, and add managed support or other services later.",
  },
  {
    question: "How do I get a quote?",
    answer:
      "Book a free consultation through our contact page. We review your requirements, then send a written proposal with scope, timeline and fixed or monthly pricing.",
  },
];

export const getServices = () => getSinglePage<Service>("services").sort((a, b) => a.data.order - b.data.order);

export default function Services() {
  const services = getServices();
  const siteUrl = config.site.base_url.replace(/\/$/, "");

  const itemList = {
    "@type": "ItemList",
    name: "Slingshotteck IT and software development services",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${siteUrl}/services/${s.id}`,
      name: s.data.title,
    })),
  };

  return (
    <Base
      title="IT Services & Software Development Services"
      meta_title="IT Services & Software Development | Slingshotteck"
      description="Software development, managed IT, network security, cybersecurity, cloud and IT consulting for businesses in the UK, USA and Pakistan."
      schema={itemList}
    >
      <PageHeader
        title="IT services and <strong>software development</strong> under one roof"
        subtitle="Slingshotteck designs, builds, secures and supports the technology your business runs on, from custom software and SaaS platforms to networks, firewalls, cloud and day-to-day IT support."
      />

      <section className="section pt-0 relative overflow-hidden">
        <div className="container">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {services.map((s) => (
              <a
                key={s.id}
                href={`/services/${s.id}`}
                className="bento-card block p-8 xl:p-10 rounded-3xl bg-white/5 border border-border hover:border-primary transition-colors"
              >
                <DynamicIcon icon={s.data.icon} className="text-4xl text-primary" />
                <h2 className="mt-5 text-h5-sm font-bold text-white">{s.data.title}</h2>
                <p className="mt-3 text-text-dark">{s.data.short}</p>
                <ul className="stars-list mt-5 text-text-dark">
                  {s.data.highlights.slice(0, 3).map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
                <span className="mt-6 inline-block text-primary font-semibold">Explore {s.data.title} &rarr;</span>
              </a>
            ))}
          </div>
        </div>
        <GradientBlob />
      </section>

      <Faq
        title="Questions about our services"
        description="How Slingshotteck works with businesses in the UK, USA, Pakistan and worldwide."
        items={faqs}
      />
      <CallToAction />
    </Base>
  );
}
