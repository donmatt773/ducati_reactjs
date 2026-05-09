import MotorcycleModal from "./MotorcycleModal";

export default function Showroom({ selectedBike, setSelectedBike }) {

  const bikes = [
    {
      name: "Streetfighter V4",
      price: "₱2,640,000.00",
      image: "/src/assets/streetfighter.png",
      video: "/src/assets/streetfighter-new.mp4",
      block: "/src/assets/streetfighter-block.png",
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
      image: "/src/assets/panigale1.jpg",
      video: "/src/assets/hero_1918.mp4",
      block: "/src/assets/panigale-block.png",
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
      image: "/src/assets/monster.png",
      video: "/src/assets/monster-new.mp4",
      block: "/src/assets/monster-block.png",
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
      image: "/src/assets/multistrada.png",
      video: "/src/assets/multistrada.mp4",
      block: "/src/assets/multistrada-block.png",
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
      image: "/src/assets/diavel.png",
      video: "/src/assets/diavel-video.mp4",
      block: "/src/assets/diavel-block.png",
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
      image: "/src/assets/hypermotard.png",
      video: "/src/assets/hypermotard-video.mp4",
      block: "/src/assets/hypermotard-block.png",
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
      className="min-h-screen bg-cover bg-center text-white py-20"
      style={{
        backgroundImage:
          "linear-gradient(rgba(4,9,30,0.7), rgba(4,9,30,0.7)), url('/src/assets/facilities.jpg')",
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
            className="w-72 hover:scale-105 transition cursor-pointer"
            onClick={() => setSelectedBike(bike)}
          >
            <img src={bike.image} className="w-full h-64 object-cover rounded-lg shadow-lg" />
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
