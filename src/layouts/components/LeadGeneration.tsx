import ImageMod from "@/components/ImageMod";
import { Island } from "@/islands";
import { markdownify } from "@/lib/utils/textConverter";

interface Props {
  lead_generation: {
    title: string;
    subtitle: string;
    content: string;
    list: string[];
    image: string;
  };
}

export default function LeadGeneration({ lead_generation }: Props) {
  return (
    <section className="section-box bg-transparent my-0 pb-0">
      <div className="container-sm">
        <div className="section-container pb-20">
          <div className="section-intro centralize">
            <h2 className="title hasHighlight" dangerouslySetInnerHTML={{ __html: lead_generation.title }} />
          </div>
          <div className="section-content">
            <div className="flex flex-col-reverse lg:flex-row gap-x-20 gap-y-10">
              <div className="lg:w-6/12">
                <h3 className="text-h5-sm font-bold mb-7">{lead_generation.subtitle}</h3>
                <div
                  className="space-y-4"
                  dangerouslySetInnerHTML={{ __html: markdownify(lead_generation.content, true) }}
                />
                <ul className="green-tick-list [&>li]:mb-8 mt-10">
                  {lead_generation.list.map((item, i) => (
                    <li key={i} dangerouslySetInnerHTML={{ __html: markdownify(item) }} />
                  ))}
                </ul>
              </div>
              <div className="lg:w-6/12">
                <div className="bg-light rounded-4xl corner-squircle p-10 xl:px-7.5 xl:py-10">
                  <ImageMod
                    src={lead_generation.image}
                    width={307}
                    height={190}
                    alt="ebook"
                    className="w-full max-w-76.75 mx-auto mb-12"
                  />
                  <Island name="LeadForm" props={{}} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="h-px bg-linear-to-r from-transparent from-10% via-white/50 to-90% to-transparent border-0" />
    </section>
  );
}
