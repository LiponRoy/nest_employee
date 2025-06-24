"use client";
import React from "react";
import SearchBar from "../searchBar/SearchBar";
import GeneralInfo from "../Home/GeneralInfo";
import ScrollAnimatedWrapper from "../GSAP/ScrollAnimatedWrapper ";
import HeroRightSlider from "./HeroRightSlider";

const Hero = () => {
  return (
    <section
      className="container-custom relative h-[45vh] md:h-[60vh] flex items-start justify-start bg-cover bg-center"
      style={{ backgroundImage: "url(/hero-bg.jpg)" }}
    >
      <div className="absolute inset-0 gradient-animation bg-opacity-60"></div>
      <div className="relative z-20 h-full w-full flex flex-col justify-start items-center gap-y-6 mx-10 pt-6 md:pt-0 ">
        <div className="w-full mt-4"></div>
        <div className="hidden md:block w-[340px] h-[130px]  bg-opacity-90 backdrop-blur-sm rounded-2xl  p-4 animate-fade-in-up border border-slate-200">
          <HeroRightSlider />
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center md:space-x-1">
          <span className="text-[28px] md:text-4xl font-medium text-white-creamy text-white  rounded-md">
            Find Nearby Jobs
          </span>
          <span className="text-secondary-1 text-[28px] md:text-4xl font-medium text-white-creamy rounded-md mr-2">
            From Here.
          </span>
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

      {/* Right Content - Slider */}
      {/* <div className="absolute top-1/2 right-20 -translate-y-1/2">
        <div className="w-[340px] h-[130px]  bg-opacity-90 backdrop-blur-sm rounded-2xl shadow-2xl p-4 border border-gray-200 animate-fade-in-up">
          <HeroRightSlider />
        </div>
      </div> */}
    </section>

    //    {/* Right Content - Slider */}
    // <div className="">
    //   <div className="w-[340px] h-[200px] bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl shadow-2xl p-4 border border-gray-200 animate-fade-in-up">
    //     <HeroRightSlider />
    //   </div>
    // </div>
  );
};

export default Hero;
