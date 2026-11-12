import CallToAction from "@/components/CallToAction";
import Faq from "@/components/Faq";
import PageHeader from "@/components/PageHeader";
import DynamicIcon from "@/helpers/DynamicIcon";
import { Island } from "@/islands";
import Base from "@/layouts/Base";
import { getListPage } from "@/lib/content";

interface ContactItem {
  type: string;
  title: string;
  detail: string;
  link?: string;
  icon?: string;
}

const cardClass =
  "flex flex-col gap-5 p-7 md:p-8 bg-white/5 rounded-2xl cursor-pointer hover:bg-white/10 transition-all duration-300 ring-1 ring-white/10 hover:ring-primary/50 group hover:scale-[1.02]";

function ContactCard({ item }: { item: ContactItem }) {
  const inner = (
    <>
      <div className="w-10 h-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
        <DynamicIcon icon={item.icon ?? ""} className="w-10 h-10 text-white" />
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="font-secondary font-bold text-2xl text-white">{item.title}</h3>
        <p className="text-text text-lg">{item.detail}</p>
      </div>
    </>
  );

  const href =
    item.link ||
    (item.type === "email" ? `mailto:${item.detail}` : item.type === "phone" ? `tel:${item.detail}` : undefined);
  const external = href?.startsWith("http");
  return (
    <a
      href={href}
      className={cardClass}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      {inner}
    </a>
  );
}

export default function Contact() {
  const contact = getListPage("contact", "-index").data;
  const items: ContactItem[] = contact.contact_info?.items ?? [];

  return (
    <Base {...contact}>
      <PageHeader title={contact.page_header.title} subtitle={contact.page_header.subtitle} />

      <section className="section pt-0">
        <div className="container">
          <div className="row g-7 max-lg:gap-5">
            {/* Left Column - Contact Cards */}
            <div className="col-12 lg:col-5">
              <div className="flex flex-col gap-5">
                {contact.contact_info?.enable && items.map((item) => <ContactCard key={item.title} item={item} />)}
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="col-12 lg:col-7">
              <div className="p-8 md:p-10 bg-white/5 rounded-2xl">
                <Island name="ContactForm" props={{}} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Faq schema={false} />
      <CallToAction />
    </Base>
  );
}
