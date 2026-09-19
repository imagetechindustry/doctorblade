import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/common/SEO";
import TechnicalGuidesNav from "../components/common/TechnicalGuidesNav";
import FAQSection from "../components/common/FAQSection";
import HomeCTA from "../components/home/HomeCTA";

const industrialSectors = [
  {
    title: "Flexible Packaging & Pouches",
    substrates: "BOPP, BOPET, CPP, Cast Film, Multilayer Polyethylene (PE)",
    inkSystem: "Solvent-based Nitrocellulose (NC) / Polyurethane (PU)",
    recommendedBlade: "WIPEX Lamella 0.150 mm (Carbon Steel)",
    description:
      "High-speed rotogravure packaging lines running at 300–500 m/min require instantaneous ink wiping with minimal cylinder drag. Our 0.150 mm lamella blade ensures razor-sharp fine-text, bar-code reproduction, and crisp halftone screens while preventing solvent evaporation hazing on transparent film windows.",
    keyRequirement: "Zero hazing on transparent windows and uniform white backing opacity.",
  },
  {
    title: "Central Impression (CI) Flexo",
    substrates: "Polyethylene (LDPE/LLDPE), Breathable Film, Paperboard",
    inkSystem: "Solvent or Water-Based flexo inks (150–200+ LPI anilox)",
    recommendedBlade: "WIPEX Stainless Steel 0.150 mm or WIPEX Polymer",
    description:
      "CI flexo presses utilize dual-blade closed chamber systems running against ceramic anilox rolls. Stainless steel doctor blades provide superior chemical resistance against alkaline water formulations without rusting, while non-metallic polymer blades completely eliminate ceramic cell scoring risks.",
    keyRequirement: "Corrosion resistance, precise chamber ink containment, and zero spitting.",
  },
  {
    title: "Decorative & Woodgrain Gravure",
    substrates: "Decor Paper, PVC Film, Vinyl Flooring, Melamine Foil",
    inkSystem: "High-solids water-based or solvent vinyl inks",
    recommendedBlade: "WIPEX 0.200 mm Bevel 15° (Carbon Steel)",
    description:
      "Decorative woodgrain and laminate printing requires high ink transfer densities to simulate natural timber textures and stone finishes. A stiffer 0.200 mm beveled blade resists deflection under high ink viscosity and withstands abrasive iron oxide pigments without blade micro-nicking.",
    keyRequirement: "Heavy pigment load handling without streak lines or blade deflection.",
  },
  {
    title: "Corrugated Pre-Print & Post-Print",
    substrates: "Brown Kraft Liner, White Top Liner, Fluted Board",
    inkSystem: "High-pH water-based flexographic inks",
    recommendedBlade: "WIPEX Polymer Doctor Blade (0.350–0.500 mm)",
    description:
      "Corrugated carton operations experience high paper dust, abrasive fibers, and vibration. Polymer doctor blades provide a forgiving contact interface that handles board dust without dulling and ensures total operator safety during fast changes.",
    keyRequirement: "Fiber tolerance, complete operator hand safety, and roll protection.",
  },
  {
    title: "Specialty Barrier Coating & Varnishing",
    substrates: "Aluminum Foil Laminates, Metallized Paper, Paperboard",
    inkSystem: "PVDC, Heat-Seal Lacquers, UV Gloss, Soft-Touch Matt",
    recommendedBlade: "WIPEX 0.200 mm / 0.250 mm Stainless Steel",
    description:
      "Applying exact coat-weight barriers requires micrometer-level blade uniformity. Our stainless steel coating blades meter barrier emulsions evenly across webs up to 2.2 meters wide with zero blade ripple or coat-weight variation.",
    keyRequirement: "Precise coat weight (GSM) control and chemical compatibility with resins.",
  },
  {
    title: "Pharmaceutical Blister Foil Printing",
    substrates: "Hard & Soft Temper Aluminum Push-Through Blister Foil",
    inkSystem: "Food & Pharma compliant solvent vinyl and epoxy inks",
    recommendedBlade: "WIPEX Premium Carbon Steel (Burr-Free)",
    description:
      "Pharmaceutical blister printing demands 100% defect-free batch codes and regulatory compliance. Every WIPEX doctor blade is micro-polished to ensure zero metallic slivers or burrs can ever break off into the pharma packaging environment.",
    keyRequirement: "Cleanroom metallurgy, burr-free edges, and 100% inspection traceability.",
  },
];

const substrateDynamics = [
  {
    substrate: "Flexible Polymer Films (BOPP, PET, CPP)",
    characteristics: "Non-porous, prone to static electricity, smooth surface",
    doctorBladeDemands: "Thin 0.150 mm Lamella tip with precise 58° contact angle to stop hazing on transparent windows.",
    pressChallenge: "Volatile ethyl acetate flash-off at edges creates viscosity gradients across wide cylinders.",
  },
  {
    substrate: "Cellulose Paper & Bleached Board",
    characteristics: "Porous, fibrous, releases abrasive paper dust and clay coatings",
    doctorBladeDemands: "Tough carbon steel or non-metallic polymer blades that resist dust clogging.",
    pressChallenge: "Dry paper fibers lodge beneath blade edges, creating continuous longitudinal streak lines.",
  },
  {
    substrate: "Aluminum Blister & Barrier Foils",
    characteristics: "Zero ink absorption, metallic reflectivity, high pinch-through pressure",
    doctorBladeDemands: "Deburred, cleanroom-certified micro-polished carbon steel blades.",
    pressChallenge: "Tiny metallic slivers from sub-standard blades create short circuits or pharma batch recalls.",
  },
  {
    substrate: "Corrugated Kraft & Fluted Liners",
    characteristics: "Uneven caliper, heavy dust, high mechanical vibration",
    doctorBladeDemands: "0.350–0.500 mm thick engineered polymer doctor blades.",
    pressChallenge: "Steel burrs score ceramic anilox rolls costing thousands in recoating expenses.",
  },
];

const viscosityGuide = [
  { process: "Solvent Rotogravure Packaging", zahnCup: "14 – 17 seconds (#2)", fordCup: "13 – 16 seconds (#4)", dinCup: "12 – 15 seconds (4mm)", notes: "Maintains rapid drying without boundary layer hazing." },
  { process: "Water-Based Flexo Packaging", zahnCup: "19 – 24 seconds (#2)", fordCup: "18 – 22 seconds (#4)", dinCup: "17 – 21 seconds (4mm)", notes: "Requires stainless steel or polymer blade to prevent rust." },
  { process: "UV Flexo & Screen Printing", zahnCup: "28 – 36 seconds (#2)", fordCup: "26 – 32 seconds (#4)", dinCup: "24 – 30 seconds (4mm)", notes: "High shear tack requires stiff 0.200 mm blade beam." },
  { process: "Barrier Lacquer & Coating", zahnCup: "25 – 45 seconds (#2)", fordCup: "22 – 40 seconds (#4)", dinCup: "20 – 38 seconds (4mm)", notes: "Beveled 15° or 30° edge prevents blade beam deflection." },
];

const chamberVsOpen = [
  {
    attribute: "Ink Metering System",
    openTray: "Single Doctor Blade (Trailing or Reverse Angle)",
    chambered: "Dual Blade System (Wiping + Containment Blades)",
  },
  {
    attribute: "Solvent Evaporation Rate",
    openTray: "High (Open pan requires frequent solvent addition)",
    chambered: "Extremely Low (Closed loop preserves viscosity)",
  },
  {
    attribute: "Recommended Wiping Blade",
    openTray: "0.150 mm or 0.200 mm Lamella Carbon Steel",
    chambered: "0.150 mm Stainless Steel or WIPEX Polymer",
  },
  {
    attribute: "Containment Blade Spec",
    openTray: "N/A (Single blade setup)",
    chambered: "0.150 mm Stainless or 0.350 mm Flexible Polymer",
  },
  {
    attribute: "Typical Press Speed",
    openTray: "Up to 350 m/min",
    chambered: "Up to 600+ m/min",
  },
];

const sectorFaqs = [
  {
    question: "Which doctor blade is best for flexible packaging on BOPP and PET films?",
    answer: "For rotogravure flexible packaging, WIPEX 0.150 mm (0.006\") Lamella Carbon Steel is recommended. It delivers crisp process wipes without background hazing on clear film windows. For high-speed lines over 350 m/min, upgrade to 0.200 mm Lamella to overcome hydrodynamic ink lift.",
  },
  {
    question: "Why are polymer doctor blades preferred in corrugated box printing?",
    answer: "Corrugated plants use high-pH water-based inks and generate abrasive paper fiber dust. Polymer blades are non-corrosive, tolerate abrasive board dust without nicking, eliminate expensive ceramic anilox scoring, and are 100% safe to handle without cut injuries.",
  },
  {
    question: "How does doctor blade choice affect pharmaceutical blister foil printing?",
    answer: "Blister packaging requires pin-sharp alphanumeric batch codes and expiry dates on non-absorbent aluminum foil. WIPEX carbon steel blades are deburred and micro-polished under strict cleanroom standards to prevent metallic slivers from contaminating medicine packs.",
  },
  {
    question: "What doctor blade thickness is recommended for specialty barrier lacquers?",
    answer: "Barrier coatings (such as PVDC or heat-seal resins) have higher viscosity than printing inks. A thicker 0.200 mm or 0.250 mm stainless steel blade with a 15° or 30° bevel prevents blade beam deflection, ensuring a uniform coat weight (GSM) across wide webs.",
  },
  {
    question: "What is the function of chamber end seals and how do they affect doctor blades?",
    answer: "Chamber end seals close the lateral gap between the closed chamber and the rotating anilox roll ends. If end seals are over-compressed, they pinch the doctor blade ends, causing blade waviness, edge flaring, and ink leaks. Proper lubrication and correct cut length (Anilox width minus clearance) are essential.",
  },
  {
    question: "How do I choose between carbon steel and stainless steel on a CI flexo press?",
    answer: "For solvent-based CI flexo inks, Swedish carbon steel provides the crispest wipe and lowest wear. For water-based flexo inks (pH 8.2–9.5) or washdown stations, stainless steel is mandatory to prevent rust pitting along the contact edge.",
  },
  {
    question: "Can a single doctor blade specification run both solids and process halftones?",
    answer: "Yes. WIPEX 0.150 mm Lamella Carbon Steel with a 0.075 mm tip provides the ideal balance: the micro-thin tip delivers crisp 175+ LPI process tone reproduction while the 0.150 mm body provides enough stiffness to cleanly meter heavy background solid laydowns.",
  },
  {
    question: "Why do decorative gravure presses use 0.200 mm beveled doctor blades?",
    answer: "Decorative printing uses heavy, dense inks with high loadings of iron oxide, titanium dioxide, and calcium carbonate to print woodgrain and marble patterns. The 0.200 mm beveled profile provides high mechanical rigidity that resists pigment deflection and edge chipping.",
  },
];

export default function PressApplicationsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const techArticleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "Doctor Blade Press Applications & Industry Sectors",
    description: "Technical guide on doctor blade usage across 6 major industrial sectors: flexible packaging, rotogravure publication, CI flexo, corrugated cartons, coating, and pharma blister foil.",
    url: "https://www.doctorblade.co.in/press-applications",
    author: {
      "@type": "Organization",
      name: "ImageTech Industries",
    },
  };

  return (
    <>
      <SEO
        title="Doctor Blade Press Applications & Sectors | Gravure, Flexo & Coating"
        description="Comprehensive guide on doctor blade applications across 6 industrial sectors: flexible packaging, rotogravure, CI flexo, corrugated cartons, specialty coating, and pharmaceutical foil."
        keywords={[
          "doctor blade applications",
          "rotogravure doctor blade sectors",
          "flexo doctor blade uses",
          "flexible packaging doctor blade",
          "chamber doctor blade system",
          "corrugated doctor blade",
          "coating doctor blade",
          "pharma blister foil doctor blade",
          "ImageTech Industries",
        ]}
        schema={[techArticleSchema]}
      />

      <div className="bg-slate-50 min-h-screen py-6 lg:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="text-xs sm:text-sm font-semibold mb-4 sm:mb-6 flex flex-wrap text-slate-500">
            <Link to="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link to="/sitemap" className="hover:text-blue-600 transition-colors">
              Technical Guides
            </Link>
            <span className="mx-2">/</span>
            <span className="text-slate-900 font-bold">Press Applications</span>
          </nav>

          {/* Technical Guides Suite Sub-Nav */}
          <TechnicalGuidesNav />

          {/* Hero Header */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-12 shadow-sm border border-slate-200 mb-8 sm:mb-12">
            <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200/80 mb-3 sm:mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              Pillar 04 • Industrial Sectors
            </span>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3 sm:mb-4">
              Doctor Blade <span className="text-blue-600">Press Applications</span> & Sectors
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-slate-700 max-w-3xl leading-relaxed mb-6 sm:mb-8">
              Different printing substrates and ink formulations exert unique shear forces on doctor blades. From wide-web rotogravure packaging to high-speed CI flexo and pharmaceutical blister printing, discover how our precision doctor blades are engineered to meet rigorous industrial specifications.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-6 pt-5 sm:pt-6 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-blue-50 text-blue-700 border border-blue-200/60 flex items-center justify-center font-black text-xs sm:text-sm shrink-0">
                  01
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900">6 Industry Sectors</div>
                  <div className="text-[11px] sm:text-xs text-slate-600">Packaging, flexo, coating & pharma</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-blue-50 text-blue-700 border border-blue-200/60 flex items-center justify-center font-black text-xs sm:text-sm shrink-0">
                  02
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900">Substrate Dynamics</div>
                  <div className="text-[11px] sm:text-xs text-slate-600">BOPP, PET, Foil & Paperboard</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-blue-50 text-blue-700 border border-blue-200/60 flex items-center justify-center font-black text-xs sm:text-sm shrink-0">
                  03
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900">Chamber Systems</div>
                  <div className="text-[11px] sm:text-xs text-slate-600">Dual blade matched configurations</div>
                </div>
              </div>
            </div>
          </div>

          {/* 6 Industrial Sector Cards */}
          <div className="mb-8 sm:mb-12">
            <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-10 px-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200/80 mb-2 sm:mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                Industry Solutions
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                Doctor Blades Tailored for Every Manufacturing Process
              </h2>
              <p className="text-xs sm:text-base text-slate-700 mt-2">
                Engineered edge profiles and alloy treatments designed for specific pressroom chemistries and substrates.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {industrialSectors.map((sec, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-sm border border-slate-200 hover:shadow-xl hover:border-blue-300 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between pb-3 sm:pb-3.5 border-b border-slate-100 mb-3 sm:mb-4">
                      <span className="text-[11px] sm:text-xs font-black text-blue-700 bg-blue-50 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md sm:rounded-lg border border-blue-200">
                        Sector 0{idx + 1}
                      </span>
                      <span className="text-[11px] sm:text-xs uppercase font-bold text-slate-500 tracking-wider">
                        Industrial Use
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors leading-snug">
                      {sec.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4 sm:mb-5">
                      {sec.description}
                    </p>

                    <div className="space-y-2.5 sm:space-y-3 mb-5 sm:mb-6 text-xs bg-slate-50 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200">
                      <div>
                        <strong className="text-slate-900 block uppercase tracking-wider font-bold mb-0.5">
                          Substrates:
                        </strong>
                        <span className="text-slate-700 font-medium">{sec.substrates}</span>
                      </div>
                      <div>
                        <strong className="text-slate-900 block uppercase tracking-wider font-bold mb-0.5">
                          Ink / Solvent Chemistry:
                        </strong>
                        <span className="text-slate-700 font-medium">{sec.inkSystem}</span>
                      </div>
                      <div>
                        <strong className="text-slate-900 block uppercase tracking-wider font-bold mb-0.5">
                          Core Quality Metric:
                        </strong>
                        <span className="text-emerald-700 font-bold">{sec.keyRequirement}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 sm:pt-4 border-t border-slate-100 bg-slate-50 -mx-4 -mb-4 sm:-mx-6 sm:-mb-6 lg:-mx-8 lg:-mb-8 p-3.5 sm:p-5 rounded-b-2xl sm:rounded-b-3xl">
                    <span className="text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider block">
                      Recommended Configuration:
                    </span>
                    <strong className="text-xs sm:text-sm text-blue-700 font-bold block mt-0.5">
                      {sec.recommendedBlade}
                    </strong>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Substrate Characteristics & Doctor Blade Dynamics */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-10 shadow-sm border border-slate-200 mb-8 sm:mb-12">
            <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200/80 mb-2 sm:mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              Substrate Science
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 mb-2 sm:mb-3">
              Substrate Dynamics: How Films, Foil & Board Impact Doctor Blades
            </h2>
            <p className="text-xs sm:text-base text-slate-700 leading-relaxed mb-6 sm:mb-8">
              The printed material heavily dictates ink drying behavior, surface tension, and static attraction around the doctor blade holder. Here is how major packaging substrates interact with your wiping system:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {substrateDynamics.map((sub, i) => (
                <div key={i} className="bg-slate-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-200 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5">{sub.substrate}</h3>
                    <p className="text-[11px] sm:text-xs text-slate-500 mb-3 sm:mb-4 font-medium">{sub.characteristics}</p>
                    <div className="space-y-2 sm:space-y-2.5 text-xs text-slate-700 mb-3 sm:mb-4">
                      <div>
                        <strong className="text-slate-900 font-bold block mb-0.5">Doctor Blade Solution:</strong>
                        <span>{sub.doctorBladeDemands}</span>
                      </div>
                      <div>
                        <strong className="text-rose-700 font-bold block mb-0.5">Pressroom Challenge:</strong>
                        <span>{sub.pressChallenge}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Ink Rheology & Viscosity Conversion Table */}
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-slate-200 overflow-hidden mb-8 sm:mb-12">
            <div className="bg-slate-50 border-b border-slate-200 px-4 sm:px-6 py-3.5 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  Pressroom Ink Viscosity Calibration Table
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  Zahn Cup vs. Ford Cup vs. DIN 4 Cup seconds for doctor blade wiping stability
                </p>
              </div>
              <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 sm:px-3 py-1 rounded-full border border-blue-200 self-start sm:self-auto">
                Rheology Standards
              </span>
            </div>
            {/* Mobile swipe helper */}
            <div className="sm:hidden px-4 py-1.5 bg-blue-50/60 text-[11px] font-semibold text-blue-700 flex items-center justify-between border-b border-blue-100">
              <span>← Swipe table horizontally →</span>
              <span>5 columns</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm min-w-[620px]">
                <thead className="bg-slate-50/70 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[11px] sm:text-xs">
                  <tr>
                    <th className="py-3 sm:py-4 px-4 sm:px-5">Printing Process</th>
                    <th className="py-3 sm:py-4 px-4 sm:px-5">Zahn Cup #2</th>
                    <th className="py-3 sm:py-4 px-4 sm:px-5">Ford Cup #4</th>
                    <th className="py-3 sm:py-4 px-4 sm:px-5">DIN 4 Cup</th>
                    <th className="py-3 sm:py-4 px-4 sm:px-5">Pressroom Recommendation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {viscosityGuide.map((vg, i) => (
                    <tr key={i} className="hover:bg-blue-50/40 transition-colors">
                      <td className="py-3 sm:py-4 px-4 sm:px-5 font-bold text-slate-900">{vg.process}</td>
                      <td className="py-3 sm:py-4 px-4 sm:px-5 font-bold text-blue-700">{vg.zahnCup}</td>
                      <td className="py-3 sm:py-4 px-4 sm:px-5 text-slate-700">{vg.fordCup}</td>
                      <td className="py-3 sm:py-4 px-4 sm:px-5 text-slate-700">{vg.dinCup}</td>
                      <td className="py-3 sm:py-4 px-4 sm:px-5 text-slate-700">{vg.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Chambered Systems vs Open Tray Systems */}
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-slate-200 overflow-hidden mb-8 sm:mb-12">
            <div className="bg-slate-50 border-b border-slate-200 px-4 sm:px-6 py-3.5 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  Chambered Doctor Blade Systems vs. Open-Tray Single Blades
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  Comparison of mechanical dynamics, ink preservation, and blade selection
                </p>
              </div>
              <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 sm:px-3 py-1 rounded-full border border-blue-200 self-start sm:self-auto">
                System Comparison
              </span>
            </div>
            {/* Mobile swipe helper */}
            <div className="sm:hidden px-4 py-1.5 bg-blue-50/60 text-[11px] font-semibold text-blue-700 flex items-center justify-between border-b border-blue-100">
              <span>← Swipe table horizontally →</span>
              <span>3 columns</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm min-w-[550px]">
                <thead className="bg-slate-50/70 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[11px] sm:text-xs">
                  <tr>
                    <th className="py-3 sm:py-4 px-4 sm:px-5 w-1/4">Operational Parameter</th>
                    <th className="py-3 sm:py-4 px-4 sm:px-5 w-1/3">Open Tray Systems (Gravure)</th>
                    <th className="py-3 sm:py-4 px-4 sm:px-5 text-blue-700">Closed Chamber Systems (Flexo)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {chamberVsOpen.map((row, i) => (
                    <tr key={i} className="hover:bg-blue-50/40 transition-colors">
                      <td className="py-3 sm:py-4 px-4 sm:px-5 font-bold text-slate-900">{row.attribute}</td>
                      <td className="py-3 sm:py-4 px-4 sm:px-5 text-slate-700">{row.openTray}</td>
                      <td className="py-3 sm:py-4 px-4 sm:px-5 text-blue-700 font-semibold">{row.chambered}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Standard FAQSection Matching All Other Pages */}
        <FAQSection
          subtitle="Sector FAQs"
          title="Frequently Asked Press Application Questions"
          description="Common questions regarding substrate behaviors, chamber end seals, and pressroom doctor blade selection."
          faqs={sectorFaqs}
        />

        <HomeCTA />
      </div>
    </>
  );
}
