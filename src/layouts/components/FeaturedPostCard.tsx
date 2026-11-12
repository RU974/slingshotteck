import ImageMod from "@/components/ImageMod";

interface Props {
  tag: string;
  title: string;
  description: string;
  authorImage: string;
  authorName: string;
  date: string;
  readTime: string;
  href: string;
  external?: boolean;
}

export default function FeaturedPostCard({
  tag,
  title,
  description,
  authorImage,
  authorName,
  date,
  readTime,
  href,
  external = false,
}: Props) {
  return (
    <article className="rounded-2xl border border-white/15 bg-linear-[114deg] from-transparent from-5% to-primary-light/10 to-86% p-6 md:p-9">
      <div className="mb-7 inline-flex rounded-[10px] bg-white px-2 py-1.5 text-sm leading-5 text-dark">{tag}</div>

      <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
        <h2 className="mb-4 text-h4-sm md:text-h4 leading-[1.2] text-white">
          {title}
          {external && (
            <i className="fa-solid fa-arrow-up-right-from-square ml-2 text-lg align-middle" aria-hidden="true" />
          )}
        </h2>
      </a>
      <p className="mb-11 text-h6-sm md:text-xl text-text-dark leading-8">{description}</p>

      <hr className="mb-6 h-px border-0 bg-linear-to-r from-transparent via-white/10 to-transparent" />

      <div className="flex flex-wrap items-center lg:justify-between gap-x-6 gap-y-3 text-text text-sm md:text-base">
        <span className="inline-flex items-center gap-2">
          <ImageMod src={authorImage} width={24} height={24} className="size-6 rounded-full" alt={authorName} />
          {authorName}
        </span>
        <span className="inline-flex items-center gap-2">
          <i className="fa-regular fa-calendar-days text-sm" aria-hidden="true" />
          {date}
        </span>
        <span className="inline-flex items-center gap-2">
          <i className="fa-regular fa-clock text-sm" aria-hidden="true" />
          {readTime}
        </span>
      </div>
    </article>
  );
}
