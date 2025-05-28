import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import useJobEvaluation from "../hooks/useJobEvaluation"
import Tooltip from "./ToolTipCustom"
import { Info } from "lucide-react"



export function JobsEvaluationTable({ id }) {
    const { evaluations: candidateEvaluations, criterias } = useJobEvaluation({ jobId: id })
    return (
        <Table>
            <TableCaption>Candidate Evaluation</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Candidate</TableHead>
                    {criterias?.map((criteria) => (
                        <TableHead key={criteria.id} className="text-center">{criteria?.requirement}({criteria?.weightage || 0})</TableHead>
                    ))}
                    <TableHead className="text-right">Total</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {Object.values(candidateEvaluations)?.map((item) => (
                    <TableRow key={item?.candidateId}>
                        <TableCell className="font-medium">{item?.candidateName}</TableCell>
                        {
                            criterias?.map((criteria) => {
                                console.log("criteria", item.evaluations[criteria?.id])
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
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
            </TableFooter>
        </Table>
    )
}
