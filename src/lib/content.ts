// Content layer: replaces Astro content collections.
// Every Markdown file in src/content is compiled at build time by
// plugins/markdown.js and bundled into the server build.

export interface Entry<T = Record<string, any>> {
  /** File name without extension, e.g. "cloud-solutions" or "-index". */
  id: string;
  data: T;
  /** Rendered HTML of the Markdown body. */
  html: string;
  /** Raw Markdown body. */
  body: string;
}

type MdModule = { data: Record<string, any>; html: string; body: string };

const files = import.meta.glob<MdModule>("/src/content/**/*.md", {
  eager: true,
  import: "default",
});

// Per-collection defaults (previously Zod `.default()` values).
const defaults: Record<string, (data: Record<string, any>) => Record<string, any>> = {
  blog: (d) => ({
    author: "Admin",
    categories: ["others"],
    tags: ["others"],
    ...d,
  }),
  services: (d) => ({
    icon: "FaGears",
    order: 99,
    highlights: [],
    deliverables: [],
    faqs: [],
    related: [],
    ...d,
  }),
};

const collections = new Map<string, Entry<any>[]>();

for (const [path, mod] of Object.entries(files)) {
  const rel = path.replace(/^\/src\/content\//, "");
  const slash = rel.indexOf("/");
  if (slash === -1) continue;
  const name = rel.slice(0, slash);
  const id = rel.slice(slash + 1).replace(/\.md$/, "");
  const withDefaults = defaults[name] ? defaults[name](mod.data) : mod.data;
  const entry: Entry = { id, data: withDefaults, html: mod.html, body: mod.body };
  if (!collections.has(name)) collections.set(name, []);
  collections.get(name)!.push(entry);
}

/** All publishable entries of a collection (no drafts, no "-index" files). */
export function getSinglePage<T = any>(collection: string): Entry<T>[] {
  return (collections.get(collection) ?? []).filter(
    (e) => !e.data?.draft && !e.id.startsWith("-"),
  ) as Entry<T>[];
}

/** One entry by file name (e.g. "-index", "faq"). Throws if it is missing. */
export function getListPage<T = any>(collection: string, id: string): Entry<T> {
  const entry = (collections.get(collection) ?? []).find((e) => e.id === id);
  if (!entry) {
    throw new Error(`No page found for collection "${collection}" with file "${id}"`);
  }
  return entry as Entry<T>;
}

/** Shared section files in src/content/sections. */
export function getSection<T = any>(id: string): T {
  return getListPage<T>("sections", id).data;
}
