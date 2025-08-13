// "use client"
// import { useAppliedJobsByUserQuery } from '@/redux/rtk/applicationApi';
// import React from 'react'
// import UserTable from '@/components/applyedJobsTable';

// const AppliedJobsForJobSeeker = () => {
//       // this is for get single job
//       const {
//           data: appliedJobs,
//           isLoading: applyJobsLoading,
//           error,
//       } = useAppliedJobsByUserQuery();


//   return (
//     <div>
//       <div className=" mt-4 w-full">
//                           <span>My Applied Jobs :</span>
//                           <UserTable applyedJobs={appliedJobs?.data} />
//                       </div>
//     </div>
//   )
// }

// export default AppliedJobsForJobSeeker
"use client";

import { useAppliedJobsByUserQuery } from '@/redux/rtk/applicationApi';
import React from 'react';
import UserTable from '@/components/applyedJobsTable';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

const AppliedJobsForJobSeeker = () => {
  const {
    data: appliedJobs,
    isLoading: applyJobsLoading,
    isError,
    error,
  } = useAppliedJobsByUserQuery();

  if (applyJobsLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <span>Loading your applied jobs...</span>
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

  if (!appliedJobs?.data || appliedJobs.data.length === 0) {
    return (
      <div className="mt-4">
        <span>You have not applied to any jobs yet.</span>
      </div>
    );
  }

  return (
    <div className="mt-4 w-full">
      <span>My Applied Jobs:</span>
      <UserTable applyedJobs={appliedJobs.data} />
    </div>
  );
};

export default AppliedJobsForJobSeeker;
