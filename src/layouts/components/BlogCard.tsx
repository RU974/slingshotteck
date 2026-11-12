import ImageMod from "@/components/ImageMod";

interface Props {
  image: string;
  imageAlt: string;
  title: string;
  description: string;
  authorImage: string;
  authorName: string;
  date: string;
  href: string;
  external?: boolean;
  cardClass?: string;
}

export default function BlogCard({
  image,
  imageAlt,
  title,
  description,
  authorImage,
  authorName,
  date,
  href,
  external = false,
  cardClass = "",
}: Props) {
  return (
    <article className="flex flex-col justify-between">
      <ImageMod
        src={image}
        alt={imageAlt}
        width={600}
        height={310}
        className="w-full min-h-77.5 object-cover rounded-2xl mb-2.5"
      />
      <div
        className={`rounded-2xl overflow-hidden bg-text-light/5 p-6 h-full flex flex-col justify-between ${cardClass}`}
      >
        <div>
          <a
            href={href}
            className="hover:text-primary! hover:underline"
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
          >
            <h3 className="mb-3 text-h5-sm text-white">
              {title}
              {external && (
                <i className="fa-solid fa-arrow-up-right-from-square ml-2 text-xs align-middle" aria-hidden="true" />
              )}
            </h3>
          </a>
          <p className="mb-5 text-sm leading-6 text-text">{description}</p>
        </div>
        <div>
          <hr className="mb-4 h-px border-0 bg-linear-to-r from-transparent via-white/10 to-transparent" />
          <div className="flex items-center justify-between gap-2 text-sm text-text">
            <span className="inline-flex items-center gap-2">
              <ImageMod src={authorImage} width={20} height={20} className="size-5 rounded-full" alt={authorName} />
              {authorName}
            </span>
            <span className="inline-flex items-center gap-2">
              <i className="fa-regular fa-calendar-days text-xs" aria-hidden="true" />
              {date}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
