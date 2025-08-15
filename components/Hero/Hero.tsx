"use client";
import React from "react";
import GeneralInfo from "../Home/GeneralInfo";
import ScrollAnimatedWrapper from "../GSAP/ScrollAnimatedWrapper ";
import HeroRightSlider from "./HeroRightSlider";
import TabbedSearchBox from "./TabbedSearchBox";

const Hero = () => {
    return (
        <section
            className="container-custom relative h-[ 40vh] md:h-[60vh] flex items-start justify-start bg-cover bg-center bg-red-500"
            style={{ backgroundImage: "url(/hero-bg.jpg)" }}
        >
            <div className="absolute inset-0 gradient-animation bg-opacity-60"></div>
            <div className="relative z-20 h-full w-full flex justify-between items-center gap-y-6  pt-6 md:pt-0 ">
                <div className="w-full md:w-[65%] flex flex-col justify-center items-center mb-8 md:gap-y-2">
                    <span className="text-white text-[18px] md:text-[24px] font-semibold mb-2 md:mb-0">
                        {" "}
                        Discover Your Dream
                        <span className="text-[24px] md:text-[38px] text-secondary-1 mx-1">
                            Job
                        </span>
                        .
                    </span>
                    {/* <h4>
                        <span className="hidden md:block text-white text-[18px] mb-2">
                            It is a Long Established Fact That a Reader Will be
                            Distracted by The Readable.
                        </span>
                    </h4> */}
                    {/* <SearchBar />
                    <SearchByAnything/> */}
                    <TabbedSearchBox/>
                </div>
                <div className="hidden md:flex">
                    <HeroRightSlider />
                </div>
                <div className="absolute -bottom-12 w-full hidden md:block">
                    <ScrollAnimatedWrapper>
                        <GeneralInfo />
                    </ScrollAnimatedWrapper>
                </div>
            </div>
        </section>
    );
};

export default Hero;
