"use client";

import Image from "next/image";
import { Fragment, useEffect, type FormEvent } from "react";

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
  // Handle page scroll lock while modal is open
  useEffect(() => {
    if (isOpen) {
      // Stop background scrolling while the modal is open.
      document.body.style.overflow = "hidden";
    } else {
      // Restore background scrolling when closing
      document.body.style.overflow = "auto";
    }

    return undefined;
  }, [isOpen]);

  // Cleanup in case modal unmounts
  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  if (!isOpen) return null;

  return (
    // ------------------ Overlay ------------------
    <div
      className={`fixed inset-0 flex items-center justify-center z-50
                  bg-black/0 md:bg-black/70 backdrop-blur-sm transition-all duration-300
                  ${isOpen ? "bg-black/70 opacity-100" : "bg-black/0 opacity-0"}`}
      onClick={onClose} // click outside closes modal
    >
      {/* ------------------ Modal Box ------------------ */}
      <div
        className={`bg-white w-11/12 sm:w-10/12 md:w-full md:max-w-[1100px] lg:max-w-[1200px] rounded-lg relative flex flex-col
                    md:grid md:grid-cols-[1fr_1.1fr_1fr] lg:grid-cols-[1fr_1.2fr_1fr] xl:grid-cols-[0.95fr_1.2fr_1fr]
                    h-[92dvh] md:h-auto max-h-[92dvh] md:max-h-full overflow-hidden transform transition-all duration-300
                    ${isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
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
                      ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
        >
          {/* Video */}
          {video && (
            <video autoPlay muted loop playsInline className="w-full rounded h-full md:h-full md:min-h-[420px] object-cover">
              <source src={video} type="video/mp4" />
            </video>
          )}
        </div>

        {/* ------------------ COLUMN 2 (Details) ------------------ */}
        <div
          className={`w-full px-3 py-2 md:p-4 flex-1 min-h-0 md:min-h-auto
                      overflow-y-auto md:overflow-hidden transition-all duration-500 ease-out
                      ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
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
                    <span className="font-semibold p-0.5 md:p-1 rounded hover:bg-gray-100 transition">{key}</span>
                    <span className="p-0.5 md:p-1 rounded hover:bg-gray-100 transition">{value}</span>
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
                      ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
        >
          {/* Image Wrapper */}
          <div className="grid grid-rows-[1.05fr_0.95fr] w-full h-full gap-0 md:gap-2 justify-items-center items-center">
            {/* Original block image */}
            {block && (
              <div className="relative w-full max-w-[300px] sm:max-w-[360px] md:max-w-full h-full min-h-[100px] sm:min-h-[120px] md:min-h-[210px] lg:min-h-[240px]">
                <Image
                  src={block}
                  alt={title}
                  fill
                  sizes="(max-width: 640px) 64vw, (max-width: 1024px) 42vw, 33vw"
                  className="object-contain object-center scale-110 sm:scale-115 md:scale-100 lg:scale-105 hover:scale-[1.12] transition duration-300"
                />
              </div>
            )}

            {/* Flipped duplicate below */}
            {block && (
              <div className="relative w-full max-w-[280px] sm:max-w-[340px] md:max-w-full h-full min-h-[90px] sm:min-h-[110px] md:min-h-[190px] lg:min-h-[220px] overflow-hidden -scale-x-100">
                <Image
                  src={block}
                  alt={`${title} flipped`}
                  fill
                  sizes="(max-width: 640px) 60vw, (max-width: 1024px) 40vw, 32vw"
                  className={`object-contain object-center scale-105 sm:scale-110 md:scale-95 lg:scale-100 opacity-50 sm:opacity-70
                             drop-shadow-[0_4px_4px_rgba(0,0,0,0.2)] transition-all duration-500 delay-150`}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

