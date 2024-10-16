/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useState } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const { user } = useSelector((store) => store.auth);
  const [input, setInput] = useState({
    fullname: user?.fullname,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    bio: user?.profile?.bio,
    skills: user?.profile?.skills?.map((skill) => skill),
    file: user?.profile?.resume,
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const backend = import.meta.env.VITE_BACKEND_URL;
  
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");

  const dispatch = useDispatch();

  const submitHandler = async(e)=>{
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);

    if(input.file){
        formData.append("file", input.file);
    }

    try{
        setLoading(true)
        const res = await axios.post(`${backend}/api/v1/user/profile/update`, formData, {
            headers : {
                'Content-Type' : 'multipart/form-data'
            },
            withCredentials : true
        })
        console.log(res.data);
        if(res.data.success){
            dispatch(setUser(res.data.user))
            toast.success(res.data.message);
        }
    }catch(e){
        console.log(e);
        toast.error(e.response.data.message)
    }finally{
        setLoading(false)
    }

    setOpen(false)

  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setInput({ ...input, file: file }); 
    }
  };


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="sm:max-w-[425px] bg-gray-900 text-gray-100 border border-gray-700 shadow-xl rounded-lg p-6"
        onInteractOutside={() => setOpen(false)}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-blue-400">
            Update Profile
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={submitHandler}>
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right text-gray-400">
                Name
              </Label>
              <Input
                onChange={changeEventHandler}
                value={input.fullname}
                id="name"
                name="fullname"
                className="col-span-3 bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 rounded-md"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right text-gray-400">
                Email
              </Label>
              <Input
                onChange={changeEventHandler}
                value={input.email}
                id="email"
                name="email"
                className="col-span-3 bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 rounded-md"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phoneNumber" className="text-right text-gray-400">
                Phone Number
              </Label>
              <Input
                onChange={changeEventHandler}
                value={input.phoneNumber}
                id="phoneNumber"
                name="phoneNumber"
                className="col-span-3 bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 rounded-md"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bio" className="text-right text-gray-400">
                Bio
              </Label>
              <Input
                onChange={changeEventHandler}
                value={input.bio}
                id="bio"
                name="bio"
                className="col-span-3 bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 rounded-md"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="skills" className="text-right text-gray-400">
                Skills
              </Label>
              <Input
                onChange={changeEventHandler}
                value={input.skills}
                id="skills"
                name="skills"
                className="col-span-3 bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 rounded-md"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right text-gray-400">Resume</Label>
              <div className="col-span-3">
                <input
                  id="file"
                  name="file"
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="file"
                  className="cursor-pointer bg-white text-gray-900 py-1 text-sm px-4 rounded-md hover:bg-gray-200"
                >
                  {fileName ? fileName : "Choose File"}
                </label>
              </div>
            </div>
          </div>

          <DialogFooter>
            {loading ? (
              <Button className="bg-blue-700 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </Button>
            ) : (
              <Button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                Update
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;
