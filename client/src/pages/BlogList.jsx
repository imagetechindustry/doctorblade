import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useBlogs, useBlogCategories } from "../services/api";
import SEO from "../components/common/SEO";
import BlogCard from "../components/blog/BlogCard";
import HomeCTA from "../components/home/HomeCTA";

export default function BlogList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const initialSearch = searchParams.get("search") || "";
  const initialPage = parseInt(searchParams.get("page") || "1", 10);

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchInput, setSearchInput] = useState(initialSearch);
  const [debouncedSearch, setDebouncedSearch] = useState(initialSearch);
  const [currentPage, setCurrentPage] = useState(initialPage);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput);
      setCurrentPage(1);
    }, 350);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // Sync state to URL params
  useEffect(() => {
    const params = {};
    if (selectedCategory && selectedCategory !== "All") {
      params.category = selectedCategory;
    }
    if (debouncedSearch) {
      params.search = debouncedSearch;
    }
    if (currentPage > 1) {
      params.page = currentPage.toString();
    }
    setSearchParams(params, { replace: true });
  }, [selectedCategory, debouncedSearch, currentPage, setSearchParams]);

  // API Queries
  const { data: blogData, isLoading, isError } = useBlogs({
    category: selectedCategory === "All" ? "" : selectedCategory,
    search: debouncedSearch,
    page: currentPage,
    limit: 9,
  });

  const { data: categoryData } = useBlogCategories();

  const blogs = blogData?.blogs || [];
  const pagination = blogData?.pagination || { total: 0, totalPages: 1, limit: 9 };
  const categories = categoryData?.categories || [];

  const featuredBlog =
    blogs.length > 0 && currentPage === 1 && !debouncedSearch && selectedCategory === "All"
      ? blogs[0]
      : null;
  const gridBlogs = featuredBlog ? blogs.slice(1) : blogs;

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page === "..." || page === currentPage || page < 1 || page > pagination.totalPages) {
      return;
    }
    setCurrentPage(page);
    const element = document.getElementById("blog-grid-top");
    if (element) {
      const topOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Helper for generating page numbers with ellipsis
  const getPageNumbers = (current, total) => {
    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }
    if (current <= 4) {
      return [1, 2, 3, 4, 5, "...", total];
    }
    if (current >= total - 3) {
      return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
    }
    return [1, "...", current - 1, current, current + 1, "...", total];
  };

  const startItem = pagination.total === 0 ? 0 : (currentPage - 1) * pagination.limit + 1;
  const endItem = Math.min(currentPage * pagination.limit, pagination.total);

  const blogListSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Doctor Blade Blog, Technical Articles & Printing Insights | ImageTech Industries",
    description:
      "Explore comprehensive technical articles, troubleshooting blueprints, and material selection matrices for rotogravure and flexographic printing.",
    url: "https://www.doctorblade.co.in/blog",
    publisher: {
      "@type": "Organization",
      name: "ImageTech Industries",
      logo: "https://www.doctorblade.co.in/logo-512x512.png",
    },
  };

  return (
    <>
      <SEO
        title="Articles & Industry Insights | Doctor Blade, Printing & Converting Blog"
        description="Explore the latest articles, industry news, operational guides, and doctor blade innovations from ImageTech Industries."
        keywords={[
          "doctor blade blog",
          "printing industry articles",
          "rotogravure and flexo news",
          "printing press operational guides",
          "converting best practices",
          "ImageTech Industries articles",
        ]}
        schema={blogListSchema}
      />

      <div className="bg-slate-50/60 min-h-screen pt-12 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Professional Header & Masthead */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-700 bg-blue-50 border border-blue-200/80 px-4 py-1.5 rounded-full mb-4">
              <span>ImageTech Industries</span>
              <span>•</span>
              <span className="text-slate-600 font-medium">Articles & Insights</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
              Articles & Industry Insights
            </h1>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              From market trends and plant operations to technical pressroom guides and blade metallurgy — insights crafted for printing and converting professionals.
            </p>
          </div>

          {/* Search & Category Filter Navigation */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-slate-200/80 mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Search Box */}
              <div className="relative w-full md:w-80 shrink-0">
                <svg
                  className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search articles or topics..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-10 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-medium"
                />
                {searchInput && (
                  <button
                    type="button"
                    onClick={() => setSearchInput("")}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                    title="Clear search"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto w-full pb-1 md:pb-0 scrollbar-none">
                <button
                  type="button"
                  onClick={() => handleCategorySelect("All")}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === "All"
                      ? "bg-slate-900 text-white shadow-xs"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200/80 hover:text-slate-900"
                  }`}
                >
                  All Articles
                </button>
                {categories.map((c) => {
                  const catName = typeof c === "string" ? c : c?.name || "";
                  const catCount = typeof c === "object" ? c?.count : null;
                  if (!catName) return null;

                  const isSelected = selectedCategory === catName;

                  return (
                    <button
                      key={catName}
                      type="button"
                      onClick={() => handleCategorySelect(catName)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                        isSelected
                          ? "bg-blue-600 text-white shadow-xs"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200/80 hover:text-slate-900"
                      }`}
                    >
                      <span>{catName}</span>
                      {catCount != null && (
                        <span
                          className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                            isSelected
                              ? "bg-white/20 text-white"
                              : "bg-slate-200 text-slate-600"
                          }`}
                        >
                          {catCount}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Filters / Results Summary Bar */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-2">
                <span>
                  Showing <strong className="text-slate-900 font-bold">{startItem}–{endItem}</strong> of <strong className="text-slate-900 font-bold">{pagination.total}</strong> published articles
                </span>
                {(selectedCategory !== "All" || debouncedSearch) && (
                  <span className="text-slate-300">•</span>
                )}
                {selectedCategory !== "All" && (
                  <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-md font-semibold text-[11px]">
                    Category: {selectedCategory}
                    <button
                      type="button"
                      onClick={() => handleCategorySelect("All")}
                      className="hover:text-blue-900 ml-0.5"
                    >
                      ×
                    </button>
                  </span>
                )}
                {debouncedSearch && (
                  <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md font-semibold text-[11px]">
                    Keyword: "{debouncedSearch}"
                    <button
                      type="button"
                      onClick={() => setSearchInput("")}
                      className="hover:text-slate-900 ml-0.5"
                    >
                      ×
                    </button>
                  </span>
                )}
              </div>

              {(selectedCategory !== "All" || debouncedSearch) && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory("All");
                    setSearchInput("");
                    setDebouncedSearch("");
                    setCurrentPage(1);
                  }}
                  className="text-blue-600 hover:text-blue-700 font-bold text-xs cursor-pointer"
                >
                  Reset all filters
                </button>
              )}
            </div>
          </div>

          {/* Anchor target for scroll on page change */}
          <div id="blog-grid-top" />

          {/* Loading Skeleton */}
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-3xl p-5 border border-slate-200/60 shadow-xs animate-pulse">
                  <div className="aspect-[16/10] bg-slate-200 rounded-2xl mb-5" />
                  <div className="h-4 bg-slate-200 rounded w-1/3 mb-3" />
                  <div className="h-6 bg-slate-200 rounded w-4/5 mb-3" />
                  <div className="h-4 bg-slate-200 rounded w-full mb-2" />
                  <div className="h-4 bg-slate-200 rounded w-2/3" />
                </div>
              ))}
            </div>
          )}

          {/* Error State */}
          {isError && (
            <div className="text-center py-16 bg-white rounded-3xl border border-red-100 p-8 shadow-xs">
              <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 mx-auto flex items-center justify-center mb-3">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-1">Failed to load articles</h3>
              <p className="text-xs text-slate-500 mb-4">Please check your connection and try again.</p>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-xs"
              >
                Retry
              </button>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !isError && blogs.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8 max-w-lg mx-auto shadow-xs">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 mx-auto flex items-center justify-center mb-4">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">No articles found</h3>
              <p className="text-sm text-slate-500 mb-6">
                No matching posts for your query. Try broadening your keywords or resetting filters.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchInput("");
                  setDebouncedSearch("");
                  setCurrentPage(1);
                }}
                className="bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer"
              >
                Reset Search Filters
              </button>
            </div>
          )}

          {/* Content Loaded */}
          {!isLoading && !isError && blogs.length > 0 && (
            <>
              {/* Featured Story (Hero on Page 1) */}
              {featuredBlog && <BlogCard blog={featuredBlog} featured={true} />}

              {/* Standard Articles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {gridBlogs.map((blog) => (
                  <BlogCard key={blog._id} blog={blog} />
                ))}
              </div>

              {/* Professional Pagination Bar */}
              {pagination.totalPages > 1 && (
                <div className="mt-14 pt-8 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                  {/* Left: Summary text */}
                  <div className="text-xs text-slate-500 font-medium order-2 sm:order-1">
                    Showing <span className="font-bold text-slate-900">{startItem}</span> to <span className="font-bold text-slate-900">{endItem}</span> of <span className="font-bold text-slate-900">{pagination.total}</span> entries
                  </div>

                  {/* Center/Right: Numbered pagination controls */}
                  <div className="flex items-center gap-1.5 order-1 sm:order-2">
                    {/* Previous Button */}
                    <button
                      type="button"
                      disabled={currentPage === 1}
                      onClick={() => handlePageChange(currentPage - 1)}
                      className="inline-flex items-center gap-1 px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-2xs cursor-pointer"
                      aria-label="Previous Page"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                      </svg>
                      <span className="hidden sm:inline">Previous</span>
                    </button>

                    {/* Page Numbers */}
                    {getPageNumbers(currentPage, pagination.totalPages).map((pageNum, idx) => {
                      if (pageNum === "...") {
                        return (
                          <span
                            key={`ellipsis-${idx}`}
                            className="w-9 h-9 flex items-center justify-center text-xs font-bold text-slate-400"
                          >
                            ...
                          </span>
                        );
                      }

                      const isActive = currentPage === pageNum;

                      return (
                        <button
                          key={pageNum}
                          type="button"
                          onClick={() => handlePageChange(pageNum)}
                          className={`w-9 h-9 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            isActive
                              ? "bg-blue-600 text-white shadow-xs scale-105"
                              : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:text-blue-600"
                          }`}
                          aria-current={isActive ? "page" : undefined}
                        >
                          {pageNum}
                        </button>
                      );
                    })}

                    {/* Next Button */}
                    <button
                      type="button"
                      disabled={currentPage === pagination.totalPages}
                      onClick={() => handlePageChange(currentPage + 1)}
                      className="inline-flex items-center gap-1 px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-2xs cursor-pointer"
                      aria-label="Next Page"
                    >
                      <span className="hidden sm:inline">Next</span>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <HomeCTA />
    </>
  );
}
