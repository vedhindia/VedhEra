import PageTransition from "@/components/animations/PageTransition";
import CareerView from "@/components/career/CareerView";

export const metadata = {
  title: "Career — VedhEra  ",
  description:
    "Build your future with VedhEra  . Explore creative, development and marketing roles, and send us your application.",
};

export default function CareerPage() {
  return (
    <PageTransition>
      <CareerView />
    </PageTransition>
  );
}
