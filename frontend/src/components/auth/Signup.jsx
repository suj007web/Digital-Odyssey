import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup } from "../ui/radio-group";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const [fileName, setFileName] = useState(""); // State to store the file name

  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const backendurl = import.meta.env.VITE_BACKEND_URL;

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const selectedFile = e.target.files?.[0];
    setInput({ ...input, file: selectedFile });
    setFileName(selectedFile?.name || ""); // Update fileName state with the selected file's name
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${backendurl}/api/v1/user/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center px-4 sm:px-0">
      <form
        onSubmit={submitHandler}
        className="w-full max-w-md border border-gray-700 rounded-lg p-6 bg-gray-800 shadow-lg flex flex-col gap-4"
      >
        <h1 className="font-bold text-3xl text-center text-white">Sign Up</h1>

        <div>
          <Label className="text-gray-300">Full Name</Label>
          <Input
            value={input.fullname}
            name="fullname"
            onChange={changeEventHandler}
            type="text"
            placeholder="Enter Your Name"
            className="bg-gray-700 text-white placeholder-gray-400 border-gray-600 focus:ring focus:ring-blue-600"
          />
        </div>

        <div>
          <Label className="text-gray-300">Email</Label>
          <Input
            value={input.email}
            name="email"
            onChange={changeEventHandler}
            type="email"
            placeholder="Enter Your Email"
            className="bg-gray-700 text-white placeholder-gray-400 border-gray-600 focus:ring focus:ring-blue-600"
          />
        </div>

        <div>
          <Label className="text-gray-300">Phone Number</Label>
          <Input
            value={input.phoneNumber}
            name="phoneNumber"
            onChange={changeEventHandler}
            type="text"
            placeholder="Enter Your Phone Number"
            className="bg-gray-700 text-white placeholder-gray-400 border-gray-600 focus:ring focus:ring-blue-600"
          />
        </div>

        <div>
          <Label className="text-gray-300">Password</Label>
          <Input
            value={input.password}
            name="password"
            onChange={changeEventHandler}
            type="password"
            placeholder="Enter Password"
            className="bg-gray-700 text-white placeholder-gray-400 border-gray-600 focus:ring focus:ring-blue-600"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <RadioGroup className="flex items-center gap-4 my-5">
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="role"
                value="student"
                checked={input.role === 'student'}
                onChange={changeEventHandler}
                className="h-5 w-5 border-2 border-gray-600 text-blue-500 focus:ring-blue-500"
              />
              <Label className="text-gray-300" htmlFor="role-student">Student</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="role"
                value="recruiter"
                checked={input.role === 'recruiter'}
                onChange={changeEventHandler}
                className="h-5 w-5 border-2 border-gray-600 text-blue-500 focus:ring-blue-500"
              />
              <Label className="text-gray-300" htmlFor="role-recruiter">Recruiter</Label>
            </div>
          </RadioGroup>

          <div className="flex items-center gap-2">
            <Label className="text-gray-300">Profile Photo</Label>
            <input
              type="file"
              accept="image/*"
              onChange={changeFileHandler}
              className="hidden"
              id="file-input"
            />
            <label
              htmlFor="file-input"
              className="cursor-pointer bg-gray-700 text-white rounded-md py-1 px-3 hover:bg-gray-600 text-sm"
            >
              {fileName ? fileName : "Upload  Image"} {/* Conditional rendering */}
            </label>
          </div>
        </div>

        {loading ? (
          <Button className="bg-blue-700 hover:bg-blue-600">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Signing up...
          </Button>
        ) : (
          <Button type='submit' className='bg-blue-500 hover:bg-blue-600'>
            Sign Up
          </Button>
        )}

        <span className="text-gray-300">
          Already have an account? <Link className="text-blue-400" to={'/login'}>Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Signup;
