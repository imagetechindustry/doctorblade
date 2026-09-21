import React, { useEffect } from "react";
import CertificationsHero from "../components/certifications/CertificationsHero";
import CertificateDisplay from "../components/certifications/CertificateDisplay";
import CertificationScope from "../components/certifications/CertificationScope";
import CertificationsFAQ from "../components/certifications/CertificationsFAQ";
import HomeCTA from "../components/home/HomeCTA";
import SEO from "../components/common/SEO";

const Certifications = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const certSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Certifications | ImageTech Industries",
    "description": "ISO 9001:2015 Certified Manufacturer of Doctor Blades. We adhere to global standards of quality and excellence.",
  };

  return (
    <>
      <SEO 
        title="Doctor Blade Quality Certifications | ISO 9001:2015 Certified Manufacturer India"
        description="ImageTech Industries holds ISO 9001:2015 certification for doctor blade manufacturing. Every doctor blade undergoes strict quality testing for hardness, doctor blade material consistency, and edge precision. Our certified doctor blade production ensures zero burrs in every doctor blade type we manufacture. Certified doctor blade metallurgy guarantees reliable doctor blade operation and extended doctor blade life in your printing machine."
        keywords={[
          'doctor blade',
          'certified doctor blade',
          'doctor blade manufacturer',
          'ISO 9001 doctor blade',
          'doctor blade quality standards',
          'doctor blade material quality',
          'doctor blade types certification',
          'precision doctor blade manufacturing',
          'ImageTech Industries'
        ]}
        schema={certSchema}
      />
      <div className="flex flex-col min-h-screen">
        <CertificationsHero />
        <CertificateDisplay />
        <CertificationScope />
        <CertificationsFAQ />

        {/* Reusing HomeCTA for consistency */}
        <div className="bg-slate-50 pt-16 pb-24 border-t border-gray-200">
          <HomeCTA />
        </div>
      </div>
    </>
  );
};

export default Certifications;
