// Pricing cards + section. Monthly/yearly toggle is animated by
// /scripts/animations.js ([data-pricing-toggle]). Plan buttons are plain links
// (set in src/content/pricing/-index.md, currently /contact).
import { GradientBlob } from "@/components/Glows";
import { getListPage } from "@/lib/content";
import type { Button } from "@/types";

interface Feature {
  label: string;
  included: boolean;
  tooltip?: string;
}

export interface Plan {
  price: string;
  yearly_price: string;
  title: string;
  is_featured?: boolean;
  offer_text?: string;
  button: Button;
  description?: string;
  features?: Feature[];
  price_suffix?: string;
  yearly_price_suffix?: string;
  monthly_note?: string;
  yearly_note?: string;
  yearly_badge?: string;
  limits?: string;
  trial?: string;
  includes_label?: string;
  is_custom?: boolean;
  min_seats?: number;
  max_seats?: number;
}

// Numeric prices get a "$" prefix; text such as "Custom" is shown as-is.
const money = (v: string) => (/^\d/.test(String(v)) ? `$${v}` : v);

function IncludedIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill="var(--color-primary)" />
      <path
        d="M11.1799 15.6864L17.6989 8.82757C18.1004 8.40902 18.1004 7.73247 17.6989 7.31392C17.2974 6.89536 16.6484 6.89536 16.2468 7.31392L10.4539 13.4159L7.75315 10.5847C7.35164 10.1661 6.70265 10.1661 6.30113 10.5847C5.89962 11.0032 5.89962 11.6798 6.30113 12.0983L9.72792 15.6864C9.92816 15.8951 10.191 16 10.4539 16C10.7168 16 10.9797 15.8951 11.1799 15.6864Z"
        fill="white"
      />
    </svg>
  );
}

function ExcludedIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect opacity="0.2" width="24" height="24" rx="6" fill="var(--color-text-light)" />
      <rect x="18" y="11" width="2" height="12" rx="1" transform="rotate(90 18 11)" fill="white" fillOpacity="0.4" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg
      className="mt-1 group-hover:text-primary text-white transition-colors duration-150"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9.375 9.375H10V13.75H10.625" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M10 7.5C10.5178 7.5 10.9375 7.08027 10.9375 6.5625C10.9375 6.04473 10.5178 5.625 10 5.625C9.48223 5.625 9.0625 6.04473 9.0625 6.5625C9.0625 7.08027 9.48223 7.5 10 7.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function PricingCard(plan: Plan) {
  const {
    price,
    yearly_price,
    title,
    is_featured = false,
    offer_text,
    button,
    description,
    features,
    price_suffix = "/ Per Month",
    yearly_price_suffix = price_suffix,
    monthly_note,
    yearly_note,
    yearly_badge,
    limits,
    trial,
    includes_label = "Features Included",
    is_custom = false,
  } = plan;

  return (
    <div
      className={`pricing-card py-10 px-7 rounded-3xl text-left relative ${
        is_featured ? "pricing-card-featured bg-light/50 overflow-hidden" : "bg-light/80"
      }`}
    >
      {is_featured && (
        <>
          <div className="absolute bottom-0 right-0 translate-y-1/2 translate-x-1/2 grid place-items-center -z-10">
            <div className="size-160 bg-radial from-primary to-transparent from-0% to-70% rounded-full" />
          </div>
          <div className="pricing-badge absolute top-6 right-5 transform text-xs font-semibold py-1.5 px-3 rounded-full">
            {offer_text ?? "Most Popular"}
          </div>
        </>
      )}

      <h3 className="text-h6 text-white">{title}</h3>
      <p className="text-sm text-text-dark mt-1 mb-6">{description}</p>

      <div className="leading-none relative mb-4">
        <span className="text-white text-h3 font-semibold price-tag opacity-0">I</span>
        <span className="block text-sm opacity-0 mt-2">I</span>
        <span className="price-tag absolute left-0 top-0" data-price-tag-monthly>
          <span className="text-white text-h3 font-semibold">{money(price)}</span>
          {!is_custom && <span className="ml-1 text-sm text-text">{price_suffix}</span>}
          {monthly_note && <span className="block mt-2 text-sm text-text-dark">{monthly_note}</span>}
        </span>
        <span className="price-tag opacity-0 absolute left-0 top-0" data-price-tag-yearly>
          <span className="text-white text-h3 font-semibold">{money(yearly_price)}</span>
          {!is_custom && <span className="ml-1 text-sm text-text">{yearly_price_suffix}</span>}
          {!is_custom && yearly_badge && (
            <span className="ml-2 align-middle rounded-md bg-primary/40 px-2 py-1 text-xs font-semibold text-white">
              {yearly_badge}
            </span>
          )}
          {yearly_note && <span className="block mt-2 text-sm text-text-dark">{yearly_note}</span>}
        </span>
      </div>

      {limits && <p className="text-sm text-text-dark">{limits}</p>}
      {trial && <p className="text-sm text-accent font-medium mt-2">{trial}</p>}

      {button.enable && (
        <a
          href={button.link}
          className={`btn ${is_featured && !is_custom ? "btn-primary" : "btn-outline"} w-full my-8 block text-center`}
        >
          {button.label}
        </a>
      )}

      <div className="text-white font-bold mb-6 uppercase text-sm tracking-wide">{includes_label}</div>

      <ul className="space-y-4">
        {(features || []).map((f) => (
          <li key={f.label} className="flex items-start gap-x-4">
            {f.included ? <IncludedIcon /> : <ExcludedIcon />}
            <span>{f.label}</span>
            {f.tooltip && (
              <div className="relative group">
                <InfoIcon />
                <div className="absolute bottom-full right-0 bg-text-light/5 backdrop-blur-lg py-2 px-3 rounded-lg hidden group-hover:block w-40 lg:w-75 text-sm text-white shadow-lg translate-x-1/2">
                  {f.tooltip}
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

interface PricingSectionProps {
  /** Override the section title HTML */
  title?: string;
  /** Override the section description */
  content?: string;
  isHome?: boolean;
}

export function PricingSection({ title, content, isHome = true }: PricingSectionProps) {
  const pricingData = getListPage("pricing", "-index").data;
  const sectionTitle = title ?? pricingData.page_header?.title ?? "";
  const sectionContent = content ?? pricingData.page_header?.content ?? "";

  return (
    <section className={`section-box ${isHome ? "" : "pt-0"} my-0 bg-transparent`} id="pricing">
      <div className="container">
        <div className="section-container">
          {isHome && (
            <div className="section-intro centralize">
              <h2 className="title hasHighlight" dangerouslySetInnerHTML={{ __html: sectionTitle }} />
              {sectionContent && <p>{sectionContent}</p>}
            </div>
          )}
          <div className="section-content">
            <div className="pricing-container">
              <div className="price-togger">
                <input type="checkbox" data-pricing-toggle id="pricing-toggle" className="hidden" />
                <label htmlFor="pricing-toggle" className="price-toggler-btn active">
                  {pricingData.toggler?.monthly_label ?? "Monthly"}
                </label>
                <label htmlFor="pricing-toggle" className="price-toggler-btn">
                  {pricingData.toggler?.yearly_label ?? "Yearly"}
                </label>
              </div>
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-7 relative z-10">
                {(pricingData.plans as Plan[]).map((plan) => (
                  <PricingCard key={plan.title} {...plan} />
                ))}
              </div>
            </div>
            <GradientBlob />
          </div>
        </div>
      </div>
    </section>
  );
}
