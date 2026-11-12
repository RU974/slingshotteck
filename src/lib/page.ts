import { createContext, useContext } from "react";
import type { SeoProps } from "@/types";

/** Per-request state shared between the page tree and the server renderer. */
export interface PageState {
  pathname: string;
  /** Filled in by <Base> during render; turned into <head> tags afterwards. */
  seo?: SeoProps;
}

export const PageContext = createContext<PageState>({ pathname: "/" });

export const usePage = () => useContext(PageContext);
