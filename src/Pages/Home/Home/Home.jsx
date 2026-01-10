import React from "react";
import Banner from "../../../Components/Shared/Banner/Banner";
import Featured from "../Featured/Featured";
import ContactUs from "../ContactUs/ContactUs";
import HowItWorks from "../HowItWorks/HowItWorks";
import EligibilityRequirements from "../EligibilityRequirements/EligibilityRequirements";
import BloodTypeCompatibility from "../BloodTypeCompatibility/BloodTypeCompatibility";
import FAQSection from "../FAQSection/FAQSection";
import CTASection from "../CTASection/CTASection";
import PartnersSection from "../PartnersSection/PartnerSection";
import StatisticsSection from "../StatisticsSection/StatisticsSection";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Featured></Featured>
      <HowItWorks></HowItWorks>
      <EligibilityRequirements></EligibilityRequirements>
      <BloodTypeCompatibility></BloodTypeCompatibility>
      <StatisticsSection></StatisticsSection>
      <PartnersSection></PartnersSection>
      <FAQSection></FAQSection>
      <CTASection></CTASection>
      <ContactUs></ContactUs>
    </div>
  );
};

export default Home;
