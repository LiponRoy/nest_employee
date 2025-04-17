"use client"
// import ProtectedRoute from '@/components/ProtectedRoute';
import { useGetProfileQuery } from '@/redux/rtk/auth';
import React from 'react'

const page = () => {
    const { data: user, isLoading } = useGetProfileQuery({});

    return (
        // <ProtectedRoute>
        <div className=' h-screen w-full flex flex-col justify-start items-center'>

            <h4 className='text-2xl text-orange-500'>Hi, You are a {user?.data.role}</h4>


            <div className="flex flex-col justify-center items-start">
                <span><span>Id :</span>{user?.data?._id}</span>
                <span><span>Name :</span>{user?.data?.name}</span>
                <span><span>Email :</span>{user?.data?.email}</span>
                <span><span>Role :</span>{user?.data?.role}</span>
            </div>
        </div>
        // </ProtectedRoute>
    )
}

export default page