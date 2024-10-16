import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setSingleCompany } from "@/redux/companySlice";
import { Building2, ArrowLeft } from "lucide-react";

const CreateCompany = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [companyName, setCompanyName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const registerNewCompany = async () => {
    if (!companyName.trim()) {
      toast.error("Please enter a company name");
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/company/register`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (e) {
      console.error(e);
      toast.error(e.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-black min-h-[89vh] flex items-center justify-center p-4">
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 rounded-lg shadow-xl p-8 max-w-md w-full"
      >
        <Button
              onClick={() => navigate(-1)}
              variant="outline"
              className="w-full mb-5 sm:w-auto bg-gray-700 text-white border-gray-600 hover:bg-gray-600"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
        <div className="flex items-center justify-center mb-6">
          <Building2 className="w-12 h-12 text-blue-500 mr-2" />
          <h1 className="font-bold text-3xl text-white">Create Company</h1>
        </div>
        <p className="text-gray-400 text-center mb-8">Let&apos;s get started by naming your company</p>
        <div className="space-y-4">
          <div>
            <Label htmlFor="companyName" className="text-white">Company Name</Label>
            <Input
              id="companyName"
              type="text"
              className="mt-1 bg-gray-700 border-gray-600 text-white"
              placeholder="Enter your company name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
            
            <Button
              onClick={() => navigate("/admin/companies")}
              variant="outline"
              className="w-full sm:w-auto bg-gray-700 text-white border-gray-600 hover:bg-gray-600"
            >
              Cancel
            </Button>
            <Button
              onClick={registerNewCompany}
              className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Continue"}
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CreateCompany;