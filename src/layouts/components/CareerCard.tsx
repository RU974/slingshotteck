interface Props {
  title: string;
  description: string;
  type: string;
  location: string;
  href: string;
}

export default function CareerCard({ title, description, type, location, href }: Props) {
  return (
    <div className="bg-white/5 rounded-2xl p-8 border border-border/50 backdrop-blur-sm">
      <div className="flex flex-col gap-4 mb-6">
        <h3 className="text-h5 font-bold text-white">
          <a href={href} className="hover:text-primary transition-colors duration-200">
            {title}
          </a>
        </h3>
        <p className="text-text leading-relaxed">{description}</p>
      </div>

      <hr className="border-border/50 mb-6" />

      <div className="flex items-center justify-between">
        <div className="flex gap-9">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-text" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path
                d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2M3 11h18M5 11v8a2 2 0 002 2h10a2 2 0 002-2v-8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-text text-base">{type}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-text" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 13a3 3 0 100-6 3 3 0 000 6z" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 22s8-7 8-12a8 8 0 10-16 0c0 5 8 12 8 12z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-text text-base">{location}</span>
          </div>
        </div>
        <a href={href} className="btn btn-outline text-sm px-6 py-3">
          Apply Now
        </a>
      </div>
    </div>
  );
}
