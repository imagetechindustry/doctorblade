import React from "react";
import { Link } from "react-router-dom";

export default function BlogCard({ blog, featured = false }) {
  if (!blog) return null;

  const formattedDate = blog.publishedAt
    ? new Date(blog.publishedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Recently Published";

  if (featured) {
    return (
      <div className="relative group bg-white rounded-3xl border border-slate-200/80 shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col lg:flex-row overflow-hidden mb-12">
        <Link
          to={`/blog/${blog.slug}`}
          className="w-full lg:w-7/12 relative overflow-hidden bg-slate-100 min-h-[320px] lg:min-h-[440px] block"
        >
          <img
            src={blog.featuredImage}
            alt={blog.imageAlt || blog.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/20 to-transparent lg:hidden" />
          <div className="absolute top-5 left-5 flex items-center gap-2">
            <span className="bg-blue-600 text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-md uppercase tracking-wider">
              Featured Story
            </span>
            <span className="bg-white/95 backdrop-blur-md text-slate-800 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
              {blog.category}
            </span>
          </div>
        </Link>

        <div className="w-full lg:w-5/12 p-8 lg:p-12 flex flex-col justify-between bg-white">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-4">
              <span>{formattedDate}</span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {blog.readTime || "5 min read"}
              </span>
            </div>

            <Link to={`/blog/${blog.slug}`}>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors leading-[1.25] tracking-tight mb-4">
                {blog.title}
              </h2>
            </Link>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed line-clamp-3 mb-6">
              {blog.excerpt}
            </p>
          </div>

          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={blog.author?.avatar || "https://www.doctorblade.co.in/logo-512x512.png"}
                alt={blog.author?.name || "ImageTech"}
                className="w-10 h-10 rounded-full border border-slate-200 object-cover bg-slate-50"
              />
              <div>
                <p className="text-xs font-bold text-slate-900 leading-tight">
                  {blog.author?.name || "ImageTech Editorial"}
                </p>
                <p className="text-[11px] text-slate-500 font-medium">
                  {blog.author?.title || "Industry Specialist"}
                </p>
              </div>
            </div>

            <Link
              to={`/blog/${blog.slug}`}
              className="inline-flex items-center gap-2 text-xs font-bold bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white px-4 py-2 rounded-xl transition-all shadow-2xs group-hover:shadow-md"
            >
              Read Story
              <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <article className="group bg-white rounded-3xl border border-slate-200/70 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden h-full">
      <Link to={`/blog/${blog.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={blog.featuredImage}
          alt={blog.imageAlt || blog.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5">
          <span className="bg-white/95 backdrop-blur-md text-slate-800 text-[11px] font-bold px-3 py-1 rounded-full shadow-xs">
            {blog.category}
          </span>
        </div>
      </Link>

      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-3">
            <span>{formattedDate}</span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {blog.readTime || "5 min read"}
            </span>
          </div>

          <Link to={`/blog/${blog.slug}`}>
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug mb-3 line-clamp-2 tracking-tight">
              {blog.title}
            </h3>
          </Link>

          <p className="text-slate-600 text-sm leading-relaxed line-clamp-2 mb-4 font-normal">
            {blog.excerpt}
          </p>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img
              src={blog.author?.avatar || "https://www.doctorblade.co.in/logo-512x512.png"}
              alt={blog.author?.name || "Author"}
              className="w-7 h-7 rounded-full border border-slate-200 object-cover bg-slate-50"
            />
            <span className="text-xs font-medium text-slate-700">
              {blog.author?.name || "ImageTech"}
            </span>
          </div>

          <Link
            to={`/blog/${blog.slug}`}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform"
          >
            Read story
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
