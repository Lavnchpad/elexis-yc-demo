import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { CandidateInterviewService, CandidateTimeNotMatchingResponse, CandidateInterviewErrorResponse, CandidateInterviewInformationResponse } from "@/service/CandidateInterview";
import { InterviewLoader } from "./Loader";
import { InterviewTimeNotInRange } from "./InterviewTimeNotInRange";
import { PreInterviewForm } from "./PreinterviewForm";

const StartInterview = () => {
  const { interviewId } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    CandidateInterviewService.getInterviewInformation(interviewId)
      .then((data) => {
        setData(data);
      }).catch((error) => {
        setData(undefined);
      })
  }, []);
  if (!data) {
    return <InterviewLoader />;
  }
  switch (data?.constructor) {
    case CandidateInterviewInformationResponse:
      return <PreInterviewForm interviewData={data} onSubmit={async (data) => {
        // Wait 15 secs
        await new Promise(resolve => setTimeout(resolve, 15000));
        // Start the interview
      }}/>
    case CandidateTimeNotMatchingResponse:
      return <InterviewTimeNotInRange data={data} />;
    case CandidateInterviewErrorResponse:
      return <InterviewTimeNotInRange errored data={new CandidateTimeNotMatchingResponse(false, "Interview not found or invalid interview ID.")} />;
    default:
      return <InterviewTimeNotInRange errored data={new CandidateTimeNotMatchingResponse(false, "Interview not found or invalid interview ID.")} />;
  }
};

export default StartInterview;
