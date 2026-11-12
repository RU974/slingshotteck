// URL -> page. Every page is pre-rendered to static HTML at build time; there is no client-side
// router, so links are ordinary <a href> page loads (fast, SEO-friendly, and
// compatible with the DOM scripts in /public/scripts).
import type { ReactElement } from "react";
import { getSinglePage } from "@/lib/content";
import About from "@/pages/About";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import CareerPost from "@/pages/CareerPost";
import Careers from "@/pages/Careers";
import Contact from "@/pages/Contact";
import Crm from "@/pages/Crm";
import Home from "@/pages/Home";
import Hrms from "@/pages/Hrms";
import Integrations from "@/pages/Integrations";
import NotFound from "@/pages/NotFound";
import Pricing from "@/pages/Pricing";
import Regular from "@/pages/Regular";
import ServicePost from "@/pages/ServicePost";
import Services from "@/pages/Services";
import type { BlogPost as Post, Service } from "@/types";

type Match = { element: ReactElement; status: number };

const staticRoutes: Record<string, () => ReactElement> = {
  "/": () => <Home />,
  "/about": () => <About />,
  "/blog": () => <Blog />,
  "/careers": () => <Careers />,
  "/contact": () => <Contact />,
  "/crm": () => <Crm />,
  "/hrms": () => <Hrms />,
  "/integrations": () => <Integrations />,
  "/pricing": () => <Pricing />,
  "/services": () => <Services />,
};

// On-site blog posts (posts with external_url only link out).
const blogPosts = () => getSinglePage<Post>("blog").filter((p) => !p.data.external_url);

export function matchRoute(pathname: string): Match {
  const path = pathname.replace(/\/+$/, "") || "/";

  if (staticRoutes[path]) return { element: staticRoutes[path](), status: 200 };

  const parts = path.split("/").filter(Boolean).map(decodeURIComponent);

  if (parts.length === 2) {
    const [section, slug] = parts;
    if (section === "blog") {
      const post = blogPosts().find((p) => p.id === slug);
      if (post) return { element: <BlogPost post={post} />, status: 200 };
    }
    if (section === "careers") {
      const job = getSinglePage("careers").find((j) => j.id === slug);
      if (job) return { element: <CareerPost job={job} />, status: 200 };
    }
    if (section === "services") {
      const service = getSinglePage<Service>("services").find((s) => s.id === slug);
      if (service) return { element: <ServicePost service={service} />, status: 200 };
    }
  }

  if (parts.length === 1) {
    const page = getSinglePage("pages").find((p) => p.id === parts[0]);
    if (page) return { element: <Regular page={page} />, status: 200 };
  }

  return { element: <NotFound />, status: 404 };
}

/** Every indexable URL, for the sitemap. */
export function allPaths(): string[] {
  return [
    ...Object.keys(staticRoutes),
    ...blogPosts().map((p) => `/blog/${p.id}`),
    ...getSinglePage("services").map((s) => `/services/${s.id}`),
    ...getSinglePage("pages").map((p) => `/${p.id}`),
    // Career detail pages are intentionally left out (thin / short-lived).
  ];
}

/** Every URL that gets a static HTML file at build time (sitemap URLs + career pages). */
export function prerenderPaths(): string[] {
  return [...allPaths(), ...getSinglePage("careers").map((j) => `/careers/${j.id}`)];
}
