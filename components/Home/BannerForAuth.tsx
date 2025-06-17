import React from "react";
import { Button } from "../ui/button";

const BannerForAuth = () => {
  return (
    <div className="container-custom ">
    <div className="bg-gradient-to-r from-primary-1 to-slate-800 text-white py-12 md:py-20 px-6 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      
      {/* Left Section – Job Seekers */}
      <div className="space-y-6 flex flex-col justify-center items-center">
        <h2 className="text-3xl md:text-4xl font-bold">Find Your Dream Job</h2>
        <p className="text-lg md:text-xl text-gray-200 px-8 text-center">
          Explore the latest job circulars across Bangladesh and worldwide. Start your career journey today.
        </p>
        <Button className="w-48 bg-secondary-1 hover:bg-secondary-1">
          Apply for Jobs
        </Button>
      </div>

      {/* Right Section – Employers */}
      <div className="space-y-6 flex flex-col justify-center items-center">
        <h2 className="text-3xl md:text-4xl font-bold">Hire the Right Talent</h2>
        <p className="text-lg md:text-xl text-gray-200 px-8 text-center">
          Post your job openings and reach thousands of potential candidates. Build your ideal team with ease.
        </p>
        <Button className="w-48 bg-secondary-1 hover:bg-secondary-1">
          Post a Job
        </Button>
      </div>
      </div>
    </div>
  );
};

export default BannerForAuth;
