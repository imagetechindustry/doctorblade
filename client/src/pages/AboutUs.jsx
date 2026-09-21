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
        title="Doctor Blade Manufacturer in India Since 1992 | About ImageTech Industries"
        description="ImageTech Industries is India's trusted doctor blade manufacturer since 1992, specializing in precision doctor blade engineering for rotogravure and flexographic printing machines. Our ISO 9001:2015 certified facility produces all doctor blade types including carbon steel doctor blade, stainless steel doctor blade, and polymer doctor blade. We supply doctor blade material in custom sizes and doctor blade edge profiles for every printing press. Learn about our doctor blade operation expertise, competitive doctor blade price, and PAN-India doctor blade delivery network."
        keywords={[
          'doctor blade',
          'doctor blade manufacturer',
          'doctor blade manufacturer in india',
          'doctor blade types',
          'doctor blade material',
          'doctor blade price',
          'doctor blade for printing machine',
          'about doctor blade supplier',
          'best doctor blade in delhi',
          'doctor blade factory india',
          'doctor blade exporter',
          'ImageTech Industries'
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
