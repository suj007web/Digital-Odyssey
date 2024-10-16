/* eslint-disable react/prop-types */
import { Bookmark } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongoDbTime) => {
    const createdAt = new Date(mongoDbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };


  const truncateDescription = (description) => {
    const words = description?.split(" ");
    if (words.length > 15) {
      return words.slice(0, 15).join(" ") + " ...";
    }
    return description;
  };

  return (
    <div className="p-4 rounded-md shadow-xl border border-gray-700 bg-gray-800">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-400">
          {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`} 
        </p>
        <Button variant="outline" className="bg-blue-500 rounded-full border-none hover:bg-blue-600" size="icon">
          <Bookmark className="text-white" />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <button className=""  size="icon">
          <Avatar>
            <AvatarImage className="object-cover" src={job?.company?.logo} />
          </Avatar>
        </button>
        <div>
          <h1 className="font-bold text-white">{job?.company?.name}</h1>
          <p className="text-gray-400">{job?.location}</p>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-lg my-2 text-white">{job?.title}</h1>
        {/* Apply fixed height and ellipsis handling */}
        <p className="text-sm text-gray-400 h-20 overflow-hidden text-ellipsis">
          {truncateDescription(job?.description)}
        </p>
      </div>

      <div className="my-2 flex items-center gap-2">
        <Badge className="bg-blue-900 bg-opacity-20 text-blue-400 font-semibold text-xs px-2 py-1 rounded-full shadow-sm shadow-blue-500/50">
          {job?.position} Positions
        </Badge>
        <Badge className="bg-green-900 bg-opacity-20 text-green-400 font-semibold text-xs px-2 py-1 rounded-full shadow-sm shadow-green-500/50">
          {job?.jobType}
        </Badge>
        <Badge className="bg-purple-900 bg-opacity-20 text-purple-400 font-semibold text-xs px-2 py-1 rounded-full shadow-sm shadow-purple-500/50">
          {job?.salary} LPA
        </Badge>
      </div>

      <div className="flex gap-3 items-center mt-4">
        <Button onClick={() => navigate(`/jobs/description/${job._id}`)} variant="outline" className="text-black border-gray-600 hover:bg-gray-200">
          Details
        </Button>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">Save For Later</Button>
      </div>
    </div>
  );
};

export default Job;
