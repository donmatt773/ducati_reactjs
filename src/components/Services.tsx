import Image from "next/image";

export default function Services() {
  const serviceItems = [
    {
      title: "MAINTENANCE",
      description:
        "More mileage, less service, to enjoy your Ducati to the fullest. We extended the intervals for all services, reaching 30,000 km for Desmo Service, and every day we train our Ducati Service staff for a better and better standard",
    },
    {
      title: "SERVICE CAMPAIGN",
      description:
        "Riding pleasure always at its best: find out about the recall campaigns plans for your motorbike",
    },
    {
      title: "DOCUMENTATION",
      description:
        "Remember that the documentation supplied with your bike contains a lot of useful information: from the specific colour code, to advice on winter care, or details about key maintenance.",
    },
  ];

  return (
    <section
      className="relative py-12 px-6 md:px-12 text-white"
      id="services"
      style={{
        backgroundImage: "url('/assets/showroom.jpg')", // your image
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <h1 id="servicearea" className="text-3xl font-bold text-center mb-8">
          DUCATI SERVICES
        </h1>

        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="md:w-1/2">
            <Image
              src="/assets/service.jpg"
              alt="Ducati maintenance"
              width={1200}
              height={800}
              className="rounded-lg object-cover w-full h-full shadow-lg"
            />
          </div>

          <div className="flex-1 grid grid-cols-1 gap-6 cursor-default">
            {serviceItems.map((item, index) => (
              <div
                key={index}
                className="p-6 bg-black/50 rounded-lg hover:bg-black/70 transition shadow-lg border border-red-600"
              >
                <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                <p className="text-gray-200">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
