import React from "react";
import { GeneralInfoData } from "@/constant/Constant";

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
                {value.quantity}
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




// import Marquee from "react-fast-marquee";
// import ReviewsCard from "./ReviewsCard";
// import { reviewsData } from "./ReviewConstant";

// const ReviewsMarquee = () => {
//   const randomItems = reviewsData
//     .sort(() => 0.5 - Math.random())
//     .slice(0, reviewsData.length);
//   return (
//     <div className="pt-[20px] container-custom">
//       <h2 className="text-center text-[32px] md:text-[48px] font-semibold mb-1">
//         Customer <span className="text-[#146B83]">Review</span>
//       </h2>
//       <Marquee
//         pauseOnHover={true}
//         speed={50}
//         gradient={false}
//         play={true}
//         // direction={direction}
//         className="pb-[44px]"
//       >
//         {randomItems.map((review, index) => (
//           <ReviewsCard key={index} {...review} />
//         ))}
//       </Marquee>
//     </div>
//   );
// };

// export default ReviewsMarquee;

