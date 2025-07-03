import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import useJobEvaluation from "../hooks/useJobEvaluation"
import Tooltip from "./ToolTipCustom"
import { Link } from "react-router-dom"
import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"



export function JobsEvaluationTable({ id }) {
    const { evaluations: candidateEvaluations, criterias } = useJobEvaluation({ jobId: id })
    const [showJobsEvaluationTable, setShowJobsEvaluationTable] = useState(false);
    const fullmarks = criterias?.reduce((acc, criteria) => acc + (criteria?.weightage || 0) * 100, 0) || 0;
    return (
        <>
            <div className="flex justify-between items-center">
                <h1 className="">Candidate Evaluations</h1>
                {
                    showJobsEvaluationTable ?
                        <ChevronUp className='cursor-pointer' onClick={() => setShowJobsEvaluationTable(prev => !prev)} />
                        :
                        <ChevronDown className='cursor-pointer' onClick={() => setShowJobsEvaluationTable(prev => !prev)} />
                }
            </div>
            {
                showJobsEvaluationTable &&
                <Table>
                    <TableCaption>Candidate Evaluation</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Candidate</TableHead>
                            {criterias?.map((criteria) => (
                                <TableHead key={criteria.id} className="text-center">{criteria?.requirement}({criteria?.weightage || 0})</TableHead>
                            ))}
                            <TableHead className="text-right">Total ({fullmarks})</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Object.values(candidateEvaluations)?.map((item) => (
                            <TableRow key={item?.candidateId}>
                                <TableCell className="font-medium">{item?.candidateName}</TableCell>
                                {
                                    criterias?.map((criteria) => {
                                        return (
                                            <TableCell key={criteria.id} className="text-center">
                                                <Tooltip message={item?.evaluations?.[criteria?.id]?.["remarks"]} position="top" className="text-xs w-96 bg-white shadow-lg">
                                                    {item?.evaluations?.[criteria?.id]?.["weightedScore"]}
                                                </Tooltip>
                                            </TableCell>
                                        )
                                    })
                                }
                                <TableCell className="text-right">{item?.totalScore}</TableCell>
                                <TableCell className="text-right"><Link className="hover:underline" to={`/candidate/${item.candidateId}?interview_id=${item?.interviewId?.[0] || ""}`}>View Details</Link></TableCell>

                            </TableRow>
                        ))}
                        </TableBody>
                        <TableFooter>
                        </TableFooter>
                    </Table>
            }
        </>

    )
}
