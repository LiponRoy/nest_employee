"use client"
import { useAppliedJobsByUserQuery } from '@/redux/rtk/applicationApi';
import React from 'react'
import UserTable from '@/components/applyedJobsTable';

const AppliedJobsForJobSeeker = () => {
      // this is for get single job
      const {
          data: appliedJobs,
          isLoading: applyJobsLoading,
          error,
      } = useAppliedJobsByUserQuery();


  return (
    <div>
      <div className=" mt-4 w-full">
                          <span>My Applied Jobs :</span>
                          <UserTable applyedJobs={appliedJobs?.data} />
                      </div>
    </div>
  )
}

export default AppliedJobsForJobSeeker