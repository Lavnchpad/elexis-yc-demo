import Filter from "@/components/component/Filter";
import Navbar from "@/components/component/Navbar";
import Sidebar from "@/components/component/Sidebar";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  return (
    <div className="flex flex-col h-screen">
      <div className="">
        <Navbar />
      </div>
      <div className="flex flex-1">
        <div className="w-1/4 border-r p-4">
          <Sidebar setSelectedCandidate={setSelectedCandidate} />
        </div>

        <div className="flex-1 p-4 bg-white-100 border-r border-gray-300">
          <Outlet context={{ selectedCandidate }} />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
