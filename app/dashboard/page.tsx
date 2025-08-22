"use client";

import { useAppliedJobsByUserQuery } from "@/redux/rtk/applicationApi";
import { useGetProfileQuery } from "@/redux/rtk/auth";
import Link from "next/link";
import { useEffect, useState } from "react";
import { User, Briefcase, Building2, FileCheck2, XCircle, PlusCircle, Layers } from "lucide-react";

export default function OverviewPage() {
  // Role Based Access
  const { data: user } = useGetProfileQuery({});
  const [isUserEmployer, setIsUserEmployer] = useState(false);
  const [isJobseeker, setIsJobseeker] = useState(false);

  useEffect(() => {
    if (user) {
      setIsUserEmployer(user.data.role === "employer");
      setIsJobseeker(user.data.role === "job_seeker");
    }
  }, [user]);

  // Applied Jobs
  const {
    data: appliedJobs,
    isLoading: applyJobsLoading,
  } = useAppliedJobsByUserQuery();

  const Card = ({
    href,
    icon: Icon,
    count,
    title,
    subtitle,
  }: {
    href?: string;
      icon: React.ElementType;
    count?: number | string;
    title: string;
    subtitle?: string;
  }) => {
    const content = (
      <div className="w-[270px] h-[200px] rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-center items-center gap-3 cursor-pointer p-4">
        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-50 text-blue-600">
          <Icon size={28} />
        </div>
        {count !== undefined && (
          <span className="text-2xl font-semibold text-gray-800">{count}</span>
        )}
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-700">{title}</h3>
          {subtitle && (
            <p className="text-sm text-gray-500 leading-tight">{subtitle}</p>
          )}
        </div>
      </div>
    );

    return href ? <Link href={href}>{content}</Link> : content;
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>

      {isJobseeker && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card
            href="/dashboard/JobSeeker_Profile"
            icon={User}
            title="Profile"
            subtitle="View & Update Profile"
          />
          <Card
            href="/dashboard/JobSeeker-AppliedJobs"
            icon={Briefcase}
            title="Applied Jobs"
            count={
              applyJobsLoading ? "..." : appliedJobs?.data?.length ?? 0
            }
          />
          <Card
            icon={FileCheck2}
            title="Accepted Jobs"
            count={0}
          />
          <Card
            icon={XCircle}
            title="Rejected Jobs"
            count={0}
          />
        </div>
      )}

      {isUserEmployer && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card
            href="/dashboard/JobSeeker_Profile"
            icon={User}
            title="Profile"
            subtitle="View & Update Profile"
          />
          <Card
            href="/dashboard/addJob"
            icon={PlusCircle}
            title="Post a Job"
          />
          <Card
            href="/dashboard/addCompany"
            icon={Building2}
            title="Create a Company"
          />
          <Card
            href="/dashboard/getJobByCreator"
            icon={Layers}
            title="Posted Jobs"
          />
          <Card
            href="/dashboard/getCompanyByCreator"
            icon={Building2}
            title="All Companies"
          />
        </div>
      )}
    </div>
  );
}
