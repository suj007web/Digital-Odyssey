import  { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AdminJobsTable = () => {
    const {allAdminJobs, searchJobByText} = useSelector(store=>store.job);


  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredJobs = allAdminJobs.length >= 0 && allAdminJobs.filter((job) => {
      if (!searchJobByText) {
        return true;
      }
      return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase()) ;
    });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div className="mt-5 text-white">
      <Table>
        <TableCaption className="text-lg font-semibold mb-4 animate-fade-in">Recently Posted Jobs</TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-800 hover:bg-gray-800 transition-colors duration-200">
            <TableHead className="text-white">Logo</TableHead>
            <TableHead className="text-white">Company Name</TableHead>
            <TableHead className="text-white">Role</TableHead>
            <TableHead className="text-white">Date</TableHead>
            <TableHead className="text-right text-white">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAdminJobs && allAdminJobs.length <= 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-lg  py-8 animate-fade-in">
                No Jobs found
              </TableCell>
            </TableRow>
          ) : (
            <>
              {filterJobs?.map((job, index) => (
                <TableRow
                  key={job._id}
                  className="transition-all duration-200 hover:bg-gray-700 animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <TableCell>
                    <Avatar className="transition-transform duration-200 hover:scale-110">
                      <AvatarImage src={job.company.logo} alt={job.company.name} />
                    </Avatar>
                  </TableCell>
                  <TableCell>
                  {job.company.name}
                  </TableCell>
                  <TableCell className="font-medium">{job.title}</TableCell>
                  <TableCell>{job.createdAt.split("T")[0]}</TableCell>
                  <TableCell className="text-right">
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal className="cursor-pointer transition-colors duration-200 hover:text-blue-400" />
                      </PopoverTrigger>
                      <PopoverContent className="w-40 bg-gray-800 border-gray-700">
                        <div
                          onClick={() => navigate(`/admin/jobs/${job._id}`)}
                          className="flex items-center text-white hover:text-blue-500 gap-2 w-fit cursor-pointer px-3 rounded transition-colors duration-200 "
                        >
                          <Edit2 className="w-4" />
                          <span>Edit</span>
                        </div>
                        <div onClick={()=>{navigate(`/admin/jobs/${job._id}/applicants`)}} className="flex items-center text-white hover:text-blue-500 gap-2 w-fit cursor-pointer px-3 rounded transition-colors duration-200 mt-2">
                          <Eye className="w-4" />
                          <span>Applicants</span>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))}
            </>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;