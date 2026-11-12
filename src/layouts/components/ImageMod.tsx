import type { CSSProperties } from "react";
import sizes from "virtual:image-sizes";

interface Props {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  loading?: "eager" | "lazy";
  decoding?: "async" | "auto" | "sync";
  className?: string;
  style?: CSSProperties;
  [key: `aria-${string}`]: any;
}

/**
 * Image from /public/images. Adds the intrinsic width/height (scaled to keep
 * the aspect ratio when only one side is given) so the browser can reserve
 * space and avoid layout shift. In production the server automatically serves
 * a .webp version to browsers that support it.
 */
export default function ImageMod({
  src,
  alt,
  width,
  height,
  loading = "lazy",
  decoding = "async",
  className,
  style,
  ...rest
}: Props) {
  if (!src) return null;
  const intrinsic = sizes[src];

  if (!intrinsic && !src.startsWith("http") && import.meta.env.DEV) {
    console.warn(`\x1b[33mImage not found in public/images: ${src}\x1b[0m`);
  }

  let w = width;
  let h = height;
  if (intrinsic) {
    const [iw, ih] = intrinsic;
    if (!w && !h) {
      w = iw;
      h = ih;
    } else if (w && !h) {
      h = Math.round((w * ih) / iw);
    } else if (h && !w) {
      w = Math.round((h * iw) / ih);
    }
  }

  return (
    <img
      src={src}
      alt={alt}
      width={w}
      height={h}
      loading={loading}
      decoding={decoding}
      className={className}
      style={style}
      {...rest}
    />
  );
}
