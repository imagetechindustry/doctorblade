import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Target,
  Shield,
  Settings,
  Layout,
  Maximize,
  Truck,
  CheckCircle2,
} from "lucide-react";
import { useLocation as useLocationQuery, useProduct } from "../services/api";
import SEO from "../components/common/SEO";
import NotFound from "../components/common/NotFound";
import FAQSection from "../components/common/FAQSection";
import HomeCTA from "../components/home/HomeCTA";

const IconMap = {
  Settings: <Settings className="w-5 h-5" />,
  Layout: <Layout className="w-5 h-5" />,
  Maximize: <Maximize className="w-5 h-5" />,
  Truck: <Truck className="w-5 h-5" />,
  Target: <Target className="w-6 h-6 text-blue-600" />,
  Shield: <Shield className="w-6 h-6 text-blue-600" />,
};

const CityProductPageSkeleton = () => (
  <div className="bg-slate-50 min-h-screen py-6 lg:py-10 animate-pulse">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumbs Skeleton */}
      <div className="flex items-center gap-2 mb-8">
        <div className="h-4 w-16 bg-slate-200 rounded"></div>
        <div className="h-4 w-4 bg-slate-200 rounded"></div>
        <div className="h-4 w-24 bg-slate-200 rounded"></div>
        <div className="h-4 w-4 bg-slate-200 rounded"></div>
        <div className="h-4 w-36 bg-slate-200 rounded"></div>
      </div>

      {/* Main Product Card Skeleton */}
      <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-slate-100 flex flex-col lg:flex-row gap-12 mb-12">
        {/* Left: Image Skeleton */}
        <div className="w-full lg:w-1/2 space-y-4">
          <div className="aspect-square bg-slate-100 rounded-2xl border border-slate-100"></div>
          <div className="grid grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="aspect-square bg-slate-100 rounded-xl"></div>
            ))}
          </div>
        </div>

        {/* Right: Info Skeleton */}
        <div className="w-full lg:w-1/2 space-y-5">
          <div className="h-6 w-48 bg-blue-100 rounded-full"></div>
          <div className="h-10 w-4/5 bg-slate-200 rounded-xl"></div>
          <div className="h-5 w-3/5 bg-slate-200 rounded-lg"></div>
          <div className="space-y-2 pt-2">
            <div className="h-4 w-full bg-slate-100 rounded"></div>
            <div className="h-4 w-full bg-slate-100 rounded"></div>
            <div className="h-4 w-3/4 bg-slate-100 rounded"></div>
          </div>
          <div className="space-y-3 pt-2">
            {[1, 2, 3].map((n) => (
              <div key={n} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100"></div>
                <div className="h-4 w-2/3 bg-slate-100 rounded"></div>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <div className="h-14 w-full sm:w-56 bg-blue-600/30 rounded-full"></div>
            <div className="h-14 w-full sm:w-56 bg-emerald-600/30 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Bottom Specs Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((n) => (
          <div key={n} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <div className="h-6 w-40 bg-slate-200 rounded-lg"></div>
            <div className="h-4 w-full bg-slate-100 rounded"></div>
            <div className="h-4 w-5/6 bg-slate-100 rounded"></div>
            <div className="h-4 w-2/3 bg-slate-100 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const isInvalidSlug = (slug) =>
  !slug || slug.includes(".") || slug === "robots" || slug === "sitemap";

const CityProductPage = () => {
  const { locationSlug, productSlug } = useParams();
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImage(0);
    setActiveTab("overview");
  }, [locationSlug, productSlug]);

  const invalid = isInvalidSlug(locationSlug) || isInvalidSlug(productSlug);

  const {
    data: baseProduct,
    isLoading: isProductLoading,
    isError: isProductError,
  } = useProduct(productSlug, { enabled: !invalid });

  const {
    data: location,
    isLoading: isLocationLoading,
    isError: isLocationError,
    error: locationError,
    refetch: refetchLocation,
  } = useLocationQuery(locationSlug, { enabled: !invalid });

  if (invalid || (!isProductLoading && !baseProduct) || (isLocationError && locationError?.status === 404)) {
    return (
      <NotFound
        title="Product or Location Not Found"
        message={`We could not find the requested combination of "${locationSlug}" and "${productSlug}". Please verify the location and product or browse our sitemap.`}
      />
    );
  }

  if (isLocationLoading || (isProductLoading && !baseProduct)) {
    return <CityProductPageSkeleton />;
  }

  if (isLocationError || isProductError) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center px-4 py-16 text-center">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Unable to load product details</h2>
        <p className="text-gray-600 mb-6 max-w-md">There was a temporary problem communicating with our server. Please try again.</p>
        <button
          onClick={() => { refetchLocation(); }}
          className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!location || !location.isActive) {
    return (
      <NotFound
        title="Product or Location Not Found"
        message={`We could not find the requested combination of "${locationSlug}" and "${productSlug}". Please verify the location and product or browse our sitemap.`}
      />
    );
  }

  const product = baseProduct;

  const images =
    product.images && product.images.length > 0
      ? product.images
      : [product.image];

  // Dynamic city-specific FAQs combined with base product FAQs
  const combinedFaqs = [
    {
      question: `How does ImageTech Industries deliver ${product.name} to ${location.name}?`,
      answer: `ImageTech Industries dispatches ${product.name} orders via trusted express courier and freight services directly to your facility in ${location.name}, ${location.state}. Typical delivery times range from 2 to 4 business days.`
    },
    {
      question: `Can ImageTech Industries provide custom dimensions for ${product.name} in ${location.name}?`,
      answer: `Yes. As the original manufacturer, ImageTech Industries customizes dimensions to match your exact machine specifications.`
    },
    {
      question: `How can I get a quote or place an order in ${location.name}?`,
      answer: `You can click "Get a Quote for ${location.name}" on this page, contact our sales team on WhatsApp, or call ImageTech Industries directly. We provide competitive manufacturer pricing and guidance for customers in ${location.name}.`
    },
    ...(product.faqs || [])
  ];

  const formatImageUrl = (imgPath) => {
    if (!imgPath) return "https://www.doctorblade.co.in/heroimage.webp";
    if (imgPath.startsWith("http")) return encodeURI(imgPath);
    return `https://www.doctorblade.co.in${encodeURI(imgPath)}`;
  };
  const productImages = (images || []).map(formatImageUrl);
  const baseSku = (product.slug || product.id || "product").toUpperCase().replace(/^WIPEX-?/, "");
  const locCode = location.slug?.replace(/[^a-zA-Z0-9]/g, "").toUpperCase() || "IN";
  const cityProductSku = `WIPEX-${baseSku}-${locCode}`;

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: `${product.name} in ${location.name}`,
    image: productImages.length > 1 ? productImages : productImages[0] || "https://www.doctorblade.co.in/heroimage.webp",
    description: `${product.shortDescription} Manufactured and supplied by ImageTech Industries in ${location.name}, ${location.state}.`,
    sku: cityProductSku,
    mpn: cityProductSku,
    brand: {
      "@type": "Brand",
      name: "ImageTech Industries",
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: `${location.name}, ${location.state}`,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: "350",
      validFrom: "2025-01-01",
      priceValidUntil: "2027-12-31",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      url: `https://www.doctorblade.co.in/${location.slug}/${product.slug}`,
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
      reviewCount: product.reviewCount || "120",
      bestRating: "5",
      worstRating: "1",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: combinedFaqs.map((faq) => ({
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
        title={`${product.name} in ${location.name} | Doctor Blade Price & Supplier ${location.state}`}
        description={`Buy ${product.name} in ${location.name}, ${location.state} from ImageTech Industries \u2014 India's trusted doctor blade manufacturer. This doctor blade type is engineered for rotogravure and flexo printing machines. Get competitive doctor blade price with same-day dispatch across ${location.name}. Choose the right doctor blade material and doctor blade thickness for your press.`}
        image={productImages[0]}
        keywords={[
          "doctor blade",
          `${product.name}`,
          `${product.name} in ${location.name}`,
          `doctor blade price ${location.name}`,
          `doctor blade supplier ${location.name}`,
          `doctor blade types`,
          `doctor blade material`,
          `doctor blade for printing machine`,
          `doctor blade price`,
          `doctor blade ${location.state}`,
          "ImageTech Industries",
        ]}
        schema={[productSchema, faqSchema]}
      />

      <div className="bg-slate-50 min-h-screen py-4 lg:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="text-sm font-semibold mb-8 flex text-gray-500">
            <Link to="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link
              to={`/${location.slug}`}
              className="hover:text-blue-600 transition-colors"
            >
              {location.name}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>

          {/* Hero Section */}
          <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-100 flex flex-col lg:flex-row gap-12 items-start mb-16">
            {/* Image Gallery */}
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
              {/* Main Image */}
              <div className="bg-gray-50 p-8 rounded-2xl w-full aspect-square flex items-center justify-center border border-gray-100 relative">
                <img
                  src={images[activeImage]}
                  alt={`${product.name} in ${location.name} - Image ${activeImage + 1}`}
                  className="w-full h-full object-contain mix-blend-multiply drop-shadow-xl transition-transform duration-500"
                />
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="grid grid-cols-5 gap-3">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`border-2 rounded-lg overflow-hidden aspect-square bg-gray-50 p-2 flex items-center justify-center transition-all ${
                        activeImage === idx
                          ? "border-blue-600 shadow-md scale-105"
                          : "border-gray-200 hover:border-blue-300 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-contain mix-blend-multiply"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="w-full lg:w-1/2">
              {/* Manufacturer Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100 mb-4">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                Manufactured by ImageTech Industries | Supplying {location.name}, {location.state}
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-3">
                {product.name} <br />
                <span className="text-blue-600 text-2xl md:text-3xl lg:text-4xl">
                  in {location.name}
                </span>
              </h1>

              {/* Company Note */}
              <div className="flex items-center gap-2 text-sm font-semibold text-blue-700 mb-6">
                <svg className="w-4 h-4 shrink-0 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>Supplied directly by ImageTech Industries to customers across {location.name}, {location.state}</span>
              </div>

              {/* Overview Text */}
              <div className="text-lg text-gray-700 leading-relaxed mb-6 whitespace-pre-line">
                {product.overview}
              </div>

              {/* Quick Feature Highlights */}
              <ul className="space-y-2 mb-6">
                {product.keyFeatures?.slice(0, 4).map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-700">
                    <svg
                      className="w-5 h-5 text-green-500 mr-3 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="font-medium">{feature}</span>
                  </li>
                ))}
                <li className="flex items-center text-gray-700">
                  <svg
                    className="w-5 h-5 text-green-500 mr-3 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="font-medium">Reliable and fast delivery across {location.name}</span>
                </li>
              </ul>

              {/* Company Credibility Callout */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-sm text-gray-700">
                    <span className="font-bold text-gray-900 block">Supplied by ImageTech Industries:</span>
                    Manufacturer of {product.name} with over 30 years of manufacturing experience. We provide custom dimension options with direct delivery to customers in {location.name}, {location.state}.
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() =>
                    window.dispatchEvent(new CustomEvent("open-quote-modal"))
                  }
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-base transition-colors shadow-lg flex items-center justify-center cursor-pointer"
                >
                  Get a Quote for {location.name}
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
                <a
                  href={product.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-bold text-base transition-colors shadow-lg flex items-center justify-center uppercase"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.476 0 1.46 1.065 2.872 1.213 3.07.149.198 2.096 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  BUY NOW / WHATSAPP US
                </a>
              </div>
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
                <div className="flex flex-col gap-12">
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

                    {/* Localized Supply & Distribution Block */}
                    <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-6 sm:p-8 mb-8">
                      <h4 className="text-xl font-bold text-gray-900 mb-2">
                        Direct Supply & Delivery in {location.name} by ImageTech Industries
                      </h4>
                      <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-6">
                        ImageTech Industries is a trusted manufacturer supplying {product.name} to printing and packaging businesses in {location.name} and across {location.state}. With decades of industry expertise, our blades are built with high-grade carbon steel, stainless steel, and polymers for consistent ink metering and long-term cylinder protection.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-white rounded-xl border border-blue-100/80 shadow-xs">
                          <div className="font-bold text-gray-900 mb-1 flex items-center gap-2 text-sm">
                            <span className="text-blue-600">🚚</span> Fast Dispatch
                          </div>
                          <p className="text-xs text-gray-600 leading-relaxed">
                            Safe and prompt delivery directly to your facility in {location.name}.
                          </p>
                        </div>
                        <div className="p-4 bg-white rounded-xl border border-blue-100/80 shadow-xs">
                          <div className="font-bold text-gray-900 mb-1 flex items-center gap-2 text-sm">
                            <span className="text-blue-600">📐</span> Custom Sizing Available
                          </div>
                          <p className="text-xs text-gray-600 leading-relaxed">
                            Manufactured to your required dimensions to suit your machine.
                          </p>
                        </div>
                        <div className="p-4 bg-white rounded-xl border border-blue-100/80 shadow-xs">
                          <div className="font-bold text-gray-900 mb-1 flex items-center gap-2 text-sm">
                            <span className="text-blue-600">⭐</span> 30+ Years of Quality
                          </div>
                          <p className="text-xs text-gray-600 leading-relaxed">
                            ISO 9001:2015 certified manufacturer with direct technical support.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 flex items-start gap-4">
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
                        <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                          <th className="py-4 px-6 text-[14px] font-bold text-gray-700 bg-gray-50/50 w-1/3 border-r border-gray-100">
                            Delivery Region
                          </th>
                          <td className="py-4 px-6 text-[14px] font-medium text-blue-700">
                            {location.name}, {location.state}
                          </td>
                        </tr>
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

          {/* Product FAQ */}
          <div className="mb-16">
            <FAQSection
              title={`${product.name} FAQs in ${location.name}`}
              subtitle="Common Questions"
              description={`Find answers to frequently asked questions regarding ${product.name} orders, sizing, and delivery in ${location.name}, ${location.state}.`}
              faqs={combinedFaqs}
            />
          </div>

          <HomeCTA locationData={location} />
        </div>
      </div>
    </>
  );
};

export default CityProductPage;
