"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useGetProfileQuery } from "@/redux/rtk/auth";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/addJob", label: "Post a new job" },
  { href: "/dashboard/addCompany", label: "Create a company" },
  { href: "/dashboard/getJobByCreator", label: "Posted Jobs" },
  { href: "/dashboard/getCompanyByCreator", label: "All companes" },
];

const jobseekerNavItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/JobSeeker_Profile", label: "Profile" },
  { href: "/dashboard/JobSeeker-AppliedJobs", label: "Applied Jobs" },
];

export default function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

    // Role Based Access
    const { data: user, isLoading } = useGetProfileQuery({});

    const [isUserEmployer, setIsUserEmployer] = useState(false);
    const [isJobseeker, setIsJobseeker] = useState(false);

    useEffect(() => {
      if (user) {
        setIsUserEmployer(user.data.role === "employer");
        setIsJobseeker(user.data.role === "job_seeker");
      }
    }, [user]);
    // Role Based Access End



  return (
    <aside
      className={`
        fixed z-50 top-0 left-0 h-full w-64 bg-white shadow-lg p-4
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:relative md:translate-x-0 md:shadow-none md:block
      `}
    >
      {/* Mobile Close Button */}
      <div className="flex justify-between items-center md:hidden mb-6">
        <h2 className="text-xl font-bold">Dashboard</h2>
        <button onClick={onClose}>
          <X className="w-6 h-6 text-gray-800" />
        </button>
      </div>

      {/* Static Title on Desktop */}
      <h2 className="text-xl font-bold mb-6 hidden md:block">Dashboard</h2>

      <ul className="space-y-4">
      {isUserEmployer && navItems?.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`block px-3 py-2 rounded hover:bg-gray-100 ${
                pathname === item.href ? "bg-gray-200 font-semibold" : ""
              }`}
              onClick={onClose} // close drawer on mobile
            >
              {item.label}
            </Link>
          </li>
        ))}
      {isJobseeker && jobseekerNavItems?.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`block px-3 py-2 rounded hover:bg-gray-100 ${
                pathname === item.href ? "bg-gray-200 font-semibold" : ""
              }`}
              onClick={onClose} // close drawer on mobile
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
