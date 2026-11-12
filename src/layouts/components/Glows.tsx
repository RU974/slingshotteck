// Decorative background pieces that were copy-pasted across many Astro pages.
import type { CSSProperties } from "react";

export const heroGlowStyle: CSSProperties = {
  background:
    "radial-gradient(circle, var(--color-primary) 0%, color-mix(in srgb, var(--color-primary) 78%, transparent) 20%, transparent 70%)",
};

/** Big blurred primary-colour circle behind page heroes. */
export function HeroGlow({
  className = "absolute left-1/2 top-0 -translate-y-1/2 -translate-x-1/2 size-160 xl:size-300 -z-20 blur-2xl",
}: {
  className?: string;
}) {
  return <div className={className} style={heroGlowStyle} />;
}

/** Animated particle canvas (drawn by /scripts/particleCanvas.js). */
export function SporeCanvas({
  wrapperClass = "absolute top-0 left-0 w-full",
  innerClass = "h-100 w-full overflow-hidden -translate-y-10",
  canvasClass = "heroSporeCanvas w-full",
}: {
  wrapperClass?: string;
  innerClass?: string;
  canvasClass?: string;
}) {
  return (
    <div className={wrapperClass}>
      <div className={innerClass}>
        <canvas className={canvasClass} />
      </div>
    </div>
  );
}

/** Soft radial glow centred in a section. */
export function GradientBlob() {
  return (
    <div className="absolute inset-0 grid place-items-center size-full -z-10">
      <div className="w-full lg:w-2/3 h-225 bg-radial from-primary/30 to-transparent from-0% to-70% rounded-full" />
    </div>
  );
}

/** Corner light beams in the top-left of hero sections. `id` keeps SVG ids unique. */
export function HeroBeams({ id }: { id: string }) {
  const blend: CSSProperties = { mixBlendMode: "plus-lighter" as CSSProperties["mixBlendMode"] };
  const blurFilter = (key: string, w: number, h: number, x: number, y: number, dev: number) => (
    <filter
      id={`${key}-${id}`}
      width={w}
      height={h}
      x={x}
      y={y}
      colorInterpolationFilters="sRGB"
      filterUnits="userSpaceOnUse"
    >
      <feFlood floodOpacity="0" result="BackgroundImageFix" />
      <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
      <feGaussianBlur result="effect1" stdDeviation={dev} />
    </filter>
  );
  const fade = (key: string, x1: number, x2: number, y1: number, y2: number) => (
    <linearGradient
      id={`${key}-${id}`}
      x1={x1}
      x2={x2}
      y1={y1}
      y2={y2}
      gradientUnits="userSpaceOnUse"
    >
      <stop stopColor="var(--color-primary)" />
      <stop offset="1" stopColor="var(--color-primary)" stopOpacity="0" />
    </linearGradient>
  );

  return (
    <div className="absolute top-0 left-0 flex flex-col gap-6 -z-10">
      <svg xmlns="http://www.w3.org/2000/svg" width="567" height="558" fill="none">
        <g opacity=".5">
          <g filter={`url(#a-${id})`} style={blend}>
            <path
              fill={`url(#b-${id})`}
              d="M-20.527-7.51 10.182-43l259.774 233.148-13.283 15.352-277.2-213.01Z"
            />
          </g>
          <g filter={`url(#c-${id})`} style={blend}>
            <path
              fill={`url(#d-${id})`}
              d="M-52 13.659-20.788-25l267.328 224.459-13.502 16.722-285.04-202.522Z"
            />
          </g>
          <g filter={`url(#e-${id})`} style={blend}>
            <path
              fill={`url(#f-${id})`}
              d="M-108.079-4.9-66.125-46l290.011 307.352-18.147 17.779-313.818-284.03Z"
            />
          </g>
          <g filter={`url(#g-${id})`}>
            <ellipse
              cx="143"
              cy="252.378"
              fill="var(--color-primary-light)"
              fillOpacity=".5"
              rx="143"
              ry="252.378"
              transform="scale(-1 1) rotate(46.133 191.203 -117.756)"
            />
          </g>
        </g>
        <defs>
          {blurFilter("a", 338.484, 296.5, -44.527, -67, 12)}
          {blurFilter("c", 346.541, 289.181, -76.001, -49, 12)}
          {blurFilter("e", 379.965, 373.131, -132.079, -70, 12)}
          {blurFilter("g", 914.454, 906.103, -348.178, -349.061, 125)}
          {fade("b", -5.173, 258.744, -25.255, 203.106)}
          {fade("d", -36.394, 235.144, -5.671, 213.574)}
          {fade("f", -87.102, 208.568, -25.45, 276.359)}
        </defs>
      </svg>
    </div>
  );
}

/** Large ellipse outline used behind "process" / "open roles" sections. */
export function EllipseBackdrop({ id }: { id: string }) {
  return (
    <div className="absolute inset-x-0 top-0 -z-10">
      <svg className="w-full" viewBox="0 0 1920 1099" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M960 1.5C1224.88 1.5 1464.62 62.943 1638.08 162.205C1811.58 261.491 1918.5 398.425 1918.5 549.356C1918.5 700.287 1811.58 837.222 1638.08 936.508C1464.62 1035.77 1224.88 1097.21 960 1097.21C695.116 1097.21 455.383 1035.77 281.923 936.508C108.42 837.222 1.50012 700.287 1.5 549.356C1.5 398.425 108.42 261.491 281.923 162.205C455.383 62.943 695.116 1.5 960 1.5Z"
          fill="black"
          stroke={`url(#${id})`}
          strokeWidth="3"
        />
        <defs>
          <linearGradient id={id} x1="960" y1="0" x2="960" y2="84.3521" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--color-primary-light)" />
            <stop offset="1" stopColor="var(--color-body)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

/** Four small white squares on the corners of a framed block. */
export function CornerDots() {
  return (
    <>
      <div className="size-2 bg-white absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2" />
      <div className="size-2 bg-white absolute right-0 top-0 translate-x-1/2 -translate-y-1/2" />
      <div className="size-2 bg-white absolute left-0 bottom-0 -translate-x-1/2 translate-y-1/2" />
      <div className="size-2 bg-white absolute right-0 bottom-0 translate-x-1/2 translate-y-1/2" />
    </>
  );
}

/** Quote-mark icon used on testimonials. */
export function QuoteIcon({ fill = "currentColor" }: { fill?: string }) {
  return (
    <svg width="45" height="28" viewBox="0 0 45 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15.3955 0V10.9561H24.8691L16.5791 28H0L13.0264 0H15.3955ZM36.7109 0V10.9561H45L36.7109 28H21.3154L34.3418 0H36.7109Z"
        fill={fill}
      />
    </svg>
  );
}

/** Play button with spinning ring used on videos. */
export function PlayBadge({ gradientId, spin }: { gradientId: string; spin: string }) {
  return (
    <>
      <div
        className="inset-0 scale-90 transition-transform duration-300 size-full absolute rounded-full border-2 border-solid border-t-transparent border-b-transparent border-primary animate-spin"
        style={{ animationDuration: spin }}
      />
      <svg width="36" height="36" className="size-9" fill="none" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M20.9108 9.50547C23.3603 10.897 25.2851 11.9905 26.6564 12.9922C28.037 14.0008 29.0582 15.0549 29.4239 16.4448C29.6921 17.4639 29.6921 18.5361 29.4239 19.5552C29.0582 20.9451 28.037 21.9991 26.6564 23.0077C25.2851 24.0094 23.3603 25.1029 20.9109 26.4945C18.5448 27.8386 16.5495 28.9722 15.0348 29.6166C13.508 30.2659 12.1159 30.5952 10.763 30.2118C9.76878 29.9299 8.86412 29.3952 8.13534 28.6599C7.14629 27.6621 6.74927 26.2828 6.56144 24.6231C6.37497 22.9753 6.37499 20.8185 6.375 18.0751V17.9248C6.37499 15.1815 6.37497 13.0246 6.56144 11.3769C6.74927 9.71712 7.14629 8.33789 8.13534 7.34C8.86412 6.60473 9.76878 6.06996 10.763 5.78822C12.1159 5.40485 13.508 5.73401 15.0348 6.38345C16.5495 7.02771 18.5448 8.16123 20.9108 9.50547Z"
          fill={`url(#${gradientId})`}
        />
        <defs>
          <linearGradient id={gradientId} x1="18" y1="30.3751" x2="18" y2="5.62488" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--color-primary-light)" />
            <stop offset="1" stopColor="var(--color-primary)" />
          </linearGradient>
        </defs>
      </svg>
    </>
  );
}

/** Small circled "x" icon used in the "problem" list on the homepage. */
export function CrossCircleIcon() {
  return (
    <svg className="shrink-0" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9.99999 1.04163C14.9476 1.04163 18.9583 5.05241 18.9583 9.99996C18.9583 14.9475 14.9476 18.9583 9.99999 18.9583C5.05244 18.9583 1.04166 14.9475 1.04166 9.99996C1.04166 5.05241 5.05244 1.04163 9.99999 1.04163ZM8.02571 6.8538C7.69841 6.58685 7.2159 6.6057 6.9108 6.91077C6.60581 7.21587 6.5869 7.6984 6.85383 8.02568L6.9108 8.08915L8.82157 9.99996L6.91161 11.9108C6.5863 12.2362 6.58619 12.7638 6.91161 13.0891C7.23705 13.4143 7.76464 13.4145 8.09 13.0891L9.99999 11.1784L11.91 13.0891L11.9735 13.1461C12.3007 13.413 12.7832 13.394 13.0884 13.0891C13.3934 12.7842 13.4128 12.3015 13.1462 11.9742L13.0884 11.9108L11.1776 9.99996L13.0892 8.08915L13.1462 8.02568C13.4131 7.69839 13.3942 7.21587 13.0892 6.91077C12.7841 6.6057 12.3016 6.58685 11.9742 6.8538L11.9108 6.91077L9.99999 8.82154L8.08918 6.91077L8.02571 6.8538Z"
        fill="var(--color-secondary)"
      />
    </svg>
  );
}
