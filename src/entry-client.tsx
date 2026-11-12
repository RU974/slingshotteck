// Browser entry: hydrates the interactive islands and wires up small DOM
// enhancements. Everything else on the page is static server-rendered HTML.
import { hydrateRoot } from "react-dom/client";
import { islands, type IslandName } from "@/islands";

document.querySelectorAll<HTMLElement>("[data-island]").forEach((el) => {
  const Component = islands[el.dataset.island as IslandName] as React.ComponentType<any> | undefined;
  if (!Component) return;
  const props = JSON.parse(el.dataset.props || "{}");
  hydrateRoot(el, <Component {...props} />);
});

// Business Needs cards: reveal on scroll (styles in styles/business-needs.css).
document.documentElement.classList.add("js");
const cards = document.querySelectorAll<HTMLElement>(".bn-card");
if (cards.length) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.2 },
  );
  cards.forEach((c) => io.observe(c));
}
