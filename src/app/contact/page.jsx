import PageTransition from "@/components/animations/PageTransition";
import ContactHero from "@/components/contact/ContactHero";
import ContactSection from "@/components/contact/ContactSection";
import ContactClosingCTA from "@/components/contact/ContactClosingCTA";

export const metadata = {
  title: "Contact — VedhEra  ",
  description:
    "Have a project in mind? Share your requirements with VedhEra  and let's discuss how we can help your brand grow.",
};

export default function ContactPage() {
  return (
    <PageTransition>
      <ContactHero />
      <ContactSection />
      <ContactClosingCTA />
    </PageTransition>
  );
}
