import {
  ISearchCategories,
  searchCategories,
  selectFieldStyle,
} from "@/constant/Constant";
import { useState } from "react";
import SelectInput from "../SelectInput";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
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
    <div className="w-full flex items-center justify-center bg-slate-100 rounded-md shadow-lg py-2 px-4 mx-4 md:mx-0 mb-4 space-y-2 md:space-y-0 md:space-x-4">
      
      {/* Left: Search + Select */}
      <div className="flex-1 flex items-center w-full">
        <Search className="text-slate-500 mr-2" />
        <SelectInput
          options={searchCategories}
          value={categories}
          onChange={setCategories}
          newStyle={selectFieldStyle}
          placeholder="Select Job Category"
          className="flex-1"
        />
      </div>

      {/* Right: Button */}
      <div className="w-auto">
        <Button
          onClick={() => hendelChange(categories?.value ?? "")}
          className="w-full py-4 md:py-5 rounded-md bg-secondary-1 hover:bg-secondary-1"
        >
          <span className="">Find Jobs</span>
        </Button>
      </div>
    </div>
  );
};

export default MyComponent;
