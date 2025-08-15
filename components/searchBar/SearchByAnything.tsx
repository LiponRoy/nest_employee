
import { useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { setCategory } from "@/redux/slices/searchSlice";
import { Search } from "lucide-react";

const SearchByAnything = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const dispatch = useAppDispatch();

  const handleSearch = () => {
    const keyword = searchText.trim().toLowerCase(); 

    if (!keyword) {
      // Reset → show all jobs
      dispatch(setCategory(""));
      router.push("/jobs");
      console.log("Search reset — showing all jobs");
    } else {
      // Search with lowercase keyword
      dispatch(setCategory(keyword));
      router.push("/jobs");
      console.log("Search keyword:", keyword);
    }
  };

  return (
      <div className="w-full flex items-center justify-center bg-slate-100 rounded-md shadow-lg py-2 px-4 mx-4 md:mx-0 mb-4 space-y-2 md:space-y-0 md:space-x-4">
      {/* Search Input */}
      <div className="flex-1 flex items-center w-full">
     <Search className="text-slate-500 mr-2" />
        <input
          type="text"
          placeholder="Search by title,description,category,division .."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full px-3 py-2 rounded-md  focus:outline-none bg-slate-100"
        />
      </div>

     {/* Right: Button */}
      <div className="w-auto">
        <Button
          onClick={handleSearch}
          className="w-full py-4 md:py-5 rounded-md bg-secondary-1 hover:bg-secondary-1"
        >
          <span className="">Find Jobs</span>
        </Button>
      </div>
    </div>
  );
};

export default SearchByAnything;
