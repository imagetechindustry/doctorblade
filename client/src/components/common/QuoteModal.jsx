import React, { useState, useEffect } from "react";
import { useSubmitQuote } from "../../services/api";

/* ─────────────────────────────────────────────────────────────────────────────
   INLINE SVG ICONS (Self-contained, zero external dependency / no lucide-react)
   ───────────────────────────────────────────────────────────────────────────── */
const XIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const UserIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const BuildingIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const MailIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const PhoneIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const PackageIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

const FileTextIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const ShieldCheckIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const SendIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);

const CheckCircle2Icon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const UsersIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const TruckIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
  </svg>
);

export default function QuoteModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    website: "", // Honeypot field
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const submitQuoteMutation = useSubmitQuote();

  // Handle open event and lead gen triggers
  useEffect(() => {
    const handleOpen = (e) => {
      setIsOpen(true);
      setIsSuccess(false);
      setErrorMessage("");
      if (e?.detail?.product) {
        setFormData((prev) => ({ ...prev, subject: e.detail.product }));
      }
    };

    window.addEventListener("open-quote-modal", handleOpen);

    // Automatic Popup Logic for Lead Generation (if not submitted)
    let timer1, timer2, timer3;
    let hasTriggeredScroll = false;

    const handleScroll = () => {
      if (!hasTriggeredScroll && window.scrollY > 300) {
        if (localStorage.getItem("quoteSubmitted") !== "true") {
          setIsOpen(true);
          hasTriggeredScroll = true;
          window.removeEventListener("scroll", handleScroll);
        }
      }
    };

    if (localStorage.getItem("quoteSubmitted") !== "true") {
      window.addEventListener("scroll", handleScroll);

      // Trigger 1: Show at 5 seconds
      timer1 = setTimeout(() => {
        if (localStorage.getItem("quoteSubmitted") !== "true") {
          setIsOpen(true);
        }
      }, 5 * 1000);

      // Trigger 2: Show at 2 minutes (120 seconds)
      timer2 = setTimeout(() => {
        if (localStorage.getItem("quoteSubmitted") !== "true") {
          setIsOpen(true);
        }
      }, 120 * 1000);

      // Trigger 3: Show at 5 minutes (300 seconds)
      timer3 = setTimeout(() => {
        if (localStorage.getItem("quoteSubmitted") !== "true") {
          setIsOpen(true);
        }
      }, 300 * 1000);
    }

    return () => {
      window.removeEventListener("open-quote-modal", handleOpen);
      window.removeEventListener("scroll", handleScroll);
      if (timer1) clearTimeout(timer1);
      if (timer2) clearTimeout(timer2);
      if (timer3) clearTimeout(timer3);
    };
  }, []);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsSuccess(false);
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    // Anti-spam honeypot detection: silently ignore if filled
    if (formData.website) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        setTimeout(handleClose, 1500);
      }, 600);
      return;
    }

    setIsSubmitting(true);

    const payload = {
      fullName: formData.name.trim(),
      companyName: formData.company.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      productInterest: formData.subject.trim(),
      industry: "Printing & Packaging",
      message: formData.message.trim(),
      sourceWebsite:
        typeof window !== "undefined"
          ? window.location.hostname.replace(/^www\./, "")
          : "doctorblade.co.in",
    };

    try {
      await submitQuoteMutation.mutateAsync(payload);
      localStorage.setItem("quoteSubmitted", "true");
      setIsSuccess(true);
      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        website: "",
      });

      // Auto-close modal after 2.5 seconds
      setTimeout(() => {
        handleClose();
      }, 2500);
    } catch (error) {
      console.error("Error submitting quote request:", error);
      setErrorMessage(
        error.message || "Failed to submit quote request. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 font-sans">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-fadeIn"
        onClick={handleClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-[1050px] bg-white rounded-[24px] shadow-[0_20px_60px_rgba(0,0,0,0.4)] overflow-hidden animate-scaleUp flex flex-col md:flex-row max-h-[95vh] md:max-h-[85vh] overflow-y-auto md:overflow-hidden">
        
        {/* Global Close Button */}
        <button
          onClick={handleClose}
          type="button"
          aria-label="Close quote modal"
          className="absolute top-4 right-4 md:top-6 md:right-6 text-slate-600 md:text-slate-400 hover:text-slate-800 bg-white/80 md:bg-slate-50 hover:bg-white md:hover:bg-slate-100 p-2.5 rounded-full transition-colors z-[110] shadow-sm md:shadow-none backdrop-blur-sm md:backdrop-blur-none cursor-pointer"
        >
          <XIcon className="w-5 h-5" />
        </button>

        {/* ── Left Side: Image Branding Panel (~55% width) ── */}
        <div className="flex w-full md:w-[55%] relative flex-col justify-between overflow-hidden bg-white shrink-0 min-h-[380px] md:min-h-0 pt-2 md:pt-0">
          
          {/* Background Image Container (Positioned right so products are prominently visible above stats bar) */}
          <div className="absolute top-0 right-0 w-full h-full md:h-[calc(100%-72px)] z-0">
            <div 
              className="w-full h-full bg-right-bottom md:bg-right bg-no-repeat bg-[length:150%_auto] md:bg-[length:auto_100%]"
              style={{ backgroundImage: "url(/form.jpeg)" }}
            />
            {/* Soft White Fade (Desktop only) strictly on the left text area, preserving full product clarity on right */}
            <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-white/95 via-white/50 to-transparent w-[50%]" />
            {/* Mobile soft white fade */}
            <div className="md:hidden absolute inset-0 bg-white/80" />
          </div>

          {/* Top Content Area - Left-aligned text constrained to ~48% to give spacious room for product images */}
          <div className="relative z-20 px-6 md:px-8 pt-4 md:pt-8 flex-1 flex flex-col">
            
            {/* Logo & Subtitle */}
            <div className="flex items-center gap-3 mb-5 md:mb-6">
              <img src="/logo.png" alt="Doctor Blade Logo" className="h-9 md:h-10 w-auto object-contain" />
              <div className="text-[9px] text-slate-500 font-bold leading-tight border-l-2 border-slate-300 pl-3 uppercase tracking-wider">
                Precision Solutions<br />For Printing Industry
              </div>
            </div>

            {/* Left-Aligned Headline with exact 4-line breakdown leaving right side for products */}
            <h2 className="text-[22px] sm:text-[26px] md:text-3xl lg:text-[34px] font-black mb-2 md:mb-3 tracking-tight leading-[1.1] text-slate-800 drop-shadow-sm w-full md:max-w-[48%] z-20 relative text-left">
              Quality Tools<br />
              for a <span className="text-orange-500">Sharper<br /></span>
              <span className="text-orange-500">Print Tomorrow</span>
            </h2>

            {/* Line separator */}
            <div className="w-12 h-1 bg-orange-500 mb-3 md:mb-4 rounded-full z-20 relative" />

            {/* Description */}
            <p className="text-[11px] lg:text-xs text-slate-600 leading-relaxed font-bold max-w-[85%] md:max-w-[45%] mb-6 md:mb-8 z-20 relative text-left">
              From consumables to testing instruments, we support your printing &amp; packaging process with reliable solutions.
            </p>

            {/* Horizontal Feature Badges */}
            <div className="flex gap-4 sm:gap-6 justify-start pb-6 md:pb-0 relative z-20">
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center mb-1.5 bg-white shadow-sm text-orange-500">
                  <CheckCircle2Icon className="w-5 h-5" />
                </div>
                <span className="text-[9px] font-bold text-slate-700 leading-tight">
                  Premium<br />Quality
                </span>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center mb-1.5 bg-white shadow-sm text-orange-500">
                  <UsersIcon className="w-5 h-5" />
                </div>
                <span className="text-[9px] font-bold text-slate-700 leading-tight">
                  Technical<br />Support
                </span>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center mb-1.5 bg-white shadow-sm text-orange-500">
                  <TruckIcon className="w-5 h-5" />
                </div>
                <span className="text-[9px] font-bold text-slate-700 leading-tight">
                  Pan-India<br />Delivery
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Dark Stats Bar (#1e293b with orange top border) */}
          <div className="relative z-20 bg-[#1e293b] w-full h-[72px] px-2 flex items-center justify-between border-t-[3px] border-orange-500 mt-auto">
            <div className="flex-1 flex flex-col items-center gap-1 text-center px-1">
              <FileTextIcon className="w-4 h-4 text-orange-400" />
              <div className="text-[8px] leading-tight font-bold text-white uppercase tracking-widest">
                Wide Product<br />Range
              </div>
            </div>
            <div className="flex-1 flex flex-col items-center gap-1 text-center px-1 border-l border-slate-700/70">
              <BuildingIcon className="w-4 h-4 text-orange-400" />
              <div className="text-[8px] leading-tight font-bold text-white uppercase tracking-widest">
                Industry<br />Expertise
              </div>
            </div>
            <div className="flex-1 flex flex-col items-center gap-1 text-center px-1 border-l border-slate-700/70">
              <ShieldCheckIcon className="w-4 h-4 text-orange-400" />
              <div className="text-[8px] leading-tight font-bold text-white uppercase tracking-widest">
                Trusted<br />by Printers
              </div>
            </div>
            <div className="flex-1 flex flex-col items-center gap-1 text-center px-1 border-l border-slate-700/70">
              <UsersIcon className="w-4 h-4 text-orange-400" />
              <div className="text-[8px] leading-tight font-bold text-white uppercase tracking-widest">
                Customer<br />Satisfaction
              </div>
            </div>
          </div>
        </div>

        {/* ── Right Side: Form Panel (~45% width) ── */}
        <div className="w-full md:w-[45%] bg-white p-6 md:p-8 relative flex flex-col shrink-0 md:shrink overflow-y-auto">
          
          <div className="mb-6 pr-8">
            <div className="flex items-center gap-2 text-orange-600 font-black text-[10px] tracking-widest uppercase mb-2">
              <div className="w-6 h-0.5 bg-orange-600 rounded-full" />
              Request a Quote
            </div>
            <h2 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Get Your <span className="text-orange-500">Custom</span> Quote
            </h2>
            <p className="text-slate-500 font-medium text-sm mt-2">
              Fill out the details below and our team will contact you shortly.
            </p>
          </div>

          {/* Friendly Success Alert */}
          {isSuccess && (
            <div className="mb-5 p-4 rounded-xl bg-green-50 border border-green-200 flex items-start gap-3 animate-fadeIn">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0 text-green-600 mt-0.5">
                <CheckCircle2Icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-green-900">
                  Thanks for your inquiry!
                </h4>
                <p className="text-xs text-green-700 font-medium mt-0.5 leading-relaxed">
                  We've received your request and our team will get back to you with a competitive quote soon.
                </p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-bold flex items-center gap-2 animate-fadeIn">
              <span>⚠️</span>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-4.5 flex-1 flex flex-col">
            
            {/* Honeypot field (anti-spam) */}
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              style={{ display: "none" }}
              tabIndex={-1}
              autoComplete="off"
            />

            {/* Row 1: Full Name & Company Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-700 uppercase tracking-wider">
                  <UserIcon className="w-3.5 h-3.5 text-slate-400" /> Full Name <span className="text-orange-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <UserIcon className="w-4 h-4" />
                  </div>
                  <input
                    required
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-sm font-semibold text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all placeholder-slate-400"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-700 uppercase tracking-wider">
                  <BuildingIcon className="w-3.5 h-3.5 text-slate-400" /> Company Name <span className="text-orange-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <BuildingIcon className="w-4 h-4" />
                  </div>
                  <input
                    required
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-sm font-semibold text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all placeholder-slate-400"
                    placeholder="Enter company name"
                  />
                </div>
              </div>
            </div>

            {/* Row 2: Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-700 uppercase tracking-wider">
                  <MailIcon className="w-3.5 h-3.5 text-slate-400" /> Email Address <span className="text-orange-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <MailIcon className="w-4 h-4" />
                  </div>
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-sm font-semibold text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all placeholder-slate-400"
                    placeholder="you@company.com"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-700 uppercase tracking-wider">
                  <PhoneIcon className="w-3.5 h-3.5 text-slate-400" /> Phone Number <span className="text-orange-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <PhoneIcon className="w-4 h-4" />
                  </div>
                  <input
                    required
                    type="tel"
                    name="phone"
                    pattern="[0-9\+\-\s\(\)]{7,20}"
                    title="Please enter a valid phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-sm font-semibold text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all placeholder-slate-400"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>
            </div>

            {/* Row 3: Product / Requirement (PLAIN TEXT INPUT with datalist suggestions) */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-700 uppercase tracking-wider">
                <PackageIcon className="w-3.5 h-3.5 text-slate-400" /> Product / Requirement <span className="text-orange-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <PackageIcon className="w-4 h-4" />
                </div>
                <input
                  required
                  type="text"
                  name="subject"
                  list="product-suggestions"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm font-semibold text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all placeholder-slate-400"
                  placeholder="e.g. Doctor Blades 0.15 x 30mm, Dyne Pen 38, Stroboscope"
                />
                <datalist id="product-suggestions">
                  <option value="WIPEX Doctor Blades" />
                  <option value="Long Life Doctor Blades" />
                  <option value="Ceramic Coated Doctor Blades" />
                  <option value="Plastic / Polymer Doctor Blades" />
                  <option value="Dyne Test Pens & Inks" />
                  <option value="Viscosity Cups (Zahn / Ford)" />
                  <option value="Industrial Stroboscopes" />
                  <option value="Wire Bar Coaters" />
                </datalist>
              </div>
            </div>

            {/* Row 4: Additional Details */}
            <div className="space-y-1.5 flex-1">
              <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-700 uppercase tracking-wider">
                <FileTextIcon className="w-3.5 h-3.5 text-slate-400" /> Additional Details
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all resize-none placeholder-slate-400 min-h-[75px]"
                placeholder="Please share any specific requirements, quantity, application, etc."
              />
            </div>

            {/* Footer / Privacy & Submit Button */}
            <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3.5 pt-2">
              <div className="flex items-center gap-2 text-slate-500">
                <ShieldCheckIcon className="w-4 h-4 text-slate-400 shrink-0" />
                <p className="text-[10px] leading-snug font-medium">
                  Your information is secure with us and will never be shared with third parties.
                </p>
              </div>

              <button
                disabled={isSubmitting}
                type="submit"
                className={`w-full sm:w-auto flex items-center justify-center gap-2 text-white px-7 py-3 rounded-full font-bold text-sm tracking-wide transition-all shadow-md cursor-pointer ${
                  isSubmitting
                    ? "bg-orange-400 cursor-not-allowed shadow-none"
                    : "bg-orange-500 hover:bg-orange-600 hover:shadow-orange-500/30 hover:-translate-y-0.5 active:translate-y-0"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>SUBMITTING...</span>
                  </>
                ) : (
                  <>
                    <span>Request Quote</span>
                    <SendIcon className="w-4 h-4 ml-0.5" />
                  </>
                )}
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}
