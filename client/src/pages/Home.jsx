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
      "Doctor Blade Types",
      "Doctor Blade Material",
      "Doctor Blade Price",
      "Doctor Blade Coating",
      "Doctor Blade for Printing Machine",
      "Doctor Blade Operation",
      "Carbon Steel Doctor Blade",
      "Stainless Steel Doctor Blade",
      "Polymer Doctor Blade",
      "Rotogravure Doctor Blade",
      "Flexographic Doctor Blade",
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
    "description": "A doctor blade is a thin, flexible scraping blade used in gravure and flexo printing machines to remove excess ink from cylinders. ImageTech Industries manufactures premium carbon steel, stainless steel, and polymer doctor blades. Get best doctor blade price in India.",
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
        title="Doctor Blade - Manufacturer in India | Get Best Price,Types, Material  | ImageTech Industries"
        description="India's leading doctor blade manufacturer since 1992,ImageTech Industries is supplying best quality carbon steel doctor blade, stainless steel doctor blade, and polymer doctor blade for every printing press.What is a doctor blade? A doctor blade is a thin, flexible scraping blade used in rotogravure and flexographic printing machines to wipe excess ink from the cylinder surface. Compare doctor blade types, check doctor blade material options, get competitive doctor blade price, and learn doctor blade operation principles. Our doctor blade coating solutions serve flexible packaging, label printing, and corrugated industries across India."
        keywords={[
          'doctor blade',
          'doctor blades',
          'doctor blade price',
          'doctor blade types',
          'doctor blade material',
          'doctor blade coating',
          'doctor blade for printing machine',
          'doctor blade operation',
          'doctor blade manufacturer',
          'doctor blade supplier',
          'doctor blade cutter',
          'doctor blade name',
          'buy doctor blade',
          'doctor blade in india',
          'best doctor blade in delhi',
          'carbon steel doctor blade',
          'stainless steel doctor blade',
          'polymer doctor blade',
          'lamella doctor blade',
          'rotogravure doctor blade',
          'flexo doctor blade',
          'doctor blade for gravure printing',
          'doctor blade for flexo printing',
          'printing machine doctor blade',
          'doctor blade edge profile',
          'doctor blade thickness',
          'doctor blade angle',
          'doctor blade price in india',
          'industrial doctor blade',
          'doctor blade defect troubleshooting',
          'doctor blade selection guide',
          'doctor blade working principle',
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
