
import Marquee from "react-fast-marquee";
import { customerReviewsData, ICustomerReview } from "./ReviewData";
import { BriefcaseBusiness } from 'lucide-react';



const Reviews = () => {
  const randomItems = customerReviewsData
    .sort(() => 0.5 - Math.random())
    .slice(0, customerReviewsData.length);
  return (
    <div className="pt-[40px] container-custom">
      <h2 className="text-center text-[36px] font-semibold mb-1">
        Customer <span className="text-[#146B83]">Review</span>
      </h2>
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

