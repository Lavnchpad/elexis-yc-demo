import { Button } from "@/components/ui/button"
import { Trash2, Ban } from "lucide-react"
import { Link } from "react-router-dom"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export const jobColumns = [
  {
    accessorKey: "title",
    header: "Title",
  },
//   {
//     accessorKey: "openings",
//     header: "Openings",
//   },
//   {
//     accessorKey: "filled",
//     header: "Filled",
//   },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "ctc",
    header: "CTC",
  },
//   {
//     accessorKey: "applications",
//     header: "No of Applications",
//   },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      const job = row.original
      return (
        <div className="flex gap-2 justify-end">
                <Button
                  variant="destructive"
                  size="sm"
                //   onClick={() => deleteJob(job.id)}
                  className="bg-red-600 hover:bg-red-700"
                >Delete
                </Button>
    
                <Button
                  variant="outline"
                  size="sm"
                //   onClick={() => toggleJobStatus(job.id)}
                  className={job.isDisabled ? "bg-gray-200" : ""}
                >
                  <Ban className="h-4 w-4" />
                </Button>

        </div>
        
      )
    },
  },
  {
          id: "actions",
          cell: ({ row }) => {
              const memberId = row.original.id
              return <Link to={`/job/job-id`}>
                  <Button size="sm">
                      View Details
                  </Button>
              </Link>
          }
      },
]

