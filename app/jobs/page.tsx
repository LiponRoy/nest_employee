"use client";
import PriceRange from "@/components/Filter/PriceRange";
import SearchFilter from "@/components/Filter/SearchFilter";
import SelectInput from "@/components/SelectInput";
import { allCategory, latestJobs, selectFieldStyle, sortOptions } from "@/constant/Constant";
import { ILatestJobs } from "@/types/Types";
import React, { useState } from "react";

const Jobs = () => {
  const [priceRange, setPriceRang] = useState(0);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");


  // Handle sort order
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSortOrder = (option: any) => {
    if (option.value === "Price Low to High") {
      setSortBy("price");
      setSortOrder("asc");
      setSelectedOption(option);
    } else if (option.value === "Price High to Low") {
      setSortBy("price");
      setSortOrder("desc");
      setSelectedOption(option);
    } else {
      setSortBy(""); // Reset sorting when "none" or "Exclusive" is selected
    }

  };

  // Handle sort order End
  return (
    <div className="container-custom">
      <div className="w-full flex flex-col justify-center items-center">
        <div className="w-full">
          <div className="w-full bg-slate-200">
            <SearchFilter />
          </div>
          <div className="w-full bg-slate-300">Options bar</div>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-5">
          <div className="col-span-1 bg-slate-400 px-4">
            {/* left side filter bar */}
            {/* price range */}
            <div className="w-full">
              <PriceRange
                min="12"
                max="90000"
                priceValue={priceRange}
              // handleOnchange={handleChange_PriceRange}
              />
            </div>
            {/* price range End */}
            {/* Sort order */}
            <div className="w-full  mt-3 ">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <SelectInput
                options={sortOptions}
                value={selectedOption}
                onChange={handleSortOrder}
                placeholder="Default"
                newStyle={selectFieldStyle}
              //   className="border-2 border-orange-deep rounded-md focus:ring-0"
              />
            </div>
            {/* Sort order End */}
            {/* category filter */}
            <div className=" mt-2">
              <h4 className="font-semibold">Categories</h4>
              {allCategory?.map((day) => (
                <div
                  key={day.title}
                  className="flex items-center justify-start my-2"
                >
                  <label className="relative flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      value={day.title}
                      checked={false}
                      // onChange={() => handleDurationCheckboxChange(day.title)}
                      className="peer hidden"
                    />
                    <div className="w-5 h-5 bg-orange-100 peer-checked:bg-orange-deep border rounded-full flex items-center justify-center">
                      {true && (
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
            {/* category filter end */}
          </div>
          <div className="col-span-4 bg-slate-500">
            <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-2">
              {latestJobs?.map((val: ILatestJobs, i) => (
                <div
                  key={i}
                  className=" border border-slate-200 p-4 m-2 bg-slate-100 hover:bg-red-300 cursor-pointer rounded-md"
                >
                  <div className="flex flex-col justify-start items-start">
                    <span>{val.companyName}</span>
                    <span className="text-lg font-medium text-orange-600">
                      {val.title}
                    </span>
                    <span>{val.description}</span>
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
        </div>
      </div>
    </div>
  );
};

export default Jobs;
