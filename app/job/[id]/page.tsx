"use client"
import React from 'react'
import { useParams } from 'next/navigation';
import { useGetJobByIdQuery } from '@/redux/rtk/jobsApi';
import { useApplyForJobMutation } from '@/redux/rtk/applicationApi';
import { errorToast, successToast } from '@/components/Toast';
import UserTable from '@/components/applyedJobsTable';



const page = () => {
    const { id } = useParams();
    const jobId = id as string;

    // this is for get single job 
    const { data: job, isLoading, error } = useGetJobByIdQuery(jobId);
    // this is for apply job 
    const [applyForJob, { isLoading: isApplying, isSuccess, isError }] = useApplyForJobMutation();

    const handleApply = async () => {
        try {
            await applyForJob(jobId).unwrap();
            successToast('Applied successfully!');
        } catch (err) {
            console.error('Application failed:', err);
            errorToast("Failed to apply.")
        }
    };

    if (isLoading) return <div>Loading job details...</div>;
    if (error) return <div>Failed to load job.</div>;

    return (
        <div className="flex flex-col justify-start items-start w-full mx-10">
            <span>Details :{job?.data?.description}</span>
            <span>Location :{job?.data?.location}</span>
            <span>Salary :{job?.data?.maxSalary}</span>
            <span>JobId :{job?.data?._id}</span>

            <button
                onClick={handleApply}
                className="mt-4 px-4 py-2 via-green-400"
                disabled={isApplying}
            >
                {isApplying ? 'Applying...' : 'Apply Job'}
            </button>
            {isSuccess && <p className="text-green-600">Application submitted!</p>}
            {isError && <p className="text-red-600">Something went wrong.</p>}


        </div>

    )
}

export default page