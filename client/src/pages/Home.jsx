import React from "react";
import HomeHero from "../components/home/HomeHero";
import HomeProducts from "../components/home/HomeProducts";
import HomeIndustries from "../components/home/HomeIndustries";
import HomeAbout from "../components/home/HomeAbout";
import HomeCertifications from "../components/home/HomeCertifications";
import HomeWhyChoose from "../components/home/HomeWhyChoose";
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
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-9811000000",
      "contactType": "customer service",
      "areaServed": "IN",
      "availableLanguage": "en"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Delhi",
      "addressCountry": "IN"
    }
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
        title="Best Doctor Blade in Delhi, India | ImageTech Industries"
        description="Looking for the best doctor blade in Delhi, India? ImageTech Industries manufactures premium carbon steel, stainless steel, and polymer doctor blades for flawless printing."
        keywords={['best doctor blade in delhi', 'best doctor blade in india', 'doctor blade manufacturer', 'carbon steel doctor blade', 'polymer doctor blade']}
        schema={[orgSchema, productSchema]}
      />
      <main className="flex flex-col">
        <HomeHero />
        <HomeProducts />
        <HomeIndustries />
        <HomeAbout />
        <HomeCertifications />
        <HomeWhyChoose />
        <HomeFAQ />
        <HomeCTA />
      </main>
    </>
  );
};

export default Home;
