// Sections shared by the HRMS and CRM product pages.
import Badge from "@/components/Badge";
import { GradientBlob, HeroGlow, SporeCanvas } from "@/components/Glows";
import ImageMod from "@/components/ImageMod";
import { ShowcaseCard } from "@/components/SmallCards";
import DynamicIcon from "@/helpers/DynamicIcon";
import { markdownify } from "@/lib/utils/textConverter";

const html = (s: string) => ({ __html: markdownify(s) });

export function ProductBanner({
  banner,
  productName,
  imageAlt,
}: {
  banner: any;
  productName: string;
  imageAlt: string;
}) {
  return (
    <>
      <section className="section-ph relative overflow-hidden pb-20">
        <div className="container relative">
          <SporeCanvas />
          <div className="row justify-center">
            <div className="mb-20 text-center relative">
              <div className="product-lockup mb-8">
                <ImageMod
                  src="/images/slingshot-logo-light.png"
                  alt="Slingshotteck logo"
                  width={184}
                  height={142}
                  className="h-14 w-auto"
                  loading="eager"
                />
                <span className="product-lockup-divider" aria-hidden="true" />
                <span className="product-lockup-name">{productName}</span>
              </div>
              <h1 className="mb-8 lg:col-9 mx-auto text-h3 lg:text-h1 hasHighlight" dangerouslySetInnerHTML={html(banner.title)} />
              <p className="mb-10 lg:col-6 mx-auto text-lg">{banner.content}</p>
              <div className="flex gap-4 justify-center items-center flex-wrap">
                <a className="btn btn-primary" href={banner.button_primary.link}>
                  {banner.button_primary.label}
                </a>
                {banner.button_secondary && (
                  <a className="btn btn-outline" href={banner.button_secondary.link}>
                    {banner.button_secondary.label}
                  </a>
                )}
              </div>
            </div>
            <div className="col-12">
              <ImageMod src={banner.image} alt={imageAlt} className="w-full" loading="eager" />
            </div>
          </div>
        </div>
        <HeroGlow />
      </section>
      <hr className="h-px bg-linear-to-r from-transparent from-10% via-white/50 to-90% to-transparent border-0" />
    </>
  );
}

export function SmartPlatform({ data }: { data: any }) {
  if (!data?.enable) return null;
  return (
    <section className="section mx-5 relative isolate overflow-hidden">
      <div className="container">
        <div className="section-container">
          <div className="section-intro centralize">
            <h2 className="title hasHighlight" dangerouslySetInnerHTML={html(data.title)} />
          </div>
          <div className="section-content">
            <div className="grid md:grid-cols-2 xl:grid-cols-3 grid-flow-dense gap-7">
              {data.cards.map((card: any) => (
                <ShowcaseCard
                  key={card.title}
                  title={card.title}
                  subtitle={card.subtitle}
                  image={card.image}
                  classNames={card.classNames}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <GradientBlob />
    </section>
  );
}

export function ProductTour({ data }: { data: any }) {
  if (!data?.enable) return null;
  return (
    <section className="section-sm relative isolate overflow-hidden">
      <div className="container">
        <div className="section-intro centralize mb-16">
          <Badge title={data.badge} />
          <h2 className="title hasHighlight" dangerouslySetInnerHTML={html(data.title)} />
          {data.content && <p className="mt-4 text-text lg:col-6 mx-auto">{data.content}</p>}
        </div>

        <div className="flex flex-col gap-16 lg:gap-24">
          {data.items.map((item: any) => (
            <div key={item.title} className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div className={item.reverse ? "lg:order-1" : ""}>
                <h3 className="text-h4-sm lg:text-h3 font-bold text-white mb-4">{item.title}</h3>
                <p className="text-text mb-6 leading-relaxed">{item.content}</p>
                {item.list && (
                  <ul className="flex flex-col gap-3">
                    {item.list.map((point: string) => (
                      <li key={point} className="flex items-start gap-3">
                        <span className="mt-1 size-5 shrink-0 rounded-full bg-primary/15 grid place-items-center">
                          <DynamicIcon icon="FaCheck" className="text-primary text-[10px]" />
                        </span>
                        <span className="text-text-light">{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className={item.reverse ? "lg:order-0" : ""}>
                <div className="rounded-2xl border border-border/50 bg-light/6 p-2 shadow-2xl">
                  <ImageMod src={item.image} alt={item.title} className="w-full rounded-xl object-cover" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <GradientBlob />
    </section>
  );
}

export function ServiceFeatures({ data }: { data: any }) {
  if (!data?.enable) return null;
  return (
    <>
      {data.items.map((feature: any) => (
        <section key={feature.title} className="section-sm relative isolate">
          <div className="container">
            <div className="rounded-3xl bg-light/6 overflow-hidden">
              <div className="grid lg:grid-cols-2">
                <div className={`p-8 lg:p-12 xl:p-14 ${feature.reverse ? "" : "lg:order-1"}`}>
                  <h2
                    className="text-h3-sm lg:text-h2 font-bold hasHighlight mb-9 lg:mb-12"
                    dangerouslySetInnerHTML={html(feature.title)}
                  />
                  <div className="grid sm:grid-cols-2 gap-8 lg:gap-10">
                    {feature.items.map((item: any) => (
                      <article key={item.title}>
                        <div className="size-10 rounded-xl bg-white/6 border border-border grid place-items-center mb-4">
                          <DynamicIcon icon={item.icon} className="text-text-light text-lg" />
                        </div>
                        <h3 className="text-h5-sm font-bold text-white mb-2">{item.title}</h3>
                        <p className="text-text">{item.content}</p>
                      </article>
                    ))}
                  </div>
                </div>
                <div className={`p-8 lg:p-12 xl:p-14 bg-white/2 h-max ${feature.reverse ? "" : "lg:order-0"}`}>
                  <ImageMod src={feature.image} alt={feature.title} className="w-full object-contain" />
                </div>
              </div>
            </div>
          </div>
          <GradientBlob />
        </section>
      ))}
    </>
  );
}
