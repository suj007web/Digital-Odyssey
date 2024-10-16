import { useDispatch, useSelector } from "react-redux";
import Job from "./Job";
import { useEffect } from "react";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector(store => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);

  return (
    <div className="bg-black text-gray-200 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-bold text-lg mb-5 text-center md:text-left">Search Results ({allJobs.length})</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allJobs.length > 0 ? (
            allJobs.map((job) => (
              <Job key={job._id} job={job} />
            ))
          ) : (
            <span className="text-gray-400 text-xl text-center col-span-full">No Jobs Found</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Browse;
