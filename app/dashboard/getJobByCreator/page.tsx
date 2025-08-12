"use client";
import { errorToast, successToast } from "@/components/Toast";
import { Button } from "@/components/ui/button";
import { IJob } from "@/constant/Constant";
import {
  useDeleteJobByIdMutation,
  useGetJobByCreatorQuery,
} from "@/redux/rtk/jobsApi";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const AllJobs: React.FC = () => {
  const router = useRouter();

  // State for modal & selected job
  const [selectedJob, setSelectedJob] = useState<IJob | null>(null);

  const { data: jobData, isLoading: jobsLoading } = useGetJobByCreatorQuery();

  const [deleteJobById, { isLoading: deleteLoading }] =
    useDeleteJobByIdMutation();

  const handleDelete = async (jobId: string) => {
    try {
      const res = await deleteJobById(jobId).unwrap();
      setSelectedJob(null);
      successToast(res.message || "Job deleted successfully");
    } catch (error: unknown) {
  const err = error as { data?: { message?: string } };
  errorToast(err.data?.message || "Failed to delete job");
}
  };

  if (jobsLoading) {
    return <p className="text-center py-4">Loading jobs...</p>;
  }

  return (
    <div className="w-full">
      {jobData?.data?.map((job: IJob) => (
        <div
          key={job._id}
          className="grid grid-cols-4 m-4 border border-slate-200"
        >
          <div className="col-span-2 flex items-start m-2">
            <span>{job.title}</span>
          </div>

          <div className="col-span-2 flex justify-end items-center space-x-4">
            <Button
              className="bg-secondary-1 hover:bg-secondary-2 text-white px-2 py-1 text-sm rounded-lg"
              onClick={() =>
                router.push(
                  `/dashboard/getJobByCreator/applicants/${job._id}`
                )
              }
            >
              Applicants
            </Button>
            <Button
              className="bg-red-400 hover:bg-secondary-2 text-white px-2 py-1 text-sm rounded-lg"
              onClick={() => setSelectedJob(job)}
            >
              Delete
            </Button>
          </div>
        </div>
      ))}

      {/* Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-4 max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-2">Confirm Deletion</h2>
            <h4 className="text-md font-semibold mb-2">
              Job name: {selectedJob.title}
            </h4>
            <p className="mb-6 text-gray-700">
              Are you sure you want to delete this job? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSelectedJob(null)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(selectedJob._id)}
                disabled={deleteLoading}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                {deleteLoading ? "Deleting..." : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllJobs;



