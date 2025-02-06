import React, { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/component/Navbar";
import { Button } from "@/components/ui/button";
import { Home, Briefcase, ChevronLeft, ChevronRight } from "lucide-react";

const AppLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div
          className={`transition-all duration-300 ${
            isSidebarOpen ? "w-64" : "w-16"
          } bg-black text-white`}
        >
          <div className="flex items-center justify-between p-4">
            <h2
              className={`font-bold text-lg ${
                isSidebarOpen ? "block" : "hidden"
              }`}
            >
              Menu
            </h2>
            <Button
              variant="ghost"
              className="p-1 text-gray-300 hover:text-white"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? <ChevronLeft /> : <ChevronRight />}
            </Button>
          </div>
          <nav className="space-y-2 px-4">
            <Link
              to="/"
              className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700"
            >
              <Home />
              {isSidebarOpen && <span>Candidates</span>}
            </Link>
            <Link
              to="/jobs"
              className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700"
            >
              <Briefcase />
              {isSidebarOpen && <span>Jobs</span>}
            </Link>
          </nav>
        </div>

        {/* Page Content */}
        <div className="flex-1 p-4">
        <Outlet context={{ selectedCandidate }} />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
