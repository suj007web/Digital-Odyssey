import { useSelector } from "react-redux";
import { Badge } from "./ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Building2, Calendar } from 'lucide-react';

const ApplicationTable = () => {
  const { allAppliedJobs } = useSelector(store => store.job);
  console.log(allAppliedJobs);

  const getStatusColor = (status) => {
    status = status.toLowerCase();
    switch (status) {
      case 'selected': return 'bg-green-900 text-green-400';
      case 'in review': return 'bg-yellow-900 text-yellow-400';
      case 'pending': return 'bg-orange-900 text-orange-400';
      case 'interview': return 'bg-purple-900 text-purple-400';
      case 'rejected': return 'bg-red-900 text-red-400';
      default: return 'bg-blue-900 text-blue-400';
    }
  };

  function toTitleCase(str) {
    return str.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      <Table className="text-gray-200 w-full">
        <TableCaption className="text-gray-400 mb-4 text-lg font-semibold">Your Job Applications</TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-700 border-b border-gray-600">
            <TableHead className="text-gray-300 font-bold py-4">Date</TableHead>
            <TableHead className="text-gray-300 font-bold">Job Role</TableHead>
            <TableHead className="text-gray-300 font-bold">Company</TableHead>
            <TableHead className="text-right text-gray-300 font-bold">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs.length === 0 ? (
            <span className="text-gray-400 py-4 block text-center">You haven&apos;t applied for any job</span>
          ) : (
            allAppliedJobs.map((app) => (
              <TableRow key={app._id} className="hover:bg-gray-700 transition-colors">
                <TableCell className="text-gray-400 flex items-center">
                  <Calendar size={16} className="mr-2 text-gray-500" />
                  {app.createdAt.split("T")[0]}
                </TableCell>
                <TableCell className="text-gray-300 font-medium">{app.job?.title}</TableCell>
                <TableCell className="text-gray-400 flex items-center">
                  <Building2 size={16} className="mr-2 text-gray-500" />
                  {app.job?.company?.name}
                </TableCell>
                <TableCell className="text-right">
                  <Badge className={`${getStatusColor(app.status)} font-semibold shadow-sm px-3 py-1 rounded-full`}>
                    {toTitleCase(app.status)}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicationTable;
