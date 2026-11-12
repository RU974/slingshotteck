import { GradientBlob } from "@/components/Glows";
import { TestimonialCard } from "@/components/Videos";
import { getSection } from "@/lib/content";

interface TestimonialSection {
  enable: boolean;
  title: string;
  testimonials: { name: string; designation: string; poster: string; content: string; video?: string }[];
}

export default function Testimonial() {
  const data = getSection<TestimonialSection>("testimonial");
  if (!data.enable) return null;

  return (
    <section className="section relative">
      <div className="container">
        <div className="section-container">
          <div className="section-intro centralize">
            <h2 className="title hasHighlight" dangerouslySetInnerHTML={{ __html: data.title }} />
          </div>
          <div className="section-content">
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-7">
              {data.testimonials.map((item) => (
                <TestimonialCard
                  key={item.name}
                  poster={item.poster}
                  name={item.name}
                  designation={item.designation}
                  content={item.content}
                  video={item.video}
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
