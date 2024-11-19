import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell } from "lucide-react";
import { Button } from "../ui/button";
import AddCandidate from "./candidate/AddCandidate";
import ManageJobs from "./jobs/ManageJobs";
import { useNavigate } from "react-router-dom";
import { JobsProvider } from "./jobs/JobsContext";
import logo from "../../assets/images/logo.png";

const Navbar = () => {
  const navigate = useNavigate(); // Initialize the navigation hook

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
          <JobsProvider>
          <AddCandidate>
            <Button>Add Candidate</Button>
          </AddCandidate>
          <ManageJobs>
            <Button>Manage Jobs</Button>
          </ManageJobs>
          </JobsProvider>
        </div>

        {/* Spacer to push items to the right */}
        <div className="flex-1">
          {/* <Button>Add Candidate</Button>
          <Button>Manage Jobs</Button> */}
        </div>

        {/* Notification and Avatar */}
        <div className="flex items-center space-x-4">
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
            <DropdownMenuContent>
              {/* <DropdownMenuItem>Profile</DropdownMenuItem> */}
              <DropdownMenuItem  onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
