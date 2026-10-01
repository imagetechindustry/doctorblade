import React, { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import {
  CheckCircle2,
  Settings,
  Layout,
  Maximize,
  Truck,
  Target,
  Shield,
  Activity,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { useProduct, useProducts } from "../services/api";
import SEO from "../components/common/SEO";
import HomeCTA from "../components/home/HomeCTA";

const IconMap = {
  Settings: <Settings className="w-5 h-5" />,
  Layout: <Layout className="w-5 h-5" />,
  Maximize: <Maximize className="w-5 h-5" />,
  Truck: <Truck className="w-5 h-5" />,
  Target: <Target className="w-6 h-6 text-blue-600" />,
  Shield: <Shield className="w-6 h-6 text-blue-600" />,
  Activity: <Activity className="w-6 h-6 text-blue-600" />,
};

const ProductDetailSkeleton = () => (
  <div className="bg-[#f8f9fa] min-h-screen py-8 lg:py-12 animate-pulse">
    <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="h-5 w-48 bg-slate-200 rounded"></div>
      <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-slate-100 flex flex-col lg:flex-row gap-12">
        <div className="w-full lg:w-1/2 aspect-square bg-slate-100 rounded-2xl"></div>
        <div className="w-full lg:w-1/2 space-y-4">
          <div className="h-10 w-3/4 bg-slate-200 rounded-xl"></div>
          <div className="h-5 w-full bg-slate-100 rounded"></div>
          <div className="h-5 w-5/6 bg-slate-100 rounded"></div>
          <div className="h-12 w-48 bg-blue-100 rounded-full mt-6"></div>
        </div>
      </div>
    </div>
  </div>
);

const ProductDetail = () => {
  const { slug } = useParams();
  const { data: product, isPending, isLoading, isError } = useProduct(slug);
  const { data: allProducts = [] } = useProducts();

  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Image Zoom State
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [isZooming, setIsZooming] = useState(false);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImage(0); // Reset image index on route change
    setActiveTab("overview");
    setOpenFaqIndex(null);
  }, [slug]);

  const isFetchingProduct = (isPending || isLoading) && !product;

  if (isFetchingProduct) {
    return <ProductDetailSkeleton />;
  }

  if (!product || isError) {
    return <Navigate to="/" replace />;
  }

  const relatedProducts = allProducts.filter((p) => p.slug !== slug).slice(0, 4);

  const formatImageUrl = (imgPath) => {
    if (!imgPath) return "https://www.doctorblade.co.in/heroimage.webp";
    if (imgPath.startsWith("http")) return encodeURI(imgPath);
    return `https://www.doctorblade.co.in${encodeURI(imgPath)}`;
  };

  const productImages = (product.images || []).map(formatImageUrl);

  const rawSku = (product.slug || product.id || "product").toUpperCase();
  const productSku = rawSku.startsWith("WIPEX-") ? rawSku : `WIPEX-${rawSku}`;

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image:
      productImages.length > 1
        ? productImages
        : productImages[0] || "https://www.doctorblade.co.in/heroimage.webp",
    description: product.shortDescription || product.shortDesc,
    sku: productSku,
    mpn: productSku,
    brand: {
      "@type": "Brand",
      name: "ImageTech Industries",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: "350",
      validFrom: "2025-01-01",
      priceValidUntil: "2027-12-31",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      url: `https://www.doctorblade.co.in/products/${product.slug}`,
      seller: {
        "@type": "Organization",
        name: "ImageTech Industries",
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0",
          currency: "INR",
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "IN",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 2,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 2,
            maxValue: 4,
            unitCode: "DAY",
          },
        },
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "IN",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 15,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.ratingValue || "4.9",
      reviewCount: product.reviewCount || "148",
      bestRating: "5",
      worstRating: "1",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: (product.faqs || []).map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <SEO
        title={`${product.metaTitle}`}
        description={product.metaDescription}
        image={productImages[0]}
        keywords={
          product.keywords || [
            "doctor blade",
            "doctor blades",
            product.name,
            "doctor blade manufacturer",
            "ImageTech Industries",
          ]
        }
        schema={[productSchema, faqSchema]}
      />
      <div className="pt-6 pb-12 bg-[#f8f9fa] min-h-screen font-sans text-gray-900">
        <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="flex flex-wrap items-center gap-2 text-[14px] font-semibold text-gray-500 mb-6 lg:mb-8 mt-2">
            <Link to="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <span>›</span>
            <Link to="/" className="hover:text-blue-600 transition-colors">
              Products
            </Link>
            <span>›</span>
            <span className="text-gray-800">
              {product.category?.name || "Doctor Blades"}
            </span>
            <span>›</span>
            <span className="text-gray-800 font-bold">{product.name}</span>
          </div>

          {/* Hero Section */}
          <div className="flex flex-col lg:flex-row gap-12 mb-16 items-start">
            {/* Image Gallery */}
            <div className="w-full lg:w-1/2 flex flex-col-reverse md:flex-row gap-4 md:h-[500px] lg:sticky lg:top-24">
              {/* Thumbnails */}
              {product.images && product.images.length > 1 && (
                <div className="flex flex-row md:flex-col gap-3 md:w-20 shrink-0 overflow-x-auto md:overflow-y-auto hide-scrollbar pb-2 md:pb-0">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`w-20 md:w-full shrink-0 aspect-square rounded-lg border-2 overflow-hidden transition-all cursor-pointer ${
                        activeImage === idx
                          ? "border-blue-600 shadow-sm"
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Main Image with Interactive Zoom */}
              <div
                className="w-full aspect-square rounded-2xl overflow-hidden bg-white border border-gray-200 relative cursor-zoom-in flex items-center justify-center"
                onMouseEnter={() => setIsZooming(true)}
                onMouseLeave={() => setIsZooming(false)}
                onMouseMove={handleMouseMove}
              >
                <img
                  src={
                    (product.images && product.images[activeImage]) ||
                    product.images?.[0] ||
                    "https://www.doctorblade.co.in/heroimage.webp"
                  }
                  alt={`${product.name} - Precision Ink Metering Doctor Blade`}
                  fetchPriority="high"
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-contain transition-transform duration-200 ease-out"
                  style={{
                    transform: isZooming ? "scale(2.2)" : "scale(1)",
                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  }}
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="w-full lg:w-1/2 flex flex-col">
              <h1 className="text-[32px] md:text-[38px] font-black leading-tight text-[#0f172a] mb-4">
                {product.name}
              </h1>
              <p className="text-base sm:text-[17px] font-medium text-gray-700 leading-relaxed mb-6">
                {product.shortDescription || product.shortDesc}
              </p>

              {/* Feature Bullet Points */}
              <ul className="space-y-3 mb-8">
                {(product.keyFeatures || []).slice(0, 6).map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <span className="text-[15px] sm:text-base font-medium text-gray-800">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <button
                  type="button"
                  onClick={() =>
                    window.dispatchEvent(
                      new CustomEvent("open-quote-modal", {
                        detail: { subject: `Quote Inquiry for ${product.name}` },
                      })
                    )
                  }
                  className="bg-[#1e3a8a] text-white px-8 py-3.5 rounded-lg font-bold text-[13px] hover:bg-[#152960] transition-colors flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <Layout className="w-4 h-4" />
                  REQUEST A QUOTE
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href={`https://wa.me/918448336036?text=Hi,%20I%20am%20interested%20in%20your%20${encodeURIComponent(
                    product.name
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border-2 border-green-500 text-green-600 px-8 py-3.5 rounded-lg font-bold text-[13px] hover:bg-green-50 transition-colors flex items-center gap-2 shadow-sm uppercase cursor-pointer"
                >
                  WHATSAPP US
                </a>
              </div>

              {/* Info Boxes */}
              {product.infoBoxes && product.infoBoxes.length > 0 && (
                <div className="flex flex-wrap gap-x-10 gap-y-6 mt-auto border-t border-gray-200 pt-8">
                  {product.infoBoxes.map((box, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="text-orange-500 mt-0.5">
                        {IconMap[box.icon] || <Settings className="w-5 h-5" />}
                      </div>
                      <div>
                        <h5 className="text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-1">
                          {box.title}
                        </h5>
                        <p className="text-[14px] font-bold text-gray-900 leading-snug">
                          {box.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════════
              TABS SECTION: PRODUCT OVERVIEW & SPECIFICATIONS
              ══════════════════════════════════════════════════════════════ */}
          <div className="mb-20">
            {/* Tabs Header */}
            <div className="flex items-center border-b border-gray-200 mb-8 overflow-x-auto hide-scrollbar">
              {["overview", "specifications"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-4 text-[14px] font-black uppercase tracking-wider whitespace-nowrap transition-colors relative cursor-pointer ${
                    activeTab === tab
                      ? "text-[#1e3a8a]"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-[#1e3a8a] rounded-t-full"></div>
                  )}
                </button>
              ))}
            </div>

            {/* Tab Body Card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 lg:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] min-h-[400px]">
              {/* Tab 1: Product Overview */}
              {activeTab === "overview" && (
                <div className="flex flex-col gap-16">
                  <div className="w-full">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">
                      Product Overview
                    </h3>
                    <div className="space-y-4 mb-8">
                      {product.longDesc ? (
                        <div
                          className="prose max-w-none text-gray-700 prose-headings:font-bold prose-headings:text-[#0f172a] prose-h2:text-2xl prose-h2:mb-4 prose-h2:font-bold prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:font-bold prose-p:text-[15px] prose-p:text-gray-700 prose-p:mb-5 prose-p:leading-relaxed prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6 prose-li:text-[15px] prose-li:text-gray-700 prose-li:mb-2"
                          dangerouslySetInnerHTML={{ __html: product.longDesc }}
                        />
                      ) : (
                        <div className="prose max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
                          {product.detailedDescription || product.overview}
                        </div>
                      )}
                    </div>

                    <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-5 flex items-center gap-4 my-8">
                      <Shield className="w-8 h-8 text-blue-600 shrink-0" />
                      <div>
                        <h4 className="font-bold text-gray-900 text-[15px] mb-1">
                          Quality Assured
                        </h4>
                        <p className="text-[13px] text-gray-600 font-medium">
                          Every blade is manufactured and inspected to meet strict
                          quality standards for consistent performance.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Overview Key Features Grid */}
                  {product.overviewFeatures && product.overviewFeatures.length > 0 && (
                    <div className="w-full">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">
                        Key Features
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        {product.overviewFeatures.map((feat, idx) => (
                          <div key={idx} className="flex gap-4">
                            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                              {IconMap[feat.icon] || (
                                <Target className="w-6 h-6 text-blue-600" />
                              )}
                            </div>
                            <div>
                              <h4 className="font-bold text-[15px] text-gray-900 mb-1">
                                {feat.title}
                              </h4>
                              <p className="text-[13px] font-medium text-gray-600 leading-relaxed">
                                {feat.desc}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: Technical Specifications */}
              {activeTab === "specifications" && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Technical Specifications
                  </h3>
                  <div className="overflow-hidden rounded-xl border border-gray-200">
                    <table className="w-full text-left border-collapse">
                      <tbody>
                        {(product.specifications || []).map((spec, idx) => (
                          <tr
                            key={idx}
                            className="border-b border-gray-200 last:border-0 hover:bg-gray-50 transition-colors"
                          >
                            <th className="py-4 px-6 text-[14px] font-bold text-gray-700 bg-gray-50/50 w-1/3 border-r border-gray-100">
                              {spec.label}
                            </th>
                            <td className="py-4 px-6 text-[14px] font-medium text-gray-900">
                              {spec.value}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* FAQ Section */}
          {product.faqs && product.faqs.length > 0 && (
            <div className="mb-20 flex flex-col lg:flex-row gap-6">
              <div className="w-full lg:w-1/3 bg-[#0f172a] rounded-2xl p-10 text-white flex flex-col justify-center shadow-md">
                <h3 className="text-3xl font-black mb-4 leading-tight">
                  Frequently Asked Questions
                </h3>
                <p className="text-gray-300 font-medium text-[15px] mb-8">
                  Find answers to the most common questions about our {product.name}.
                </p>
                <button
                  type="button"
                  onClick={() =>
                    window.dispatchEvent(
                      new CustomEvent("open-quote-modal", {
                        detail: { subject: `Quote Inquiry for ${product.name}` },
                      })
                    )
                  }
                  className="inline-flex items-center gap-2 border border-white/30 hover:border-white text-white px-6 py-3 rounded-lg font-bold text-[13px] transition-colors self-start cursor-pointer"
                >
                  REQUEST A QUOTE
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="w-full lg:w-2/3 bg-white rounded-2xl border border-gray-200 p-2 shadow-sm">
                {product.faqs.map((faq, idx) => (
                  <div key={idx} className="border-b border-gray-100 last:border-0">
                    <button
                      onClick={() =>
                        setOpenFaqIndex(openFaqIndex === idx ? null : idx)
                      }
                      className="w-full flex items-center justify-between p-6 text-left focus:outline-none group cursor-pointer"
                    >
                      <span className="font-bold text-[15px] text-gray-900 group-hover:text-blue-600 transition-colors">
                        {faq.question}
                      </span>
                      <div className="shrink-0 ml-4 text-gray-400 group-hover:text-blue-600 transition-colors">
                        {openFaqIndex === idx ? (
                          <Minus className="w-5 h-5 text-blue-600" />
                        ) : (
                          <Plus className="w-5 h-5" />
                        )}
                      </div>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        openFaqIndex === idx
                          ? "max-h-60 pb-6 px-6 opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <p className="text-[14px] font-medium text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Doctor Blade Products */}
          {relatedProducts && relatedProducts.length > 0 && (
            <div className="mb-20">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-black text-gray-900">
                  Related Doctor Blade Products
                </h3>
                <Link
                  to="/"
                  className="text-sm font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  View All Products
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((p) => (
                  <div
                    key={p.id || p.slug}
                    className="bg-white rounded-xl border border-gray-200 overflow-hidden group hover:shadow-lg transition-shadow flex flex-col"
                  >
                    <div className="h-48 bg-gray-50 border-b border-gray-100 p-4 flex items-center justify-center">
                      <img
                        src={
                          (p.images && p.images[0]) ||
                          "/Doctorblade/steel-blade/224.jpg"
                        }
                        alt={p.name || p.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <h4 className="font-bold text-[15px] text-gray-900 leading-snug mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {p.name || p.title}
                      </h4>
                      <p className="text-xs text-gray-500 line-clamp-2 mb-4 leading-relaxed">
                        {p.shortDescription || p.shortDesc}
                      </p>
                      <div className="mt-auto pt-2">
                        <Link
                          to={`/products/${p.slug}`}
                          className="w-full bg-[#0f172a] hover:bg-blue-700 text-white py-2.5 rounded-lg text-[12px] font-bold transition-colors flex items-center justify-center gap-2"
                        >
                          VIEW DETAILS
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <HomeCTA />
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
