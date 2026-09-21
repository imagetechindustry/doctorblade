import React from "react";
import HomeHero from "../components/home/HomeHero";
import HomeProducts from "../components/home/HomeProducts";
import HomeIndustries from "../components/home/HomeIndustries";
import HomeAbout from "../components/home/HomeAbout";
import HomeCertifications from "../components/home/HomeCertifications";
import HomeWhyChoose from "../components/home/HomeWhyChoose";
import HomeWorkingPrinciple from "../components/home/HomeWorkingPrinciple";
import HomeSelectionGuide from "../components/home/HomeSelectionGuide";
import HomeTroubleshootingGuide from "../components/home/HomeTroubleshootingGuide";
import HomeIndustryCaseStudies from "../components/home/HomeIndustryCaseStudies";
import HomePressApplications from "../components/home/HomePressApplications";
import HomeFAQ from "../components/home/HomeFAQ";
import HomeCTA from "../components/home/HomeCTA";
import SEO from "../components/common/SEO";

const Home = () => {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ImageTech Industries",
    "url": "https://www.doctorblade.co.in/",
    "logo": "https://www.doctorblade.co.in/logo.png",
    "knowsAbout": [
      "Doctor Blade",
      "Carbon Steel Doctor Blade",
      "Stainless Steel Doctor Blade",
      "Polymer Doctor Blade",
      "Rotogravure Printing",
      "Flexographic Printing",
      "Ink Metering Hydrodynamics",
      "Lamella Edge Profile",
      "Anilox Roll Metering",
      "Pressroom Engineering"
    ],
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
  };

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "Doctor Blade",
    "image": "https://www.doctorblade.co.in/heroimage.webp",
    "description": "The best doctor blade in Delhi, India. Premium carbon steel, stainless steel, and polymer doctor blades for flexographic and rotogravure printing.",
    "brand": {
      "@type": "Brand",
      "name": "ImageTech Industries"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "120"
    }
  };

  return (
    <>
      <SEO 
        title="Doctor Blade | Best Doctor Blade Manufacturer in India | ImageTech Industries"
        description="Looking for the best doctor blade in Delhi and across India? ImageTech Industries is a certified doctor blade manufacturer supplying premium carbon steel doctor blade, stainless steel doctor blade, and polymer doctor blade solutions. Every doctor blade is engineered with precision lamella and bevel edge profiles to eliminate doctor blade streaks and press downtime. Contact us today for wholesale doctor blade prices and custom doctor blade specifications."
        keywords={[
          'doctor blade',
          'doctor blades',
          'doctor blade in india',
          'best doctor blade in delhi',
          'doctor blade manufacturer',
          'doctor blade supplier',
          'carbon steel doctor blade',
          'stainless steel doctor blade',
          'polymer doctor blade',
          'lamella doctor blade',
          'rotogravure doctor blade',
          'flexo doctor blade',
          'printing doctor blade',
          'doctor blade defect troubleshooting',
          'doctor blade selection guide',
          'doctor blade working principle',
          'doctor blade press applications',
          'doctor blade price',
          'ImageTech Industries'
        ]}
        schema={[orgSchema, productSchema]}
      />
      <main className="flex flex-col">
        <HomeHero />
        <HomeProducts />
        <HomeIndustries />
        <HomeAbout />
        <HomeCertifications />
        <HomeWhyChoose />
        <HomeWorkingPrinciple />
        <HomeSelectionGuide />
        <HomeTroubleshootingGuide />
        <HomeIndustryCaseStudies />
        <HomePressApplications />
        <HomeFAQ />
        <HomeCTA />
      </main>
    </>
  );
};

export default Home;
