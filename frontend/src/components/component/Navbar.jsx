import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import { useUser } from './recruiter/UserContext';

const Navbar = () => {
  const navigate = useNavigate(); // Initialize the navigation hook
  const { user } = useUser();

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Clear the auth token
    navigate("/login"); // Redirect to login page (you can change this to another page)
  };
  return (
    <nav className="border-b bg-white px-4">
      <div className="flex h-16 items-center px-4 container mx-auto">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <img src={logo} className="w-20 h-auto"/>
          {/* <JobsProvider>
          <AddCandidate>
            <Button>Add Candidate</Button>
          </AddCandidate>
          <ManageJobs>
            <Button>Manage Jobs</Button>
          </ManageJobs>
          </JobsProvider> */}
        </div>

        {/* Spacer to push items to the right */}
        <div className="flex-1">
          {/* <Button>Add Candidate</Button>
          <Button>Manage Jobs</Button> */}
        </div>

        {/* Notification and Avatar */}
        <div className="flex items-center space-x-4">
        <div className="flex flex-col items-end">
            <p className="text-lg font-semibold">{user?.name}</p>
            <p className="text-sm font-light">{user?.email}</p>
            {/* <NavbarSelect /> */}
          </div>
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
          <Bell className="cursor-pointer" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
