"use client";
import { ILatestJobs } from "@/types/Types";
import React from "react";
import { useGetJobsQuery } from "@/redux/rtk/jobsApi";
import { JobCard } from "./jobCard";

const LatestJobs = () => {

  const { data: jobs, error, isLoading } = useGetJobsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading jobs!</p>;

  console.log("Jobs xxx ",jobs)

  return (
    <div className="container-custom flex flex-col justify-center items-center mt-8">
      {/* <h4 className="text-start my-6 ml-2 text-lg">Latest All jobs : </h4> */}
       <div className="w-full flex flex-col justify-start items-start my-6 bg-slate-100 p-2">
        <span className=" text-[32px] font-medium">Latest All<span className="text-[#146B83] ml-2">jobs</span> </span>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6"> 
  {jobs?.data?.map((val: ILatestJobs, i: string) => (
    <JobCard
      key={val._id || i}
      logo={val?.companyId?.logoImage}
      companyName={val?.companyId?.name}
      title={val.title}
      gender={val.gender}
      jobType={val.jobType}
      maxSalary={val.maxSalary}
      minSalary={val.minSalary}
      location={val.location}
      id={val._id}
    />
  ))}
</div>

    </div>
  );
};

export default LatestJobs;
