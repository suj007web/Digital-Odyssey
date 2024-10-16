import { useSelector } from "react-redux";
import LatestJobCard from "./LatestJobCard";



const LatestJobs = () => {
  const {allJobs} = useSelector(store=>store.job);

  return (
    <div className="bg-black text-gray-200 min-h-[50vh] mx-auto  px-5 py-10  shadow-lg">
      <h1 className="text-4xl font-bold text-center mb-10">
        <span className="text-blue-500">Latest & Top</span> Openings
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        { 
        allJobs?.length <= 0 ? <span>No Jobs Available</span> : 
          allJobs.slice(0, 6).map((job) => (
            <LatestJobCard key={job._id} job={job}/>
          ))
        }
      </div>
    </div>
  );
};

export default LatestJobs;
