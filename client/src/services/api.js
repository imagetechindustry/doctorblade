import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
const IMAGETECH_API_URL = import.meta.env.VITE_IMAGETECH_API_URL || 'https://api.imagetechindustries.com/api';

const SITE_DOMAIN = import.meta.env.VITE_SITE_DOMAIN || "doctorblade.co.in";

/**
 * Returns website domain for multi-tenant backend queries.
 * - On live custom domain (e.g. doctorblade.co.in, barcoater.com): automatically extracts from window.location.hostname.
 * - In local dev (localhost) or staging previews (*.vercel.app): falls back to VITE_SITE_DOMAIN.
 */
export const getCurrentSite = () => {
  if (typeof window === "undefined") return SITE_DOMAIN;
  const host = window.location.hostname.replace(/^www\./, "");
  if (
    !host ||
    host === "localhost" ||
    host === "127.0.0.1" ||
    host.includes("vercel.app") ||
    host.includes("netlify.app")
  ) {
    return SITE_DOMAIN;
  }
  return host;
};

/* ═══════════════════════════════════════════════════════════════════════════
   1. CORE HTTP FETCH FUNCTIONS
   ═══════════════════════════════════════════════════════════════════════════ */

/**
 * Fetch a single location by slug
 * @param {string} slug
 * @returns {Promise<Object>}
 */
export const fetchLocation = async (slug) => {
  const res = await fetch(`${BASE_URL}/locations/${slug}`);
  if (!res.ok) {
    const error = new Error(`Location ${slug} not found`);
    error.status = res.status;
    throw error;
  }
  return res.json();
};

/**
 * Fetch all active locations
 * @returns {Promise<Array>}
 */
export const fetchLocations = async () => {
  const res = await fetch(`${BASE_URL}/locations`);
  if (!res.ok) {
    throw new Error("Failed to fetch locations");
  }
  return res.json();
};

/**
 * Admin: Fetch all locations (including inactive)
 * @param {string} token
 * @returns {Promise<Array>}
 */
export const adminFetchLocations = async (token) => {
  const res = await fetch(`${BASE_URL}/locations/all`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) {
    throw new Error("Failed to fetch all locations");
  }
  return res.json();
};

/**
 * Admin: Create a new location / city
 * @param {string} token
 * @param {{ name: string, state: string, slug?: string, isActive?: boolean }} payload
 * @returns {Promise<{ message: string, location: Object }>}
 */
export const adminCreateLocation = async (token, payload) => {
  const res = await fetch(`${BASE_URL}/locations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to create location");
  }
  return data;
};

/**
 * Admin: Update a location / city
 * @param {string} token
 * @param {string} id
 * @param {{ name?: string, state?: string, slug?: string, isActive?: boolean }} payload
 * @returns {Promise<{ message: string, location: Object }>}
 */
export const adminUpdateLocation = async (token, id, payload) => {
  const res = await fetch(`${BASE_URL}/locations/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to update location");
  }
  return data;
};

/**
 * Admin: Delete a location / city
 * @param {string} token
 * @param {string} id
 * @returns {Promise<{ message: string }>}
 */
export const adminDeleteLocation = async (token, id) => {
  const res = await fetch(`${BASE_URL}/locations/${id}`, {
    method: "DELETE",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to delete location");
  }
  return data;
};

/**
 * Submit a "Get a Quote" form request
 * @param {Object} payload - Form data
 * @returns {Promise<{ success: boolean, message: string }>}
 */
export const submitQuote = async (payload) => {
  const currentHost = getCurrentSite();
  const finalPayload = { sourceWebsite: currentHost, ...payload };

  const res = await fetch(`${BASE_URL}/forms/quote`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(finalPayload),
  });

  const data = await res.json();

  if (!res.ok) {
    const message =
      data.errors?.[0]?.msg ||
      data.message ||
      "Something went wrong. Please try again.";
    throw new Error(message);
  }

  return data;
};

/**
 * Submit a "Contact Us" form request
 * @param {Object} payload - Form data
 * @returns {Promise<{ success: boolean, message: string }>}
 */
export const submitContact = async (payload) => {
  const currentHost = getCurrentSite();
  const finalPayload = { sourceWebsite: currentHost, ...payload };

  const res = await fetch(`${BASE_URL}/forms/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(finalPayload),
  });

  const data = await res.json();

  if (!res.ok) {
    const message =
      data.errors?.[0]?.msg ||
      data.message ||
      "Something went wrong. Please try again.";
    throw new Error(message);
  }

  return data;
};

/**
 * Admin: Login
 * @param {string} username
 * @param {string} password
 * @returns {Promise<{ token: string, username: string }>}
 */
export const adminLogin = async (username, password) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Login failed.");
  return data;
};

/**
 * Client-side JWT expiration check
 * @param {string} token
 * @returns {boolean}
 */
export const isTokenExpired = (token) => {
  if (!token || typeof token !== "string") return true;
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return true;
    const payload = JSON.parse(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")));
    if (!payload.exp) return false;
    return Date.now() >= payload.exp * 1000;
  } catch {
    return false;
  }
};

/**
 * Admin: Verify token with server
 * Treats network errors, Cloudflare rate limits (429), or 5xx server issues as transient errors,
 * ONLY returning valid: false when the server explicitly returns 401 Unauthorized or 403 Forbidden.
 * @param {string} token
 * @returns {Promise<{ valid: boolean, reason?: string, transient?: boolean }>}
 */
export const verifyToken = async (token) => {
  if (!token) return { valid: false, reason: "missing" };
  if (isTokenExpired(token)) return { valid: false, reason: "expired" };

  try {
    const res = await fetch(`${BASE_URL}/auth/verify`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // 401 or 403 means backend explicitly rejected the token as invalid or expired
    if (res.status === 401 || res.status === 403) {
      return { valid: false, reason: "unauthorized" };
    }

    // 200 OK means valid
    if (res.ok) {
      return { valid: true };
    }

    // Any other status (429 rate limit, 500/502/503/504 server downtime)
    // is a transient server error, NOT an invalid token.
    console.warn(`Auth verify returned transient status ${res.status}. Preserving session.`);
    return { valid: true, transient: true };
  } catch (err) {
    // Network failure, aborted request on rapid refresh, offline
    console.warn("Auth verify network failure. Preserving session.", err);
    return { valid: true, transient: true };
  }
};

/**
 * Admin: Fetch submissions
 * @param {string} token
 * @param {{ type?: string, isRead?: boolean, sourceWebsite?: string, page?: number, limit?: number }} params
 */
export const fetchSubmissions = async (token, params = {}) => {
  const query = new URLSearchParams();
  if (params.type) query.set("type", params.type);
  if (params.isRead !== undefined) query.set("isRead", params.isRead);
  if (params.sourceWebsite) query.set("sourceWebsite", params.sourceWebsite);
  if (params.page) query.set("page", params.page);
  if (params.limit) query.set("limit", params.limit);

  const res = await fetch(`${BASE_URL}/admin/submissions?${query}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Failed to fetch submissions.");
  return res.json();
};

/**
 * Admin: Fetch dashboard stats
 * @param {string} token
 */
export const fetchStats = async (token) => {
  const res = await fetch(`${BASE_URL}/admin/stats`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch stats.");
  return res.json();
};

/**
 * Admin: Mark submission as read/unread
 * @param {string} token
 * @param {string} id
 * @param {boolean} isRead
 */
export const markSubmissionRead = async (token, id, isRead) => {
  const res = await fetch(`${BASE_URL}/admin/submissions/${id}/read`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ isRead }),
  });
  if (!res.ok) throw new Error("Failed to update submission.");
  return res.json();
};

/**
 * Admin: Delete a submission
 * @param {string} token
 * @param {string} id
 */
export const deleteSubmission = async (token, id) => {
  const res = await fetch(`${BASE_URL}/admin/submissions/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to delete submission.");
  return res.json();
};

/**
 * Fetch published blogs for the current website
 * @param {Object} params - { category, search, page, limit }
 */
export const fetchBlogs = async (params = {}) => {
  const currentHost = getCurrentSite();
  const query = new URLSearchParams({ site: currentHost, ...params }).toString();
  const res = await fetch(`${BASE_URL}/blogs?${query}`);
  if (!res.ok) throw new Error("Failed to fetch blogs");
  return res.json();
};

/**
 * Fetch a single blog post by slug
 * @param {string} slug
 */
export const fetchBlogBySlug = async (slug) => {
  const currentHost = getCurrentSite();
  const res = await fetch(`${BASE_URL}/blogs/${slug}?site=${currentHost}`);
  if (!res.ok) {
    const err = new Error(`Blog post not found`);
    err.status = res.status;
    throw err;
  }
  return res.json();
};

/**
 * Fetch active blog categories for current website
 */
export const fetchBlogCategories = async () => {
  const currentHost = getCurrentSite();
  const res = await fetch(`${BASE_URL}/blogs/categories?site=${currentHost}`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
};

/**
 * Admin: Fetch all blogs across sites
 */
export const adminFetchBlogs = async (token, params = {}) => {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${BASE_URL}/blogs/admin/all?${query}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) throw new Error("Failed to fetch admin blogs");
  return res.json();
};

/**
 * Admin: Fetch single blog by ID
 */
export const adminFetchBlogById = async (token, id) => {
  const res = await fetch(`${BASE_URL}/blogs/admin/${id}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) throw new Error("Failed to fetch blog post");
  return res.json();
};

/**
 * Admin: Create a new blog post
 */
export const adminCreateBlog = async (token, payload) => {
  const res = await fetch(`${BASE_URL}/blogs/admin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to create blog post");
  return data;
};

/**
 * Admin: Update a blog post
 */
export const adminUpdateBlog = async (token, id, payload) => {
  const res = await fetch(`${BASE_URL}/blogs/admin/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to update blog post");
  return data;
};

/**
 * Admin: Delete a blog post
 */
export const adminDeleteBlog = async (token, id) => {
  const res = await fetch(`${BASE_URL}/blogs/admin/${id}`, {
    method: "DELETE",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to delete blog post");
  return data;
};

/**
 * Admin: Toggle publish status
 */
export const adminTogglePublishBlog = async (token, id) => {
  const res = await fetch(`${BASE_URL}/blogs/admin/${id}/publish`, {
    method: "PATCH",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to toggle publish status");
  return data;
};

/**
 * Admin: Upload image to S3
 * @param {string} token
 * @param {File} file
 * @returns {Promise<{ success: boolean, url: string }>}
 */
export const adminUploadImage = async (token, file) => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`${BASE_URL}/upload`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to upload image to S3");
  return data;
};

/* ── Product API Functions (ImageTech Backend) ── */

/**
 * Helper to strip HTML tags from a string
 */
const stripHtml = (html) => {
  if (!html) return "";
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
};

/**
 * Helper to extract overview paragraphs from product HTML longDesc
 */
const extractOverview = (longDesc, shortDesc) => {
  if (!longDesc) return shortDesc || "";
  const matches = [...longDesc.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
    .map((m) => stripHtml(m[1]))
    .filter(Boolean);
  if (matches.length > 0) {
    return matches.slice(0, 2).join("\n\n");
  }
  return shortDesc || "";
};

/**
 * Helper to extract applications from product HTML longDesc
 */
const extractApplications = (longDesc, fallback) => {
  if (!longDesc) return fallback || "";
  const appMatch = longDesc.match(/<h3>Applications<\/h3>\s*<ul[^>]*>([\s\S]*?)<\/ul>/i);
  if (appMatch) {
    const items = [...appMatch[1].matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)]
      .map((m) => stripHtml(m[1]))
      .filter(Boolean);
    if (items.length > 0) return items.join(", ") + ".";
  }
  return fallback || "Gravure Printing, Flexographic Printing, Flexible Packaging, Coating Machines, Industrial Printing.";
};

/**
 * Helper to resolve icon for info boxes
 */
const resolveBoxIcon = (title, icon) => {
  if (icon && typeof icon === "string" && icon.trim()) return icon;
  const t = (title || "").toLowerCase();
  if (t.includes("material") || t.includes("steel") || t.includes("diameter")) return "Settings";
  if (t.includes("thickness") || t.includes("width") || t.includes("length") || t.includes("size")) return "Maximize";
  if (t.includes("application") || t.includes("type") || t.includes("customization")) return "Layout";
  if (t.includes("supply") || t.includes("delivery")) return "Truck";
  return "Settings";
};

/**
 * Maps ImageTech backend product schema to the client UI schema
 * @param {Object} p - API Product object
 * @returns {Object|null} Mapped product
 */
export const mapApiProductToClient = (p) => {
  if (!p) return null;

  const rawSlug = p?.slug || "";
  const clientSlug = rawSlug;
  const title = p?.title || p?.name || "Doctor Blade";
  const shortDesc = p?.shortDesc || p?.shortDescription || "";
  const longDesc = p?.longDesc || shortDesc;

  return {
    _id: p?._id || clientSlug,
    id: clientSlug,
    slug: clientSlug,
    apiSlug: rawSlug,
    name: title,
    title,
    shortDescription: shortDesc,
    shortDesc,
    externalLink:
      p?.externalLink ||
      `https://www.imagetechindustries.com/products/${clientSlug}`,
    images:
      p?.images && p.images.length > 0
        ? p.images
        : ["/Doctorblade/steel-blade/224.jpg"],
    overview: p?.overviewText || extractOverview(p?.longDesc, shortDesc) || shortDesc,
    detailedDescription: longDesc,
    longDesc: p?.longDesc || null,
    category: p?.category || { name: "Doctor Blades", slug: "doctor-blades" },
    infoBoxes:
      p?.infoBoxes && p.infoBoxes.length > 0
        ? p.infoBoxes.map((box) => ({
            ...box,
            icon: resolveBoxIcon(box.title, box.icon),
          }))
        : [
            { title: "Material", value: "High Grade Steel / Polymer", icon: "Settings" },
            { title: "Application", value: "Printing & Coating", icon: "Layout" },
            { title: "Customization", value: "Available", icon: "Maximize" },
            { title: "Supply", value: "All India Delivery", icon: "Truck" },
          ],
    overviewFeatures:
      p?.overviewFeatures && p.overviewFeatures.length > 0
        ? p.overviewFeatures.map((f) => ({
            ...f,
            icon: f.icon || "Target",
          }))
        : [],
    keyFeatures:
      p?.features && p.features.length > 0
        ? p.features
        : p?.overviewFeatures && p.overviewFeatures.length > 0
        ? p.overviewFeatures.map((f) => (f.desc ? `${f.title}: ${f.desc}` : f.title))
        : [],
    features:
      p?.features && p.features.length > 0
        ? p.features
        : [],
    applications: extractApplications(p?.longDesc),
    specifications:
      p?.specifications && p.specifications.length > 0
        ? p.specifications
        : [],
    faqs:
      p?.faqs && p.faqs.length > 0
        ? p.faqs
        : [],
    metaTitle: p?.seoTitle || `${title} | ImageTech Industries`,
    metaDescription: p?.seoDescription || shortDesc,
    keywords:
      typeof p?.seoKeywords === "string"
        ? p.seoKeywords.split(",").map((k) => k.trim()).filter(Boolean)
        : Array.isArray(p?.seoKeywords)
        ? p.seoKeywords
        : ["doctor blade", title, "ImageTech Industries"],
    ratingValue: p?.ratingValue || "4.9",
    reviewCount: p?.reviewCount || "148",
  };
};

/**
 * Fetch all doctor blade products directly from ImageTech API
 * @param {string} category
 * @returns {Promise<Array>}
 */
export const fetchProducts = async (category = "doctor-blades") => {
  try {
    const res = await fetch(`${IMAGETECH_API_URL}/products`);
    if (!res.ok) {
      throw new Error(`Failed to fetch products from ImageTech API: ${res.status}`);
    }
    const allProducts = await res.json();
    if (!Array.isArray(allProducts)) {
      throw new Error("Invalid API response format for products");
    }

    // Filter products for Doctor Blades category
    const dbApiProducts = allProducts.filter((p) => {
      const catSlug = p.category?.slug || (typeof p.category === "string" ? p.category : "");
      const catName = p.category?.name || "";
      return (
        catSlug === category ||
        catSlug.includes("doctor-blade") ||
        catName.toLowerCase().includes("doctor blade") ||
        (p.slug && p.slug.includes("doctor-blade"))
      );
    });

    return dbApiProducts.map((p) => mapApiProductToClient(p));
  } catch (error) {
    console.error("ImageTech API fetch failed:", error);
    throw error;
  }
};

/**
 * Fetch a single product by slug directly from ImageTech API
 * @param {string} slug
 * @returns {Promise<Object>}
 */
export const fetchProductBySlug = async (slug) => {
  if (!slug) throw new Error("Product slug is required");

  // Determine candidate slugs
  const candidateSlugs = [
    slug,
    slug.replace(/^wipex-/, ""),
    `wipex-${slug}`,
  ];

  for (const candidate of candidateSlugs) {
    try {
      const res = await fetch(`${IMAGETECH_API_URL}/products/${candidate}`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.slug) {
          return mapApiProductToClient(data);
        }
      }
    } catch {
      // Continue to next candidate
    }
  }

  const err = new Error(`Product not found: ${slug}`);
  err.status = 404;
  throw err;
};

/* ═══════════════════════════════════════════════════════════════════════════
   2. TANSTACK QUERY KEYS
   ═══════════════════════════════════════════════════════════════════════════ */

export const QUERY_KEYS = {
  locations: ["locations"],
  location: (slug) => ["location", slug],
  products: (category) => ["products", category || "doctor-blades"],
  product: (slug) => ["product", slug],
  adminStats: ["admin", "stats"],
  adminSubmissions: (params) => ["admin", "submissions", params],
  adminLocations: ["admin", "locations"],
  blogs: (params) => ["blogs", getCurrentSite(), params],
  blog: (slug) => ["blog", getCurrentSite(), slug],
  blogCategories: ["blogCategories", getCurrentSite()],
  adminBlogs: (params) => ["admin", "blogs", params],
  adminBlog: (id) => ["admin", "blog", id],
};

/* ═══════════════════════════════════════════════════════════════════════════
   3. TANSTACK CUSTOM HOOKS (SINGLE PLACE FOR ALL API CALLS)
   ═══════════════════════════════════════════════════════════════════════════ */

/** Hook: Fetch and cache all active locations, and automatically seed individual city caches */
export const useLocations = (options = {}) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: QUERY_KEYS.locations,
    queryFn: async () => {
      const data = await fetchLocations();
      if (Array.isArray(data)) {
        // Automatically seed query cache for all individual cities for 0ms instant loads
        data.forEach((loc) => {
          if (loc && loc.slug) {
            queryClient.setQueryData(QUERY_KEYS.location(loc.slug), loc);
          }
        });
      }
      return data;
    },
    staleTime: 1000 * 60 * 30, // 30 minutes fresh
    ...options,
  });
};

/** Hook: Fetch and cache a single location with instant initialData derivation from locations cache */
export const useLocation = (slug, options = {}) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: QUERY_KEYS.location(slug),
    queryFn: () => fetchLocation(slug),
    initialData: () => {
      if (!slug) return undefined;
      // 1. Direct hit from single location cache
      const cachedDirect = queryClient.getQueryData(QUERY_KEYS.location(slug));
      if (cachedDirect) return cachedDirect;

      // 2. Derive from all-locations array for 0ms transition
      const allLocations = queryClient.getQueryData(QUERY_KEYS.locations);
      if (Array.isArray(allLocations)) {
        return allLocations.find((loc) => loc.slug === slug);
      }
      return undefined;
    },
    initialDataUpdatedAt: () => {
      return (
        queryClient.getQueryState(QUERY_KEYS.location(slug))?.dataUpdatedAt ||
        queryClient.getQueryState(QUERY_KEYS.locations)?.dataUpdatedAt
      );
    },
    staleTime: 1000 * 60 * 30, // 30 minutes fresh
    ...options,
  });
};

/** Hook: Prefetch a single location on hover */
export const usePrefetchLocation = () => {
  const queryClient = useQueryClient();
  return (slug) => {
    if (!slug) return;
    queryClient.prefetchQuery({
      queryKey: QUERY_KEYS.location(slug),
      queryFn: () => fetchLocation(slug),
    });
  };
};

/** Hook: Prefetch all locations on hover */
export const usePrefetchLocations = () => {
  const queryClient = useQueryClient();
  return () => {
    queryClient.prefetchQuery({
      queryKey: QUERY_KEYS.locations,
      queryFn: fetchLocations,
    });
  };
};

/** Hook: Submit Get a Quote form */
export const useSubmitQuote = (options = {}) => {
  return useMutation({
    mutationFn: submitQuote,
    ...options,
  });
};

/** Hook: Submit Contact Us form */
export const useSubmitContact = (options = {}) => {
  return useMutation({
    mutationFn: submitContact,
    ...options,
  });
};

/** Hook: Admin dashboard statistics */
export const useAdminStats = (token, options = {}) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.adminStats, token],
    queryFn: () => fetchStats(token),
    enabled: !!token,
    staleTime: 1000 * 60 * 5, // 5 minutes fresh
    refetchOnWindowFocus: true, // Auto refetch when admin switches tabs back
    refetchOnMount: true, // Always fetch latest when opening/refreshing page
    ...options,
  });
};

/** Hook: Admin submissions list */
export const useAdminSubmissions = (token, params = {}, options = {}) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.adminSubmissions(params), token],
    queryFn: () => fetchSubmissions(token, params),
    enabled: !!token,
    staleTime: 1000 * 60 * 2, // 2 minutes fresh
    refetchOnWindowFocus: true, // Auto refetch when admin switches tabs back
    refetchOnMount: true, // Always fetch latest when opening/refreshing page
    placeholderData: keepPreviousData,
    ...options,
  });
};

/** Hook: Admin mark submission read */
export const useMarkSubmissionRead = (token, options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, isRead }) => markSubmissionRead(token, id, isRead),
    onMutate: async ({ id, isRead }) => {
      // Optimistically update
      await queryClient.cancelQueries({ queryKey: ["admin", "submissions"] });
      const previousStats = queryClient.getQueryData(QUERY_KEYS.adminStats);
      queryClient.setQueriesData({ queryKey: ["admin", "submissions"] }, (old) => {
        if (!old) return old;
        return {
          ...old,
          submissions: old.submissions.map((s) => s._id === id ? { ...s, isRead } : s),
        };
      });
      return { previousStats };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "submissions"] });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.adminStats });
    },
    ...options,
  });
};

/** Hook: Admin delete submission */
export const useDeleteSubmission = (token, options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteSubmission(token, id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["admin", "submissions"] });
      queryClient.setQueriesData({ queryKey: ["admin", "submissions"] }, (old) => {
        if (!old) return old;
        return {
          ...old,
          submissions: old.submissions.filter((s) => s._id !== id),
          total: old.total - 1
        };
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "submissions"] });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.adminStats });
    },
    ...options,
  });
};

/** Hook: Admin fetch all locations */
export const useAdminLocations = (token, options = {}) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.adminLocations, token],
    queryFn: () => adminFetchLocations(token),
    enabled: !!token,
    staleTime: 1000 * 60 * 15, // 15 minutes fresh cache
    placeholderData: keepPreviousData,
    ...options,
  });
};

/** Hook: Admin create location */
export const useAdminCreateLocation = (token, options = {}) => {
  const queryClient = useQueryClient();
  const queryKey = [...QUERY_KEYS.adminLocations, token];

  return useMutation({
    mutationFn: (payload) => adminCreateLocation(token, payload),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.locations });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.adminLocations });
      if (res?.location) {
        // Optimistically insert into admin locations list
        const prev = queryClient.getQueryData(queryKey);
        if (Array.isArray(prev)) {
          queryClient.setQueryData(queryKey, [res.location, ...prev]);
        }
        if (res.location.slug) {
          queryClient.setQueryData(QUERY_KEYS.location(res.location.slug), res.location);
        }
      }
    },
    ...options,
  });
};

/** Hook: Admin update location with 0ms optimistic updates */
export const useAdminUpdateLocation = (token, options = {}) => {
  const queryClient = useQueryClient();
  const queryKey = [...QUERY_KEYS.adminLocations, token];

  return useMutation({
    mutationFn: ({ id, payload }) => adminUpdateLocation(token, id, payload),
    onMutate: async ({ id, payload }) => {
      await queryClient.cancelQueries({ queryKey });
      const previousLocations = queryClient.getQueryData(queryKey);

      if (previousLocations && Array.isArray(previousLocations)) {
        queryClient.setQueryData(
          queryKey,
          previousLocations.map((loc) =>
            loc._id === id ? { ...loc, ...payload } : loc
          )
        );
      }
      return { previousLocations };
    },
    onError: (err, variables, context) => {
      if (context?.previousLocations) {
        queryClient.setQueryData(queryKey, context.previousLocations);
      }
    },
    onSettled: (res) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.locations });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.adminLocations });
      if (res?.location?.slug) {
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.location(res.location.slug) });
      }
    },
    ...options,
  });
};

/** Hook: Admin delete location with 0ms optimistic removal */
export const useAdminDeleteLocation = (token, options = {}) => {
  const queryClient = useQueryClient();
  const queryKey = [...QUERY_KEYS.adminLocations, token];

  return useMutation({
    mutationFn: (id) => adminDeleteLocation(token, id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey });
      const previousLocations = queryClient.getQueryData(queryKey);

      if (previousLocations && Array.isArray(previousLocations)) {
        queryClient.setQueryData(
          queryKey,
          previousLocations.filter((loc) => loc._id !== id)
        );
      }
      return { previousLocations };
    },
    onError: (err, id, context) => {
      if (context?.previousLocations) {
        queryClient.setQueryData(queryKey, context.previousLocations);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.locations });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.adminLocations });
    },
    ...options,
  });
};

/* ── Blog Hooks ── */

/** Hook: Fetch published blogs with pagination, search, category */
export const useBlogs = (params = {}, options = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.blogs(params),
    queryFn: () => fetchBlogs(params),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5, // 5 mins
    ...options,
  });
};

/** Hook: Fetch single blog by slug */
export const useBlog = (slug, options = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.blog(slug),
    queryFn: () => fetchBlogBySlug(slug),
    enabled: Boolean(slug),
    staleTime: 1000 * 60 * 10, // 10 mins
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 5000),
    ...options,
  });
};

/** Hook: Fetch active blog categories */
export const useBlogCategories = (options = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.blogCategories,
    queryFn: () => fetchBlogCategories(),
    staleTime: 1000 * 60 * 30, // 30 mins
    ...options,
  });
};

/** Hook: Admin fetch all blogs */
export const useAdminBlogs = (token, params = {}, options = {}) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.adminBlogs(params), token],
    queryFn: () => adminFetchBlogs(token, params),
    enabled: Boolean(token),
    placeholderData: keepPreviousData,
    ...options,
  });
};

/** Hook: Admin fetch single blog by ID */
export const useAdminBlog = (token, id, options = {}) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.adminBlog(id), token],
    queryFn: () => adminFetchBlogById(token, id),
    enabled: Boolean(token && id),
    ...options,
  });
};

/** Hook: Admin create blog */
export const useAdminCreateBlog = (token, options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => adminCreateBlog(token, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "blogs"] });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.blogCategories });
    },
    ...options,
  });
};

/** Hook: Admin update blog */
export const useAdminUpdateBlog = (token, options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) => adminUpdateBlog(token, id, payload),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "blogs"] });
      if (variables?.id) {
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.adminBlog(variables.id) });
      }
      if (data?.blog?.slug) {
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.blog(data.blog.slug) });
      }
    },
    ...options,
  });
};

/** Hook: Admin delete blog */
export const useAdminDeleteBlog = (token, options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => adminDeleteBlog(token, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "blogs"] });
    },
    ...options,
  });
};

/** Hook: Admin toggle publish */
export const useAdminTogglePublishBlog = (token, options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => adminTogglePublishBlog(token, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "blogs"] });
    },
    ...options,
  });
};

/* ── Product Hooks (ImageTech Backend) ── */

/** Hook: Fetch and cache doctor blade products directly from API */
export const useProducts = (category = "doctor-blades", options = {}) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: QUERY_KEYS.products(category),
    queryFn: async () => {
      const data = await fetchProducts(category);
      if (Array.isArray(data)) {
        // Automatically seed query cache for individual products for fast transitions
        data.forEach((prod) => {
          if (prod && prod.slug) {
            queryClient.setQueryData(QUERY_KEYS.product(prod.slug), prod);
          }
        });
      }
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes fresh once fetched from API
    ...options,
  });
};

/** Hook: Fetch and cache a single product */
export const useProduct = (slug, options = {}) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: QUERY_KEYS.product(slug),
    queryFn: () => fetchProductBySlug(slug),
    placeholderData: () => {
      if (!slug) return undefined;
      // 1. Direct hit from single product cache
      const cachedDirect = queryClient.getQueryData(QUERY_KEYS.product(slug));
      if (cachedDirect) return cachedDirect;

      // 2. Derive from all-products query cache
      const allProducts = queryClient.getQueryData(QUERY_KEYS.products("doctor-blades"));
      if (Array.isArray(allProducts)) {
        const found = allProducts.find((p) => p.slug === slug || p.id === slug || p.apiSlug === slug);
        if (found) return found;
      }

      return undefined;
    },
    enabled: Boolean(slug),
    staleTime: 1000 * 60 * 5, // 5 minutes fresh once fetched from API
    ...options,
  });
};

/** Hook: Prefetch a single product on hover */
export const usePrefetchProduct = () => {
  const queryClient = useQueryClient();
  return (slug) => {
    if (!slug) return;
    queryClient.prefetchQuery({
      queryKey: QUERY_KEYS.product(slug),
      queryFn: () => fetchProductBySlug(slug),
    });
  };
};


