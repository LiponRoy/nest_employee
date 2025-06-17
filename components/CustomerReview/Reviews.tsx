
import Marquee from "react-fast-marquee";
import { customerReviewsData, ICustomerReview } from "./ReviewData";
import { BriefcaseBusiness } from 'lucide-react';



const Reviews = () => {
  const randomItems = customerReviewsData
    .sort(() => 0.5 - Math.random())
    .slice(0, customerReviewsData.length);
  return (
    <div className="pt-[20px] container-custom">
       <div className="w-full flex flex-col justify-start items-start my-6 bg-slate-100 p-2">
        <span className=" text-[24px] md:text-[32px] font-medium">Customer <span className="text-primary-1">Review</span></span>
      </div>
      <Marquee
        pauseOnHover={true}
        speed={50}
        gradient={false}
        play={true}
        // direction={direction}
        className="pb-[44px] "
      >
        {randomItems.map((review:ICustomerReview, i) => (
          <div
          key={i}
          className="w-[320px] md:w-[400px] h-[250px] m-2  bg-white shadow-md rounded-2xl p-6 border hover:shadow-lg transition-shadow"
        >
          <BriefcaseBusiness size={32} className="mb-2"/>
          <p className="text-gray-700 mb-4 pr-8 text-[18px]">{review.reviewText}</p>
          <h3 className="text-lg font-semibold text-gray-800">{review.name}</h3>
          <p className="text-sm text-gray-500">{review.jobRoleSearched}</p>
        </div>
        ))}
      </Marquee>
    </div>
  );
};

export default Reviews;

