import Reviews from "@/components/CustomerReview/Reviews";
import ScrollAnimatedWrapper from "@/components/GSAP/ScrollAnimatedWrapper ";
import Hero from "@/components/Hero/Hero";
import BannerForAuth from "@/components/Home/BannerForAuth";
import PopularCategories from "@/components/Home/PopularCategories";
import LatestJobs from "@/components/LatestJobs";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <ScrollAnimatedWrapper>
        <PopularCategories />
      </ScrollAnimatedWrapper>
      <ScrollAnimatedWrapper>
       <LatestJobs />
      </ScrollAnimatedWrapper>
      <Reviews />
      <BannerForAuth />
    </div>
  );
}
