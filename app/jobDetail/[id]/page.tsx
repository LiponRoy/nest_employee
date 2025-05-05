// "use client"
// import React from 'react'
// import { useParams } from 'next/navigation';
// import { useGetJobByIdQuery } from '@/redux/rtk/jobsApi';
// import { useApplyForJobMutation } from '@/redux/rtk/applicationApi';
// import { errorToast, successToast } from '@/components/Toast';
// import UserTable from '@/components/applyedJobsTable';

// const page = () => {
//     const { id } = useParams();
//     const jobId = id as string;

//     // this is for get single job
//     const { data: job, isLoading, error } = useGetJobByIdQuery(jobId);
//     // this is for apply job
//     const [applyForJob, { isLoading: isApplying, isSuccess, isError }] = useApplyForJobMutation();

//     const handleApply = async () => {
//         try {
//             await applyForJob(jobId).unwrap();
//             successToast('Applied successfully!');
//         } catch (err) {
//             console.error('Application failed:', err);
//             errorToast("Failed to apply.")
//         }
//     };

//     if (isLoading) return <div>Loading job details...</div>;
//     if (error) return <div>Failed to load job.</div>;

//     return (
//         <div className="flex flex-col justify-start items-start w-full mx-10">
//             <span>Details :{job?.data?.description}</span>
//             <span>Location :{job?.data?.location}</span>
//             <span>Salary :{job?.data?.maxSalary}</span>
//             <span>JobId :{job?.data?._id}</span>

//             <button
//                 onClick={handleApply}
//                 className="mt-4 px-4 py-2 via-green-400"
//                 disabled={isApplying}
//             >
//                 {isApplying ? 'Applying...' : 'Apply Job'}
//             </button>
//             {isSuccess && <p className="text-green-600">Application submitted!</p>}
//             {isError && <p className="text-red-600">Something went wrong.</p>}

//         </div>

//     )
// }

// export default page

"use client";
import React from "react";
import { Backpack } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import RelatedJobs from "@/components/RelatedJobs";
import { useParams } from "next/navigation";
import { useGetJobByIdQuery } from "@/redux/rtk/jobsApi";
import { useApplyForJobMutation } from "@/redux/rtk/applicationApi";
import { errorToast, successToast } from "@/components/Toast";

const JobDetail = () => {
  const { id } = useParams();
  const jobId = id as string;

  // this is for get single job
  const { data: job, isLoading, error } = useGetJobByIdQuery(jobId);
  // this is for apply job
  const [applyForJob, { isLoading: isApplying, isSuccess, isError }] =
    useApplyForJobMutation();

  const handleApply = async () => {
    try {
      await applyForJob(jobId).unwrap();
      successToast("Applied successfully!");
    } catch (err) {
      console.error("Application failed:", err);
      errorToast("Failed to apply.");
    }
  };

  if (isLoading) return <div>Loading job details...</div>;
  if (error) return <div>Failed to load job.</div>;
  return (
    <>
      <div className="container-custom">
        {/* Header */}
        <div className="w-full h-1/2 bg-bg-1  pb-20 pt-5">
          <div className="w-full h-full flex flex-col justify-start items-start">
            <span className="text-[48px]">{job?.data?.title}</span>
            <div className="flex justify-start items-center gap-x-6 mt-[22px]">
              <div className="flex justify-center items-center gap-x-1">
                <Backpack className="text-primary-1" />
                <span className="text-[18px]">{job?.data?.location}</span>
              </div>
              <div className="flex justify-center items-center gap-x-1">
                <Backpack className="text-primary-1" />

                <span className="text-[18px]">{job?.data?.jobType}</span>
              </div>
              <div className="flex justify-center items-center gap-x-1">
                <Backpack className="text-primary-1" />

                <span className="text-[18px]">1 Years Ago</span>
              </div>
              <div className="flex justify-center items-center gap-x-1">
                <Backpack className="text-primary-1" />

                <span className="text-[16px]">
                  {`BDT ${job?.data?.minSalary} - ${job?.data?.maxSalary} Monthly`}
                </span>
              </div>
            </div>
           
            <div className="flex justify-start items-center gap-x-2 mt-[24px]">
            {job?.data?.skillAndExperience?.map((val, i) => (
              <div
                key={i}
                className="w-full flex justify-start items-center gap-x-2 bg-slate-200 p-1 rounded-lg"
              >
                <span>{val?.title}</span>
              </div>
            ))}
            </div>
          </div>
        </div>
        {/* Header End*/}
        <div className="grid grid-cols-1 md:grid-cols-5">
          <div className="col-span-3 space-y-2">
            {/* Job Description */}
            <div className="w-full flex flex-col justify-start items-start">
              <h4 className="text-[24px] font-semibold">Job Description :</h4>
              <p>
              {job?.data?.description}
              </p>
            </div>
            {/* Job Description End */}
            {/* Job Responsibility */}
            <div className="w-full flex flex-col justify-start items-start">
              <h4 className="text-[24px] font-semibold">Responsibility :</h4>
              {job?.data?.responsibility?.map((val, i) => (
              <div
                key={i}
                className="w-full flex justify-start items-center gap-x-2  p-1"
              >
                
                <ul><li>- {val?.title}</li></ul>
              </div>
            ))}
              
            </div>
            {/* Job Responsibility End */}
            {/* Job requirements */}
            <div className="w-full flex flex-col justify-start items-start">
              <h4 className="text-[24px] font-semibold">Requirements :</h4>
              
              {job?.data?.requirements?.map((val, i) => (
              <div
                key={i}
                className="w-full flex justify-start items-center gap-x-2  p-1"
              >
                
                <ul><li>- {val?.title}</li></ul>
              </div>
            ))}
            </div>
            {/* requirements End */}
            {/* Salary and Benefits */}
            <div className="w-full flex flex-col justify-start items-start">
              <h4 className="text-[24px] font-semibold">
                Salary and Benefits :
              </h4>
              
              {job?.data?.salaryAndBenefits?.map((val, i) => (
              <div
                key={i}
                className="w-full flex justify-start items-center gap-x-2  p-1"
              >
                
                <ul><li>- {val?.title}</li></ul>
              </div>
            ))}
              
            </div>
            {/* Salary and Benefits End */}
            <Button
              onClick={handleApply}
              disabled={isApplying}
              className="w-[50%] rounded-md bg-orange-600 hover:bg-orange-700 "
            >
              Apply This Possition
            </Button>
          </div>
          {/* company logo and apply job section */}
          <div className="col-span-2 w-full  flex flex-col justify-start items-end gap-y-4">
            <div className=" relative h-[338px] w-[412px] bg-bg-1 border border-slate-200 shadow-md flex flex-col justify-center items-center gap-y-1">
              <Image
                src="/logo.png" 
                alt="Example Image"
                width={300} 
                height={300} 
                priority 
                className="w-[120px] h-[90px]"
              />
              <span className="text-[32px] font-semibold">Google.com</span>
              <span className="text-[18px] font-normal">Visit Website</span>

              <Button  onClick={handleApply} className="w-[80%] absolute bottom-6  rounded-md bg-orange-600 hover:bg-orange-700">
                Apply This Possition
              </Button>
            </div>
            {/* Job Overview */}

            <div className=" relative h-[338px] w-[412px] bg-bg-1 border border-slate-200 shadow-md flex flex-col justify-start items-start gap-y-1 ">
              <div className="w-full h-10 text-start flex justify-start items-center bg-slate-200">
                <span className="text-[24px] ml-1">Job Overview</span>
              </div>

              <div className="w-full h-10 text-start flex justify-between items-center border-b border-slate-200 my-1 px-2">
                <div className="flex justify-center items-center gap-1">
                  <Backpack size={20} />
                  <span className="text-[18px]">Date Posted</span>
                </div>
                <span className="text-[16px]">{job?.data?.datePosted}</span>
              </div>
              <div className="w-full h-10 text-start flex justify-between items-center border-b border-slate-200 my-1 px-2">
                <div className="flex justify-center items-center gap-1">
                  <Backpack size={20} />
                  <span className="text-[18px]">Vacancy</span>
                </div>
                <span className="text-[16px]">{job?.data?.vacancy}</span>
              </div>
              <div className="w-full h-10 text-start flex justify-between items-center border-b border-slate-200 my-1 px-2">
                <div className="flex justify-center items-center gap-1">
                  <Backpack size={20} />
                  <span className="text-[18px]">Experience</span>
                </div>
                <span className="text-[16px]">{job?.data?.experienceLevel} Years</span>
              </div>
              <div className="w-full h-10 text-start flex justify-between items-center border-b border-slate-200 my-1 px-2">
                <div className="flex justify-center items-center gap-1">
                  <Backpack size={20} />
                  <span className="text-[18px]">Offered Salary</span>
                </div>
                <span className="text-[16px]">{`BDT ${job?.data?.minSalary} - ${job?.data?.maxSalary} Monthly`}</span>
              </div>
              <div className="w-full h-10 text-start flex justify-between items-center border-b border-slate-200 my-1 px-2">
                <div className="flex justify-center items-center gap-1">
                  <Backpack size={20} />
                  <span className="text-[18px]">Gender</span>
                </div>
                <span className="text-[16px]">{job?.data?.gender}</span>
              </div>
              <div className="w-full h-10 text-start flex justify-between items-center border-b border-slate-200 my-1 px-2">
                <div className="flex justify-center items-center gap-1">
                  <Backpack size={20} />
                  <span className="text-[18px]">Job Deadline</span>
                </div>
                <span className="text-[16px]">{job?.data?.dateDeadline}</span>
              </div>
            </div>
            {/* Job Overview End */}
          </div>
          {/* company logo and apply job section */}
        </div>
        {/* // related Job */}
        <div className="w-full">
          <h4 className="text-[48px]">Related Jobs</h4>

          <RelatedJobs />
        </div>
      </div>
    </>
  );
};

export default JobDetail;
