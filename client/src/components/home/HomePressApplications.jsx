import React from "react";
import { Link } from "react-router-dom";

const sectors = [
  {
    title: "Flexible Plastic Packaging",
    subtitle: "Snack Packets, Pouches & Food Films",
    desc: "Engineered for high-speed gravure presses running up to 500 m/min. Ensures crystal-clear transparent windows with zero foggy ink hazing or streaks.",
    blade: "WIPEX Carbon Steel Lamella Blade",
  },
  {
    title: "Flexo & Label Printing",
    subtitle: "Stickers, Narrow-Web & CI Flexo",
    desc: "Rust-resistant stainless steel and gentle polymer blades built for ceramic anilox rollers. Delivers razor-sharp text, fine barcodes, and clean colors.",
    blade: "WIPEX Stainless Steel & Polymer",
  },
  {
    title: "Corrugated Cardboard Boxes",
    subtitle: "Shipping Cartons & Brown Kraft Paper",
    desc: "Durable polymer plastic blades that handle paper dust and rough vibrations without breaking, while keeping workers 100% safe from blade cut injuries.",
    blade: "WIPEX Polymer (0.350–0.500 mm)",
  },
  {
    title: "Varnishing & Foil Coating",
    subtitle: "UV Gloss, Blister Foil & Lacquers",
    desc: "Precision beveled coating blades that lay down a perfectly uniform, streak-free protective coat across wide industrial rolls up to 2.2 meters wide.",
    blade: "WIPEX Heavy-Duty Stainless Steel",
  },
];

export default function HomePressApplications({ locationData }) {
  const locName = locationData ? locationData.name : "India";

  return (
    <section className="py-10 sm:py-16 lg:py-24 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-16 gap-4 sm:gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200/80 mb-2 sm:mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              Printing & Packaging Applications
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Doctor Blades for Every <span className="text-blue-600">Pressroom Sector</span>
            </h2>
            <p className="text-xs sm:text-base md:text-lg text-slate-700 mt-1.5 sm:mt-2 max-w-2xl leading-relaxed">
              Whether you print plastic snack pouches, corrugated shipping boxes, labels, or shiny foil packaging, we have the ideal doctor blade {locName ? `for your factory in ${locName}` : "across India"}.
            </p>
          </div>

          <Link
            to="/press-applications"
            className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-full text-xs sm:text-sm font-bold transition-all border border-slate-200/80 whitespace-nowrap self-start md:self-auto"
          >
            <span>Explore All Press Applications</span>
            <span>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {sectors.map((sec, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-7 border border-slate-200 shadow-sm hover:border-blue-300 hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-blue-50 text-blue-700 border border-blue-200/60 flex items-center justify-center font-black text-xs sm:text-sm mb-3.5 sm:mb-5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  0{idx + 1}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                  {sec.title}
                </h3>
                <span className="text-[11px] sm:text-xs font-bold text-blue-700 uppercase tracking-wide mb-2 sm:mb-3 block">
                  {sec.subtitle}
                </span>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4 sm:mb-6">
                  {sec.desc}
                </p>
              </div>

              <div className="pt-3 sm:pt-3.5 border-t border-slate-100 text-xs">
                <span className="font-bold text-slate-500 uppercase tracking-wider block mb-0.5 text-[11px] sm:text-xs">Recommended Spec:</span>
                <span className="text-slate-900 font-bold text-xs sm:text-sm block">{sec.blade}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
