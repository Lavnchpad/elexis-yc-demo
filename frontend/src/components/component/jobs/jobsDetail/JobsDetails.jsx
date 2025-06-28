import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../../../utils/api";
import { CircleArrowLeft } from "lucide-react";
import { JobsEvaluationTable } from "@/page/components/JobsEvaluationTable";
import ErrorBoundary from "@/utils/ErrorBoundary";
import JobsQuestions from "./JobsQuestions";

const JobDetails = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigateBack = () => {
    navigate(-1);
  };
  const handleNavigation = (jobId, status) => {
    localStorage.setItem("jobState", JSON.stringify({ jobId, status }));
    navigate("/", { state: { jobId, status } });
  };

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `/jobs/${jobId}/`
        );
        setJobData(response.data);
      } catch (error) {
        console.error("Error fetching job details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (jobId) {
      fetchJobDetails();
    }
  }, [jobId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!jobData) {
    return <div>Job details not found.</div>;
  }

  return (
    <>
      <div className="relative">
        <div
          className="flex items-center cursor-pointer hover:bg-primaryButtonColor/90 justify-center absolute -top-2 -left-4 w-10 h-10 rounded-full bg-primaryButtonColor p-2"
          onClick={navigateBack}
        >
          {/* <img src={""} alt="Back" className="w-5 h-5 text-lightColor" /> */}
          <CircleArrowLeft alt="Back" className="w-5 h-5 text-lightColor" />
        </div>
        <div className="shadow-lg rounded-lg px-6 py-6 border">
          <div className="flex flex-col">
            <h1 className="text-2xl font-semibold">{jobData.job_name}</h1>
            <p>{jobData.location}</p>
          </div>
        </div>
      </div>
      <div className="mt-6 drive-details">
        <Tabs defaultValue="job-details">
          <TabsList className="py-4 px-0">
            <TabsTrigger
              className="py-2 px-6 text-base bg-accentColor text-lightColor rounded-none rounded-tl-xl"
              value="job-details"
            >
              Job Details
            </TabsTrigger>
          </TabsList>
          <TabsContent className="mt-0" value="job-details">
            <div className="border shadow-xl px-8 py-8 rounded-3xl rounded-tl-none">
              <div className="grid grid-cols-8 gap-x-8 space-y-4">
                <div className="shadow-lg px-4 col-span-5 py-4 flex flex-col gap-y-4 rounded-md border">
                  <div className="flex flex-col gap-y-2">
                    <h1 className="font-semibold text-primaryButtonColor text-lg">
                      Job Description
                    </h1>
                    <p>{jobData.job_description}</p>
                  </div>
                  <div className="flex flex-col gap-y-2 ">
                    <h1 className="font-semibold text-primaryButtonColor text-lg">
                      Eligibility Criteria
                    </h1>
                    <p>{"1.5 yrs Exp"}</p>
                  </div>
                </div>
                <div className="shadow-lg col-span-3 px-4 py-4 flex flex-col gap-y-4 rounded-md border">
                  <h1 className="font-semibold text-primaryButtonColor text-lg">
                    Key Information
                  </h1>
                  <div className="grid grid-cols-1 gap-y-4 gap-x-2 justify-items-stretch">
                    <div className="flex gap-4 items-center">
                      <p className="text-base font-semibold text-primaryButtonColor">
                        CTC Range
                      </p>
                      <p className="font-medium">
                        {jobData.min_ctc}-{jobData.max_ctc}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="shadow-lg col-span-8 px-4 py-4 flex flex-col gap-y-4 rounded-md border">
                  <ErrorBoundary>
                    <JobsEvaluationTable id={jobId} />
                  </ErrorBoundary>
                </div>
                <div className="shadow-lg col-span-8 px-4 py-4 flex flex-col gap-y-4 rounded-md border">
                  <JobsQuestions
                    job={jobData}
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default JobDetails;
