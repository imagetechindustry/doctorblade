import React from "react";
import { Link } from "react-router-dom";
import { useBlogs } from "../../services/api";

const fallbackArticles = [
  {
    _id: "fb-1",
    title: "Carbon Steel vs Stainless Steel vs Polymer Doctor Blades: Material Selection Matrix",
    slug: "carbon-steel-vs-stainless-steel-vs-polymer-doctor-blades",
    category: "Material Selection",
    featuredImage: "https://www.doctorblade.co.in/Doctorblade/steel-blade/224.jpg",
    publishedAt: "2026-09-28",
    readTime: "7 min read",
    excerpt: "Comprehensive metallurgical and performance comparison between carbon steel, stainless steel, and polymer doctor blades for rotogravure and flexo presses.",
  },
  {
    _id: "fb-2",
    title: "How to Prevent Cylinder Scoring & Drag Lines in Rotogravure Printing",
    slug: "how-to-prevent-cylinder-scoring-and-drag-lines",
    category: "Troubleshooting & Defects",
    featuredImage: "https://www.doctorblade.co.in/Doctorblade/polymer-blade/227.jpg",
    publishedAt: "2026-09-28",
    readTime: "6 min read",
    excerpt: "Discover the root causes of chrome cylinder scoring, micro-burrs, and contact angle misalignment, and how to eliminate blade drag lines.",
  },
  {
    _id: "fb-3",
    title: "Optimizing Doctor Blade Contact Angle, Deflection & Pressure for Flexo Printing",
    slug: "optimizing-doctor-blade-contact-angle-pressure-flexo",
    category: "Press Setup & Optimization",
    featuredImage: "https://www.doctorblade.co.in/Doctorblade/steel-blade/225.jpg",
    publishedAt: "2026-09-28",
    readTime: "8 min read",
    excerpt: "Step-by-step engineering guide to calibrating doctor blade contact angles between 55° and 65° for clean anilox wiping and extended blade life.",
  },
];

const HomeInsights = () => {
  const { data, isLoading } = useBlogs({ limit: 3 });
  const liveArticles = data?.blogs && data.blogs.length > 0 ? data.blogs : [];
  const articles = liveArticles.length > 0 ? liveArticles.slice(0, 3) : fallbackArticles;

  const formatDate = (dateString) => {
    if (!dateString) return "Recently Published";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return "Recently Published";
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-slate-50/70 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200/60 px-3.5 py-1 rounded-full mb-3">
              <span>Articles & Industry Insights</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight tracking-tight">
              Latest Articles & Industry News
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
              Explore printing industry trends, operational best practices, technical guides, and doctor blade innovations.
            </p>
          </div>

          <div className="mt-5 md:mt-0 shrink-0">
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-xs font-bold bg-white hover:bg-blue-600 text-slate-800 hover:text-white border border-slate-200 hover:border-blue-600 px-5 py-2.5 rounded-xl transition-all shadow-2xs group"
            >
              <span>View All Articles</span>
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* Loading Skeleton */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs animate-pulse"
              >
                <div className="aspect-[16/10] bg-slate-200 rounded-2xl mb-4" />
                <div className="h-4 bg-slate-200 rounded w-1/3 mb-3" />
                <div className="h-6 bg-slate-200 rounded w-4/5 mb-3" />
                <div className="h-4 bg-slate-200 rounded w-full" />
              </div>
            ))}
          </div>
        )}

        {/* Articles Grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => {
              const articleUrl = `/blog/${article.slug}`;
              return (
                <article
                  key={article._id || article.slug}
                  className="group bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden h-full"
                >
                  <Link
                    to={articleUrl}
                    className="relative block aspect-[16/10] overflow-hidden bg-slate-100"
                  >
                    <img
                      src={article.featuredImage}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute top-3.5 left-3.5">
                      <span className="bg-white/95 backdrop-blur-md text-slate-800 text-[11px] font-bold px-3 py-1 rounded-full shadow-xs">
                        {article.category}
                      </span>
                    </div>
                  </Link>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-3">
                        <span>{formatDate(article.publishedAt)}</span>
                        <span className="text-slate-300">•</span>
                        <span className="flex items-center gap-1">
                          <svg
                            className="w-3 h-3 text-slate-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          {article.readTime || "5 min read"}
                        </span>
                      </div>

                      <Link to={articleUrl}>
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug mb-3 line-clamp-2 tracking-tight">
                          {article.title}
                        </h3>
                      </Link>

                      <p className="text-slate-600 text-sm leading-relaxed line-clamp-2 mb-4">
                        {article.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-600">
                        {article.author?.name || "ImageTech Engineering"}
                      </span>

                      <Link
                        to={articleUrl}
                        className="text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                      >
                        Read article
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.5"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default HomeInsights;
