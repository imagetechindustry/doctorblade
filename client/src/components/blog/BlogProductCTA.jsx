import React from "react";
import { Link } from "react-router-dom";
import { productsData } from "../../data/product";

export default function BlogProductCTA({ productSlug = "wipex-carbon-steel-doctor-blade" }) {
  const product =
    productsData.find((p) => p.slug === productSlug) || productsData[0];

  const handleOpenQuote = () => {
    window.dispatchEvent(
      new CustomEvent("open-quote-modal", {
        detail: { subject: `Quote Inquiry for ${product.name}` },
      })
    );
  };

  return (
    <div className="my-10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-1 text-left">
          <span className="inline-block bg-blue-600/30 text-blue-400 border border-blue-500/30 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3">
            Recommended Doctor Blade
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white leading-tight mb-2">
            {product.name}
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl">
            {product.shortDescription} Manufactured with precision lamella and bevel edges for zero streaks and cylinder protection.
          </p>
        </div>

        <div className="flex sm:flex-col lg:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
          <button
            type="button"
            onClick={handleOpenQuote}
            className="flex-1 sm:flex-initial bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-full transition-all shadow-lg hover:shadow-blue-500/25 cursor-pointer whitespace-nowrap"
          >
            Request Free Quote
          </button>
          <Link
            to={`/products/${product.slug}`}
            className="flex-1 sm:flex-initial bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold px-5 py-3 rounded-full transition-colors border border-white/10 text-center whitespace-nowrap"
          >
            View Specs
          </Link>
        </div>
      </div>
    </div>
  );
}
