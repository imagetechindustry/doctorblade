import React, { useEffect, useState } from "react";

export default function BlogTOC({ toc = [] }) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    if (!toc || toc.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0% -60% 0%",
        threshold: 0.1,
      }
    );

    toc.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [toc]);

  if (!toc || toc.length === 0) return null;

  const scrollToHeading = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const topOffset = 100;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveId(id);
    }
  };

  return (
    <nav className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
        <svg
          className="w-4 h-4 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h10M4 18h14"
          />
        </svg>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
          Table of Contents
        </h4>
      </div>

      <ul className="space-y-2 text-xs font-medium">
        {toc.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li
              key={item.id}
              className={`${
                item.level === 3 ? "pl-3 text-[11px]" : "pl-0"
              }`}
            >
              <a
                href={`#${item.id}`}
                onClick={(e) => scrollToHeading(e, item.id)}
                className={`block py-1 px-2.5 rounded-lg transition-all line-clamp-1 leading-snug ${
                  isActive
                    ? "bg-blue-50 text-blue-700 font-bold border-l-2 border-blue-600 pl-2"
                    : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"
                }`}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
