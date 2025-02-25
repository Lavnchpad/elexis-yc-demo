import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const InterviewColumn = [
    {
        accessorKey: 'srNo',
        header: 'Sr No.',
        cell: (info) => info.row.index + 1, // Serial number based on row index
    },
    {
        accessorKey: 'candidateName',
        header: 'Candidate Name', // Candidate's name
        cell: ({ row }) => row.original.candidate?.name || "N/A"
    },
    {
        accessorKey: 'jobName',
        header: 'Job Title', // Job associated with the interview
         cell: ({ row }) => row.original.job?.job_name || "N/A"
    },
    {
        accessorKey: 'date',
        header: 'Interview Date', // Date of the interview
        cell: ({ row }) => new Date(row.original.date).toLocaleDateString(), // Format the date
    },
    {
        accessorKey: 'time',
        header: 'Interview Time', // Time of the interview
        cell: ({ row }) => new Date(`1970-01-01T${row.original.time}Z`).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        }), // Format the time
    },
    {
        accessorKey: 'status',
        header: 'Status', // Interview status (e.g., Scheduled, Completed, etc.)
    },
    // {
    //     id: "actions",
    //     cell: ({ row }) => {
    //         const interviewId = row.original.id;
    //         return (
    //             <Link to={`/interview-details/${interviewId}`}>
    //                 <Button size="sm">
    //                     View Details
    //                 </Button>
    //             </Link>
    //         );
    //     },
    // },
];
