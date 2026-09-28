import React, { useState, useEffect } from "react";
import {
  useAdminBlog,
  useAdminCreateBlog,
  useAdminUpdateBlog,
  adminUploadImage,
} from "../../services/api";

const ALL_SITES = [
  { id: "all", name: "All Websites (Syndicated)" },
  { id: "doctorblade.co.in", name: "doctorblade.co.in" },
  { id: "barcoater.com", name: "barcoater.com" },
  { id: "stroboscopelight.com", name: "stroboscopelight.com" },
  { id: "teflondam.com", name: "teflondam.com" },
  { id: "inkmixingroller.com", name: "inkmixingroller.com" },
];

const CATEGORIES = [
  "Printing Insights",
  "Technical Guides",
  "Troubleshooting & Defects",
  "Press Setup & Optimization",
  "Material Selection",
  "Industry Trends",
  "Maintenance & Safety",
  "Case Studies",
];

const PRODUCTS = [
  { slug: "wipex-carbon-steel-doctor-blade", name: "Wipex Carbon Steel Doctor Blade" },
  { slug: "wipex-stainless-steel-doctor-blade", name: "Wipex Stainless Steel Doctor Blade" },
  { slug: "wipex-polymer-doctor-blade", name: "WIPEX Polymer Doctor Blade" },
  { slug: "custom-size-slit-blades", name: "Custom Size & Slit Doctor Blades" },
];

export default function AdminBlogEditor({ blogId, token, onClose }) {
  const isEditing = Boolean(blogId);

  const { data: blogData, isLoading: loadingBlog } = useAdminBlog(token, blogId);
  const createBlogMutation = useAdminCreateBlog(token);
  const updateBlogMutation = useAdminUpdateBlog(token);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "Technical Guides",
    targetWebsites: ["doctorblade.co.in"],
    featuredImage: "https://www.doctorblade.co.in/Doctorblade/steel-blade/224.jpg",
    imageAlt: "",
    excerpt: "",
    content: "",
    metaTitle: "",
    metaDescription: "",
    keywords: "doctor blade, printing press, rotogravure, flexo",
    relatedProductSlug: "wipex-carbon-steel-doctor-blade",
    isPublished: true,
    faqs: [
      { question: "", answer: "" },
    ],
  });

  const [activeTab, setActiveTab] = useState("editor"); // 'editor' | 'seo' | 'faqs'
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleImageFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const res = await adminUploadImage(token, file);
      if (res?.url) {
        handleChange("featuredImage", res.url);
      }
    } catch (err) {
      alert(err.message || "Failed to upload image to S3");
    } finally {
      setUploadingImage(false);
      e.target.value = "";
    }
  };

  // Pre-fill form when editing
  useEffect(() => {
    if (blogData?.blog) {
      const b = blogData.blog;
      setFormData({
        title: b.title || "",
        slug: b.slug || "",
        category: b.category || "Technical Guides",
        targetWebsites: b.targetWebsites || ["doctorblade.co.in"],
        featuredImage: b.featuredImage || "",
        imageAlt: b.imageAlt || "",
        excerpt: b.excerpt || "",
        content: b.content || "",
        metaTitle: b.metaTitle || "",
        metaDescription: b.metaDescription || "",
        keywords: Array.isArray(b.keywords) ? b.keywords.join(", ") : b.keywords || "",
        relatedProductSlug: b.relatedProductSlug || "wipex-carbon-steel-doctor-blade",
        isPublished: b.isPublished ?? true,
        faqs: b.faqs && b.faqs.length > 0 ? b.faqs : [{ question: "", answer: "" }],
      });
    }
  }, [blogData]);

  const handleChange = (field, value) => {
    setFormData((prev) => {
      const next = { ...prev, [field]: value };
      // Auto slug if creating
      if (!isEditing && field === "title" && !prev.slugManuallyEdited) {
        next.slug = value
          .toLowerCase()
          .replace(/[\s\W-]+/g, "-")
          .replace(/^-+|-+$/g, "");
      }
      return next;
    });
  };

  const handleWebsiteToggle = (siteId) => {
    setFormData((prev) => {
      const exists = prev.targetWebsites.includes(siteId);
      let updated;
      if (exists) {
        updated = prev.targetWebsites.filter((s) => s !== siteId);
      } else {
        updated = [...prev.targetWebsites, siteId];
      }
      if (updated.length === 0) updated = ["doctorblade.co.in"];
      return { ...prev, targetWebsites: updated };
    });
  };

  const handleFaqChange = (index, key, val) => {
    setFormData((prev) => {
      const updatedFaqs = [...prev.faqs];
      updatedFaqs[index][key] = val;
      return { ...prev, faqs: updatedFaqs };
    });
  };

  const handleAddFaq = () => {
    setFormData((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { question: "", answer: "" }],
    }));
  };

  const handleRemoveFaq = (index) => {
    setFormData((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.content) {
      alert("Please enter title and article content");
      return;
    }

    const payload = {
      ...formData,
      keywords: formData.keywords
        ? formData.keywords.split(",").map((k) => k.trim()).filter(Boolean)
        : [],
      faqs: formData.faqs.filter((f) => f.question.trim() && f.answer.trim()),
    };

    try {
      if (isEditing) {
        await updateBlogMutation.mutateAsync({ id: blogId, payload });
      } else {
        await createBlogMutation.mutateAsync(payload);
      }
      onClose();
    } catch (err) {
      alert(err.message || "Failed to save blog post");
    }
  };

  const isSaving = createBlogMutation.isPending || updateBlogMutation.isPending;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-5xl my-auto overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="px-6 sm:px-8 py-5 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/50">
          <div>
            <h3 className="text-xl font-black text-slate-900 leading-tight">
              {isEditing ? "Edit Article" : "Write New Article"}
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Publish engaging articles and guides across company websites
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 px-6 sm:px-8 pt-3 border-b border-slate-100 bg-white shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab("editor")}
            className={`pb-3 text-xs font-bold transition-all border-b-2 cursor-pointer ${activeTab === "editor"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
          >
            Article Content
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("seo")}
            className={`pb-3 text-xs font-bold transition-all border-b-2 cursor-pointer ${activeTab === "seo"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
          >
            Google SERP & SEO
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("faqs")}
            className={`pb-3 text-xs font-bold transition-all border-b-2 cursor-pointer ${activeTab === "faqs"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
          >
            FAQs (Schema)
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* TAB 1: ARTICLE CONTENT */}
          {activeTab === "editor" && (
            <div className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Article Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="e.g. How to Prevent Cylinder Scoring in Rotogravure Printing"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:border-blue-500 transition-all"
                />
              </div>

              {/* Slug & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    URL Slug <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => {
                      setFormData((p) => ({ ...p, slugManuallyEdited: true }));
                      handleChange("slug", e.target.value);
                    }}
                    placeholder="how-to-prevent-cylinder-scoring"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono text-slate-800 focus:outline-none focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleChange("category", e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Target Websites Multi-select */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Target Websites (Multi-Tenant Syndication)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                  {ALL_SITES.map((site) => {
                    const checked = formData.targetWebsites.includes(site.id);
                    return (
                      <label
                        key={site.id}
                        className={`flex items-center gap-2 p-2 rounded-xl text-xs font-bold cursor-pointer transition-colors ${checked
                          ? "bg-blue-600 text-white shadow-xs"
                          : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                          }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => handleWebsiteToggle(site.id)}
                          className="hidden"
                        />
                        <span className="truncate">{site.name}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Featured Image & Alt */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Featured Image <span className="text-red-500">*</span>
                    </label>
                  </div>

                  {formData.featuredImage ? (
                    <div className="relative group rounded-2xl overflow-hidden border border-slate-200 bg-slate-950/5 max-h-56 flex items-center justify-center shadow-xs">
                      <img
                        src={formData.featuredImage}
                        alt="Featured Preview"
                        className="w-full h-48 object-cover rounded-2xl"
                      />
                      {/* Delete / Cut button to remove image and upload another */}
                      <button
                        type="button"
                        onClick={() => handleChange("featuredImage", "")}
                        title="Remove image and upload another"
                        className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-lg transition-all transform hover:scale-110 flex items-center justify-center cursor-pointer group-hover:opacity-100"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <label
                      className={`w-full flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${uploadingImage
                        ? "border-blue-300 bg-blue-50/50 cursor-wait"
                        : "border-slate-200 hover:border-blue-500 hover:bg-blue-50/30 bg-slate-50/50"
                        }`}
                    >
                      <div className="flex flex-col items-center justify-center text-center">
                        <div className="w-10 h-10 mb-2 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                          {uploadingImage ? (
                            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                            </svg>
                          ) : (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                          )}
                        </div>
                        <span className="text-xs font-bold text-slate-700">
                          {uploadingImage ? "Uploading to S3..." : "Click to Upload Image"}
                        </span>
                        <span className="text-[11px] text-slate-400 mt-0.5">
                          PNG, JPG, WEBP up to 10MB
                        </span>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        disabled={uploadingImage}
                        onChange={handleImageFileChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Image Alt Tag
                  </label>
                  <input
                    type="text"
                    value={formData.imageAlt}
                    onChange={(e) => handleChange("imageAlt", e.target.value)}
                    placeholder="WIPEX Doctor Blade Setup"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Excerpt (Meta Summary / Card Description)
                </label>
                <textarea
                  rows={2}
                  value={formData.excerpt}
                  onChange={(e) => handleChange("excerpt", e.target.value)}
                  placeholder="Short, compelling 150-word teaser for article cards and Google search snippets..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-500 transition-all"
                />
              </div>

              {/* Markdown Content */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Article Body (Markdown Format) <span className="text-red-500">*</span>
                  </label>
                  <span className="text-[11px] text-slate-400 font-medium">
                    Use ## for H2 (TOC Auto-generates) and ### for H3
                  </span>
                </div>
                <textarea
                  rows={14}
                  required
                  value={formData.content}
                  onChange={(e) => handleChange("content", e.target.value)}
                  placeholder="## Introduction&#10;&#10;Write technical explanations, troubleshooting steps, and operational guidelines..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-mono text-xs leading-relaxed text-slate-800 focus:outline-none focus:border-blue-500 transition-all"
                />
              </div>

              {/* Related Product Hook */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  In-Article Product CTA Recommendation
                </label>
                <select
                  value={formData.relatedProductSlug}
                  onChange={(e) => handleChange("relatedProductSlug", e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  {PRODUCTS.map((p) => (
                    <option key={p.slug} value={p.slug}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* TAB 2: GOOGLE SERP & SEO */}
          {activeTab === "seo" && (
            <div className="space-y-6">
              {/* Live SERP Mockup Card */}
              <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl">
                <span className="text-[10px] uppercase tracking-widest font-black text-blue-400 mb-3 block">
                  Live Google Search Mockup (Mobile SERP)
                </span>
                <div className="bg-white rounded-xl p-4 text-slate-900 shadow-md">
                  <div className="flex items-center gap-2 mb-1">
                    <img
                      src="https://www.doctorblade.co.in/logo-512x512.png"
                      alt="logo"
                      className="w-4 h-4 rounded-full"
                    />
                    <div className="text-[11px] text-slate-600 truncate leading-none">
                      doctorblade.co.in &gt; blog &gt; {formData.slug || "guide-slug"}
                    </div>
                  </div>
                  <h4 className="text-base text-blue-800 font-medium hover:underline cursor-pointer line-clamp-1">
                    {formData.metaTitle || formData.title || "Article Title | ImageTech Industries"}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-2 mt-1 leading-snug">
                    {formData.metaDescription || formData.excerpt || "Article meta description snippet..."}
                  </p>
                </div>
              </div>

              {/* Meta Title */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    SEO Meta Title
                  </label>
                  <span className="text-[11px] text-slate-400 font-semibold">
                    {(formData.metaTitle || formData.title).length} / 60 chars
                  </span>
                </div>
                <input
                  type="text"
                  value={formData.metaTitle}
                  onChange={(e) => handleChange("metaTitle", e.target.value)}
                  placeholder="e.g. How to Prevent Cylinder Scoring in Rotogravure | ImageTech"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 transition-all"
                />
              </div>

              {/* Meta Description */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    SEO Meta Description
                  </label>
                  <span className="text-[11px] text-slate-400 font-semibold">
                    {(formData.metaDescription || formData.excerpt).length} / 160 chars
                  </span>
                </div>
                <textarea
                  rows={3}
                  value={formData.metaDescription}
                  onChange={(e) => handleChange("metaDescription", e.target.value)}
                  placeholder="Master proven techniques to eliminate cylinder scoring in rotogravure printing..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500 transition-all"
                />
              </div>

              {/* Target Keywords */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Target Search Keywords (Comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.keywords}
                  onChange={(e) => handleChange("keywords", e.target.value)}
                  placeholder="cylinder scoring, rotogravure doctor blade, anilox wear, polymer blade"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500 transition-all"
                />
              </div>
            </div>
          )}

          {/* TAB 3: TECHNICAL FAQS (GOOGLE RICH SCHEMA) */}
          {activeTab === "faqs" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Frequently Asked Questions (Google FAQ Schema)
                  </h4>
                  <p className="text-xs text-slate-500">
                    These questions generate interactive FAQ rich snippet accordions in Google search results.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddFaq}
                  className="bg-blue-50 text-blue-600 hover:bg-blue-100 text-xs font-bold px-3.5 py-1.5 rounded-xl transition-colors cursor-pointer"
                >
                  + Add Question
                </button>
              </div>

              <div className="space-y-4">
                {formData.faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-3 relative group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                        Question #{index + 1}
                      </span>
                      {formData.faqs.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveFaq(index)}
                          className="text-slate-400 hover:text-red-500 text-xs font-bold transition-colors cursor-pointer"
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    <input
                      type="text"
                      value={faq.question}
                      onChange={(e) => handleFaqChange(index, "question", e.target.value)}
                      placeholder="e.g. Can a scored gravure cylinder be repaired on-press?"
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-blue-500"
                    />

                    <textarea
                      rows={2}
                      value={faq.answer}
                      onChange={(e) => handleFaqChange(index, "answer", e.target.value)}
                      placeholder="Enter detailed technical answer..."
                      className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs text-slate-700 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Modal Footer Controls */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isPublished}
                onChange={(e) => handleChange("isPublished", e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
              />
              <span className="text-xs font-bold text-slate-800">
                Publish Live
              </span>
            </label>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-full text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-7 py-2.5 rounded-full shadow-md transition-all cursor-pointer disabled:opacity-50"
              >
                {isSaving ? "Saving..." : isEditing ? "Update Guide" : "Publish Guide"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
