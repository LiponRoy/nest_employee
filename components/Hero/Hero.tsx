"use client";
import React from "react";
import SearchBar from "./SearchBar";
import GeneralInfo from "../Home/GeneralInfo";
import ScrollAnimatedWrapper from "../GSAP/ScrollAnimatedWrapper ";

const Hero = () => {
  return (
    // <div className="h-screen w-full bg-white-creamy">
    //     <div className='h-full w-full flex flex-col justify-center items-center gap-y-4'>
    //         <span className='text-4xl font-medium text-heading-text'>Find Nearby Jobs <span className='text-bright-blue'>Web Designer.</span></span>
    //         <span className='text-para-text'>It is a Long Established Fact That a Reader Will be Distracted by The Readable.</span>
    //         <SearchBar />
    //     </div>
    // </div>
    <section
      className="relative h-[50vh] flex items-center justify-start bg-cover bg-center"
      style={{ backgroundImage: "url(/hero-bg.jpg)" }}
    >
      <div className="absolute inset-0 bg-primary-2 bg-opacity-80"></div>
      <div className="relative z-20 h-full w-full flex flex-col justify-center items-center gap-y-6 mx-10">
        <span className="text-4xl font-medium text-white-creamy text-white p-2 rounded-md">
          Find Nearby Jobs <span className="text-secondary-1">From Here.</span>
        </span>
        <span className=" text-white">
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
