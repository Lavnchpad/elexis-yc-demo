import React, { useContext, useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BadgeCheck,
  X,
  Clock,
  FileSearch,
  Mail,
  Download,
  Phone,
  Copy,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ScheduleDrive from "@/components/component/drive/ScheduleDrive";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import StatusButton, { InterviewStatus } from "@/utils/StatusButton";
import Filter from "@/components/component/Filter";
import { InterviewContext } from "@/components/component/interview/InterviewContext";
import {
  JobsContext,
  JobsProvider,
} from "@/components/component/jobs/JobsContext";
import { CandidatesContext } from "@/components/component/candidate/CandidatesContext";
import CandidateLoader from "@/components/component/Loader/CandidateLoader";
import Proctoring from "@/components/component/tabs/Proctoring";
import Transcript from "@/components/component/tabs/Transcript";
import Summary from "@/components/component/tabs/Summary";
import StudentDetailsSkeleton from "@/components/component/Loader/StudentDetailsLoader";
import Experience from "@/components/component/candidate/skills-experience/Experience";
import Skills from "@/components/component/candidate/skills-experience/Skills";
import AddCandidate from "@/components/component/candidate/AddCandidate";
import ErrorBoundary from "@/utils/ErrorBoundary";
const StudentDetails = ({ }) => {
  const [activeTab, setActiveTab] = useState("summary");
  const [loading, setLoading] = useState(true);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const { candidates, loading: candidatesLoading } =
    useContext(CandidatesContext);
  const { jobs, fetchJobs } = useContext(JobsContext);
  const { interviewData, fetchInterviewDetails } = useContext(InterviewContext);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [candidatesWithStatus, setCandidatesWithStatus] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedJobId, setSelectedJobId] = useState(null);
  // const location = useLocation();
  const navigate = useNavigate();
  const statusPriority = {
    accepted: 1,
    pending: 2,
    review: 3,
    rejected: 4,
    registered: 5,
  };

  const handleDownloadResume = () => {
    if (selectedCandidate?.resume) {
      const link = document.createElement("a");
      link.href = selectedCandidate.resume;
      link.download = "resume.pdf";
      link.click();
    }
  };

  useEffect(() => {
    if (selectedCandidate) {
      fetchJobs();
      fetchInterviewDetails(selectedCandidate.id);
      setLoading(true);
      setTimeout(() => setLoading(false), 1000);
    }
  }, [selectedCandidate]);

  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem("jobState"));

    if (savedState) {
      setSelectedJobId(savedState.jobId);
      setSelectedStatus(savedState.status);
    } else {
      // Reset if no state in localStorage
      setSelectedJobId(null);
      setSelectedStatus("all");
      localStorage.removeItem("jobState");
    }
  }, []);

  useEffect(() => {
    if (selectedJobId && interviewData.length > 0) {
      const interview = interviewData.find(i => i.job.id === selectedJobId);
      setSelectedInterview(interview);
    }
    else {
      // Reset selected interview when no jobId or on refresh
      setSelectedInterview(null);
    }
  }, [selectedJobId, interviewData]);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/interviews/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            "Content-Type": "application/json",
          }
        );
        const interviews = await response.json();
        const updatedCandidates = candidates.map((candidate) => {
          const candidateInterviews = interviews.filter(
            (interview) => interview.candidate.id === candidate.id
          );
          let status = "No interviews";
          if (candidateInterviews.length > 0) {
            status = candidateInterviews
              .map((i) => i.status)
              .sort((a, b) => statusPriority[a] - statusPriority[b])[0];
          }
          return {
            ...candidate,
            interviews: candidateInterviews,
            status,
          };
        });
        setCandidatesWithStatus(updatedCandidates);
      } catch (error) {
        console.error("Error fetching interviews:", error);
      }
    };

    if (candidates.length > 0) fetchInterviews();
  }, [candidates]);

  useEffect(() => {
    let filtered = candidatesWithStatus;

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        candidate =>
          candidate.name.toLowerCase().includes(searchLower) ||
          candidate.email.toLowerCase().includes(searchLower)
      );
    }

    if (selectedStatus !== "all") {
      filtered = filtered.filter(candidate =>
        candidate.interviews.some(interview =>
          interview.status === selectedStatus &&
          (!selectedJobId || interview.job.id === selectedJobId)
        )
      );
    }

    setFilteredCandidates(filtered);
  }, [searchTerm, selectedStatus, candidatesWithStatus, selectedJobId])

  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue);
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
  };

  const handleCandidateClick = (candidate) => {
    setSelectedCandidate(candidate);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Student Databases</h1>
        <JobsProvider>
          <AddCandidate>
            <Button>Add Candidate</Button>
          </AddCandidate>
        </JobsProvider>
      </div>
      <div className="flex">
        <div className="w-1/4 p-4 bg-gray-100">
          <Filter onSearch={handleSearch} onStatusChange={handleStatusChange} />
          <ScrollArea className="mt-4 h-[520px] overflow-y-auto">
            <ul className="space-y-2 cursor-pointer">
              {candidatesLoading ? (
                <CandidateLoader />
              ) : filteredCandidates && filteredCandidates.length > 0 ? (
                filteredCandidates.map((contact) => (
                  <li
                    key={contact.id}
                    className={`flex items-center p-4 rounded-lg shadow-sm hover:scale-105 transition-transform duration-300 ease-in-out ${contact.status === "accepted"
                        ? "bg-[#E5F2E6]"
                        : contact.status === "rejected"
                        ? "bg-[#FFE5E5]"
                        : contact.status === "pending"
                          ? "bg-[#FFFFE5]"
                          : "bg-[#E5E5FF]"
                      }`}
                    onClick={() => handleCandidateClick(contact)}
                  >
                    <div className="relative w-12 h-12 mr-4">
                      <Avatar className="w-full h-full">
                        <AvatarImage src={contact.profile_photo} alt={contact.name} />
                        <AvatarFallback>
                          {contact.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      {contact.status === "accepted" && (
                        <BadgeCheck className="absolute -bottom-1 -right-1 text-green-500 w-5 h-5 bg-white rounded-full" />
                      )}
                      {contact.status === "rejected" && (
                        <X className="absolute -bottom-1 -right-1 text-white w-5 h-5 bg-[#FF0000] rounded-full" />
                      )}
                      {contact.status === "pending" && (
                        <Clock className="absolute -bottom-1 -right-1 text-yellow-500 w-5 h-5 bg-white rounded-full" />
                      )}
                      {contact.status === "review" && (
                        <FileSearch className="absolute -bottom-1 -right-1 text-blue-500 w-5 h-5 bg-white rounded-full" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800 text-sm">
                        {contact.name}
                      </h3>
                      <p className="text-xs text-gray-500 truncate">
                        {contact.email}
                      </p>
                    </div>
                  </li>
                ))
              ) : (
                <p className="text-gray-500 text-center">
                  No candidates found.
                </p>
              )}
            </ul>
          </ScrollArea>
        </div>
        <div className="w-3/4 p-6">
          {!selectedCandidate ? (
            <div>Please select a candidate to view details.</div>
          ) : loading ? (
            <StudentDetailsSkeleton />
          ) : (
            <div>
              <div className="bg-white p-6 rounded shadow mb-6 flex items-center">
                <div className="flex items-center space-x-6">
                  <Avatar className="w-40 h-40 rounded-full">
                    <AvatarImage
                      src={selectedCandidate.profile_photo}
                      alt={selectedCandidate.name}
                    />
                    <AvatarFallback>
                      {selectedCandidate.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="text-2xl font-bold">
                      {selectedCandidate.name}
                    </h1>
                    <p className="text-muted-foreground flex items-center mt-2">
                      <Mail className="mr-2 w-5 h-5" />
                      {selectedCandidate.email}
                    </p>
                    <p className="text-muted-foreground flex items-center mt-2">
                      <Phone className="mr-2 w-5 h-5" />
                      {selectedCandidate.phone_number}
                    </p>
                        {selectedInterview?.link && selectedInterview?.status !== InterviewStatus.ENDED &&
                          <p className="mt-2 flex items-center text-muted-foreground">
                            <Copy className="mr-2 w-5 h-5 cursor-pointer" onClick={() => navigator.clipboard.writeText(selectedInterview?.link)} />
                            Interview Link
                          </p>
                        }
                  </div>
                </div>
                <div className="ml-auto flex flex-col gap-2 w-1/4">
                  <Select
                        //  disabled={!!selectedJobId}

                    onValueChange={(value) => {
                      const interview = interviewData.find(
                        (interview) => interview.job.id === value
                      );
                      setSelectedInterview(interview);
                    }}
                    value={selectedInterview?.job.id || ""}
                  >
                    <SelectTrigger>
                          <SelectValue placeholder="Select a job role">
                            {selectedInterview ?
                              `${selectedInterview.job.job_name}${selectedJobId ? " (Preselected)" : ""}` :
                              "Select a job role"
                            }
                          </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {interviewData.length > 0
                          ? interviewData.map((interview) => (
                            <SelectItem
                              key={interview.job.id}
                              value={interview.job.id}
                            >
                              {interview.job.job_name}
                              {selectedJobId === interview.job.id}
                            </SelectItem>
                          ))
                          : "No Job Available"}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                    <div className="flex gap-2">
                  <a href={`mailto:${selectedCandidate.email}`}>
                    <Button variant="outline" className="gap-2">
                      <Mail className="w-4 h-4" />
                      Send Email
                    </Button>
                  </a>
                  <Button
                    variant="outline"
                    className="gap-2"
                    onClick={handleDownloadResume}
                  >
                    <Download className="w-4 h-4" />
                    Download Resume
                  </Button>
                </div>
              </div>
              <div className="grid gap-6 md:grid-cols-[300px_1fr]">
                    <Experience experience={selectedInterview?.experience} />
                    <Skills skills={selectedInterview?.skills} />
              </div>
              <div className="w-full px-6 py-4 bg-muted/30">
                <div className="flex items-center justify-between">
                  <Tabs defaultValue="summary" className="w-full">
                    <div className="flex items-center justify-between mb-4">
                      <TabsList className="bg-background">
                        <TabsTrigger
                          value="summary"
                          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                        >
                          Summary
                        </TabsTrigger>
                        <TabsTrigger
                          value="transcript"
                          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                        >
                          Transcript
                        </TabsTrigger>
                        <TabsTrigger
                          value="proctoring"
                          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                        >
                          Proctoring
                        </TabsTrigger>
                      </TabsList>
                      <div className="ml-auto flex space-x-4">
                        <StatusButton
                          interviewData={interviewData}
                          selectedCandidate={selectedCandidate}
                              selectedInterview={selectedInterview}
                        />
                      </div>
                    </div>
                    <TabsContent value="summary">
                      <div className="p-4 bg-background rounded-lg">
                        {(selectedInterview?.summary) ? (
                          <ErrorBoundary>
                            <Summary
                              interview_summary={selectedInterview.summary}
                            />
                          </ErrorBoundary>
                        ) : (
                          <p>No summary available for this job.</p>
                        )}
                      </div>
                    </TabsContent>
                    <TabsContent value="transcript">
                      <div className="p-4 bg-background rounded-lg">
                        {selectedInterview?.transcript ? (
                              <ErrorBoundary >
                                <Transcript
                                  interview_transcript_url={selectedInterview.transcript}
                                />
                          </ErrorBoundary>
                        ) : (
                          <p>No transcript available for this job.</p>
                        )}
                      </div>
                    </TabsContent>
                    <TabsContent value="proctoring">
                      <div className="p-4 bg-background rounded-lg">
                        <h2 className="text-lg font-semibold mb-2">
                          Video Recording
                        </h2>
                        <ErrorBoundary >
                              <Proctoring details={selectedInterview?.snapshots?.[0]} />
                        </ErrorBoundary>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default StudentDetails;
