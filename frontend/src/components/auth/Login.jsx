import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup } from "../ui/radio-group";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";

import { Loader2 } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  
  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const backendurl = import.meta.env.VITE_BACKEND_URL;

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${backendurl}/api/v1/user/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };


  useEffect(()=>{
    if(user){
      navigate("/")
    }
  }, [user,navigate])

  return (
    <div className="bg-black min-h-screen flex items-center justify-center px-4 md:px-0">
      <form
        onSubmit={submitHandler}
        className="w-full max-w-md border border-gray-700 rounded-lg p-6 bg-gray-800 shadow-lg flex flex-col gap-4"
      >
        <h1 className="font-bold text-3xl text-center text-white">Login</h1>

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

        <div className="flex items-center justify-between">
          <RadioGroup className="flex flex-col sm:flex-row items-center gap-4 my-5">
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
        </div>

        {
          loading ? (
            <Button className="bg-blue-700 hover:bg-blue-600 w-full">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Logging in...
            </Button>
          ) : (
            <Button type='submit' className='bg-blue-500 hover:bg-blue-600 w-full'>
              Login
            </Button>
          )
        }

        <span className="text-gray-300 text-center">
          Don&apos;t have an account? <Link className="text-blue-400" to={'/signup'}>Sign Up</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
