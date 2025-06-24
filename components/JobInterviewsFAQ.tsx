'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "./ui/button"

const faqs = [
  {
    question: "1. Tell me about yourself.",
    answer: "I'm X, and I recently completed my degree in [Your Major] from [Your University]. I have experience in [mention job, internship, or project]. I'm passionate about [your interest related to the job], and I'm excited to apply my skills in this role."
  },
  {
    question: "2. Why do you want this job?",
    answer: "I’m really interested in this job because it matches my skills and career goals. I like the work your company does, and I believe I can contribute and also grow here."
  },
  {
    question: "3. What are your strengths?",
    answer: "My strengths are being organized, a quick learner, and a team player. I always try to do my best and help others when needed."
  },
  {
    question: "4. What are your weaknesses?",
    answer: "Sometimes I overthink things and take a bit more time to complete tasks. But I’m learning to manage my time better and focus on what’s important."
  },
  {
    question: "5. Why should we hire you?",
    answer: "You should hire me because I’m hardworking, eager to learn, and I’ll give my best to add value to your company."
  },
]

export default function JobInterviewsFAQ() {
  return (
    <section className="container-custom mx-auto my-10 px-4">
      <div className="w-full flex flex-col justify-start items-start my-6 bg-slate-100 p-2">
        <span className=" text-[24px] md:text-[32px] font-medium">Common Job Interview <span className="text-primary-1">Questions</span></span>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-2xl">{faq.question}</AccordionTrigger>
            <AccordionContent className="text-xl">{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <div className="w-full flex justify-center items-center py-6">
              <Button
                // onClick={() => route.push("/jobs")}
                className="border border-secondary-1 h-12 w-[60%] md:w-[20%] text-[18px] font-semibold rounded-md flex justify-center items-center cursor-pointer transition-all duration-500 ease-in-out bg-secondary-1 hover:bg-secondary-1 hover:text-white"
      
              >
                VIEW MORE
              </Button>
            </div>
    </section>
  )
}
