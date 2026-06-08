"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const nextSticky = window.scrollY > 20;
      setSticky((prevSticky) => (prevSticky === nextSticky ? prevSticky : nextSticky));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        sticky ? "bg-red-600" : "bg-[#1b1b1b]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center py-4">
        
        {/* LOGO */}
        <Image
          src="/assets/logo-small.png"
          width={48}
          height={48}
          className="w-12 h-12 cursor-pointer"
          alt="Logo"
        />

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex gap-8 text-white font-medium">
          <li className="hover:text-red-300 transition-colors">
            <a href="#">HOME</a>
          </li>
          <li className="hover:text-red-300 transition-colors">
            <a href="#showroom">SHOWROOM</a>
          </li>
          <li className="hover:text-red-300 transition-colors">
            <a href="#servicearea">SERVICES</a>
          </li>
          <li className="hover:text-red-300 transition-colors">
            <a href="#dealer">DEALERSHIP</a>
          </li>
        </ul>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden text-white text-2xl z-50"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`fixed top-0 left-0 w-full h-[100svh] bg-black flex flex-col items-center justify-center text-white text-xl gap-8 transition-transform duration-300 md:hidden transition-smooth ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <a href="#" onClick={() => setMenuOpen(false)}>HOME</a>
        <a href="#showroom" onClick={() => setMenuOpen(false)}>SHOWROOM</a>
        <a href="#servicearea" onClick={() => setMenuOpen(false)}>SERVICES</a>
        <a href="#dealer" onClick={() => setMenuOpen(false)}>DEALERSHIP</a>
      </div>
    </nav>
  );
}
