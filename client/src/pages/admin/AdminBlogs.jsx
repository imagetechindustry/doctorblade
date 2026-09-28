import React, { useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { useAdminAuth } from "../../context/AdminAuthContext";
import {
  useAdminBlogs,
  useAdminDeleteBlog,
  useAdminTogglePublishBlog,
} from "../../services/api";
import AdminBlogEditor from "./AdminBlogEditor";

export default function AdminBlogs() {
  const { admin } = useAdminAuth();
  const token = admin?.token;

  const [selectedSite, setSelectedSite] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Editor modal state
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState(null);

  const { data, isLoading, refetch } = useAdminBlogs(token, {
    site: selectedSite,
    status: selectedStatus === "all" ? undefined : selectedStatus,
    search: searchQuery,
    page: currentPage,
    limit: 15,
  });

  const deleteBlogMutation = useAdminDeleteBlog(token);
  const togglePublishMutation = useAdminTogglePublishBlog(token);

  const blogs = data?.blogs || [];
  const pagination = data?.pagination || { total: 0, totalPages: 1 };

  const totalPublished = blogs.filter((b) => b.isPublished).length;
  const totalViews = blogs.reduce((acc, b) => acc + (b.views || 0), 0);

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to permanently delete "${title}"?`)) {
      try {
        await deleteBlogMutation.mutateAsync(id);
      } catch (err) {
        alert(err.message || "Failed to delete blog post");
      }
    }
  };

  const handleTogglePublish = async (id) => {
    try {
      await togglePublishMutation.mutateAsync(id);
    } catch (err) {
      alert(err.message || "Failed to toggle publish status");
    }
  };

  const handleCreateNew = () => {
    setEditingBlogId(null);
    setIsEditorOpen(true);
  };

  const handleEdit = (id) => {
    setEditingBlogId(id);
    setIsEditorOpen(true);
  };

  return (
    <AdminLayout
      title="Blog CMS Studio"
      subtitle="Create, optimize, and manage technical guides across all brand websites"
    >
      {/* Top Action Bar & Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Total Articles</p>
          <p className="text-3xl font-black text-slate-900 mt-2">{pagination.total}</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
          <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Published Live</p>
          <p className="text-3xl font-black text-emerald-600 mt-2">{totalPublished}</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">Total Views</p>
          <p className="text-3xl font-black text-blue-600 mt-2">{totalViews.toLocaleString()}</p>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 shadow-md flex items-center justify-between text-white">
          <div>
            <h4 className="text-sm font-black mb-1">New Technical Guide</h4>
            <p className="text-[11px] text-blue-100">Write an article with auto-SEO</p>
          </div>
          <button
            type="button"
            onClick={handleCreateNew}
            className="bg-white text-blue-600 hover:bg-blue-50 text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition-all cursor-pointer whitespace-nowrap"
          >
            + Create Post
          </button>
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-72">
          <svg
            className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title or slug..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 transition-all"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <select
            value={selectedSite}
            onChange={(e) => setSelectedSite(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            <option value="all">All Brand Websites</option>
            <option value="doctorblade.co.in">doctorblade.co.in</option>
            <option value="barcoater.com">barcoater.com</option>
            <option value="stroboscopelight.com">stroboscopelight.com</option>
            <option value="teflondam.com">teflondam.com</option>
            <option value="inkmixingroller.com">inkmixingroller.com</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
          </select>
        </div>
      </div>

      {/* Blogs Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-slate-400 text-sm">Loading articles...</div>
        ) : blogs.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <p className="text-base font-bold mb-2">No articles found</p>
            <p className="text-xs text-slate-400 mb-4">Click below to publish your first SEO guide.</p>
            <button
              type="button"
              onClick={handleCreateNew}
              className="bg-blue-600 text-white text-xs font-bold px-5 py-2.5 rounded-full hover:bg-blue-700 cursor-pointer"
            >
              + Create Post
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Title & Slug</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Target Sites</th>
                  <th className="px-6 py-4">Views</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {blogs.map((b) => (
                  <tr key={b._id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-6 py-4 max-w-xs sm:max-w-md">
                      <p className="font-bold text-slate-900 text-sm line-clamp-1">{b.title}</p>
                      <p className="text-[11px] text-slate-400 font-mono mt-0.5 line-clamp-1">
                        /blog/{b.slug}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md text-[11px] font-semibold whitespace-nowrap">
                        {b.category}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1 max-w-[180px]">
                        {b.targetWebsites?.map((site, sIdx) => (
                          <span
                            key={sIdx}
                            className="bg-blue-50 text-blue-700 text-[10px] font-bold px-1.5 py-0.5 rounded"
                          >
                            {site === "all" ? "All Sites" : site.split(".")[0]}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="px-6 py-4 font-bold text-slate-800">
                      {b.views?.toLocaleString() || 0}
                    </td>

                    <td className="px-6 py-4">
                      <button
                        type="button"
                        onClick={() => handleTogglePublish(b._id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                          b.isPublished
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            b.isPublished ? "bg-emerald-500" : "bg-amber-500"
                          }`}
                        />
                        {b.isPublished ? "Live" : "Draft"}
                      </button>
                    </td>

                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-2">
                        <a
                          href={`/blog/${b.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors"
                          title="View on site"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>

                        <button
                          type="button"
                          onClick={() => handleEdit(b._id)}
                          className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-colors cursor-pointer text-xs"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(b._id, b.title)}
                          className="p-1.5 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                          title="Delete article"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Editor Modal */}
      {isEditorOpen && (
        <AdminBlogEditor
          blogId={editingBlogId}
          token={token}
          onClose={() => {
            setIsEditorOpen(false);
            setEditingBlogId(null);
            refetch();
          }}
        />
      )}
    </AdminLayout>
  );
}
