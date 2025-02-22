"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { JobsCategory } from "@/constant/Constant";

const JobsCategorySlider = () => {

    return (
        <div className="max-w-4xl mx-auto ">
            <div className=" text-center">
                <h5 className="text-white  p-1 mb-6 inline-block">
                    <span className="border border-white p-2 uppercase rounded-md">Trending Jobs</span>
                </h5>

            </div>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={4}
                // navigation
                pagination={{
                    clickable: true,
                    el: ".custom-pagination", // Custom pagination class
                }}
                speed={2000}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                loop={true}
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 1 },
                    1024: { slidesPerView: 3 },
                }}
                className="pb-10"
            >
                {JobsCategory?.map((category) => (
                    <SwiperSlide key={category.id}>
                        <div className="bg-slate-900 opacity-70 rounded-lg p-2 text-center border-2 border-white cursor-pointer shadow-lg">
                            <h4 className="text-lg font-semibold text-white">{category.title}</h4>

                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Pagination Wrapper*/}
            <div className="custom-pagination flex justify-center mt-5"></div>
        </div>
    );
};

export default JobsCategorySlider;
