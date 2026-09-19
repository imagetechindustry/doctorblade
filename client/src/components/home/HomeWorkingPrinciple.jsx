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
                Engineering Science & Ink Metering
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                The Working Principle of a <span className="text-blue-600">Precision Doctor Blade</span>
              </h2>
            </div>

            <p className="text-slate-700 text-sm sm:text-base md:text-lg leading-relaxed">
              At modern printing speeds of 300 to 500+ meters per minute, fluid ink creates intense hydrodynamic lift forces against the wiping blade. If blade geometry is imprecise, ink forces the blade to float, causing background hazing, scumming, and uneven cell transfer across your web in {locName}.
            </p>

            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start gap-3 sm:gap-4 p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200 shadow-xs">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-xs sm:text-sm shrink-0 shadow-sm shadow-blue-500/20">
                  55°
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900">The 55°–60° Contact Angle Rule</h3>
                  <p className="text-xs sm:text-sm text-slate-700 mt-0.5 sm:mt-1 leading-relaxed">
                    Maintains hydrostatic equilibrium between ink lift forces and blade beam stiffness to deliver crisp, streak-free cell shearing without cylinder chrome damage.
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
                  <h3 className="font-bold text-sm sm:text-base text-slate-900">Lamella Parallel Contact Area</h3>
                  <p className="text-xs sm:text-sm text-slate-700 mt-0.5 sm:mt-1 leading-relaxed">
                    Our precision stepped lamella profile guarantees constant contact area as the blade tip wears, eliminating mid-run color density drift and ΔE shade shifts.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-1 sm:pt-2">
              <Link
                to="/working-principle"
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-xs sm:text-sm transition-all shadow-md shadow-blue-600/20 hover:shadow-lg w-full sm:w-auto text-center"
              >
                <span>Read Full Physics & Hydrodynamics Guide</span>
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
                    Hydrodynamic vs Mechanical Balance
                  </span>
                </div>
                <span className="text-[11px] sm:text-xs bg-blue-50 text-blue-700 font-extrabold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-blue-200">
                  WIPEX Standard
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="bg-slate-50 p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200">
                  <span className="text-[11px] sm:text-xs text-slate-600 font-bold uppercase tracking-wide block">Contact Pressure</span>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-blue-600 mt-0.5 sm:mt-1">1.2 – 1.6 bar</div>
                  <span className="text-[11px] sm:text-xs text-emerald-700 font-bold mt-1 block">Low friction & zero scoring</span>
                </div>
                <div className="bg-slate-50 p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200">
                  <span className="text-[11px] sm:text-xs text-slate-600 font-bold uppercase tracking-wide block">Wear Tolerance</span>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-blue-600 mt-0.5 sm:mt-1">&lt; 0.005 mm</div>
                  <span className="text-[11px] sm:text-xs text-slate-700 font-bold mt-1 block">Parallel lamella consistency</span>
                </div>
              </div>

              <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-amber-50/70 border border-amber-200 mb-4 sm:mb-6 text-xs sm:text-sm text-slate-800 leading-relaxed">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                  <strong className="text-slate-900 font-bold text-xs sm:text-sm">Why Sub-Standard Blades Score Cylinders:</strong>
                </div>
                Generic blades with inconsistent steel hardness force operators to ramp pneumatic pressure up to 2.5+ bar to stop hazing. This excessive force acts like a chisel against copper cells. WIPEX blades wipe clean at just 1.2 bar.
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 text-xs sm:text-sm text-slate-700 pt-3 sm:pt-4 border-t border-slate-100">
                <span className="font-medium">Cylinder Lifespan Enhancement:</span>
                <strong className="text-emerald-700 font-black text-sm sm:text-base">+35% extended run hours</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
