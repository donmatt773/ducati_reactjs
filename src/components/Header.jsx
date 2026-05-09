import { useState, useEffect, useRef } from "react";

export default function Header() {
  const videos = [
    "/src/assets/streetvideo.mp4",
    "/src/assets/multistrada.mp4",
    "/src/assets/hero_1918.mp4",
    "/src/assets/monster-new.mp4",
    "/src/assets/diavel-video.mp4",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(false);

  const currentRef = useRef(null);
  const nextRef = useRef(null);

  const CROSSFADE_DURATION = 100; // fade duration in ms

  // Preload all videos
  useEffect(() => {
    videos.forEach((src) => {
      const video = document.createElement("video");
      video.src = src;
      video.preload = "auto";
    });
  }, [videos]);

  // Handle video end to switch to the next
  useEffect(() => {
    const currentVideo = currentRef.current;
    if (!currentVideo) return;

    currentVideo.currentTime = 0;
    currentVideo.play();

    const handleEnded = () => {
      setFade(true); // start crossfade
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % videos.length);
        setFade(false);

        if (nextRef.current) {
          nextRef.current.currentTime = 0;
          nextRef.current.play();
        }
        currentVideo.pause();
        currentVideo.currentTime = 0;
      }, CROSSFADE_DURATION);
    };

    currentVideo.addEventListener("ended", handleEnded);

    return () => currentVideo.removeEventListener("ended", handleEnded);
  }, [currentIndex, videos.length]);

  return (
    <section className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden">
      {/* Current Video */}
      <video
        ref={currentRef}
        key={currentIndex}
        autoPlay
        muted
        loop={false}
        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
          fade ? "opacity-0" : "opacity-100"
        } animate-zoom`}
      >
        <source src={videos[currentIndex]} type="video/mp4" />
      </video>

      {/* Next Video (for crossfade) */}
      <video
        ref={nextRef}
        key={(currentIndex + 1) % videos.length}
        autoPlay
        muted
        loop={false}
        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
          fade ? "opacity-100" : "opacity-0"
        } animate-zoom`}
      >
        <source src={videos[(currentIndex + 1) % videos.length]} type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/70"></div>

      {/* Content */}
      <div className="relative max-w-3xl px-6">
        <h1 className="text-5xl font-bold mb-6">World's Best Superbikes</h1>

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

      {/* Zoom Animation */}
      <style jsx>{`
        @keyframes zoom {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        .animate-zoom {
          animation: zoom 20s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
