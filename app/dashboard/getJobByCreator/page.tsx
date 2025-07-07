"use client";
import { errorToast, successToast } from "@/components/Toast";
import { Button } from "@/components/ui/button";
import {
    useDeleteJobByIdMutation,
    useGetJobByCreatorQuery,
} from "@/redux/rtk/jobsApi";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const page = () => {
    const router = useRouter();
     const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: job, error, isLoading } = useGetJobByCreatorQuery();

    // For Delete Jobs
    const [deleteJobById, { isLoading: deleteIsloading }] =
        useDeleteJobByIdMutation();

    const handleDelete = async (job_Id: any) => {
        if (!window.confirm("Are you sure you want to delete this job?"))
            return;

        try {
            const res = await deleteJobById(job_Id).unwrap();
setIsModalOpen(false);
            successToast(res.message || "Job deleted successfully");
        } catch (error: any) {
            errorToast(error?.data?.message || "Failed to delete job");
        }
    };

    // End For Delete Jobs

    return (
        <>
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
                            onClick={() =>
                                router.push(
                                    `/dashboard/getJobByCreator/applicants/${val._id}`
                                )
                            }
                        >
                            applicants
                        </Button>
                        <Button
                            className="bg-red-400 hover:bg-secondary-2 transition text-white px-2 py-1 text-sm flex items-center rounded-lg"
                           
                            onClick={() => setIsModalOpen(true)}
                        >
                            Delete
                        </Button>
                    </div>

                        {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-2 max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-2">Confirm Deletion</h2>
            <h4 className="text-md font-semibold mb-2">Job name: {val.title}</h4>
            <p className="mb-6 text-gray-700">
              Are you sure you want to delete this job? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
              onClick={()=>handleDelete(val._id)}
                disabled={isLoading}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                {isLoading ? "Deleting..." : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
                    {/* // modal end */}
                </div>
                
            ))}
        </div>
      
        </>
    );
};

export default page;

{
    /* <Button
          variant="secondary"
          className="bg-secondary-1 hover:bg-secondary-2 transition text-white px-4 py-2 text-sm flex items-center gap-2 rounded-lg"
          onClick={() => router.push(`/jobDetail/${id}`)}
        >
          Details <ArrowUpRight size={16} />
        </Button> */
}
