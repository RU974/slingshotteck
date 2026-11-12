// Video blocks. The <video> tags are emitted as raw HTML because React's
// server renderer drops the `muted` attribute, which browsers require for
// autoplay. Play/pause/sound toggles are handled by /scripts/main.js.
import { PlayBadge } from "@/components/Glows";

const attr = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;");

/** Hero product demo video (GSAP scroll animation lives in animations.js). */
export function VideoShowcase() {
  const video = `<video id="videoPlayer" class="w-full aspect-video object-cover" autoplay muted loop width="1280" height="720" playsinline preload="metadata" poster="/images/showcase-poster.jpg" aria-label="Slingshotteck HRMS product demo: attendance, employees and payroll screens"><source src="/showcase.mp4" type="video/mp4" />Your browser does not support HTML video. <a href="/hrms">See Slingshotteck HRMS screenshots</a>.</video>`;

  return (
    <div className="relative w-full max-w-280 mx-auto rounded-4xl overflow-hidden" data-gsap-video-showcase>
      <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: video }} />
      {/* Sound toggle overlay — visible = muted (shows icon to unmute) */}
      <button
        id="soundToggle"
        className="absolute inset-0 grid place-items-center shadow-lg group bg-dark/40 cursor-pointer transition-opacity duration-300"
        aria-label="Show product demo video"
      >
        <div
          id="mutedIcon"
          className="transition-all duration-300 group-hover:scale-125 bg-white/90 hover:bg-white rounded-full size-24 grid place-items-center relative"
        >
          <PlayBadge gradientId="vs_gradient" spin="3s" />
        </div>
      </button>
    </div>
  );
}

interface TestimonialProps {
  poster: string;
  content?: string;
  name?: string;
  designation?: string;
  video?: string;
}

export function TestimonialCard({ poster, content, name, designation, video }: TestimonialProps) {
  const videoHtml = `<video class="w-full aspect-video object-cover" width="1000px" playsinline preload="metadata" poster="${attr(
    poster ?? "",
  )}">${video ? `<source src="${attr(video)}" type="video/mp4" />` : ""}Your browser does not support the video tag.</video>`;

  return (
    <div>
      <div
        data-testimonial-video
        className="relative w-full max-w-280 mx-auto rounded-[30px] corner-squircle overflow-hidden"
      >
        <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: videoHtml }} />
        {video && (
          <button
            className="absolute inset-0 grid place-items-center shadow-lg group bg-dark/40 cursor-pointer"
            aria-label="Resume"
          >
            <div className="transition-all duration-300 group-hover:scale-125 bg-white/90 hover:bg-white rounded-full size-24 grid place-items-center relative">
              <PlayBadge gradientId="paint0_linear_43_654" spin="8s" />
            </div>
          </button>
        )}
      </div>
      <div className="p-7 rounded-[30px] mt-2.5 corner-squircle bg-light/60">
        <p className="text-text-light text-h6 text-center">{content}</p>
        <hr className="opacity-20 my-10" />
        <div className="text-center">
          <p className="text-text-light font-semibold">{name}</p>
          <p className="text-text-dark/60 text-sm">{designation}</p>
        </div>
      </div>
    </div>
  );
}
