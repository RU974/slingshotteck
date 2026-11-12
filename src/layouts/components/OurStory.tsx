import { CornerDots } from "@/components/Glows";
import ImageMod from "@/components/ImageMod";
import { getSection } from "@/lib/content";
import type { Button } from "@/types";

interface OurStorySection {
  enable: boolean;
  title: string;
  ceo: { name: string; role: string; image: string };
  letter: string;
  letter_points_title?: string;
  letter_points?: string[];
  closing_content?: string;
  button?: Button;
}

export default function OurStory() {
  const data = getSection<OurStorySection>("our-story");
  if (!data.enable) return null;

  return (
    <section className="section overflow-hidden">
      <div className="container">
        <div className="section-container">
          <div className="section-intro centralize">
            <h2 className="title hasHighlight lg:col-8 mx-auto" dangerouslySetInnerHTML={{ __html: data.title }} />
          </div>
          <div className="section-content">
            <hr className="h-px bg-linear-to-r from-transparent from-3% via-white/40 to-97% to-transparent border-0" />
            <div className="relative max-w-220 mx-auto">
              <div className="p-6 py-20 xl:px-15 border-x border-text/10">
                <div className="flex flex-col items-center text-center lg:max-w-3xl mx-auto">
                  <div>
                    <ImageMod
                      width={211}
                      height={211}
                      className="size-52 rounded-full mb-7"
                      src={data.ceo.image}
                      alt={data.ceo.name}
                    />
                    <p className="text-white font-semibold">{data.ceo.name}</p>
                    <p className="text-text-dark text-sm">{data.ceo.role}</p>
                  </div>
                  <div className="text-h6 mt-12 mb-17 text-left mx-auto">
                    <div dangerouslySetInnerHTML={{ __html: data.letter }} />
                  </div>

                  {data.letter_points && data.letter_points.length > 0 && (
                    <>
                      <div className="text-h6 text-white font-semibold text-center mb-7">
                        {data.letter_points_title ?? "Here's how we do it:"}
                      </div>
                      <div className="flex flex-col gap-y-7 relative vertical-bg-line">
                        {data.letter_points.map((point) => (
                          <div
                            key={point}
                            className="bg-linear-to-tl from-border to-body border border-border px-8 w-full py-2.5 rounded-full flex items-center justify-center relative z-10 gap-x-2"
                          >
                            <span className="font-semibold text-white text-lg">{point}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {data.closing_content && <p className="mt-15 text-h6">{data.closing_content}</p>}

                  {data.button?.enable && data.button.link && (
                    <div className="mt-12 flex justify-center">
                      <a href={data.button.link} className="btn btn-primary py-4">
                        {data.button.label}
                      </a>
                    </div>
                  )}
                </div>
              </div>
              <CornerDots />
            </div>
            <hr className="h-px bg-linear-to-r from-transparent from-3% via-white/40 to-97% to-transparent border-0" />
          </div>
        </div>
      </div>
      <div className="absolute inset-0 grid place-items-center size-full -z-10 translate-y-10">
        <div className="size-180 xl:size-300 bg-radial from-primary/40 to-transparent from-0% to-70% rounded-full" />
      </div>
    </section>
  );
}
