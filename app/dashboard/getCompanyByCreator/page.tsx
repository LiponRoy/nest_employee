"use client"
import { useGetCompanyByCreatorQuery } from '@/redux/rtk/companyApi';
import React from 'react'

const page = () => {
    const { data: company, error, isLoading } = useGetCompanyByCreatorQuery();

    return (
        <div>
            {company?.data?.map((val: any, i: any) => (
                <div key={i} className="flex flex-col justify-center items-center m-2 border border-slate-200">
                    <span>{val.name}</span>

                </div>
            ))}
        </div>
    )
}

export default page
