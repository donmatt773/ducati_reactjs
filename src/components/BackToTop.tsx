"use client";

import { useState, useEffect } from "react";

interface BackToTopProps {
  hide?: boolean;
}

export default function BackToTop({ hide = false }: BackToTopProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggle = () => {
      const nextVisible = window.scrollY > 200;
      setVisible((prevVisible) => (prevVisible === nextVisible ? prevVisible : nextVisible));
    };

    window.addEventListener("scroll", toggle, { passive: true });
    return () => window.removeEventListener("scroll", toggle);
  }, []);

  // Do not show if user hasn't scrolled or modal is open
  if (!visible || hide) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="hidden md:block sm fixed bottom-5 right-5 z-10000 bg-red-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-black transition-colors duration-500"
    >
      Back To Top
    </button>
  );
}
