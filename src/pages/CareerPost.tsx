import Badge from "@/components/Badge";
import CallToAction from "@/components/CallToAction";
import CareerApplyForm from "@/components/CareerApplyForm";
import Faq from "@/components/Faq";
import { HeroGlow, SporeCanvas } from "@/components/Glows";
import ImageMod from "@/components/ImageMod";
import Base from "@/layouts/Base";
import type { Entry } from "@/lib/content";
import { markdownify } from "@/lib/utils/textConverter";

export default function CareerPost({ job }: { job: Entry }) {
  const data = job.data;

  return (
    <Base {...data}>
      <section className="section-ph pb-8 relative overflow-hidden">
        <div className="container relative">
          <SporeCanvas />
          <div className="lg:max-w-4xl mx-auto text-center relative">
            <div className="flex justify-center mb-5">
              <Badge title="Careers" />
            </div>
            <h1 className="mb-0 text-h3 lg:text-h1 hasHighlight" dangerouslySetInnerHTML={{ __html: markdownify(data.title) }} />
          </div>
        </div>
        <HeroGlow />
      </section>

      {/* Banner Image */}
      <section className="pb-8 relative z-10">
        <div className="container">
          <div className="relative rounded-3xl overflow-hidden bg-light aspect-video lg:aspect-1000/520">
            <ImageMod
              src={data.banner_image ?? "/images/careers/career-details-banner.png"}
              alt={data.title}
              width={1200}
              height={624}
              className="w-full h-full object-cover opacity-80"
            />
          </div>
        </div>
      </section>

      {/* Meta Info Cards */}
      <section className="section-sm pt-0">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {data.job_info?.map((item: any) => (
              <div key={item.label} className="bg-light rounded-2xl p-6 py-12.5 text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <ImageMod src={item.icon} alt={item.label} width={36} height={36} />
                </div>
                <p className="text-text text-sm mb-1">{item.label}</p>
                <p className="text-white font-semibold">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Content + Apply Form */}
      <section className="section">
        <div className="container">
          <div className="grid lg:grid-cols-[65%_35%] gap-8 items-start">
            <div className="content" dangerouslySetInnerHTML={{ __html: job.html }} />
            <div>
              <CareerApplyForm />
            </div>
          </div>
        </div>
      </section>

      <section className="section-sm pt-0">
        <div className="container">
          <a href="/careers" className="btn btn-outline">
            ← Back to Careers
          </a>
        </div>
      </section>

      <Faq schema={false} />
      <CallToAction />
    </Base>
  );
}
