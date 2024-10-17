import  { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import ApplicantsTable from "./ApplicantsTable";
import { setApplicants } from "@/redux/applicationSlice";

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector(store => store.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/application/${params.id}/applicant`, { withCredentials: true });
        if (res.data.success) {
          console.log(res.data);
          dispatch(setApplicants(res.data.job));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllApplicants();
  }, [dispatch, params.id]);

  return (
    <motion.div 

      className="min-h-screen bg-black text-white p-8"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div 

          className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8"
        >
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold flex items-center">
              <Users className="mr-2 text-blue-400" />
              Applicants
            </h1>
            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Total: {applicants?.application?.length ?? 0}
            </span>
          </div>
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-gray-800 rounded-lg shadow-lg overflow-hidden"
        >
          <ApplicantsTable />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Applicants;