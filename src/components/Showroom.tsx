"use client";

import Image from "next/image";
import type { Dispatch, SetStateAction } from "react";
import MotorcycleModal from "./MotorcycleModal";

type TechSpecs = Record<string, string>;

export interface Bike {
  name: string;
  price: string;
  image: string;
  video: string;
  block: string;
  techSpecs: TechSpecs;
}

interface ShowroomProps {
  selectedBike: Bike | null;
  setSelectedBike: Dispatch<SetStateAction<Bike | null>>;
}

export default function Showroom({ selectedBike, setSelectedBike }: ShowroomProps) {

  const bikes: Bike[] = [
    {
      name: "Streetfighter V4",
      price: "₱2,640,000.00",
      image: "/assets/streetfighter.png",
      video: "/assets/streetfighter-new.mp4",
      block: "/assets/streetfighter-block.png",
      techSpecs: {
        "Displacement": "998 cc (60,9 cu in)",
        "Power": "218 hp (160,3 kW) @ 15.750 rpm",
        "Torque": "114,5 Nm (11,7 kgm, 84 lb ft) @ 12.000 rpm",
        "Wet weight no fuel": "186,5 kg (411 lb)",
        "Seat Height": "855 mm (33.7 in)",
        "Warranty": "24 months, unlimited mileage"
      }
    },
    {
      name: "Panigale V4 R",
      price: "₱3,299,000",
      image: "/assets/panigale1.jpg",
      video: "/assets/hero_1918.mp4",
      block: "/assets/panigale-block.png",
      techSpecs: {
        "Displacement": "998 cc (60,9 cu in)",
        "Power": "234 hp (173,9 kW) @ 15.500 rpm",
        "Torque": "128 Nm (12,8 kgm, 94 lb ft) @ 11.500 rpm",
        "Wet weight no fuel": "193 kg (425 lb)",
        "Seat Height": "845 mm (33.3 in)",
        "Warranty": "24 months, unlimited mileage"
      }
    },
    {
      name: "Monster",
      price: "₱1,225,000",
      image: "/assets/monster.png",
      video: "/assets/monster-new.mp4",
      block: "/assets/monster-block.png",
      techSpecs: {
        "Displacement": "890 cc (54,3 cu in)",
        "Power": "111 hp (81,6 kW) @ 9.000 rpm",
        "Torque": "91,1 Nm (9,3 kgm, 67 lb ft) @ 7.250 rpm",
        "Wet weight no fuel": "175 kg (386 lb)",
        "Seat Height": "815 mm (32.1 in)",
        "Warranty": "24 months, unlimited mileage"
      }
    },
    {
      name: "MultiStrada V4",
      price: "₱1,225,000",
      image: "/assets/multistrada.png",
      video: "/assets/multistrada.mp4",
      block: "/assets/multistrada-block.png",
      techSpecs: {
        "Displacement": "1,158 cc (71 cu in)",
        "Power": "125 kW (170 hp) @ 10,750 rpm",
        "Torque": "124 Nm (12,6 kgm) @ 9,000 rpm",
        "Wet weight no fuel": "229 kg (505 lb)",
        "Seat Height": "Adjustable, 840 mm - 860 mm (33.1 in - 33.9 in)",
        "Warranty": "24 months, unlimited mileage"
      }
    },
    {
      name: "Diavel",
      price: "₱1,700,000",
      image: "/assets/diavel.png",
      video: "/assets/diavel-video.mp4",
      block: "/assets/diavel-block.png",
      techSpecs: {
        "Displacement": "890 cc (54,3 cu in)",
        "Power": "120,4 hp (88,5 kW) @ 10.750 rpm",
        "Torque": "94 Nm (9,6 kgm, 69 lb ft) @ 8.250 rpm",
        "Wet weight no fuel": "180 kg (397 lb)",
        "Seat Height": "880 mm (34,6 in)",
        "Warranty": "24 months, unlimited mileage"
      }
    },
    {
      name: "Hypermotard V2",
      price: "₱2,175,000",
      image: "/assets/hypermotard.png",
      video: "/assets/hypermotard-video.mp4",
      block: "/assets/hypermotard-block.png",
      techSpecs: {
        "Displacement": "1,158 cc (71 cu in)",
        "Power": "168 hp (124 kW) @ 10,750 rpm",
        "Torque": "12.8 kgm (126 Nm, 93 lb ft) @ 7,500 rpm",
        "Wet weight no fuel": "211 kg (465 lb)",
        "Seat Height": "790 mm (31.1 in)",
        "Warranty": "24 months, unlimited mileage"
      }
    },
  ];

  return (
    <section
      id="showroom"
      className="min-h-[100svh] md:min-h-screen bg-cover bg-center text-white py-20"
      style={{
        backgroundImage:
          "linear-gradient(rgba(4,9,30,0.7), rgba(4,9,30,0.7)), url('/assets/facilities.jpg')",
      }}
    >
      <h1 className="text-4xl text-center mb-12 font-bold">
        DUCATI SHOWROOM
      </h1>
      <h1 className="text-4xl text-center mb-12">
        BEST SELLING MODELS IN THE PHILIPPINES
      </h1>

      <div className="flex flex-wrap justify-center gap-8 px-6">
        {bikes.map((bike, index) => (
          <div
            key={index}
            className="w-72 md:hover:scale-105 transition cursor-pointer will-change-transform"
            onClick={() => setSelectedBike(bike)}
          >
            <div className="relative w-full h-64 rounded-lg shadow-lg overflow-hidden">
              <Image src={bike.image} alt={bike.name} fill className="object-cover" />
            </div>
            <h2 className="text-center mt-4 text-lg font-semibold">{bike.name}</h2>
          </div>
        ))}
      </div>

      <MotorcycleModal
        isOpen={!!selectedBike}
        onClose={() => setSelectedBike(null)}
        title={selectedBike?.name || ""}
        price={selectedBike?.price || ""}
        video={selectedBike?.video || ""}
        block={selectedBike?.block || ""}
        techSpecs={selectedBike?.techSpecs || null}
      />
    </section>
  );
}
