"use client";

import { useMemo } from "react";
import { serviceScenes } from "@/data/services";
import { itemsByCategory } from "@/data/portfolio";
import { digitalMarketingHero } from "@/data/digitalMarketing";
import useHomeScrollAnimation from "@/components/animations/useHomeScrollAnimation";
import AboutPreviewScene from "@/components/home/AboutPreviewScene";
import ServiceScene from "@/components/home/ServiceScene";

const SCENE_ARTWORK = {
  "digital-marketing": [
    {
      id: "digital-marketing-illustration",
      ...digitalMarketingHero.image,
      orientation: "landscape",
    },
  ],
};

export default function CinematicExperience() {
  const scenes = useMemo(
    () =>
      serviceScenes.map((scene) => ({
        scene,
        images: SCENE_ARTWORK[scene.id] ?? itemsByCategory(scene.id),
      })),
    []
  );

  // Single coordinated GSAP ScrollTrigger setup for the whole journey.
  useHomeScrollAnimation();

  return (
    <div data-cinematic-journey>
      <AboutPreviewScene />
      {scenes.map(({ scene, images }, index) => (
        <ServiceScene
          key={scene.id}
          scene={scene}
          images={images.filter(Boolean)}
          reverse={index % 2 === 1}
        />
      ))}
    </div>
  );
}