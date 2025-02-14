import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const StartInterview = () => {
  const { interviewId } = useParams();

  useEffect(() => {
    const startInterview = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/interviews/${interviewId}/start/`,
          {
            method: "GET",
          }
        );
        console.log(response);

        if (response.ok) {
          // Redirect to the URL provided by the backend
          const redirectLink = await response.text(); // Assuming backend sends a plain text URL
          window.location.href = redirectLink;
        } else {
          const errorData = await response.json();
          toast.error(errorData.message || "Failed to start the interview.");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("An error occurred. Please try again later.");
      }
    };

    startInterview();
  }, [interviewId]);

  return (
    <div>
      <p>This link is not valid at this time. Please check your scheduled interview time.</p>
    </div>
  );
};

export default StartInterview;
