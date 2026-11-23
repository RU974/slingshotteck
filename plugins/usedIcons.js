// Vite plugin: exposes `virtual:used-icons`, re-exporting only the Font Awesome 6
// icons (react-icons/fa6) whose names appear somewhere in src/ — in Markdown
// front matter, config JSON or code (e.g. `icon: FaRocket`, `icon="FaCheck"`).
// <DynamicIcon> looks icons up by name, which would otherwise force the whole
// ~2,000-icon set into the browser bundle.
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const VIRTUAL_ID = "virtual:used-icons";
const RESOLVED_ID = "\0" + VIRTUAL_ID;
const SCAN = /\.(md|mdx|json|ya?ml|ts|tsx|js|jsx)$/i;
const ICON_NAME = /\bFa[A-Z][A-Za-z0-9]+\b/g;

function listFiles(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) listFiles(full, out);
    else if (SCAN.test(entry.name)) out.push(full);
  }
  return out;
}

export default function usedIcons() {
  let root = process.cwd();
  let available;
  return {
    name: "slingshot-used-icons",
    configResolved(config) {
      root = config.root;
    },
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID;
    },
    load(id) {
      if (id !== RESOLVED_ID) return;
      available ??= new Set(Object.keys(createRequire(path.join(root, "package.json"))("react-icons/fa6")));
      const names = new Set();
      for (const file of listFiles(path.join(root, "src"))) {
        this.addWatchFile(file);
        for (const name of fs.readFileSync(file, "utf-8").match(ICON_NAME) ?? []) {
          if (available.has(name)) names.add(name);
        }
      }
      const list = [...names].sort();
      return `export { ${list.join(", ")} } from "react-icons/fa6";`;
    },
  };
}
