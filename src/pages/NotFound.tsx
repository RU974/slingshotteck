import { HeroGlow, SporeCanvas } from "@/components/Glows";
import Base from "@/layouts/Base";

export default function NotFound() {
  return (
    <Base title="Page Not Found" noindex>
      <section className="section-ph text-center relative overflow-hidden">
        <div className="container relative">
          <SporeCanvas />
          <div className="row justify-center">
            <div className="sm:col-10 md:col-8 lg:col-6">
              <span className="text-[8rem] block font-bold text-primary"> 404 </span>
              <h1 className="h2 mb-4">Page not found</h1>
              <div className="content">
                <p>
                  The page you are looking for might have been removed, had its name changed, or is temporarily
                  unavailable.
                </p>
              </div>
              <a href="/" className="btn btn-primary mt-8">
                Back to home
              </a>
            </div>
          </div>
        </div>
        <HeroGlow />
      </section>
    </Base>
  );
}
