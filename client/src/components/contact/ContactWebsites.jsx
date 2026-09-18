import React from "react";

const websites = [
  {
    name: "ImageTech Industries",
    domain: "imagetechindustries.com",
    url: "https://www.imagetechindustries.com/",
    description:
      "Our central corporate headquarters and primary manufacturing catalogue featuring our full spectrum of printing tools, doctor blades, and custom machinery parts.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    badge: "Main Website",
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
  },
  {
    name: "Doctor Blade",
    domain: "doctorblade.co.in",
    url: "https://www.doctorblade.co.in",
    description:
      "High-precision carbon steel, stainless steel, and long-life coated doctor blades designed for rotogravure and flexographic printing presses.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879a3 3 0 11-4.242-4.242L10.758 4.758a3 3 0 014.242 0l4.242 4.242a3 3 0 010 4.242z" />
      </svg>
    ),
    badge: "Current Website",
    badgeColor: "bg-orange-50 text-orange-700 border-orange-200",
  },
  {
    name: "Magnetic Ink Mixing Roller",
    domain: "inkmixingroller.com",
    url: "https://www.inkmixingroller.com",
    description:
      "Magnetic ink mixing rollers with rope and rope-free options for continuous ink circulation, eliminating pigment settling and ink skinning.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    badge: "Ink Mixing Rollers",
    badgeColor: "bg-teal-50 text-teal-700 border-teal-200",
  },
  {
    name: "Stroboscope Light",
    domain: "stroboscopelight.com",
    url: "https://www.stroboscopelight.com",
    description:
      "Industrial xenon and LED stroboscopes for high-speed print surface inspection, print defect detection, and rotation diagnostics.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    badge: "Stroboscopes",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
  },
  {
    name: "Bar Coater",
    domain: "barcoater.com",
    url: "https://www.barcoater.com",
    description:
      "Precision wire-wound metering rods and bar coaters for precise wet film thickness application on paper, films, foils, and specialty sheets.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    ),
    badge: "Bar Coaters",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    name: "Teflon Dam & End Seals",
    domain: "teflondam.com",
    url: "https://www.teflondam.com",
    description:
      "Virgin PTFE Teflon end seals, side dams, and custom gaskets engineered for flexographic chambered doctor blade ink containment systems.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    badge: "Teflon Dams",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
  },
];

export default function ContactWebsites() {
  return (
    <section id="product-websites" className="bg-white py-16 border-t border-slate-200 relative overflow-hidden scroll-mt-12">
      {/* Background Accent Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-50/50 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            Our Product Network
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Explore Our Specialized Product Websites
          </h2>
          <p className="mt-4 text-base text-slate-600 font-medium leading-relaxed">
            ImageTech Industries manufactures and supplies a comprehensive range of precision printing tools, inspection devices, and press room consumables. Visit our dedicated product websites below for technical specifications and direct inquiries:
          </p>
        </div>

        {/* Websites Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {websites.map((site) => {
            const isCurrent = site.badge === "Current Website";
            return (
              <div
                key={site.domain}
                className={`rounded-2xl border p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-300 group relative ${
                  isCurrent
                    ? "bg-orange-50/20 hover:bg-white border-orange-300/80 shadow-orange-500/5 ring-1 ring-orange-200/60"
                    : "bg-slate-50/70 hover:bg-white border-slate-200/90 hover:border-blue-400"
                }`}
              >
                <div>
                  {/* Card Top: Icon & Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-12 h-12 rounded-xl border flex items-center justify-center shadow-xs group-hover:scale-105 transition-all duration-300 ${
                        isCurrent
                          ? "bg-white border-orange-200 text-orange-600 group-hover:bg-orange-500 group-hover:text-white"
                          : "bg-white border-slate-200 text-blue-600 group-hover:bg-blue-600 group-hover:text-white"
                      }`}
                    >
                      {site.icon}
                    </div>
                    <span
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${site.badgeColor}`}
                    >
                      {site.badge}
                    </span>
                  </div>

                  {/* Card Title */}
                  <h3
                    className={`text-xl font-black transition-colors mb-2.5 ${
                      isCurrent
                        ? "text-slate-900 group-hover:text-orange-600"
                        : "text-slate-900 group-hover:text-blue-600"
                    }`}
                  >
                    {site.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-700 leading-relaxed font-medium mb-6">
                    {site.description}
                  </p>
                </div>

                {/* Action Link */}
                <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between">
                  <span
                    className={`font-mono text-xs font-bold transition-colors ${
                      isCurrent
                        ? "text-slate-700 group-hover:text-orange-600"
                        : "text-slate-700 group-hover:text-blue-600"
                    }`}
                  >
                    {site.domain}
                  </span>

                  <a
                    href={isCurrent ? "#" : site.url}
                    target={isCurrent ? "_self" : "_blank"}
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer group-hover:translate-x-0.5 ${
                      isCurrent
                        ? "text-orange-700 bg-orange-100 hover:bg-orange-200/80 border border-orange-200"
                        : "text-blue-600 hover:text-blue-800 bg-blue-50/70 hover:bg-blue-100"
                    }`}
                  >
                    {isCurrent ? "Current Website" : "Visit Website"}
                    {!isCurrent && (
                      <svg
                        className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    )}
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Horizontal Consultation Banner for Desktop */}
        <div className="mt-12 lg:mt-16 bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950 text-white rounded-2xl sm:rounded-3xl p-8 sm:p-10 lg:p-12 shadow-2xl border border-slate-800 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12 relative overflow-hidden">
          {/* Subtle decorative glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16"></div>

          <div className="flex items-start sm:items-center gap-5 sm:gap-7 relative z-10 flex-1">
            <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-2xl bg-white/10 text-orange-400 flex items-center justify-center shrink-0 border border-white/10 shadow-inner">
              <svg className="w-8 h-8 sm:w-9 sm:h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div>
              <div className="inline-flex items-center gap-2 text-orange-400 text-xs font-extrabold uppercase tracking-widest mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse"></span>
                Technical Assistance & Custom Sizing
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-black tracking-tight text-white leading-tight">
                Need a Custom Product Consultation?
              </h3>
              <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed mt-2 max-w-3xl">
                Can't find the exact product specification you need? Our technical experts customize solutions for rotogravure, flexo, and coating lines.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0 relative z-10">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent("open-quote-modal"))}
              className="inline-flex items-center justify-center bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-sm sm:text-base py-4 px-7 rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer whitespace-nowrap hover:-translate-y-0.5 active:translate-y-0"
            >
              Get Custom Quote
            </button>
            <a
              href="tel:+918448336036"
              className="inline-flex items-center justify-center gap-2.5 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-sm sm:text-base py-4 px-7 rounded-xl transition-all shadow-md hover:shadow-orange-500/40 whitespace-nowrap hover:-translate-y-0.5 active:translate-y-0"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call +91 8448336036
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
