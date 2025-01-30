import React, { useContext, useEffect } from "react";
import { Button } from "@/components/ui/button"; // Assuming Button is a pre-built component
import ScheduleDrive from "@/components/component/drive/ScheduleDrive";
import { JobsContext } from "@/components/component/jobs/JobsContext";

const StatusButton = ({ interviewData }) => {
  const statusPriority = {
    "accepted": 1,
    "pending": 2,
    "review": 3,
    "rejected": 4,
    "registered": 5,
  };
 const status = interviewData?.map((i) => i.status).sort((a, b) => statusPriority[a] - statusPriority[b])[0]
 console.log(interviewData)
 const hasScheduledInterview = interviewData?.some(
  (interview) => interview.link || interview.time
);
  return (
    <div className="ml-auto flex space-x-4">
      {/* Conditionally render buttons based on the status */}
      {status === "accepted" && (
        <>
          <Button className="px-6 py-3" disabled>
            Accepted
          </Button>
        </>
      )}
      {status === "rejected" && (
        <>
          <Button className="px-6 py-3" disabled>
            Rejected
          </Button>
        </>
      )}
      {status === "scheduled" && (
        <>
          <Button className="px-6 py-3" disabled>
            Scheduled
          </Button>
        </>
      )}
      {status === "hold" && (
        <>
          <Button className="px-6 py-3" disabled>
            On Hold
          </Button>
        </>
      )}
      {status === "registered" && (
        <>
          <Button className="px-6 py-3">Accept</Button>
          <Button className="px-6 py-3">Reject</Button>
          <Button className="px-6 py-3">Hold</Button>
        </>
      )}
      <ScheduleDrive>
            <Button className="px-6 py-3">Schedule</Button>
          </ScheduleDrive>
          {hasScheduledInterview && (
        <ScheduleDrive value={true}>
          <Button className="px-6 py-3">Reschedule</Button>
        </ScheduleDrive>
      )}
    </div>
  );
};

export default StatusButton;