"use client";
import { Button } from "@/components/ui/button";
import { useGetJobByCreatorQuery } from "@/redux/rtk/jobsApi";
import { useRouter } from "next/navigation";
import React from "react";


const page = () => {
    const router = useRouter();
    const { data: job, error, isLoading } = useGetJobByCreatorQuery();

    return (
        <div className="w-full">
            {job?.data?.map((val: any, i: any) => (
                <div
                    key={i}
                    className="grid grid-cols-4 m-4 border border-slate-200 "
                >
                    <div className="col-span-2 flex justify-evenl items-start m-2">
                        <span>{val.title}</span>

                      </div>

                    <div className="col-span-2 flex justify-end items-center space-x-6">
                      

                         <Button
          className="bg-secondary-1 hover:bg-secondary-2 transition text-white px-2 py-1 text-sm flex items-center rounded-lg"
          onClick={() => router.push(`/dashboard/getJobByCreator/applicants/${val._id}`)}
        > 
         applicants
        </Button>
                         <Button
          className="bg-red-400 hover:bg-secondary-2 transition text-white px-2 py-1 text-sm flex items-center rounded-lg"
          onClick={() => router.push(`/dashboard/getJobByCreator/applicants/${val._id}`)}
        > 
          Delete
        </Button>

                      </div>
                    
                </div>
            ))}
        </div>
    );
};

export default page;


{/* <Button
          variant="secondary"
          className="bg-secondary-1 hover:bg-secondary-2 transition text-white px-4 py-2 text-sm flex items-center gap-2 rounded-lg"
          onClick={() => router.push(`/jobDetail/${id}`)}
        >
          Details <ArrowUpRight size={16} />
        </Button> */}
