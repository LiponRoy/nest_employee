"use client";
import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { useGetJobsByFilterQuery } from "@/redux/rtk/jobsApi";
import { JobCard } from "@/components/jobCard";
import {
  IJob,
  optionCategories,
  optionDivision,
  optionJobGender,
  optionJobType,
} from "@/constant/Constant";
import { toggleDivision } from "@/redux/slices/divisionSlice"; 
import { SkeletonLoader } from "@/components/SkeletonLoader";
import SearchBar from "../../components/searchBar/SearchBar";

const Jobs = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const globalCategory = useAppSelector(
    (state) => state.searchCategory.category
  );

  const globalDivision = useAppSelector(
    (state) => state.searchDivision.division
  );

  const [page] = useState(1);
  const [limit] = useState(20);
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const [jobType, setjobType] = useState<string[]>([]);
  const [gender, setGender] = useState<string[]>([]);
  // Removed local division state, using only globalDivision from Redux

  //for filter sidebar toggle
  const [toggle, setToggle] = useState(false);

  // for search
  const [searchValue, ] = useState("");

  // Avoid hydration mismatch
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => setHasMounted(true), []);

  useEffect(() => {
    console.log("globalDivision from Redux:", globalDivision);
  }, [globalDivision]);

  // Derived query params
  const queryParams = useMemo(
    () => ({
      page: page.toString(),
      limit: limit.toString(),
      search: globalCategory,
      searchValue,
      categoryFilter,
      jobType,
      gender,
      division: Array.isArray(globalDivision) ? globalDivision : [],
    }),
    [page, limit, globalCategory, globalDivision, searchValue, categoryFilter, jobType, gender]
  );

  // Fetch jobs
  const {
    data: jobs,
    isLoading,
    error,
  } = useGetJobsByFilterQuery(queryParams, {
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

    if (Array.isArray(globalDivision) && globalDivision.length > 0) {
      params.set("division", globalDivision.join(","));
    }

    if (categoryFilter.length > 0) {
      params.set("category", categoryFilter.join(","));
    }
    if (jobType.length > 0) {
      params.set("jobType", jobType.join(","));
    }
    if (gender.length > 0) {
      params.set("gender", gender.join(","));
    }

    router.replace(`?${params.toString()}`);
  }, [queryParams, hasMounted, router, globalCategory, globalDivision, searchValue, categoryFilter, jobType, gender, page, limit]);

  // Toggle jobType filter
  const toggleJobType = (jopType: string) => {
    setjobType((prev) =>
      prev.includes(jopType)
        ? prev.filter((c) => c !== jopType)
        : [...prev, jopType]
    );
  };

  // Toggle gender filter
  const toggleGender = (gender: string) => {
    setGender((prev) =>
      prev.includes(gender)
        ? prev.filter((c) => c !== gender)
        : [...prev, gender]
    );
  };

  // Toggle division filter - dispatch to Redux
  const toggleDivisionHandler = (divisionName: string) => {
    dispatch(toggleDivision(divisionName));
  };

  if (!hasMounted) return null;
  if (error) return <p>Error loading jobs.</p>;

  return (
    <div className="container-custom flex flex-col mt-6 ">
      <div className="grid grid-cols-4 gap-5 p-4 min-h-screen">
        {/* Filters */}
        <div className="hidden md:block col-span-1 px-6 border rounded-lg shadow-md p-6 bg-white ">
          {/* Job Type Filter CheckBoxs */}
          <div className="mt-4">
            <h6 className="font-normal text-[20px] mt-1">Job Type</h6>
            {optionJobType.map(({ title }) => (
              <label
                key={title}
                className="flex items-center gap-2 my-2 cursor-pointer font-normal text-[18px]"
              >
                <input
                  type="checkbox"
                  checked={jobType.includes(title)}
                  onChange={() => toggleJobType(title)}
                  className="hidden peer"
                />
                <div className="w-5 h-5 bg-slate-100 peer-checked:bg-secondary-1 border-2 border-secondary-1 rounded-md flex items-center justify-center">
                  {jobType.includes(title) && (
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
                <span>{title}</span>
              </label>
            ))}
          </div>

          {/* Gender Filter CheckBoxs */}
          <div className="mt-4">
            <h6 className="font-normal text-[20px] ">Gender</h6>
            {optionJobGender.map(({ title }) => (
              <label
                key={title}
                className="flex items-center gap-2 my-2 cursor-pointer font-normal text-[18px]"
              >
                <input
                  type="checkbox"
                  checked={gender.includes(title)}
                  onChange={() => toggleGender(title)}
                  className="hidden peer"
                />
                <div className="w-5 h-5 bg-slate-100 peer-checked:bg-secondary-1 border-2 border-secondary-1 rounded-md flex items-center justify-center">
                  {gender.includes(title) && (
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
                <span>{title}</span>
              </label>
            ))}
          </div>

          {/* Division Filter CheckBoxs */}
          <div className="mt-4">
            <h6 className="font-normal text-[20px] ">Division</h6>
            {optionDivision.map(({ title }) => (
              <label
                key={title}
                className="flex items-center gap-2 my-2 cursor-pointer font-normal text-[18px]"
              >
                <input
                  type="checkbox"
                  checked={Array.isArray(globalDivision) && globalDivision.includes(title)}
                  onChange={() => toggleDivisionHandler(title)}
                  className="hidden peer"
                />
                <div className="w-5 h-5 bg-slate-100 peer-checked:bg-secondary-1 border-2 border-secondary-1 rounded-md flex items-center justify-center">
                  {Array.isArray(globalDivision) && globalDivision.includes(title) && (
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
                <span>{title}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Job Results */}
        <section className="col-span-4 md:col-span-3 ">
          <div className="w-full ">
            <SearchBar />
            <div className="my-3 flex justify-between items-center w-full">
              <span
                onClick={() => setToggle(!toggle)}
                className="md:hidden bg-secondary-1 p-1 px-2 text-white rounded-md cursor-pointer"
              >
                Filter ++
              </span>
              <span>
                Found <span className="mx-1">{jobs?.meta?.total}</span> Jobs
              </span>
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
              {isLoading ? (
                <SkeletonLoader />
              ) : !isLoading && jobs?.data?.length && jobs.data.length > 0 ? (
                jobs.data.slice(0, 8).map((val: IJob, i: number) => (
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
                <p>No jobs found.</p>
              )}
            </div>
          </div>
        </section>

        {/* mobile sideBar for filtering */}
        {toggle && (
          <>
            <div className="md:hidden fixed right-0 w-[60%] h-full bg-slate-100 z-50 transition-transform duration-300 ease-in-out translate-x-0">
              <div
                onClick={() => setToggle(false)}
                className="absolute top-3 left-3 bg-red-400 w-8 h-8 text-white rounded-full flex-center cursor-pointer"
              >
                X
              </div>

              {/* Filters */}
              <div className="pl-6 pt-12 rounded-lg ">
                {/* Job Category Filter CheckBoxs */}
                <div className="mt-2">
                  <h6 className="font-normal text-[16px]">Job Category</h6>
                  {optionCategories.map(({ title }) => (
                    <label
                      key={title}
                      className="flex items-center gap-2 my-2 cursor-pointer font-normal text-[14px]"
                    >
                      <input
                        type="checkbox"
                        checked={categoryFilter.includes(title)}
                        onChange={() =>
                          setCategoryFilter((prev) =>
                            prev.includes(title)
                              ? prev.filter((c) => c !== title)
                              : [...prev, title]
                          )
                        }
                        className="hidden peer"
                      />
                      <div className="w-4 h-4 bg-slate-100 peer-checked:bg-secondary-1 border-2 border-secondary-1 rounded-full flex items-center justify-center">
                        {categoryFilter.includes(title) && (
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                      <span>{title}</span>
                    </label>
                  ))}
                </div>

                {/* Job Type Filter CheckBoxs */}
                <div className="mt-4">
                  <h6 className="font-normal text-[16px] mt-1">Job Type</h6>
                  {optionJobType.map(({ title }) => (
                    <label
                      key={title}
                      className="flex items-center gap-2 my-2 cursor-pointer font-normal text-[14px]"
                    >
                      <input
                        type="checkbox"
                        checked={jobType.includes(title)}
                        onChange={() => toggleJobType(title)}
                        className="hidden peer"
                      />
                      <div className="w-5 h-5 bg-slate-100 peer-checked:bg-secondary-1 border-2 border-secondary-1 rounded-full flex items-center justify-center">
                        {jobType.includes(title) && (
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                      <span>{title}</span>
                    </label>
                  ))}
                </div>

                {/* Gender Filter CheckBoxs */}
                <div className="mt-4">
                  <h6 className="font-normal text-[16px] ">Gender</h6>
                  {optionJobGender.map(({ title }) => (
                    <label
                      key={title}
                      className="flex items-center gap-2 my-2 cursor-pointer font-normal text-[14px]"
                    >
                      <input
                        type="checkbox"
                        checked={gender.includes(title)}
                        onChange={() => toggleGender(title)}
                        className="hidden peer"
                      />
                      <div className="w-5 h-5 bg-slate-100 peer-checked:bg-secondary-1 border-2 border-secondary-1 rounded-full flex items-center justify-center">
                        {gender.includes(title) && (
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                      <span>{title}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div
                onClick={() => setToggle(false)}
                className="bg-secondary-1 rounded-md w-[80%] mx-auto py-2 flex justify-center items-center capitalize text-white mt-4"
              >
                Apply Filter
              </div>
            </div>

            <div
              onClick={() => setToggle(false)}
              className="absolute right-0 left-0 bottom-0 top-0 bg-black opacity-60"
            ></div>
          </>
        )}
      </div>
    </div>
  );
};

export default Jobs;
