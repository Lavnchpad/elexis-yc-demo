import React, { useContext } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, PersonStanding, Plus, WalletCards } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import { useUser } from './recruiter/UserContext';
import ManageJobs from "./jobs/ManageJobs";
import { JobsContext, JobsProvider } from "./jobs/JobsContext";
import { Button } from "../ui/button";

const Navbar = () => {
  const { fetchJobs } = useContext(JobsContext);
  const navigate = useNavigate(); // Initialize the navigation hook
  const { user } = useUser();
  const location = useLocation();

  // Determine if we're in demo mode
  const isDemo = location.pathname.startsWith("/demo");

  // Determine the active path for default and dynamic selection
  const activePath = location.pathname === "/" || location.pathname === "/demo/candidate" ? "candidates" : location.pathname === "/jobs" || location.pathname.startsWith("/demo/job") ? "jobs" : "analytics";
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Clear the auth token
    navigate("/login"); // Redirect to login page (you can change this to another page)
  };
  return (
    <nav className="border-b bg-white px-4">
      <div className="flex h-16 items-center px-4 gap-2 container mx-auto">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <img src={logo} className="w-20 h-auto" onClick={() => navigate('/jobs')} />
          <JobsProvider>
            {
              activePath === "jobs" ? (
                <h1 className="text-xl font-bold">Jobs</h1>
              ) :
                <h1 className="text-xl font-bold">Candidates</h1>
            }
            <ManageJobs onJobCreated={fetchJobs} isDemo={isDemo}>
              <Button className='bg-red-700 shadow-2xl rounded-full'><Plus /> Create Job</Button>
            </ManageJobs>
          </JobsProvider>
        </div>

        {/* Spacer to push items to the right */}
        <div className="ml-auto flex-end items-center space-x-4">
          {/* <Button>Add Candidate</Button>
          */}
          <Button asChild className='bg-white text-muted-foreground rounded-full'>
            <Link to={isDemo ? '/demo/jobs' : '/jobs'} className=' border border-gray-200 shadow-lg'><WalletCards /> Jobs</Link>
          </Button>
          <Button asChild className='rounded-full'>
            <Link to={isDemo ? '/demo/candidate' : '/'} className=' bg-red-700 text-white border shadow-2xl'><PersonStanding /> Candidates</Link>
          </Button>
        </div>

        {/* Notification and Avatar */}
        <div className="flex items-center space-x-4">
        <div className="flex flex-col items-end">
            <p className="text-lg font-semibold">{user?.name}</p>
            <p className="text-sm font-light">{user?.email}</p>
            {/* <NavbarSelect /> */}
          </div>
          <Bell className="cursor-pointer" />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage
                  // src="https://github.com/shadcn.png"
                  alt="User Avatar"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            {/* {user.name} */}
            <DropdownMenuContent>
              {/* <DropdownMenuItem>Profile</DropdownMenuItem> */}
             <Link to="/my-profile"> <DropdownMenuItem  >My Profile</DropdownMenuItem></Link>
             <Link to="/my-team"><DropdownMenuItem  >My Team</DropdownMenuItem></Link>
              <DropdownMenuItem  onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
