import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ListFilter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Filter = ({ onSearch, onStatusChange }) => {
  const [selectedStatus, setSelectedStatus] = useState("all");

  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status); // Update the selected status
    onStatusChange(status); // Notify the parent component
  };
  
    useEffect(() => {
      const savedState = JSON.parse(localStorage.getItem("jobState"));
    
      if (savedState) {
        setSelectedStatus(savedState.status);
      } else {
        setSelectedStatus("all");
        localStorage.removeItem("jobState");
      }
    }, []);

  return (
    <div className="w-full p-4 bg-white border-b border-gray-200">
      <div className="flex gap-2 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Type to search"
            className="pl-8"
            onChange={handleSearchChange}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="filter" size="icon">
              <ListFilter className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem
              className={`flex items-center gap-2 ${
                selectedStatus === "all" ? "bg-gray-100" : ""
              }`}
              onClick={() => handleStatusChange("all")}
            >
              <span className="h-2.5 w-2.5 bg-gray-500 rounded-full"></span>
              <span>All</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className={`flex items-center gap-2 ${
                selectedStatus === "accepted" ? "bg-gray-100" : ""
              }`}
              onClick={() => handleStatusChange("accepted")}
            >
              <span className="h-2.5 w-2.5 bg-green-500 rounded-full"></span>
              <span>Selected</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className={`flex items-center gap-2 ${
                selectedStatus === "registered" ? "bg-gray-100" : ""
              }`}
              onClick={() => handleStatusChange("registered")}
            >
              <span className="h-2.5 w-2.5 bg-blue-500 rounded-full"></span>
              <span>Register</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className={`flex items-center gap-2 ${
                selectedStatus === "pending" ? "bg-gray-100" : ""
              }`}
              onClick={() => handleStatusChange("pending")}
            >
              <span className="h-2.5 w-2.5 bg-yellow-400 rounded-full"></span>
              <span>Pending</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className={`flex items-center gap-2 ${
                selectedStatus === "rejected" ? "bg-gray-100" : ""
              }`}
              onClick={() => handleStatusChange("rejected")}
            >
              <span className="h-2.5 w-2.5 bg-red-500 rounded-full"></span>
              <span>Rejected</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className={`flex items-center gap-2 ${selectedStatus === "hold" ? "bg-gray-100" : ""
                }`}
              onClick={() => handleStatusChange("hold")}
            >
              <span className="h-2.5 w-2.5 bg-yellow-800 rounded-full"></span>
              <span>Hold</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Filter;
