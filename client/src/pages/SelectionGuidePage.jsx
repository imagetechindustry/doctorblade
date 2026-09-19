import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/common/SEO";
import TechnicalGuidesNav from "../components/common/TechnicalGuidesNav";
import FAQSection from "../components/common/FAQSection";
import HomeCTA from "../components/home/HomeCTA";

const thicknessData = [
  {
    thickness: "0.150 mm (0.006\")",
    profile: "Lamella (0.065–0.075 mm tip)",
    speedRange: "Up to 350 m/min",
    bestFor: "Fine process flexo & rotogravure halftone screen printing (175+ LPI)",
    pressure: "1.0 – 1.4 bar",
    advantage: "Immediate clean contact; zero run-in scrap or startup waste.",
  },
  {
    thickness: "0.200 mm (0.008\")",
    profile: "Lamella / Bevel 15°",
    speedRange: "300 – 600 m/min",
    bestFor: "High-speed flexible packaging, wide-web gravure & solid color laydowns",
    pressure: "1.4 – 2.0 bar",
    advantage: "High beam stiffness; completely neutralizes hydrodynamic ink lift at high speeds.",
  },
  {
    thickness: "0.250–0.300 mm",
    profile: "Bevel 30° / Radius",
    speedRange: "Up to 300 m/min",
    bestFor: "Coating, lacquering, laminating, varnishes & abrasive white stations",
    pressure: "2.0 – 2.5 bar",
    advantage: "Maximum mechanical resistance against viscous coating formulations.",
  },
  {
    thickness: "0.350–0.500 mm (Polymer)",
    profile: "Beveled / Rounded",
    speedRange: "Up to 280 m/min",
    bestFor: "Corrugated carton printing, chambered anilox protection, water inks",
    pressure: "1.2 – 1.8 bar",
    advantage: "100% safe for operator hands; zero risk of ceramic anilox scoring.",
  },
];

const chemicalTolerance = [
  {
    solvent: "Ethyl Acetate & Ethanol",
    carbonSteel: "Excellent (Standard Choice)",
    stainlessSteel: "Excellent",
    polymer: "Good (Verify Swell)",
    notes: "Standard solvent-based rotogravure inks. Carbon steel delivers the sharpest wipe without micro-notching.",
  },
  {
    solvent: "Water & Glycol Ether (pH 8.2–9.5)",
    carbonSteel: "Moderate (Requires Immediate Wash)",
    stainlessSteel: "Superior (No Oxidation)",
    polymer: "Excellent (100% Corrosion-Free)",
    notes: "For water-based flexo inks, stainless steel or engineered polymer prevents microscopic edge rust pitting.",
  },
  {
    solvent: "UV Monomers & Photoinitiators",
    carbonSteel: "Excellent",
    stainlessSteel: "Excellent",
    polymer: "Very Good",
    notes: "Requires a stiff blade beam (0.20 mm) to overcome UV ink's higher tack and hydraulic shear resistance.",
  },
  {
    solvent: "Titanium Dioxide (White) & Metallics",
    carbonSteel: "Good (Fast Wear)",
    stainlessSteel: "Very Good",
    polymer: "Good for Ceramic Anilox",
    notes: "Highly abrasive pigments act like liquid sandpaper. Use 0.20 mm Lamella or hardened stainless steel.",
  },
];

const metallurgyComparison = [
  {
    alloy: "WIPEX Premium Swedish Carbon Steel",
    hardness: "580 – 600 Vickers (HV)",
    tensile: "2000 – 2150 N/mm²",
    microstructure: "Fine-grained martensitic structure (< 2 μm carbides)",
    bestUses: "Solvent packaging gravure, high-definition flexo, flexible barrier films",
    benefit: "Clean micro-wearing without jagged teeth or burrs that score copper cylinders.",
  },
  {
    alloy: "WIPEX Martensitic Stainless Steel (AISI 420)",
    hardness: "570 – 590 Vickers (HV)",
    tensile: "1900 – 2050 N/mm²",
    microstructure: "13% Chromium alloy with rust passivating boundary",
    bestUses: "Water-based inks, high-pH flexo, long-run abrasive white ink stations",
    benefit: "100% immune to water ink rust pitting, acid etching, and edge discoloration.",
  },
  {
    alloy: "WIPEX Ceramic / Hard-Coated Carbon Steel",
    hardness: "850 – 950 Vickers (HV)",
    tensile: "2150 – 2300 N/mm²",
    microstructure: "Sub-micron ceramic matrix coating bonded to steel base",
    bestUses: "Abrasive white TiO2 inks, metallic gold/silver inks, decorative laminates",
    benefit: "Extends blade life 3x to 5x on the most abrasive printing formulations.",
  },
  {
    alloy: "WIPEX Engineered Non-Metallic Polymer",
    hardness: "Shore D 80 – 85",
    tensile: "Flexible polymer matrix",
    microstructure: "100% synthetic ultra-high molecular weight composition",
    bestUses: "Corrugated fluted carton board, ceramic anilox rolls, containment blades",
    benefit: "Completely eliminates ceramic roll score lines and guarantees zero operator hand injuries.",
  },
];

const sizingExamples = [
  { cylinderFace: "800 mm", buffer: "30 mm (15 mm each side)", bladeLength: "770 mm", holderType: "Standard Gravure Cartridge" },
  { cylinderFace: "1050 mm", buffer: "30 mm (15 mm each side)", bladeLength: "1020 mm", holderType: "Wide Web Solvent Packaging" },
  { cylinderFace: "1250 mm", buffer: "30 mm (15 mm each side)", bladeLength: "1220 mm", holderType: "High-Speed Film Line" },
  { cylinderFace: "1600 mm", buffer: "40 mm (20 mm each side)", bladeLength: "1560 mm", holderType: "Jumbo Wide-Web Gravure" },
];

const selectionFaqs = [
  {
    question: "What is the best doctor blade thickness for rotogravure printing?",
    answer: "For process printing and fine halftone screens (150 to 200+ LPI), 0.150 mm (0.006\") carbon steel with a precision 0.075 mm lamella tip is the industry standard. For high-speed lines running over 350 m/min or abrasive white ink stations, 0.200 mm (0.008\") is recommended to prevent hydrodynamic blade lift and tip feathering.",
  },
  {
    question: "Why does a lamella doctor blade wipe better than a bevel blade?",
    answer: "A lamella blade features a precision stepped, parallel tip edge (e.g., 0.075 mm thick by 1.3 mm long). Because the tip thickness remains uniform as the steel wears away, the contact area against the cylinder never increases. This guarantees stable color density and eliminates mid-run tone shift without needing pressure adjustments.",
  },
  {
    question: "How do I calculate the exact doctor blade length for my cylinder?",
    answer: "Measure the active engraved copper face of your printing cylinder and subtract 30 mm (15 mm clearance on each end). For example, a 1050 mm cylinder requires a 1020 mm doctor blade. This safety clearance prevents the blade corners from snagging against ink pans or side seals during press oscillation.",
  },
  {
    question: "What is the proper backing blade thickness and overhang?",
    answer: "A backing blade should be 0.30 mm to 0.50 mm thick. The doctor blade should extend exactly 1.0 mm to 1.5 mm past the backing blade edge. If the overhang exceeds 2.0 mm, the blade flexes excessively, creating ink spitting and hazing.",
  },
  {
    question: "When should I switch from carbon steel to stainless steel doctor blades?",
    answer: "Switch to stainless steel when printing with water-based flexographic inks (which contain corrosive amines and high pH) or when running 24-hour continuous white ink stations where abrasive TiO2 pigments wear carbon steel tips down in under 4 hours.",
  },
  {
    question: "What causes doctor blade lines, streaks, and hazing?",
    answer: "Streaks occur when blade burrs or dried ink agglomerates get wedged beneath the blade tip, lifting it microscopically. Background hazing occurs when low pneumatic pressure or incorrect contact angle (< 50°) allows hydrodynamic ink pressure to float the blade over non-image areas.",
  },
  {
    question: "How should doctor blade coils be stored to prevent rust and warping?",
    answer: "Store coils horizontally in their original protective packaging with vapor corrosion inhibitor (VCI) paper in a dry, climate-controlled room (18°C–25°C, humidity < 50%). Never drop coil boxes on their rims, as dented edges cause irreversible waviness along the blade length.",
  },
  {
    question: "Can polymer doctor blades replace steel on rotogravure printing presses?",
    answer: "Polymer doctor blades are ideal for flexographic ceramic anilox rolls and chamber containment blades, but carbon steel or stainless steel remains mandatory for rotogravure cylinders. Steel provides the sharp microscopic shearing edge needed to wipe fluid inks from shallow engraved copper cells without bleeding.",
  },
];

export default function SelectionGuidePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Interactive Calculator State
  const [machineType, setMachineType] = useState("gravure");
  const [pressSpeed, setPressSpeed] = useState("medium");
  const [inkType, setInkType] = useState("solvent");
  const [cylinderWidth, setCylinderWidth] = useState(1050);

  const calculateRecommendation = () => {
    let thickness = "0.150 mm";
    let edge = "Lamella (0.075 mm tip)";
    let material = "WIPEX Premium Carbon Steel";
    let pressure = "1.2 – 1.5 bar";
    let reasoning = "Balanced wiping profile for clean tone reproduction without cylinder chrome wear.";

    if (machineType === "coating") {
      thickness = "0.250 mm or 0.300 mm";
      edge = "Bevel 30° / Radius";
      material = "WIPEX Stainless Steel or Hardened Carbon";
      pressure = "2.0 – 2.4 bar";
      reasoning = "Heavier thickness prevents blade deflection under thick, viscous coating formulations.";
    } else if (pressSpeed === "high") {
      thickness = "0.200 mm";
      edge = "Lamella 0.075 mm x 1.3 mm";
      pressure = "1.6 – 2.0 bar";
      reasoning = "Higher beam rigidity prevents hydrodynamic ink lift over 350 m/min.";
    }

    if (inkType === "water") {
      material = "WIPEX Stainless Steel (Anti-Corrosive)";
      reasoning += " Stainless steel prevents edge rust and oxidation from alkaline water inks.";
    } else if (inkType === "white") {
      thickness = "0.200 mm";
      edge = "Bevel 15° or Heavy Lamella";
      reasoning += " Abrasive TiO2 particles demand greater edge durability and rigidity.";
    } else if (machineType === "flexo" && inkType === "water") {
      material = "WIPEX Polymer or Stainless Steel";
    }

    const recommendedWidth = Math.max(300, cylinderWidth - 30);

    return {
      thickness,
      edge,
      material,
      pressure,
      reasoning,
      recommendedWidth,
    };
  };

  const recommendation = calculateRecommendation();

  // Structured Data Schema
  const techArticleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "Doctor Blade Selection & Sizing Guide: Sizing Formulas, Thickness & Edge Profiles",
    description: "Comprehensive engineering selection guide for industrial doctor blades. Includes interactive sizing calculator, thickness tolerance matrix, metallurgy comparisons, and 3-step operator measurement instructions.",
    url: "https://www.doctorblade.co.in/selection-guide",
    author: {
      "@type": "Organization",
      name: "ImageTech Industries",
    },
    publisher: {
      "@type": "Organization",
      name: "ImageTech Industries",
      logo: "https://www.doctorblade.co.in/logo.png",
    },
  };

  return (
    <>
      <SEO
        title="Doctor Blade Selection & Sizing Guide | Calculator, Thickness & Edge Profiles"
        description="Complete doctor blade selection guide for rotogravure & flexo printing presses. Interactive blade calculator, thickness specifications (0.15mm / 0.20mm), lamella vs bevel edge comparison, metallurgy guide, and solvent compatibility."
        keywords={[
          "doctor blade",
          "doctor blade selection guide",
          "doctor blade calculator",
          "doctor blade thickness",
          "doctor blade sizing",
          "doctor blade lamella",
          "doctor blade in flexography",
          "rotogravure doctor blade sizing",
          "carbon steel doctor blade 0.15mm",
          "stainless steel doctor blade",
          "polymer doctor blade",
          "ImageTech Industries",
        ]}
        schema={[techArticleSchema]}
      />

      <div className="bg-slate-50 min-h-screen py-6 lg:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="text-sm font-semibold mb-6 flex text-slate-500">
            <Link to="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link to="/sitemap" className="hover:text-blue-600 transition-colors">
              Technical Guides
            </Link>
            <span className="mx-2">/</span>
            <span className="text-slate-900 font-bold">Selection Guide</span>
          </nav>

          {/* Technical Guides Suite Sub-Nav */}
          <TechnicalGuidesNav />

          {/* Hero Header */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-200 mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200/80 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              Pillar 01 • Engineering Specification
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
              Doctor Blade <span className="text-blue-600">Selection & Sizing</span> Guide
            </h1>
            <p className="text-base sm:text-lg text-slate-700 max-w-3xl leading-relaxed mb-8">
              Choosing the exact doctor blade thickness, edge geometry, and steel metallurgy prevents 90% of pressroom defects—including background hazing, streak lines, premature cylinder chrome scoring, and ink spitting. Use this engineering guide to select the optimum blade specification for your rotogravure, flexo, or coating line.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-100">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 border border-blue-200/60 flex items-center justify-center font-black text-sm shrink-0">
                  01
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">ISO 9001:2015 Spec</div>
                  <div className="text-xs text-slate-600">Precision tolerances ±0.005 mm</div>
                </div>
              </div>
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 border border-blue-200/60 flex items-center justify-center font-black text-sm shrink-0">
                  02
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">Uniform Contact</div>
                  <div className="text-xs text-slate-600">Lamella parallel wiping action</div>
                </div>
              </div>
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 border border-blue-200/60 flex items-center justify-center font-black text-sm shrink-0">
                  03
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">Zero Cylinder Wear</div>
                  <div className="text-xs text-slate-600">Micro-refined metallurgical hardness</div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Calculator Section (100% Light Theme) */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border border-slate-200 mb-12 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8 pb-6 border-b border-slate-100">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200/80 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                  Interactive Pressroom Sizing Tool
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  Doctor Blade Sizing & Specification Calculator
                </h2>
              </div>
              <span className="self-start sm:self-auto bg-blue-50 text-blue-700 border border-blue-200 px-3.5 py-1.5 rounded-full text-xs font-bold">
                Instant Pressroom Output
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Inputs */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                    1. Printing Press Process Type
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {[
                      { id: "gravure", label: "Rotogravure" },
                      { id: "flexo", label: "Flexographic" },
                      { id: "coating", label: "Coating / Lacquer" },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setMachineType(item.id)}
                        className={`py-3 px-3 rounded-xl text-xs font-bold transition-all text-center cursor-pointer border ${
                          machineType === item.id
                            ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/30"
                            : "bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                    2. Operating Press Speed
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {[
                      { id: "slow", label: "< 180 m/min" },
                      { id: "medium", label: "180 – 350 m/min" },
                      { id: "high", label: "350 – 600+ m/min" },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setPressSpeed(item.id)}
                        className={`py-3 px-3 rounded-xl text-xs font-bold transition-all text-center cursor-pointer border ${
                          pressSpeed === item.id
                            ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/30"
                            : "bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                    3. Ink Formulation & Chemistry
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      { id: "solvent", label: "Solvent" },
                      { id: "water", label: "Water-Based" },
                      { id: "uv", label: "UV Curable" },
                      { id: "white", label: "Abrasive White" },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setInkType(item.id)}
                        className={`py-3 px-2 rounded-xl text-xs font-bold transition-all text-center cursor-pointer border ${
                          inkType === item.id
                            ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/30"
                            : "bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      4. Engraved Cylinder Face Width: <span className="text-blue-600 font-extrabold">{cylinderWidth} mm</span>
                    </label>
                    <span className="text-xs text-slate-500 font-medium">Range: 400 to 2200 mm</span>
                  </div>
                  <input
                    type="range"
                    min="400"
                    max="2200"
                    step="50"
                    value={cylinderWidth}
                    onChange={(e) => setCylinderWidth(Number(e.target.value))}
                    className="w-full accent-blue-600 h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>

              {/* Outputs (Clean Light Card) */}
              <div className="lg:col-span-6 bg-slate-50 rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-5">
                    <span className="text-xs font-black uppercase tracking-wider text-blue-700">
                      Engineered Recommendation
                    </span>
                    <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full font-extrabold">
                      Optimal Configuration
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-5">
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                      <span className="text-xs font-bold text-slate-500 uppercase block">Blade Thickness</span>
                      <div className="text-xl font-extrabold text-slate-900 mt-1">
                        {recommendation.thickness}
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                      <span className="text-xs font-bold text-slate-500 uppercase block">Edge Geometry</span>
                      <div className="text-xl font-extrabold text-slate-900 mt-1 truncate" title={recommendation.edge}>
                        {recommendation.edge}
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                      <span className="text-xs font-bold text-slate-500 uppercase block">Material Alloy</span>
                      <div className="text-sm sm:text-base font-extrabold text-blue-700 mt-1 truncate" title={recommendation.material}>
                        {recommendation.material}
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                      <span className="text-xs font-bold text-slate-500 uppercase block">Clamping Pressure</span>
                      <div className="text-xl font-extrabold text-slate-900 mt-1">
                        {recommendation.pressure}
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50/70 border border-blue-200 p-4 rounded-xl mb-4 text-sm text-slate-800 leading-relaxed">
                    <strong className="text-slate-900 font-bold block mb-1">Engineering Rationale:</strong>
                    {recommendation.reasoning}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600 bg-white p-3.5 rounded-xl border border-slate-200">
                    <span className="font-semibold text-slate-700">Recommended Blade Length:</span>
                    <strong className="text-slate-900 text-sm">{recommendation.recommendedWidth} mm</strong>
                    <span className="text-blue-700 font-medium">(Cylinder − 30 mm buffer)</span>
                  </div>
                </div>

                <button
                  onClick={() => window.dispatchEvent(new CustomEvent("open-quote-modal"))}
                  className="mt-6 w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm tracking-wide transition-all shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Request Custom Blade Quote For This Setup</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Section: The Complete Doctor Blade Sizing Formula & Calculation Rules */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-200 mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200/80 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              Engineering Formulas
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
              Doctor Blade Sizing Rules: Length, Width & Backing Blade Formulas
            </h2>
            <p className="text-base text-slate-700 leading-relaxed mb-8">
              Accurate blade sizing is essential for mechanical stability. A blade cut too long snags against side ink pans and seals; a blade cut too short leaves un-wiped cylinder borders that dry into abrasive rings. Use these formulas for zero-error installation:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <div className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-2">
                  Formula 1: Cut Length
                </div>
                <div className="bg-white p-3 rounded-xl border border-blue-200 font-mono text-sm font-bold text-blue-900 mb-3">
                  L_blade = L_face − 30 mm
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Provide exactly 15 mm clearance at each end of the active engraved cylinder face. This clearance accommodates press oscillation strokes (10–15 mm) without colliding with side dams.
                </p>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <div className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-2">
                  Formula 2: Total Blade Width
                </div>
                <div className="bg-white p-3 rounded-xl border border-blue-200 font-mono text-sm font-bold text-blue-900 mb-3">
                  W_total = Clamp Depth + Overhang
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Total blade width must cover the holder clamping jaw depth plus the exact free extension. Standard industrial widths are 30 mm, 40 mm, 50 mm, and 60 mm.
                </p>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <div className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-2">
                  Formula 3: Free Blade Overhang
                </div>
                <div className="bg-white p-3 rounded-xl border border-blue-200 font-mono text-sm font-bold text-blue-900 mb-3">
                  Overhang = 1.0 mm to 1.5 mm
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  The doctor blade should extend strictly 1.0 to 1.5 mm past the backing blade. An overhang exceeding 2.0 mm causes excessive beam flex, chattering, and ink spitting.
                </p>
              </div>
            </div>

            {/* Sizing Matrix Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-xs">
                  <tr>
                    <th className="py-3.5 px-4">Active Cylinder Width</th>
                    <th className="py-3.5 px-4">Safety Buffer</th>
                    <th className="py-3.5 px-4">Recommended Cut Blade Length</th>
                    <th className="py-3.5 px-4">Typical Press Category</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {sizingExamples.map((ex, i) => (
                    <tr key={i} className="hover:bg-blue-50/40 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-900">{ex.cylinderFace}</td>
                      <td className="py-3.5 px-4 text-slate-600">{ex.buffer}</td>
                      <td className="py-3.5 px-4 font-bold text-blue-700">{ex.bladeLength}</td>
                      <td className="py-3.5 px-4 text-slate-700">{ex.holderType}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section: Metallurgy, Steel Hardness & Carbide Microstructure */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-200 mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200/80 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              Materials Engineering
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
              Doctor Blade Metallurgy: Carbon Steel vs. Stainless vs. Ceramic vs. Polymer
            </h2>
            <p className="text-base text-slate-700 leading-relaxed mb-8">
              The chemical composition and crystalline microstructure of doctor blade steel determine how the wiping edge wears. Sub-standard carbon steels contain irregular, oversized carbide clusters that chip away into microscopic notches, creating hairline print streaks. WIPEX doctor blades use ultra-refined metallurgical alloys:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {metallurgyComparison.map((mat, i) => (
                <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{mat.alloy}</h3>
                    <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
                      <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                        <span className="text-slate-500 block font-semibold">Hardness:</span>
                        <strong className="text-blue-700 text-sm">{mat.hardness}</strong>
                      </div>
                      <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                        <span className="text-slate-500 block font-semibold">Tensile Strength:</span>
                        <strong className="text-slate-900 text-sm">{mat.tensile}</strong>
                      </div>
                    </div>
                    <div className="space-y-2 text-xs text-slate-700 mb-4">
                      <div>
                        <strong className="text-slate-900 font-bold block mb-0.5">Microstructure:</strong>
                        <span>{mat.microstructure}</span>
                      </div>
                      <div>
                        <strong className="text-slate-900 font-bold block mb-0.5">Ideal Pressroom Use:</strong>
                        <span>{mat.bestUses}</span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-slate-200 text-xs text-emerald-800 font-semibold bg-emerald-50/70 p-3 rounded-xl">
                    <strong className="text-emerald-900 block mb-0.5">Key Press Benefit:</strong>
                    {mat.benefit}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3-Step Operator Measurement Guide */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-200 mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200/80 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              Operator Measurement Protocol
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
              How to Measure and Order a Doctor Blade in 3 Simple Steps
            </h2>
            <p className="text-base text-slate-700 leading-relaxed mb-8">
              Press operators don't need complex blueprints to select the right blade. You only need a standard tape measure and these three practical pressroom rules:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center justify-center px-3 py-1 rounded-xl bg-blue-600 text-white text-xs font-black uppercase tracking-wider shadow-sm">
                      Step 1
                    </span>
                    <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200">
                      01 / 03
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    Measure Active Engraved Face Length
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    Measure the active engraved copper or ceramic cylinder face from left to right (e.g., 1050 mm). Do not include the journals, shafts, or bearing shoulders.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200 text-xs font-bold text-blue-700">
                  Target: Engraved Cylinder Face Width
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center justify-center px-3 py-1 rounded-xl bg-blue-600 text-white text-xs font-black uppercase tracking-wider shadow-sm">
                      Step 2
                    </span>
                    <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200">
                      02 / 03
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    Apply 20 mm to 40 mm Safety Clearance
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    Always cut your doctor blade slightly shorter than your cylinder face. For a 1050 mm cylinder, order a <strong>1020 mm blade</strong>. This 30 mm buffer prevents blade edge flaring and side-tray scraping during press oscillation.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200 text-xs font-bold text-blue-700">
                  Formula: Cylinder Face − 30 mm
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center justify-center px-3 py-1 rounded-xl bg-blue-600 text-white text-xs font-black uppercase tracking-wider shadow-sm">
                      Step 3
                    </span>
                    <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200">
                      03 / 03
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    Select Thickness & Edge Profile
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    Check your line speed and screen count:
                    <br />• Under 350 m/min & fine screens → <strong>0.150 mm Lamella</strong>
                    <br />• Over 350 m/min & heavy solids → <strong>0.200 mm Lamella</strong>
                    <br />• Heavy coating / white ink → <strong>15° Beveled Edge</strong>
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200 text-xs font-bold text-blue-700">
                  Target: Blade Thickness & Edge Geometry
                </div>
              </div>
            </div>
          </div>

          {/* Thickness Specification Table */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mb-12">
            <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Doctor Blade Thickness & Application Matrix
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  Standard carbon steel, stainless steel, and polymer doctor blade specifications
                </p>
              </div>
              <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                4 Core Profiles
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50/70 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-xs">
                  <tr>
                    <th className="py-4 px-5">Thickness</th>
                    <th className="py-4 px-5">Edge Profile</th>
                    <th className="py-4 px-5">Speed Range</th>
                    <th className="py-4 px-5">Clamping Pressure</th>
                    <th className="py-4 px-5">Primary Application</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {thicknessData.map((item, i) => (
                    <tr key={i} className="hover:bg-blue-50/40 transition-colors">
                      <td className="py-4 px-5 font-bold text-slate-900">{item.thickness}</td>
                      <td className="py-4 px-5 text-blue-700 font-semibold">{item.profile}</td>
                      <td className="py-4 px-5 text-slate-700">{item.speedRange}</td>
                      <td className="py-4 px-5 text-slate-900 font-bold">{item.pressure}</td>
                      <td className="py-4 px-5 text-slate-700">{item.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Chemical & Solvent Compatibility Matrix */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mb-12">
            <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Chemical & Solvent Compatibility Matrix
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  Evaluate doctor blade life against solvent, water-based, and UV ink chemistries
                </p>
              </div>
              <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                Metallurgy Comparison
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50/70 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-xs">
                  <tr>
                    <th className="py-4 px-5">Ink / Solvent System</th>
                    <th className="py-4 px-5">Carbon Steel</th>
                    <th className="py-4 px-5">Stainless Steel</th>
                    <th className="py-4 px-5">Polymer / Plastic</th>
                    <th className="py-4 px-5">Pressroom Recommendation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {chemicalTolerance.map((row, i) => (
                    <tr key={i} className="hover:bg-blue-50/40 transition-colors">
                      <td className="py-4 px-5 font-bold text-slate-900">{row.solvent}</td>
                      <td className="py-4 px-5 text-slate-700">{row.carbonSteel}</td>
                      <td className="py-4 px-5 text-emerald-700 font-semibold">{row.stainlessSteel}</td>
                      <td className="py-4 px-5 text-slate-700">{row.polymer}</td>
                      <td className="py-4 px-5 text-slate-700">{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Standard FAQSection Matching All Other Pages */}
        <FAQSection
          subtitle="Doctor Blade Sizing FAQs"
          title="Frequently Asked Questions on Doctor Blade Selection"
          description="Common questions from printing plant managers and press operators regarding blade sizing, metallurgy, and press setup."
          faqs={selectionFaqs}
        />

        <HomeCTA />
      </div>
    </>
  );
}
