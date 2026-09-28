import React from "react";
import { Link } from "react-router-dom";

export default function HomeWorkingPrinciple({ locationData }) {
  const locName = locationData ? locationData.name : "India";

  return (
    <section className="py-10 sm:py-16 lg:py-24 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6">
            <div>
              <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200/80 mb-2.5 sm:mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                How It Works • Clean Ink Wiping
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                The Working Principle of a <span className="text-blue-600">Precision Doctor Blade</span>
              </h2>
            </div>

            <p className="text-slate-700 text-sm sm:text-base md:text-lg leading-relaxed">
              Think of a doctor blade as an ultra-precise windshield wiper for your printing press. As the metal printing cylinder spins, it picks up ink. The doctor blade wipes away every drop of excess ink from the flat surface, leaving ink <strong>only inside the tiny image dots</strong>. This ensures clean, sharp printing without smudges or streaks {locName ? `for packaging factories in ${locName}` : "across India"}.
            </p>

            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start gap-3 sm:gap-4 p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200 shadow-xs">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-xs sm:text-sm shrink-0 shadow-sm shadow-blue-500/20">
                  55°
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900">The 55° to 60° Angle: Smooth, Scratch-Free Contact</h3>
                  <p className="text-xs sm:text-sm text-slate-700 mt-0.5 sm:mt-1 leading-relaxed">
                    Setting the blade at the right angle stops it from vibrating or bouncing against the spinning cylinder. It wipes completely clean with very light pressure, keeping your expensive printing cylinders scratch-free.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4 p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200 shadow-xs">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-xs sm:text-sm shrink-0 shadow-sm shadow-blue-500/20">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900">Even Color from First Meter to Last (Lamella Tip)</h3>
                  <p className="text-xs sm:text-sm text-slate-700 mt-0.5 sm:mt-1 leading-relaxed">
                    Our special stepped edge stays the exact same thinness as it slowly wears down. That means your print colors never fade, darken, or shift shade midway through a 50,000-meter print run.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-1 sm:pt-2">
              <Link
                to="/working-principle"
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-xs sm:text-sm transition-all shadow-md shadow-blue-600/20 hover:shadow-lg w-full sm:w-auto text-center"
              >
                <span>Learn How Doctor Blades Work</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right Visual / Metric Card Column */}
          <div className="lg:col-span-6 mt-4 lg:mt-0">
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 text-slate-900 shadow-md border border-slate-200/90 relative overflow-hidden">
              <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-slate-100 mb-4 sm:mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-800">
                    Why Blade Quality Matters
                  </span>
                </div>
                <span className="text-[11px] sm:text-xs bg-blue-50 text-blue-700 font-extrabold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-blue-200">
                  WIPEX Standard
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="bg-slate-50 p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200">
                  <span className="text-[11px] sm:text-xs text-slate-600 font-bold uppercase tracking-wide block">Gentle Wiping Force</span>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-blue-600 mt-0.5 sm:mt-1">1.2 – 1.6 bar</div>
                  <span className="text-[11px] sm:text-xs text-emerald-700 font-bold mt-1 block">Wipes clean with low pressure</span>
                </div>
                <div className="bg-slate-50 p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200">
                  <span className="text-[11px] sm:text-xs text-slate-600 font-bold uppercase tracking-wide block">Blade Wear Accuracy</span>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-blue-600 mt-0.5 sm:mt-1">&lt; 0.005 mm</div>
                  <span className="text-[11px] sm:text-xs text-slate-700 font-bold mt-1 block">Smooth & even wear edge</span>
                </div>
              </div>

              <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-amber-50/70 border border-amber-200 mb-4 sm:mb-6 text-xs sm:text-sm text-slate-800 leading-relaxed">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                  <strong className="text-slate-900 font-bold text-xs sm:text-sm">Why Cheap Blades Ruin Printing Rollers:</strong>
                </div>
                Low-grade blades are uneven and leak ink. To stop leaks, machine operators push the blade harder against the spinning cylinder. That heavy scraping acts like a chisel, cutting deep scratches into expensive cylinders. WIPEX blades wipe 100% clean with just a light touch.
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 text-xs sm:text-sm text-slate-700 pt-3 sm:pt-4 border-t border-slate-100">
                <span className="font-medium">Printing Cylinder Protection:</span>
                <strong className="text-emerald-700 font-black text-sm sm:text-base">+35% Longer Cylinder Life</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
