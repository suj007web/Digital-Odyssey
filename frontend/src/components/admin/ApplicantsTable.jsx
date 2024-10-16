
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal, User, Mail, Phone, FileText, Calendar, CheckCircle, XCircle, Clock, Users, Search } from 'lucide-react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'sonner';

const shortlistingStatus = [
  { label: "Selected", icon: CheckCircle },
  { label: "Rejected", icon: XCircle },
  { label: "Pending", icon: Clock },
  { label: "Interview", icon: Users },
  { label: "In Review", icon: Search }
];

const ApplicantsTable = () => {
    const {applicants} = useSelector(store=>store.application);

    const statusHandler = async(status, id)=>{
        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/application/status/${id}/update`, {status}, {withCredentials : true});
            if(res.data.success){
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error);
            
        }
    }

    return (
        <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg shadow-xl">
            <Table className="w-full">
                <TableCaption className="text-gray-400 mb-4">
                    All Users that have applied for this job
                </TableCaption>
                <TableHeader>
                    <TableRow className="bg-gray-800 border-b border-gray-700">
                        <TableHead className="font-semibold text-gray-300">Full Name</TableHead>
                        <TableHead className="font-semibold text-gray-300">Email</TableHead>
                        <TableHead className="font-semibold text-gray-300">Contact</TableHead>
                        <TableHead className="font-semibold text-gray-300">Resume</TableHead>
                        <TableHead className="font-semibold text-gray-300">Date</TableHead>
                        <TableHead className="text-right font-semibold text-gray-300">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {applicants && applicants?.application?.map((item) => (
                        <motion.tr
                            key={item._id}
                            className="border-b border-gray-700 hover:bg-gray-800 transition-colors duration-200 ease-in-out"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <TableCell className="font-medium text-gray-200">
                                <div className="flex items-center space-x-2">
                                    <User size={18} className="text-blue-400" />
                                    <span>{item.applicant.fullname}</span>
                                </div>
                            </TableCell>
                            <TableCell className="text-gray-300">
                                <div className="flex items-center space-x-2">
                                    <Mail size={18} className="text-green-400" />
                                    <span>{item.applicant.email}</span>
                                </div>
                            </TableCell>
                            <TableCell className="text-gray-300">
                                <div className="flex items-center space-x-2">
                                    <Phone size={18} className="text-yellow-400" />
                                    <span>{item.applicant.phoneNumber}</span>
                                </div>
                            </TableCell>
                            <TableCell>
                               {
                                item.applicant?.profile?.resume ?
                                 <a href={item.applicant.profile.resume} className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors duration-200">
                                 <FileText size={18} />
                                 <span>{item.applicant.profile.resumeOriginalName}</span>
                             </a> : <span>NA</span>
                               }
                            </TableCell>
                            <TableCell className="text-gray-300">
                                <div className="flex items-center space-x-2">
                                    <Calendar size={18} className="text-purple-400" />
                                    <span>{item.applicant.createdAt.split("T")[0]}</span>
                                </div>
                            </TableCell>
                            <TableCell className="text-right">
                                <Popover>
                                    <PopoverTrigger>
                                        <motion.div
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="inline-flex cursor-pointer text-gray-400 hover:text-gray-200"
                                        >
                                            <MoreHorizontal />
                                        </motion.div>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-48 bg-gray-800 border border-gray-700 shadow-lg rounded-md p-2">
                                        {shortlistingStatus.map((status, idx) => (
                                            <motion.div
                                                key={idx}
                                                className='flex w-full items-center cursor-pointer p-2 hover:bg-gray-700 rounded-md transition-colors duration-200'
                                                whileHover={{ x: 5 }}
                                                onClick={()=>{statusHandler(status.label, item._id)}}
                                            >
                                                <status.icon size={18} className="mr-2 text-blue-400" />
                                                <span className="text-gray-300">{status.label}</span>
                                            </motion.div>
                                        ))}
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </motion.tr>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default ApplicantsTable