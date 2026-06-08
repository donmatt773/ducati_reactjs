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
  const [fade, setFade] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const currentRef = useRef<HTMLVideoElement | null>(null);
  const nextRef = useRef<HTMLVideoElement | null>(null);

  const CROSSFADE_DURATION = 100; // fade duration in ms

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

  // Preload all videos
  useEffect(() => {
    if (isMobile) return;

    videos.forEach((src) => {
      const video = document.createElement("video");
      video.src = src;
      video.preload = "auto";
    });
  }, [isMobile]);

  // Handle video end to switch to the next
  useEffect(() => {
    if (isMobile) return;

    const currentVideo = currentRef.current;
    if (!currentVideo) return;

    currentVideo.currentTime = 0;
    safePlay(currentVideo);

    const handleEnded = () => {
      setFade(true); // start crossfade
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % videos.length);
        setFade(false);

        if (nextRef.current) {
          nextRef.current.currentTime = 0;
          safePlay(nextRef.current);
        }
        currentVideo.pause();
        currentVideo.currentTime = 0;
      }, CROSSFADE_DURATION);
    };

    currentVideo.addEventListener("ended", handleEnded);

    return () => currentVideo.removeEventListener("ended", handleEnded);
  }, [currentIndex, isMobile]);

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
        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
          fade ? "opacity-0" : "opacity-100"
        } ${isMobile ? "" : "animate-zoom"}`}
      >
        <source src={videos[isMobile ? 0 : currentIndex]} type="video/mp4" />
      </video>

      {/* Next Video (for crossfade) */}
      {!isMobile && (
        <video
          ref={nextRef}
          key={(currentIndex + 1) % videos.length}
          autoPlay
          muted
          playsInline
          loop={false}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
            fade ? "opacity-100" : "opacity-0"
          } animate-zoom`}
        >
          <source src={videos[(currentIndex + 1) % videos.length]} type="video/mp4" />
        </video>
      )}

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
