export default function Dealership() {
  return (
    <section
      className="dealerships relative py-16 px-6 md:px-12 text-white"
      id="dealer"
    >
      {/* ------------------ Semi-transparent Background Overlay ------------------ */}
      <div
        className="absolute inset-0 bg-black/50"
        style={{
          backgroundImage: "url('/assets/dealership.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 0,
        }}
      ></div>

      {/* ------------------ Content ------------------ */}
      <div className="relative z-10 text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">DEALERSHIP LOCATIONS</h1>
        <h2 className="text-lg md:text-xl text-gray-300">
          FIND THE NEAREST DUCATI DEALER IN THE PHILIPPINES
        </h2>
      </div>

      {/* ------------------ Map Card ------------------ */}
      <div className="relative z-10 flex justify-center">
        <div className="w-full md:w-3/4 lg:w-2/3 aspect-video rounded-xl shadow-2xl overflow-hidden border border-red-600 hover:scale-105 transition-transform duration-500 bg-white/10 backdrop-blur-sm">
          <iframe
            title="Ducati Philippines Dealers"
            src="https://maps.google.com/maps?width=1200&amp;height=720&amp;hl=en&amp;q=ducati philippines&amp;t=&amp;z=6&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="no"
            className="w-full h-full"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* ------------------ Footer Overlay ------------------ */}
      <div className="relative z-10 text-center mt-4 text-gray-400 text-sm md:text-base">
        Powered by Google Maps
      </div>
    </section>
  );
}
