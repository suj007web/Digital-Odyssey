/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { Badge } from "./ui/badge";

const LatestJobCard = ({ job }) => {
  const navigate = useNavigate();

  // Function to truncate description after 15 words
  const truncateDescription = (description) => {
    if (!description) return "";
    const words = description.split(" ");
    return words.length > 15
      ? words.slice(0, 15).join(" ") + "..."
      : description;
  };

  return (
    <div
      onClick={() => {
        navigate(`/jobs/description/${job._id}`);
      }}
      className="p-5 rounded-md shadow-lg bg-gray-800 border border-gray-700 cursor-pointer hover:bg-gray-700 transition-colors duration-200"
    >
      <div>
        <h1 className="font-medium text-lg text-gray-200">{job?.company?.name}</h1>
        <p className="text-sm text-gray-400">{job?.location}</p>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2 text-gray-100">{job?.title}</h1>
        <p className="text-sm text-gray-300">
          {truncateDescription(job?.description)}
        </p>
      </div>
      <div className="my-2 flex flex-wrap items-center justify-start gap-2">
        <Badge className="bg-blue-900 bg-opacity-20 text-blue-400 font-semibold px-3 py-1 rounded-full shadow-sm shadow-blue-500/50">
          {job?.position} Positions
        </Badge>
        <Badge className="bg-green-900 bg-opacity-20 text-green-400 font-semibold px-3 py-1 rounded-full shadow-sm shadow-green-500/50">
          {job?.jobType}
        </Badge>
        <Badge className="bg-purple-900 bg-opacity-20 text-purple-400 font-semibold px-3 py-1 rounded-full shadow-sm shadow-purple-500/50">
          {job?.salary} LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCard;
