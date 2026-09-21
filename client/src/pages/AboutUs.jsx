import React, { useEffect } from "react";
import AboutStory from "../components/about/AboutStory";
import AboutCapabilities from "../components/about/AboutCapabilities";
import AboutValues from "../components/about/AboutValues";
import AboutVisionMission from "../components/about/AboutVisionMission";
import AboutGlobalPresence from "../components/about/AboutGlobalPresence";
import HomeCertifications from "../components/home/HomeCertifications";
import AboutFAQ from "../components/about/AboutFAQ";
import HomeCTA from "../components/home/HomeCTA";
import SEO from "../components/common/SEO";

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About ImageTech Industries",
    "description": "Learn about ImageTech Industries, a leading manufacturer of Doctor Blades in India with over 30 years of experience.",
    "publisher": {
      "@type": "Organization",
      "name": "ImageTech Industries"
    }
  };

  return (
    <>
      <SEO 
        title="About ImageTech Industries | Doctor Blade Manufacturer & Supplier in India"
        description="ImageTech Industries is India's leading doctor blade manufacturer specializing in precision doctor blade engineering for rotogravure and flexo printing. Our ISO-certified doctor blade facility produces high-grade carbon steel doctor blade, stainless steel doctor blade, and polymer doctor blade products. We deliver trusted doctor blade solutions to printers and converters across India and international markets. Partner with our doctor blade technical specialists for customized doctor blade sizes and reliable doctor blade performance."
        keywords={[
          'doctor blade',
          'doctor blade manufacturer',
          'about doctor blade supplier',
          'best doctor blade in delhi',
          'doctor blade manufacturing in india',
          'ImageTech Industries doctor blade',
          'printing doctor blade factory',
          'industrial doctor blade exporter'
        ]}
        schema={aboutSchema}
      />
      <main>
        <AboutStory />
        <AboutCapabilities />
        <AboutValues />
        <AboutVisionMission />
        <HomeCertifications />
        <AboutGlobalPresence />
        <AboutFAQ />
        <HomeCTA />
      </main>
    </>
  );
};

export default AboutUs;
