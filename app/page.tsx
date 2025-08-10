import Reviews from "@/components/CustomerReview/Reviews";
import ScrollAnimatedWrapper from "@/components/GSAP/ScrollAnimatedWrapper ";
import Hero from "@/components/Hero/Hero";
import BannerForAuth from "@/components/Home/BannerForAuth";
import PopularCategories from "@/components/Home/PopularCategories";
import JobInterviewsFAQ from "@/components/JobInterviewsFAQ";
import JobLocations from "@/components/JobLocations";
import LatestJobs from "@/components/LatestJobs";
import CompanyLogoData from "@/components/TrustedCompanies/CompanyLogoData";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <ScrollAnimatedWrapper>
        <PopularCategories />
      </ScrollAnimatedWrapper>
      <ScrollAnimatedWrapper>
        <CompanyLogoData />
      </ScrollAnimatedWrapper>
      <ScrollAnimatedWrapper>
       <LatestJobs />
      </ScrollAnimatedWrapper>
      <JobLocations/>
      <Reviews />
      <JobInterviewsFAQ/>
      <BannerForAuth />
    </div>
  );
}
