import React from 'react'
import { Backpack } from "lucide-react";

const JobDetail = () => {
  return (
    <>
      <div className="container-custom">
        <div className="w-full h-1/2 bg-slate-200  pb-20 pt-5">
          <div className="w-full h-full flex flex-col justify-start items-start">
            <span className='text-[48px]'>Senior UI Designer</span>
            <div className="flex justify-start items-center gap-x-6 mt-[22px]">
              <div className="flex justify-center items-center gap-x-1">
                <Backpack />
                <span className='text-[18px]'>Dhaka, Bangladesh</span>
              </div>
              <div className="flex justify-center items-center gap-x-1">
                <Backpack />
                <span className='text-[18px]'>Full Time</span>
              </div>
              <div className="flex justify-center items-center gap-x-1">
                <Backpack />
                <span className='text-[18px]'>1 Years Ago</span>
              </div>
              <div className="flex justify-center items-center gap-x-1">
                <Backpack />
                <span className='text-[16px]'>$1000 - $2000 Monthly</span>
              </div>
            </div>
            <div className="w-full flex justify-start items-center gap-x-8 mt-[24px]">
              <div className="flex justify-center items-center bg-slate-300 px-4 py-1 rounded-md">
                <span>web ui</span>
              </div>
              <div className="flex justify-center items-center bg-slate-300 px-4 py-1 rounded-md">
                <span>user interface</span>
              </div>
              <div className="flex justify-center items-center bg-slate-300 px-4 py-1 rounded-md">
                <span>Creative</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default JobDetail
