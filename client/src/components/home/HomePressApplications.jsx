import React from "react";
import { Link } from "react-router-dom";

const sectors = [
  {
    title: "Flexible Packaging",
    subtitle: "BOPP, PET, CPP & Multilayer Films",
    desc: "Precision doctor blades engineered for high-speed solvent and PU inks running up to 500 m/min with zero hazing on transparent pouch windows.",
    blade: "0.150 mm Lamella Carbon Steel",
  },
  {
    title: "CI & Stack Flexography",
    subtitle: "Central Impression & Narrow Web",
    desc: "Corrosion-resistant stainless steel and non-metallic polymer blades designed for dual-blade chambered systems and ceramic anilox rolls.",
    blade: "WIPEX Stainless Steel & Polymer",
  },
  {
    title: "Corrugated Box Printing",
    subtitle: "Kraft Liner & Fluted Boards",
    desc: "Forgiving polymer doctor blades that tolerate paper dust, high pH water inks, and press vibrations while keeping operators 100% safe from cuts.",
    blade: "WIPEX Polymer 0.350–0.500 mm",
  },
  {
    title: "Barrier Coating & Lacquer",
    subtitle: "PVDC, Heat Seal, UV Varnishes",
    desc: "Stiff beveled coating blades providing micro-meter level GSM coat-weight uniformity across wide-web industrial lamination lines up to 2.2 meters.",
    blade: "0.200 / 0.250 mm Stainless Steel",
  },
];

export default function HomePressApplications({ locationData }) {
  const locName = locationData ? locationData.name : "India";

  return (
    <section className="py-16 lg:py-24 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200/80 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              Industrial Manufacturing Sectors
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Doctor Blades for Every <span className="text-blue-600">Pressroom Sector</span>
            </h2>
            <p className="text-base md:text-lg text-slate-700 mt-2 max-w-2xl leading-relaxed">
              From ultra-thin flexible film pouches to heavy corrugated post-print packaging {locName ? `in ${locName}` : "across India"}.
            </p>
          </div>

          <Link
            to="/press-applications"
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-full text-sm font-bold transition-all border border-slate-200/80 whitespace-nowrap self-start md:self-auto"
          >
            <span>Explore All 6 Industry Sectors</span>
            <span>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sectors.map((sec, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:border-blue-300 hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 border border-blue-200/60 flex items-center justify-center font-black text-sm mb-5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  0{idx + 1}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1.5 group-hover:text-blue-600 transition-colors">
                  {sec.title}
                </h3>
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wide mb-3 block">
                  {sec.subtitle}
                </span>
                <p className="text-sm text-slate-700 leading-relaxed mb-6">
                  {sec.desc}
                </p>
              </div>

              <div className="pt-3.5 border-t border-slate-100 text-xs">
                <span className="font-bold text-slate-500 uppercase tracking-wider block mb-0.5">Recommended Spec:</span>
                <span className="text-slate-900 font-bold text-sm block">{sec.blade}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
