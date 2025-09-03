import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/component/Navbar";


const AppLayout = () => {

  return (
    <div className="flex flex-col">
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 bg-white z-50">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="flex flex-1 pt-16 h-[100dvh] overflow-y-auto">

        {/* Page Content */}
        <div
          className={'flex-1 p-2 transition-all duration-300'}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
