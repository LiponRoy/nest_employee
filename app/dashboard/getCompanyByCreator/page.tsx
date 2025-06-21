"use client"
import { useGetCompanyByCreatorQuery } from '@/redux/rtk/companyApi';
import React from 'react'

const page = () => {
    const { data: company, error, isLoading } = useGetCompanyByCreatorQuery();

    return (
        // <div>
        //     {company?.data?.map((val: any, i: any) => (
        //         <div key={i} className="grid grid-cols-4 m-2 border border-slate-200 gap-2">
        //             <span>{val.name}</span>

        //         </div>
        //     ))}
        // </div>
                <div className="w-full">
            {company?.data?.map((val: any, i: any) => (
                <div
                    key={i}
                    className="grid grid-cols-4 m-4 border border-slate-200 "
                >
                    <div className="w-full flex flex-col justify-center items-start m-2">
                        <span>{val.name}</span>
                        <span className="w-full bg-slate-200 px-1 rounded-md">{val.location}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default page
