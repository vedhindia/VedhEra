"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import SectionHeading from "@/components/ui/SectionHeading";
import { logoPortfolioItems } from "@/data/logoPortfolio";

const SPRING = { type: "spring", stiffness: 220, damping: 25, mass: 0.8 };
const WALL_LOGO_ITEMS = logoPortfolioItems.slice(0, 20);
const DEPTH_PATTERN = [16, -8, 4, 22, -14, 10, -4, 18, -10, 6, 24, -16];

function createWallLayout(width, itemCount) {
  const columns = width >= 1024 ? 5 : width >= 640 ? 4 : 2;
  const rows = Math.ceil(itemCount / columns);
  const rowShift = 0;
  const columnStep = 1.1;
  const rowStep = 0.8;
  const columnDrop = 0;
  const horizontalUnits = columns * columnStep + (rows - 1) * rowShift;
  const tileSize = Math.min(width >= 1024 ? 220 : 140, (width - 24) / horizontalUnits);
  const totalWidth = horizontalUnits * tileSize;
  const leftOffset = Math.max(0, (width - totalWidth) / 2);
  const positions = WALL_LOGO_ITEMS.slice(0, itemCount).map((item, index) => {
    const row = Math.floor(index / columns);
    const column = index % columns;

    return {
      id: item.id,
      left: leftOffset + (column * columnStep + row * rowShift) * tileSize,
      top: (row * rowStep + column * columnDrop) * tileSize,
      depth: DEPTH_PATTERN[index % DEPTH_PATTERN.length],
      rotateX: -7,
      rotateY: 0,
    };
  });
  const height =
    ((rows - 1) * rowStep + (columns - 1) * columnDrop + 1) * tileSize;

  return { width, height, tileSize, positions };
}

function getRepulsion(layout, activeId) {
  if (!activeId) return {};

  const activePosition = layout.positions.find(
    (position) => position.id === activeId
  );
  if (!activePosition) return {};

  const radius = layout.tileSize * 2.8;
  const maxDisplacement = Math.min(22, layout.tileSize * 0.18);
  const vectors = {};

  layout.positions.forEach((position, index) => {
    if (position.id === activeId) return;

    const dx = position.left - activePosition.left;
    const dy = position.top - activePosition.top;
    const distance = Math.hypot(dx, dy);
    if (distance >= radius) return;

    const strength = 1 - distance / radius;
    const magnitude = maxDisplacement * strength * strength;
    const angle = distance > 0 ? Math.atan2(dy, dx) : index * 2.399;

    vectors[position.id] = {
      x: Math.cos(angle) * magnitude,
      y: Math.sin(angle) * magnitude,
      z: -12 * strength,
    };
  });

  return vectors;
}

export default function LogoPortfolioWall() {
  const stageRef = useRef(null);
  const [activeId, setActiveId] = useState(null);
  const [activeOffset, setActiveOffset] = useState({ x: 0, y: 0 });
  const [selectedId, setSelectedId] = useState(null);
  const [layout, setLayout] = useState(() =>
    createWallLayout(1200, WALL_LOGO_ITEMS.length)
  );
  const reduceMotion = useReducedMotion();
  const repulsion = reduceMotion ? {} : getRepulsion(layout, activeId);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;

    const measure = () => {
      const width = stage.clientWidth;
      if (width > 0) {
        setLayout(createWallLayout(width, WALL_LOGO_ITEMS.length));
      }
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const closeOnOutsidePointer = (event) => {
      if (!event.target.closest?.("[data-logo-wall-item]")) {
        setSelectedId(null);
        setActiveId(null);
        setActiveOffset({ x: 0, y: 0 });
      }
    };

    document.addEventListener("pointerdown", closeOnOutsidePointer);
    return () =>
      document.removeEventListener("pointerdown", closeOnOutsidePointer);
  }, []);

  const getViewportOffset = (element) => {
    const bounds = element.getBoundingClientRect();
    return {
      x: window.innerWidth / 2 - (bounds.left + bounds.width / 2),
      y: window.innerHeight / 2 - (bounds.top + bounds.height / 2),
    };
  };

  const activateLogo = (id, element) => {
    setActiveId(id);
    setActiveOffset(getViewportOffset(element));
  };

  const activateForPointer = (event, id) => {
    if (event.pointerType !== "touch") {
      activateLogo(id, event.currentTarget);
    }
  };

  const toggleSelection = (id, element) => {
    const next = selectedId === id ? null : id;
    setSelectedId(next);
    setActiveId(next);
    setActiveOffset(next ? getViewportOffset(element) : { x: 0, y: 0 });
  };

  const clearActive = () => {
    if (!selectedId) {
      setActiveId(null);
      setActiveOffset({ x: 0, y: 0 });
    }
  };

  return (
    <section
      id="logo-design"
      aria-labelledby="logo-design-heading"
      className="relative scroll-mt-10 overflow-visible bg-[#070d20] py-16 sm:py-20"
    >
      <motion.div
        aria-hidden="true"
        animate={{ opacity: activeId ? 0.28 : 0 }}
        transition={{ duration: 0.3 }}
        className="pointer-events-none absolute inset-0 z-0 bg-[#02050c]"
      />
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <SectionHeading
          tone="dark"
          align="center"
          eyebrow="Logo Design"
          title="Logos That Build Recognition."
          body="Distinctive identities designed to make brands memorable."
          className="mx-auto items-center text-center"
        />

        <ul
          ref={stageRef}
          aria-label="Logo design portfolio"
          className="relative mx-auto mt-10 overflow-visible sm:mt-12"
          style={{
            height: `${layout.height}px`,
            perspective: "1000px",
            perspectiveOrigin: "50% 44%",
            transformStyle: "preserve-3d",
          }}
          onPointerLeave={clearActive}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              clearActive();
            }
          }}
        >
          {layout.positions.map((position, index) => {
            const active = activeId === position.id;
            const displacement = repulsion[position.id] ?? {
              x: 0,
              y: 0,
              z: 0,
            };
            return (
              <motion.li
                key={position.id}
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{
                  opacity: { duration: 0.4, delay: (index % 12) * 0.025 },
                  y: { duration: 0.4, delay: (index % 12) * 0.025 },
                }}
                className="absolute list-none"
                style={{
                  left: `${position.left}px`,
                  top: `${position.top}px`,
                  width: `${layout.tileSize}px`,
                  height: `${layout.tileSize}px`,
                  zIndex: active ? 100 : repulsion[position.id] ? 5 : 1,
                }}
              >
                <motion.button
                  type="button"
                  data-logo-wall-item
                  aria-label={`${WALL_LOGO_ITEMS[index].title} — ${WALL_LOGO_ITEMS[index].category}`}
                  aria-pressed={selectedId === position.id}
                  onPointerEnter={(event) =>
                    activateForPointer(event, position.id)
                  }
                  onPointerDown={(event) => {
                    if (event.pointerType === "touch") {
                      toggleSelection(position.id, event.currentTarget);
                    }
                  }}
                  onClick={(event) => {
                    if (event.detail === 0) {
                      toggleSelection(position.id, event.currentTarget);
                    }
                  }}
                  onFocus={(event) =>
                    activateLogo(position.id, event.currentTarget)
                  }
                  animate={{
                    x: active
                      ? reduceMotion
                        ? 0
                        : activeOffset.x
                      : displacement.x,
                    y: active
                      ? reduceMotion
                        ? 0
                        : activeOffset.y
                      : displacement.y,
                    z: active
                      ? reduceMotion
                        ? position.depth
                        : 100
                      : position.depth + displacement.z,
                    scale: active && !reduceMotion ? 1.4 : 1,
                    rotateX: active ? 4 : position.rotateX,
                    rotateY: active ? 0 : position.rotateY,
                    filter: active
                      ? "brightness(1.15) drop-shadow(0 14px 10px rgba(0,0,0,0.72)) drop-shadow(0 0 16px rgba(192,196,201,0.2))"
                      : activeId
                        ? "blur(2px) brightness(0.42) drop-shadow(0 5px 5px rgba(0,0,0,0.55))"
                        : "brightness(1) drop-shadow(0 1px 1px rgba(192,196,201,0.18)) drop-shadow(0 8px 7px rgba(0,0,0,0.52))",
                  }}
                  transition={SPRING}
                  className="flex h-full w-full cursor-pointer items-center justify-center bg-transparent p-0 outline-none"
                  style={{
                    transformStyle: "preserve-3d",
                    WebkitTapHighlightColor: "transparent",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={WALL_LOGO_ITEMS[index].src}
                    alt=""
                    draggable={false}
                    loading="lazy"
                    decoding="async"
                    className="pointer-events-none shrink-0 object-contain"
                    style={{
                      width: `${layout.tileSize * 0.92}px`,
                      height: `${layout.tileSize * 0.92}px`,
                    }}
                  />
                </motion.button>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
