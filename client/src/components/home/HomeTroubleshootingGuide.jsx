import React, { useState } from "react";
import { Link } from "react-router-dom";

const troubleshootingItems = [
  {
    id: "blade-streaks",
    defect: "Ink Lines & Streaks on Printed Film",
    rootCause:
      "A tiny speck of dried ink or a rough nick on a cheap blade lets a thin, continuous line of ink slip through onto your plastic film or paper.",
    solution:
      "WIPEX doctor blades have ultra-smooth, micro-polished wiping edges that resist nicks. Combined with smooth sideways press movement, particles are constantly swept away before streaks can form.",
    pressType: "Rotogravure & Flexo Printing Presses",
    severity: "High (Wastes rolls & stops production)",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    id: "hazing-scumming",
    defect: "Foggy or Hazy Background (Ink Hazing)",
    rootCause:
      "When running at high speeds, fluid ink pushes against cheap, flimsy blades and lifts them slightly off the roller. This leaves a light smoky haze on clear transparent film or white backgrounds.",
    solution:
      "Setting the blade angle at 55° to 60° with a firmer WIPEX doctor blade keeps the edge flat on the cylinder, keeping clear film 100% clean and transparent without pressing hard.",
    pressType: "High-Speed Film Packaging (BOPP, PET, CPP)",
    severity: "High (Ruins clear pouch windows)",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
  {
    id: "blade-spitting",
    defect: "Ink Droplet Splattering (Ink Spitting)",
    rootCause:
      "Extra ink builds up behind the blade in fast flexographic printing and sprays tiny flying ink droplets onto the moving paper or film.",
    solution:
      "Using a shorter blade overhang and our precision tapered tip stops ink from piling up, allowing ink to flow smoothly back into the ink tank without splattering.",
    pressType: "Flexo Presses & Chamber Systems",
    severity: "Medium (Ink spots on printed surface)",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
  },
  {
    id: "cylinder-scoring",
    defect: "Scratched Cylinders & Damaged Rollers (Scoring)",
    rootCause:
      "When blades leak, operators crank up clamping pressure. That heavy metal scraping digs deep scratches into expensive printing cylinders and ceramic anilox rollers.",
    solution:
      "Switch to WIPEX polymer blades or high-purity steel blades that wipe completely clean under gentle pressure (1.2–1.5 bar). This stops roller scratches and saves lakhs in cylinder repair costs.",
    pressType: "Printing Cylinders & Ceramic Anilox Rollers",
    severity: "Critical (Expensive roller re-chroming costs)",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    id: "rapid-edge-wear",
    defect: "Blade Wearing Out Too Fast with White Inks",
    rootCause:
      "Thick white inks contain gritty mineral pigments that act like liquid sandpaper, grinding down ordinary steel blades in just 3 to 4 hours.",
    solution:
      "WIPEX Stainless Steel 0.200 mm blades are specially hardened to resist gritty white pigments, easily running a full 24-hour shift without needing blade changes.",
    pressType: "White Background Ink Stations",
    severity: "High (Frequent machine stops for blade changes)",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    id: "back-doctoring",
    defect: "Ink Leaking from Closed Ink Chambers",
    rootCause:
      "Worn or ill-fitting blades allow ink to leak out of closed flexo chambers, making a mess on the press and causing uneven ink coverage.",
    solution:
      "Install a matched WIPEX dual-blade set (steel wiping blade + flexible polymer sealing blade) to keep ink safely sealed inside the chamber with zero leaking.",
    pressType: "Chambered Flexo Inking Systems",
    severity: "Medium (Ink waste & uneven ink laydown)",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 00-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
  },
];

const HomeTroubleshootingGuide = ({ locationData }) => {
  const locName = locationData ? locationData.name : "India";
  const [selectedId, setSelectedId] = useState("blade-streaks");
  const activeItem =
    troubleshootingItems.find((i) => i.id === selectedId) ||
    troubleshootingItems[0];

  return (
    <section className="py-10 sm:py-16 lg:py-24 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 px-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200/80 mb-2 sm:mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            Printing Problem Solver
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3 sm:mb-4">
            Solving Common Print Defects with a <span className="text-blue-600">Precision Doctor Blade</span>
          </h2>
          <p className="text-xs sm:text-base md:text-lg text-slate-700 leading-relaxed">
            Quickly diagnose and fix common printing problems like ink lines, foggy backgrounds, and scratched rollers {locName ? `in ${locName}` : "across India"}.
          </p>
        </div>

        {/* Interactive Troubleshooting Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Left Column: Defect Selector List */}
          <div className="lg:col-span-5 space-y-2.5 sm:space-y-3">
            <div className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5 sm:mb-2 px-1 flex items-center justify-between">
              <span>Select Pressroom Defect:</span>
              <span className="text-blue-600 font-semibold">{troubleshootingItems.length} Diagnostics</span>
            </div>
            {troubleshootingItems.map((item) => {
              const isSelected = item.id === selectedId;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedId(item.id)}
                  className={`w-full text-left p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? "bg-blue-50/90 border-blue-400 shadow-sm ring-1 ring-blue-400/30"
                      : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/80 shadow-xs"
                  }`}
                >
                  <div className="flex items-center space-x-3 sm:space-x-3.5">
                    <div
                      className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected
                          ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                          : "bg-slate-100 text-slate-700 border border-slate-200"
                      }`}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                        {item.defect}
                      </h3>
                      <span className="text-[11px] sm:text-xs text-slate-600 font-medium block mt-0.5">
                        {item.pressType}
                      </span>
                    </div>
                  </div>
                  <svg
                    className={`w-4 h-4 sm:w-5 sm:h-5 ml-2 shrink-0 transition-transform ${
                      isSelected ? "text-blue-600 translate-x-1" : "text-slate-400"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Diagnostic Card */}
          <div className="lg:col-span-7 bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-slate-200 shadow-md">
            <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 pb-4 sm:pb-6 border-b border-slate-100 mb-4 sm:mb-6">
              <div>
                <span className="text-[11px] sm:text-xs font-bold text-blue-700 uppercase tracking-wider">
                  Diagnostic Breakdown
                </span>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 mt-0.5 sm:mt-1">
                  {activeItem.defect}
                </h3>
              </div>
              <span className="text-[11px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                {activeItem.severity}
              </span>
            </div>

            {/* Root Cause Analysis */}
            <div className="mb-4 sm:mb-6">
              <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-amber-500"></span>
                <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-900">
                  Why This Happens (Root Cause):
                </h4>
              </div>
              <p className="text-slate-800 text-xs sm:text-sm leading-relaxed bg-amber-50/70 p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-amber-200">
                {activeItem.rootCause}
              </p>
            </div>

            {/* Engineering Solution */}
            <div className="mb-6 sm:mb-8">
              <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-500"></span>
                <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-900">
                  How Our Doctor Blade Fixes It:
                </h4>
              </div>
              <p className="text-slate-800 text-xs sm:text-sm leading-relaxed bg-emerald-50/70 p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-emerald-200">
                {activeItem.solution}
              </p>
            </div>

            {/* Application & CTA Box */}
            <div className="pt-4 sm:pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
              <div className="text-xs sm:text-sm text-slate-600">
                Machines Used On: <strong className="text-slate-900 font-bold">{activeItem.pressType}</strong>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 w-full sm:w-auto">
                <Link
                  to="/troubleshooting-guide"
                  className="w-full sm:w-auto px-4 sm:px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-full transition-all text-center cursor-pointer border border-slate-200/80"
                >
                  View Defect Guide
                </Link>
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent("open-quote-modal"))}
                  className="w-full sm:w-auto px-5 sm:px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-full shadow-md shadow-blue-600/20 hover:shadow-lg transition-all text-center cursor-pointer"
                >
                  Get Help & Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeTroubleshootingGuide;
