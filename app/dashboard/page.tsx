"use client";
import { useAppliedJobsByUserQuery } from "@/redux/rtk/applicationApi";
import Link from "next/link";

export default function OverviewPage() {
  const {
    data: appliedJobs,
    isLoading: applyJobsLoading,
    // isError,
    // error,
  } = useAppliedJobsByUserQuery();
  return <div className="text-xl">

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 m-4">
      <Link
        href="/dashboard/JobSeeker_Profile"
      >
        <div className="w-[270px] h-[200px] rounded-md flex flex-col justify-center items-center border border-secondary-1  bg-slate-200 hover:shadow-md cursor-pointer">
          <span>Profile</span>
          <span>&</span>
          <span>Update Profile</span>
        </div>
      </Link>
      <Link
        href="/dashboard/JobSeeker-AppliedJobs"

      >
        <div className="w-[270px] h-[200px] rounded-md flex flex-col justify-center items-center border border-secondary-1  bg-slate-200 hover:shadow-md cursor-pointer">

          {applyJobsLoading ? <span>Loading...</span> : <span>{appliedJobs?.data?.length}</span>}
          <span>Applied Job</span>

        </div>

      </Link>
      <div className="w-[270px] h-[200px] rounded-md flex flex-col justify-center items-center border border-secondary-1  bg-slate-200 hover:shadow-md cursor-pointer">
        <span>0</span>
        <span>Accepted Job</span>

      </div>
      <div className="w-[270px] h-[200px] rounded-md flex flex-col justify-center items-center border border-secondary-1  bg-slate-200 hover:shadow-md cursor-pointer">
        <span>0</span>
        <span>Rejected Job</span>

      </div>
    </div>








  </div>;
}
