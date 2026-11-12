// Vite plugin: turns every `.md` file into a JS module at build time.
//   import post from "./post.md"  ->  { data, html, body }
// `data` is the YAML front matter, `html` is the rendered Markdown body.
// Headings get GitHub-style ids so in-page anchors keep working.
import GithubSlugger from "github-slugger";
import matter from "gray-matter";
import { Marked } from "marked";

function renderMarkdown(source) {
  const slugger = new GithubSlugger();
  const marked = new Marked({ gfm: true });
  marked.use({
    renderer: {
      heading({ tokens, depth, text }) {
        const inner = this.parser.parseInline(tokens);
        const id = slugger.slug(text.replace(/<[^>]+>/g, ""));
        return `<h${depth} id="${id}">${inner}</h${depth}>\n`;
      },
    },
  });
  return marked.parse(source);
}

export default function markdown() {
  return {
    name: "slingshot-markdown",
    enforce: "pre",
    transform(code, id) {
      if (!id.split("?")[0].endsWith(".md")) return null;
      const { data, content } = matter(code);
      const mod = { data, html: renderMarkdown(content), body: content };
      return { code: `export default ${JSON.stringify(mod)};`, map: null };
    },
  };
}
