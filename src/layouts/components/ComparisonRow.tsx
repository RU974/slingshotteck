import ImageMod from "@/components/ImageMod";
import { getSection } from "@/lib/content";

interface ComparisonRowSection {
  enable: boolean;
  title: string;
  price_suffix?: string;
  items: { title: string; price: string; images?: string[] }[];
}

export default function ComparisonRow() {
  const data = getSection<ComparisonRowSection>("comparison-row");
  if (!data.enable) return null;

  return (
    <section className="section relative isolate overflow-x-hidden">
      <div className="container">
        <div className="section-container">
          <div className="section-intro centralize">
            <h2 className="title hasHighlight" dangerouslySetInnerHTML={{ __html: data.title }} />
          </div>
          <div className="section-content">
            <div className="flex flex-col gap-y-5 px-4">
              {data.items.map(({ title, price, images }) => (
                <div
                  key={title}
                  className="relative max-lg:border max-lg:border-border max-lg:rounded-4xl max-lg:py-8 max-lg:corner-squircle"
                >
                  <div className="flex items-center flex-col lg:flex-row lg:justify-between w-full gap-y-8">
                    <div className="bg-body border border-border px-4 w-full py-2.5 rounded-full flex items-center justify-center relative z-10 gap-x-2 max-w-70">
                      <span className="font-semibold text-white text-lg">{title}</span>
                    </div>

                    <div className="flex items-center justify-start gap-3 xl:gap-5 lg:min-w-90">
                      {images?.slice(0, 5).map((src) => (
                        <ImageMod key={src} src={src} alt={`${title} icon`} className="max-h-12" />
                      ))}
                    </div>

                    <div className="bg-body border border-border px-4 w-full py-2.5 rounded-full flex items-center justify-center relative z-10 gap-x-2 max-w-60">
                      <span className="font-normal text-text text-base">
                        <span className="text-secondary font-secondary font-bold text-h6">{price}</span>{" "}
                        {data.price_suffix ?? "/Per Month"}
                      </span>
                    </div>
                  </div>

                  <div className="absolute inset-0 items-center -z-10 hidden xl:flex">
                    <div className="border-t border-border border-dashed w-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 grid place-items-center size-full -z-10">
        <div className="size-225 bg-radial from-primary-light/30 to-transparent from-0% to-70% rounded-full" />
      </div>
    </section>
  );
}
