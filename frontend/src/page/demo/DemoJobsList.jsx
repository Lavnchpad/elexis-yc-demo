import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DataTable from "@/components/table/DataTable";
import { demoJobs } from "@/lib/demo-data";

const demoJobColumns = [
  {
    accessorKey: "job_name",
    header: "Title",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "max_ctc",
    header: "CTC",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const jobId = row?.original?.id;
      const isMainDemo = jobId === "demo-1";
      return (
        <div className="flex gap-2">
          <Button
            asChild
            size="sm"
            className="bg-gray-300 text-black hover:bg-gray-300 hover:scale-95"
          >
            <Link to={isMainDemo ? "/demo/job" : "#"}>View Details</Link>
          </Button>
          <Button
            variant="destructive"
            size="sm"
            className="bg-red-300 text-black hover:bg-red-300 hover:scale-95"
            onClick={() => {
              if (isMainDemo) return;
              alert("Delete is disabled in demo mode.");
            }}
          >
            Delete
          </Button>
        </div>
      );
    },
  },
];

const DemoJobsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("all");

  const filteredData = demoJobs.filter((job) => {
    const matchesSearch = job.job_name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesLocation =
      selectedLocation === "all" ||
      job.location.toLowerCase().includes(selectedLocation.toLowerCase());
    return matchesSearch && matchesLocation;
  });

  return (
    <div className="">
      <div className="flex justify-between items-center"></div>
      <div className="flex items-center gap-4 p-2 bg-black text-white rounded-t-lg">
        <Input
          placeholder="Search for Jobs"
          className="max-w-sm text-black"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select
          value={selectedLocation}
          onValueChange={setSelectedLocation}
          className="color-black"
        >
          <SelectTrigger className="w-[180px] text-muted-foreground">
            <SelectValue placeholder="Filter by Location" className="text-black" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            <SelectItem value="Remote">Remote</SelectItem>
            <SelectItem value="Mumbai">Mumbai</SelectItem>
            <SelectItem value="Bangalore">Bangalore</SelectItem>
            <SelectItem value="Pune">Pune</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <DataTable
        hasClick={false}
        hasPagination={false}
        columns={demoJobColumns}
        data={filteredData}
      />
    </div>
  );
};

export default DemoJobsList;
