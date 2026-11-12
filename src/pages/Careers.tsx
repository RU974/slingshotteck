import CallToAction from "@/components/CallToAction";
import CareerCard from "@/components/CareerCard";
import Faq from "@/components/Faq";
import { EllipseBackdrop, GradientBlob, HeroGlow, QuoteIcon, SporeCanvas } from "@/components/Glows";
import ImageMod from "@/components/ImageMod";
import { ValueCard } from "@/components/SmallCards";
import config from "@/config/config.json";
import Base from "@/layouts/Base";
import { getListPage, getSinglePage } from "@/lib/content";
import { markdownify } from "@/lib/utils/textConverter";

export default function Careers() {
  const pageData = getListPage("careers", "-index").data;
  const jobs = getSinglePage("careers");

  return (
    <Base {...pageData}>
      <section className="section-ph pb-10 relative">
        <div className="container relative">
          <SporeCanvas canvasClass="heroSporeCanvas w-full opacity-70" />
          <div className="lg:max-w-4xl mx-auto text-center relative z-10">
            <h1 className="hasHighlight mb-0" dangerouslySetInnerHTML={{ __html: markdownify(pageData.page_header.title) }} />
          </div>
        </div>
        <HeroGlow />
      </section>

      {/* Office Gallery */}
      {(pageData.gallery?.enable ?? true) && (
        <section className="section pt-0">
          <div className="container text-center">
            <a href="#open-roles" className="btn btn-primary">
              View Open Roles
            </a>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto mt-10">
              {pageData.gallery?.items?.map((img: any) => (
                <div key={img.src} className={`rounded-2xl overflow-hidden ${img.class ?? ""}`}>
                  <ImageMod src={img.src} alt={img.alt} width={600} height={625} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
          <hr className="h-px bg-linear-to-r from-transparent from-3% via-white/40 to-97% to-transparent border-0 my-20" />
        </section>
      )}

      {/* What We Offer */}
      {(pageData.what_we_offer?.enable ?? true) && (
        <section className="section relative">
          <div className="container">
            <div className="section-container">
              <div className="section-intro centralize">
                <h2 className="title hasHighlight">{pageData.what_we_offer?.title ?? "What We Offer"}</h2>
                <p className="subtitle">{pageData.what_we_offer?.subtitle}</p>
              </div>
              <div className="section-content">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mb-9">
                  {pageData.what_we_offer?.offers?.map((offer: any) => (
                    <ValueCard key={offer.title} logo={offer.logo} title={offer.title} list={offer.list} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <GradientBlob />
        </section>
      )}

      {/* What Our Staff Say */}
      {(pageData.staff_testimonials?.enable ?? true) && (
        <section className="section relative max-lg:overflow-hidden">
          <div className="container">
            <div className="section-container">
              <div className="section-intro centralize">
                <h2 className="title">{pageData.staff_testimonials?.title}</h2>
              </div>
              <div className="section-content">
                <div className="grid lg:grid-cols-2 gap-8">
                  {pageData.staff_testimonials?.items?.map((item: any) => (
                    <div key={item.name} className="rounded-2xl bg-white/5 p-8 md:p-10">
                      <div className="mb-6">
                        <QuoteIcon fill="white" />
                      </div>
                      <blockquote className="text-text leading-relaxed mb-8 text-xl font-medium">{item.quote}</blockquote>
                      <div className="flex items-center gap-4">
                        <ImageMod
                          src={item.avatar}
                          alt={item.name}
                          width={48}
                          height={48}
                          className="size-12 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-white font-semibold">{item.name}</p>
                          <p className="text-text text-sm">{item.designation}</p>
                        </div>
                      </div>
                    </div>
                  ))}
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

      {/* Open Positions */}
      {(pageData.open_positions?.enable ?? true) && (
        <section
          id="open-roles"
          className="section-box max-lg:overflow-hidden pb-16 xl:pb-19 bg-transparent relative isolate overflow-hidden"
        >
          <div className="container">
            <div className="section-container">
              <div className="section-intro centralize">
                <h2 className="title hasHighlight">
                  Open <strong className="italic">Positions</strong>
                </h2>
              </div>
              <div className="section-content">
                {jobs.length === 0 && (
                  <p className="text-center text-lg max-w-2xl mx-auto">
                    There are no open roles right now, but we are always happy to hear from talented developers,
                    network engineers and security specialists. Send your CV to{" "}
                    <a className="text-primary underline" href={`mailto:${config.params.footer_email}`}>
                      {config.params.footer_email}
                    </a>
                    .
                  </p>
                )}
                <div className="grid lg:grid-cols-2 gap-8">
                  {jobs.map((job) => (
                    <CareerCard
                      key={job.id}
                      title={job.data.title}
                      description={job.data.description ?? ""}
                      type={job.data.type ?? "Full time"}
                      location={job.data.location ?? "Remote"}
                      href={`/careers/${job.id}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <EllipseBackdrop id="paint0_linear_car" />
          <div className="absolute inset-0 grid place-items-center size-full -z-10">
            <div className="size-225 bg-radial from-primary-light/30 to-transparent from-0% to-70% rounded-full" />
          </div>
        </section>
      )}

      <Faq schema={false} />
      <CallToAction />
    </Base>
  );
}
