"use client"
import React from 'react'
import SearchBar from './SearchBar'
import JobsCategorySlider from '../JobsCategorySlider'

const Hero = () => {
    return (
        // <div className="h-screen w-full bg-white-creamy">
        //     <div className='h-full w-full flex flex-col justify-center items-center gap-y-4'>
        //         <span className='text-4xl font-medium text-heading-text'>Find Nearby Jobs <span className='text-bright-blue'>Web Designer.</span></span>
        //         <span className='text-para-text'>It is a Long Established Fact That a Reader Will be Distracted by The Readable.</span>
        //         <SearchBar />
        //     </div>
        // </div>
        <section className="relative h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url(/hero-bg.jpg)' }}>
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className='z-20 h-full w-full flex flex-col justify-center items-center gap-y-6 mx-10'>
                <span className='text-4xl font-medium text-white-creamy'>Find Nearby Jobs <span className='text-orange-600'>From Here.</span></span>
                <span className=' text-white'>It is a Long Established Fact That a Reader Will be Distracted by The Readable.</span>
                <SearchBar />
                {/* cards */}

                <div className="w-full mt-20">
                    <JobsCategorySlider />
                </div>
            </div>

        </section>
    )
}

export default Hero