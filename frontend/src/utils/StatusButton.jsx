import React from "react";
import { Button } from "@/components/ui/button"; // Assuming Button is a pre-built component
import ScheduleDrive from "@/components/component/drive/ScheduleDrive";
import axios from "axios";

const StatusButton = ({ interviewData, selectedCandidate, selectedInterview }) => {
  console.log({ interviewData, selectedCandidate, selectedInterview })

  const status = interviewData?.map((i) => i.status).sort((a, b) => statusPriority[a] - statusPriority[b])[0]
 const hasScheduledInterview = interviewData?.some(
  (interview) => interview.link || interview.time
);

async function changeInterviewStatus(type){
  async function updateInterViewStaus(type) {
    if (!type || !selectedInterview?.id) {
      return;
    }
    const token = localStorage.getItem("authToken");
    try {
      const response = await axios.patch(`${import.meta.env.VITE_API_BASE_URL}/interviews/${selectedInterview.id}/`, {
        "status": type,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      })
      return response.data
    } catch (error) {
      throw error
    }
  }
 switch(type){
   case 'accepted':
   case 'rejected':
  case 'hold':
     await updateInterViewStaus(type)
     break;
   default:
     console.log('invalid type')

 }
}
  return (
    <div className="ml-auto flex space-x-4">
      {/* Conditionally render buttons based on the status */}
      {status === InterviewStatus.ACCEPTED && (
        <>
          <Button className="px-6 py-3" disabled>
            Accepted
          </Button>
        </>
      )}
      {status === InterviewStatus.REJECTED && (
        <>
          <Button className="px-6 py-3" disabled>
            Rejected
          </Button>
        </>
      )}
      {/* {status === "scheduled" && (
        <>
          <Button className="px-6 py-3" disabled>
            Scheduled
          </Button>
        </>
      )} */}
      {status === InterviewStatus.HOLD && (
        <>
          <Button className="px-6 py-3" disabled>
            On Hold
          </Button>
        </>
      )}
      {status === "registered" && selectedInterview?.status == InterviewStatus.ENDED && (
        <>
          <Button className="px-6 py-3 bg-green-600" onClick={() => changeInterviewStatus(InterviewStatus.ACCEPTED)} type='button'>Accept</Button>
          <Button className="px-6 py-3 bg-red-500" onClick={() => changeInterviewStatus(InterviewStatus.REJECTED)} type='button'>Reject</Button>
          <Button className="px-6 py-3 bg-yellow-600" onClick={() => changeInterviewStatus(InterviewStatus.HOLD)} type='button'>Hold</Button>
        </>
      )}
      <div>

      </div>
      <ScheduleDrive selectedCandidate={selectedCandidate}>
            <Button className="px-6 py-3">Schedule</Button>
          </ScheduleDrive>
          {hasScheduledInterview && (
        <ScheduleDrive value={true} selectedCandidate={selectedCandidate}>
          <Button className="px-6 py-3">Reschedule</Button>
        </ScheduleDrive>
      )}
    </div>
  );
};
const statusPriority = {
  "accepted": 1,
  "pending": 2,
  "review": 3,
  "rejected": 4,
  "registered": 5,
};
export const InterviewStatus = {
  ACCEPTED: "accepted",
  REJECTED: "rejected",
  SCHEDULED: "scheduled",
  STARTED: "started",
  ENDED: "ended",
  HOLD: "hold",
  REGISTERED: "registered",
};

export default StatusButton;