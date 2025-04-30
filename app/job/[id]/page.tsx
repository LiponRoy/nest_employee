"use client"
import React from 'react'
import { useParams } from 'next/navigation';
import { useGetJobByIdQuery } from '@/redux/rtk/jobsApi';

const page = () => {
    const { id } = useParams();
    const { data: job, isLoading, error } = useGetJobByIdQuery(id as string);
    console.log("data details", job)
    return (
        <div className="flex flex-col justify-start items-start">
            <span>Details :{job?.data?.description}</span>
            <span>Location :{job?.data?.location}</span>
            <span>Salary :{job?.data?.maxSalary}</span>
        </div>
    )
}

export default page