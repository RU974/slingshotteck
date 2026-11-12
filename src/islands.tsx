// "Islands": the only React components that are hydrated in the browser.
// Every page is rendered to static HTML on the server; components wrapped in
// <Island> are additionally made interactive on the client by entry-client.tsx.
// Everything else stays plain HTML (+ the DOM scripts in /public/scripts).
import type { ComponentType } from "react";
import ContactForm from "@/components/ContactForm";
import LeadForm from "@/components/LeadForm";

export const islands = {
  LeadForm,
  ContactForm,
} satisfies Record<string, ComponentType<any>>;

export type IslandName = keyof typeof islands;

export function Island<N extends IslandName>({
  name,
  props,
}: {
  name: N;
  props: React.ComponentProps<(typeof islands)[N]>;
}) {
  const Component = islands[name] as ComponentType<any>;
  return (
    <div data-island={name} data-props={JSON.stringify(props)} style={{ display: "contents" }}>
      <Component {...(props as object)} />
    </div>
  );
}
