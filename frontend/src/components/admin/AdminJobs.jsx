import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";


import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { setSearchJobByText } from "@/redux/jobSlice";

const AdminJobs = () => {
    const navigate = useNavigate();
    const [input,setInput] = useState("");
    useGetAllAdminJobs();
    const dispatch = useDispatch();
    useEffect(()=>{
      dispatch(setSearchJobByText(input));
    }, [input, dispatch])

  return (
    <div className="bg-black min-h-[90vh]">
      <div className="pt-10 max-w-4xl mx-auto">
        <div className="flex justify-between items-center">
        <Input
        className="w-fit text-white border border-gray-700"
        placeholder="Filter By Name, Role"
        onChange = {(e)=>{setInput(e.target.value)}}
        />
        <Button onClick={()=>navigate("/admin/jobs/create")} className="bg-blue-500 hover:bg-blue-600">New Job</Button>
        </div>
        <AdminJobsTable/>
      </div>
    </div>
  );
};

export default AdminJobs;
