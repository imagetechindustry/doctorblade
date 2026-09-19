import React, { useEffect } from "react";
import ContactHero from "../components/contact/ContactHero";
import ContactInfo from "../components/contact/ContactInfo";
import ContactForm from "../components/contact/ContactForm";
import ContactFAQ from "../components/contact/ContactFAQ";
import ContactFeatures from "../components/contact/ContactFeatures";
import HomeCTA from "../components/home/HomeCTA";
import SEO from "../components/common/SEO";
import ContactWebsites from "../components/contact/ContactWebsites";

const ContactUs = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact ImageTech Industries",
    "description": "Contact ImageTech Industries for inquiries about Doctor Blades. Located in Delhi, India.",
    "mainEntity": {
      "@type": "Organization",
      "name": "ImageTech Industries",
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+91 8448336036",
          "contactType": "sales",
          "email": "imagetechindustries@gmail.com",
          "areaServed": "IN",
          "availableLanguage": "en"
        }
      ],
      "address": [
        {
          "@type": "PostalAddress",
          "streetAddress": "RZ-I-13, 2nd Floor, Nanda Block, Mahavir Enclave",
          "addressLocality": "Delhi",
          "postalCode": "110045",
          "addressCountry": "IN"
        }
      ]
    }
  };

  return (
    <>
      <SEO
        title="Contact Us | ImageTech Industries"
        description="Get in touch with ImageTech Industries. We are the leading manufacturer of doctor blades in Delhi, India. Contact us for sales, support, and custom inquiries."
        keywords={['contact imagetech industries', 'doctor blade supplier contact', 'buy doctor blade in delhi', 'printing blade inquiries']}
        schema={contactSchema}
      />
      <div className="flex flex-col min-h-screen">
        <ContactHero />

        {/* Main Content Area: Info and Form Grid */}
        <section className="bg-slate-50 py-8 lg:py-12 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-stretch">
              {/* Left Side: Info & Map */}
              <ContactInfo />

              {/* Right Side: Form */}
              <ContactForm />
            </div>
          </div>
        </section>
        {/* Specialized Product Websites Network */}
        <ContactWebsites />

        {/* Features Banner */}
        <div className="bg-slate-50 pb-16">
          <ContactFeatures />
        </div>

        {/* FAQ Section */}
        <ContactFAQ />

        {/* CTA Section */}
        <div className="bg-white pt-8 pb-16">
          <HomeCTA />
        </div>
      </div>
    </>
  );
};

export default ContactUs;
