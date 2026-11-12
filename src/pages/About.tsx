import Badge from "@/components/Badge";
import CallToAction from "@/components/CallToAction";
import Faq from "@/components/Faq";
import { GradientBlob, HeroBeams, HeroGlow } from "@/components/Glows";
import ImageMod from "@/components/ImageMod";
import OurStory from "@/components/OurStory";
import { TeamCard } from "@/components/SmallCards";
import config from "@/config/config.json";
import Base from "@/layouts/Base";
import { getListPage } from "@/lib/content";
import { markdownify } from "@/lib/utils/textConverter";
import Features from "@/partials/Features";
import Testimonial from "@/partials/Testimonial";

export default function About() {
  const about = getListPage("about", "-index").data;
  const siteUrl = config.site.base_url.replace(/\/$/, "");
  const aboutSchema = [
    {
      "@type": "AboutPage",
      "@id": `${siteUrl}/about#aboutpage`,
      url: `${siteUrl}/about`,
      mainEntity: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/about#founder`,
      name: "Muhammad Usama Bin Ilyas",
      jobTitle: "Founder & CEO",
      worksFor: { "@id": `${siteUrl}/#organization` },
      knowsAbout: [
        "Full stack development",
        "Network security",
        "Firewalls",
        "Cybersecurity",
        "Threat hunting",
        "Penetration testing",
        "Cloud infrastructure",
        "ERP and SaaS development",
      ],
      image: `${siteUrl}/images/avatar-lg.png`,
    },
  ];

  return (
    <Base {...about} schema={aboutSchema}>
      {/* Page Header */}
      <section className="section-ph pb-20 overflow-hidden">
        <div className="container">
          <div className="lg:max-w-4xl mx-auto text-center">
            <h1 className="hasHighlight mb-6" dangerouslySetInnerHTML={{ __html: markdownify(about.page_header.title) }} />
            <p className="mb-5 text-lg text-text">{about.page_header.subtitle}</p>
            <ImageMod
              src={about.page_header.image}
              alt="Slingshotteck team working on software and IT projects"
              className="w-full h-auto object-cover aspect-video lg:aspect-1000/520 rounded-3xl mt-20"
              loading="eager"
            />
          </div>
          <div className="absolute inset-0 h-full w-full max-h-113 overflow-hidden -z-10">
            <canvas className="heroSporeCanvas w-full opacity-70" />
          </div>
        </div>
        <HeroGlow />
        <HeroBeams id="about" />
      </section>
      <hr className="h-px bg-linear-to-r from-transparent from-10% via-white/50 to-90% to-transparent border-0" />

      {/* Stats */}
      {about.stats.enable && (
        <section className="section relative">
          <div className="container">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              {about.stats.items.map((stat: any) => (
                <div key={stat.label} className="text-center p-8 lg:p-10 lg:py-26 rounded-2xl bg-primary/10">
                  <div className="text-h2 lg:text-h1 leading-none font-bold font-secondary text-white mb-4">
                    {stat.value}
                  </div>
                  <p className="text-text text-h6">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="-translate-y-140">
            <GradientBlob />
          </div>
        </section>
      )}

      {/* CEO Letter */}
      <OurStory />

      {/* Meet Our Team */}
      {about.our_team.enable && (
        <section className="section relative isolate overflow-hidden">
          <div className="container">
            <div className="section-container">
              <div className="section-intro centralize">
                <Badge title={about.our_team.badge} />
                <h2 className="title hasHighlight" dangerouslySetInnerHTML={{ __html: markdownify(about.our_team.title) }} />
              </div>
              <div className="section-content">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  {about.our_team.members.map((m: any) => (
                    <TeamCard key={m.name} image={m.image} name={m.name} role={m.role} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Core Values */}
      {about.core_values.enable && <Features our_features={about.core_values} />}

      <Testimonial />
      <Faq schema={false} />
      <CallToAction />
    </Base>
  );
}
