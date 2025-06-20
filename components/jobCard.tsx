// import * as React from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import { Button } from "./ui/button"; // You can also replace this with a normal <button> if needed
// import { ArrowUpRight, Layers } from "lucide-react";

// type JobCardProps = {
//   logo: string;
//   companyName: string;
//   title: string;
//   gender: string;
//   jobType: string;
//   maxSalary: string;
//   minSalary: string;
//   location: string;
//   salary: string | number;
//   id: string;
// };

// export const JobCard = ({
//   title,
//   gender,
//   logo,
//   companyName,
//   jobType,
//   maxSalary,
//   minSalary,
//   location,
//   id,
// }: JobCardProps) => {
//   const router = useRouter();

//   return (
//     <div className="group  w-full h-[235px] border rounded-lg shadow-md p-6 bg-white relative">
//       <div className="w-full flex flex-col justify-start items-start">
//         <div className="w-full">
//           <div className="flex items-center justify-start space-x-3">
//             <div className="border-2 border-slate-200 rounded-md p-1">
//               <Image
//                 src={logo}
//                 alt={title}
//                 width={32}
//                 height={32}
//                 className="w-10 h-10 object-contain "
//               />
//             </div>
//             <div>
//               <h2 className="text-[24px] md:text-[28px] font-semibold text-gray-800">
//                 {companyName}
//               </h2>
//               <span className=" text-[14px]">{location}</span>
//             </div>
//           </div>

//           <div className="w-full ml-1 mt-1">
//             <div className="flex flex-col justify-center items-start">
//               <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
//               <div className="flex justify-center items-center gap-2 mt-3">
//                 <p className="text-[14px] font-medium bg-slate-200 rounded-xl px-2">
//                   {jobType}
//                 </p>
//                 <p className="text-[14px] font-medium bg-slate-200 rounded-xl px-2">
//                   <span className="mr-2">Gender :</span>
//                   {gender}
//                 </p>
//               </div>
//             </div>

//             <div className="w-full flex justify-between items-end ">
//               <div className="flex justify-center items-center gap-x-2">
//                 <Layers size={20} className=" text-slate-400" />
//                 <p className="text-[16px] md:text-normal font-medium">
//                   BDT {maxSalary?.toLocaleString("en-IN")} -{" "}
//                   {minSalary?.toLocaleString("en-IN")}
//                 </p>
//               </div>
//               <div
//                 className="border border-secondary-1 h-12 w-[35%] text-[18px] font-semibold rounded-md flex justify-center items-center cursor-pointer transition-all duration-500 ease-in-out group-hover:bg-secondary-1 group-hover:text-white mt-2 md:mt-0"
//                 onClick={() => router.push(`/jobDetail/${id}`)}
//               >
//                 <ArrowUpRight
//                   size={18}
//                   className="text-secondary-1 group-hover:text-white mr-1"
//                 />
//                 <span className="text-slate-600 group-hover:text-white text-[18px]">
//                   Details
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

import * as React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "./ui/button";
import { ArrowUpRight, Layers } from "lucide-react";

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
  logo,
  companyName,
  title,
  gender,
  jobType,
  maxSalary,
  minSalary,
  location,
  id,
}: JobCardProps) => {
  const router = useRouter();

  return (
    <article className="group relative flex flex-col justify-between h-full p-6 border border-slate-200 bg-white rounded-lg shadow-sm transition hover:shadow-md">
      {/* Header: Company Logo + Name */}
      <header className="flex items-start gap-4 mb-5">
        <div className="p-2 border rounded-lg border-slate-200 bg-slate-50 shrink-0">
          <Image
            src={logo}
            alt={companyName}
            width={48}
            height={48}
            className="object-contain w-12 h-12"
          />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-800">{companyName}</h2>
          <p className="text-sm text-slate-500">{location}</p>
        </div>
      </header>

      {/* Main Content: Job Title and Tags */}
      <section className="mb-4">
        <h3 className="text-lg font-medium text-slate-800">{title}</h3>
        <div className="flex flex-wrap gap-2 mt-2">
          <span className="inline-block text-sm font-medium bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
            {jobType}
          </span>
          <span className="inline-block text-sm font-medium bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
            Gender: {gender}
          </span>
        </div>
      </section>

      {/* Footer: Salary and View Button */}
      <footer className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
        <div className="flex items-center gap-2 text-slate-600">
          <Layers size={18} className="text-secondary-1" />
          <p className="text-sm font-semibold">
            BDT {minSalary?.toLocaleString("en-IN")} - {maxSalary?.toLocaleString("en-IN")}
          </p>
        </div>

        <Button
          variant="secondary"
          className="bg-secondary-1 hover:bg-secondary-2 transition text-white px-4 py-2 text-sm flex items-center gap-2 rounded-lg"
          onClick={() => router.push(`/jobDetail/${id}`)}
        >
          Details <ArrowUpRight size={16} />
        </Button>
      </footer>
    </article>
  );
};

