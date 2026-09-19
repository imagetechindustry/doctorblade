import React from "react";
import { Link } from "react-router-dom";

export default function HomeSelectionGuide({ locationData }) {
  const locName = locationData ? locationData.name : "India";

  return (
    <section className="py-16 lg:py-24 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200/80 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            Pressroom Sizing & Metallurgy
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            How to Choose the Right <span className="text-blue-600">Doctor Blade</span>
          </h2>
          <p className="text-base md:text-lg text-slate-700 mt-3 leading-relaxed">
            Selecting the exact thickness, metallurgy, and edge profile ensures consistent ink film metering and protects your printing cylinders {locName ? `in ${locName}` : "across India"}.
          </p>
        </div>

        {/* 3 Quick Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-slate-200 hover:shadow-xl hover:border-blue-300 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-4">
                <span className="text-xs font-black text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200/60">
                  0.150 mm (0.006")
                </span>
                <span className="text-xs uppercase font-bold text-slate-500 tracking-wide">Process Print</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                WIPEX Lamella Carbon Steel
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed mb-5">
                The industry benchmark for fine flexo and gravure process printing. Features a precision 0.075 mm parallel tip for immediate clean wiping without run-in waste.
              </p>
              <div className="space-y-2 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 mb-6">
                <div className="flex justify-between">
                  <span className="font-bold text-slate-900">Speeds:</span>
                  <span className="text-slate-700 font-medium">Up to 350 m/min</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-slate-900">Screen:</span>
                  <span className="text-slate-700 font-medium">150 – 200+ LPI</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-slate-900">Inks:</span>
                  <span className="text-slate-700 font-medium">Solvent & NC inks</span>
                </div>
              </div>
            </div>
            <Link
              to="/products/wipex-carbon-steel-doctor-blade"
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center justify-between pt-3.5 border-t border-slate-100"
            >
              <span>View Carbon Blade Specs</span>
              <span>→</span>
            </Link>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-slate-200 hover:shadow-xl hover:border-blue-300 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-4">
                <span className="text-xs font-black text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200/60">
                  0.200 mm (0.008")
                </span>
                <span className="text-xs uppercase font-bold text-slate-500 tracking-wide">High Speed / White</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                WIPEX Stainless Steel Blade
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed mb-5">
                Anti-corrosive alloy designed for water-based flexo inks and high-speed packaging runs over 400 m/min. Highly resistant against abrasive TiO2 white pigments.
              </p>
              <div className="space-y-2 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 mb-6">
                <div className="flex justify-between">
                  <span className="font-bold text-slate-900">Speeds:</span>
                  <span className="text-slate-700 font-medium">300 – 600 m/min</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-slate-900">Screen:</span>
                  <span className="text-slate-700 font-medium">Heavy solids & whites</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-slate-900">Inks:</span>
                  <span className="text-slate-700 font-medium">Water, UV, Abrasive whites</span>
                </div>
              </div>
            </div>
            <Link
              to="/products/wipex-stainless-steel-doctor-blade"
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center justify-between pt-3.5 border-t border-slate-100"
            >
              <span>View Stainless Blade Specs</span>
              <span>→</span>
            </Link>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-slate-200 hover:shadow-xl hover:border-blue-300 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-4">
                <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/60">
                  0.350–0.500 mm
                </span>
                <span className="text-xs uppercase font-bold text-slate-500 tracking-wide">Ceramic Protection</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                WIPEX Polymer Doctor Blade
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed mb-5">
                100% non-metallic engineered polymer blade. Completely eliminates ceramic anilox scoring risks and ensures absolute operator hand safety on the press.
              </p>
              <div className="space-y-2 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 mb-6">
                <div className="flex justify-between">
                  <span className="font-bold text-slate-900">Speeds:</span>
                  <span className="text-slate-700 font-medium">Up to 280 m/min</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-slate-900">Anilox:</span>
                  <span className="text-slate-700 font-medium">Ceramic rolls & chambers</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-slate-900">Safety:</span>
                  <span className="text-slate-700 font-medium">Zero cut injuries</span>
                </div>
              </div>
            </div>
            <Link
              to="/products/wipex-polymer-doctor-blade"
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center justify-between pt-3.5 border-t border-slate-100"
            >
              <span>View Polymer Blade Specs</span>
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* Banner with Sizing Calculator Link */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-blue-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-black uppercase mb-2">
              Free Pressroom Engineering Tool
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Need Exact Blade Length, Width & Pressure For Your Machine?
            </h3>
            <p className="text-sm sm:text-base text-slate-700 mt-2 max-w-2xl leading-relaxed">
              Use our interactive sizing calculator to input your cylinder face width, press velocity, and ink system to get an instant engineering recommendation.
            </p>
          </div>
          <Link
            to="/selection-guide"
            className="px-7 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-sm transition-all shadow-md shadow-blue-600/20 whitespace-nowrap flex items-center gap-2 shrink-0"
          >
            <span>Launch Sizing Calculator</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
