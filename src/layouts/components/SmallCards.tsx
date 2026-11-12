// Small presentational cards (each was its own .astro file before).
import ImageMod from "@/components/ImageMod";
import DynamicIcon from "@/helpers/DynamicIcon";

const STAR_POSITIONS = [
  "top-0 left-0 -translate-x-1/2 -translate-y-1/2",
  "top-0 right-0 translate-x-1/2 -translate-y-1/2",
  "bottom-0 left-0 -translate-x-1/2 translate-y-1/2",
  "bottom-0 right-0 translate-x-1/2 translate-y-1/2",
];

export function FeatureCard({ logo, title, is_starred }: { logo: string; title: string; is_starred: boolean }) {
  return (
    <div className="p-8 xl:px-10 xl:py-11 border-t border-l border-text-light/5 relative">
      <ImageMod src={logo} alt={`${title} icon`} className="mb-6 mx-auto" />
      <h3 className="text-h5-sm font-bold mb-4 text-center">{title}</h3>
      <p className="text-center">Visualize how teams are staffed &amp; what resources are available across.</p>
      {STAR_POSITIONS.map((pos) => (
        <svg
          key={pos}
          data-is-starred={String(is_starred)}
          className={`absolute z-10 ${pos} hidden`}
          width="23"
          height="23"
          viewBox="0 0 23 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.5"
            d="M11.5 0C11.5 0 11.3776 6.44974 13.9639 9.03606C16.5503 11.6224 23 11.5 23 11.5C23 11.5 16.5503 11.3776 13.9639 13.9639C11.3776 16.5503 11.5 23 11.5 23C11.5 23 11.6224 16.5503 9.03606 13.9639C6.44974 11.3776 0 11.5 0 11.5C0 11.5 6.44974 11.6224 9.03606 9.03606C11.6224 6.44974 11.5 0 11.5 0Z"
            fill="var(--color-text-light)"
          />
        </svg>
      ))}
    </div>
  );
}

export function ValueCard({ logo, title, list }: { logo: string; title: string; list?: string[] }) {
  return (
    <div className="p-8 rounded-2xl bg-white/5">
      <ImageMod src={logo} alt={`${title} icon`} className="mb-6" />
      <h3 className="text-h5-sm font-bold">{title}</h3>
      <ul className="stars-list mt-5 text-text-dark">
        {list?.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
    </div>
  );
}

export function ProcessCard({ logo, title, content }: { logo: string; title: string; content: string }) {
  return (
    <div className="p-8 xl:px-10 xl:py-11 rounded-2xl border border-border flex flex-col items-center text-center">
      <ImageMod src={logo} alt={`${title} icon`} className="mb-6" />
      <h3 className="text-h5-sm font-bold font-secondary">{title}</h3>
      <div className="w-px h-11 my-4 bg-text-dark/30" />
      <p>{content}</p>
    </div>
  );
}

export function ShowcaseCard({
  title,
  subtitle,
  image,
  classNames = "",
}: {
  title: string;
  subtitle: string;
  image: string;
  classNames?: string;
}) {
  return (
    <div
      className={`flex flex-col justify-between relative bg-primary/5 border border-border/50 rounded-2xl overflow-hidden ${classNames}`}
    >
      <div className="p-6 pt-10 text-center">
        <h3 className="text-h5-sm text-white font-semibold mb-2">{title}</h3>
        <p className="text-text text-sm leading-relaxed">{subtitle}</p>
      </div>
      <div className="relative flex items-center justify-center p-8">
        <ImageMod src={image} alt={title} className="w-full object-contain" />
      </div>
    </div>
  );
}

export function TeamCard({ image, name, role }: { image: string; name: string; role: string }) {
  return (
    <div className="text-center group">
      <div className="relative overflow-hidden rounded-3xl mb-6 bg-text/10">
        <ImageMod
          src={image}
          alt={name}
          className="w-full aspect-square object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-primary-light/60 via-transparent to-transparent opacity-100 transition-opacity duration-300 -z-10" />
      </div>
      <h4 className="text-h5-sm font-bold text-white mb-1">{name}</h4>
      <p className="text-text text-sm">{role}</p>
    </div>
  );
}

export function IntegrationCard({ icon, title, iconClass }: { icon: string; title: string; iconClass?: string }) {
  return (
    <div className="p-6 xl:p-8 rounded-2xl bg-light border border-border group hover:border-primary/30 transition-all duration-300 text-center">
      <div className="mb-4 size-14 mx-auto rounded-xl bg-white/5 grid place-items-center">
        <DynamicIcon icon={icon} className={`text-3xl ${iconClass ?? ""}`} />
      </div>
      <h3 className="text-h6 font-semibold text-white">{title}</h3>
    </div>
  );
}
