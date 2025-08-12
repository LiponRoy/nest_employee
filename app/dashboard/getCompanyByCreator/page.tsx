"use client";
import { ICompany } from "@/constant/Constant";
import { useGetCompanyByCreatorQuery } from "@/redux/rtk/companyApi";
import React from "react";

const GetCompanyByCreator = () => {
  const { data, error, isLoading } = useGetCompanyByCreatorQuery();

  //is Loading 
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <span className="animate-pulse text-slate-500">Loading companies...</span>
      </div>
    );
  }

  // is Error
  if (error) {
    return (
      <div className="text-red-500 text-center">
        Failed to load companies. Please try again.
      </div>
    );
  }

  const companies: ICompany[] = data?.data || [];

  return (
    <div className="w-full">
      {companies.length > 0 ? (
        companies.map((company,i) => (
         <div key={i} className="w-full flex flex-col justify-center items-start p-3">
        <span className="text-lg font-semibold text-slate-800">
          {company.name}
        </span>
        <span className="w-full bg-slate-200 px-2 py-1 mt-1 rounded-md text-sm text-slate-600">
          {company.location}
        </span>
      </div>
        ))
      ) : (
        <p className="text-center text-slate-500">No companies found.</p>
      )}
    </div>
  );
};

export default GetCompanyByCreator;
