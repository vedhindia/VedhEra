import PageTransition from "@/components/animations/PageTransition";
import WebsiteDesignContent from "@/components/services/WebsiteDesignContent";

export const metadata = {
  title: "Website Design & Development — VedhEra  ",
  description:
    "Explore VedhEra  's website design and development service for e-commerce, industrial, real estate, hospitality, corporate, and other business websites.",
};

export default function WebsiteDesignPage() {
  return (
    <PageTransition>
      <WebsiteDesignContent />
    </PageTransition>
  );
}
