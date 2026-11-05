import PageTransition from "@/components/animations/PageTransition";
import StallDesignContent from "@/components/services/StallDesignContent";

export const metadata = {
  title: "Exhibition Stall Design & Fabrication — VedhEra  ",
  description:
    "Exhibition stall design and fabrication from VedhEra  . Explore our stall designs in a guided walkthrough, the stall formats we build, and the process from concept to installation.",
};

export default function StallDesignPage() {
  return (
    <PageTransition>
      <StallDesignContent />
    </PageTransition>
  );
}
