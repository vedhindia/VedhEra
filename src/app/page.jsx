import HomeHero from "@/components/home/HomeHero";
import CinematicExperience from "@/components/home/CinematicExperience";
import ServicesOverview from "@/components/home/ServicesOverview";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ContactCTA from "@/components/home/ContactCTA";

export default function Home() {
  return (
    <>
      <HomeHero />
      <CinematicExperience />
      <ServicesOverview />
      <WhyChooseUs />
      <ContactCTA />
    </>
  );
}