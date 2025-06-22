import React from "react";
import { toast } from "sonner";
import { CandidateTimeNotMatchingResponse } from "@/service/CandidateInterview";
/**
 * Component to display a message when the interview time is not in range.
 * @param {Object} props - The component props.
 * @param {CandidateTimeNotMatchingResponse} props.data - The data containing information about the interview time mismatch.
 * @returns {JSX.Element} The rendered component.
 */
export const InterviewTimeNotInRange = ({data, errored=false}) => {
    if(!(data instanceof CandidateTimeNotMatchingResponse)) {
        throw new Error("Invalid data provided to InterviewTimeNotInRange");
    }
    const header = errored?"Error loading interview information":(data.isEarly ? "You are too early for the interview." : "You are too late for the interview.");
    const message = data.message;
    toast(message)
    return (
        <div className="w-full h-screen">
            <div className="flex h-full justify-center items-center flex-col">
                <div className="p-4 space-y-4">
                    <h1 className="text-xl font-bold">{header}</h1>
                </div>
                <div className="p-4 space-y-4">
                    <p>{data.message}</p>
                </div>
            </div>
        </div>
    );
}