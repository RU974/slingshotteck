// Numbered "business needs" steps. Scroll-reveal is wired up in entry-client.tsx;
// styles live in src/styles/business-needs.css.
import type { CSSProperties } from "react";
import { getSection } from "@/lib/content";

interface BusinessNeedsSection {
  enable: boolean;
  badge?: string;
  title: string;
  items: { image: string; number: string; title: string; content: string }[];
}

// Stroke icons (24x24 grid), keyed by step number
const icons: Record<string, string> = {
  "01": `<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/><path d="M8.5 11h5M11 8.5v5" opacity=".6"/>`,
  "02": `<path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.6 7.6"/><circle cx="11" cy="11" r="2"/>`,
  "03": `<path d="m16 18 6-6-6-6"/><path d="m8 6-6 6 6 6"/><path d="m14 4-4 16" opacity=".7"/>`,
  "04": `<path d="M4.5 16.5c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2.1-.1-2.9a2.2 2.2 0 0 0-2.9-.1z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.9A12.9 12.9 0 0 1 22 2c0 2.7-.8 7.5-6 11a22 22 0 0 1-4 2z"/><path d="M9 12H4s.6-3 2-4c1.6-1.1 5 0 5 0"/><path d="M12 15v5s3-.6 4-2c1.1-1.6 0-5 0-5"/>`,
  "05": `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>`,
};

function StepCard({ number, title, content }: { number: string; title: string; content: string }) {
  const icon = icons[number] ?? icons["01"];
  const idx = parseInt(number, 10) - 1;
  return (
    <div
      className="bn-card group p-8 xl:px-32 xl:py-3 relative"
      data-bn-card={number}
      style={{ "--i": idx, "--w": `${100 - idx * 3}%` } as CSSProperties}
    >
      <div className="bn-inner flex items-center flex-col lg:flex-row lg:justify-between gap-6">
        <div className="bn-icon-wrap shrink-0">
          <span className="bn-ring" />
          <div className="bn-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              dangerouslySetInnerHTML={{ __html: icon }}
            />
          </div>
        </div>

        <div className="relative grid place-items-center lg:w-56">
          <div className="bn-number text-[5rem] lg:text-[100px] font-extrabold t-stroke text-transparent leading-none">
            {number}
          </div>
          <h3 className="text-h5-sm font-bold absolute">{title}</h3>
        </div>

        <p className="bn-text lg:w-72 text-sm text-center lg:text-left">{content}</p>
      </div>

      <div className="absolute inset-0 size-full -z-10">
        <div
          className="bn-bg border border-border size-full rounded-4xl bg-primary/5 corner-squircle"
          style={{ transform: "perspective(100px) rotateX(-2deg)" }}
        />
      </div>
    </div>
  );
}

export default function BusinessNeeds() {
  const data = getSection<BusinessNeedsSection>("business-needs");
  if (!data.enable) return null;

  return (
    <section className="section relative isolate">
      <div className="container">
        <div className="section-container">
          <div className="section-intro centralize">
            <h2 className="title hasHighlight" dangerouslySetInnerHTML={{ __html: data.title }} />
          </div>
          <div className="section-content">
            <div className="flex flex-col gap-y-2 px-4">
              {data.items.map((item) => (
                <StepCard key={item.number} number={item.number} title={item.title} content={item.content} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 grid place-items-center size-full -z-10">
        <div className="bn-glow size-225 bg-radial from-primary/30 to-transparent from-0% to-70% rounded-full" />
      </div>
    </section>
  );
}
