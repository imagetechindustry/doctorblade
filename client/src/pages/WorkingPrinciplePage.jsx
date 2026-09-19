import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/common/SEO";
import TechnicalGuidesNav from "../components/common/TechnicalGuidesNav";
import FAQSection from "../components/common/FAQSection";
import HomeCTA from "../components/home/HomeCTA";

const edgeProfiles = [
  {
    name: "Lamella Parallel Edge",
    badge: "Most Popular",
    profile: "Stepped parallel tip (0.065–0.075 mm)",
    tonalStability: "Constant (Delta E < 1.0 throughout blade life)",
    contactArea: "Uniform throughout entire wear cycle",
    idealFor: "Fine rotogravure process printing, high-screen flexo (150–200+ LPI), flexible packaging",
    description:
      "A lamella edge features a precision-machined stepped reduction in thickness. As the blade wears down over hundreds of thousands of cylinder revolutions, the contact surface area remains perfectly constant, preventing mid-run ink density shifts.",
  },
  {
    name: "Beveled Edge (15° & 30°)",
    badge: "High Stability",
    profile: "Angled wedge transition",
    tonalStability: "Gradual change as bevel wears",
    contactArea: "Increases gradually with tip wear",
    idealFor: "Abrasive white inks (TiO2), metallics, coating & varnishing, heavy solid prints",
    description:
      "A beveled edge provides superior beam rigidity and deflection resistance against viscous, heavy inks. It resists blade flex at speeds exceeding 400 m/min and withstands abrasive pigments without edge micro-chipping.",
  },
  {
    name: "Rounded Radius Edge",
    badge: "Anilox Safe",
    profile: "Precision micro-curved radius (R 0.05–0.10 mm)",
    tonalStability: "Moderate",
    contactArea: "Minimal initial contact area",
    idealFor: "Ceramic anilox rolls in corrugated and narrow-web flexo printing",
    description:
      "The rounded radius edge provides a smooth, gentle engagement with ceramic cell walls. It eliminates the razor-sharp burrs that can score expensive anilox rolls during press startup and acceleration.",
  },
];

const speedPressureCurve = [
  { speed: "100 – 180 m/min", hydroLift: "Low (120–180 N/m)", recommendedPressure: "1.0 – 1.2 bar", bladeSpec: "0.150 mm Lamella (Standard)" },
  { speed: "180 – 300 m/min", hydroLift: "Medium (250–350 N/m)", recommendedPressure: "1.2 – 1.4 bar", bladeSpec: "0.150 mm Lamella (Reinforced)" },
  { speed: "300 – 450 m/min", hydroLift: "High (450–600 N/m)", recommendedPressure: "1.4 – 1.8 bar", bladeSpec: "0.200 mm Lamella (High Rigidity)" },
  { speed: "450 – 600+ m/min", hydroLift: "Severe (> 750 N/m)", recommendedPressure: "1.8 – 2.0 bar", bladeSpec: "0.200 mm Bevel 15° / Stainless" },
];

const shearingStages = [
  {
    stage: "Stage 01",
    title: "Cylinder Inking & Cell Flooding",
    description:
      "The rotating cylinder dips into the ink pan or enters the pressurized chamber. Cells and surface land areas are completely flooded with an excess ink boundary layer (15 to 30 microns thick).",
  },
  {
    stage: "Stage 02",
    title: "Hydrodynamic Wedge Convergence",
    description:
      "Fluid ink is dragged toward the narrow wedge formed by the cylinder and the blade tip. Viscous shear forces create an upward hydrodynamic lifting force that attempts to push the blade away from the surface.",
  },
  {
    stage: "Stage 03",
    title: "Micro-Boundary Layer Shearing",
    description:
      "At the 55°–60° contact point, mechanical clamping force balances the hydrodynamic lift. The blade shears away 100% of the surface ink from the chrome lands without scooping ink out of the engraved cells.",
  },
  {
    stage: "Stage 04",
    title: "Impression Transfer & Cell Emptying",
    description:
      "The cylinder enters the nip against the rubber impression roll. Surface tension and substrate capillary action pull the metered ink droplets out of the cells onto the passing web.",
  },
];

const comparisonTable = [
  {
    feature: "Thickness Consistency Across Length",
    generic: "±0.015 mm (High variation causes streaking)",
    wipex: "±0.005 mm (Strict ISO 9001:2015 precision)",
  },
  {
    feature: "Edge Straightness Deviation",
    generic: "Up to 1.8 mm / 3000 mm (Requires heavy pressure)",
    wipex: "< 0.6 mm / 3000 mm (Flawless uniform contact)",
  },
  {
    feature: "Contact Surface Area During Wear",
    generic: "Widens rapidly → Ink density drifts → Press stops",
    wipex: "Constant with Lamella profile → Zero color variation",
  },
  {
    feature: "Cylinder Life Expectancy",
    generic: "High risk of chrome scoring & cell wall damage",
    wipex: "Extended cylinder life by 35% with refined metallurgy",
  },
  {
    feature: "Run-In & Press Setup Time",
    generic: "15–30 minutes of wasted substrate and ink",
    wipex: "Immediate clean wiping from cylinder rotation #1",
  },
];

const principleFaqs = [
  {
    question: "How does a doctor blade meter ink on a printing cylinder?",
    answer: "As the engraved cylinder rotates out of the ink reservoir, the cells and non-image surface lands are covered with wet ink. The doctor blade acts as a hydrodynamic shear boundary, scraping off 100% of the ink from the land areas while leaving exactly the engraved cell volume intact for transfer to the substrate.",
  },
  {
    question: "Why is 55° to 60° the golden contact angle for doctor blades?",
    answer: "At 55°–60°, the blade beam stiffness cleanly balances the hydrodynamic lift generated by fast-moving ink. Contact angles below 50° cause the blade to float, resulting in hazing and ink spitting. Angles above 65° induce chatter vibrations, rapid tip feathering, and chrome cylinder gouging.",
  },
  {
    question: "What is hydrodynamic blade lift and how do you stop it?",
    answer: "Hydrodynamic lift occurs when liquid ink is forced into the converging wedge between the rotating cylinder and blade tip at high press speeds (> 300 m/min). The liquid pressure pushes the blade upward off the cylinder. It is solved by using a stiffer blade (0.200 mm), optimizing contact angle to 58°, and properly managing ink viscosity.",
  },
  {
    question: "What is the difference between a forward (trailing) and reverse angle doctor blade?",
    answer: "A forward or trailing blade (pointing in the direction of rotation) is typically used for ink containment in chambers. A reverse doctor blade (pointing against the direction of cylinder rotation) is used for shearing and metering ink because it provides precise, hydrodynamic cell wiping.",
  },
  {
    question: "How does ink viscosity affect doctor blade wiping mechanics?",
    answer: "Higher ink viscosity increases the hydrodynamic lift force exponentially. If viscosity rises from 16 to 24 seconds (Zahn Cup #2), the hydrodynamic pressure pushing the blade away from the cylinder increases by over 60%, forcing operators to add excessive clamping pressure that causes cylinder wear.",
  },
  {
    question: "Why does a stepped lamella profile outperform a standard bevel?",
    answer: "A standard bevel widens its contact footprint as it wears down, which reduces contact pressure and requires continuous pneumatic adjustments. A lamella profile maintains an identical 0.075 mm tip thickness throughout its entire wear life, providing consistent density from first roll to last roll.",
  },
  {
    question: "What role does blade beam deflection play in doctoring?",
    answer: "Blade beam deflection is the slight backward bend of the blade under pneumatic load. If deflection is too large (from excessive overhang > 2.0 mm), the contact angle flattens, causing the blade to wipe on its heel rather than its sharp tip. Maintaining 1.2 mm overhang ensures controlled beam stiffness.",
  },
  {
    question: "Why is carbide grain size critical in doctor blade steel?",
    answer: "Refined Swedish carbon steel contains micro-carbides smaller than 2 microns uniformly distributed throughout the martensitic matrix. Sub-standard steels contain coarse carbides (5–10 microns) that dislodge during high-speed rotation, leaving micro-notches in the blade edge that print hairline streak lines.",
  },
];

export default function WorkingPrinciplePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const techArticleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "Doctor Blade Working Principle: Ink Metering Hydrodynamics & Contact Angle Physics",
    description: "An engineering breakdown of how doctor blades meter ink in rotogravure and flexographic printing: contact angle mechanics (55°-60°), hydrodynamic pressure balance, and lamella edge geometry.",
    url: "https://www.doctorblade.co.in/working-principle",
    author: {
      "@type": "Organization",
      name: "ImageTech Industries",
    },
  };

  return (
    <>
      <SEO
        title="Doctor Blade Working Principle & Physics | Ink Metering Hydrodynamics"
        description="Learn the working principle of doctor blades: the physics of ink metering, hydrodynamic lift forces, 55°–60° contact angle mechanics, speed-pressure curves, and why lamella edge profiles prevent press downtime."
        keywords={[
          "doctor blade working principle",
          "how doctor blade works",
          "doctor blade physics",
          "ink metering hydrodynamics",
          "doctor blade contact angle 55 60",
          "lamella vs bevel doctor blade",
          "rotogravure doctor blade mechanics",
          "flexo doctor blade working",
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
            <span className="text-slate-900 font-bold">Working Principle</span>
          </nav>

          {/* Technical Guides Suite Sub-Nav */}
          <TechnicalGuidesNav />

          {/* Hero Header */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-200 mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200/80 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              Pillar 03 • Mechanics & Hydrodynamics
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
              Doctor Blade <span className="text-blue-600">Working Principle</span> & Physics
            </h1>
            <p className="text-base sm:text-lg text-slate-700 max-w-3xl leading-relaxed mb-8">
              At line speeds exceeding 400 meters per minute, a doctor blade is not merely a mechanical scraper—it operates as a precision hydrodynamic metering valve. Understanding the balance between mechanical contact pressure, ink shear viscosity, and contact angle physics is the key to achieving zero pressroom defects.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-100">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 border border-blue-200/60 flex items-center justify-center font-black text-sm shrink-0">
                  01
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">Hydrodynamic Equilibrium</div>
                  <div className="text-xs text-slate-600">Balance between fluid lift & pressure</div>
                </div>
              </div>
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 border border-blue-200/60 flex items-center justify-center font-black text-sm shrink-0">
                  02
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">The 55°–60° Rule</div>
                  <div className="text-xs text-slate-600">Optimal contact angle for zero scumming</div>
                </div>
              </div>
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 border border-blue-200/60 flex items-center justify-center font-black text-sm shrink-0">
                  03
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">Lamella Geometry</div>
                  <div className="text-xs text-slate-600">Constant contact surface width over time</div>
                </div>
              </div>
            </div>
          </div>

          {/* Section: The 4-Stage Ink Shearing Cycle */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-200 mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200/80 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              Press Mechanics
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
              The 4-Stage Doctor Blade Shearing & Metering Cycle
            </h2>
            <p className="text-base text-slate-700 leading-relaxed mb-8">
              Ink metering is a dynamic, continuous thermodynamic and fluid process occurring at millisecond speeds. Here is what happens at the microscopic cylinder-blade interface:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {shearingStages.map((st, i) => (
                <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-2">
                      {st.stage}
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-3">{st.title}</h3>
                    <p className="text-sm text-slate-700 leading-relaxed">{st.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Physics & Hydrodynamics Breakdown */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-200 mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200/80 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              Fluid Mechanics & Press Dynamics
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
              How Ink Metering Works: Hydrodynamics vs. Mechanical Pressure
            </h2>
            <p className="text-base text-slate-700 leading-relaxed mb-8">
              When an engraved rotogravure cylinder or ceramic anilox roll emerges from the ink fountain, it carries an excessive, uneven layer of wet ink across both the cells and the non-image land areas. The doctor blade's task is to sheer away 100% of excess surface ink while leaving precisely the cell-metered volume intact.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-slate-50 p-6 sm:p-7 rounded-2xl border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                  1. Hydrodynamic Lift Force (P_hydro)
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed mb-3">
                  As the cylinder rotates at high surface speed, fluid ink is dragged toward the converging wedge between the cylinder and blade. This generates intense hydrodynamic pressure that pushes the blade tip away from the cylinder face:
                </p>
                <div className="bg-white p-3.5 rounded-xl border border-blue-200 text-xs font-mono text-blue-900 font-bold mb-3">
                  P_hydro ∝ (Ink Viscosity × Press Speed) / tan(Contact Angle)
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  If line speed doubles or ink viscosity increases without adjusting blade angle or beam thickness, P_hydro overcomes mechanical clamping, causing "blade float" and background scumming.
                </p>
              </div>

              <div className="bg-slate-50 p-6 sm:p-7 rounded-2xl border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                  2. Mechanical Clamping Pressure (P_mech)
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed mb-3">
                  The pneumatic holder applies mechanical force to keep the tip seated against the cylinder. To achieve zero wear and clean wiping, P_mech must exactly counterbalance P_hydro:
                </p>
                <div className="bg-white p-3.5 rounded-xl border border-blue-200 text-xs font-mono text-blue-900 font-bold mb-3">
                  Ideal Pressroom State: P_mech ≈ P_hydro + ε (Minimal excess)
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Applying excessive pneumatic pressure (&gt; 2.0 bar) bends the blade backward, flattens the contact area, and causes destructive metal-to-metal scoring of expensive cylinder chrome.
                </p>
              </div>
            </div>

            {/* Contact Angle Highlight (100% Light Theme) */}
            <div className="bg-blue-50/70 border border-blue-200 rounded-3xl p-6 sm:p-8 text-slate-900">
              <div className="max-w-3xl mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-800 mb-2">
                  The Golden Pressroom Rule
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900">
                  Why 55° to 60° is the Optimal Doctor Blade Contact Angle
                </h3>
                <p className="text-sm text-slate-700 mt-2 leading-relaxed">
                  The contact angle formed between the doctor blade tangent and the cylinder surface must remain strictly between <strong>55° and 60°</strong>:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
                  <strong className="text-rose-700 block mb-1 font-bold text-sm">Below 50° (Too Flat)</strong>
                  <span className="text-slate-600 leading-relaxed">Blade floats on hydrodynamic fluid wedge; causes hazing, ink spitting, and non-image scumming.</span>
                </div>
                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-emerald-300 shadow-xs ring-1 ring-emerald-300/40">
                  <strong className="text-emerald-700 block mb-1 font-bold text-sm">55° – 60° (Optimal Range)</strong>
                  <span className="text-slate-800 font-medium leading-relaxed">Crisp ink shearing, minimal friction heat, and maximum cylinder chrome lifespan.</span>
                </div>
                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
                  <strong className="text-amber-700 block mb-1 font-bold text-sm">Over 65° (Too Steep)</strong>
                  <span className="text-slate-600 leading-relaxed">Blade chatters, feathers rapidly, and chisels directly into copper cell walls.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Press Velocity vs Clamping Force Curve Table */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mb-12">
            <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Press Speed vs. Recommended Pneumatic Pressure Curve
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  How line velocity impacts hydrodynamic lift and blade selection
                </p>
              </div>
              <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                Operating Curve
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50/70 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-xs">
                  <tr>
                    <th className="py-4 px-5">Press Speed Range</th>
                    <th className="py-4 px-5">Hydrodynamic Lift Force</th>
                    <th className="py-4 px-5">Recommended Pressure</th>
                    <th className="py-4 px-5">Recommended Blade Specification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {speedPressureCurve.map((row, i) => (
                    <tr key={i} className="hover:bg-blue-50/40 transition-colors">
                      <td className="py-4 px-5 font-bold text-slate-900">{row.speed}</td>
                      <td className="py-4 px-5 text-slate-700">{row.hydroLift}</td>
                      <td className="py-4 px-5 font-bold text-blue-700">{row.recommendedPressure}</td>
                      <td className="py-4 px-5 text-slate-700 font-semibold">{row.bladeSpec}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Edge Profile Geometry Comparison */}
          <div className="mb-12">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200/80 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                Precision Manufacturing
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                Understanding Edge Geometries: Lamella vs. Bevel vs. Round
              </h2>
              <p className="text-base text-slate-700 mt-2">
                The edge shape determines how contact pressure is distributed across cylinder cells throughout the entire production run.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {edgeProfiles.map((edge) => (
                <div
                  key={edge.name}
                  className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 hover:shadow-xl hover:border-blue-300 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-4">
                      <span className="text-xs font-black text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                        {edge.badge}
                      </span>
                      <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                        ISO Profile
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {edge.name}
                    </h3>
                    <p className="text-sm text-slate-700 leading-relaxed mb-5">
                      {edge.description}
                    </p>

                    <div className="space-y-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-6">
                      <div>
                        <strong className="text-slate-900 block uppercase tracking-wider font-bold mb-0.5">
                          Tip Geometry:
                        </strong>
                        <span className="text-slate-700 font-medium">{edge.profile}</span>
                      </div>
                      <div>
                        <strong className="text-slate-900 block uppercase tracking-wider font-bold mb-0.5">
                          Tonal Stability:
                        </strong>
                        <span className="text-emerald-700 font-bold">{edge.tonalStability}</span>
                      </div>
                      <div>
                        <strong className="text-slate-900 block uppercase tracking-wider font-bold mb-0.5">
                          Best Application:
                        </strong>
                        <span className="text-slate-700 font-medium">{edge.idealFor}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => window.dispatchEvent(new CustomEvent("open-quote-modal"))}
                    className="w-full py-3 bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white rounded-xl text-xs font-bold transition-all text-center cursor-pointer border border-blue-200 hover:border-blue-600 shadow-xs"
                  >
                    Request Sample of this Profile
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Head-to-Head Comparison Table */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mb-12">
            <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Sub-Standard Generic Blades vs. WIPEX Precision Doctor Blades
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  See the difference refined carbon steel micro-structure makes in press performance
                </p>
              </div>
              <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                Direct Comparison
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50/70 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-xs">
                  <tr>
                    <th className="py-4 px-5 w-1/3">Performance Metric</th>
                    <th className="py-4 px-5 w-1/3 text-rose-700">Generic Low-Cost Blades</th>
                    <th className="py-4 px-5 text-blue-700">WIPEX Precision Blades</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {comparisonTable.map((row, i) => (
                    <tr key={i} className="hover:bg-blue-50/40 transition-colors">
                      <td className="py-4 px-5 font-bold text-slate-900">{row.feature}</td>
                      <td className="py-4 px-5 text-slate-600">{row.generic}</td>
                      <td className="py-4 px-5 text-blue-700 font-semibold">{row.wipex}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Standard FAQSection Matching All Other Pages */}
        <FAQSection
          subtitle="Working Principle FAQs"
          title="Frequently Asked Physics & Hydrodynamic Questions"
          description="Technical answers on ink shear mechanics, 55°–60° contact angle calibration, and carbide metallurgy."
          faqs={principleFaqs}
        />

        <HomeCTA />
      </div>
    </>
  );
}
