import CallToAction from "@/components/CallToAction";
import Faq from "@/components/Faq";
import { HeroGlow, SporeCanvas } from "@/components/Glows";
import { IntegrationCard } from "@/components/SmallCards";
import Base from "@/layouts/Base";
import { getListPage } from "@/lib/content";
import { markdownify } from "@/lib/utils/textConverter";

export default function Integrations() {
  const data = getListPage("integrations", "-index").data;

  return (
    <Base {...data}>
      <section className="section-ph pb-10 relative">
        <div className="container relative">
          <SporeCanvas canvasClass="heroSporeCanvas w-full opacity-70" />
          <div className="lg:max-w-4xl mx-auto text-center relative z-10">
            <h1 className="hasHighlight mb-0" dangerouslySetInnerHTML={{ __html: markdownify(data.page_header.title) }} />
          </div>
        </div>
        <HeroGlow />
      </section>

      {data.integrations.enable && (
        <section className="section pt-0">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {data.integrations.items.map((item: any) => (
                <IntegrationCard key={item.title} icon={item.icon} title={item.title} iconClass={item.class} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Faq schema={false} />
      <CallToAction />
    </Base>
  );
}
