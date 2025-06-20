"use client"
import { useGetJobByCreatorQuery } from '@/redux/rtk/jobsApi';
import React from 'react'

const page = () => {
    const { data: job, error, isLoading } = useGetJobByCreatorQuery();

    return (
        <div>
            {job?.data?.map((val: any, i: any) => (
                <div key={i} className="flex flex-col justify-center items-center m-2 border border-slate-200">
                    <span>{val.title}</span>

                </div>
            ))}
        </div>
    )
}

export default page
