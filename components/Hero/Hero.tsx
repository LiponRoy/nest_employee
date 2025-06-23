"use client";
import React from "react";
import SearchBar from "../searchBar/SearchBar";
import GeneralInfo from "../Home/GeneralInfo";
import ScrollAnimatedWrapper from "../GSAP/ScrollAnimatedWrapper ";

const Hero = () => {
  return (
    <section
      className="relative h-[45vh] md:h-[60vh] flex items-start justify-start bg-cover bg-center"
      style={{ backgroundImage: "url(/hero-bg.jpg)" }}
    >
      <div className="absolute inset-0 gradient-animation bg-opacity-60"></div>
      <div className="relative z-20 h-full w-full flex flex-col justify-start md:justify-center items-center gap-y-6 mx-10 pt-6 md:pt-0">
       <div className="flex flex-col md:flex-row justify-center items-center md:space-x-1">
         <span className="text-[28px] md:text-4xl font-medium text-white-creamy text-white  rounded-md">
          Find Nearby Jobs 
        </span>
        <span className="text-secondary-1 text-[28px] md:text-4xl font-medium text-white-creamy rounded-md">From Here.</span>
       </div>
        <span className="hidden md:block text-white">
          It is a Long Established Fact That a Reader Will be Distracted by The
          Readable.
        </span>
        <SearchBar />
        {/* cards */}

        <div className="absolute -bottom-12 w-full ">
          <ScrollAnimatedWrapper>
            <GeneralInfo />
          </ScrollAnimatedWrapper>
        </div>
      </div>
    </section>
  );
};

export default Hero;
