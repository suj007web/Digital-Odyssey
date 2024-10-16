import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2, Menu, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import { useEffect, useState } from "react";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/logout`,
        { withCredentials: true }
      );
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const { user } = useSelector((store) => store.auth);
  useEffect(() => {
    setPopoverOpen(false);
  }, [user]);

  return (
    <div className="bg-gray-900 text-gray-200">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        <div>
          <h1 className="text-3xl font-semibold">
            Digital <span className="text-blue-400">Odyssey</span>
          </h1>
        </div>

        {/* Hamburger menu for mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setDrawerOpen(!drawerOpen)}
            className="text-gray-200 focus:outline-none"
          >
            {drawerOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-10 px-5">
          <ul className="flex gap-8 font-medium items-center">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link
                    to="/admin/companies"
                    className="hover:text-blue-400 transition duration-200"
                  >
                    Companies
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/jobs"
                    className="hover:text-blue-400 transition duration-200"
                  >
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/"
                    className="hover:text-blue-400 transition duration-200"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/jobs"
                    className="hover:text-blue-400 transition duration-200"
                  >
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/browse"
                    className="hover:text-blue-400 transition duration-200"
                  >
                    Browse
                  </Link>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex gap-4">
              <Link to="/login">
                <Button
                  variant="outline"
                  className="text-black transition duration-200"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-blue-500 hover:bg-blue-600 text-white transition duration-200">
                  Sign Up
                </Button>
              </Link>
            </div>
          ) : (
            <Popover
              open={popoverOpen}
              onOpenChange={() => setPopoverOpen(!popoverOpen)}
              
            >
              <PopoverTrigger  asChild>
                <Avatar className="cursor-pointer ring-2 ring-blue-400 ring-offset-2 ring-offset-gray-900 transition-all duration-200 hover:ring-blue-300">
                  <AvatarImage
                    className="object-cover"
                    src={user?.profile?.profilePhoto}
                    alt={user?.fullname}
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="bg-slate-800 mr-5 outline-none border-none rounded-lg shadow-md shadow-gray-800 p-4">
                <div className="flex gap-5 items-center">
                  <Avatar className="cursor-pointer border-2 border-blue-400">
                    <AvatarImage
                      className="object-cover"
                      src={user?.profile?.profilePhoto}
                    />
                  </Avatar>
                  <div className="text-white">
                    <h4 className="font-semibold">{user?.fullname}</h4>
                    <p className="text-sm text-gray-400 line-clamp-3 overflow-hidden">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col mt-4 space-y-2 items-start">
                  {/* View Profile only if the user is not an admin */}
                  {user && user.role === "student" && (
                    <Button
                      variant="link"
                      className="text-blue-400 hover:text-blue-600 flex items-center gap-2"
                      onClick={() => {
                        navigate("/profile");
                        setPopoverOpen(false);
                      }}
                    >
                      <User2 />
                      View Profile
                    </Button>
                  )}

                  <Button
                    onClick={logoutHandler}
                    variant="link"
                    className="text-red-500 hover:text-red-700 flex items-center gap-2"
                  >
                    <LogOut />
                    Logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Drawer for mobile view */}
        {drawerOpen && (
          <div className="absolute top-16 left-0 w-full bg-gray-900 text-gray-200 md:hidden z-50">
            <ul className="flex flex-col gap-4 p-4">
              {user && (
                <li className="flex items-center gap-4">
                  <Avatar className="cursor-pointer ring-2 ring-blue-400">
                    <AvatarImage
                      className="object-cover"
                      src={user?.profile?.profilePhoto}
                      alt={user?.fullname}
                    />
                  </Avatar>
                  <span>{user.fullname}</span>
                </li>
              )}
              {user && user.role === "recruiter" ? (
                <>
                  <li>
                    <Link
                      to="/admin/companies"
                      className="hover:text-blue-400 transition duration-200"
                      onClick={() => setDrawerOpen(false)}
                    >
                      Companies
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/jobs"
                      className="hover:text-blue-400 transition duration-200"
                      onClick={() => setDrawerOpen(false)}
                    >
                      Jobs
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to="/"
                      className="hover:text-blue-400 transition duration-200"
                      onClick={() => setDrawerOpen(false)}
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/jobs"
                      className="hover:text-blue-400 transition duration-200"
                      onClick={() => setDrawerOpen(false)}
                    >
                      Jobs
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/browse"
                      className="hover:text-blue-400 transition duration-200"
                      onClick={() => setDrawerOpen(false)}
                    >
                      Browse
                    </Link>
                  </li>
                </>
              )}
              {!user ? (
                <>
                  <li>
                    <Link to="/login">
                      <Button
                        variant="outline"
                        className="text-black transition duration-200 w-full"
                        onClick={() => setDrawerOpen(false)}
                      >
                        Login
                      </Button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/signup">
                      <Button
                        className="bg-blue-500 hover:bg-blue-600 text-white transition duration-200 w-full"
                        onClick={() => setDrawerOpen(false)}
                      >
                        Sign Up
                      </Button>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  {/* View Profile only if the user is not an admin */}
                  {user && user.role === "student" && (
                    <li>
                      <Button
                        variant="link"
                        className="text-blue-400 hover:text-blue-600 flex items-center gap-2 w-full"
                        onClick={() => {
                          navigate("/profile");
                          setDrawerOpen(false);
                        }}
                      >
                        <User2 />
                        View Profile
                      </Button>
                    </li>
                  )}

                  <li>
                    <Button
                      onClick={logoutHandler}
                      variant="link"
                      className="text-red-500 hover:text-red-700 flex items-center gap-2 w-full"
                    >
                      <LogOut />
                      Logout
                    </Button>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
