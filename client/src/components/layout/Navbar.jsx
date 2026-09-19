import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [guidesDropdown, setGuidesDropdown] = useState(false);
  const [mobileGuidesOpen, setMobileGuidesOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  const technicalGuides = [
    { name: "Selection & Sizing Guide", href: "/selection-guide" },
    { name: "Defect Troubleshooting", href: "/troubleshooting-guide" },
    { name: "Working Principle", href: "/working-principle" },
    { name: "Press Applications", href: "/press-applications" },
  ];

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setGuidesDropdown(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setGuidesDropdown(false);
    }, 200);
  };

  // Close dropdown on route change
  useEffect(() => {
    setGuidesDropdown(false);
    setIsOpen(false);
    setMobileGuidesOpen(false);
  }, [location.pathname]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setGuidesDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Certifications", href: "/certifications" },
    { name: "Sitemap", href: "/sitemap" },
    { name: "Contact Us", href: "/contact" },
  ];

  const isGuideActive = technicalGuides.some(
    (g) => location.pathname === g.href
  );

  const isActive = (href) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href) || location.hash === href;
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a
              href="https://www.imagetechindustries.com"
              className="flex items-center"
            >
              <img
                src="/logo.png"
                alt="ImageTech Industries Logo"
                className="h-10 md:h-12 w-auto object-contain"
              />
            </a>
          </div>

          {/* Desktop Nav */}
          <div className="hidden sm:flex items-center space-x-1 lg:space-x-2">
            <Link
              to="/"
              className={`flex items-center px-3 py-2 text-sm font-semibold rounded-md transition-colors ${
                isActive("/") ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-900 font-bold hover:text-blue-600"
              }`}
            >
              Home
            </Link>

            <Link
              to="/about"
              className={`flex items-center px-3 py-2 text-sm font-semibold rounded-md transition-colors ${
                isActive("/about") ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-900 font-bold hover:text-blue-600"
              }`}
            >
              About Us
            </Link>

            {/* Technical Guides Dropdown with Zero-Gap Hover Bridge & Debounce */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => setGuidesDropdown((prev) => !prev)}
                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-md transition-colors cursor-pointer ${
                  isGuideActive
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-900 font-bold hover:text-blue-600"
                }`}
                aria-expanded={guidesDropdown}
              >
                <span>Technical Guides</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    guidesDropdown ? "rotate-180 text-blue-600" : "text-gray-500"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {guidesDropdown && (
                <div
                  className="absolute left-0 top-full pt-1.5 w-64 z-50"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* Card Container with Seamless Hitbox */}
                  <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-1.5">
                    {technicalGuides.map((guide) => {
                      const isItemActive = location.pathname === guide.href;
                      return (
                        <Link
                          key={guide.href}
                          to={guide.href}
                          onClick={() => setGuidesDropdown(false)}
                          className={`block px-4 py-2.5 text-sm font-semibold transition-colors ${
                            isItemActive
                              ? "bg-blue-50 text-blue-600 font-bold"
                              : "text-gray-800 hover:text-blue-600 hover:bg-gray-50"
                          }`}
                        >
                          {guide.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/certifications"
              className={`flex items-center px-3 py-2 text-sm font-semibold rounded-md transition-colors ${
                isActive("/certifications") ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-900 font-bold hover:text-blue-600"
              }`}
            >
              Certifications
            </Link>

            <Link
              to="/sitemap"
              className={`flex items-center px-3 py-2 text-sm font-semibold rounded-md transition-colors ${
                isActive("/sitemap") ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-900 font-bold hover:text-blue-600"
              }`}
            >
              Sitemap
            </Link>

            <Link
              to="/contact"
              className={`flex items-center px-3 py-2 text-sm font-semibold rounded-md transition-colors ${
                isActive("/contact") ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-900 font-bold hover:text-blue-600"
              }`}
            >
              Contact Us
            </Link>
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={() =>
                window.dispatchEvent(new CustomEvent("open-quote-modal"))
              }
              className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/20 flex items-center"
            >
              Get A Quote
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-900 hover:text-gray-900 focus:outline-none p-2"
              aria-label="Toggle Navigation Menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white absolute w-full shadow-xl">
          <div className="px-4 pt-2 pb-6 space-y-1">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2.5 rounded-md text-base font-semibold ${
                isActive("/") ? "text-blue-600 bg-blue-50" : "text-gray-900 font-bold hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              Home
            </Link>

            <Link
              to="/about"
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2.5 rounded-md text-base font-semibold ${
                isActive("/about") ? "text-blue-600 bg-blue-50" : "text-gray-900 font-bold hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              About Us
            </Link>

            {/* Mobile Technical Guides Accordion */}
            <div className="border-y border-gray-100/80 py-1 my-1">
              <button
                onClick={() => setMobileGuidesOpen(!mobileGuidesOpen)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-base font-bold ${
                  isGuideActive ? "text-blue-600" : "text-gray-900 hover:text-blue-600"
                }`}
              >
                <span>Technical Guides</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    mobileGuidesOpen ? "rotate-180 text-blue-600" : "text-gray-400"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {mobileGuidesOpen && (
                <div className="pl-4 py-1 space-y-1 bg-gray-50 rounded-lg my-1 border border-gray-100">
                  {technicalGuides.map((guide) => (
                    <Link
                      key={guide.href}
                      to={guide.href}
                      onClick={() => {
                        setIsOpen(false);
                        setMobileGuidesOpen(false);
                      }}
                      className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        location.pathname === guide.href
                          ? "text-blue-600 font-bold bg-white shadow-xs"
                          : "text-gray-700 hover:text-blue-600"
                      }`}
                    >
                      {guide.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/certifications"
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2.5 rounded-md text-base font-semibold ${
                isActive("/certifications") ? "text-blue-600 bg-blue-50" : "text-gray-900 font-bold hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              Certifications
            </Link>

            <Link
              to="/sitemap"
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2.5 rounded-md text-base font-semibold ${
                isActive("/sitemap") ? "text-blue-600 bg-blue-50" : "text-gray-900 font-bold hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              Sitemap
            </Link>

            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2.5 rounded-md text-base font-semibold ${
                isActive("/contact") ? "text-blue-600 bg-blue-50" : "text-gray-900 font-bold hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              Contact Us
            </Link>

            <div className="pt-4 mt-2 border-t border-gray-100">
              <button
                onClick={() => {
                  setIsOpen(false);
                  window.dispatchEvent(new CustomEvent("open-quote-modal"));
                }}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-full font-semibold text-base hover:bg-blue-700 transition-colors shadow-md flex items-center justify-center"
              >
                Get A Quote
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
