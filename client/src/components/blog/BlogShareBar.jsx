import React, { useState } from "react";

export default function BlogShareBar({ title, url }) {
  const [copied, setCopied] = useState(false);

  const fullUrl =
    url || (typeof window !== "undefined" ? window.location.href : "");

  const handleCopy = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const encodedUrl = encodeURIComponent(fullUrl);
  const encodedTitle = encodeURIComponent(title || "Doctor Blade Technical Guide");

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1 hidden sm:inline">
        Share:
      </span>

      {/* WhatsApp */}
      <a
        href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on WhatsApp"
        className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all flex items-center justify-center shadow-xs"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.668-.699c.969.587 1.777.893 2.792.893 3.18 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.768-5.779zm3.387 8.243c-.149.42-.767.788-1.077.838-.309.05-.705.074-2.224-.555-1.519-.629-2.508-2.18-2.583-2.28-.074-.1-1.04-1.385-1.04-2.64 0-1.256.657-1.874.891-2.126.234-.253.513-.316.685-.316.172 0 .344.002.495.009.159.008.373-.06.584.446.219.529.746 1.82.812 1.954.066.134.11.291.018.468-.093.177-.139.288-.276.446-.137.159-.289.355-.413.477-.138.136-.282.285-.121.562.161.277.717 1.182 1.542 1.917 1.06 1.011 1.954 1.323 2.231 1.46.277.137.439.114.602-.074.163-.189.699-.814.886-1.092.186-.277.373-.232.628-.137.255.094 1.62.764 1.899.903.278.139.464.208.534.324.069.117.069.673-.08 1.093z" />
        </svg>
      </a>

      {/* LinkedIn */}
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center shadow-xs"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      </a>

      {/* Twitter / X */}
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X"
        className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 hover:bg-black hover:text-white transition-all flex items-center justify-center shadow-xs"
      >
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>

      {/* Copy Link */}
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy link"
        className="h-8 px-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        <span>{copied ? "Copied!" : "Copy"}</span>
      </button>
    </div>
  );
}
