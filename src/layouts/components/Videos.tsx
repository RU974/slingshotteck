// Video blocks. The <video> tags are emitted as raw HTML because React's
// server renderer drops the `muted` attribute, which browsers require for
// autoplay before the page has hydrated. React then controls them via refs.
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { PlayBadge } from "@/components/Glows";

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

const attr = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;");

/** Hero product demo video: tilts flat in 3D as it scrolls into view; click toggles sound. */
export function VideoShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const [muted, setMuted] = useState(true);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    // XL: starts scaled 0.8, rotationX 10, top -250 -> scrolls to normal.
    mm.add("(min-width: 1280px)", () => {
      gsap.set(el, { scale: 0.8, rotationX: 10, top: -250 });
      gsap.to(el, {
        scrollTrigger: { trigger: el, start: "20% 95%", end: "0% 30%", scrub: true },
        scale: 1,
        rotationX: 0,
        top: 0,
        ease: "none",
      });
    });
    // Smaller screens: starts scaled 0.8, rotationX 15 -> scrolls to normal.
    mm.add("(max-width: 1279px)", () => {
      gsap.set(el, { scale: 0.8, rotationX: 15 });
      gsap.to(el, {
        scrollTrigger: { trigger: el, start: "20% 95%", end: "0% 40%", scrub: true },
        scale: 1,
        rotationX: 0,
        ease: "none",
      });
    });
    return () => mm.revert();
  }, []);

  const toggleSound = () => {
    const video = ref.current?.querySelector("video");
    if (!video) return;
    video.muted = !video.muted;
    if (video.paused) void video.play().catch(() => {});
    setMuted(video.muted);
  };

  const video = `<video id="videoPlayer" class="w-full aspect-video object-cover" autoplay muted loop width="1280" height="720" playsinline preload="metadata" poster="/images/showcase-poster.jpg" aria-label="Slingshotteck HRMS product demo: attendance, employees and payroll screens"><source src="/showcase.mp4" type="video/mp4" />Your browser does not support HTML video. <a href="/hrms">See Slingshotteck HRMS screenshots</a>.</video>`;

  return (
    <div ref={ref} className="relative w-full max-w-280 mx-auto rounded-4xl overflow-hidden">
      <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: video }} />
      {/* Sound toggle overlay — visible = muted (shows icon to unmute) */}
      <button
        type="button"
        onClick={toggleSound}
        className={`absolute inset-0 grid place-items-center shadow-lg group cursor-pointer transition-opacity duration-300 ${
          muted ? "bg-dark/40 opacity-100" : "opacity-0"
        }`}
        aria-label={muted ? "Show product demo video" : "Show video overlay"}
      >
        <div
          className={`transition-all duration-300 group-hover:scale-125 bg-white/90 hover:bg-white rounded-full size-24 grid place-items-center relative ${
            muted ? "" : "hidden"
          }`}
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
  const ref = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState<boolean | null>(null); // null = not started yet

  const togglePlay = () => {
    const el = ref.current?.querySelector("video");
    if (!el) return;
    if (el.paused) {
      void el.play().catch(() => {});
      setPlaying(true);
    } else {
      el.pause();
      setPlaying(false);
    }
  };

  const videoHtml = `<video class="w-full aspect-video object-cover" width="1000px" playsinline preload="metadata" poster="${attr(
    poster ?? "",
  )}">${video ? `<source src="${attr(video)}" type="video/mp4" />` : ""}Your browser does not support the video tag.</video>`;

  return (
    <div>
      <div
        ref={ref}
        className="relative w-full max-w-280 mx-auto rounded-[30px] corner-squircle overflow-hidden"
      >
        <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: videoHtml }} />
        {video && (
          <button
            type="button"
            onClick={togglePlay}
            className={`absolute inset-0 grid place-items-center shadow-lg group bg-dark/40 cursor-pointer transition-opacity duration-300 ${
              playing ? "opacity-0" : "opacity-100"
            }`}
            aria-label={playing === null ? "Resume" : playing ? "Pause Video" : "Play Video"}
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
