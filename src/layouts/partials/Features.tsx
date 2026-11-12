import { FeatureCard } from "@/components/SmallCards";
import type { OurFeaturesSection } from "@/types";

export default function Features({ our_features }: { our_features: OurFeaturesSection }) {
  return (
    <section className="section-box mx-5 relative isolate overflow-hidden">
      <div className="container">
        <div className="section-container">
          <div className="section-intro centralize">
            <h2 className="title hasHighlight" dangerouslySetInnerHTML={{ __html: our_features.title }} />
            <p className="subtitle">{our_features.content}</p>
          </div>
          <div className="section-content">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 border-r border-text-light/5 border-b">
              {our_features.items.map((item) => (
                <FeatureCard key={item.title} logo={item.logo} title={item.title} is_starred={item.is_starred} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 -z-10">
        <svg width="1880" height="706" viewBox="0 0 1880 706" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_f_feat)">
            <path
              d="M265 598.973C173.931 658.402 -22.5806 807.13 -125 857.275V910H1750C1691.94 910 1142.76 643.191 986.456 530.174C472.864 158.816 488.018 453.438 265 598.973Z"
              fill="url(#paint0_linear_feat)"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_feat"
              x="-475"
              y="0"
              width="2575"
              height="1260"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="175" result="effect1" />
            </filter>
            <linearGradient
              id="paint0_linear_feat"
              x1="641.165"
              y1="334"
              x2="641.165"
              y2="909.999"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="var(--color-primary-light)" />
              <stop offset="1" stopColor="var(--color-primary)" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
}
