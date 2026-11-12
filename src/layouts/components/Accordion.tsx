// Open/close is handled by /scripts/main.js via [data-accordion].
export default function Accordion({ title, content }: { title: string; content?: string }) {
  return (
    <div className="accordion">
      <button className="accordion-header" data-accordion>
        {title}
        <svg className="accordion-icon" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0.75 5.41602H10.0833"
            stroke="var(--color-text-dark)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.41663 10.083L5.41663 0.749675"
            className="accordion-icon-vertical-line"
            stroke="var(--color-text-dark)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div className="accordion-content">
        <p dangerouslySetInnerHTML={{ __html: content ?? "" }} />
      </div>
    </div>
  );
}
