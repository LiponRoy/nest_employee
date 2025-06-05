import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { Waves } from "lucide-react";

// bg-cover bg-center" style={{ backgroundImage: 'url(/hero-bg.jpg)' }}

const BannerForAuth = () => {
  return (
    <div className="relative container-custom h-[400px] md:h-[500px] grid grid-cols-1 md:grid-cols-2 bg-bg-1 ">
      {/* Content */}
      <div className="relative z-10 flex justify-center items-center">
        <div className="w-60">
          <p className="text-center text-[20px]">
            Find all recent job circulars available in Bangladesh and all around
            the world.
          </p>
          <Button className="w-full bg-secondary-1 hover:bg-orange-600 mt-4">
            Apply For Job
          </Button>
        </div>
        <Waves
          size={280}
          className="hidden md:block absolute right-16 opacity-5"
        />
      </div>

      <div className="relative z-10 flex justify-center items-center">
        <div className="w-60">
          <p className="text-center text-[20px]">
            Post your job and find the best candidates for your company. Post a
            Job Now.
          </p>
          <Button className="w-full bg-secondary-1 hover:bg-orange-600 mt-4">
            Post a Job
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BannerForAuth;
