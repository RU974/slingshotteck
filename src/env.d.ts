/// <reference types="vite/client" />

declare module "*.md" {
  const file: { data: Record<string, any>; html: string; body: string };
  export default file;
}

declare module "virtual:image-sizes" {
  const sizes: Record<string, [number, number]>;
  export default sizes;
}
