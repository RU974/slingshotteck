import config from "@/config/config.json";

export default function CareerApplyForm() {
  return (
    <div className="bg-white/5 rounded-2xl p-8 xl:py-10 border border-border/50 backdrop-blur-sm sticky top-26">
      <h3 className="text-h4 font-bold text-white mb-8">Apply for position</h3>

      <form className="space-y-5" action={config.params.apply_form_action} method="POST" encType="multipart/form-data">
        <div>
          <input type="text" placeholder="Name" className="form-input w-full" required name="name" />
        </div>

        <div>
          <input type="email" placeholder="Email Address" className="form-input w-full" required name="email" />
        </div>

        <div>
          <label className="block w-full cursor-pointer">
            <input type="file" className="hidden" accept=".pdf,.doc,.docx" name="cv" required />
            <div className="form-input rounded-full! border border-dashed border-border px-6 py-5 flex items-center gap-3 transition hover:border-primary">
              <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path
                  d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-white font-medium">Upload CV file</span>
              <span className="text-text text-sm">or drag and drop</span>
            </div>
          </label>
        </div>

        <div>
          <textarea
            placeholder="Why are you applying?"
            className="form-input rounded-4xl! w-full resize-none"
            rows={4}
            required
            name="why_applying"
          />
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Apply Now
        </button>
      </form>
    </div>
  );
}
