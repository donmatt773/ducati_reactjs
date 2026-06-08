import Image from "next/image";
import { FaFacebookF, FaYoutube, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#1b1b1b] text-gray-400 text-center py-12 px-6">
      
      {/* Top Image */}
      <Image
        src="/assets/footer.svg"
        alt="Footer Design"
        width={1200}
        height={200}
        className="w-1/2 mx-auto mb-8"
      />

      {/* Footer Links */}
      <div className="mb-8">
        <ul className="flex flex-wrap justify-center gap-6 text-sm">
          <li>
            <a
              href="https://my.ducati.com/ww/en/footer/terms-of-use"
              className="hover:text-red-600 transition"
            >
              TERMS OF USE
            </a>
          </li>
          <li>
            <a
              href="https://www.ducati.com/ww/en/home/privacy"
              className="hover:text-red-600 transition"
            >
              PRIVACY INFORMATION
            </a>
          </li>
          <li>
            <a
              href="https://www.ducati.com/ww/en/home/cookie-policy"
              className="hover:text-red-600 transition"
            >
              COOKIES INFORMATION
            </a>
          </li>
        </ul>
      </div>

      {/* Copyright */}
      <p className="text-sm mb-6 hover:text-red-600 transition">
        Copyright © 2023 Ducati Motor Holding S.p.A. – 
        A Sole Shareholder Company. <br />
        A Company subject to the Management and Coordination activities of AUDI AG.
        All rights reserved.
      </p>

      {/* Social Icons */}
      <div className="flex justify-center gap-6 text-xl">
        <a href="https://www.facebook.com/Ducati" className="hover:text-red-600 transition">
          <FaFacebookF />
        </a>
        <a href="https://www.youtube.com/@ducati" className="hover:text-red-600 transition">
          <FaYoutube />
        </a>
        <a href="https://www.instagram.com/ducati/?hl=en" className="hover:text-red-600 transition">
          <FaInstagram />
        </a>
        <a href="https://twitter.com/DucatiMotor" className="hover:text-red-600 transition">
          <FaTwitter />
        </a>
        <a href="https://www.linkedin.com/company/ducati-philippines" className="hover:text-red-600 transition">
          <FaLinkedinIn />
        </a>
      </div>
    </footer>
  );
}
