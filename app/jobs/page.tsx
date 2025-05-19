"use client";
import { ILatestJobs } from "@/types/Types";
import React, { useEffect, useState } from "react";
import { useGetJobsByFilterQuery, useGetJobsQuery } from "@/redux/rtk/jobsApi";
import { JobCard } from "@/components/jobCard";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

const Jobs = () => {
  const category = useAppSelector((state) => state.searchCategory.category);
  // console.log('Redux Category--Jobs:', category);
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const [search, setSearch] = useState(category);
    // const { data: jobs, error, isLoading: dataLoading } = useGetJobsQuery();

  const { data:jobs, isLoading, isError,error } = useGetJobsByFilterQuery(
    {
      page,
      limit,
      search,
    },
    {
      skip: typeof window === "undefined",
      refetchOnMountOrArgChange: true, // Always refetch on component mount or arg change
      refetchOnFocus: true, // Refetch when the window regains focus
      refetchOnReconnect: true, // Refetch when the browser regains network connection
    }
  );

    // Update the URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (page) params.append("page", page.toString());
    if (limit) params.append("limit", limit.toString());
    if (search) params.set("searchTerm", search);

    router.replace(`?${params.toString()}`);
  }, [search, page, limit, router]);
  // End -- This part only for showing filtered URL to Browser search bar



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
