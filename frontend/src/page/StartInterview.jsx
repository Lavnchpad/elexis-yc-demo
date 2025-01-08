import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const StartInterview = () => {
  const { interviewId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const startInterview = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/interviews/${interviewId}/start/`, {
          method: "GET",
        });

        if (response.ok) {
          // Let the backend handle the redirection
          console.log(response.url) 
        } else {
          const errorData = await response.json();
          alert(errorData.message || "Failed to start the interview.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
      }
    };

    startInterview();
  }, [interviewId, navigate]);

  return (
    <div>
      <p>Starting your interview... Please wait.</p>
    </div>
  );
};

export default StartInterview;
