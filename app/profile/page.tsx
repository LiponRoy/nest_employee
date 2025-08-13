'use client';
import UserTable from '@/components/applyedJobsTable';
import { useAppliedJobsByUserQuery } from '@/redux/rtk/applicationApi';
// import ProtectedRoute from '@/components/ProtectedRoute';
import { useGetProfileQuery } from '@/redux/rtk/auth';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import React from 'react';

const Profile = () => {
    const { data: user, isLoading } = useGetProfileQuery({});

    // this is for get single job
    const {
        data: appliedJobs,
        isLoading: applyJobsLoading,
        isError,
    error,
    } = useAppliedJobsByUserQuery();

    console.log('user', appliedJobs);

       if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <span>Loading Profile</span>
      </div>
    );
  }
       if (applyJobsLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <span>Applying jobs .</span>
      </div>
    );
  }

    if (isError) {
    let errorMessage = 'Unknown error occurred';

    if (error && 'status' in error) {
      // error is FetchBaseQueryError
      const fetchError = error as FetchBaseQueryError;
      if (fetchError.data && typeof fetchError.data === 'object' && 'message' in fetchError.data) {
        errorMessage = (fetchError.data as { message: string }).message;
      } else if (typeof fetchError.data === 'string') {
        errorMessage = fetchError.data;
      }
    } else if (error && 'message' in error) {
      // error is SerializedError
      errorMessage = (error as { message?: string }).message || errorMessage;
    }

    return (
      <div className="text-red-500 mt-4">
        <span>Error fetching jobs: {errorMessage}</span>
      </div>
    );
  }

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

export default Profile;
