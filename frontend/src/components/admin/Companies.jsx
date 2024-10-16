import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import CompaniesTable from "./CompaniesTable";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companySlice";

const Companies = () => {
    const navigate = useNavigate();
    const [input,setInput] = useState("");
    useGetAllCompanies()
    const dispatch = useDispatch();
    useEffect(()=>{
      dispatch(setSearchCompanyByText(input));
    }, [input, dispatch])

  return (
    <div className="bg-black min-h-[90vh]">
      <div className="pt-10 max-w-4xl mx-auto">
        <div className="flex justify-between items-center">
        <Input
        className="w-fit text-white border border-gray-700"
        placeholder="Filter By Name"
        onChange = {(e)=>{setInput(e.target.value)}}
        />
        <Button onClick={()=>navigate("/admin/companies/create")} className="bg-blue-500 hover:bg-blue-600">New Company</Button>
        </div>
        <CompaniesTable/>
      </div>
    </div>
  );
};

export default Companies;
