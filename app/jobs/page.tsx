"use client";
import { ILatestJobs } from "@/types/Types";
import React from "react";
import { useGetJobsQuery } from "@/redux/rtk/jobsApi";
import { JobCard } from "@/components/jobCard";
import { useAppSelector } from "@/redux/hooks";

const Jobs = () => {
  const category = useAppSelector((state) => state.searchCategory.category);
  // console.log('Redux Category--Jobs:', category);

  const { data: jobs, error, isLoading } = useGetJobsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading jobs!</p>;

  console.log("Jobs xxx ", jobs);

  return (
    <div className="container-custom flex flex-col justify-start items-start">
      <h4 className="text-start my-6 ml-2 text-lg">All jobs : </h4>
      <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-2">
        {jobs?.data?.map((val: ILatestJobs, i: string) => (
          <JobCard
            key={val._id || i}
            logo={val?.companyId?.logoImage}
            title={val.title}
            jobType={val.jobType}
            location={val.location}
            salary={val.maxSalary}
            category={val.category}
            id={val._id}
          />
        ))}
      </div>
    </div>
  );
};

export default Jobs;
