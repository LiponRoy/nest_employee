import Reviews from "@/components/CustomerReview/Reviews";
import Hero from "@/components/Hero/Hero";
import BannerForAuth from "@/components/Home/BannerForAuth";
import PopularCategories from "@/components/Home/PopularCategories";
import LatestJobs from "@/components/LatestJobs";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <PopularCategories/>
      <LatestJobs />
      <Reviews/>
      <BannerForAuth/>
    </div>
  );
}




