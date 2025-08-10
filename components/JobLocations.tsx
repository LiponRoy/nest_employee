"use client";

import Image from "next/image";
import Slider from "react-slick";

const locations = [
  { name: "Dhaka", img: "/division/1.jpg" },
  { name: "Barishal", img: "/division/3.jpg" },
  { name: "Khulna", img: "/division/4.jpg" },
  { name: "Chattogram", img: "/division/2.jpg" },
  { name: "Rajshahi", img: "/division/6.jpg" },
  { name: "Rangpur", img: "/division/5.jpg" },
  { name: "Sylhet", img: "/division/7.jpg" },
];

export default function JobLocationsSlider() {
  const settings = {
    dots: false,
    infinite: true, // ✅ Infinite loop
    autoplay: true, // ✅ Optional autoplay
    autoplaySpeed: 2500,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      {/* Title */}
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Recent Job Circular By Locations
        </h2>
        <p className="text-gray-600">
          Find job opportunities in your suitable location
        </p>
      </div>

      {/* Slider */}
      <Slider {...settings}>
        {locations.map((loc) => (
          <div key={loc.name} className="px-2">
            <div className="rounded-xl overflow-hidden shadow-md relative w-[300px] h-[250px] flex justify-center items-center">
              <Image
                src={loc.img}
                alt={loc.name}
                width={300}
                height={200}
                className="object-cover w-full h-44"
              />
              <div className="absolute bottom-0 left-0 w-full bg-black/40 py-2 text-center">
                <p className="text-white font-medium">{loc.name}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}
