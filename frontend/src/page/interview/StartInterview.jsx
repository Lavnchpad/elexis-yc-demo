import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { CandidateInterviewService, CandidateTimeNotMatchingResponse, CandidateInterviewErrorResponse, CandidateInterviewInformationResponse, InterviewCreatedSucessResponse } from "@/service/CandidateInterview";
import { InterviewLoader } from "./Loader";
import { InterviewTimeNotInRange } from "./InterviewTimeNotInRange";
import { PreInterviewForm } from "./PreinterviewForm";

const StartInterview = () => {
  const { interviewId } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    CandidateInterviewService.getInterviewInformation(interviewId)
      .then((data) => {
        setData(data);
      }).catch((error) => {
        setData(undefined);
        setError(true);
        console.error("Error fetching interview information:", error);
      })
  }, []);
  if (error) {
    return <InterviewLoader variant="error" />;
  }
  if (!data) {
    return <InterviewLoader variant="loader" />;
  }
  switch (data?.constructor) {
    case CandidateInterviewInformationResponse:
      return <PreInterviewForm interviewData={data} onSubmit={async (data) => {
        try {
          const response = await CandidateInterviewService.startInterview({ current_ctc: data.currentCtc, expected_ctc: data.expectedCtc, reason_for_leaving_previous_job: data.reasonForLeavingJob, language: data.language, interviewId });
          if (response instanceof InterviewCreatedSucessResponse && response.url) {
            window.location.href = response.url;
          } else {
            toast.error("Failed to start the interview. Please try again later.");
          }
        } catch (error) {
          console.error("Error saving pre-interview info:", error);
          toast.error("Failed to save pre-interview information. Please try again later.");
          throw error;
        }
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
