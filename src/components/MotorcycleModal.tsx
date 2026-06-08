"use client";

import Image from "next/image";
import { Fragment, useEffect, useState, type FormEvent } from "react";

function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-gray-300 rounded ${className}`} />
  );
}

function ModalVideo({ src }: { src: string }) {
  const [loading, setLoading] = useState(true);
  return (
    <div className="relative w-full h-full md:min-h-[420px]">
      {loading && <Skeleton className="absolute inset-0 w-full h-full rounded bg-gray-700" />}
      <video
        autoPlay
        muted
        loop
        playsInline
        onCanPlay={() => setLoading(false)}
        className={`w-full rounded h-full object-cover transition-opacity duration-300 ${loading ? "opacity-0" : "opacity-100"}`}
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}

function ModalImage({ src, alt, className }: { src: string; alt: string; className: string }) {
  const [loading, setLoading] = useState(true);
  return (
    <>
      {loading && <Skeleton className="absolute inset-0 w-full h-full" />}
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 64vw, (max-width: 1024px) 42vw, 33vw"
        onLoad={() => setLoading(false)}
        className={`${className} transition-opacity duration-300 ${loading ? "opacity-0" : "opacity-100"}`}
      />
    </>
  );
}

interface MotorcycleModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  price: string;
  video: string;
  block: string;
  techSpecs: Record<string, string> | null;
}

export default function MotorcycleModal({
  isOpen,
  onClose,
  title,
  price,
  video,
  block,
  techSpecs,
}: MotorcycleModalProps) {
  if (!isOpen) return null;
  return <MotorcycleModalContent {...{ onClose, title, price, video, block, techSpecs }} />;
}

function MotorcycleModalContent({
  onClose,
  title,
  price,
  video,
  block,
  techSpecs,
}: Omit<MotorcycleModalProps, "isOpen">) {
  const [lockedHeight] = useState(() =>
    typeof window !== "undefined" ? Math.round(window.innerHeight * 0.92) : null
  );
  const mobileModalHeight = lockedHeight;

  // Lock body scroll while modal is open; restore on unmount
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    // ------------------ Overlay ------------------
    <div
      className={`fixed inset-0 flex items-center justify-center z-50
                  bg-black/70 opacity-100 backdrop-blur-sm`}
      style={{ touchAction: "none" }}
      onTouchMove={(e) => e.preventDefault()}
      onClick={onClose} // click outside closes modal
    >
      {/* ------------------ Modal Box ------------------ */}
      <div
        className={`bg-white w-11/12 sm:w-10/12 md:w-full md:max-w-[1100px] lg:max-w-[1200px] rounded-lg relative flex flex-col
                    md:grid md:grid-cols-[1fr_1.1fr_1fr] lg:grid-cols-[1fr_1.2fr_1fr] xl:grid-cols-[0.95fr_1.2fr_1fr]
                    md:h-auto md:max-h-full overflow-hidden transform transition-all duration-300
                    overscroll-contain
                    scale-100 opacity-100`}
        style={mobileModalHeight ? { height: mobileModalHeight, maxHeight: mobileModalHeight } : undefined}
        onClick={(e) => e.stopPropagation()} // prevent outside click from closing
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="text-black absolute top-2 right-2 z-30 w-9 h-9 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-red-600 hover:text-white transition-all duration-300 cursor-pointer"
        >
          ✕
        </button>

        {/* ------------------ COLUMN 1 (Video) ------------------ */}
        <div
          className={`w-full px-3 py-2 md:p-4 bg-black shrink-0 h-[120px] sm:h-[160px] md:h-auto
                      overflow-hidden transition-all duration-500 ease-out
                      opacity-100 translate-y-0`}
        >
          {/* Video */}
          {video && <ModalVideo key={video} src={video} />}
        </div>

        {/* ------------------ COLUMN 2 (Details) ------------------ */}
        <div
          className={`w-full px-3 py-2 md:p-4 flex-1 min-h-0 md:min-h-auto
                      overflow-y-auto md:overflow-hidden transition-all duration-500 ease-out
                      opacity-100 translate-y-0`}
          style={{ touchAction: "pan-y" }}
          onTouchMove={(e) => e.stopPropagation()}
        >
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-black leading-tight">{title}</h2>
          <p className="text-red-600 font-semibold mb-2 md:mb-4 text-sm md:text-base">{price}</p>

          {/* Tech Specs */}
          {techSpecs && Object.keys(techSpecs).length > 0 && (
            <div className="mb-2 md:mb-4 text-black">
              <h3 className="text-base md:text-xl font-semibold mb-1 md:mb-2">Tech Spec</h3>
              <div className="grid grid-cols-2 gap-x-2 md:gap-x-4 gap-y-0.5 md:gap-y-1 text-[11px] sm:text-xs md:text-sm leading-tight">
                {Object.entries(techSpecs).map(([key, value]) => (
                  <Fragment key={key}>
                    <span className="font-semibold p-0.5 md:p-1 rounded md:hover:bg-gray-100 transition">{key}</span>
                    <span className="p-0.5 md:p-1 rounded md:hover:bg-gray-100 transition">{value}</span>
                  </Fragment>
                ))}
              </div>
            </div>
          )}

          {/* Instruction text */}
          <p className="text-xs md:text-sm text-black mb-1 md:mb-2">
            Fill in your email address to request a reservation
          </p>

          {/* Email form */}
          <form
            className="text-black flex bg-gray-100 rounded overflow-hidden mb-2 md:mb-4"
            onSubmit={(event: FormEvent<HTMLFormElement>) => event.preventDefault()}
          >
            <input
              type="email"
              placeholder="Email Address"
              className="flex-1 p-1.5 md:p-2 bg-transparent outline-none text-sm"
            />
            <button
              type="submit"
              className="bg-red-600 text-white px-3 md:px-4 text-xs md:text-sm hover:bg-black transition"
            >
              REQUEST
            </button>
          </form>
        </div>

        {/* ------------------ COLUMN 3 (Images) ------------------ */}
        <div
          className={`w-full bg-gray-100 flex flex-col items-center md:justify-center px-3 pt-2 pb-1 md:p-4 md:pb-2 shrink-0 h-[230px] sm:h-[260px] md:h-auto
                      overflow-hidden transition-all duration-500 ease-out
                      opacity-100 translate-y-0`}
        >
          {/* Image Wrapper */}
          <div className="grid grid-rows-[1.05fr_0.95fr] w-full h-full gap-0 md:gap-2 justify-items-center items-center">
            {/* Original block image */}
            {block && (
              <div className="relative w-full max-w-[300px] sm:max-w-[360px] md:max-w-full h-full min-h-[100px] sm:min-h-[120px] md:min-h-[210px] lg:min-h-[240px]">
                <ModalImage
                  key={block}
                  src={block}
                  alt={title}
                  className="object-contain object-center scale-110 sm:scale-115 md:scale-100 lg:scale-105 md:hover:scale-[1.12] will-change-transform"
                />
              </div>
            )}

            {/* Flipped duplicate below */}
            {block && (
              <div className="relative w-full max-w-[280px] sm:max-w-[340px] md:max-w-full h-full min-h-[90px] sm:min-h-[110px] md:min-h-[190px] lg:min-h-[220px] overflow-hidden -scale-x-100">
                <ModalImage
                  key={`${block}-flip`}
                  src={block}
                  alt={`${title} flipped`}
                  className="object-contain object-center scale-105 sm:scale-110 md:scale-95 lg:scale-100 opacity-50 sm:opacity-70 drop-shadow-[0_4px_4px_rgba(0,0,0,0.2)]"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

