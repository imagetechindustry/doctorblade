import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useLocations, usePrefetchLocation } from "../services/api";
import { productsData } from "../data/product";
import SEO from "../components/common/SEO";

const SitemapSkeleton = () => (
  <div className="space-y-12 animate-pulse" aria-hidden="true">
    {[1, 2, 3].map((group) => (
      <div key={group} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* State Header Skeleton */}
        <div className="bg-gradient-to-r from-blue-50/50 to-gray-50 border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <div className="h-6 w-36 bg-gray-200 rounded-md"></div>
          <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
        </div>

        {/* Cities Grid Skeleton */}
        <div className="p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="h-11 bg-gray-100 border border-gray-200/70 rounded-xl px-4 flex items-center justify-between"
            >
              <div className="h-3.5 bg-gray-200 rounded w-20"></div>
              <div className="w-3.5 h-3.5 bg-gray-200 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

const Sitemap = () => {
  const prefetchLocation = usePrefetchLocation();
  const [search, setSearch] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data: locations = [], isLoading } = useLocations();

  // Instant filter by city, state, or slug
  const filteredLocations = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return locations;
    return locations.filter(
      (loc) =>
        loc.name?.toLowerCase().includes(q) ||
        loc.state?.toLowerCase().includes(q) ||
        loc.slug?.toLowerCase().includes(q)
    );
  }, [locations, search]);

  // Group locations by state
  const groupedLocations = useMemo(() => {
    return filteredLocations.reduce((acc, loc) => {
      if (!acc[loc.state]) acc[loc.state] = [];
      acc[loc.state].push(loc);
      return acc;
    }, {});
  }, [filteredLocations]);

  // Sort states alphabetically
  const sortedStates = useMemo(() => {
    return Object.keys(groupedLocations).sort((a, b) => a.localeCompare(b));
  }, [groupedLocations]);

  return (
    <>
      <SEO
        title="Sitemap - Locations & Cities | ImageTech Industries"
        description="Browse all nationwide distribution locations and cities for the best Doctor Blades by ImageTech Industries in India."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            PAN India Presence
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Our <span className="text-blue-600">Locations</span>
          </h1>
          <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
            Find the best Doctor Blades in a city near you. Select your state and city below.
          </p>
        </div>

        {/* Instant Search Bar */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by city, state, or region..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-10 py-3 bg-white border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm text-gray-900 transition-all placeholder:text-gray-400"
            />
            <svg
              className="w-5 h-5 text-gray-400 absolute left-3.5 top-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600"
                title="Clear search"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          {search && (
            <p className="text-center text-xs text-gray-500 mt-2 font-medium">
              Found {filteredLocations.length} matching {filteredLocations.length === 1 ? "city" : "cities"} across {sortedStates.length} {sortedStates.length === 1 ? "state" : "states"}
            </p>
          )}
        </div>

        {isLoading ? (
          <SitemapSkeleton />
        ) : (
          <div className="space-y-12">
            {sortedStates.length > 0 ? (
              sortedStates.map((stateName) => (
                <div key={stateName} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  {/* State Header */}
                  <div className="bg-gradient-to-r from-blue-50 to-white border-b border-blue-100 px-6 py-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-blue-900">{stateName}</h2>
                    <span className="text-blue-600 bg-white rounded-full px-3 py-1 text-xs font-bold border border-blue-100 shadow-sm">
                      {groupedLocations[stateName].length} {groupedLocations[stateName].length === 1 ? "City" : "Cities"}
                    </span>
                  </div>

                  {/* Cities Grid */}
                  <div className="p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {groupedLocations[stateName]
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((loc) => (
                        <Link
                          key={loc._id || loc.slug}
                          to={`/${loc.slug}`}
                          onMouseEnter={() => prefetchLocation(loc.slug)}
                          className="group flex items-center justify-between bg-white border border-gray-200 hover:border-blue-500 text-gray-700 hover:text-blue-700 font-medium py-3 px-4 rounded-xl transition-all duration-300 hover:shadow-md"
                        >
                          <span className="text-sm truncate mr-2">{loc.name}</span>
                          <svg
                            className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </Link>
                      ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-12 bg-gray-50 rounded-2xl border border-gray-200">
                <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-lg font-medium text-gray-900">No locations available</p>
                <p className="text-sm text-gray-500 mt-1">Please check back later.</p>
              </div>
            )}
          </div>
        )}

        {/* Products Directory */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-12 mt-12">
          <div className="bg-gradient-to-r from-blue-50 to-white border-b border-blue-100 px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-blue-900">Our Products Directory</h2>
            <span className="text-blue-600 bg-white rounded-full px-3 py-1 text-xs font-bold border border-blue-100 shadow-sm">
              {productsData.length} Products
            </span>
          </div>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {productsData.map((prod) => (
              <Link
                key={prod.id}
                to={`/products/${prod.slug}`}
                className="group flex flex-col justify-between bg-white border border-gray-200 hover:border-blue-500 text-gray-800 hover:text-blue-700 font-medium p-4 rounded-xl transition-all duration-300 hover:shadow-md"
              >
                <div>
                  <h3 className="text-sm font-bold text-gray-900 group-hover:text-blue-600 mb-1 leading-snug">
                    {prod.name}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2">
                    {prod.shortDescription}
                  </p>
                </div>
                <div className="mt-3 flex items-center text-xs font-semibold text-blue-600">
                  <span>View Product</span>
                  <svg
                    className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Technical Guides & Engineering Directory */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-12">
          <div className="bg-gradient-to-r from-blue-50 to-white border-b border-blue-100 px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-blue-900">Technical Guides & Engineering Resources</h2>
            <span className="text-blue-600 bg-white rounded-full px-3 py-1 text-xs font-bold border border-blue-100 shadow-sm">
              4 Pillar Guides
            </span>
          </div>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: "Selection & Sizing Guide",
                slug: "/selection-guide",
                desc: "Interactive calculator, thickness tolerances (0.15/0.20mm), and chemical compatibility.",
              },
              {
                title: "Defect Troubleshooting",
                slug: "/troubleshooting-guide",
                desc: "Visual quick-finder for streaks, hazing, spitting, scoring, and blade mounting SOP.",
              },
              {
                title: "Working Principle & Physics",
                slug: "/working-principle",
                desc: "Hydrodynamic lift forces, 55°–60° contact angle mechanics, and lamella geometry.",
              },
              {
                title: "Press Applications & Sectors",
                slug: "/press-applications",
                desc: "Rotogravure, CI flexo, corrugated packaging, barrier coating, and blister foil.",
              },
            ].map((guide, idx) => (
              <Link
                key={idx}
                to={guide.slug}
                className="group flex flex-col justify-between bg-white border border-gray-200 hover:border-blue-500 text-gray-800 hover:text-blue-700 font-medium p-4 rounded-xl transition-all duration-300 hover:shadow-md"
              >
                <div>
                  <h3 className="text-sm font-bold text-gray-900 group-hover:text-blue-600 mb-1 leading-snug">
                    {guide.title}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2">
                    {guide.desc}
                  </p>
                </div>
                <div className="mt-3 flex items-center text-xs font-semibold text-blue-600">
                  <span>Read Guide</span>
                  <svg
                    className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sitemap;
