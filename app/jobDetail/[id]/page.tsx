"use client";
import React, { useEffect, useState } from "react";
import { ArrowBigRight, ArrowRight, Clock4, Landmark, MapPin, Microscope, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
// import RelatedJobs from "@/components/RelatedJobs";
import { useParams } from "next/navigation";
import { useGetJobByIdQuery } from "@/redux/rtk/jobsApi";
import {
    useApplyForJobMutation,
    useGetIsAppliedQuery,
} from "@/redux/rtk/applicationApi";
import { errorToast, successToast } from "@/components/Toast";
import { useGetProfileQuery } from "@/redux/rtk/auth";
import { useAppDispatch } from "@/redux/hooks";
import { openLoginModal } from "@/redux/slices/loginFormModalSlice";
import { Requirement, Responsibility, SalaryAndBenefit, SkillAndExperience } from "@/constant/Constant";

const JobDetail = () => {
    const { id } = useParams();
    const jobId = id as string;
    const dispatch = useAppDispatch();

    // this is for get current login user
    const { data: currentUser } = useGetProfileQuery({});

    // this is for get single job
    const { data: job, isLoading, error } = useGetJobByIdQuery(jobId);
    // this is for apply job
    const [applyForJob, { isLoading: isApplying }] =
        useApplyForJobMutation();

    // for already applied true or false
    const {
        data: isAppliedData,
        refetch: refetchIsApplied,
    } = useGetIsAppliedQuery(jobId, {
        refetchOnMountOrArgChange: true,
    });
    // End for already applied true or false

    // Role Based Access
    const [isJobSeeker, setIsJobSeeker] = useState(false);
    const [isEmployer, setIsEmployer] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        if (currentUser) {
            setIsJobSeeker(currentUser.data.role === "job_seeker");
            setIsEmployer(currentUser.data.role === "employer");
            setIsAdmin(currentUser.data.role === "admin");
        }
    }, [currentUser]);
    // Role Based Access End

    const handleApply = async () => {
        if (!currentUser) {
            dispatch(openLoginModal());
        }
        if (isEmployer || isAdmin) {
            successToast("To Apply Login As An Job Seeker");
            return;
        }
        try {
            await applyForJob(jobId).unwrap();
            await refetchIsApplied(); // <- Force re-check IsApplied
            successToast("Applied successfully!");
        } catch (err: unknown) {
            console.error("Application failed:", err);
            if (
                typeof err === "object" &&
                err !== null &&
                "data" in err &&
                typeof (err as { data?: { message?: string } }).data?.message === "string"
            ) {
                errorToast((err as { data?: { message?: string } }).data?.message || "An error occurred");
            } else {
                errorToast("An error occurred");
            }
        }
    };

    if (isLoading) return <div>Loading job details...</div>;
    if (error) return <div>Failed to load job.</div>;
    return (
        <>
            <div className="container-custom  mb-6">
                {/* Header */}
                <div className="w-full h-1/2 bg-slate-100 pb-5 md:pb-10 pt-5 pl-2 border-l-8 border-secondary-1">
                    <div className="w-full h-full flex flex-col justify-start items-start">
                        <span className="text-[32px] md:text-[48px]">{job?.data?.title}</span>
                        <div className="flex flex-col md:flex-row justify-start items-start md:items-center space-x-0 md:space-x-7 mt-[22px] space-y-3 md:space-y-0">
                             <div className="flex justify-center items-center gap-x-1">
                                <Landmark size={22}  className="text-primary-1 mr-1" />

                                <span className="text-[16px]">
                                    {`BDT ${job?.data?.minSalary.toLocaleString(
                                        "en-IN"
                                    )} - ${job?.data?.maxSalary.toLocaleString(
                                        "en-IN"
                                    )} Monthly`}
                                </span>
                            </div>
                            <div className="flex justify-center items-center gap-x-1">
                                <MapPin size={22}  className="text-primary-1 mr-1" />
                                <span className="text-[18px]">
                                    {job?.data?.location}
                                </span>
                            </div>
                            <div className="flex justify-center items-center gap-x-1">
                                <Clock4 size={22}  className="text-primary-1 mr-1" />

                                <span className="text-[18px]">
                                    {job?.data?.jobType}
                                </span>
                            </div>
                            <div className="flex justify-center items-center gap-x-1">
                                <Microscope size={22}  className="text-primary-1 mr-1" />

                                <span className="text-[18px]">
                                    Vacancy : {job?.data?.vacancy}
                                </span>
                            </div>
                            <div className="flex justify-center items-center gap-x-1">
                                <Users size={22}  className="text-primary-1 mr-1" />

                                <span className="text-[18px]">
                                   Gender : {job?.data?.gender}
                                </span>
                            </div>
                           
                        </div>

                       
                    </div>
                </div>
                {/* Header End*/}
                <div className="grid grid-cols-1 md:grid-cols-5 mt-4">
                    <div className="col-span-3 space-y-6">
                        {/* Job Description */}
                        <div className="w-full flex flex-col justify-start items-start">
                           <div className="flex justify-center items-center space-x-1 mb-1">
                             <ArrowBigRight size={22} className="text-primary-1"/>
                            <span className="text-[22px] font-semibold text-slate-700 ">
                                Job Description :
                            </span>
                           </div>
                            <p>{job?.data?.description}</p>
                        </div>
                        {/* Job Description End */}
                        {/* Job skillAndExperience */}
                         <div className="flex flex-col justify-start items-start gap-x-2 mt-[24px]">
                            <div className="flex justify-center items-center space-x-1 mb-1">
                             <ArrowBigRight size={22} className="text-primary-1"/>
                            <span className="text-[22px] font-semibold text-slate-700 " >
                             Skill Experience :
                            </span>
                            </div>
                            {(job?.data?.skillAndExperience as SkillAndExperience[] | undefined)?.map((val, i) => (
                                <div
                                    key={i}
                                    className="w-full flex justify-start items-center gap-x-2 p-1 rounded-lg"
                                >
                                    <span>- {val?.title}</span>
                                </div>
                            ))}
                        </div>
                        {/* Job skillAndExperience End */}
                        {/* Job Responsibility */}
                        <div className="w-full flex flex-col justify-start items-start">
                            <div className="flex justify-center items-center space-x-1 mb-1">
                             <ArrowBigRight size={22} className="text-primary-1"/>
                            <h4 className="text-[22px] font-semibold text-slate-700 ">
                                Responsibility :
                            </h4>
                            </div>
                            {(job?.data?.responsibility as Responsibility[] | undefined)?.map((val, i) => (
                                <div
                                    key={i}
                                    className="w-full flex justify-start items-center gap-x-2  p-1"
                                >
                                    <ul>
                                        <li>- {val?.title}</li>
                                    </ul>
                                </div>
                            ))}
                        </div>
                        {/* Job Responsibility End */}
                        {/* Job requirements */}
                        <div className="w-full flex flex-col justify-start items-start">
                            <div className="flex justify-center items-center space-x-1 mb-1">
                             <ArrowBigRight size={22} className="text-primary-1"/>
                            <h4 className="text-[22px] font-semibold text-slate-700 ">
                                Requirements :
                            </h4>
</div>
                            {(job?.data?.requirements as Requirement[] | undefined)?.map((val, i) => (
                                <div
                                    key={i}
                                    className="w-full flex justify-start items-center gap-x-2  p-1"
                                >
                                    <ul>
                                        <li>- {val?.title}</li>
                                    </ul>
                                </div>
                            ))}
                        </div>
                        {/* requirements End */}
                        {/* Salary and Benefits */}
                        <div className="w-full flex flex-col justify-start items-start">
                            <div className="flex justify-center items-center space-x-1 mb-1">
                             <ArrowBigRight size={22} className="text-primary-1" />
                            <h4 className="text-[22px] font-semibold text-slate-700 ">
                                Salary and Benefits :
                            </h4>
</div>
                            {(job?.data?.salaryAndBenefits as SalaryAndBenefit[] | undefined)?.map((val, i) => (
                                <div
                                    key={i}
                                    className="w-full flex justify-start items-center gap-x-2  p-1"
                                >
                                    <ul>
                                        <li>- {val?.title}</li>
                                    </ul>
                                </div>
                            ))}
                        </div>
                        {/* Salary and Benefits End */}
                       <div className="hidden md:block">
    
                        {isAppliedData && isAppliedData?.data?.data ? (
                            <div className="w-[20%] absolute  rounded-md bg-slate-400 text-[18px] text-center py-1 text-slate-200">
                                Already applied 
                            </div>
                        ) : (
                            <Button
                                onClick={handleApply}
                                disabled={isApplying || isAppliedData?.data?.data}
                                className="w-[50%] rounded-md bg-secondary-1 hover:bg-secondary-1 text-[18px] "
                            >
                                {/* // Apply Btn */}
                                {isJobSeeker
                                    ? "Apply This Possition"
                                    : "Login as jobseeker to apply"}
                            </Button>
                        )}
                    </div>
                    </div>
                    {/* company logo and apply job section */}
                    <div className="col-span-2  flex flex-col justify-start items-center md:items-end gap-y-4 mt-2">
                        <div className=" relative h-[338px] w-[412px] bg-bg-1 border border-slate-200 shadow-md flex flex-col justify-center items-center gap-y-1">
                            <Image
                                src={job?.data?.companyId?.logoImage ?? "/logo.png"}
                                alt="Example Image"
                                width={300}
                                height={300}
                                priority
                                className="w-[120px] h-[90px]"
                            />
                            <span className="text-[32px] font-semibold">
                                {job?.data?.companyId?.name}{" "}
                            </span>
                            {/* <span className="text-[18px] font-normal">
                                Visit Website
                            </span> */}
                            {isAppliedData && isAppliedData?.data?.data ? (
                                <div className="w-[80%] absolute bottom-6  rounded-md bg-slate-400 text-[18px] text-center py-1 text-slate-200">
                                    Already applied
                                </div>
                            ) : (
                                <Button
                                    onClick={handleApply}
                                    disabled={isApplying}
                                    className="w-[80%] absolute bottom-6  rounded-md bg-secondary-1 hover:bg-secondary-1 text-[18px]"
                                >
                                    {/* // Apply Btn */}
                                    {isJobSeeker
                                        ? "Apply This Position"
                                        : "Login as jobseeker to apply"}
                                </Button>
                            )}
                        </div>
                        {/* Job Overview */}

                        <div className=" relative h-[338px] w-[400px] md:w-[412px] bg-bg-1 border border-slate-200 shadow-md flex flex-col justify-start items-start gap-y-1 ">
                            <div className="w-full h-10 text-start flex justify-start items-center bg-slate-200">
                                <span className="text-[24px] ml-1">
                                    Job Overview
                                </span>
                            </div>
                            <div className="w-full h-10 text-start flex justify-between items-center border-b border-slate-200 my-1 px-2">
                                <div className="flex justify-center items-center gap-1">
                                   <ArrowRight size={18} />
                                    <span className="text-[18px]">
                                        Offered Salary
                                    </span>
                                </div>
                                <span className="text-[16px]">{`${job?.data?.minSalary.toLocaleString(
                                    "en-IN"
                                )} - ${job?.data?.maxSalary.toLocaleString(
                                    "en-IN"
                                )} Monthly`}</span>
                            </div>
                            
                            <div className="w-full h-10 text-start flex justify-between items-center border-b border-slate-200 my-1 px-2">
                                <div className="flex justify-center items-center gap-1">
                                    <ArrowRight size={18} />
                                    <span className="text-[18px]">Vacancy</span>
                                </div>
                                <span className="text-[16px]">
                                    {job?.data?.vacancy}
                                </span>
                            </div>
                            <div className="w-full h-10 text-start flex justify-between items-center border-b border-slate-200 my-1 px-2">
                                <div className="flex justify-center items-center gap-1">
                                   <ArrowRight size={18} />
                                    <span className="text-[18px]">
                                        Experience
                                    </span>
                                </div>
                                <span className="text-[16px]">
                                    {job?.data?.experienceLevel} Years
                                </span>
                            </div>
                           
                            <div className="w-full h-10 text-start flex justify-between items-center border-b border-slate-200 my-1 px-2">
                                <div className="flex justify-center items-center gap-1">
                                   <ArrowRight size={18} />
                                    <span className="text-[18px]">Gender</span>
                                </div>
                                <span className="text-[16px]">
                                    {job?.data?.gender}
                                </span>
                            </div>
                            <div className="w-full h-10 text-start flex justify-between items-center border-b border-slate-200 my-1 px-2">
                                <div className="flex justify-center items-center gap-1">
                                    <ArrowRight size={18} />
                                    <span className="text-[18px]">
                                        Date Posted
                                    </span>
                                </div>
                                <span className="text-[16px]">
                                    {job?.data?.datePosted}
                                </span>
                            </div>
                            <div className="w-full h-10 text-start flex justify-between items-center border-b border-slate-200 my-1 px-2">
                                <div className="flex justify-center items-center gap-1">
                                    <ArrowRight size={18} />
                                    <span className="text-[18px]">
                                        Job Deadline
                                    </span>
                                </div>
                                <span className="text-[16px]">
                                    {job?.data?.dateDeadline}
                                </span>
                            </div>
                        </div>
                        {/* Job Overview End */}
                    </div>
                    {/* company logo and apply job section */}
                </div>
                
            </div>
        </>
    );
};

export default JobDetail;
