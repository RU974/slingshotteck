/// <reference types="vite/client" />

declare module "*.md" {
  const file: { data: Record<string, any>; html: string };
  export default file;
}

declare module "virtual:image-sizes" {
  const sizes: Record<string, [number, number]>;
  export default sizes;
}

declare module "virtual:used-icons" {
  import type { IconType } from "react-icons";
  const icons: Record<string, IconType>;
  export = icons;
}
