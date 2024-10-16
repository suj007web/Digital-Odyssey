import { useSelector } from "react-redux";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useEffect, useState } from "react";


// const jobs = [1, 2, 3, 4, 5, 6, 7, 8];
// const jobs = []

const Jobs = () => {
  const {allJobs, searchedQuery} = useSelector(store=>store.job)
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(()=>{
    if(searchedQuery){
      const filteredJobs = allJobs.filter(job=>job.title.toLowerCase().includes(searchedQuery.toLowerCase()) 
      || job.description.toLowerCase().includes(searchedQuery.toLowerCase())
      || job.location.toLowerCase().includes(searchedQuery.toLowerCase()))
      setFilterJobs(filteredJobs);
    }else{
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery])

  return (
    <div className="bg-black text-gray-200 min-h-screen py-10">
      <div className="max-w-7xl mx-auto mt-5 px-5 md:px-10">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/4">
            <FilterCard />
          </div>
          <div className="flex-1">
            {filterJobs.length <= 0 ? (
              <span className="text-gray-400 text-xl">Jobs Not Found</span>
            ) : (
              <div className="h-[88vh] overflow-y-auto pb-5">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filterJobs.map((job) => (
                    <Job key={job?._id} job={job} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
