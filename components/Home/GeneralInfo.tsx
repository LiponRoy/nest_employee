import React from "react";
import { GeneralInfoData } from "@/constant/Constant";
import CountUp from 'react-countup';

const GeneralInfo = () => {
  return (
    <div className="w-[90%] md:w-[70%] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 bg-slate-600 text-white opacity-80  rounded-xl">
        {GeneralInfoData.map((value, i) => (
          <div
            key={i}
            className="flex justify-start items-center space-x-4 border rounded-md  pl-8 py-2"
          >
            <div className="text-2xl font-bold">{value.icon}</div>
            <div className="flex flex-col justify-start items-start">
              <span className="font-bold text-[18px] md:text-[32px]">
               
                <CountUp start={0} end={value.quantity} duration={5} separator="," />
              </span>
              <span className="font-normal text-[14px] md:text-[18px]">
                {value.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeneralInfo;

