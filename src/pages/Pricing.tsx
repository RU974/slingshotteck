import Badge from "@/components/Badge";
import CallToAction from "@/components/CallToAction";
import Faq from "@/components/Faq";
import { HeroGlow, SporeCanvas } from "@/components/Glows";
import { PricingSection } from "@/components/Pricing";
import Base from "@/layouts/Base";
import { getListPage } from "@/lib/content";
import { markdownify } from "@/lib/utils/textConverter";

function Check() {
  return (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-primary/80 shadow-[0_8px_18px_rgba(47,111,224,0.35)]">
      <svg
        className="h-4 w-4 text-white"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </span>
  );
}

function Dash() {
  return (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-white/10 ring-1 ring-border/60">
      <span className="block h-0.5 w-3 rounded-full bg-white/60" />
    </span>
  );
}

export default function Pricing() {
  const pricing = getListPage("pricing", "-index").data;
  const comparison = pricing.comparison;

  return (
    <Base {...pricing}>
      <section className="section-ph pb-0 relative overflow-hidden">
        <div className="container relative">
          <SporeCanvas />
          <div className="row justify-center">
            <div className="mb-10 text-center relative z-10">
              <h1
                className="mb-6 lg:col-9 mx-auto text-h3 lg:text-h1 hasHighlight"
                dangerouslySetInnerHTML={{ __html: markdownify(pricing.page_header.title) }}
              />
              <p className="mb-10 lg:col-6 mx-auto text-text-light text-base">{pricing.page_header.content}</p>
            </div>
          </div>
        </div>
        <HeroGlow />
        <PricingSection isHome={false} />
      </section>

      {/* Comparison Table */}
      {comparison.enable && (
        <section className="section relative isolate overflow-hidden">
          <div className="container">
            <div className="section-container">
              <div className="section-intro centralize">
                <Badge title={comparison.badge} />
                <h2 className="title hasHighlight" dangerouslySetInnerHTML={{ __html: markdownify(comparison.title) }} />
              </div>
              <div className="section-content">
                <div className="overflow-x-auto">
                  <div className="relative min-w-275 overflow-hidden rounded-3xl border border-border/80 bg-light/70 text-text shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-md">
                    <div className="grid grid-cols-[1.2fr_1fr_1fr_1fr] items-center text-sm md:text-base font-primary text-text relative z-10">
                      {comparison.headers.map((h: any, i: number) => (
                        <div
                          key={i}
                          className={`px-6 py-5 text-h5-sm font-semibold text-white ${i === 0 ? "" : "text-center"}`}
                        >
                          {h.label}
                        </div>
                      ))}
                    </div>

                    <div className="relative z-10">
                      {comparison.rows.map((row: any, i: number) => (
                        <div
                          key={row.feature}
                          className={`grid grid-cols-[1.2fr_1fr_1fr_1fr] items-center border-t border-border/60 ${
                            i % 2 === 0 ? "bg-white/5" : ""
                          }`}
                        >
                          <div className="px-6 py-4 text-white">{row.feature}</div>
                          {row.values.map((val: any, vi: number) => (
                            <div key={vi} className="px-6 py-4 text-center">
                              {typeof val === "boolean" ? (
                                val ? <Check /> : <Dash />
                              ) : (
                                <span className={`font-medium ${vi === 1 ? "text-white" : "text-text-dark"}`}>{val}</span>
                              )}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <Faq schema={false} />
      <CallToAction />
    </Base>
  );
}
