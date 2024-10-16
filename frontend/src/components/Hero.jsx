import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchJobHandler = ()=>{
    dispatch(setSearchedQuery(query))
    navigate("/browse")
  }
  return (
    <div className="text-center p-5 min-h-[35vh] text-gray-200 bg-black">
      <span className="px-4 py-2 rounded-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-lg">
        Search Best Jobs for You
      </span>
      
      <div className="my-8">
        <h1 className="text-5xl font-semibold">Find & pursue</h1>
        <h1 className="text-5xl font-bold bg-clip-text p-2 text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
  your ideal job.
</h1>

      </div>
      
      <p className="text-gray-400 mb-10 max-w-xl mx-auto">
        Connect talent with opportunity. Recruiters and job seekers, find the perfect match effortlessly with us.
      </p>

      <div className="flex w-full md:w-1/2 lg:w-2/5 shadow-lg shadow-blue-900 border border-gray-700 pl-5 rounded-full items-center gap-4 mx-auto my-6 bg-gradient-to-r from-gray-800 via-gray-900 to-black">
        <input
          type="text"
          onChange={(e)=>{setQuery(e.target.value)}}
          placeholder="Find your dream job"
          className="outline-none border-none w-full bg-transparent text-gray-200 placeholder-gray-500"
        />
        <Button onClick={searchJobHandler} className="rounded-r-full bg-blue-500 hover:bg-blue-600 text-white transition duration-200 shadow-md hover:shadow-lg hover:shadow-blue-500/50">
          <Search className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default Hero;
