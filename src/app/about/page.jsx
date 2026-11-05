import PageTransition from "@/components/animations/PageTransition";
import AboutHero from "@/components/about/AboutHero";
import CompanyIntroduction from "@/components/about/CompanyIntroduction";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ClientLogoSlider from "@/components/about/ClientLogoSlider";
import ApproachSection from "@/components/about/ApproachSection";
import AboutClosingCTA from "@/components/about/AboutClosingCTA";

export const metadata = {
  title: "About — VedhEra",
  description:
    "VedhEra is a creative advertising and digital marketing agency delivering branding, website development, digital marketing, and exhibition stall design.",
};

export default function AboutPage() {
  return (
    <PageTransition>
      <AboutHero />
      <CompanyIntroduction />
      <WhyChooseUs />
      <ClientLogoSlider />
      <ApproachSection />
      <AboutClosingCTA />
    </PageTransition>
  );
}
