import { HeroBeams, HeroGlow } from "@/components/Glows";

export default function PageHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <section className="section-ph pb-28 mb-0 overflow-hidden">
      <div className="container">
        <div className="lg:max-w-3xl mx-auto text-center">
          <h1 className="hasHighlight mb-6" dangerouslySetInnerHTML={{ __html: title }} />
          <p className="mb-5 text-lg" dangerouslySetInnerHTML={{ __html: subtitle }} />
          <div className="absolute inset-0 h-full w-full overflow-hidden -z-10">
            <canvas className="heroSporeCanvas w-full opacity-70" />
          </div>
        </div>
        <HeroGlow />
        <div className="absolute left-0 bottom-0 w-full h-40 -z-10 bg-linear-180 from-transparent to-body" />
        <HeroBeams id="ph" />
      </div>
    </section>
  );
}
