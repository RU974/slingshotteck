import BlogCard from "@/components/BlogCard";
import CallToAction from "@/components/CallToAction";
import FeaturedPostCard from "@/components/FeaturedPostCard";
import { HeroGlow, SporeCanvas } from "@/components/Glows";
import ImageMod from "@/components/ImageMod";
import Base from "@/layouts/Base";
import { getListPage, getSinglePage, type Entry } from "@/lib/content";
import dateFormat from "@/lib/utils/dateFormat";
import { sortByDate } from "@/lib/utils/sortFunctions";
import { markdownify } from "@/lib/utils/textConverter";
import type { BlogPost } from "@/types";

export const postHref = (post: Entry<BlogPost>) => post.data.external_url ?? `/blog/${post.id}`;

export function PostCard({ post }: { post: Entry<BlogPost> }) {
  return (
    <BlogCard
      image={post.data.image || "/images/blog/post-1.png"}
      imageAlt={post.data.title}
      title={post.data.title}
      description={post.data.description ?? ""}
      authorImage={post.data.author_image ?? "/images/blog/author-1.png"}
      authorName={post.data.author}
      date={dateFormat(post.data.date ?? new Date())}
      href={postHref(post)}
      external={Boolean(post.data.external_url)}
    />
  );
}

export default function Blog() {
  const pageData = getListPage("blog", "-index").data;
  const allPosts = sortByDate(getSinglePage<BlogPost>("blog"));

  // Featured post: the one named in content, falling back to the newest.
  const featuredId = pageData.page_header?.featured_post;
  const featured = (featuredId && allPosts.find((p) => p.id === featuredId)) || allPosts[0];
  const latestPosts = allPosts.filter((p) => p.id !== featured?.id);

  return (
    <Base {...pageData}>
      <section className="section-ph pb-10 relative">
        <div className="container relative">
          <SporeCanvas canvasClass="heroSporeCanvas w-full opacity-70" />
          <div className="lg:max-w-4xl mx-auto text-center relative z-10">
            <h1
              className="hasHighlight mb-0"
              dangerouslySetInnerHTML={{ __html: markdownify(pageData.page_header?.title ?? pageData.title) }}
            />
          </div>
        </div>
        <HeroGlow />
      </section>

      {/* Featured Article */}
      {(pageData.featured_post?.enable ?? true) && featured && (
        <section className="section pt-0">
          <div className="container">
            <div className="grid gap-4 lg:grid-cols-[1fr_1.03fr]">
              <div className="overflow-hidden rounded-2xl border border-white/10">
                <ImageMod
                  src={featured.data.image || "/images/blog/featured-cover.png"}
                  alt={featured.data.title}
                  width={700}
                  height={500}
                  className="h-full w-full object-cover"
                  loading="eager"
                />
              </div>
              <FeaturedPostCard
                tag={featured.data.tag ?? "Popular"}
                title={featured.data.title}
                description={featured.data.description ?? ""}
                authorImage={featured.data.author_image ?? "/images/blog/author-1.png"}
                authorName={featured.data.author}
                date={dateFormat(featured.data.date ?? new Date())}
                readTime={featured.data.read_time ?? "5 min read"}
                href={postHref(featured)}
                external={Boolean(featured.data.external_url)}
              />
            </div>

            <hr className="mt-16 h-px border-0 bg-linear-to-r from-transparent via-white/15 to-transparent" />
          </div>
        </section>
      )}

      {/* Latest Articles */}
      {(pageData.latest_posts?.enable ?? true) && (
        <section className="section pt-10 lg:pt-14">
          <div className="container relative isolate">
            <div className="mb-12 text-center">
              <h2 className="text-h3-sm md:text-h2 capitalize">
                {pageData.latest_posts?.title ?? "Latest Content From Us"}
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {latestPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-310.5 -translate-x-1/2 -translate-y-1/3 rounded-full bg-radial from-primary/16 from-0% to-transparent to-70% blur-2xl" />
          </div>
        </section>
      )}

      <CallToAction />
    </Base>
  );
}
