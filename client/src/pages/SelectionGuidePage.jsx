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

  // Interactive Calculator State with Precision Controls
  const [machineType, setMachineType] = useState("gravure");
  const [cylinderWidth, setCylinderWidth] = useState(1050);
  const [pressSpeed, setPressSpeed] = useState(280);
  const [bladeWidth, setBladeWidth] = useState(40);
  const [overhang, setOverhang] = useState(1.3);
  const [oscillationStroke, setOscillationStroke] = useState(15);
  const [inkType, setInkType] = useState("solvent");
  const [copied, setCopied] = useState(false);

  const handleMachineTypeChange = (type) => {
    setMachineType(type);
    if (type === "flexo") {
      setOscillationStroke(0); // Standard flexo chambers are non-oscillating
    } else if (type === "gravure" && oscillationStroke === 0) {
      setOscillationStroke(15);
    }
  };

  const calculateRecommendation = () => {
    // 1. Blade Length Calculation (L_blade)
    let cutLength = 0;
    let clearanceText = "";

    if (machineType === "flexo") {
      if (oscillationStroke === 0) {
        cutLength = Math.max(200, cylinderWidth - 10);
        clearanceText = "Cylinder Face − 10 mm (5 mm end seal clearance per side)";
      } else {
        cutLength = Math.max(200, cylinderWidth - 2 * oscillationStroke);
        clearanceText = `Cylinder Face − ${2 * oscillationStroke} mm (${oscillationStroke} mm stroke clearance per side)`;
      }
    } else {
      const totalBuffer = oscillationStroke > 0 ? 2 * oscillationStroke : 20;
      cutLength = Math.max(200, cylinderWidth - totalBuffer);
      clearanceText = `Cylinder Face − ${totalBuffer} mm (${totalBuffer / 2} mm clearance per side)`;
    }

    // 2. Backing Blade Width & Thickness
    const backingWidth = Math.max(10, Number((bladeWidth - overhang).toFixed(1)));

    // 3. Blade Thickness & Hydrodynamics
    let thickness = "0.150 mm (0.006\")";
    let thicknessMm = 0.150;
    let backingThickness = "0.300 mm (0.012\")";
    let edge = "Lamella: 0.075 mm tip × 1.3 mm step";
    let material = "WIPEX 100 Swedish Carbon Steel";
    let targetAngle = "58° (Tolerance: 55° – 60°)";
    let pressureBar = 1.20;
    let liftRisk = "low"; // "low" | "moderate" | "high"
    let reasoning = "";

    if (pressSpeed >= 380) {
      liftRisk = "high";
    } else if (pressSpeed >= 250) {
      liftRisk = "moderate";
    }

    if (machineType === "coating") {
      thicknessMm = pressSpeed > 300 ? 0.300 : 0.250;
      thickness = `${thicknessMm.toFixed(3)} mm (${thicknessMm === 0.300 ? '0.012"' : '0.010"'})`;
      backingThickness = "0.500 mm (0.020\")";
      edge = "30° Bevel with Micro-Radius";
      material = inkType === "water" 
        ? "WIPEX AISI 420 Stainless Steel (Corrosion Resistant)" 
        : "WIPEX Hardened High-Carbon Alloy";
      pressureBar = 1.8 + (pressSpeed / 500) * 0.4;
      targetAngle = "50° – 55°";
      reasoning = "Heavy-duty blade cross-section resists excessive beam deflection under high-viscosity coatings and varnishes.";
    } else if (inkType === "white") {
      thicknessMm = 0.200;
      thickness = "0.200 mm (0.008\")";
      backingThickness = "0.400 mm (0.016\")";
      edge = "15° Heavy Bevel / Heavy Lamella (0.090 mm tip)";
      material = "WIPEX Ceramic-Coated / Hardened Carbon (600 HV)";
      pressureBar = 1.35 + (pressSpeed / 500) * 0.35;
      reasoning = "Abrasive Titanium Dioxide (TiO2) slurry requires high mechanical hardness and reinforced tip geometry to prevent premature tip scalloping.";
    } else if (inkType === "uv") {
      thicknessMm = pressSpeed >= 280 ? 0.200 : 0.150;
      thickness = `${thicknessMm.toFixed(3)} mm (${thicknessMm === 0.200 ? '0.008"' : '0.006"'})`;
      backingThickness = thicknessMm === 0.200 ? "0.400 mm (0.016\")" : "0.300 mm (0.012\")";
      edge = "Lamella: 0.080 mm tip × 1.4 mm step";
      material = "WIPEX Martensitic Swedish Carbon Steel";
      pressureBar = 1.4 + (pressSpeed / 500) * 0.35;
      reasoning = "High oligomer viscosity generates elevated hydrodynamic shear drag, requiring a stabilized beam structure.";
    } else if (inkType === "water") {
      if (pressSpeed >= 340) {
        thicknessMm = 0.200;
        thickness = "0.200 mm (0.008\")";
        backingThickness = "0.400 mm (0.016\")";
      }
      edge = "Lamella: 0.075 mm tip × 1.3 mm step";
      material = machineType === "flexo" 
        ? "WIPEX Premium Polymer or Stainless Steel (Zero Anilox Scoring)" 
        : "WIPEX AISI 420 Martensitic Stainless Steel";
      pressureBar = 1.25 + (pressSpeed / 500) * 0.35;
      reasoning = "Alkaline water chemistry (pH 8.2–9.5) demands anti-corrosive metallurgy to eliminate edge oxidation and premature rusting.";
    } else {
      if (pressSpeed >= 350) {
        thicknessMm = 0.200;
        thickness = "0.200 mm (0.008\")";
        backingThickness = "0.400 mm (0.016\")";
        edge = "Lamella: 0.075 mm tip × 1.5 mm step";
        pressureBar = 1.35 + (pressSpeed / 500) * 0.35;
        reasoning = "At line speeds exceeding 350 m/min, 0.200 mm steel overcomes hydrodynamic ink lift forces, maintaining a razor-clean wipe without hazing.";
      } else {
        thicknessMm = 0.150;
        thickness = "0.150 mm (0.006\")";
        backingThickness = "0.300 mm (0.012\")";
        edge = "Lamella: 0.075 mm tip × 1.3 mm parallel step";
        pressureBar = 1.15 + (pressSpeed / 500) * 0.35;
        reasoning = "Standard 0.150 mm parallel lamella provides instant run-in and constant tonal density (Delta E < 1.0) with lowest possible cylinder friction.";
      }
      material = "WIPEX 100 Premium Swedish Carbon Steel (1% Carbon, 580–600 HV)";
    }

    if (overhang > 1.6) {
      pressureBar += 0.20;
    }

    const calculatedPressure = `${pressureBar.toFixed(2)} bar (${(pressureBar * 14.5038).toFixed(1)} PSI)`;
    const pressureRange = `${(pressureBar - 0.15).toFixed(1)} – ${(pressureBar + 0.15).toFixed(1)} bar`;

    return {
      cutLength,
      clearanceText,
      bladeWidth,
      backingWidth,
      backingThickness,
      overhang,
      thickness,
      thicknessMm,
      edge,
      material,
      calculatedPressure,
      pressureRange,
      targetAngle,
      liftRisk,
      reasoning,
    };
  };

  const recommendation = calculateRecommendation();

  const handleCopySpec = () => {
    const text = `DOCTOR BLADE SIZING & SPECIFICATION SUMMARY
==========================================
Printing Process: ${machineType.toUpperCase()}
Engraved Cylinder Face Width: ${cylinderWidth} mm
Calculated Blade Cut Length: ${recommendation.cutLength} mm
End Clearance Rule: ${recommendation.clearanceText}
Total Blade Width: ${bladeWidth} mm
Free Blade Overhang: ${overhang} mm
Backing Blade Dimensions: ${recommendation.backingWidth} mm wide × ${recommendation.backingThickness} thick
Doctor Blade Thickness: ${recommendation.thickness}
Edge Profile: ${recommendation.edge}
Metallurgy / Alloy: ${recommendation.material}
Target Contact Angle: ${recommendation.targetAngle}
Recommended Clamping Pressure: ${recommendation.calculatedPressure} (Safe Operating Window: ${recommendation.pressureRange})
Operating Line Speed: ${pressSpeed} m/min
Ink System: ${inkType.toUpperCase()}`;

    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

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
        description="Explore our comprehensive doctor blade selection guide for flexo and rotogravure printing presses. Use our interactive doctor blade calculator to calculate optimal doctor blade thickness (0.15mm and 0.20mm) and doctor blade wiping angles. Compare doctor blade edge profiles including lamella doctor blade and bevel doctor blade designs. Choose the perfect doctor blade material from carbon steel doctor blade to corrosion-resistant stainless steel doctor blade."
        keywords={[
          "doctor blade",
          "doctor blade selection guide",
          "doctor blade calculator",
          "doctor blade thickness",
          "doctor blade sizing",
          "doctor blade lamella",
          "doctor blade bevel edge",
          "doctor blade in flexography",
          "rotogravure doctor blade sizing",
          "carbon steel doctor blade 0.15mm",
          "stainless steel doctor blade",
          "polymer doctor blade",
          "doctor blade contact angle",
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
          <div className="bg-white rounded-3xl p-5 sm:p-8 lg:p-12 shadow-sm border border-slate-200 mb-8 sm:mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200/80 mb-3 sm:mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              Pillar 01 • Engineering Specification
            </span>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3 sm:mb-4">
              Doctor Blade <span className="text-blue-600">Selection & Sizing</span> Guide
            </h1>
            <p className="text-sm sm:text-lg text-slate-700 max-w-3xl leading-relaxed mb-6 sm:mb-8">
              Choosing the exact doctor blade thickness, edge geometry, and steel metallurgy prevents 90% of pressroom defects—including background hazing, streak lines, premature cylinder chrome scoring, and ink spitting. Use this engineering guide to select the optimum blade specification for your rotogravure, flexo, or coating line.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-6 pt-5 sm:pt-6 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-blue-50 text-blue-700 border border-blue-200/60 flex items-center justify-center font-black text-xs sm:text-sm shrink-0">
                  01
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900">ISO 9001:2015 Spec</div>
                  <div className="text-[11px] sm:text-xs text-slate-600">Precision tolerances ±0.005 mm</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-blue-50 text-blue-700 border border-blue-200/60 flex items-center justify-center font-black text-xs sm:text-sm shrink-0">
                  02
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900">Uniform Contact</div>
                  <div className="text-[11px] sm:text-xs text-slate-600">Lamella parallel wiping action</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-blue-50 text-blue-700 border border-blue-200/60 flex items-center justify-center font-black text-xs sm:text-sm shrink-0">
                  03
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900">Zero Cylinder Wear</div>
                  <div className="text-[11px] sm:text-xs text-slate-600">Micro-refined metallurgical hardness</div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Calculator Section (100% Light Theme) */}
          <div className="bg-white rounded-3xl p-4 sm:p-6 lg:p-10 shadow-lg border border-slate-200 mb-8 sm:mb-12 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 sm:mb-8 pb-5 sm:pb-6 border-b border-slate-100">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200/80 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                  Precision Engineering Sizing Tool
                </span>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 mt-1">
                  Doctor Blade Sizing & Specification Calculator
                </h2>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full text-xs font-bold">
                  Millimeter Precision
                </span>
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full text-xs font-bold">
                  Dynamic Hydrodynamics
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
              {/* Inputs */}
              <div className="lg:col-span-6 space-y-5 sm:space-y-6">
                {/* 1. Process Type */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                    1. Printing Press Process Type
                  </label>
                  <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
                    {[
                      { id: "gravure", label: "Rotogravure", sub: "55°–60° wipe" },
                      { id: "flexo", label: "Flexographic", sub: "Chamber / Roll" },
                      { id: "coating", label: "Coating / Lacquer", sub: "Heavy laydown" },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleMachineTypeChange(item.id)}
                        className={`py-2 px-1.5 sm:py-2.5 sm:px-3 rounded-xl text-xs font-bold transition-all text-center cursor-pointer border flex flex-col items-center justify-center gap-0.5 ${
                          machineType === item.id
                            ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/30"
                            : "bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200"
                        }`}
                      >
                        <span className="text-[11px] sm:text-xs">{item.label}</span>
                        <span className={`text-[9px] sm:text-[10px] font-normal ${machineType === item.id ? "text-blue-100" : "text-slate-500"}`}>
                          {item.sub}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Cylinder Face Width Slider & Input */}
                <div className="bg-slate-50/70 p-3.5 sm:p-4 rounded-2xl border border-slate-200">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      2. Cylinder Face Width (L_face)
                    </label>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        min="300"
                        max="2500"
                        step="5"
                        value={cylinderWidth}
                        onChange={(e) => setCylinderWidth(Math.max(300, Math.min(2500, Number(e.target.value) || 300)))}
                        className="w-18 sm:w-20 px-2 py-1 text-right text-xs sm:text-sm font-extrabold text-blue-700 bg-white border border-blue-300 rounded-lg shadow-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="text-xs font-bold text-slate-600">mm</span>
                    </div>
                  </div>

                  <input
                    type="range"
                    min="300"
                    max="2500"
                    step="5"
                    value={cylinderWidth}
                    onChange={(e) => setCylinderWidth(Number(e.target.value))}
                    className="w-full accent-blue-600 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                  />

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-2 text-[11px] text-slate-500">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] text-slate-400 font-semibold">Presets:</span>
                      {[800, 1050, 1250, 1600].map((w) => (
                        <button
                          key={w}
                          type="button"
                          onClick={() => setCylinderWidth(w)}
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors cursor-pointer border ${
                            cylinderWidth === w ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          {w}mm
                        </button>
                      ))}
                    </div>
                    <div className="flex justify-between sm:justify-end gap-3 text-[10px] text-slate-400">
                      <span>Min 300mm</span>
                      <span>Max 2500mm</span>
                    </div>
                  </div>
                </div>

                {/* 3. Press Speed Slider & Input */}
                <div className="bg-slate-50/70 p-3.5 sm:p-4 rounded-2xl border border-slate-200">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        3. Press Line Speed (V)
                      </label>
                      <span className={`text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                        pressSpeed < 220 
                          ? "bg-slate-200 text-slate-700" 
                          : pressSpeed < 380 
                          ? "bg-blue-100 text-blue-700" 
                          : "bg-amber-100 text-amber-800"
                      }`}>
                        {pressSpeed < 220 ? "Standard" : pressSpeed < 380 ? "High Speed" : "Ultra Velocity"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        min="40"
                        max="650"
                        step="5"
                        value={pressSpeed}
                        onChange={(e) => setPressSpeed(Math.max(40, Math.min(650, Number(e.target.value) || 40)))}
                        className="w-18 sm:w-20 px-2 py-1 text-right text-xs sm:text-sm font-extrabold text-blue-700 bg-white border border-blue-300 rounded-lg shadow-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="text-xs font-bold text-slate-600">m/min</span>
                    </div>
                  </div>

                  <input
                    type="range"
                    min="40"
                    max="650"
                    step="5"
                    value={pressSpeed}
                    onChange={(e) => setPressSpeed(Number(e.target.value))}
                    className="w-full accent-blue-600 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                  />

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-2 text-[11px] text-slate-500">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] text-slate-400 font-semibold">Presets:</span>
                      {[150, 250, 350, 500].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setPressSpeed(s)}
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors cursor-pointer border ${
                            pressSpeed === s ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          {s} m/min
                        </button>
                      ))}
                    </div>
                    <div className="flex justify-between sm:justify-end gap-3 text-[10px] text-slate-400">
                      <span>Min 40</span>
                      <span>Max 650</span>
                    </div>
                  </div>
                </div>

                {/* 4. Ink Chemistry */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                    4. Ink Formulation & Chemistry
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
                    {[
                      { id: "solvent", label: "Solvent", sub: "NC / PU (14–18s)" },
                      { id: "water", label: "Water-Based", sub: "pH 8.5+ (18–24s)" },
                      { id: "uv", label: "UV / EB", sub: "High shear drag" },
                      { id: "white", label: "Abrasive White", sub: "TiO2 / Metallics" },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setInkType(item.id)}
                        className={`py-2 px-1.5 sm:py-2.5 sm:px-2 rounded-xl text-xs font-bold transition-all text-center cursor-pointer border flex flex-col items-center justify-center gap-0.5 ${
                          inkType === item.id
                            ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/30"
                            : "bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200"
                        }`}
                      >
                        <span className="text-[11px] sm:text-xs">{item.label}</span>
                        <span className={`text-[9px] sm:text-[10px] font-normal ${inkType === item.id ? "text-blue-100" : "text-slate-500"}`}>
                          {item.sub}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 5. Clamping Blade Width & Overhang Sliders */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  {/* Total Blade Width */}
                  <div className="bg-slate-50/70 p-3.5 rounded-2xl border border-slate-200">
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                      5. Holder Blade Width
                    </label>
                    <div className="grid grid-cols-4 gap-1 sm:gap-1.5">
                      {[30, 40, 50, 60].map((bw) => (
                        <button
                          key={bw}
                          type="button"
                          onClick={() => setBladeWidth(bw)}
                          className={`py-1.5 px-1 sm:px-2 rounded-lg text-[11px] sm:text-xs font-bold transition-colors cursor-pointer border ${
                            bladeWidth === bw
                              ? "bg-blue-600 text-white border-blue-600"
                              : "bg-white text-slate-700 hover:bg-slate-100 border-slate-200"
                          }`}
                        >
                          {bw}mm
                        </button>
                      ))}
                    </div>
                    <span className="text-[10px] text-slate-500 mt-2 block">
                      Standard: 40 mm (Gravure) / 30 mm (Flexo)
                    </span>
                  </div>

                  {/* Free Blade Overhang Slider */}
                  <div className="bg-slate-50/70 p-3.5 rounded-2xl border border-slate-200">
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        6. Free Overhang (E)
                      </label>
                      <span className="text-xs font-extrabold text-blue-700 bg-white px-2 py-0.5 rounded border border-blue-200">
                        {overhang.toFixed(1)} mm
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0.8"
                      max="2.5"
                      step="0.1"
                      value={overhang}
                      onChange={(e) => setOverhang(Number(e.target.value))}
                      className="w-full accent-blue-600 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between items-center mt-1 text-[10px]">
                      <span className="text-slate-500">0.8 mm</span>
                      <span className={overhang >= 1.0 && overhang <= 1.5 ? "text-emerald-700 font-bold" : "text-amber-700 font-bold"}>
                        {overhang >= 1.0 && overhang <= 1.5 ? "Ideal (1.0–1.5mm)" : overhang < 1.0 ? "Too stiff" : "Excessive flex"}
                      </span>
                      <span className="text-slate-500">2.5 mm</span>
                    </div>
                  </div>
                </div>

                {/* 7. Oscillation Stroke Slider */}
                <div className="bg-slate-50/70 p-3.5 rounded-2xl border border-slate-200">
                  <div className="flex justify-between items-center mb-1.5">
                    <div>
                      <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                        7. Oscillation Stroke (S_osc)
                      </label>
                      <span className="text-[10px] text-slate-500">
                        {oscillationStroke === 0 ? "Stationary (Flexo Chamber)" : `${oscillationStroke} mm stroke (${oscillationStroke * 2} mm clearance)`}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setOscillationStroke(0)}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold border cursor-pointer ${
                          oscillationStroke === 0 ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-600 border-slate-200"
                        }`}
                      >
                        0mm
                      </button>
                      <button
                        type="button"
                        onClick={() => setOscillationStroke(15)}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold border cursor-pointer ${
                          oscillationStroke === 15 ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-600 border-slate-200"
                        }`}
                      >
                        15mm
                      </button>
                      <span className="text-xs font-extrabold text-blue-700 bg-white px-2 py-0.5 rounded border border-blue-200">
                        {oscillationStroke}mm
                      </span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="25"
                    step="1"
                    value={oscillationStroke}
                    onChange={(e) => setOscillationStroke(Number(e.target.value))}
                    className="w-full accent-blue-600 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>

              {/* Outputs (Engineered Specification Card) */}
              <div className="lg:col-span-6 bg-slate-50 rounded-2xl p-4 sm:p-6 lg:p-7 border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200 mb-4 sm:mb-5">
                    <span className="text-xs font-black uppercase tracking-wider text-blue-700">
                      Engineered Specification Sheet
                    </span>
                    <span className={`text-xs px-3 py-1 rounded-full font-extrabold border self-start sm:self-auto ${
                      recommendation.liftRisk === "low"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : recommendation.liftRisk === "moderate"
                        ? "bg-amber-50 text-amber-700 border-amber-200"
                        : "bg-rose-50 text-rose-700 border-rose-200"
                    }`}>
                      {recommendation.liftRisk === "low" 
                        ? "● Low Hydrodynamic Lift" 
                        : recommendation.liftRisk === "moderate" 
                        ? "▲ Moderate Lift Warning" 
                        : "⚠ High Velocity Lift Zone"}
                    </span>
                  </div>

                  {/* Primary Sizing Matrix */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 mb-3.5 sm:mb-4">
                    {/* Cut Length */}
                    <div className="bg-white p-3 sm:p-3.5 rounded-xl border border-slate-200 shadow-xs">
                      <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase block">1. Blade Cut Length (L_blade)</span>
                      <div className="text-xl sm:text-2xl font-black text-blue-700 mt-0.5">
                        {recommendation.cutLength} mm
                      </div>
                      <span className="text-[10px] text-slate-500 block mt-0.5 leading-tight">
                        {recommendation.clearanceText}
                      </span>
                    </div>

                    {/* Total Blade Width */}
                    <div className="bg-white p-3 sm:p-3.5 rounded-xl border border-slate-200 shadow-xs">
                      <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase block">2. Total Blade Width (W_blade)</span>
                      <div className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                        {recommendation.bladeWidth}.0 mm
                      </div>
                      <span className="text-[10px] text-slate-500 block mt-0.5">
                        Clamping Depth + {overhang.toFixed(1)} mm Overhang
                      </span>
                    </div>

                    {/* Blade Thickness */}
                    <div className="bg-white p-3 sm:p-3.5 rounded-xl border border-slate-200 shadow-xs">
                      <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase block">3. Blade Thickness (T_blade)</span>
                      <div className="text-base sm:text-lg font-black text-slate-900 mt-0.5">
                        {recommendation.thickness}
                      </div>
                      <span className="text-[10px] text-slate-500 block mt-0.5">
                        Micro-Tolerance: ±0.005 mm
                      </span>
                    </div>

                    {/* Backing Blade Dimensions */}
                    <div className="bg-white p-3 sm:p-3.5 rounded-xl border border-slate-200 shadow-xs">
                      <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase block">4. Backing Blade Size</span>
                      <div className="text-base sm:text-lg font-black text-slate-900 mt-0.5">
                        {recommendation.backingWidth} mm wide
                      </div>
                      <span className="text-[10px] text-blue-700 font-semibold block mt-0.5">
                        Thickness: {recommendation.backingThickness}
                      </span>
                    </div>
                  </div>

                  {/* Secondary Parameters */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 mb-3.5 sm:mb-4">
                    <div className="bg-white p-3 sm:p-3.5 rounded-xl border border-slate-200 shadow-xs">
                      <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase block">5. Edge Geometry</span>
                      <div className="text-xs sm:text-sm font-extrabold text-slate-900 mt-0.5" title={recommendation.edge}>
                        {recommendation.edge}
                      </div>
                    </div>

                    <div className="bg-white p-3 sm:p-3.5 rounded-xl border border-slate-200 shadow-xs">
                      <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase block">6. Material Alloy</span>
                      <div className="text-xs sm:text-sm font-extrabold text-blue-700 mt-0.5" title={recommendation.material}>
                        {recommendation.material}
                      </div>
                    </div>

                    <div className="bg-white p-3 sm:p-3.5 rounded-xl border border-slate-200 shadow-xs">
                      <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase block">7. Clamping Air Pressure</span>
                      <div className="text-xs sm:text-sm font-extrabold text-slate-900 mt-0.5">
                        {recommendation.calculatedPressure}
                      </div>
                      <span className="text-[10px] text-emerald-700 font-semibold block">
                        Safe Window: {recommendation.pressureRange}
                      </span>
                    </div>

                    <div className="bg-white p-3 sm:p-3.5 rounded-xl border border-slate-200 shadow-xs">
                      <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase block">8. Target Contact Angle</span>
                      <div className="text-xs sm:text-sm font-extrabold text-slate-900 mt-0.5">
                        {recommendation.targetAngle}
                      </div>
                    </div>
                  </div>

                  {/* Overhang Evaluation Banner */}
                  <div className={`p-3 rounded-xl border text-xs mb-3 flex items-start gap-2 ${
                    overhang >= 1.0 && overhang <= 1.5
                      ? "bg-emerald-50/70 border-emerald-200 text-emerald-900"
                      : overhang < 1.0
                      ? "bg-amber-50/70 border-amber-200 text-amber-900"
                      : "bg-rose-50/70 border-rose-200 text-rose-900"
                  }`}>
                    <span className="font-bold shrink-0">
                      {overhang >= 1.0 && overhang <= 1.5 ? "✓ Calibrated:" : "⚠ Notice:"}
                    </span>
                    <span className="text-[11px] leading-relaxed">
                      {overhang < 1.0 
                        ? `At ${overhang.toFixed(1)} mm, blade extension is short and rigid. Risk of micro-chatter marks and elevated cylinder wear.` 
                        : overhang <= 1.5 
                        ? `At ${overhang.toFixed(1)} mm, free extension provides ideal beam flexibility to cleanly meter without heel wiping.` 
                        : `At ${overhang.toFixed(1)} mm, excessive overhang causes blade to flex backward under fluid ink pressure, leading to hazing and spitting.`}
                    </span>
                  </div>

                  {/* Engineering Rationale */}
                  <div className="bg-blue-50/70 border border-blue-200 p-3.5 sm:p-4 rounded-xl mb-4 text-xs text-slate-800 leading-relaxed">
                    <strong className="text-slate-900 font-bold block mb-1">Engineering Rationale:</strong>
                    {recommendation.reasoning}
                  </div>
                </div>

                <div className="space-y-2.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={handleCopySpec}
                      className="py-2.5 sm:py-3 px-4 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 rounded-xl font-bold text-xs tracking-wide transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-emerald-700">Specification Copied!</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                          </svg>
                          <span>Copy Specification Sheet</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => window.dispatchEvent(new CustomEvent("open-quote-modal"))}
                      className="py-2.5 sm:py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs tracking-wide transition-all shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Request Blade Quote</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section: The Complete Doctor Blade Sizing Formula & Calculation Rules */}
          <div className="bg-white rounded-3xl p-5 sm:p-8 lg:p-10 shadow-sm border border-slate-200 mb-8 sm:mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200/80 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              Engineering Formulas
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 mb-3">
              Doctor Blade Sizing Rules: Length, Width & Backing Blade Formulas
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-6 sm:mb-8">
              Accurate blade sizing is essential for mechanical stability. A blade cut too long snags against side ink pans and seals; a blade cut too short leaves un-wiped cylinder borders that dry into abrasive rings. Use these formulas for zero-error installation:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="bg-slate-50 p-4 sm:p-6 rounded-2xl border border-slate-200">
                <div className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-2">
                  Formula 1: Cut Length
                </div>
                <div className="bg-white p-3 rounded-xl border border-blue-200 font-mono text-xs sm:text-sm font-bold text-blue-900 mb-3">
                  L_blade = L_face − 30 mm
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Provide exactly 15 mm clearance at each end of the active engraved cylinder face. This clearance accommodates press oscillation strokes (10–15 mm) without colliding with side dams.
                </p>
              </div>

              <div className="bg-slate-50 p-4 sm:p-6 rounded-2xl border border-slate-200">
                <div className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-2">
                  Formula 2: Total Blade Width
                </div>
                <div className="bg-white p-3 rounded-xl border border-blue-200 font-mono text-xs sm:text-sm font-bold text-blue-900 mb-3">
                  W_total = Clamp Depth + Overhang
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Total blade width must cover the holder clamping jaw depth plus the exact free extension. Standard industrial widths are 30 mm, 40 mm, 50 mm, and 60 mm.
                </p>
              </div>

              <div className="bg-slate-50 p-4 sm:p-6 rounded-2xl border border-slate-200">
                <div className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-2">
                  Formula 3: Free Blade Overhang
                </div>
                <div className="bg-white p-3 rounded-xl border border-blue-200 font-mono text-xs sm:text-sm font-bold text-blue-900 mb-3">
                  Overhang = 1.0 mm to 1.5 mm
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  The doctor blade should extend strictly 1.0 to 1.5 mm past the backing blade. An overhang exceeding 2.0 mm causes excessive beam flex, chattering, and ink spitting.
                </p>
              </div>
            </div>

            {/* Sizing Matrix Table */}
            <div className="overflow-hidden rounded-2xl border border-slate-200">
              <div className="text-[11px] text-blue-600 font-medium px-4 py-1.5 bg-blue-50/60 sm:hidden flex items-center justify-between border-b border-blue-100/60">
                <span>Swipe table horizontally</span>
                <span>→</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm min-w-[550px]">
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
          </div>

          {/* Section: Metallurgy, Steel Hardness & Carbide Microstructure */}
          <div className="bg-white rounded-3xl p-5 sm:p-8 lg:p-10 shadow-sm border border-slate-200 mb-8 sm:mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200/80 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              Materials Engineering
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 mb-3">
              Doctor Blade Metallurgy: Carbon Steel vs. Stainless vs. Ceramic vs. Polymer
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-6 sm:mb-8">
              The chemical composition and crystalline microstructure of doctor blade steel determine how the wiping edge wears. Sub-standard carbon steels contain irregular, oversized carbide clusters that chip away into microscopic notches, creating hairline print streaks. WIPEX doctor blades use ultra-refined metallurgical alloys:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {metallurgyComparison.map((mat, i) => (
                <div key={i} className="bg-slate-50 p-4 sm:p-6 rounded-2xl border border-slate-200 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">{mat.alloy}</h3>
                    <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4 text-xs">
                      <div className="bg-white p-2 sm:p-2.5 rounded-xl border border-slate-200">
                        <span className="text-slate-500 block font-semibold text-[11px]">Hardness:</span>
                        <strong className="text-blue-700 text-xs sm:text-sm">{mat.hardness}</strong>
                      </div>
                      <div className="bg-white p-2 sm:p-2.5 rounded-xl border border-slate-200">
                        <span className="text-slate-500 block font-semibold text-[11px]">Tensile Strength:</span>
                        <strong className="text-slate-900 text-xs sm:text-sm">{mat.tensile}</strong>
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
          <div className="bg-white rounded-3xl p-5 sm:p-8 lg:p-10 shadow-sm border border-slate-200 mb-8 sm:mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200/80 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              Operator Measurement Protocol
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 mb-3">
              How to Measure and Order a Doctor Blade in 3 Simple Steps
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-6 sm:mb-8">
              Press operators don't need complex blueprints to select the right blade. You only need a standard tape measure and these three practical pressroom rules:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-4">
              <div className="bg-slate-50 p-4 sm:p-6 rounded-2xl border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-xl bg-blue-600 text-white text-xs font-black uppercase tracking-wider shadow-sm">
                      Step 1
                    </span>
                    <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                      01 / 03
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                    Measure Active Engraved Face Length
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    Measure the active engraved copper or ceramic cylinder face from left to right (e.g., 1050 mm). Do not include the journals, shafts, or bearing shoulders.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200 text-xs font-bold text-blue-700">
                  Target: Engraved Cylinder Face Width
                </div>
              </div>

              <div className="bg-slate-50 p-4 sm:p-6 rounded-2xl border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-xl bg-blue-600 text-white text-xs font-black uppercase tracking-wider shadow-sm">
                      Step 2
                    </span>
                    <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                      02 / 03
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                    Apply 20 mm to 40 mm Safety Clearance
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    Always cut your doctor blade slightly shorter than your cylinder face. For a 1050 mm cylinder, order a <strong>1020 mm blade</strong>. This 30 mm buffer prevents blade edge flaring and side-tray scraping during press oscillation.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200 text-xs font-bold text-blue-700">
                  Formula: Cylinder Face − 30 mm
                </div>
              </div>

              <div className="bg-slate-50 p-4 sm:p-6 rounded-2xl border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-xl bg-blue-600 text-white text-xs font-black uppercase tracking-wider shadow-sm">
                      Step 3
                    </span>
                    <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                      03 / 03
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                    Select Thickness & Edge Profile
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
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
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mb-8 sm:mb-12">
            <div className="bg-slate-50 border-b border-slate-200 px-4 sm:px-6 py-3.5 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  Doctor Blade Thickness & Application Matrix
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  Standard carbon steel, stainless steel, and polymer doctor blade specifications
                </p>
              </div>
              <span className="self-start sm:self-auto text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                4 Core Profiles
              </span>
            </div>
            <div className="text-[11px] text-blue-600 font-medium px-4 py-1.5 bg-blue-50/60 sm:hidden flex items-center justify-between border-b border-blue-100/60">
              <span>Swipe table horizontally</span>
              <span>→</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm min-w-[620px]">
                <thead className="bg-slate-50/70 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-xs">
                  <tr>
                    <th className="py-3.5 px-4 sm:py-4 sm:px-5">Thickness</th>
                    <th className="py-3.5 px-4 sm:py-4 sm:px-5">Edge Profile</th>
                    <th className="py-3.5 px-4 sm:py-4 sm:px-5">Speed Range</th>
                    <th className="py-3.5 px-4 sm:py-4 sm:px-5">Clamping Pressure</th>
                    <th className="py-3.5 px-4 sm:py-4 sm:px-5">Primary Application</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {thicknessData.map((item, i) => (
                    <tr key={i} className="hover:bg-blue-50/40 transition-colors">
                      <td className="py-3.5 px-4 sm:py-4 sm:px-5 font-bold text-slate-900">{item.thickness}</td>
                      <td className="py-3.5 px-4 sm:py-4 sm:px-5 text-blue-700 font-semibold">{item.profile}</td>
                      <td className="py-3.5 px-4 sm:py-4 sm:px-5 text-slate-700">{item.speedRange}</td>
                      <td className="py-3.5 px-4 sm:py-4 sm:px-5 text-slate-900 font-bold">{item.pressure}</td>
                      <td className="py-3.5 px-4 sm:py-4 sm:px-5 text-slate-700">{item.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Chemical & Solvent Compatibility Matrix */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mb-8 sm:mb-12">
            <div className="bg-slate-50 border-b border-slate-200 px-4 sm:px-6 py-3.5 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  Chemical & Solvent Compatibility Matrix
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  Evaluate doctor blade life against solvent, water-based, and UV ink chemistries
                </p>
              </div>
              <span className="self-start sm:self-auto text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                Metallurgy Comparison
              </span>
            </div>
            <div className="text-[11px] text-blue-600 font-medium px-4 py-1.5 bg-blue-50/60 sm:hidden flex items-center justify-between border-b border-blue-100/60">
              <span>Swipe table horizontally</span>
              <span>→</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm min-w-[620px]">
                <thead className="bg-slate-50/70 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-xs">
                  <tr>
                    <th className="py-3.5 px-4 sm:py-4 sm:px-5">Ink / Solvent System</th>
                    <th className="py-3.5 px-4 sm:py-4 sm:px-5">Carbon Steel</th>
                    <th className="py-3.5 px-4 sm:py-4 sm:px-5">Stainless Steel</th>
                    <th className="py-3.5 px-4 sm:py-4 sm:px-5">Polymer / Plastic</th>
                    <th className="py-3.5 px-4 sm:py-4 sm:px-5">Pressroom Recommendation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {chemicalTolerance.map((row, i) => (
                    <tr key={i} className="hover:bg-blue-50/40 transition-colors">
                      <td className="py-3.5 px-4 sm:py-4 sm:px-5 font-bold text-slate-900">{row.solvent}</td>
                      <td className="py-3.5 px-4 sm:py-4 sm:px-5 text-slate-700">{row.carbonSteel}</td>
                      <td className="py-3.5 px-4 sm:py-4 sm:px-5 text-emerald-700 font-semibold">{row.stainlessSteel}</td>
                      <td className="py-3.5 px-4 sm:py-4 sm:px-5 text-slate-700">{row.polymer}</td>
                      <td className="py-3.5 px-4 sm:py-4 sm:px-5 text-slate-700">{row.notes}</td>
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
