import PageTransition from "@/components/animations/PageTransition";
import DigitalMarketingContent from "@/components/services/DigitalMarketingContent";

export const metadata = {
  title: "Digital Marketing — VedhEra  ",
  description:
    "Digital marketing services from VedhEra  covering SEO, social media, Meta and Google Ads, content marketing, lead generation, and online reputation management.",
};

export default function DigitalMarketingPage() {
  return (
    <PageTransition>
      <DigitalMarketingContent />
    </PageTransition>
  );
}
