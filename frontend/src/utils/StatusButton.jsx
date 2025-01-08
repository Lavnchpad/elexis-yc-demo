import React from "react";
import { Button } from "@/components/ui/button"; // Assuming Button is a pre-built component
import ScheduleDrive from "@/components/component/drive/ScheduleDrive";

const StatusButton = ({ status }) => {
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
    </div>
  );
};

export default StatusButton;