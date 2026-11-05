"use client";

import { useCallback, useState } from "react";
import CareerHero from "@/components/career/CareerHero";
import WhyWorkSection from "@/components/career/WhyWorkSection";
import OpeningsSection from "@/components/career/OpeningsSection";
import ApplicationForm from "@/components/career/ApplicationForm";

/**
 * Career page composition.
 *
 * This is a client component so the opening cards and the application form can
 * share state: choosing a role pre-fills the form and scrolls to it.
 */
export default function CareerView() {
  const [position, setPosition] = useState("");

  const handleApply = useCallback((roleId) => {
    setPosition(roleId);

    const target = document.getElementById("apply");
    if (!target) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  }, []);

  return (
    <>
      <CareerHero />
      <WhyWorkSection />
      <OpeningsSection onApply={handleApply} />
      <ApplicationForm position={position} onPositionChange={setPosition} />
    </>
  );
}
