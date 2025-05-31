"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { useGetJobsByFilterQuery } from "@/redux/rtk/jobsApi";
import { JobCard } from "@/components/jobCard";
import { optionCategories, optionJobGender, optionJobType } from "@/constant/Constant";
import { ILatestJobs } from "@/types/Types";
import { Button } from "@/components/ui/button";

const Jobs = () => {
  const router = useRouter();
  const globalCategory = useAppSelector((state) => state.searchCategory.category);

  const [page, setPage] = useState(1);
  const [limit] = useState(4);
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const [jobType, setjobType] = useState<string[]>([]);
  const [gender, setGender] = useState<string[]>([]);

  // for search
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');

  // Avoid hydration mismatch
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => setHasMounted(true), []);

  useEffect(() => {
    console.log("search turm ,,", searchValue)
  }, [searchValue])

  // Derived query params
  const queryParams = useMemo(() => ({
    page,
    limit,
    search: globalCategory,
    searchValue,
    categoryFilter,
    jobType,
    gender
  }), [page, limit, globalCategory, searchValue, categoryFilter, jobType, gender]);

  // Fetch jobs
  const { data: jobs, isLoading, error } = useGetJobsByFilterQuery(queryParams, {
    skip: !hasMounted,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  // Sync URL with filter state
  useEffect(() => {
    if (!hasMounted) return;

    const params = new URLSearchParams();
    params.set("page", page.toString());
    params.set("limit", limit.toString());
    if (globalCategory) params.set("searchTerm", globalCategory);
    if (searchValue) params.set("searchTerm", searchValue);
    if (categoryFilter.length > 0) params.set("category", categoryFilter.join(","));
    if (jobType.length > 0) params.set("jobType", jobType.join(","));
    if (gender.length > 0) params.set("gender", gender.join(","));

    router.replace(`?${params.toString()}`);
  }, [queryParams, hasMounted, router]);

  // Toggle category filter
  const toggleCategory = (category: string) => {
    setCategoryFilter((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  // Toggle jobType filter
  const toggleJobType = (jopType: string) => {
    setjobType((prev) =>
      prev.includes(jopType) ? prev.filter((c) => c !== jopType) : [...prev, jopType]
    );
  };

  // Toggle gender filter
  const toggleGender = (gender: string) => {
    setGender((prev) =>
      prev.includes(gender) ? prev.filter((c) => c !== gender) : [...prev, gender]
    );
  };

  if (!hasMounted) return null;
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading jobs.</p>;

  return (
    <div className="container-custom flex flex-col mt-6 ">
      {/* // SearchBar */}
      <div className="w-[95%] mx-auto">
        <div className="w-full relative flex justify-center items-center ">
          <input
            type="text"
            placeholder="Search by job title,category,description ..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded mr-2"
          />
          <Button
            onClick={() => setSearchValue(inputValue)}
            // className="mt-2 w-full bg-secondary-1  "
            className="absolute right-1 bg-secondary-1 text-white px-14 py-2 rounded"
          >
            Search
          </Button>


        </div>
      </div>
      {/* // SearchBar End */}
      <div className="grid grid-cols-6 gap-4 p-4 min-h-screen">
        {/* Filters */}
        <div className="col-span-2 px-6">
          {/* // Job Category Filter CheckBoxs */}
          <div>
            <h6 className="font-semibold">Job Category</h6>
            {optionCategories.map(({ title }) => (
              <label key={title} className="flex items-center gap-2 my-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={categoryFilter.includes(title)}
                  onChange={() => toggleCategory(title)}
                  className="hidden peer"
                />
                <div className="w-5 h-5 bg-orange-200 peer-checked:bg-secondary-1 border rounded flex items-center justify-center">
                  {categoryFilter.includes(title) && (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span>{title}</span>
              </label>
            ))}
          </div>
          {/* // Job Type Filter CheckBoxs */}
          <div>
            <h6 className="font-semibold">Job Type</h6>
            {optionJobType.map(({ title }) => (
              <label key={title} className="flex items-center gap-2 my-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={jobType.includes(title)}
                  onChange={() => toggleJobType(title)}
                  className="hidden peer"
                />
                <div className="w-5 h-5 bg-orange-200 peer-checked:bg-secondary-1 border rounded flex items-center justify-center">
                  {jobType.includes(title) && (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span>{title}</span>
              </label>
            ))}
          </div>
          {/* // Gender Filter CheckBoxs */}
          <div>
            <h6 className="font-semibold">Gender</h6>
            {optionJobGender.map(({ title }) => (
              <label key={title} className="flex items-center gap-2 my-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={gender.includes(title)}
                  onChange={() => toggleGender(title)}
                  className="hidden peer"
                />
                <div className="w-5 h-5 bg-orange-200 peer-checked:bg-secondary-1 border rounded flex items-center justify-center">
                  {gender.includes(title) && (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span>{title}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Job Results */}
        <section className="col-span-4  p-4">
          {jobs?.data?.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {jobs.data.map((job: ILatestJobs) => (
                <JobCard
                  key={job._id}
                  logo={job.companyId?.logoImage}
                  title={job.title}
                  jobType={job.jobType}
                  location={job.location}
                  salary={job.maxSalary}
                  category={job.category}
                  id={job._id}
                />
              ))}
            </div>
          ) : (
            <p>No jobs found.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default Jobs;
