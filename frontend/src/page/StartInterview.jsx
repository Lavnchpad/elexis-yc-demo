import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const getInterviewInformation = async (interviewId) => {
  try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/interviews/${interviewId}/info/`,
        {
          method: "GET",
        }
      );
      if (response.ok) {
        return await response.json()
      }
  } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred fetching interview information.");
    }
  }

const StartInterview = () => {
  const { interviewId } = useParams();
  const [message, setMessage] = useState("");
  const [interviewLink, setInterviewLink] = useState("");
  const [data, setData] = useState(null);
  
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
          setInterviewLink(jsonifiedResponse.url);
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
  // useEffect(() => {
  //   if(interviewId) {
  //     startInterview();
  //   }
  // },[interviewId]);

  useEffect(() => {
    getInterviewInformation(interviewId)
      .then((data) => {
        setData(data);
      })
  }, []);
  if(data !== null) {
    if(data.requiresCtcInfo || data.requiresReasonForLeavingJob || data.requiresLanguageInfo) {
      return(<div className="p-4 space-y-4">
        <form className="space-y-4 max-w-md mx-auto">
          {data?.requiresCtcInfo && (
            <div>
              <label htmlFor="currentCtc" className="block mb-2">Current CTC:</label>
              <div className="flex space-x-2 vertical-center">
                <input type="text" id="currentCtc" name="currentCtc" className="border p-2 w-full" />
                <div className="flex vertical-center items-center">L.P.A</div> 
              </div>
            </div>
          )}
          {data?.requiresCtcInfo && (
            <div>
              <label htmlFor="expectedCtc" className="block mb-2">Expected CTC:</label>
              <div className="flex space-x-2 vertical-center">
                <input type="text" id="expectedCtc" name="expectedCtc" className="border p-2 w-full" />
                <div className="flex vertical-center items-center">L.P.A</div> 
              </div>
            </div>
          )}
          {data?.requiresReasonForLeavingJob && (
            <div>
              <label htmlFor="reasonForLeavingJob" className="block mb-2">Reason for leaving previous job:</label>
              <input type="text" id="reasonForLeavingJob" name="reasonForLeavingJob" className="border p-2 w-full" />
            </div>
          )}
          {data?.requiresLanguageInfo && (
            <div className="flex space-x-2 vertical-center mb-2">
              <label htmlFor="language" className="flex space-x-2 vertical-center">Language:</label>
              <select name="language" id="language" className="border w-full">
                <option value="english">English</option>
                <option value="hindi">Hindi</option>
              </select>
            </div>
          )}
          <Button onClick={startInterview} className="w-full">Start Interview</Button>
        </form>
      </div>)
    }
  }
  
  if(message === "") {
    return (
      <div className="w-full h-screen">
        <div className="flex h-full justify-center items-center">
          {
            data ?
              <Button asChild variant="link">
                <a href={interviewLink} className="">Click to Start Interview</a>
              </Button>
              :
              <>
                <Loader className="animate-spin mr-2" size={32} /> Preparing Interview
              </>
          }
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
