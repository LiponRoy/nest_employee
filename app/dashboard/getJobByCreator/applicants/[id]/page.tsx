"use client";

import { Button } from "@/components/ui/button";
import {
  useAcceptApplicantMutation,
  useGetApplicantsByJobIdQuery,
  useRejectApplicantMutation,
} from "@/redux/rtk/applicationApi";
import { useParams } from "next/navigation";
import React, { useCallback } from "react";
import { errorToast, successToast } from "@/components/Toast";

interface Applicant {
  applicant: {
    _id: string;
    name: string;
  };
  status: "pending" | "accepted" | "rejected";
}

const Applicants = () => {
  const { id } = useParams();
  const jobId = id as string;

  const {
    data: applicants,
    isLoading,
    refetch,
  } = useGetApplicantsByJobIdQuery(jobId, {
    refetchOnMountOrArgChange: true,
  });

  const [acceptApplicant, { isLoading: acceptLoading }] =
    useAcceptApplicantMutation();
  const [rejectApplicant, { isLoading: rejectLoading }] =
    useRejectApplicantMutation();

  // Generic status update handler (Accept/Reject)
  const handleUpdateStatus = useCallback(
    async (action: "accept" | "reject", jobSeekerId: string) => {
      try {
        const mutation =
          action === "accept" ? acceptApplicant : rejectApplicant;

        const res = await mutation({
          jobSeeker_id: jobSeekerId,
          jobId,
        }).unwrap();

        await refetch();
        successToast(
          res.message || `Applicant ${action === "accept" ? "accepted" : "rejected"} successfully`
        );
      } catch (err: unknown) {
  const message =
    (err as { data?: { message?: string } })?.data?.message ||
    `Failed to ${action === "accept" ? "accept" : "reject"} applicant`;

  errorToast(message);
}
    },
    [acceptApplicant, rejectApplicant, jobId, refetch]
  );

  if (isLoading) {
    return <div className="text-center py-6">Loading applicants...</div>;
  }

  return (
    <div className="w-full">
      {applicants?.data?.data?.map((val: Applicant) => {
        const isAccepted = val.status === "accepted";
        const isRejected = val.status === "rejected";

        return (
          <div
            key={val.applicant._id}
            className="grid grid-cols-4 m-4 border border-slate-200 p-3 rounded-md shadow-sm"
          >
            <div className="col-span-2 flex items-center gap-4">
              <span className="font-mono text-sm">{val.applicant._id}</span>
              <span className="font-semibold">{val.applicant.name}</span>
              <span
                className={`font-medium ${
                  isAccepted ? "text-green-700" : isRejected ? "text-red-700" : "text-gray-600"
                }`}
              >
                {val.status}
              </span>
              {isAccepted && <span className="bg-green-600 w-4 h-4 rounded-full" />}
            </div>

            <div className="col-span-2 flex justify-end items-center gap-3">
              <Button
                disabled={isAccepted || acceptLoading}
                onClick={() => handleUpdateStatus("accept", val.applicant._id)}
                className="bg-secondary-1 hover:bg-secondary-2 text-white px-3 py-1 text-sm rounded-lg"
              >
                {acceptLoading ? "Accepting..." : "Accept"}
              </Button>
              <Button
                disabled={isAccepted || rejectLoading}
                onClick={() => handleUpdateStatus("reject", val.applicant._id)}
                className="bg-red-400 hover:bg-red-500 text-white px-3 py-1 text-sm rounded-lg"
              >
                {rejectLoading ? "Rejecting..." : "Reject"}
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Applicants;
