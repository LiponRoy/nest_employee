import Counter from "@/components/counterTest/Counter";
import ResetButton from "@/components/counterTest/ResetButton";
import Result from "@/components/counterTest/Result";
import Hero from "@/components/Hero/Hero";
import LatestJobs from "@/components/LatestJobs";

export default function Home() {
  return (
    // <div className="">
    //   <Hero />
    //   <LatestJobs />
    // </div>

    <div className="w-screen flex flex-col gap-10 mt-10 items-center">
      <h1 className="text-center font-bold text-2xl text-gray-600">
        Redux Counter
      </h1>
      <div className="flex flex-col gap-4 items-center">
        <h1>Component 1</h1>
        <Counter />
        <Result />
      </div>
      <ResetButton />
    </div>


  );
}
