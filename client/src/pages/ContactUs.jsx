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
        title="Buy Doctor Blade Online | Doctor Blade Price & Quote | ImageTech Industries"
        description="Buy doctor blade directly from ImageTech Industries, India's leading doctor blade manufacturer. Get instant doctor blade price quotes for carbon steel doctor blade, stainless steel doctor blade, and polymer doctor blade. Request free doctor blade samples for your printing machine trial. Our doctor blade technical team helps you select the right doctor blade type, doctor blade material, and doctor blade thickness for your gravure or flexo press. Contact our Delhi doctor blade factory for same-day doctor blade dispatch across India."
        keywords={[
          'doctor blade',
          'buy doctor blade',
          'doctor blade price',
          'doctor blade price in india',
          'doctor blade quote',
          'doctor blade types',
          'doctor blade material',
          'doctor blade for printing machine',
          'contact doctor blade manufacturer',
          'doctor blade supplier delhi',
          'custom doctor blade order',
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
