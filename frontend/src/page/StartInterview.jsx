import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const StartInterview = () => {
  const { interviewId } = useParams();
  const [message, setMessage] = useState("");
  const startInterview = async function startInterview() {
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
        const jsonifiedResponse = await response.json(); // Assuming backend sends a plain text URL

        if(jsonifiedResponse?.isEarly) {
          jsonifiedResponse?.message && toast.error(jsonifiedResponse.message) && setMessage(jsonifiedResponse.message);
        }else if(jsonifiedResponse && jsonifiedResponse.url) {
          window.location.href = jsonifiedResponse.url;
          return;
        }else {
          jsonifiedResponse.message && toast.error(jsonifiedResponse.message) && setMessage(jsonifiedResponse.message);
        }
      } else {
        const errorData = await response.json();
        const errorMessage = errorData?.message || "An error occurred. Please try again later.";
        toast.error(errorMessage) && setMessage(errorMessage);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again later.");
    }
  }
  useEffect(() => {
    if(interviewId) {
      startInterview();
    }
  },[interviewId]);
  if(message === "") {
    return (
      <div className="w-full h-screen">
        <div className="flex h-full justify-center items-center">
          <Loader className="animate-spin mr-2" size={32} /> Preparing Interview<br/>
        </div>
      </div>
    )
  }
  return (
    <div className="p-4 space-y-4">
      <p>{message}</p>
    </div>
  );
};

export default StartInterview;
