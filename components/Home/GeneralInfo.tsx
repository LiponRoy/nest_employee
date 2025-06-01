import React from 'react'
import { BriefcaseBusiness, Search, User } from "lucide-react";

const GeneralInfo = () => {
    return (
        <div className="w-[90%] md:w-[70%] mx-auto">
            <div className='grid grid-cols-2 md:grid-cols-4 bg-slate-600 text-white opacity-80 space-x-6 p-4 rounded-xl'>

                <div className="flex justify-center items-center space-x-4 border-r pr-8">
                    <BriefcaseBusiness size={42} className='text-2xl font-bold' />
                    <div className="flex flex-col justify-start items-start">
                        <span className='font-bold text-[32px]'>512</span>
                        <span className='font-normal text-[18px]'>LIVE JOBS</span>
                    </div>
                </div>
                <div className="flex justify-center items-center space-x-4 border-r pr-8">
                    <BriefcaseBusiness size={42} className='text-2xl font-bold' />
                    <div className="flex flex-col justify-start items-start">
                        <span className='font-bold text-[32px]'>90</span>
                        <span className='font-normal text-[18px]'>VACANCIES</span>
                    </div>
                </div>
                <div className="flex justify-center items-center space-x-4 border-r pr-8">
                    <BriefcaseBusiness size={42} className='text-2xl font-bold' />
                    <div className="flex flex-col justify-start items-start">
                        <span className='font-bold text-[32px]'>70</span>
                        <span className='font-normal text-[18px]'>COMPANIES</span>
                    </div>
                </div>
                <div className="flex justify-center items-center space-x-4">
                    <BriefcaseBusiness size={42} className='text-2xl font-bold' />
                    <div className="flex flex-col justify-start items-start">
                        <span className='font-bold text-[32px]'>102</span>
                        <span className='font-normal text-[18px]'>NEW JOBS</span>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default GeneralInfo