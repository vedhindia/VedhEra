import PageTransition from "@/components/animations/PageTransition";
import GraphicDesignHero from "@/components/services/GraphicDesignHero";
import LogoPortfolioWall from "@/components/services/LogoPortfolioWall";
import BillboardScrollSequence from "@/components/services/BillboardScrollSequence";
import BrochureShowcase from "@/components/services/BrochureShowcase";

export const metadata = {
  title: "Graphic Design — VedhEra  ",
  description:
    "From distinctive logos to powerful brand identities, VedhEra  creates visuals that help businesses stand out and stay memorable.",
};

export default function GraphicDesignPage() {
  return (
    <PageTransition>
      <GraphicDesignHero />
      <LogoPortfolioWall />
      <BillboardScrollSequence />
      <BrochureShowcase />
    </PageTransition>
  );
}
