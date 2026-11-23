// URL -> page, with React Router. The same <AppRoutes> renders on the server
// (pre-rendering every page to static HTML at build time) and in the browser
// (client-side navigation after the first page load).
import { Route, Routes, useParams } from "react-router";
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

const staticRoutes = {
  "/": Home,
  "/about": About,
  "/blog": Blog,
  "/careers": Careers,
  "/contact": Contact,
  "/crm": Crm,
  "/hrms": Hrms,
  "/integrations": Integrations,
  "/pricing": Pricing,
  "/services": Services,
};

// On-site blog posts (posts with external_url only link out).
const blogPosts = () => getSinglePage<Post>("blog").filter((p) => !p.data.external_url);

function BlogPostRoute() {
  const { slug } = useParams();
  const post = blogPosts().find((p) => p.id === slug);
  return post ? <BlogPost post={post} /> : <NotFound />;
}

function CareerPostRoute() {
  const { slug } = useParams();
  const job = getSinglePage("careers").find((j) => j.id === slug);
  return job ? <CareerPost job={job} /> : <NotFound />;
}

function ServicePostRoute() {
  const { slug } = useParams();
  const service = getSinglePage<Service>("services").find((s) => s.id === slug);
  return service ? <ServicePost service={service} /> : <NotFound />;
}

// Markdown pages in src/content/pages (privacy policy, terms, ...).
function RegularRoute() {
  const { slug } = useParams();
  const page = getSinglePage("pages").find((p) => p.id === slug);
  return page ? <Regular page={page} /> : <NotFound />;
}

export function AppRoutes() {
  return (
    <Routes>
      {Object.entries(staticRoutes).map(([path, Page]) => (
        <Route key={path} path={path} element={<Page />} />
      ))}
      <Route path="/blog/:slug" element={<BlogPostRoute />} />
      <Route path="/careers/:slug" element={<CareerPostRoute />} />
      <Route path="/services/:slug" element={<ServicePostRoute />} />
      <Route path="/:slug" element={<RegularRoute />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
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
