import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

import { setCompanies} from "@/redux/companySlice";


const useGetAllCompanies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/company/get/`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setCompanies(res.data.companies));
        } else {
          console.error("Failed to fetch jobs:", res.data.message);
        }
      } catch (error) {
        console.error("An error occurred while fetching jobs:", error);
      }
    };

    fetchCompanies();
  }, [dispatch]);
};

export default useGetAllCompanies;useGetAllCompanies