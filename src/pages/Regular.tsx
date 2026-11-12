// Simple Markdown pages from src/content/pages (privacy policy, terms, ...).
import PageHeader from "@/components/PageHeader";
import Base from "@/layouts/Base";
import type { Entry } from "@/lib/content";

export default function Regular({ page }: { page: Entry }) {
  const { title, description } = page.data;
  return (
    <Base {...page.data}>
      <PageHeader title={title} subtitle={description ?? ""} />
      <section className="section-sm">
        <div className="container">
          <div className="row justify-center">
            <div className="lg:col-10">
              <div className="content" dangerouslySetInnerHTML={{ __html: page.html }} />
            </div>
          </div>
        </div>
      </section>
    </Base>
  );
}
