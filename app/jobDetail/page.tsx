import React from 'react';
import { Backpack } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import RelatedJobs from '@/components/RelatedJobs';


const JobDetail = () => {
  return (
    <>
      <div className="container-custom">
        {/* Header */}
        <div className="w-full h-1/2 bg-bg-1  pb-20 pt-5">
          <div className="w-full h-full flex flex-col justify-start items-start">
            <span className="text-[48px]">Senior UI Designer</span>
            <div className="flex justify-start items-center gap-x-6 mt-[22px]">
              <div className="flex justify-center items-center gap-x-1">
                <Backpack className="text-primary-1" />
                <span className="text-[18px]">Dhaka, Bangladesh</span>
              </div>
              <div className="flex justify-center items-center gap-x-1">
                <Backpack className="text-primary-1" />

                <span className="text-[18px]">Full Time</span>
              </div>
              <div className="flex justify-center items-center gap-x-1">
                <Backpack className="text-primary-1" />

                <span className="text-[18px]">1 Years Ago</span>
              </div>
              <div className="flex justify-center items-center gap-x-1">
                <Backpack className="text-primary-1" />

                <span className="text-[16px]">BDT 50,000- BDT 80,000 Monthly</span>
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
        {/* Header End*/}
        <div className="grid grid-cols-1 md:grid-cols-5">
          <div className="col-span-3 space-y-2">
            {/* Job Description */}
            <div className="w-full flex flex-col justify-start items-start">
              <h4 className="text-[24px] font-semibold">Job Description :</h4>
              <p>
                consectetur adipisicing elit. Debitis eius consequatur, sequi
                tenetur et hic voluptatem delectus maxime laudantium aperiam
                corrupti aliquam at, veniam dolor non dicta.consectetur
                adipisicing elit. Debitis eius consequatur, sequi tenetur et hic
                voluptatem delectus maxime laudantium aperiam corrupti aliquam
                at, veniam dolor non dicta.consectetur adipisicing elit. Debitis
                eius consequatur, sequi tenetur et hic voluptatem delectus
                maxime laudantium aperiam corrupti aliquam at, veniam dolor non
                dicta.consectetur adipisicing elit. Debitis eius consequatur,
                sequi tenetur et hic voluptatem delectus maxime laudantium
                aperiam corrupti aliquam at, veniam dolor non dicta.consectetur
                adipisicing elit. Debitis eius consequatur, sequi tenetur et hic
                voluptatem delectus maxime laudantium aperiam corrupti aliquam
                at, veniam dolor non dicta
              </p>
            </div>
            {/* Job Description End */}
            {/* Job Responsibility */}
            <div className="w-full flex flex-col justify-start items-start">
              <h4 className="text-[24px] font-semibold">Responsibility :</h4>
              <h6>1. Senior Software Engineer should pose mindset and ability to lead small team.</h6>
              <h6>2. Participate in defined meeting as per company policy.</h6>
              <h6>3. Follow review process for peer review to code delivery.</h6>
              <h6>4. Prepare basic design, detail design, execute basic acceptance testing.</h6>
              <h6>5. Perform Unit test and ensure proper test coverage as per organizational standard.</h6>
              <h6>6. Collaborate with cross-functional teams to analyze, design, and implement new features.</h6>
              <h6>7. Design and build web and enterprise application using in ReactJS/Next JS/.Net Core</h6>
              <h6>8. Prepare basic design, detail design, execute basic acceptance testing.</h6>
            </div>
            {/* Job Responsibility End */}
            {/* Job Responsibility */}
            <div className="w-full flex flex-col justify-start items-start">
              <h4 className="text-[24px] font-semibold">Requirements :</h4>
              <h6>1. Senior Software Engineer should pose mindset and ability to lead small team.</h6>
              <h6>2. Participate in defined meeting as per company policy.</h6>
              <h6>3. Follow review process for peer review to code delivery.</h6>
              <h6>4. Prepare basic design, detail design, execute basic acceptance testing.</h6>
              <h6>5. Perform Unit test and ensure proper test coverage as per organizational standard.</h6>
              <h6>6. Collaborate with cross-functional teams to analyze, design, and implement new features.</h6>
              <h6>7. Design and build web and enterprise application using in ReactJS/Next JS/.Net Core</h6>
              <h6>8. Prepare basic design, detail design, execute basic acceptance testing.</h6>
            </div>
            {/* Responsibility End */}
            {/* Salary and Benefits */}
            <div className="w-full flex flex-col justify-start items-start">
              <h4 className="text-[24px] font-semibold">Salary and Benefits :</h4>
              <h6>1. Senior Software Engineer should pose mindset and ability to lead small team.</h6>
              <h6>2. Participate in defined meeting as per company policy.</h6>
              <h6>3. Follow review process for peer review to code delivery.</h6>
              <h6>4. Prepare basic design, detail design, execute basic acceptance testing.</h6>
              <h6>5. Perform Unit test and ensure proper test coverage as per organizational standard.</h6>
              <h6>6. Collaborate with cross-functional teams to analyze, design, and implement new features.</h6>
              <h6>7. Design and build web and enterprise application using in ReactJS/Next JS/.Net Core</h6>
              <h6>8. Prepare basic design, detail design, execute basic acceptance testing.</h6>
            </div>
            {/* Salary and Benefits End */}
            <Button className="w-[50%] rounded-md bg-orange-600 hover:bg-orange-700 ">
              Apply This Possition
            </Button>

          </div>
          {/* company logo and apply job section */}
          <div className="col-span-2 w-full  flex flex-col justify-start items-end gap-y-4">
            <div className=" relative h-[338px] w-[412px] bg-bg-1 border border-slate-200 shadow-md flex flex-col justify-center items-center gap-y-1">
              <Image
                src="/logo.png" // Can be a local image or an external URL (if configured)
                alt="Example Image"
                width={300} // Fixed width
                height={300} // Fixed height
                priority // Loads the image as high priority (useful for above-the-fold content)
                className="w-[120px] h-[90px]"
              />
              <span className="text-[32px] font-semibold">Google.com</span>
              <span className="text-[18px] font-normal">Visit Website</span>

              <Button className="w-[80%] absolute bottom-6  rounded-md bg-orange-600 hover:bg-orange-700">
                Apply This Possition
              </Button>
            </div>
            {/* Job Overview */}

            <div className=" relative h-[338px] w-[412px] bg-bg-1 border border-slate-200 shadow-md flex flex-col justify-start items-start gap-y-1 ">
              <div className="w-full h-10 text-start flex justify-start items-center bg-slate-200">
                <span className='text-[24px] ml-1'>Job Overview</span>
              </div>


              <div className="w-full h-10 text-start flex justify-between items-center border-b border-slate-200 my-1 px-2">
                <div className="flex justify-center items-center gap-1">
                  <Backpack size={20} />
                  <span className='text-[18px]'>Date Posted</span>
                </div>
                <span className='text-[16px]'> 10,July, 2023</span>

              </div>
              <div className="w-full h-10 text-start flex justify-between items-center border-b border-slate-200 my-1 px-2">
                <div className="flex justify-center items-center gap-1">
                  <Backpack size={20} />
                  <span className='text-[18px]'>Vacancy</span>
                </div>
                <span className='text-[16px]'>12</span>

              </div>
              <div className="w-full h-10 text-start flex justify-between items-center border-b border-slate-200 my-1 px-2">
                <div className="flex justify-center items-center gap-1">
                  <Backpack size={20} />
                  <span className='text-[18px]'>Experience</span>
                </div>
                <span className='text-[16px]'>4 Years</span>

              </div>
              <div className="w-full h-10 text-start flex justify-between items-center border-b border-slate-200 my-1 px-2">
                <div className="flex justify-center items-center gap-1">
                  <Backpack size={20} />
                  <span className='text-[18px]'>Offered Salary</span>
                </div>
                <span className='text-[16px]'>BDT 50,000- BDT 80,000</span>

              </div>
              <div className="w-full h-10 text-start flex justify-between items-center border-b border-slate-200 my-1 px-2">
                <div className="flex justify-center items-center gap-1">
                  <Backpack size={20} />
                  <span className='text-[18px]'>Gender</span>
                </div>
                <span className='text-[16px]'>Both</span>

              </div>
              <div className="w-full h-10 text-start flex justify-between items-center border-b border-slate-200 my-1 px-2">
                <div className="flex justify-center items-center gap-1">
                  <Backpack size={20} />
                  <span className='text-[18px]'>Job Deadline</span>
                </div>
                <span className='text-[16px]'>01 July 2024</span>

              </div>

            </div>
            {/* Job Overview End */}
          </div>
          {/* company logo and apply job section */}

        </div>
        {/* // related Job */}
        <div className="w-full">
          <h4 className='text-[48px]'>Related Jobs</h4>

          <RelatedJobs />


        </div>
      </div>
    </>
  );
};

export default JobDetail;
