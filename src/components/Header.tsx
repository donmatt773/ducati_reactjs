"use client";

import { useEffect, useRef, useState } from "react";

const videos = [
  "/assets/streetvideo.mp4",
  "/assets/multistrada.mp4",
  "/assets/hero_1918.mp4",
  "/assets/monster-new.mp4",
  "/assets/diavel-video.mp4",
];

export default function Header() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isFading, setIsFading] = useState(false);

  const currentRef = useRef<HTMLVideoElement | null>(null);
  const isTransitioningRef = useRef(false);
  const switchTimeoutRef = useRef<number | null>(null);
  const FADE_DURATION_MS = 700;

  const safePlay = (video: HTMLVideoElement) => {
    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === "function") {
      // Ignore autoplay/power-saving interruptions to avoid runtime AbortError overlays.
      playPromise.catch(() => {});
    }
  };

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const handleChange = () => setIsMobile(media.matches);

    handleChange();
    media.addEventListener("change", handleChange);

    return () => media.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    return () => {
      if (switchTimeoutRef.current !== null) {
        window.clearTimeout(switchTimeoutRef.current);
      }
    };
  }, []);

  // Preload all videos
  useEffect(() => {
    if (isMobile) return;

    videos.forEach((src) => {
      const video = document.createElement("video");
      video.src = src;
      video.preload = "auto";
    });
  }, [isMobile]);

  // Ensure the currently selected video starts when source changes.
  useEffect(() => {
    if (isMobile) return;

    const currentVideo = currentRef.current;
    if (!currentVideo) return;

    isTransitioningRef.current = false;
    currentVideo.currentTime = 0;
    safePlay(currentVideo);
  }, [currentIndex, isMobile]);

  const startTransitionToNext = () => {
    if (isMobile || isTransitioningRef.current) return;

    isTransitioningRef.current = true;
    setIsFading(true);

    if (switchTimeoutRef.current !== null) {
      window.clearTimeout(switchTimeoutRef.current);
    }

    switchTimeoutRef.current = window.setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % videos.length);
    }, FADE_DURATION_MS);
  };

  const handleTimeUpdate = () => {
    if (isMobile || isTransitioningRef.current) return;

    const currentVideo = currentRef.current;
    if (!currentVideo || !Number.isFinite(currentVideo.duration)) return;

    const remaining = currentVideo.duration - currentVideo.currentTime;
    if (remaining <= FADE_DURATION_MS / 1000) {
      startTransitionToNext();
    }
  };

  const handleLoadedData = () => {
    const currentVideo = currentRef.current;
    if (!currentVideo) return;

    safePlay(currentVideo);

    if (!isMobile) {
      // Fade in the newly loaded source after the index swap.
      requestAnimationFrame(() => setIsFading(false));
    }
  };

  const handleEnded = () => {
    if (isMobile) return;

    if (!isTransitioningRef.current) {
      setCurrentIndex((prev) => (prev + 1) % videos.length);
    }
  };

  return (
    <section className="relative min-h-[100svh] md:h-screen w-full max-w-full pt-24 md:pt-0 flex items-center justify-center text-center text-white overflow-hidden">
      {/* Current Video */}
      <video
        ref={currentRef}
        key={currentIndex}
        autoPlay
        muted
        playsInline
        loop={isMobile}
        onTimeUpdate={handleTimeUpdate}
        onLoadedData={handleLoadedData}
        onEnded={handleEnded}
        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ${
          isFading ? "opacity-0" : "opacity-100"
        } ${isMobile ? "" : "animate-zoom"}`}
      >
        <source src={videos[isMobile ? 0 : currentIndex]} type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/70"></div>

      {/* Content */}
      <div className="relative max-w-3xl px-6">
        <h1 className="text-5xl font-bold mb-6">World&apos;s Best Superbikes</h1>

        <p className="mb-6 p-5 hover:text-red-500 transition-colors">
          Ducati is an Italian motorcycle-manufacturing company that is part of the Ducati group, and is headquartered in Bologna, Italy.
          The company is directly owned by Italian automotive manufacturer Lamborghini, whose German parent company is Audi,
          itself owned by the Volkswagen Group.
        </p>

        <p className="mb-6 p-5 hover:text-red-500 transition-colors">
          DISCLAIMER: THIS IS NOT THE OFFICIAL DUCATI WEBSITE, <br />
          THIS WAS CREATED AS A PERSONAL PROJECT <br /><br />
          DEV: DON MATTHEW DELOS ANGELES
        </p>

        <a
          href="https://www.ducati.com/ww/en/home"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-red-600 px-6 py-3 rounded hover:bg-black hover:text-red-600 transition"
        >
          OFFICIAL DUCATI WEBSITE
        </a>
      </div>

    </section>
  );
}
