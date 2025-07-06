


import { Button } from "@/components/ui/button";
import { Trash2, Ban } from "lucide-react";
import { Link } from "react-router-dom";

export const jobColumns = (deleteJob) => [
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
    header: "",
    cell: ({ row }) => {
      const job = row.original;
      return (
        <div className="flex gap-2 justify-end">
          <Button
            variant="destructive"
            size="sm"
            className="bg-red-600 hover:bg-red-700"
            onClick={() => deleteJob(job.id, job.created_by)}
          >
            Delete
          </Button>
        </div>
        
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
        const jobId = row.original.id
        return <Link to={`/job/${jobId}`}>
            <Button size="sm">
                View Details
            </Button>
        </Link>
    }
}
];


