"use client";
import { useGetJobByCreatorQuery } from "@/redux/rtk/jobsApi";
import React from "react";

const page = () => {
    const { data: job, error, isLoading } = useGetJobByCreatorQuery();

    return (
        <div className="w-full">
            {job?.data?.map((val: any, i: any) => (
                <div
                    key={i}
                    className="grid grid-cols-4 m-4 border border-slate-200 "
                >
                    <div className="flex flex-col justify-center items-start m-2">
                        <span>{val.title}</span>
                        <span className="bg-slate-200 px-1 rounded-md">{val.jobType}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default page;
