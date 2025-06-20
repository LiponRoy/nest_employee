import React from "react";
import { PopularCategoriesData } from "@/constant/Constant";

const PopularCategories = () => {
  return (
    <div className="container-custom mt-10 md:mt-12">
      <div className="w-full flex flex-col justify-start items-start my-6 bg-slate-100 p-2">
        <span className="text-[24px] md:text-[32px] font-medium">
          Popular Job<span className="text-primary-1 ml-2">Categories</span>
        </span>
      </div>
      <div className="grid grid-col-1 md:grid-cols-3 gap-2 md:gap-6">
        {PopularCategoriesData.map((value, i) => (
          <div
            key={i}
            className="flex justify-start items-center border border-slate-200 rounded-md hover:bg-slate-100 p-6 cursor-pointer"
          >
            <div className="w-10 h-10 bg-slate-200 rounded-md flex justify-center items-center p-2 mr-4">
              {value.icon}
            </div>
            <div className="flex flex-col justify-start items-start">
              <span className=" text-[20px] font-medium">{value.name}</span>
              <span className=" text-[16px] font-light">{value.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularCategories;
