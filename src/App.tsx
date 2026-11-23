// Root component, shared by the server renderer and the browser.
// Holds everything that is site-wide rather than page-specific:
//   • in-app navigation for plain <a href> links (incl. links inside Markdown)
//   • scroll position on navigation (top, #hash, or restored on Back/Forward)
//   • Lenis smooth scrolling wired into GSAP ScrollTrigger
//   • scroll-reveal animations and the bento-card cursor spotlight
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect, useLayoutEffect, useRef } from "react";
import { useLocation, useNavigate, useNavigationType } from "react-router";
import { AppRoutes } from "@/routes";

// useLayoutEffect warns during server rendering; it never runs there anyway.
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

let lenis: Lenis | null = null;

function scrollToY(y: number) {
  if (lenis) lenis.scrollTo(y, { immediate: true, force: true });
  else window.scrollTo(0, y);
}

function scrollToHash(hash: string): boolean {
  const id = decodeURIComponent(hash.slice(1));
  const el = id ? document.getElementById(id) : null;
  if (!el) return false;
  if (lenis) lenis.scrollTo(el, { offset: -100 });
  else el.scrollIntoView({ behavior: "smooth" });
  return true;
}

/** Turns clicks on same-site <a href> links into client-side navigation. */
function useLinkInterception() {
  const navigate = useNavigate();
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || !a.href || a.hasAttribute("download") || a.getAttribute("rel")?.includes("external")) return;
      if (a.target && a.target !== "_self") return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      // Real files (sitemap.xml, llms.txt, videos, ...) are not pages.
      if (/\.[a-z0-9]+$/i.test(url.pathname) && !url.pathname.endsWith(".html")) return;
      e.preventDefault();
      const samePage = url.pathname === window.location.pathname && url.search === window.location.search;
      if (samePage && url.hash) {
        window.history.pushState(null, "", url.hash);
        scrollToHash(url.hash);
        return;
      }
      navigate(url.pathname.replace(/\.html$/, "") + url.search + url.hash);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [navigate]);
}

/** Lenis smooth scrolling, driving GSAP's ScrollTrigger. Runs once. */
function useSmoothScroll() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const instance = new Lenis();
    lenis = instance;
    instance.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      lenis = null;
    };
  }, []);
}

/** Scroll to top / #hash on navigation, restore the old position on Back/Forward. */
function useScrollOnNavigate() {
  const location = useLocation();
  const navType = useNavigationType();
  const positions = useRef(new Map<string, number>());
  const lastY = useRef(0);
  const prevKey = useRef<string | null>(null);

  useEffect(() => {
    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
    lastY.current = window.scrollY;
    const onScroll = () => {
      lastY.current = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useIsoLayoutEffect(() => {
    const leaving = prevKey.current;
    prevKey.current = location.key;
    if (leaving === null) {
      // First load: the browser already handled the scroll position, except for #hash with smooth scroll.
      if (location.hash) requestAnimationFrame(() => scrollToHash(location.hash));
      return;
    }
    // Remember where we were on the page we're leaving (read from the last scroll event,
    // because swapping in the new page may already have clamped window.scrollY).
    positions.current.set(leaving, lastY.current);
    if (navType === "POP") scrollToY(positions.current.get(location.key) ?? 0);
    else if (!location.hash || !scrollToHash(location.hash)) scrollToY(0);
    ScrollTrigger.refresh();
  }, [location.key]);
}

/** Fade + rise as elements enter the viewport, and the bento-card spotlight. Re-run per page. */
function usePageAnimations(pathname: string) {
  useIsoLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const firstSection = document.querySelector("main section, section");
      const inHero = (el: Element) => !!firstSection?.contains(el);
      const seen = new Set<Element>();

      for (const selector of [".section-intro", ".section-content .grid > *", ".bento-card", ".stars-list li"]) {
        const items = [...document.querySelectorAll(selector)].filter((el) => !inHero(el) && !seen.has(el));
        items.forEach((el) => seen.add(el));
        if (!items.length) continue;

        gsap.set(items, { opacity: 0, y: 32 });
        ScrollTrigger.batch(items, {
          start: "top 90%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              stagger: 0.1,
              overwrite: true,
              clearProps: "transform,opacity",
            }),
        });
      }
    });
    return () => ctx.revert();
  }, [pathname]);

  // Cursor spotlight on bento cards: feeds --mx / --my to the CSS glow.
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const card = (e.target as Element | null)?.closest?.<HTMLElement>(".bento-card");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => document.removeEventListener("pointermove", onMove);
  }, []);
}

export default function App() {
  const { pathname } = useLocation();
  useLinkInterception();
  useSmoothScroll();
  useScrollOnNavigate();
  usePageAnimations(pathname);
  return <AppRoutes />;
}
