import { useState } from "react";

export default function Accordion({ title, content }: { title: string; content?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`accordion ${open ? "active" : ""}`}>
      <button type="button" className="accordion-header" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
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
