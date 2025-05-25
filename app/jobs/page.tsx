"use client";
import { ILatestJobs } from "@/types/Types";
import React, { useEffect, useState } from "react";
import { useGetJobsByFilterQuery, useGetJobsQuery } from "@/redux/rtk/jobsApi";
import { JobCard } from "@/components/jobCard";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { optionCategories } from "@/constant/Constant";

const Jobs = () => {
  const category = useAppSelector((state) => state.searchCategory.category);
  // console.log('Redux Category--Jobs:', category);
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const [search, setSearch] = useState(category);
  // const { data: jobs, error, isLoading: dataLoading } = useGetJobsQuery();

  const { data: jobs, isLoading, isError, error } = useGetJobsByFilterQuery(
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


      <div className="w-full grid grid-cols-6 min-h-screen gap-4 p-4 bg-gray-100">
        <div className="col-span-2 flex flex-col justify-start items-start p-6">
          <span className=" text-[18px] font-semibold mb-4">Filters</span>

          {/* durations */}
          <div className=" mt-2">
            <h4 className="font-semibold mb-2">Categories</h4>
            {optionCategories?.map((day) => (
              <div
                key={day.title}
                className="flex items-center justify-start my-2"
              >
                <label className="relative flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value={day.title}
                    className="peer hidden"
                  />
                  <div className="w-5 h-5 bg-slate-200 peer-checked:bg-orange-deep border rounded flex items-center justify-center">
                    {(
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    )}
                  </div>
                </label>
                <span className=" ml-1">{day.title}</span>
              </div>
            ))}
          </div>
          {/* durations end */}
        </div>
        <div className="col-span-4 bg-green-400">
          <span>Right side</span>
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
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
        {/* <div className="col-span-2">
          <span>right side</span>
        </div>

        <div className="col-span-4 grid grid-cols-1 md:grid-cols-2 gap-2">
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
        </div> */}

      </div>

    </div>
  );
};

export default Jobs;
