// components/HeroRightSlider.tsx
"use client";
import React from "react";
import Slider from "react-slick";

const HeroRightSlider = () => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
  };

const sliderContent = [
  {
    title: "Boost Your Chances",
    description: "Apply within the first 48 hours of a job posting to improve your chances by 70%.",
  },
  {
    title: "Job Search Fatigue?",
    description: "Take breaks. Stay focused. You're doing great — and we're here to help.",
  },
  {
    title: "Application Deadline",
    description: "Don’t miss out! Top companies close applications within 3–5 days.",
  },
  {
    title: "Looking Abroad?",
    description: "Find verified jobs in Dubai, Canada, UK & Malaysia with visa support.",
  },
  {
    title: "Cover Letter Help",
    description: "Struggling to write one? Use our proven templates to impress employers.",
  },
  {
    title: "Actively Hiring",
    description: "Grameenphone, Pathao, and Daraz are hiring now. Apply today!",
  },
  {
    title: "Most Searched Roles",
    description: "Trending now: Developer, Digital Marketer, Customer Support, HR Executive.",
  },
  {
    title: "Platform Stats",
    description: "5,000+ active jobs, 1,200+ verified employers hiring now.",
  },
  {
    title: "Job Trends 2025",
    description: "Demand for remote roles & AI skills are skyrocketing — are you ready?",
  },
  {
    title: "Internships for Freshers",
    description: "Kickstart your career with paid internships from trusted brands.",
  },
  {
    title: "Need to Hire?",
    description: "Post a job and reach over 10,000 qualified candidates in minutes.",
  },
  {
    title: "Verified Employers Only",
    description: "No scams. All jobs are reviewed and verified for your safety.",
  },
];


  return (
    <div className="w-full max-w-xs  rounded-md text-white text-sm text-center">
      <Slider {...settings}>
        {sliderContent.map((item, index) => (
          <div key={index} className="p-2 space-y-2">
            <h4 className="font-semibold text-base">{item.title}</h4>
            <p className="text-sm">{item.description}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroRightSlider;
