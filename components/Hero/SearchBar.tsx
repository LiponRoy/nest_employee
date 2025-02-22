import { JobType, OrganizationsType, selectFieldStyle } from "@/constant/Constant";
import { IJobType } from "@/types/Types";
import { useState } from "react";
import SelectInput from "../SelectInput";
import { Button } from "../ui/button";

const MyComponent = () => {


    const [selectedOrg, setSelectedOrg] = useState<IJobType | null>(null);
    const [selectedOrgType, setSelectedOrgType] = useState<IJobType | null>(null);

    return (
        <div className="w-[60%] grid grid-cols-1 md:grid-cols-5 gap-4 bg-slate-200 rounded-md md:rounded-full border-4 border-slate-300 shadow-lg py-1 4 px-4 md:px-10 mx-4 md:mx-0">
            <div className=" border md:border-r-slate-400 col-span-2 flex justify-start items-center">
                <SelectInput
                    options={JobType}
                    value={selectedOrg}
                    onChange={setSelectedOrg}
                    newStyle={selectFieldStyle}
                    placeholder="Select Jobs "
                />
            </div>
            <div className=" border md:border-r-slate-400 col-span-2 flex justify-start items-center">
                <SelectInput
                    options={OrganizationsType}
                    value={selectedOrgType}
                    onChange={setSelectedOrgType}
                    newStyle={selectFieldStyle}
                    placeholder="Select Organization Type"
                />
            </div>
            <div className=" col-span-1">
                <Button className="w-full py-8 rounded-md md:rounded-full  bg-orange-600 hover:bg-orange-700">
                    Search Jobs
                </Button>
            </div>

        </div>
    );
};

export default MyComponent;







// "use client"

// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Search } from 'lucide-react';
// import { Organizations } from "@/constant/Constant";

// const formSchema = z.object({
//     keywordSearch: z.string().min(2, "Empty keyword"),
//     OrganizationSearch: z.string().min(2, "Empty keyword"),
// });

// type FormData = z.infer<typeof formSchema>;

// const SearchBar = () => {
//     const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
//         resolver: zodResolver(formSchema),
//     });

//     const onSubmit = (data: FormData) => {
//         console.log(data);
//     };

//     return (
//         <div className="container-custom w-full  p-6 ">
//             <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-3 gap-x-2 bg-white p-6 rounded-full">
//                 <input className="w-full rounded-full px-4 focus:ring-white" {...register("keywordSearch")} placeholder="Search By Keyword" />
//                 {errors.keywordSearch && <span>{errors.keywordSearch.message}</span>}
//                 <select className="w-full rounded-full px-4 focus:ring-white"
//                     id="fruit"
//                     {...register('OrganizationSearch', { required: 'Please select a fruit' })}
//                 >
//                     <option className="w-full rounded-full px-4 text-slate-200 focus:ring-white" value="">Organization Type</option>
//                     {Organizations?.map((val: any, i) => (
//                         <option key={i} className="" value={val.value}>{val.title}</option>

//                     ))}

//                 </select>
//                 {errors.OrganizationSearch && (
//                     <span className="text-red-500">{errors.OrganizationSearch.message}</span>
//                 )}

//                 <div className="flex justify-center items-center space-x-2 bg-orange-deep text-white  rounded-full ml-20">
//                     <Search size={22} />
//                     <button className=" text-base capitalize p-4" type="submit">Search Jobs</button>
//                 </div>
//             </form>
//         </div>
//     );
// }

// export default SearchBar