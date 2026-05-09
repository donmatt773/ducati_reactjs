import { useState, useEffect } from "react";

export default function BackToTop({ hide = false }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggle = () => setVisible(window.scrollY > 200);
    window.addEventListener("scroll", toggle);
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
