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
        title="Contact ImageTech Industries | Buy Doctor Blade | Inquiries & Quotation"
        description="Contact ImageTech Industries for direct factory doctor blade quotes, technical doctor blade support, and custom doctor blade manufacturing inquiries. Request samples of our carbon steel doctor blade, stainless steel doctor blade, or polymer doctor blade for your printing trials. Our doctor blade engineering team helps you choose the correct doctor blade thickness, width, and edge profile. Speak with our Delhi doctor blade team today for immediate doctor blade dispatch and PAN-India delivery."
        keywords={[
          'doctor blade',
          'buy doctor blade',
          'contact doctor blade manufacturer',
          'doctor blade quote',
          'doctor blade supplier contact',
          'doctor blade in delhi',
          'custom doctor blade order',
          'doctor blade price in india',
          'ImageTech Industries'
        ]}
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
