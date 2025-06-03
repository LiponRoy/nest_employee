import * as React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "./ui/button"; // You can also replace this with a normal <button> if needed

type JobCardProps = {
  logo: string;
  companyName: string;
  title: string;
  gender: string;
  jobType: string;
  maxSalary: string;
  minSalary: string;
  location: string;
  salary: string | number;
  id: string;
};

export const JobCard = ({
  title,
  gender,
  logo,
  companyName,
  jobType,
  maxSalary,
  minSalary,
  location,
  id,
}: JobCardProps) => {
  const router = useRouter();

  return (
    <div className="group w-[90%] md:w-full h-[300px] border rounded-xl shadow-md p-6 bg-white relative">
      <div className="w-full flex flex-col justify-start items-start">
        <div className="">
          <div className="flex items-center justify-start space-x-3 mb-2">
            <Image
              src={logo}
              alt={title}
              width={32}
              height={32}
              className="w-10 h-10 object-contain"
            />
            <div>
              <h2 className="text-[24px] md:text-[28px] font-semibold text-gray-800">
                {companyName}
              </h2>
              <span className=" text-[14px]">{location}</span>
            </div>
          </div>

          <div className="space-y-4 ml-2">
            <div className="flex flex-col justify-center items-start">
              <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
              <div className="flex justify-center items-center gap-2 mt-3">
                <p className="text-[14px] font-medium bg-slate-200 rounded-xl px-2">
                  {jobType}
                </p>
                <p className="text-[14px] font-medium bg-slate-200 rounded-xl px-2">
                  <span className="mr-2">Gender:</span>
                  {gender}
                </p>
              </div>
            </div>

            <div>
              <p className="text-base font-medium">
                BDT {maxSalary?.toLocaleString("en-IN")} - BDT{" "}
                {minSalary?.toLocaleString("en-IN")}
              </p>
            </div>

          </div>
        </div>
        <div
  className="absolute bottom-4 border border-secondary-1 h-12 w-[60%] text-[18px] font-semibold rounded-md flex justify-center items-center cursor-pointer transition-all duration-500 ease-in-out group-hover:bg-primary-1 group-hover:text-white"
  onClick={() => router.push(`/jobDetail/${id}`)}
>
  <span>Details</span>
</div>


      </div>
    </div>
  );
};
