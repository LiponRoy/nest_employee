import React from "react";
import { GeneralInfoData } from "@/constant/Constant";
import CountUp from "react-countup";

const GeneralInfo = () => {
  return (
    <div className=" mx-auto py-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-6">
        {GeneralInfoData.map((item, index) => (
          <div
            key={index}
            className="bg-white bg-opacity-10 backdrop-blur-md border border-white/20 rounded-md shadow-md p-2 md:p-4 flex items-center gap-4 text-white hover:shadow-lg transition duration-300 ease-in-out"
          >
            <div className="hidden md:flex text-4xl">{item.icon}</div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-semibold">
                <CountUp start={0} end={item.quantity} duration={2} separator="," />
              </span>
              <span className="text-[10px] md:text-sm font-light">{item.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeneralInfo;
