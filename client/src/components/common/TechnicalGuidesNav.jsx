import React from "react";
import { Link, useLocation } from "react-router-dom";

const guides = [
  {
    name: "Selection & Sizing",
    badge: "Calculator",
    path: "/selection-guide",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    name: "Defect Troubleshooting",
    badge: "Quick-Finder",
    path: "/troubleshooting-guide",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
  },
  {
    name: "Working Principle",
    badge: "Physics",
    path: "/working-principle",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    name: "Press Applications",
    badge: "Sectors",
    path: "/press-applications",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
];

export default function TechnicalGuidesNav() {
  const location = useLocation();

  return (
    <div className="bg-white rounded-2xl p-2 sm:p-2.5 shadow-sm border border-gray-200/80 mb-8 sm:mb-10">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2.5">
        <div className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
          <span>Technical Suite:</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 flex-1">
          {guides.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
                    : "bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-700 border border-gray-100 hover:border-blue-200"
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <span className={isActive ? "text-white" : "text-blue-600"}>
                    {item.icon}
                  </span>
                  <span className="truncate">{item.name}</span>
                </div>
                <span
                  className={`hidden sm:inline-block text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md font-extrabold shrink-0 ml-1.5 ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-white text-gray-500 border border-gray-200/60"
                  }`}
                >
                  {item.badge}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
