import { Contact, Mail, Pen } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import ApplicationTable from "./ApplicationTable";
import { useState } from "react";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

const isResume = true;

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="bg-black py-10 text-gray-200 min-h-screen">
      {/* Container adjusted for responsive behavior */}
      <div className="mx-4 lg:mx-52 bg-gray-800 border border-gray-700 rounded-2xl p-8 shadow-lg">
        {/* Flex wrapping for responsive layout */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24 border-2 border-blue-400">
              <AvatarImage className="object-cover" src={user?.profile?.profilePhoto} />
            </Avatar>
            <div className="mt-4 lg:mt-0">
              <h1 className="font-medium text-lg">{user?.fullname}</h1>
              <p>{user?.profile?.bio}</p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="mt-4 lg:mt-0 text-right bg-blue-500 border-none hover:bg-blue-600"
            variant="outline"
          >
            <Pen className="text-gray-300 " />
          </Button>
        </div>

        <div className="my-5">
          <div className="flex items-center gap-2">
            <Mail className="text-gray-400" />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Contact className="text-gray-400" />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

        <div className="my-5">
          <h1 className="font-semibold text-lg">Skills</h1>
          <div className="flex flex-wrap items-center gap-2">
            {user?.profile?.skills.length !== 0 ? (
              user?.profile?.skills.map((item, idx) => (
                <Badge key={idx} className="bg-blue-900 bg-opacity-20 text-blue-400 font-semibold shadow-sm shadow-blue-500/50">
                  {item}
                </Badge>
              ))
            ) : (
              <span className="text-gray-400">NA</span>
            )}
          </div>
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-md font-semibold">Resume</Label>
          {isResume ? (
            <a
              className="text-blue-500 hover:underline cursor-pointer"
              href={user?.profile?.resume}
              target="blank"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span className="text-gray-400">NA</span>
          )}
        </div>
      </div>

      <div className="mx-4 lg:mx-52 bg-gray-800 rounded-2xl my-5 p-5 shadow-lg">
        <h1 className="font-semibold text-lg my-4">Applied Jobs</h1>
        <ApplicationTable />
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
