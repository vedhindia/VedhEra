import Image from "next/image";
import { aboutPreview } from "@/data/services";

/**
 * About preview scene — cinematic bridge between the eagle hero and the
 * service showcases. Uses an architectural, gallery-like composition with
 * atmospheric depth. Participates in the coordinated scroll animation via
 * the `[data-scene]` contract.
 */
export default function AboutPreviewScene() {
  return (
    <section
      data-scene
      aria-labelledby="about-preview-heading"
      className="relative isolate min-h-svh w-full overflow-hidden bg-black"
    >
      {/* Architectural depth layers */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#050505_0%,#111315_30%,#17191d_65%,#0a0b0d_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_70%_50%,rgba(192,196,201,0.12),transparent_60%)]"
      />
      {/* Perspective corridor lines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          transform: "perspective(800px) rotateX(55deg) translateY(20%)",
          transformOrigin: "center top",
        }}
      />
      {/* Central light shaft */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-linear-to-b from-transparent via-silver/20 to-transparent"
      />

      <div className="relative z-10 mx-auto flex min-h-svh max-w-7xl items-center gap-12 px-6 py-24 lg:gap-20">
        {/* Copy column */}
        <div className="w-full lg:w-1/2">
          <p className="scene-copy-item mb-5 text-[11px] font-medium tracking-[0.4em] text-silver uppercase sm:text-xs">
            About VEDH 
          </p>
          <h2
            id="about-preview-heading"
            className="scene-copy-item max-w-2xl text-3xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.75rem] lg:leading-[1.04]"
          >
            {aboutPreview.heading}
          </h2>
          <p className="scene-copy-item mt-8 max-w-xl text-sm leading-relaxed text-silver sm:text-base">
            {aboutPreview.body}
          </p>

          <ul className="mt-12 grid gap-5 sm:grid-cols-2">
            {aboutPreview.labels.map((label, index) => (
              <li
                key={label}
                className="scene-label flex items-start gap-3 border-l border-silver/20 pl-4"
              >
                <span className="mt-0.5 text-xs font-semibold tracking-[0.25em] text-silver/60">
                  0{index + 1}
                </span>
                <span className="text-sm font-medium leading-snug text-light-silver">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Visual column — large monogram with depth */}
        <div className="scene-panel hidden items-center justify-center lg:flex lg:w-1/2">
          <div className="relative -translate-y-14 perspective-[1200px]">
            <div className="flex h-80 w-80 items-center justify-center  bg-[radial-gradient(circle,rgba(192,196,201,0.08),transparent_70%)]">
              <div className="motion-safe:animate-[vedh-icon-rotate-horizontal_8s_linear_infinite] [transform-style:preserve-3d]">
                <Image
                  src="/images/vedh_silver.png"
                  alt="VedhEra  icon"
                  width={220}
                  height={165}
                  className="h-auto w-[18rem] -translate-y-2 opacity-95"
                  priority={false}
                />
              </div>
            </div>
            {/* Halo glow */}
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 rounded-full bg-[radial-gradient(circle,rgba(192,196,201,0.15),transparent_60%)] blur-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
