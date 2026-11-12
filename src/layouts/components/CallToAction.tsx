import Badge from "@/components/Badge";
import { getSection } from "@/lib/content";
import type { Button } from "@/types";

interface CtaSection {
  enable: boolean;
  badge?: string;
  title: string;
  description: string;
  button?: Button;
}

export default function CallToAction() {
  const cta = getSection<CtaSection>("call-to-action");
  if (!cta.enable) return null;

  return (
    <section className="section">
      <div className="container bg-light py-20 rounded-4xl relative overflow-hidden isolate">
        <div className="section-container">
          <div className="section-intro centralize">
            <Badge title={cta.badge ?? ""} />
            <h2 className="title hasHighlight lg:col-7" dangerouslySetInnerHTML={{ __html: cta.title }} />
            <p className="subtitle text-h6-sm lg:col-6">{cta.description}</p>
            {cta.button?.enable && cta.button.link && (
              <a href={cta.button.link} className="btn btn-primary mt-9">
                {cta.button.label}
              </a>
            )}
          </div>
        </div>
        <div
          className="absolute bottom-0 right-0 size-120 xl:size-280 blur-2xl translate-x-2/5 translate-y-1/2 -z-10"
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--color-primary) 60%, white) 0%, var(--color-primary) 10%, transparent 60%)",
          }}
        />
        <div className="absolute top-1/2 -translate-y-1/2 h-1/2 w-full overflow-hidden">
          <canvas className="heroSporeCanvas w-full" />
        </div>
      </div>
    </section>
  );
}
