import {
  ISearchCategories,
  searchCategories,
  selectFieldStyle,
} from "@/constant/Constant";
import { useState } from "react";
import SelectInput from "../SelectInput";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useAppDispatch} from "@/redux/hooks";
import { setCategory } from "@/redux/slices/searchSlice";
import { Search } from 'lucide-react';

const MyComponent = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<ISearchCategories | null>(null);
  const dispatch = useAppDispatch();

  const hendelChange = (cat: string) => {
    router.push("/jobs");
    dispatch(setCategory(cat));
    console.log("cat...", cat);
  };

  return (
    <div className="w-full grid grid-cols-5 gap-4 bg-slate-100 rounded-md  border-2 border-slate-400 shadow-lg py-1 px-2 mx-4 md:mx-0 z-50 mb-4">
      <div className=" col-span-4 flex justify-start items-center ">
        <SelectInput
          options={searchCategories}
          value={categories}
          onChange={setCategories}
          newStyle={selectFieldStyle}
          placeholder="Select Job Category"
        />
      </div>
      <div className=" col-span-1 flex justify-end text-[32px] font-semibold">
        <Button onClick={()=>hendelChange(categories?.value)} className="w-full py-5 md:py-8 rounded-md md:rounded-xl  bg-secondary-1 hover:bg-secondary-1">
          <Search size={22} className=""/>
         <span className="hidden md:block"> Search Jobs</span>
          
        </Button>
      </div>
    </div>
  );
};

export default MyComponent;

