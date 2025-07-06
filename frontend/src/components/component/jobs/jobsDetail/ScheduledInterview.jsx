import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useJobInterviews from '@/page/hooks/useJobInterviews';
import { ChevronDown, ChevronUp, ListFilter } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function ScheduledInterviews({ id }) {
    const { interviews } = useJobInterviews({ jobId: id });
    const [filteredInterviews, setFilteredInterviews] = useState([]);
    const [showInterviews, setShowInterviews] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState("all"); // This should be managed in state if you want to filter interviews by status
    const handleStatusChange = (status) => {
        if (selectedStatus === status) {
            return;
        }
        setSelectedStatus(status);

        setFilteredInterviews((prev) => {
            if (status === "all") {
                return interviews; // If status is 'all', return all interviews
            }
            return interviews.filter(interview => interview.status === status)
        })

    }
    useEffect(() => {
        if (Array.isArray(interviews) && interviews.length > 0) {
            setFilteredInterviews(interviews);
        }
    }, [interviews])
    return (
        <div className=''>
            <div className='flex justify-between'>

                <h1 className=''>Interviews</h1>
                {
                    showInterviews ?
                        <ChevronUp className='cursor-pointer' onClick={() => setShowInterviews(prev => !prev)} />
                        :
                        <ChevronDown className='cursor-pointer' onClick={() => setShowInterviews(prev => !prev)} />
                }
            </div>
            {
                showInterviews &&
                <>
                    <Table>
                        <TableCaption>Interviews for this job</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead key={"Name"} className="text-center">Name</TableHead>
                                <TableHead key={"Email"} className="text-center">Email</TableHead>
                                <TableHead key={"Date"} className="text-center">Date</TableHead>
                                <TableHead key={"Time"} className="text-center">Time</TableHead>
                                <TableHead key={"Status"} className="text-center flex items-center gap-0 justify-center">        <DropdownMenu>
                                    <DropdownMenuTrigger className="flex gap-2 items-center">
                                        <>
                                            Status
                                            <ListFilter className="h-4 w-4" />
                                        </>

                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56">
                                        <DropdownMenuItem
                                            className={`flex items-center gap-2 ${selectedStatus === "all" ? "bg-gray-100" : ""
                                                }`}
                                            onClick={() => handleStatusChange("all")}
                                        >
                                            <span className="h-2.5 w-2.5 bg-gray-500 rounded-full"></span>
                                            <span>All</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            className={`flex items-center gap-2 ${selectedStatus === "accepted" ? "bg-gray-100" : ""
                                                }`}
                                            onClick={() => handleStatusChange("accepted")}
                                        >
                                            <span className="h-2.5 w-2.5 bg-green-500 rounded-full"></span>
                                            <span>Selected</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            className={`flex items-center gap-2 ${selectedStatus === "scheduled" ? "bg-gray-100" : ""
                                                }`}
                                            onClick={() => handleStatusChange("scheduled")}
                                        >
                                            <span className="h-2.5 w-2.5 bg-yellow-400 rounded-full"></span>
                                            <span>Scheduled</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            className={`flex items-center gap-2 ${selectedStatus === "rejected" ? "bg-gray-100" : ""
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
                                </DropdownMenu></TableHead>

                                <TableHead className="text-right"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                filteredInterviews?.map((interview) => {
                                    return (
                                        <TableRow key={interview.id}>
                                            <TableCell className="text-center">
                                                {interview.candidate?.name}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                {interview.candidate?.email}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                {interview?.date}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                {interview?.time}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                {interview?.status.toUpperCase()}
                                            </TableCell>
                                            <TableCell className="text-right"><Link className="hover:underline" to={`/candidate/${interview.candidate.id}?interview_id=${interview.id}`}>View Details</Link></TableCell>
                                        </TableRow>
                                    )
                                })
                            }


                        </TableBody>
                        <TableFooter>
                        </TableFooter>
                    </Table>
                </>
            }
        </div >
    )
}
