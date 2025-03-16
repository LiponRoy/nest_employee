"use client"
import { latestJobs } from "@/constant/Constant";
import { ILatestJobs } from "@/types/Types";
import React from "react";
import { ChevronsRight } from "lucide-react";
import { useGetJobsQuery } from "@/redux/rtk/jobsApi";

const LatestJobs = () => {
  const { data: jobs, error, isLoading } = useGetJobsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading jobs!</p>;

  return (
    <div className="container-custom flex flex-col justify-start items-start">
      <h4 className="text-start my-6 ml-2 text-lg">Latest All jobs : </h4>
      <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-2">
        {jobs?.data?.map((val: ILatestJobs, i: string) => (
          <div
            key={i}
            className=" border border-slate-200 p-4 m-2 bg-slate-100 hover:bg-red-300 cursor-pointer rounded-md"
          >
            <div className="flex flex-col justify-start items-start">
              <span className="text-lg font-medium text-orange-600">{val.title}</span>
              <span>BDT {val.maxSalary}</span>
            </div>
            <div className="w-full flex justify-between items-center mt-4 rounded-lg">
              <div className="flex justify-center items-center">

                <h4>position: {val.position}</h4>
              </div>
              <div className="flex justify-center items-center">

                <h4>jobType: {val.jobType}</h4>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestJobs;
