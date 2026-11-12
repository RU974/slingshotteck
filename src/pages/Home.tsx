import BusinessNeeds from "@/components/BusinessNeeds";
import CallToAction from "@/components/CallToAction";
import ComparisonRow from "@/components/ComparisonRow";
import Faq from "@/components/Faq";
import { CornerDots, CrossCircleIcon, EllipseBackdrop, GradientBlob, HeroBeams, HeroGlow, QuoteIcon, SporeCanvas } from "@/components/Glows";
import ImageMod from "@/components/ImageMod";
import LeadGeneration from "@/components/LeadGeneration";
import OurStory from "@/components/OurStory";
import { PricingSection } from "@/components/Pricing";
import { ProcessCard, ValueCard } from "@/components/SmallCards";
import { VideoShowcase } from "@/components/Videos";
import DynamicIcon from "@/helpers/DynamicIcon";
import Base from "@/layouts/Base";
import { getListPage } from "@/lib/content";
import { markdownify } from "@/lib/utils/textConverter";
import Features from "@/partials/Features";
import Testimonial from "@/partials/Testimonial";

const html = (s: string) => ({ __html: markdownify(s) });

const TRUST = ["Free consultation", "NDA on request", "UK & US business hours", "You own the code"];

const TECH: [string, string][] = [
  ["FaAws", "AWS"],
  ["FaMicrosoft", "Microsoft Azure"],
  ["FaGoogle", "Google Cloud"],
  ["FaLaravel", "Laravel"],
  ["FaPhp", "PHP"],
  ["FaReact", "React"],
  ["FaNodeJs", "Node.js"],
  ["FaDocker", "Docker"],
  ["FaLinux", "Linux"],
];

function ProblemPill({ text }: { text: string }) {
  return (
    <div className="bg-body border border-border px-4 w-full py-2.5 rounded-full flex items-center justify-center relative z-10 gap-x-2">
      <CrossCircleIcon />
      <span className="font-semibold text-white text-lg">{text}</span>
    </div>
  );
}

export default function Home() {
  const d = getListPage("homepage", "-index").data;

  return (
    <Base
      meta_title="Software Development & Managed IT Services | Slingshotteck"
      description="Custom software, SaaS & ERP development, HRMS and CRM, plus managed IT, network security, cloud and cybersecurity for the UK, USA and Pakistan."
    >
      {/* Banner */}
      <section className="section-ph relative overflow-hidden">
        <div className="container relative">
          <SporeCanvas />
          <div className="row justify-center">
            <div className="mb-20 text-center relative">
              <span className="hero-badge mb-6">
                <span className="hero-badge-dot" aria-hidden="true" />
                Software &amp; IT partner for the UK, USA &amp; Pakistan
              </span>
              <h1 className="mb-8 lg:col-9 mx-auto text-h3 lg:text-h1 hasHighlight" dangerouslySetInnerHTML={html(d.banner.title)} />
              <p className="mb-10 lg:col-6 mx-auto">{d.banner.content}</p>
              <div className="flex gap-4 justify-center items-center flex-wrap">
                <a className="btn btn-primary" rel="noopener noreferrer" href={d.banner.button_primary.link}>
                  {d.banner.button_primary.label}
                </a>
                <a className="btn btn-outline" rel="noopener noreferrer" href={d.banner.button_secondary.link}>
                  {d.banner.button_secondary.label}
                </a>
              </div>
              <ul className="hero-trust mt-8">
                {TRUST.map((t) => (
                  <li key={t}>
                    <DynamicIcon icon="FaCircleCheck" className="text-accent" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-12">
              <div className="flex justify-center w-full perspective-near xl:perspective-dramatic">
                <VideoShowcase />
              </div>
            </div>
          </div>
        </div>
        <HeroGlow />
        <HeroBeams id="banner" />
      </section>

      {/* Technology strip */}
      <section className="pb-16 xl:pb-20" aria-labelledby="tech-heading">
        <div className="container">
          <p id="tech-heading" className="text-center text-sm uppercase tracking-[0.2em] text-text-dark mb-8">
            Technologies and platforms we work with
          </p>
          <ul className="tech-strip">
            {TECH.map(([icon, name]) => (
              <li key={name} title={name}>
                <DynamicIcon icon={icon} className="text-2xl" aria-hidden="true" />
                <span>{name}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <hr className="h-px bg-linear-to-r from-transparent from-10% via-white/50 to-90% to-transparent border-0" />

      {/* Main Features (the problem) */}
      {d.main_features.enable && (
        <section className="section pt-30 xl:pt-37">
          <div className="container">
            <div className="section-container">
              <div className="section-intro centralize" data-eyebrow="The problem">
                <h2 className="title hasHighlight" dangerouslySetInnerHTML={html(d.main_features.title)} />
                <p className="subtitle">{d.main_features.content}</p>
              </div>
              <div className="section-content">
                <div className="feature-items-group mb-9">
                  {d.main_features.items.slice(0, 3).map((text: string) => (
                    <ProblemPill key={text} text={text} />
                  ))}
                </div>
                <div className="feature-items-group">
                  {d.main_features.items.slice(3).map((text: string) => (
                    <ProblemPill key={text} text={text} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Products */}
      {d.products?.enable && (
        <section id="products" className="section relative overflow-hidden scroll-mt-24">
          <div className="container">
            <div className="section-container">
              <div className="section-intro centralize" data-eyebrow="Products">
                <h2 className="title hasHighlight" dangerouslySetInnerHTML={html(d.products.title)} />
                <p className="subtitle">{d.products.content}</p>
              </div>
              <div className="section-content">
                <div className="grid lg:grid-cols-2 gap-4 xl:gap-6">
                  {d.products.items.map((item: any) => (
                    <div
                      key={item.name}
                      className="bento-card bento-product p-8 xl:p-10 rounded-4xl corner-squircle bg-light flex flex-col"
                    >
                      <h3 className="text-h4 font-bold text-white">{item.name}</h3>
                      <p className="mt-2 bento-tagline font-medium">{item.tagline}</p>
                      <p className="mt-4 text-text-dark">{item.description}</p>
                      <ul className="stars-list mt-6 text-text-dark">
                        {item.features.map((f: string) => (
                          <li key={f}>{f}</li>
                        ))}
                      </ul>
                      <div className="mt-8 pt-2">
                        <a href={item.button.link} className="btn btn-primary">
                          {item.button.label}
                        </a>
                      </div>
                      {item.image && (
                        <div className="bento-preview">
                          <ImageMod src={item.image} alt={`${item.name} preview`} loading="lazy" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <GradientBlob />
        </section>
      )}

      {/* Services */}
      {d.services?.enable && (
        <section id="services" className="section relative overflow-hidden scroll-mt-24">
          <div className="container">
            <div className="section-container">
              <div className="section-intro centralize" data-eyebrow="Services">
                <h2 className="title hasHighlight" dangerouslySetInnerHTML={html(d.services.title)} />
                <p className="subtitle">{d.services.content}</p>
              </div>
              <div className="section-content">
                <div className="bento-grid mb-9">
                  {d.services.items.map((item: any, i: number) => (
                    <div key={item.title} className={`bento-card bento-service bento-s${i + 1} p-8 rounded-3xl bg-white/5`}>
                      <div className="bento-icon">
                        <ImageMod src={item.logo} alt="" aria-hidden="true" />
                      </div>
                      <h3 className="text-h5-sm font-bold">
                        {item.link ? (
                          <a href={item.link} className="hover:text-primary transition-colors">
                            {item.title}
                          </a>
                        ) : (
                          item.title
                        )}
                      </h3>
                      <p className="mt-3 text-text-dark">{item.description}</p>
                      <ul className="stars-list mt-5 text-text-dark">
                        {item.list.map((l: string) => (
                          <li key={l}>{l}</li>
                        ))}
                      </ul>
                      {item.link && (
                        <a
                          href={item.link}
                          className="mt-5 inline-block text-primary font-semibold"
                          aria-label={`Learn more about ${item.title}`}
                        >
                          Learn more &rarr;
                        </a>
                      )}
                    </div>
                  ))}
                </div>
                {d.services.button.enable && (
                  <div className="flex justify-center">
                    <a href={d.services.button.link} className="btn btn-primary">
                      {d.services.button.label}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Value Proposition */}
      {d.value_props.enable && (
        <section className="section relative overflow-hidden">
          <div className="container">
            <div className="section-container">
              <div className="section-intro centralize" data-eyebrow="Why Slingshotteck">
                <h2 className="title hasHighlight" dangerouslySetInnerHTML={html(d.value_props.title)} />
                <p className="subtitle">{d.value_props.content}</p>
              </div>
              <div className="section-content">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mb-9">
                  {d.value_props.items.map((item: any) => (
                    <ValueCard key={item.title} logo={item.logo} title={item.title} list={item.list} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <GradientBlob />
        </section>
      )}

      {/* Features */}
      {d.our_features.enable && <Features our_features={d.our_features} />}

      {/* Business Needs */}
      <BusinessNeeds />

      {/* Comparison */}
      <ComparisonRow />

      {/* Testimonial Quote */}
      {d.testimonial_quote.enable && (
        <section className="section overflow-hidden">
          <div className="container">
            <div className="section-container">
              <div className="section-intro centralize" data-eyebrow="Our approach">
                <h2 className="title hasHighlight" dangerouslySetInnerHTML={html(d.testimonial_quote.title)} />
              </div>
              <div className="section-content">
                <hr className="h-px bg-linear-to-r from-transparent from-5% via-white/40 to-95% to-transparent border-0" />
                <div className="relative max-w-220 mx-auto">
                  <blockquote className="text-center text-h6 text-white p-6 xl:p-10 xl:px-15 border-x border-text/20">
                    "{d.testimonial_quote.quote}"
                  </blockquote>
                  <CornerDots />
                </div>
                <hr className="h-px bg-linear-to-r from-transparent from-5% via-white/40 to-95% to-transparent border-0" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Single Testimonial */}
      {d.single_testimonial.enable && (
        <section className="section relative max-lg:overflow-hidden">
          <div className="container">
            <div className="section-container">
              <div className="section-content">
                <div className="row g-4 items-center">
                  <div className="lg:col-5">
                    <div className="flex flex-col">
                      {d.single_testimonial.stats.map((stat: any, i: number) => (
                        <div key={i} className={`blob-message relative z-${i + 1} ${i === 1 ? "lg:w-10/12" : ""}`}>
                          <span className="font-semibold text-white">{stat.value}</span> {stat.label}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="lg:col-7 max-lg:mt-10">
                    <div className="rounded-4xl corner-squircle bg-light px-7 py-10">
                      <div className="text-white">
                        <QuoteIcon />
                      </div>
                      <blockquote className="mt-10 text-h6 text-white">
                        {d.single_testimonial.testimonial.quote}
                      </blockquote>
                      <div className="mt-12.5 flex items-center">
                        <div className="text-text-dark">
                          <ImageMod
                            height={50}
                            width={50}
                            className="rounded-full size-12 avatar-ring"
                            src={d.single_testimonial.testimonial.avatar}
                            alt={d.single_testimonial.testimonial.name}
                          />
                        </div>
                        <div className="ml-2.5">
                          <h3 className="text-base font-primary font-semibold">
                            {d.single_testimonial.testimonial.name}
                          </h3>
                          <p className="text-text-dark">{d.single_testimonial.testimonial.company}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute top-0 lg:bottom-0 grid place-items-center size-full lg:translate-y-20 -z-10">
            <div className="size-180 xl:size-300 bg-radial from-primary-light/60 to-transparent from-0% to-70% rounded-full" />
            <SporeCanvas
              wrapperClass="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-180"
              innerClass="h-100 w-full overflow-hidden"
            />
          </div>
        </section>
      )}

      {/* Growth Process */}
      {d.growth_process.enable && (
        <section className="section-box max-lg:overflow-hidden pb-16 xl:pb-19 bg-transparent relative isolate overflow-hidden">
          <div className="container">
            <div className="section-container">
              <div className="section-intro centralize" data-eyebrow="How it works">
                <h2 className="title hasHighlight" dangerouslySetInnerHTML={html(d.growth_process.title)} />
              </div>
              <div className="section-content">
                <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 xl:gap-16">
                  {d.growth_process.items.map((item: any) => (
                    <ProcessCard key={item.title} logo={item.logo} title={item.title} content={item.content} />
                  ))}
                </div>
                {d.growth_process.button.enable && (
                  <div className="flex justify-center mt-10 xl:mt-18">
                    <a href={d.growth_process.button.link} className="btn btn-primary">
                      {d.growth_process.button.label}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
          <EllipseBackdrop id="paint0_linear_proc" />
          <div className="absolute inset-0 grid place-items-center size-full -z-10">
            <div className="size-225 bg-radial from-primary-light/30 to-transparent from-0% to-70% rounded-full" />
          </div>
        </section>
      )}

      {/* Our Thought / CEO Letter */}
      <OurStory />

      {/* Integrations */}
      {d.integrations.enable && (
        <section className="section relative isolate max-md:overflow-hidden">
          <div className="container-sm">
            <div className="section-container">
              <div className="section-intro centralize" data-eyebrow="Integrations">
                <h2 className="title hasHighlight" dangerouslySetInnerHTML={html(d.integrations.title)} />
              </div>
              <div className="section-content">
                <div className="flex items-center justify-center flex-wrap [&>div]:-ml-5">
                  {d.integrations.items.map((item: any) => (
                    <div
                      key={item.image}
                      className="size-35 bg-text-light/10 backdrop-blur-xl rounded-full grid place-items-center"
                    >
                      <ImageMod src={item.image} alt={item.alt} className="max-h-14 object-contain" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 grid place-items-center size-full -z-10">
            <div className="size-180 xl:size-225 bg-radial from-primary-light/40 to-transparent from-0% to-70% rounded-full" />
          </div>
        </section>
      )}

      {/* Lead Generation */}
      {d.lead_generation.enable && <LeadGeneration lead_generation={d.lead_generation} />}

      {d.pricing.enable && <PricingSection title={d.pricing.title} content={d.pricing.content} />}

      <Testimonial />

      <Faq />

      <CallToAction />
    </Base>
  );
}
