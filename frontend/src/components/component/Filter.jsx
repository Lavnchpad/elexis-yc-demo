import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ListFilter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Filter = ({ onSearch }) => {
  const handleSearchChange = (e) => {
    onSearch(e.target.value); // Pass the search term to the parent
  };

  return (
    <div className="w-full p-4 bg-white border-b border-gray-200">
      <div className="flex gap-2 items-center">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Type to search"
            className="pl-8"
            onChange={handleSearchChange} // Call `onSearch` on every input change
          />
        </div>

        {/* Dropdown Filter Button */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="filter" size="icon">
              <ListFilter className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 bg-gray-500 rounded-full"></span>
              <span>All</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 bg-green-500 rounded-full"></span>
              <span>Selected</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 bg-blue-500 rounded-full"></span>
              <span>Review</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 bg-yellow-500 rounded-full"></span>
              <span>Pending</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 bg-red-500 rounded-full"></span>
              <span>Rejected</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Filter;
