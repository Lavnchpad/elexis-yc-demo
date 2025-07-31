import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export default function InboundApplications({ applicants, inboundApplicantActions }) {

    return (
        <Table>
            <TableCaption>Applications added for this job , sorted by their acceptability for this Job</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="text-center">Name</TableHead>
                    <TableHead className="text-center">Email</TableHead>
                    <TableHead className="text-center">Phone</TableHead>
                    <TableHead className="text-center">Added By</TableHead>
                    {/* <TableHead className="text-center">Added At</TableHead> */}
                    <TableHead className="text-center">Score </TableHead>
                    <TableHead className="text-center">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    applicants?.map((applicant) => {
                        return (
                            <TableRow key={applicant.id}>
                                <TableCell className="text-center">
                                    {applicant.candidate.name}
                                </TableCell>
                                <TableCell className="text-center">
                                    {applicant.candidate?.email}
                                </TableCell>
                                <TableCell className="text-center">
                                    {applicant.candidate?.phone_number}
                                </TableCell>
                                <TableCell className="text-center">
                                    {applicant.created_by?.name}
                                </TableCell>
                                <TableCell className="text-center">
                                    {applicant.score}
                                </TableCell>
                                <TableCell className="text-center flex fle-wrap justify-center gap-2"><Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="link">Actions</Button>
                                    </TooltipTrigger>
                                    <TooltipContent className={"flex flex-col justify-center items-center"}>
                                        <Button variant="link" className="text-white" onClick={() => { inboundApplicantActions({ ...applicant, type: "shortlist" }) }}>Shortlist</Button>
                                        <Button asChild>

                                            <Link className="hover:underline" to={`/candidate/${applicant.candidate?.id}`}>Details</Link>
                                        </Button>
                                    </TooltipContent>
                                </Tooltip>

                                </TableCell>
                            </TableRow>
                        )
                    })
                }
            </TableBody>
            <TableFooter>
            </TableFooter>
        </Table>
    )
}
