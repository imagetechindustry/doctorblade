import React, { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { useBlog } from "../services/api";
import SEO from "../components/common/SEO";
import BlogTOC from "../components/blog/BlogTOC";
import BlogFAQ from "../components/blog/BlogFAQ";
import BlogProductCTA from "../components/blog/BlogProductCTA";
import BlogShareBar from "../components/blog/BlogShareBar";
import BlogCard from "../components/blog/BlogCard";
import HomeCTA from "../components/home/HomeCTA";

/**
 * Clean markdown/html renderer with automatic section IDs for TOC targeting,
 * magazine drop-cap / lead paragraph styling, and editorial blockquotes
 */
const renderBlogContent = (rawContent) => {
  if (!rawContent) return null;

  const lines = rawContent.split("\n");
  const elements = [];
  let buffer = [];
  let inTable = false;
  let tableRows = [];
  let isFirstParagraph = true;

  const flushParagraph = () => {
    if (buffer.length > 0) {
      const text = buffer.join(" ").trim();
      if (text) {
        if (isFirstParagraph) {
          isFirstParagraph = false;
          elements.push(
            <p
              key={elements.length}
              className="text-slate-700 leading-relaxed text-lg sm:text-xl mb-8 font-normal"
              dangerouslySetInnerHTML={{
                __html: text.replace(
                  /\*\*(.*?)\*\*/g,
                  '<strong class="font-bold text-slate-900">$1</strong>'
                ),
              }}
            />
          );
        } else {
          elements.push(
            <p
              key={elements.length}
              className="text-slate-800 leading-[1.85] text-[17px] sm:text-[18px] mb-6 font-normal"
              dangerouslySetInnerHTML={{
                __html: text.replace(
                  /\*\*(.*?)\*\*/g,
                  '<strong class="font-bold text-slate-900">$1</strong>'
                ),
              }}
            />
          );
        }
      }
      buffer = [];
    }
  };

  const flushTable = () => {
    if (tableRows.length > 0) {
      const headerRow = tableRows[0];
      const dataRows = tableRows.slice(2); // Skip separator row

      elements.push(
        <div
          key={elements.length}
          className="my-10 overflow-x-auto rounded-3xl border border-slate-200/80 shadow-xs bg-white"
        >
          <table className="min-w-full divide-y divide-slate-200 text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 font-bold text-slate-900">
              <tr>
                {headerRow.map((cell, idx) => (
                  <th key={idx} className="px-5 py-3.5 sm:px-6">
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white font-normal text-slate-700">
              {dataRows.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-slate-50/80 transition-colors">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="px-5 py-3.5 sm:px-6 whitespace-nowrap">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      tableRows = [];
      inTable = false;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Markdown Table detection
    if (line.trim().startsWith("|")) {
      flushParagraph();
      inTable = true;
      const cells = line
        .split("|")
        .slice(1, -1)
        .map((c) => c.trim().replace(/\*\*(.*?)\*\*/g, "$1"));
      tableRows.push(cells);
      continue;
    } else if (inTable) {
      flushTable();
    }

    // Blockquote detection
    if (line.trim().startsWith(">")) {
      flushParagraph();
      const quoteText = line.trim().replace(/^>\s*/, "");
      elements.push(
        <blockquote
          key={elements.length}
          className="my-8 p-6 sm:p-8 bg-blue-50/50 rounded-2xl border-l-4 border-blue-600 text-slate-700 italic text-base sm:text-lg leading-relaxed shadow-2xs"
        >
          <div
            dangerouslySetInnerHTML={{
              __html: quoteText.replace(
                /\*\*(.*?)\*\*/g,
                '<strong class="font-bold text-slate-900 not-italic">$1</strong>'
              ),
            }}
          />
        </blockquote>
      );
      continue;
    }

    // Heading 2
    if (line.startsWith("## ")) {
      flushParagraph();
      const text = line.replace("## ", "").trim();
      const id = text
        .toLowerCase()
        .replace(/[\s\W-]+/g, "-")
        .replace(/^-+|-+$/g, "");
      elements.push(
        <h2
          key={elements.length}
          id={id}
          className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-12 mb-5 pt-6 border-t border-slate-100 first:border-0 first:pt-0 scroll-mt-24"
        >
          {text}
        </h2>
      );
      continue;
    }

    // Heading 3
    if (line.startsWith("### ")) {
      flushParagraph();
      const text = line.replace("### ", "").trim();
      const id = text
        .toLowerCase()
        .replace(/[\s\W-]+/g, "-")
        .replace(/^-+|-+$/g, "");
      elements.push(
        <h3
          key={elements.length}
          id={id}
          className="text-xl sm:text-2xl font-bold text-slate-900 mt-8 mb-4 tracking-tight scroll-mt-24"
        >
          {text}
        </h3>
      );
      continue;
    }

    // Horizontal Rule
    if (line.trim() === "---") {
      flushParagraph();
      elements.push(<hr key={elements.length} className="my-10 border-slate-100" />);
      continue;
    }

    // Unordered List Items
    if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
      flushParagraph();
      const itemText = line.trim().replace(/^[-*]\s+/, "");
      elements.push(
        <div
          key={elements.length}
          className="flex items-start gap-3 my-2.5 text-slate-800 text-base leading-relaxed pl-2"
        >
          <span className="w-2 h-2 rounded-full bg-blue-600 mt-2.5 shrink-0" />
          <span
            dangerouslySetInnerHTML={{
              __html: itemText.replace(
                /\*\*(.*?)\*\*/g,
                '<strong class="font-bold text-slate-900">$1</strong>'
              ),
            }}
          />
        </div>
      );
      continue;
    }

    // Ordered List Items (1. , 2. )
    const numberedMatch = line.trim().match(/^(\d+)\.\s+(.*)$/);
    if (numberedMatch) {
      flushParagraph();
      const num = numberedMatch[1];
      const itemText = numberedMatch[2];
      elements.push(
        <div
          key={elements.length}
          className="flex items-start gap-3.5 my-3 text-slate-800 text-base leading-relaxed pl-1"
        >
          <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 border border-blue-200">
            {num}
          </span>
          <span
            dangerouslySetInnerHTML={{
              __html: itemText.replace(
                /\*\*(.*?)\*\*/g,
                '<strong class="font-bold text-slate-900">$1</strong>'
              ),
            }}
          />
        </div>
      );
      continue;
    }

    // Empty lines trigger paragraph flush
    if (!line.trim()) {
      flushParagraph();
      continue;
    }

    buffer.push(line);
  }

  flushParagraph();
  if (inTable) flushTable();

  return elements;
};

export default function BlogPost() {
  const { slug } = useParams();
  const [scrollProgress, setScrollProgress] = useState(0);

  const { data, isLoading, isError } = useBlog(slug);
  const blog = data?.blog;
  const relatedBlogs = data?.relatedBlogs || [];

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Track scroll progress bar
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="animate-pulse space-y-6">
            <div className="h-4 bg-slate-100 rounded w-1/4" />
            <div className="h-12 bg-slate-100 rounded w-4/5" />
            <div className="h-6 bg-slate-100 rounded w-1/3" />
            <div className="h-96 bg-slate-100 rounded-3xl w-full" />
            <div className="space-y-4 pt-8">
              <div className="h-4 bg-slate-100 rounded w-full" />
              <div className="h-4 bg-slate-100 rounded w-full" />
              <div className="h-4 bg-slate-100 rounded w-3/4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !blog) {
    return <Navigate to="/blog" replace />;
  }

  const canonicalUrl =
    blog.canonicalUrl || `https://www.doctorblade.co.in/blog/${blog.slug}`;

  const formattedPublished = blog.publishedAt
    ? new Date(blog.publishedAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  const formattedModified = blog.updatedAt
    ? new Date(blog.updatedAt).toISOString()
    : new Date().toISOString();

  // 1. Article / BlogPosting Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.metaDescription || blog.excerpt,
    image: [blog.featuredImage],
    datePublished: blog.publishedAt
      ? new Date(blog.publishedAt).toISOString()
      : new Date().toISOString(),
    dateModified: formattedModified,
    author: {
      "@type": "Person",
      name: blog.author?.name || "ImageTech Engineering Team",
      jobTitle: blog.author?.title || "Doctor Blade Technical Specialist",
    },
    publisher: {
      "@type": "Organization",
      name: "ImageTech Industries",
      logo: {
        "@type": "ImageObject",
        url: "https://www.doctorblade.co.in/logo-512x512.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
  };

  // 2. BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.doctorblade.co.in/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://www.doctorblade.co.in/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: blog.title,
        item: canonicalUrl,
      },
    ],
  };

  // 3. FAQPage Schema (if blog has faqs)
  const faqSchema =
    blog.faqs && blog.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: blog.faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: f.answer,
            },
          })),
        }
      : null;

  const schemas = [articleSchema, breadcrumbSchema, faqSchema].filter(Boolean);

  return (
    <>
      <SEO
        title={blog.metaTitle || `${blog.title} | ImageTech Journal`}
        description={blog.metaDescription || blog.excerpt}
        keywords={blog.keywords || ["doctor blade", "printing guides"]}
        image={blog.featuredImage}
        type="article"
        schema={schemas}
      />

      {/* Fixed Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 z-[100] transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin="0"
        aria-valuemax="100"
      />

      <article className="bg-white min-h-screen pt-8 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs Navigation */}
          <nav className="text-xs font-medium text-slate-500 mb-8 flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
            <Link to="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <span className="text-slate-300">/</span>
            <Link to="/blog" className="hover:text-blue-600 transition-colors">
              Journal
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-blue-600 font-semibold">{blog.category}</span>
          </nav>

          {/* Editorial Article Header */}
          <header className="max-w-4xl mx-auto mb-10 text-left">
            <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-wider mb-4">
              <span className="bg-blue-50 text-blue-700 px-3.5 py-1 rounded-full border border-blue-100/80">
                {blog.category}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-500 font-medium">{formattedPublished}</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-500 font-medium flex items-center gap-1">
                <svg
                  className="w-3.5 h-3.5 text-slate-400"
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
                {blog.readTime || "5 min read"}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-black text-slate-900 tracking-tight leading-[1.14] mb-6">
              {blog.title}
            </h1>

            <p className="text-lg sm:text-2xl text-slate-600 font-normal leading-relaxed mb-8">
              {blog.excerpt}
            </p>

            {/* Author Byline & Social Share Strip */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-5 border-y border-slate-100">
              <div className="flex items-center gap-3.5">
                <img
                  src={
                    blog.author?.avatar ||
                    "https://www.doctorblade.co.in/logo-512x512.png"
                  }
                  alt={blog.author?.name || "ImageTech Author"}
                  className="w-12 h-12 rounded-full border border-slate-200 object-cover bg-slate-50 shadow-2xs"
                />
                <div>
                  <h2 className="text-sm font-bold text-slate-900 leading-tight">
                    {blog.author?.name || "ImageTech Editorial Team"}
                  </h2>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {blog.author?.title || "Doctor Blade & Printing Specialist"}
                  </p>
                </div>
              </div>

              <BlogShareBar title={blog.title} url={canonicalUrl} />
            </div>
          </header>

          {/* Hero Image */}
          <div className="max-w-5xl mx-auto mb-14 rounded-3xl overflow-hidden shadow-lg border border-slate-150 aspect-[16/9] sm:aspect-[21/9] bg-slate-100">
            <img
              src={blog.featuredImage}
              alt={blog.imageAlt || blog.title}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>

          {/* Main Layout: Left Article Body (68%) + Right Sticky Sidebar (32%) */}
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 items-start">
            {/* Left Content */}
            <div className="w-full lg:w-[68%] text-left max-w-[760px]">
              {renderBlogContent(blog.content)}

              {/* End-of-article Share Bar */}
              <div className="my-10 pt-6 border-t border-slate-100 flex items-center justify-between">
                <span className="text-sm font-bold text-slate-700">
                  Enjoyed this article? Share it:
                </span>
                <BlogShareBar title={blog.title} url={canonicalUrl} />
              </div>

              {/* Inline Product Recommendation Widget */}
              <BlogProductCTA
                productSlug={
                  blog.relatedProductSlug || "wipex-carbon-steel-doctor-blade"
                }
              />

              {/* Interactive FAQ Accordion */}
              {blog.faqs && blog.faqs.length > 0 && (
                <div className="my-12">
                  <BlogFAQ faqs={blog.faqs} />
                </div>
              )}

              {/* Author Bio Card */}
              <div className="my-12 p-8 bg-slate-50 rounded-3xl border border-slate-200/80 flex flex-col sm:flex-row items-center sm:items-start gap-5">
                <img
                  src={
                    blog.author?.avatar ||
                    "https://www.doctorblade.co.in/logo-512x512.png"
                  }
                  alt={blog.author?.name || "ImageTech"}
                  className="w-16 h-16 rounded-full border-2 border-white shadow-md object-cover bg-white"
                />
                <div className="text-center sm:text-left flex-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                    About the Author
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-0.5 mb-1.5">
                    {blog.author?.name || "ImageTech Editorial Team"}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Engineering specialists at ImageTech Industries with over three decades of field expertise in blade metallurgy, flexo doctoring systems, and rotogravure pressroom optimization.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Sticky Sidebar */}
            <div className="w-full lg:w-[32%] sticky top-24 space-y-6">
              {/* Table of Contents */}
              {blog.toc && blog.toc.length > 0 && <BlogTOC toc={blog.toc} />}

              {/* Specialist Quick Contact Card */}
              <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-3xl p-6 shadow-md">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-400 bg-blue-900/60 px-2.5 py-1 rounded-full border border-blue-700/50 inline-block mb-3">
                  Technical Assistance
                </span>
                <h4 className="text-base font-bold mb-2">
                  Troubleshooting an active pressroom issue?
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Talk to our application engineers for sample blades, edge profile recommendations, or cylinder scoring diagnostics.
                </p>
                <div className="flex flex-col gap-2">
                  <a
                    href="https://api.whatsapp.com/send?phone=918448336036&text=Hi%20ImageTech,%20I%20read%20your%20blog%20and%20need%20doctor%20blade%20technical%20assistance."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2.5 px-4 rounded-xl text-center transition-all flex items-center justify-center gap-2"
                  >
                    <span>Chat on WhatsApp</span>
                  </a>
                  <a
                    href="tel:+918448336036"
                    className="w-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold py-2.5 px-4 rounded-xl text-center transition-all border border-white/20"
                  >
                    Call +91 8448336036
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Related Articles ("More from the Journal") */}
          {relatedBlogs && relatedBlogs.length > 0 && (
            <div className="mt-20 pt-16 border-t border-slate-100">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                    Recommended Reading
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                    More from the Journal
                  </h3>
                </div>
                <Link
                  to="/blog"
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 hidden sm:inline-flex items-center gap-1"
                >
                  View all articles →
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedBlogs.slice(0, 3).map((rel) => (
                  <BlogCard key={rel._id} blog={rel} />
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      <HomeCTA />
    </>
  );
}
