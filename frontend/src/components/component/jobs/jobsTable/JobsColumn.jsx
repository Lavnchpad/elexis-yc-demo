


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
    cell: ({ row }) => {
      const jobId = row.original.id
      return (
        <div className="flex gap-2">
          <Button asChild size="sm" className='bg-gray-300 text-black hover:bg-gray-300 hover:scale-95'>
            <Link to={`/job/${jobId}`}>
              View Details
            </Link>
          </Button>
          <Button
            variant="destructive"
            size="sm"
            className="bg-red-300 text-black hover:bg-red-300 hover:scale-95"
            onClick={() => deleteJob(job.id, job.created_by)}
          >
            Delete
          </Button>
        </div>
      )
    }
  },
];


