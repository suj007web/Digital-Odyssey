
import { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    arr: ["Delhi", "Gurugram", "Noida", "Bangalore"],
  },
  {
    filterType: "Industry",
    arr: ["Frontend Developer", "Backend Developer", "Data Scientist" ,"Finance", "Manufacturing"],
  },
  // {
  //   filterType: "Salary",
  //   arr: [
  //     "0 - 5 Lakhs",
  //     "5 - 10 Lakhs",
  //     "10 - 15 Lakhs",
  //     "15 - 20 Lakhs",
  //     "20 - 30 Lakhs",
  //     "30+ Lakhs",
  //   ],
  // },
];

const FilterCard = () => {
  const [selected, setSelected] = useState("");
  const handleChange = (value)=>{
    setSelected(value)
  }

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(setSearchedQuery(selected));
  }, [dispatch, selected])

  return (
    <div className="w-full p-6 rounded-lg bg-gray-800 border border-gray-700 shadow-lg">
      <h1 className="text-2xl font-bold text-white mb-4">
        Filter Jobs
      </h1>
      <div className="h-px bg-gray-700 w-full mb-4"></div>
      <RadioGroup onValueChange={handleChange} value={selected}>
        {filterData.map((data, idx) => (
          <div key={idx} className="mb-6">
            <h2 className="font-semibold text-lg text-blue-400 mb-3">{data.filterType}</h2>
            <div className="space-y-2">
              {data.arr.map((item, itemIdx) => (
                <div className="flex items-center space-x-3" key={itemIdx}>
                  <RadioGroupItem 
                    value={item} 
                    id={`${data.filterType}-${itemIdx}`}
                    className="h-4 w-4 border-gray-600 text-white focus:ring-blue-500 before:bg-white" 
                  />
                  <Label 
                    htmlFor={`${data.filterType}-${itemIdx}`} 
                    className="text-gray-300 hover:text-white cursor-pointer transition-colors duration-200"
                  >
                    {item}
                  </Label>
                </div>
              ))}
            </div>
            {idx < filterData.length - 1 && <div className="h-px bg-gray-700 w-full my-4"></div>}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;