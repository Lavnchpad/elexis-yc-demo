import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import Navbar from "@/components/component/Navbar";
import { Button } from "@/components/ui/button";
import { Home, Briefcase,ChartNoAxesColumn} from "lucide-react";

const AppLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Determine the active path for default and dynamic selection
  const activePath = location.pathname === "/" ? "candidates" : location.pathname === "/jobs" ? "jobs" :"analytics";

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 bg-white z-50">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <div
          className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white text-black border-r border-gray-300 shadow-lg pl-2 pr-4 transition-all duration-300 ${
            isSidebarOpen ? "w-64" : "w-16"
          }`}
          onMouseEnter={() => setIsSidebarOpen(true)}
          onMouseLeave={() => setIsSidebarOpen(false)}
        >
          <div className="flex items-center justify-between">
            <h2
              className={`font-bold text-lg ${
                isSidebarOpen ? "block" : "hidden"
              }`}
            >
            </h2>
            <Button
              variant="ghost"
              className="p-1 text-gray-600 hover:text-black"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >

            </Button>
          </div>
          <nav className="space-y-2 mt-4">
            {/* Candidates Link */}
            <Link
              to="/"
              className={`flex items-center space-x-2 p-2 rounded transition-colors ${
                isSidebarOpen
                  ? activePath === "candidates"
                    ? "bg-red-500 text-white"
                    : "hover:bg-red-500 hover:text-white"
                  : activePath === "candidates"
                  ? "bg-white text-red-500"
                  : "hover:bg-gray-200"
              }`}
            >
              <div
                className={`p-2 rounded ${
                  !isSidebarOpen && activePath === "candidates"
                    ? "text-red-500"
                    : "text-black"
                }`}
              >
                <Home />
              </div>
              {isSidebarOpen && <span>Candidates</span>}
            </Link>

            {/* Jobs Link */}
            <Link
              to="/jobs"
              className={`flex items-center space-x-2 p-2 rounded transition-colors ${
                isSidebarOpen
                  ? activePath === "jobs"
                    ? "bg-red-500 text-white"
                    : "hover:bg-red-500 hover:text-white"
                  : activePath === "jobs"
                  ? "bg-white text-red-500"
                  : "hover:bg-gray-200"
              }`}
            >
              <div
                className={`p-2 rounded ${
                  !isSidebarOpen && activePath === "jobs"
                    ? "text-red-500"
                    : "text-black"
                }`}
              >
                <Briefcase />
              </div>
              {isSidebarOpen && <span>Jobs</span>}
            </Link>
            <Link
              to="/analytics"
              className={`flex items-center space-x-2 p-2 rounded transition-colors ${
                isSidebarOpen
                  ? activePath === "analytics"
                    ? "bg-red-500 text-white"
                    : "hover:bg-red-500 hover:text-white"
                  : activePath === "jobs"
                  ? "bg-white text-red-500"
                  : "hover:bg-gray-200"
              }`}
            >
              <div
                className={`p-2 rounded ${
                  !isSidebarOpen && activePath === "analytics"
                    ? "text-red-500"
                    : "text-black"
                }`}
              >
               <ChartNoAxesColumn />
              </div>
              {isSidebarOpen && <span>Analytics</span>}
            </Link>
          </nav>
        </div>

        {/* Page Content */}
        <div
          className={`flex-1 p-4 transition-all duration-300 ${
            isSidebarOpen ? "ml-64" : "ml-16"
          }`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
