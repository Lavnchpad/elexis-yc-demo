import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import useJobInterviews from '@/page/hooks/useJobInterviews';
import { ChevronDown, ChevronUp, ListFilter } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export default function ScheduledInterviews({ id }) {
    const { interviews } = useJobInterviews({ jobId: id });
    const [showInterviews, setShowInterviews] = useState(false);
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
                                <TableHead key={"Status"} className="text-center flex items-center gap-0 justify-center">Status <ListFilter className="h-4 ml-0" /></TableHead>

                                <TableHead className="text-right"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                interviews?.map((interview) => {
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
                                                {interview?.status}
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
