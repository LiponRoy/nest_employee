"use client";
import { Button } from "@/components/ui/button";
import { useGetApplicantsByJobIdQuery, useRejectApplicantMutation } from "@/redux/rtk/applicationApi";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { User } from 'lucide-react';
import { errorToast, successToast } from "@/components/Toast";

const page = () => {
    const router = useRouter();
    const { id } = useParams();
    const jobId = id as string;
    const {
        data: applicants,
        isLoading,
        error,
    } = useGetApplicantsByJobIdQuery(jobId);

// this is for reject User code
 const [rejectApplicant, { isLoading:rejectLoading }] = useRejectApplicantMutation();

  const handleReject = async (jobSeekerId:any) => {
    try {
      const res = await rejectApplicant({
        jobSeeker_id: jobSeekerId,
        jobId,
      }).unwrap();

      successToast(res.message || "Applicant rejected successfully");
    } catch (error: any) {
      const errorMessage =
        error?.data?.message || "Failed to reject applicant";
      errorToast(errorMessage);
      console.error("Reject error:", error);
    }
  };

  // End reject User code

    return (
        <div className="w-full">
            {applicants?.data?.data.map((val: any, i: any) => (
                <div
                    key={i}
                    className="grid grid-cols-4 m-4 border border-slate-200 "
                >
                    <div className="col-span-2 flex justify-evenl items-start m-2 space-x-8">
                        <span>{val.applicant._id}</span>
                        <span>{val.applicant.name}</span>
                        <span className="text-blue-400">{val.status}</span>
                    </div>

                    <div className="col-span-2 flex justify-end items-center space-x-6">
                        <Button
                            className="bg-secondary-1 hover:bg-secondary-2 transition text-white px-2 py-1 text-sm flex items-center rounded-lg"
                            //   onClick={() => router.push(`/dashboard/getJobByCreator/applicants/${val._id}`)}
                        >
                            Accept
                        </Button>
                        <Button
                        onClick={()=>handleReject(val.applicant._id)}
                            className="bg-red-400 hover:bg-secondary-2 transition text-white px-2 py-1 text-sm flex items-center rounded-lg"
                            //   onClick={() => router.push(`/dashboard/getJobByCreator/applicants/${val._id}`)}
                        >
                            Reject
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default page;
