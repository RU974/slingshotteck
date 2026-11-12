import { Share } from "@/components/Brand";
import Faq from "@/components/Faq";
import ImageMod from "@/components/ImageMod";
import config from "@/config/config.json";
import Base from "@/layouts/Base";
import { getSinglePage, type Entry } from "@/lib/content";
import dateFormat from "@/lib/utils/dateFormat";
import { markdownify } from "@/lib/utils/textConverter";
import { PostCard } from "@/pages/Blog";
import type { BlogPost as Post } from "@/types";

export default function BlogPost({ post }: { post: Entry<Post> }) {
  const data = post.data;
  const siteUrl = config.site.base_url.replace(/\/$/, "");
  const postUrl = `${siteUrl}/blog/${post.id}`;

  const articleSchema = [
    {
      "@type": "BlogPosting",
      "@id": `${postUrl}#article`,
      headline: data.title,
      description: data.description,
      image: `${siteUrl}${data.image || config.metadata.meta_image}`,
      datePublished: data.date ? new Date(data.date).toISOString() : undefined,
      dateModified: new Date(data.updated ?? data.date ?? Date.now()).toISOString(),
      author: { "@type": "Person", "@id": `${siteUrl}/about#founder`, name: data.author },
      publisher: { "@id": `${siteUrl}/#organization` },
      mainEntityOfPage: { "@id": `${postUrl}#webpage` },
      keywords: data.tags?.join(", "),
      inLanguage: "en",
    },
  ];

  // Related posts: on-site articles first, then external ones.
  const relatedPosts = getSinglePage<Post>("blog")
    .filter((p) => p.id !== post.id)
    .sort((a, b) => Number(Boolean(a.data.external_url)) - Number(Boolean(b.data.external_url)))
    .slice(0, 3);

  return (
    <Base
      {...data}
      type="article"
      schema={articleSchema}
      breadcrumbs={[
        { name: "Blog", url: "/blog" },
        { name: data.title, url: `/blog/${post.id}` },
      ]}
    >
      {/* Hero */}
      <section className="section-ph relative pb-10 lg:pb-14">
        <div className="container">
          <div className="mx-auto max-w-246.25 text-center">
            <h1
              className="hasHighlight mb-8 text-h4-sm md:text-h1 leading-[1.1]"
              dangerouslySetInnerHTML={{ __html: markdownify(data.title) }}
            />

            <div className="overflow-hidden rounded-2xl border border-white/10">
              <ImageMod
                src={data.image || "/images/blog/featured-cover.png"}
                alt={data.title}
                width={1200}
                height={600}
                className="h-full w-full object-cover"
                loading="eager"
              />
            </div>

            <div className="mx-auto mt-6 flex max-w-140 flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm md:text-base text-text">
              <span className="inline-flex items-center gap-2">
                <ImageMod
                  src={data.author_image ?? "/images/blog/author-1.png"}
                  width={24}
                  height={24}
                  className="size-6 rounded-full"
                  alt={data.author}
                />
                {data.author}
              </span>
              <span className="inline-flex items-center gap-2">
                <i className="fa-regular fa-calendar-days text-xs" aria-hidden="true" />
                {dateFormat(data.date ?? new Date())}
              </span>
              {data.read_time && (
                <span className="inline-flex items-center gap-2">
                  <i className="fa-regular fa-clock text-xs" aria-hidden="true" />
                  {data.read_time}
                </span>
              )}
            </div>

            <hr className="mt-8 h-px border-0 bg-linear-to-r from-transparent via-white/15 to-transparent" />
          </div>
        </div>

        <div className="absolute inset-0 h-full w-full overflow-hidden -z-10">
          <canvas className="heroSporeCanvas w-full opacity-70" />
        </div>
        <div
          className="absolute left-1/2 top-0 -z-20 size-170 -translate-x-1/2 -translate-y-1/2 blur-2xl xl:size-300"
          style={{
            background:
              "radial-gradient(circle, var(--color-primary) 0%, color-mix(in srgb, var(--color-primary) 78%, transparent) 20%, transparent 70%)",
          }}
        />
        <div className="absolute bottom-0 left-0 h-40 w-full -z-10 bg-linear-180 from-transparent to-body" />
      </section>

      {/* Article */}
      <section className="section">
        <div className="container">
          <div className="mx-auto flex max-w-322.5 flex-col gap-20">
            <article>
              <div className="content" dangerouslySetInnerHTML={{ __html: post.html }} />
            </article>

            {data.faqs && data.faqs.length > 0 && (
              <Faq title="Frequently asked questions" description={data.description ?? ""} items={data.faqs} />
            )}

            <div className="flex flex-wrap items-center gap-6 md:gap-8">
              <h4 className="text-h5 md:text-h4 mb-0">Share:</h4>
              <Share className="social-icons" />
            </div>
          </div>
        </div>
      </section>

      {/* Read More */}
      {relatedPosts.length > 0 && (
        <section className="section pb-34">
          <div className="container relative isolate">
            <div className="mb-12 text-center">
              <h2 className="text-h3-sm md:text-h2 capitalize">Read More Articles</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {relatedPosts.map((p) => (
                <PostCard key={p.id} post={p} />
              ))}
            </div>
            <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-310.5 -translate-x-1/2 -translate-y-1/3 rounded-full bg-radial from-primary/16 from-0% to-transparent to-70% blur-2xl" />
          </div>
        </section>
      )}
    </Base>
  );
}
