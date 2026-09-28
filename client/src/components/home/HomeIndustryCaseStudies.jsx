import React from "react";

const caseStudies = [
  {
    tag: "Snack & Food Packaging",
    headline: "Printed 120,000 Meters Non-Stop with Zero Blade Stops",
    press: "10-Color Rotogravure Printing Machine (450 m/min)",
    metric: "+38%",
    metricLabel: "Longer Blade Life",
    challenge: "Cheap blades kept making ink streaks every 4 hours, forcing the plant to stop the press and waste hundreds of meters of expensive film.",
    solution: "Switched to WIPEX carbon steel doctor blades running at gentle, light wiping pressure.",
    result: "Completed a 120,000-meter continuous print run without a single blade change or streak stop.",
  },
  {
    tag: "Flexo & Cardboard Boxes",
    headline: "Zero Scratched Rollers & 100% Safe Hand Cleaning",
    press: "8-Color Flexographic Printing Press (380 m/min)",
    metric: "100%",
    metricLabel: "Roller Protection",
    challenge: "Sharp steel blades scratched two expensive ceramic rollers in 3 months (costing ₹7+ Lakhs) and cut operator fingers during washdowns.",
    solution: "Installed WIPEX polymer (plastic) doctor blades inside closed ink chambers.",
    result: "Zero roller scratches over 14 consecutive months and 100% safe, cut-free blade changes for workers.",
  },
  {
    tag: "Laminates & Paper Printing",
    headline: "Saved 8% on Expensive White Ink Every Single Day",
    press: "Wide-Web Printing & Coating Machine (2.2 Meter Width)",
    metric: "-8.2%",
    metricLabel: "Less Ink Wasted",
    challenge: "Old blades leaked excess white ink onto the film, wasting expensive ink and causing uneven color coats.",
    solution: "Installed wear-resistant WIPEX stainless steel doctor blades that resist gritty white pigments.",
    result: "Saved 45 kg of white ink every 24-hour shift while keeping colors bright and completely solid.",
  },
];

export default function HomeIndustryCaseStudies({ locationData }) {
  const locName = locationData ? locationData.name : "India";

  return (
    <section className="py-10 sm:py-16 lg:py-24 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 px-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200/80 mb-2 sm:mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            Proven Real-World Savings
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3 sm:mb-4">
            Quantifiable Impact in <span className="text-blue-600">Pressroom Operations</span>
          </h2>
          <p className="text-xs sm:text-base md:text-lg text-slate-700 leading-relaxed">
            See how printing and packaging factories save time, cut ink waste, and protect expensive rollers with WIPEX Doctor Blades {locName ? `in ${locName}` : "across India"}.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {caseStudies.map((cs, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-7 lg:p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between pb-3 sm:pb-3.5 border-b border-slate-100 mb-3 sm:mb-5">
                  <span className="text-[11px] sm:text-xs font-bold text-blue-700 bg-blue-50 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md sm:rounded-lg border border-blue-200/60 uppercase tracking-wider">
                    {cs.tag}
                  </span>
                  <span className="text-[11px] sm:text-xs text-slate-500 font-mono font-bold">Case 0{idx + 1}</span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2.5 sm:mb-3 group-hover:text-blue-600 transition-colors leading-snug">
                  {cs.headline}
                </h3>

                <div className="bg-slate-50 p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200 mb-4 sm:mb-5 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] sm:text-xs text-slate-600 font-bold uppercase tracking-wide block">
                      {cs.metricLabel}
                    </span>
                    <strong className="text-xs sm:text-sm text-slate-800 font-semibold block mt-0.5 sm:mt-1">
                      {cs.press}
                    </strong>
                  </div>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-blue-600 shrink-0 ml-2.5 sm:ml-3">
                    {cs.metric}
                  </div>
                </div>

                <div className="space-y-2.5 sm:space-y-3.5 text-xs sm:text-sm text-slate-700 leading-relaxed mb-4 sm:mb-6">
                  <div>
                    <strong className="text-rose-700 block mb-0.5 sm:mb-1 font-bold uppercase text-[11px] sm:text-xs">
                      Challenge:
                    </strong>
                    <span>{cs.challenge}</span>
                  </div>
                  <div>
                    <strong className="text-blue-700 block mb-0.5 sm:mb-1 font-bold uppercase text-[11px] sm:text-xs">
                      Solution:
                    </strong>
                    <span>{cs.solution}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 sm:pt-4 border-t border-emerald-200/80 text-xs sm:text-sm text-emerald-900 font-bold flex items-start gap-2 sm:gap-2.5 bg-emerald-50/80 -mx-4 -mb-4 sm:-mx-7 sm:-mb-7 lg:-mx-8 lg:-mb-8 p-3.5 sm:p-5 rounded-b-2xl sm:rounded-b-3xl">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-700 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
                <span className="leading-snug">{cs.result}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
