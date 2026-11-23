import { createContext, useContext } from "react";
import type { SeoProps } from "@/types";

/**
 * Per-render state the page tree hands back to the server renderer.
 * On the server, <Base> writes the page's SEO props here and <NotFound> sets
 * status 404; entry-server.tsx turns them into <head> tags and the HTTP status.
 * In the browser the object is a throwaway (Base updates <head> itself).
 */
export interface PageState {
  seo?: SeoProps;
  status?: number;
}

export const PageContext = createContext<PageState>({});

export const usePage = () => useContext(PageContext);
