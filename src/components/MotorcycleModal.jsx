import React, { useState, useEffect } from "react";

export default function MotorcycleModal({
  isOpen,
  onClose,
  title,
  price,
  video,
  block,
  techSpecs
}) {
  const [show, setShow] = useState(false);

  // Handle smooth open/close transitions and page scroll
  useEffect(() => {
    if (isOpen) {
      setShow(true);
      // Stop background scrolling on desktop
      if (window.innerWidth >= 768) {
        document.body.style.overflow = "hidden";
      }
    } else {
      // Restore background scrolling when closing
      document.body.style.overflow = "auto";

      const timeout = setTimeout(() => setShow(false), 300); // match transition duration
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  // Cleanup in case modal unmounts
  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  if (!show) return null;

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
        className={`bg-white w-11/12 sm:w-10/12 md:w-full md:max-w-[700px] rounded-lg relative flex flex-col md:flex-row
                    max-h-[90vh] md:max-h-full transform transition-all duration-300
                    ${isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
        onClick={(e) => e.stopPropagation()} // prevent outside click from closing
      >
        {/* ------------------ LEFT SIDE ------------------ */}
        <div
          className={`w-full md:w-1/2 px-3 py-2 md:p-4
                      overflow-y-auto md:overflow-y-visible transition-all duration-500 ease-out
                      ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
        >
          {/* Fade indicators for mobile scroll */}
          <div className="absolute top-0 left-0 w-full h-6 bg-gradient-to-b from-white pointer-events-none z-10 md:hidden"></div>
          <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-white pointer-events-none z-10 md:hidden"></div>

          {/* Video */}
          {video && (
            <video autoPlay muted loop className="w-full rounded mb-4 max-h-[140px] md:max-h-[250px]">
              <source src={video} type="video/mp4" />
            </video>
          )}

          {/* Title & Price */}
          <h2 className="text-2xl font-bold text-black">{title}</h2>
          <p className="text-red-600 font-semibold mb-4">{price}</p>

          {/* Tech Specs */}
          {techSpecs && Object.keys(techSpecs).length > 0 && (
            <div className="mb-4 text-black">
              <h3 className="text-xl font-semibold mb-2">Tech Spec</h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                {Object.entries(techSpecs).map(([key, value]) => (
                  <React.Fragment key={key}>
                    <span className="font-semibold p-1 rounded hover:bg-gray-100 transition">{key}</span>
                    <span className="p-1 rounded hover:bg-gray-100 transition">{value}</span>
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}

          {/* Instruction text */}
          <p className="text-sm text-black mb-2">
            Fill in your email address to request a reservation
          </p>

          {/* Email form */}
          <form className="text-black flex bg-gray-100 rounded overflow-hidden mb-4">
            <input
              type="email"
              placeholder="Email Address"
              className="flex-1 p-2 bg-transparent outline-none"
            />
            <button
              type="submit"
              className="bg-red-600 text-white px-4 hover:bg-black transition"
            >
              REQUEST
            </button>
          </form>
        </div>

        {/* ------------------ RIGHT SIDE (Images) ------------------ */}
        <div
          className={`w-full md:w-1/2 bg-gray-100 flex flex-col items-center md:justify-center px-3 py-2 md:p-4
                      overflow-y-auto md:overflow-y-visible transition-all duration-500 ease-out
                      ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
        >
          {/* Mobile fade indicators */}
          <div className="absolute top-0 left-0 w-full h-6 bg-gradient-to-b from-gray-100 pointer-events-none z-10 md:hidden"></div>
          <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-gray-100 pointer-events-none z-10 md:hidden"></div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="text-black absolute top-2 right-2 w-9 h-9 flex items-center justify-center 
                       bg-white rounded-full shadow-md 
                       hover:bg-red-600 hover:text-white 
                       transition-all duration-300 cursor-pointer"
          >
            ✕
          </button>

          {/* Image Wrapper */}
          <div className="flex flex-col items-center justify-center w-full h-full space-y-2 md:space-y-6">
            {/* Original block image */}
            {block && (
              <img
                src={block}
                alt={title}
                className="w-full h-auto max-h-[250px] object-contain hover:scale-105 transition duration-300"
              />
            )}

            {/* Flipped duplicate below */}
            {block && (
              <img
                src={block}
                alt={`${title} flipped`}
                className={`w-full h-auto max-h-[200px] sm:max-h-[250px] object-contain
                           transform scale-x-[-1] opacity-50 sm:opacity-70 drop-shadow-[0_4px_4px_rgba(0,0,0,0.2)]
                           transition-all duration-500 delay-150`}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
  