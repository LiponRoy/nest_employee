import SearchFilter from '@/components/SearchBar/SearchFilter'
import { latestJobs } from '@/constant/Constant'
import { ILatestJobs } from '@/types/Types'
import React from 'react'

const Jobs = () => {
    return (
        <div className='container-custom'>
            <div className="w-full flex flex-col justify-center items-center">
                <div className="w-full">
                    <div className="w-full bg-slate-200">
                       <SearchFilter/>
                    </div>
                    <div className="w-full bg-slate-300">
                        Options bar
                    </div>
                </div>
                <div className="w-full grid grid-cols-1 md:grid-cols-5">
                    <div className="col-span-1 bg-slate-400">
                        left side filter bar
                    </div>
                    <div className="col-span-4 bg-slate-500">
                    <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-2">
        {latestJobs?.map((val: ILatestJobs, i) => (
          <div
            key={i}
            className=" border border-slate-200 p-4 m-2 bg-slate-100 hover:bg-red-300 cursor-pointer rounded-md"
          >
            <div className="flex flex-col justify-start items-start">
              <span>{val.companyName}</span>
              <span className="text-lg font-medium text-orange-600">{val.title}</span>
              <span>{val.description}</span>
            </div>
            <div className="w-full flex justify-between items-center mt-4 rounded-lg">
              <div className="flex justify-center items-center">
          
                <h4>position: {val.position}</h4>
              </div>
              <div className="flex justify-center items-center">
                
                <h4>jobType: {val.jobType}</h4>
              </div>
            </div>
          </div>
        ))}
      </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Jobs