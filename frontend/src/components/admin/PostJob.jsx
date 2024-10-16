import  { useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Briefcase, DollarSign, MapPin, Clock, Star, Users, Building, Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });

  const { companies } = useSelector((store) => store.company);

  const [loading, setLoading] = useState(false);

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
    setInput({...input, companyId : selectedCompany._id});
  };

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const submitHandler = async(e) => {
    e.preventDefault();
    try {
      console.log(input)
      setLoading(true);
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/job/post`, input, {
        headers : {
          "Content-Type" : "application/json"
        },
        withCredentials : true});
      if(res.data.success){
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (e) {
      toast.error(e.response.data.message)
      console.log(e)
    }finally{
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-2xl overflow-hidden"
      >
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Post a New Job</h2>
          <form onSubmit={submitHandler} className="space-y-6">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <div className="space-y-1">
                <Label className="text-white flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-blue-400" />
                  Job Title
                </Label>
                <Input
                  type="text"
                  name="title"
                  value={input.title}
                  onChange={changeEventHandler}
                  className="bg-gray-700 border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-white flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-green-400" />
                  Salary
                </Label>
                <Input
                  type="text"
                  name="salary"
                  value={input.salary}
                  onChange={changeEventHandler}
                  className="bg-gray-700 border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-white flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-400" />
                  Location
                </Label>
                <Input
                  type="text"
                  name="location"
                  value={input.location}
                  onChange={changeEventHandler}
                  className="bg-gray-700 border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-yellow-400" />
                  Job Type
                </Label>
                <Input
                  type="text"
                  name="jobType"
                  value={input.jobType}
                  onChange={changeEventHandler}
                  className="bg-gray-700 border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-white flex items-center gap-2">
                  <Star className="w-4 h-4 text-purple-400" />
                  Experience
                </Label>
                <Input
                  type="text"
                  name="experience"
                  value={input.experience}
                  onChange={changeEventHandler}
                  className="bg-gray-700 border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-indigo-400" />
                  No. of Positions
                </Label>
                <Input
                  type="number"
                  name="position"
                  value={input.position}
                  onChange={changeEventHandler}
                  className="bg-gray-700 border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-white">Job Description</Label>
              <textarea
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                rows={3}
                className="w-full p-2 bg-gray-700 border-gray-600 text-white rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-white">Requirements</Label>
              <textarea
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
                rows={3}
                className="w-full p-2 bg-gray-700 border-gray-600 text-white rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            {companies.length > 0 && (
              <div className="space-y-1">
                <Label className="text-white flex items-center gap-2">
                  <Building className="w-4 h-4 text-orange-400" />
                  Select Company
                </Label>
                <Select onValueChange={selectChangeHandler}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <SelectValue placeholder="Select a Company" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600 text-white">
                    <SelectGroup>
                      {companies.map((company) => (
                        <SelectItem key={company._id} value={company.name.toLowerCase()}>
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )}


            <motion.div >
            {
                loading ? (
                  <Button className="bg-blue-700 hover:bg-blue-600">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Posting...
                  </Button>
                ) : (
                  <Button type='submit' className='bg-blue-500 hover:bg-blue-600'>
                    Post New Job
                  </Button>
                )
            }
            </motion.div>



            {companies.length === 0 && (
              <p className="text-sm text-red-400 font-semibold text-center">
                Please register a company before posting jobs*
              </p>
            )}
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default PostJob;