import React, { useState } from "react";

export default function BlogFAQ({ faqs = [] }) {
  const [openIndex, setOpenIndex] = useState(0);

  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="my-12 p-6 sm:p-8 bg-slate-50 border border-slate-200/80 rounded-3xl">
      <div className="flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-widest mb-2">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Frequently Asked Questions
      </div>

      <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-6">
        Technical Questions & Answers
      </h3>

      <div className="space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="bg-white border border-slate-200 rounded-xl overflow-hidden transition-all duration-200"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                className="w-full px-5 py-4 flex items-center justify-between text-left font-bold text-slate-900 text-sm sm:text-base hover:text-blue-600 transition-colors"
                aria-expanded={isOpen}
              >
                <span>{faq.question}</span>
                <span
                  className={`ml-4 w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180 bg-blue-50 text-blue-600" : "text-slate-400"
                  }`}
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-slate-600 text-sm leading-relaxed border-t border-slate-50">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
