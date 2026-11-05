"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useHydratedReducedMotion from "@/components/animations/useHydratedReducedMotion";
import SectionHeading from "@/components/ui/SectionHeading";
import { stallPortfolioIntro, stallPortfolioItems } from "@/data/stallDesign";
import "./StallPortfolioCarousel.css";

const TOTAL_PANELS = 6;
const SWIPE_THRESHOLD = 48;
const ROTATION_DURATION = 0.7;
const AUTOPLAY_INTERVAL = 3500;
const ANGLE_STEP = 360 / TOTAL_PANELS;

function wrapIndex(index) {
  return ((index % TOTAL_PANELS) + TOTAL_PANELS) % TOTAL_PANELS;
}

function shortestRelative(index, activeIndex) {
  let distance = index - activeIndex;

  if (distance > TOTAL_PANELS / 2) distance -= TOTAL_PANELS;
  if (distance < -TOTAL_PANELS / 2) distance += TOTAL_PANELS;

  return distance;
}

function getMetrics(width) {
  if (width < 640) {
    return {
      stageHeight: "25rem",
      cardWidth: Math.min(width * 0.88, 360),
      perspective: 900,
      radius: Math.min(width * 0.7, 250),
    };
  }

  if (width < 1024) {
    return {
      stageHeight: "30rem",
      cardWidth: Math.min(width * 0.68, 540),
      perspective: 1150,
      radius: Math.min(width * 0.48, 380),
    };
  }

  return {
    stageHeight: "36rem",
    cardWidth: Math.min(width * 0.52, 680),
    perspective: 1400,
    radius: Math.min(width * 0.46, 560),
  };
}

function getPanelPosition(index, radius) {
  const angle = index * ANGLE_STEP;
  const radians = (angle * Math.PI) / 180;

  return {
    x: radius * Math.sin(radians),
    z: radius * (Math.cos(radians) - 1),
    rotationY: angle,
  };
}

function setTrackRotation(track, index, radius) {
  if (!track) return;
  gsap.set(track, {
    transformOrigin: `50% 50% -${radius}px`,
    rotationY: -index * ANGLE_STEP,
    force3D: true,
  });
}

export default function StallPortfolioCarousel() {
  const reduceMotion = useHydratedReducedMotion();
  const items = stallPortfolioItems.slice(0, TOTAL_PANELS);
  const stageRef = useRef(null);
  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const activeIndexRef = useRef(0);
  const pendingIndexRef = useRef(null);
  const timelineRef = useRef(null);
  const animatingRef = useRef(false);
  const suppressClickRef = useRef(false);
  const suppressTimerRef = useRef(null);
  const dragRef = useRef({
    pointerId: null,
    startX: 0,
    startY: 0,
    moved: false,
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [stageWidth, setStageWidth] = useState(1280);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isDocumentHidden, setIsDocumentHidden] = useState(false);
  const metrics = useMemo(() => getMetrics(stageWidth), [stageWidth]);

  const setActive = useCallback((index) => {
    activeIndexRef.current = index;
    setActiveIndex(index);
  }, []);

  const positionPanels = useCallback(
    (active) => {
      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        const position = getPanelPosition(index, metrics.radius);
        const relative = shortestRelative(index, active);
        const frontFacing = Math.abs(relative * ANGLE_STEP) < 90;

        gsap.set(card, {
          xPercent: -50,
          yPercent: -50,
          x: position.x,
          y: 0,
          z: position.z,
          rotationY: position.rotationY,
          transformOrigin: "50% 50%",
          force3D: true,
        });

        card.style.pointerEvents = frontFacing ? "auto" : "none";
        card.setAttribute("aria-hidden", frontFacing ? "false" : "true");
        card.tabIndex = relative === 0 ? 0 : -1;
      });
    },
    [metrics.radius]
  );

  const navigateTo = useCallback(
    (requestedIndex) => {
      if (animatingRef.current) return;

      const currentIndex = activeIndexRef.current;
      const targetIndex = wrapIndex(requestedIndex);
      if (targetIndex === currentIndex) return;

      const rotationDelta =
        shortestRelative(targetIndex, currentIndex) * ANGLE_STEP;

      if (reduceMotion) {
        setActive(targetIndex);
        setTrackRotation(trackRef.current, targetIndex, metrics.radius);
        positionPanels(targetIndex);
        return;
      }

      animatingRef.current = true;
      pendingIndexRef.current = targetIndex;
      setIsAnimating(true);
      cardRefs.current.forEach((card) => {
        if (card) card.disabled = true;
      });

      const currentRotation = Number(
        gsap.getProperty(trackRef.current, "rotationY")
      );
      const targetRotation = currentRotation - rotationDelta;

      timelineRef.current = gsap.to(trackRef.current, {
        rotationY: targetRotation,
        duration: ROTATION_DURATION,
        ease: "power3.inOut",
        force3D: true,
        onComplete: () => {
          setTrackRotation(trackRef.current, targetIndex, metrics.radius);
          setActive(targetIndex);
          positionPanels(targetIndex);
          pendingIndexRef.current = null;
          animatingRef.current = false;
          timelineRef.current = null;
          setIsAnimating(false);
          cardRefs.current.forEach((card) => {
            if (card) card.disabled = false;
          });
        },
      });
    },
    [metrics.radius, positionPanels, reduceMotion, setActive]
  );

  useLayoutEffect(() => {
    if (animatingRef.current) {
      timelineRef.current?.kill();
      timelineRef.current = null;
      const targetIndex = pendingIndexRef.current;
      if (targetIndex !== null) {
        setActive(targetIndex);
        setTrackRotation(trackRef.current, targetIndex, metrics.radius);
      }
      pendingIndexRef.current = null;
      animatingRef.current = false;
      setIsAnimating(false);
      cardRefs.current.forEach((card) => {
        if (card) card.disabled = false;
      });
    }

    setTrackRotation(trackRef.current, activeIndexRef.current, metrics.radius);
    positionPanels(activeIndexRef.current);
  }, [metrics, positionPanels, setActive]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;

    const measure = () => {
      setStageWidth(stage.clientWidth || window.innerWidth);
    };

    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    measure();
    window.addEventListener("orientationchange", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("orientationchange", measure);
    };
  }, []);

  useEffect(
    () => () => {
      timelineRef.current?.kill();
      timelineRef.current = null;
      if (suppressTimerRef.current) window.clearTimeout(suppressTimerRef.current);
    },
    []
  );

  const goNext = useCallback(
    () => navigateTo(activeIndexRef.current + 1),
    [navigateTo]
  );
  const goPrevious = useCallback(
    () => navigateTo(activeIndexRef.current - 1),
    [navigateTo]
  );

  useEffect(() => {
    const syncVisibility = () => setIsDocumentHidden(document.hidden);
    syncVisibility();
    document.addEventListener("visibilitychange", syncVisibility);

    return () => document.removeEventListener("visibilitychange", syncVisibility);
  }, []);

  useEffect(() => {
    if (
      reduceMotion ||
      isHovered ||
      isFocused ||
      isDocumentHidden ||
      items.length < 2
    ) {
      return undefined;
    }

    const timer = window.setInterval(goNext, AUTOPLAY_INTERVAL);
    return () => window.clearInterval(timer);
  }, [
    goNext,
    isDocumentHidden,
    isFocused,
    isHovered,
    items.length,
    reduceMotion,
  ]);

  const onCarouselBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsFocused(false);
    }
  };

  const onKeyDown = (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrevious();
    } else if (event.key === "Home") {
      event.preventDefault();
      navigateTo(0);
    } else if (event.key === "End") {
      event.preventDefault();
      navigateTo(TOTAL_PANELS - 1);
    }
  };

  const onPointerDown = (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      moved: false,
    };
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const onPointerMove = (event) => {
    const drag = dragRef.current;
    if (drag.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - drag.startX;
    const deltaY = event.clientY - drag.startY;
    if (Math.abs(deltaX) > 12 && Math.abs(deltaX) > Math.abs(deltaY)) {
      drag.moved = true;
    }
  };

  const onPointerEnd = (event) => {
    const drag = dragRef.current;
    if (drag.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - drag.startX;
    const deltaY = event.clientY - drag.startY;
    const didSwipe =
      Math.abs(deltaX) > SWIPE_THRESHOLD && Math.abs(deltaX) > Math.abs(deltaY);

    event.currentTarget.releasePointerCapture?.(event.pointerId);

    if (drag.moved) {
      suppressClickRef.current = true;
      if (suppressTimerRef.current) window.clearTimeout(suppressTimerRef.current);
      suppressTimerRef.current = window.setTimeout(() => {
        suppressClickRef.current = false;
        suppressTimerRef.current = null;
      }, 400);
    }

    if (didSwipe) {
      if (deltaX < 0) goNext();
      else goPrevious();
    }

    dragRef.current = {
      pointerId: null,
      startX: 0,
      startY: 0,
      moved: false,
    };
  };

  const onCardClick = (index) => {
    if (suppressClickRef.current || dragRef.current.moved) return;
    navigateTo(index);
  };

  return (
    <section
      id="stall-portfolio"
      aria-labelledby="stall-portfolio-heading"
      className="stall-portfolio-section relative isolate overflow-x-clip scroll-mt-28"
    >
      <div aria-hidden="true" className="stall-portfolio-atmosphere">
        <span className="stall-portfolio-light stall-portfolio-light-left" />
        <span className="stall-portfolio-light stall-portfolio-light-center" />
        <span className="stall-portfolio-light stall-portfolio-light-right" />
      </div>

      <div className="stall-portfolio-content relative mx-auto max-w-7xl px-6">
        <SectionHeading
          id="stall-portfolio-heading"
          tone="dark"
          className="stall-portfolio-heading-copy"
          title={stallPortfolioIntro.heading}
          body={stallPortfolioIntro.body}
        />

        <div
          className="stall-portfolio-carousel"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocusCapture={() => setIsFocused(true)}
          onBlurCapture={onCarouselBlur}
        >
          <div
            ref={stageRef}
            role="region"
            aria-roledescription="carousel"
            aria-label="Exhibition stall portfolio"
            aria-busy={isAnimating}
            tabIndex={0}
            onKeyDown={onKeyDown}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerEnd}
            onPointerCancel={onPointerEnd}
            className="stall-portfolio-stage relative mx-auto w-full touch-pan-y select-none overflow-visible outline-none"
            style={{
              height: metrics.stageHeight,
              perspective: `${metrics.perspective}px`,
              perspectiveOrigin: "50% 50%",
            }}
          >
            <div
              aria-hidden="true"
              className="stall-portfolio-halo stall-portfolio-halo-back"
            />
            <div
              aria-hidden="true"
              className="stall-portfolio-halo stall-portfolio-halo-front"
            />

            <div
              ref={trackRef}
              className="stall-portfolio-track absolute inset-0"
            >
              {items.map((item, index) => {
                const relative = shortestRelative(index, activeIndex);
                const frontFacing = Math.abs(relative * ANGLE_STEP) < 90;

                return (
                  <button
                    key={item.id}
                    type="button"
                    ref={(node) => {
                      cardRefs.current[index] = node;
                    }}
                    onClick={() => onCardClick(index)}
                    aria-label={
                      index === activeIndex
                        ? `Current stall, ${index + 1} of ${TOTAL_PANELS}`
                        : `Show stall ${index + 1} of ${TOTAL_PANELS}`
                    }
                    aria-current={index === activeIndex ? "true" : undefined}
                    aria-hidden={!frontFacing}
                    tabIndex={relative === 0 ? 0 : -1}
                    disabled={isAnimating}
                    className="stall-portfolio-card absolute left-1/2 top-1/2 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-100/80"
                    style={{
                      width: `${metrics.cardWidth}px`,
                      aspectRatio: "16 / 9",
                      transform: "translate(-50%, -50%)",
                      willChange: "transform",
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.src}
                      alt={item.alt}
                      width={item.w}
                      height={item.h}
                      loading={Math.abs(relative) <= 1 ? "eager" : "lazy"}
                      decoding="async"
                      draggable="false"
                    />
                    <span
                      aria-hidden="true"
                      className="stall-portfolio-card-shade pointer-events-none absolute inset-0"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="stall-portfolio-controls">
            <button
              type="button"
              onClick={goPrevious}
              className="stall-portfolio-nav"
              aria-label="Previous stall"
              disabled={isAnimating}
            >
              <ChevronLeft size={17} aria-hidden="true" />
              Prev
            </button>

            <p className="stall-portfolio-counter" aria-live="polite">
              {String(activeIndex + 1).padStart(2, "0")} / 06
            </p>

            <button
              type="button"
              onClick={goNext}
              className="stall-portfolio-nav"
              aria-label="Next stall"
              disabled={isAnimating}
            >
              Next
              <ChevronRight size={17} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
