import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../../../utils/api";
import { CircleArrowLeft, Edit, Plus } from "lucide-react";
import { JobsEvaluationTable } from "@/page/components/JobsEvaluationTable";
import ErrorBoundary from "@/utils/ErrorBoundary";
import Tooltip from "@/page/components/ToolTipCustom";
import EditJobForm from "./EditJobForm";
import ScheduledInterviews from "./ScheduledInterview";
import CollapsibleSection from "../../resuable/CollapsibleSection";
import Ats from "./ATS/Ats";
import AddCandidate from "../../candidate/AddCandidate";
import { Button } from "@/components/ui/button";
import SuggestedCandidates from "./SuggestedCandidates";

const JobDetails = () => {
  const navigate = useNavigate();
  // This candidateAdded state is used to trigger a re-render when a candidate is added
  const [candidateAdded, setCandidateAdded] = useState(false);
  const { jobId } = useParams();
  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigateBack = () => {
    navigate(-1);
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
  const createdDate = jobData.created_date?.split('T')?.[0] || 'N/A';
  const requirements = jobData.requirements?.map(req => req.requirement)?.join(', ') || 'N/A';

  return (
    <>
      <div className="relative">
        <div
          className="flex items-center cursor-pointer hover:bg-primaryButtonColor/90 justify-center absolute -top-2 -left-4 w-10 h-10 rounded-full bg-white p-2"
          onClick={navigateBack}
        >
          {/* <img src={""} alt="Back" className="w-5 h-5 text-lightColor" /> */}
          <CircleArrowLeft alt="Back" className="w-5 h-5 text-lightColor" />
        </div>
        <div className="shadow-lg rounded-lg px-6 py-6 border bg-black text-white">
          <div className="">
            <div className="flex gap-2 align-center items-center justify-between">
              <div className="flex gap-2 items-center">
              <h1 className="text-2xl font-semibold">{jobData.job_name}</h1>
              <EditJobForm jobDetails={jobData} setJobDetails={setJobData}>
                  <Tooltip message={"Edit Job"} className={"inline-block w-16"}>
                  <Edit className="inline-block cursor-pointer" />
                </Tooltip>
              </EditJobForm>
              </div>
              <p className="flex-end">Created on {createdDate} by {jobData.recruiter.name}</p>
            </div>
            <p>{jobData.location}</p>
          </div>
        </div>
      </div>
      <div className="mt-6 drive-details">
        <Tabs defaultValue="job-details">
          <div className="flex items-center justify-between">
            <TabsList >
            <TabsTrigger
              className="py-2 px-6 text-base bg-accentColor text-lightColor rounded-none rounded-tl-xl"
              value="job-details"
              >
              Job Details

              </TabsTrigger>
              <TabsTrigger
                className="py-2 px-6 text-base bg-accentColor text-lightColor rounded-none rounded-tl-xl"
                value="job-questions"
              >
                Questions
              </TabsTrigger>
              <TabsTrigger
                className="py-2 px-6 text-base bg-accentColor text-lightColor rounded-none rounded-tl-xl"
                value="job-interviews"
              >
                Interviews
              </TabsTrigger>
              <TabsTrigger
                className="py-2 px-6 text-base bg-accentColor text-lightColor rounded-none rounded-tl-xl"
                value="ATS"
              >
                Applications
              </TabsTrigger>
              <TabsTrigger
                className="py-2 px-6 text-base bg-accentColor text-lightColor rounded-none rounded-tl-xl"
                value="candidate-evaluation"
              >
                Candidate Evaluation
              </TabsTrigger>
              <TabsTrigger
                className="py-2 px-6 text-base bg-accentColor text-lightColor rounded-none rounded-tl-xl"
                value="suggested-candidates"
              >
                Suggested Candidates
              </TabsTrigger>

          </TabsList>
            <AddCandidate jobData={jobData} onCloseCb={() => setCandidateAdded(prev => !prev)}>
              <Button variant='' className='bg-red-700 shadow-2xl rounded-full m-1'><Plus /> Add Candidate </Button>
            </AddCandidate>
          </div>
          <TabsContent className="mt-0" value="job-details">
            <div className="border shadow-xl px-8 py-8 rounded-3xl rounded-tl-none">
              <div className="grid grid-cols-8 gap-x-8 space-y-4">
                <div className="shadow-lg col-span-8 px-4 py-4 flex flex-col gap-y-4 rounded-md border">
                  <CollapsibleSection title={"Key Information"} defaultShow={true}>
                    <div className=" text-muted-foreground">
                      {/* TODO : Job details */}
                      <p>
                        <span className="font-semibold ">CTC Range:</span> {jobData.max_ctc} - {jobData.min_ctc}
                      </p>
                      <p>
                        <span className="font-semibold ">Key Skills:</span> {requirements}
                      </p>
                      <p>

                      </p>
                    </div>
                  </CollapsibleSection>
                </div>
                <div className="shadow-lg col-span-8 px-4 py-4 flex flex-col gap-y-4 rounded-md border">
                  <CollapsibleSection title={"Job Description"} defaultShow={true}>
                    <p className="">
                      {jobData.job_description}
                    </p>
                  </CollapsibleSection>
                </div>

              </div>
            </div>
          </TabsContent>
          <TabsContent className="mt-0" value="ATS">
            <div className="border shadow-xl px-8 py-8 rounded-3xl rounded-tl-none">
              <Ats jobData={jobData} key={candidateAdded} />
            </div>
          </TabsContent>
          <TabsContent className="mt-0" value="candidate-evaluation">
            <div className="border shadow-xl px-8 py-8 rounded-3xl rounded-tl-none">
              <ErrorBoundary>
                <JobsEvaluationTable id={jobId} defaultShow={true} />
              </ErrorBoundary>
            </div>
          </TabsContent>
          <TabsContent className="mt-0" value="job-interviews">
            <div className="border shadow-xl px-8 py-8 rounded-3xl rounded-tl-none">
              <ErrorBoundary>
                <ScheduledInterviews id={jobId} defaultShow={true} />
              </ErrorBoundary>
            </div>
          </TabsContent>
          <TabsContent className="mt-0" value="suggested-candidates">
            <div className="border shadow-xl px-8 py-8 rounded-3xl rounded-tl-none">
              <ErrorBoundary>
                <SuggestedCandidates defaultShow={true}
                  job={jobData}
                />
              </ErrorBoundary>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default JobDetails;
