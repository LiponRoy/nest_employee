import React from "react";
import { Button } from "../ui/button";
import { Waves } from "lucide-react";

const BannerForAuth = () => {
  return (
    <div
      className="relative container-custom h-[400px] md:h-[500px] bg-cover bg-center grid grid-cols-1 md:grid-cols-2 text-white"
      style={{ backgroundImage: 'url(/authBanner.jpg)' }}
    >
      {/* Ingredient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-90"></div>

      {/* Content */}
      <div className="relative z-10 flex justify-center items-center">
        <div className=" space-y-6">
           <Button className="w-60 bg-secondary-1 hover:bg-orange-600 mt-4">
            Apply For Job
          </Button>
           <p className="w-80 text-start text-[20px]">
            Find all recent job circulars available in Bangladesh and all around
            the world.
          </p>
         
        </div>
        <Waves size={280} className="hidden md:block absolute right-16 opacity-5" />
      </div>

      <div className="relative z-10 flex justify-center items-center">
        <div className=" space-y-6">
          <p className="w-80 text-start text-[20px]">
            Post your job and find the best candidates for your company. Post a
            Job Now.
          </p>
          <Button className="w-60 bg-secondary-1 hover:bg-orange-600 mt-4">
            Post a Job
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BannerForAuth;
