import { useEffect, useState } from "react";
import { ArrowLeft, Loader2, Building2, Globe, MapPin, FileText, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useGetCompanyById from "@/hooks/useGetCompanyById";
import { motion } from "framer-motion";

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  const [fileName, setFileName] = useState('Choose Logo File');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0]; 
    setInput({...input, file})
    if (file) {
      setFileName(file.name);
    } else {
      setFileName('Choose Logo File');
    }
  };

  const submitHandler = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if(input.file){
        formData.append("file", input.file);
    }

    try {
        setLoading(true)
        const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/v1/company/update/${params.id}`, formData,{
            headers : {
                "Content-Type" : "multipart/form-data"
            },
            withCredentials : true
        })
        if(res.data.success){
            toast.success(res.data.message);
            navigate("/admin/companies")
        }
    } catch (e) {
        console.log(e);
        toast.error(e.response.data.message);
    } finally {
        setLoading(false);
    }
  }

  const {singleCompany} = useSelector(store => store.company)

  useEffect(() => {
    setInput({
        name: singleCompany.name || "",
        description: singleCompany.description || "",
        website: singleCompany.website || "",
        location: singleCompany.location || "",
        file: singleCompany.file || null,
    })
  }, [singleCompany])

  return (
    <div className="bg-black min-h-[90vh] p-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-xl p-8"
      >
        <form onSubmit={submitHandler}>
          <div className="flex items-center gap-5 mb-8">
            <Button
              onClick={() => { navigate("/admin/companies") }}
              className="flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-2xl text-white">Company Setup</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
              <Label className="text-lg text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-400" />
                Company Name
              </Label>
              <Input
                className="border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
              />
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
              <Label className="text-lg text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-400" />
                Description
              </Label>
              <Input
                className="border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
              />
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
              <Label className="text-lg text-white flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-400" />
                Website
              </Label>
              <Input
                className="border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                type="text"
                name="website"
                value={input.website}
                onChange={changeEventHandler}
              />
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
              <Label className="text-lg text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-400" />
                Location
              </Label>
              <Input
                className="border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
              />
            </motion.div>
          </div>
          <motion.div whileHover={{ scale: 1.02 }} className="mb-8">
            <Label htmlFor="file" className="cursor-pointer bg-gray-700 text-white py-3 px-4 rounded-md flex items-center justify-center gap-2 hover:bg-gray-600 transition-colors duration-300">
              <Upload className="w-5 h-5" />
              {fileName}
            </Label>
            <Input
              className="hidden"
              type="file"
              id="file"
              name="logo"
              accept="image/*"
              onChange={handleFileChange} 
            />
          </motion.div>
          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.95 }}>
            {loading ? (
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300">
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Updating...
              </Button>
            ) : (
              <Button type='submit' className='w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300'>
                Update
              </Button>
            )}
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default CompanySetup;