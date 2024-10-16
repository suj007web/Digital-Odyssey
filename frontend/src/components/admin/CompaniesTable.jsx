import  { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Edit2, MoreHorizontal } from "lucide-react";
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

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector((store) => store.company);
  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredCompany = companies.length >= 0 && companies.filter((company) => {
      if (!searchCompanyByText) {
        return true;
      }
      return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
    });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  return (
    <div className="mt-5 text-white">
      <Table>
        <TableCaption className="text-lg font-semibold mb-4 animate-fade-in">All Registered Companies</TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-800 hover:bg-gray-800 transition-colors duration-200">
            <TableHead className="text-white">Logo</TableHead>
            <TableHead className="text-white">Name</TableHead>
            <TableHead className="text-white">Date</TableHead>
            <TableHead className="text-right text-white">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companies && companies.length <= 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-lg  py-8 animate-fade-in">
                No Companies found
              </TableCell>
            </TableRow>
          ) : (
            <>
              {filterCompany?.map((company, index) => (
                <TableRow
                  key={company._id}
                  className="transition-all duration-200 hover:bg-gray-700 animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <TableCell>
                    <Avatar className="transition-transform duration-200 hover:scale-110">
                      <AvatarImage src={company.logo} alt={company.name} />
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">{company.name}</TableCell>
                  <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                  <TableCell className="text-right">
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal className="cursor-pointer transition-colors duration-200 hover:text-blue-400" />
                      </PopoverTrigger>
                      <PopoverContent className="w-32 bg-gray-800 border-gray-700">
                        <div
                          onClick={() => navigate(`/admin/companies/${company._id}`)}
                          className="flex items-center text-white hover:text-blue-500 gap-2 w-fit cursor-pointer px-3 rounded transition-colors duration-200 "
                        >
                          <Edit2 className="w-4" />
                          <span>Edit</span>
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

export default CompaniesTable;