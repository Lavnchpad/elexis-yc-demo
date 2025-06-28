import React from "react";
import { Button } from "@/components/ui/button"; // Assuming Button is a pre-built component
import ScheduleDrive from "@/components/component/drive/ScheduleDrive";
import axios from "../utils/api";
import { toast } from "sonner";


const StatusButton = ({ interviewData, selectedCandidate, selectedInterview, setSelectedInterview }) => {

  const status = interviewData?.map((i) => i.status).sort((a, b) => statusPriority[a] - statusPriority[b])[0]
  const hasScheduledInterview = interviewData?.some(
    (interview) => interview.link || interview.time
  );

  async function changeInterviewStatus(type) {
    async function updateInterViewStaus(type) {
      if (!type || !selectedInterview?.id) {
        toast.error("Please select an Interview")
        return;
      }
      try {
        const response = await axios.patch(`/interviews/${selectedInterview.id}/`, {
          "status": type,
        })
        return response.data
      } catch (error) {
        throw error
      }
    }
    switch (type) {
      case 'accepted':
      case 'rejected':
      case 'hold':
        const interviewData = await updateInterViewStaus(type)
        setSelectedInterview(interviewData);
        break;
      default:
        console.log('invalid type')

    }
  }
  return (
    <div className="ml-auto flex space-x-4">
      {/* Conditionally render buttons based on the status */}
      {selectedInterview?.status === InterviewStatus.ACCEPTED && (
        <>
          <Button className="px-6 py-3" disabled>
            Accepted
          </Button>
        </>
      )}
      {selectedInterview?.status === InterviewStatus.REJECTED && (
        <>
          <Button className="px-6 py-3" disabled>
            Rejected
          </Button>
        </>
      )}
      {selectedInterview?.status === InterviewStatus.HOLD && (
        <>
          <Button className="px-6 py-3" disabled>
            On Hold
          </Button>
        </>
      )}
      {selectedInterview?.status === InterviewStatus.ENDED && (
        <>
      {selectedInterview?.status !== InterviewStatus.ACCEPTED && <Button className="px-6 py-3 bg-green-600" onClick={() => changeInterviewStatus(InterviewStatus.ACCEPTED)} type='button'>Accept</Button>}
      {selectedInterview?.status !== InterviewStatus.REJECTED && <Button className="px-6 py-3 bg-red-500" onClick={() => changeInterviewStatus(InterviewStatus.REJECTED)} type='button'>Reject</Button>}
      {selectedInterview?.status !== InterviewStatus.HOLD && <Button className="px-6 py-3 bg-yellow-600" onClick={() => changeInterviewStatus(InterviewStatus.HOLD)} type='button'>Hold</Button>}
        </>
      )}
      <div>

      </div>
      <ScheduleDrive selectedCandidate={selectedCandidate} scheduleInterview={true}>
        <Button className="px-6 py-3">Schedule</Button>
      </ScheduleDrive>
      {hasScheduledInterview && (
        <ScheduleDrive value={true} selectedCandidate={selectedCandidate} scheduleInterview={false}>
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