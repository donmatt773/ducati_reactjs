"use client";

import { useState } from "react";
import BackToTop from "@/components/BackToTop";
import Dealership from "@/components/Dealership";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import Showroom, { type Bike } from "@/components/Showroom";

export default function HomePage() {
  const [selectedBike, setSelectedBike] = useState<Bike | null>(null);

  return (
    <>
      <Navbar />
      <Header />
      <Showroom selectedBike={selectedBike} setSelectedBike={setSelectedBike} />
      <BackToTop hide={!!selectedBike} />
      <Services />
      <Dealership />
      <Footer />
    </>
  );
}
