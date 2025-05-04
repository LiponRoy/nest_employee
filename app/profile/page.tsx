'use client';
import UserTable from '@/components/applyedJobsTable';
import { useAppliedJobsByUserQuery } from '@/redux/rtk/applicationApi';
// import ProtectedRoute from '@/components/ProtectedRoute';
import { useGetProfileQuery } from '@/redux/rtk/auth';
import React from 'react';

const page = () => {
    const { data: user, isLoading } = useGetProfileQuery({});

    // this is for get single job
    const {
        data: appliedJobs,
        isLoading: applyJobsLoading,
        error,
    } = useAppliedJobsByUserQuery();

    console.log('user', appliedJobs);

    return (
        // <ProtectedRoute>
        <div className="h-screen w-1/2 mx-auto">
            <div className="   flex flex-col justify-start items-center ">
                <h4 className="text-2xl text-orange-500">
                    Hi, You are a {user?.data.role}
                </h4>

                <div className="flex flex-col justify-center items-start">
                    <span>
                        <span>Id :</span>
                        {user?.data?._id}
                    </span>
                    <span>
                        <span>Name :</span>
                        {user?.data?.name}
                    </span>
                    <span>
                        <span>Email :</span>
                        {user?.data?.email}
                    </span>
                    <span>
                        <span>Role :</span>
                        {user?.data?.role}
                    </span>
                </div>


                <div className=" mt-4 w-full">
                    <span>My Applied Jobs :</span>
                    <UserTable applyedJobs={appliedJobs?.data} />
                </div>

            </div>
        </div>
        // </ProtectedRoute>
    );
};

export default page;
