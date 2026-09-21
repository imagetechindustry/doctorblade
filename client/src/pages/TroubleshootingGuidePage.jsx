import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/common/SEO";
import TechnicalGuidesNav from "../components/common/TechnicalGuidesNav";
import FAQSection from "../components/common/FAQSection";
import HomeCTA from "../components/home/HomeCTA";

const defectQuickFinder = [
  {
    symptom: "Thin continuous lines in print (Hairline Streaks)",
    likelyCause: "Foreign pigment particle trapped under blade tip or micro-nick in steel edge",
    quickFix: "Oscillate blade assembly; wipe blade edge with lint-free cloth; check inline 100-mesh filter",
    category: "Mechanical",
  },
  {
    symptom: "Hazing / Scumming (Light ink tint on non-image areas)",
    likelyCause: "Blade floating on ink film due to high viscosity or insufficient blade contact angle (< 50°)",
    quickFix: "Reduce ink viscosity with solvent; calibrate contact angle to 55°–60°; check tip wear",
    category: "Fluid / Pressure",
  },
  {
    symptom: "Ink Spitting / Splattering behind blade holder",
    likelyCause: "High press speed generating hydrodynamic pressure exceeding blade stiffness in chamber",
    quickFix: "Switch from 0.150 mm to 0.200 mm blade; reduce blade overhang by 1.5 mm; check end seals",
    category: "Hydrodynamic",
  },
  {
    symptom: "Chrome Cylinder / Anilox Scoring lines",
    likelyCause: "Excessive pneumatic clamping pressure (> 2.0 bar) causing metal-to-metal galling",
    quickFix: "Reduce pressure to 1.2–1.4 bar immediately; switch to WIPEX Polymer or micro-refined Lamella",
    category: "Severe Risk",
  },
  {
    symptom: "Rapid Edge Wear / Feathering in < 4 hours",
    likelyCause: "Abrasive white TiO2 ink or incorrect backing blade support causing tip friction",
    quickFix: "Use WIPEX stainless steel or 15° bevel blade; install straight 0.30mm backing blade",
    category: "Wear",
  },
  {
    symptom: "Back-Doctoring (Ink starvation & chamber buildup)",
    likelyCause: "Containment blade deflection or negative pressure vacuum imbalance in chamber",
    quickFix: "Inspect containment blade thickness (0.35mm polymer); adjust ink supply circulation",
    category: "Chamber System",
  },
  {
    symptom: "Blade Chatter / Washboard Banding Lines",
    likelyCause: "Contact angle too steep (> 65°) or excessive blade overhang causing vibration",
    quickFix: "Reduce contact angle to 58°; shorten blade overhang to 1.2 mm; verify holder rigidity",
    category: "Mechanical",
  },
  {
    symptom: "Edge Flaring & Side Seal Ink Leakage",
    likelyCause: "Blade cut too long or incorrect end seal compression pinching blade edges",
    quickFix: "Recut blade to Cylinder Face − 30 mm; lubricate end seals; adjust chamber clamp stops",
    category: "Chamber System",
  },
];

const defectCards = [
  {
    code: "ERR-01",
    name: "Doctor Blade Streaks & Hairline Drag Lines",
    severity: "High Occurrence",
    mechanism:
      "A dry pigment agglomerate, steel burr, or airborne dust flake lodges behind the wiping contact edge. As the printing cylinder rotates at 300+ m/min, the particle lifts the tip slightly, allowing an unbroken hairline of fluid ink to escape onto the web.",
    countermeasures: [
      "Check ink filtration: verify 100-mesh magnetic inline filters in return lines are cleared.",
      "Verify oscillating mechanism is moving smoothly across a 10–15 mm stroke at 15–20 cycles/min.",
      "Never run press dry: always flood the cylinder with ink before engaging the blade clamp.",
      "Inspect blade edge with a 30x pocket microscope for steel burrs or notches before mounting.",
    ],
    recommendedBlade: "WIPEX Lamella 0.150 mm (0.075 mm parallel tip)",
  },
  {
    code: "ERR-02",
    name: "Hazing, Scumming & Non-Image Toning",
    severity: "Common Gravure Defect",
    mechanism:
      "When line speed increases, fluid ink creates intense hydrodynamic lift forces under the doctor blade. If the blade angle is too low (&lt; 50°) or the ink viscosity is too high (&gt; 22s Zahn #2), the blade floats on an ultra-thin boundary layer, transferring an unwanted color tint to clean packaging film.",
    countermeasures: [
      "Calibrate contact angle with a magnetic angle gauge: maintain strictly between 55° and 60°.",
      "Add solvent/retarder to lower ink viscosity to 15–18 seconds (Zahn Cup #2).",
      "Do NOT simply increase pneumatic pressure; excessive pressure over-bends the blade and worsens hazing.",
      "Switch to a stiffer 0.200 mm WIPEX blade if operating above 350 m/min.",
    ],
    recommendedBlade: "WIPEX Premium Carbon Steel 0.200 mm with Lamella Profile",
  },
  {
    code: "ERR-03",
    name: "Blade Bleeding & Ink Spitting",
    severity: "High-Speed Flexo Defect",
    mechanism:
      "Ink builds up on the exit side of the doctor blade in closed chamber systems. At high line velocities, ink kinetic energy overcomes surface tension, spraying microscopic ink droplets onto the substrate or drying into flakes.",
    countermeasures: [
      "Reduce blade overhang from holder: optimum extension is 1.0 to 1.5 mm past backing blade.",
      "Lower ink circulating pump pressure to avoid overfilling and pressurizing the closed chamber.",
      "Ensure chamber end seals are clean, lubricated, and not pinching or bowing blade ends.",
      "Use stepped Lamella blade to reduce ink accumulation wedge.",
    ],
    recommendedBlade: "WIPEX 0.150 mm Lamella or WIPEX Polymer Blade",
  },
  {
    code: "ERR-04",
    name: "Anilox & Chrome Cylinder Scoring",
    severity: "Catastrophic Equipment Risk",
    mechanism:
      "When operators increase pneumatic cylinder pressure to combat hazing, the steel tip bends past its elastic limit. The sharp steel heel digs directly into engraved copper cells or ceramic cell walls, cutting deep, irreversible grooves into the cylinder.",
    countermeasures: [
      "Enforce maximum pneumatic pressure policy: 1.2 to 1.6 bar on regulator gauge.",
      "Never use worn or dented backing blades; backing blade must be straight within 0.05 mm.",
      "Clean blade holders thoroughly with solvent before installing new blades.",
      "For ceramic anilox rolls, switch to WIPEX Polymer or Round-Edge Stainless Steel.",
    ],
    recommendedBlade: "WIPEX Polymer Doctor Blade or Round-Edge Stainless Steel",
  },
  {
    code: "ERR-05",
    name: "Rapid Tip Wear & Feathering Edge",
    severity: "Abrasive Inks & Whites",
    mechanism:
      "Inks containing high concentrations of Titanium Dioxide (White) or metallic bronze/aluminum pigments act like liquid sandpaper against the steel contact point. Without adequate lubrication, the tip feathers into ragged razor burrs.",
    countermeasures: [
      "Install ink mix rollers in the ink pan to keep dense TiO2 particles uniformly suspended.",
      "Ensure continuous, high-volume ink circulation; eliminate stagnant dead zones in pan corners.",
      "Use WIPEX stainless steel or 15° bevel blades for high metallurgical hardness.",
      "Check cylinder chrome hardness: cylinder chrome should be minimum 950–1050 Vickers (HV).",
    ],
    recommendedBlade: "WIPEX Stainless Steel 0.200 mm or 15° Bevel Blade",
  },
  {
    code: "ERR-06",
    name: "Back-Doctoring in Chamber Systems",
    severity: "Flexo Chamber Defect",
    mechanism:
      "In dual-blade chambered doctor systems, the secondary (containment) blade allows ink to escape onto the anilox roll instead of retaining it inside the chamber, causing uneven density and foam creation.",
    countermeasures: [
      "Use softer polymer blade (0.35 mm) or thinner stainless steel on containment side.",
      "Verify containment blade angle is trailing at 30°–35° to roll surface.",
      "Inspect chamber cavity for ink starvation or negative pressure pockets.",
      "Replace worn chamber end seals every 2 to 3 weeks.",
    ],
    recommendedBlade: "WIPEX Dual-Chamber Matched Blade Set",
  },
  {
    code: "ERR-07",
    name: "Blade Chatter & Washboard Banding Lines",
    severity: "High-Speed Mechanical Defect",
    mechanism:
      "When the contact angle is set too steep (&gt; 65°) or the free blade overhang exceeds 2.5 mm, the blade beam acts like a tuning fork. Mechanical friction against the cylinder excites resonance frequencies, creating periodic wave chatter lines across the web.",
    countermeasures: [
      "Adjust mechanical holder angle to bring effective contact angle to 55°–58°.",
      "Reduce free overhang to 1.2 mm to increase blade beam rigidity.",
      "Check blade holder pivot bearings for backlash or mechanical play.",
      "Slightly reduce line speed until resonance disappears, then re-tune pressure.",
    ],
    recommendedBlade: "WIPEX 0.200 mm Bevel 15° Blade (High Rigidity)",
  },
  {
    code: "ERR-08",
    name: "Mid-Run Color Density Drift (ΔE > 2.0)",
    severity: "Tonal Inconsistency",
    mechanism:
      "Generic non-lamella blades widen their contact area as the steel wears away. The widened contact surface reduces localized contact pressure, allowing heavier ink films to transfer and darkening halftone print tones over 8-hour runs.",
    countermeasures: [
      "Replace generic flat-edge blades with WIPEX parallel Lamella blades.",
      "Maintain strict ink viscosity control (automated viscosity dosing system).",
      "Do not increase pneumatic pressure mid-run; let the lamella parallel edge self-meter.",
      "Ensure press temperature control keeps ink reservoir within 22°C–25°C.",
    ],
    recommendedBlade: "WIPEX Lamella Carbon Steel 0.150 mm",
  },
];

const diagnosticFlowchart = [
  {
    step: "1. Check Defect Trajectory",
    question: "Is the streak line oscillating side-to-side with the blade stroke?",
    yesResult: "The particle is stuck under the blade tip. Swipe blade with a soft wipe and check ink filter.",
    noResult: "The streak is stationary. The cylinder chrome is gouged or there is a dry ink build-up on the impression roll.",
  },
  {
    step: "2. Check Station Distribution",
    question: "Does the defect appear in only one printing unit or across multiple stations?",
    yesResult: "Single station: Issue is localized to blade mounting, holder angle, or contaminated ink pan.",
    noResult: "Multiple stations: Issue is systemic (high press velocity, low solvent quality, or web tension flutter).",
  },
  {
    step: "3. Check Time to Failure",
    question: "Did the problem start within 5 minutes of blade replacement?",
    yesResult: "Mounting error: Blade is clamped with ripples, overhang is uneven, or holder jaws contain dried ink.",
    noResult: "Wear-related: Blade has feathered, pigment has settled in pan dead zones, or viscosity has drifted.",
  },
];

const troubleshootingFaqs = [
  {
    question: "How do I stop doctor blade lines and streaks during a run?",
    answer: "Immediately activate or increase doctor blade oscillation (10–15 mm stroke). If the streak persists, carefully pass a soft wooden spatula or lint-free wipe along the non-contact side of the blade to dislodge trapped particles. Ensure your ink filter (100-mesh) is clean and the ink reservoir is free of dried skin flakes.",
  },
  {
    question: "Why does increasing doctor blade pressure cause more hazing?",
    answer: "When you over-pressurize a doctor blade (> 2.0 bar), the thin steel tip bends flat against the cylinder face instead of shearing at the correct 55°–60° angle. The contact area widens from 0.075 mm to over 0.5 mm, creating a wedge that pulls fluid ink under the blade, worsening hazing and scoring the cylinder.",
  },
  {
    question: "What is the recommended pneumatic clamping pressure for doctor blades?",
    answer: "Recommended pressure is between 1.2 and 1.6 bar (17 to 23 PSI). Always set the pressure to the minimum level that produces a completely clean wipe. Running at 1.3 bar extends cylinder life by up to 35% compared to running at 2.2 bar.",
  },
  {
    question: "How often should doctor blades be changed on high-speed presses?",
    answer: "On standard solvent gravure packaging lines running carbon steel lamella blades, change intervals average 100,000 to 150,000 linear meters. On abrasive white ink stations, carbon blades may wear in 40,000 meters; upgrading to WIPEX stainless steel extends white run life beyond 120,000 meters.",
  },
  {
    question: "What causes blade chatter and horizontal washboard lines across the web?",
    answer: "Blade chatter is caused by mechanical resonance when the contact angle is too steep (> 65°), the blade overhang exceeds 2.0 mm, or the pneumatic holder lacks hydraulic damping. Reducing overhang to 1.2 mm and setting the angle to 58° eliminates chatter.",
  },
  {
    question: "How do I clean doctor blade holders to prevent wavy clamping?",
    answer: "Use brass brushes and suitable solvent to remove dried ink varnish from both upper and lower clamping jaws. Never scrape holders with steel scrapers, as gouged jaws cause uneven clamping pressure and blade waviness.",
  },
  {
    question: "Why is doctor blade oscillation essential for streak prevention?",
    answer: "Oscillation continuously slides the blade 10 to 15 mm back and forth across the cylinder face. This transverse motion dislodges microscopic pigment clusters from the tip and distributes abrasive wear evenly, preventing localized groove scoring.",
  },
  {
    question: "What should I do if the cylinder chrome is scored by a blade?",
    answer: "Stop the press immediately. Remove the damaged blade and inspect the holder for burrs. Light copper or chrome polish may buff out superficial lines; deep scores require cylinder de-chroming, re-copper plating, engraving, and re-chroming.",
  },
];

export default function TroubleshootingGuidePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [filterCategory, setFilterCategory] = useState("All");

  const categories = ["All", "Mechanical", "Fluid / Pressure", "Hydrodynamic", "Wear", "Severe Risk", "Chamber System"];

  const filteredQuickFinder =
    filterCategory === "All"
      ? defectQuickFinder
      : defectQuickFinder.filter((item) => item.category === filterCategory);

  const techArticleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "Doctor Blade Defect Troubleshooting Guide: Root Causes & Pressroom Countermeasures",
    description: "Shop-floor troubleshooting guide for flexographic and rotogravure doctor blades. Fix streaks, hazing, ink spitting, cylinder scoring, and rapid blade wear.",
    url: "https://www.doctorblade.co.in/troubleshooting-guide",
    author: {
      "@type": "Organization",
      name: "ImageTech Industries",
    },
  };

  return (
    <>
      <SEO
        title="Doctor Blade Troubleshooting Guide | Fix Doctor Blade Streaks, Hazing & Spitting"
        description="Master doctor blade troubleshooting with practical solutions for rotogravure and flexo printing defects. Eliminate doctor blade streaks, cylinder hazing, ink spitting, and premature doctor blade wear using proven press adjustments. Follow our step-by-step doctor blade installation and maintenance SOP to extend your doctor blade lifespan. Inspect doctor blade contact angles and doctor blade pressure settings to prevent anilox cylinder scoring."
        keywords={[
          "doctor blade",
          "doctor blade troubleshooting",
          "doctor blade streaks",
          "doctor blade hazing",
          "doctor blade spitting",
          "doctor blade wear",
          "doctor blade chatter marks",
          "doctor blade angle adjustment",
          "anilox scoring doctor blade",
          "rotogravure doctor blade defects",
          "flexo doctor blade troubleshooting",
          "doctor blade SOP",
          "doctor blade maintenance",
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
            <span className="text-slate-900 font-bold">Defect Troubleshooting</span>
          </nav>

          {/* Technical Guides Suite Sub-Nav */}
          <TechnicalGuidesNav />

          {/* Hero Header */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-12 shadow-sm border border-slate-200 mb-8 sm:mb-12">
            <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200/80 mb-3 sm:mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              Pillar 02 • Defect Diagnostic Suite
            </span>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3 sm:mb-4">
              Doctor Blade <span className="text-blue-600">Defect Troubleshooting</span> Guide
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-slate-700 max-w-3xl leading-relaxed mb-6 sm:mb-8">
              Pressroom printing defects cost packaging plants thousands of dollars in scrapped substrate and downtime every shift. This guide provides quick diagnosis, hydrodynamic root cause analysis, and field-tested solutions for every doctor blade wiping defect.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-6 pt-5 sm:pt-6 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-blue-50 text-blue-700 border border-blue-200/60 flex items-center justify-center font-black text-xs sm:text-sm shrink-0">
                  01
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900">Zero Guesswork</div>
                  <div className="text-[11px] sm:text-xs text-slate-600">Symptom-to-solution matrix</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-blue-50 text-blue-700 border border-blue-200/60 flex items-center justify-center font-black text-xs sm:text-sm shrink-0">
                  02
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900">Pressroom Safety</div>
                  <div className="text-[11px] sm:text-xs text-slate-600">Anilox scoring prevention</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-blue-50 text-blue-700 border border-blue-200/60 flex items-center justify-center font-black text-xs sm:text-sm shrink-0">
                  03
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900">Standard SOP</div>
                  <div className="text-[11px] sm:text-xs text-slate-600">Mounting torque sequence</div>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Defect Quick-Finder (Interactive Filter) */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-sm border border-slate-200 mb-8 sm:mb-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-5 sm:mb-6">
              <div>
                <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200/80 mb-1.5 sm:mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                  Visual Quick-Finder
                </span>
                <h2 className="text-lg sm:text-2xl font-extrabold text-slate-900">
                  Identify Your Print Defect in Seconds
                </h2>
              </div>

              {/* Filter Pills */}
              <div className="flex flex-wrap gap-1 sm:gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilterCategory(cat)}
                    className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold transition-all cursor-pointer border ${
                      filterCategory === cat
                        ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                        : "bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {filteredQuickFinder.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200 hover:border-blue-300 hover:bg-white transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                        {item.category}
                      </span>
                    </div>
                    <h3 className="font-bold text-sm sm:text-base text-slate-900 mb-1.5 group-hover:text-blue-600 transition-colors">
                      {item.symptom}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-3">
                      <strong className="text-slate-800">Cause:</strong> {item.likelyCause}
                    </p>
                  </div>
                  <div className="pt-2.5 border-t border-slate-200 text-xs text-emerald-800 font-semibold bg-emerald-50/80 p-2.5 sm:p-3 rounded-lg sm:rounded-xl">
                    <strong className="text-emerald-900 block mb-0.5">Quick Fix:</strong>
                    {item.quickFix}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Operator 3-Step Root Cause Decision Tree */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-10 shadow-sm border border-slate-200 mb-8 sm:mb-12">
            <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200/80 mb-2 sm:mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              Pressroom Flowchart
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 mb-2 sm:mb-3">
              Press Operator Root Cause Decision Tree
            </h2>
            <p className="text-xs sm:text-base text-slate-700 leading-relaxed mb-6 sm:mb-8">
              When a defect appears on the printed web, do not immediately stop the press or crank up pneumatic pressure. Follow this 3-question diagnostic sequence to isolate the cause:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {diagnosticFlowchart.map((fc, i) => (
                <div key={i} className="bg-slate-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-200 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] sm:text-xs font-black text-blue-700 uppercase tracking-wider block mb-1.5 sm:mb-2">
                      {fc.step}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-3 sm:mb-4">{fc.question}</h3>
                    <div className="space-y-2.5 sm:space-y-3 text-xs">
                      <div className="bg-white p-2.5 sm:p-3 rounded-lg sm:rounded-xl border border-slate-200">
                        <strong className="text-emerald-700 font-bold block mb-0.5">IF YES:</strong>
                        <span className="text-slate-700 leading-relaxed">{fc.yesResult}</span>
                      </div>
                      <div className="bg-white p-2.5 sm:p-3 rounded-lg sm:rounded-xl border border-slate-200">
                        <strong className="text-rose-700 font-bold block mb-0.5">IF NO:</strong>
                        <span className="text-slate-700 leading-relaxed">{fc.noResult}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Deep-Dive Defect Cards (8 Detailed Defects) */}
          <div className="mb-8 sm:mb-12">
            <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-10 px-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200/80 mb-2 sm:mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                In-Depth Root Cause Breakdown
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                Detailed Mechanical & Hydrodynamic Solutions
              </h2>
              <p className="text-xs sm:text-base text-slate-700 mt-2">
                Actionable pressroom countermeasures to permanently resolve the 8 most common doctor blade defects.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              {defectCards.map((card) => (
                <div
                  key={card.code}
                  className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-slate-100 mb-3 sm:mb-4">
                      <span className="font-mono text-[11px] sm:text-xs font-bold text-blue-700 bg-blue-50 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md sm:rounded-lg border border-blue-200">
                        {card.code}
                      </span>
                      <span className="text-[11px] sm:text-xs font-bold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                        {card.severity}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 sm:mb-3 group-hover:text-blue-600 transition-colors">
                      {card.name}
                    </h3>

                    <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-amber-50/70 border border-amber-200 mb-4 sm:mb-5 text-xs sm:text-sm text-slate-800 leading-relaxed">
                      <strong className="text-slate-900 font-bold block mb-1">
                        Failure Mechanism:
                      </strong>
                      {card.mechanism}
                    </div>

                    <div>
                      <strong className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-800 block mb-2">
                        Pressroom Action Plan:
                      </strong>
                      <ul className="space-y-2 mb-4 sm:mb-6">
                        {card.countermeasures.map((step, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-1.5"></span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-3 sm:pt-4 border-t border-slate-100 bg-slate-50 -mx-4 -mb-4 sm:-mx-6 sm:-mb-6 lg:-mx-8 lg:-mb-8 p-3.5 sm:p-5 rounded-b-2xl sm:rounded-b-3xl">
                    <span className="text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider block">
                      Recommended Doctor Blade:
                    </span>
                    <strong className="text-xs sm:text-sm text-blue-700 font-bold block mt-0.5">
                      {card.recommendedBlade}
                    </strong>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Standard Operating Procedure (SOP) Card (100% Light Theme) */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-10 text-slate-900 shadow-md border border-slate-200 mb-8 sm:mb-12">
            <div className="max-w-3xl mb-6 sm:mb-8">
              <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200/80 mb-2 sm:mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                Quality Protocol
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 mb-2 sm:mb-3">
                Doctor Blade Mounting & Alignment SOP
              </h2>
              <p className="text-xs sm:text-base text-slate-700 leading-relaxed">
                Over 70% of premature doctor blade failures stem from wavy clamping or uneven torque during blade changeovers. Follow this 4-point standard operating procedure:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-6 text-xs sm:text-sm">
              <div className="bg-slate-50 p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200 shadow-xs">
                <div className="font-bold text-sm sm:text-base text-blue-700 mb-1">1. Center-Out Torque Sequence</div>
                <p className="text-slate-700 leading-relaxed">
                  Always tighten holder bolts starting from the absolute center and working outward in alternating pairs. This eliminates ripples and blade buckle waves.
                </p>
              </div>
              <div className="bg-slate-50 p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200 shadow-xs">
                <div className="font-bold text-sm sm:text-base text-blue-700 mb-1">2. Overhang Verification</div>
                <p className="text-slate-700 leading-relaxed">
                  Verify blade overhang past backing blade with a depth gauge. Maintain uniform 1.0 to 1.5 mm extension along the entire cylinder length.
                </p>
              </div>
              <div className="bg-slate-50 p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200 shadow-xs">
                <div className="font-bold text-sm sm:text-base text-blue-700 mb-1">3. The 55°–60° Angle Check</div>
                <p className="text-slate-700 leading-relaxed">
                  Use a magnetic angle finder against the blade holder. Contact angles below 50° promote ink floating; angles over 65° induce rapid cylinder wear.
                </p>
              </div>
              <div className="bg-slate-50 p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200 shadow-xs">
                <div className="font-bold text-sm sm:text-base text-blue-700 mb-1">4. Minimum Necessary Pressure</div>
                <p className="text-slate-700 leading-relaxed">
                  Begin at 1.0 bar pneumatic pressure. Increment by 0.1 bar only until wiping becomes clean. Never exceed 1.8 bar under normal operating conditions.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Standard FAQSection Matching All Other Pages */}
        <FAQSection
          subtitle="Defect Troubleshooting FAQs"
          title="Frequently Asked Pressroom Troubleshooting Questions"
          description="Actionable answers from printing specialists on resolving streaks, hazing, spitting, chatter, and cylinder scoring."
          faqs={troubleshootingFaqs}
        />

        <HomeCTA />
      </div>
    </>
  );
}
