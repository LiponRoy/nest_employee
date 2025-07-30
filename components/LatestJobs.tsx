"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useGetJobsQuery } from "@/redux/rtk/jobsApi";
import { ILatestJobs } from "@/types/Types";
import { JobCard } from "./jobCard";
import { Button } from "./ui/button";
import { SkeletonLoader } from "./SkeletonLoader";

const LatestJobs = () => {
  const router = useRouter();

  const {
    data: jobs,
    error,
    isLoading,
  } = useGetJobsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  return (
    <div className="container-custom flex flex-col justify-center items-center">
      <div className="w-full flex flex-col justify-start items-start my-4 bg-slate-100 p-2">
        <span className="text-[24px] md:text-[32px] font-medium">
          Latest All <span className="text-primary-1 ml-2">jobs</span>
        </span>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        {isLoading || !jobs ? (
          <SkeletonLoader/>
        ) : jobs.data?.length > 0 ? (
          jobs.data.slice(0, 8).map((val: ILatestJobs, i: number) => (
            <JobCard
              key={val._id || i}
              logo={val.companyId?.logoImage}
              companyName={val.companyId?.name}
              title={val.title}
              gender={val.gender}
              jobType={val.jobType}
              maxSalary={val.maxSalary}
              minSalary={val.minSalary}
              location={val.location}
              id={val._id}
            />
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            No jobs available at the moment.
          </p>
        )}
      </div>

      <div className="w-full flex justify-center items-center py-6">
        <Button
          onClick={() => router.push("/jobs")}
          className="border border-secondary-1 h-12 w-[60%] md:w-[20%] text-[18px] font-semibold rounded-md flex justify-center items-center cursor-pointer transition-all duration-500 ease-in-out bg-secondary-1 hover:bg-secondary-1 hover:text-white"
        >
          VIEW MORE JOBS
        </Button>
      </div>

      {error && (
        <p className="text-red-500 text-center mt-4">Error loading jobs!</p>
      )}
    </div>
  );
};

export default LatestJobs;
