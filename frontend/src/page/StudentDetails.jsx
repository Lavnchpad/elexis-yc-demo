import React, { useContext, useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BadgeCheck,
  X,
  Clock,
  FileSearch,
  Mail,
  Phone,
  Copy,
  Calendar,
  SatelliteDishIcon,
  View,
  LoaderCircle,
} from "lucide-react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import ScheduleDrive from "@/components/component/drive/ScheduleDrive";
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
// import { toast } from "sonner";
import { copyLink, isInterviewEnded } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InterviewQsns from "./components/InterviewQsns";
const StudentDetails = ({ }) => {
  const { id: candidateidInUrl } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { candidates, loading: candidatesLoading } =
    useContext(CandidatesContext);
  const [filteredCandidates, setFilteredCandidates] = useState(() => (candidates || []));
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const { interviewData, fetchInterviewDetails, interviewDataLoading } = useContext(InterviewContext);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedJobId, setSelectedJobId] = useState(null);

  const selectedInterviewIdFromSearchParam = searchParams.get("interview_id");
  const navigate = useNavigate();

  const handleDownloadResume = () => {
    if (selectedCandidate?.resume) {
      window.open(selectedCandidate.resume, "_blank");
    }
  };



  useEffect(() => {
    // Check if candidateidInUrl is present
    if (candidateidInUrl && filteredCandidates.length > 0) {
      // Find the candidate with the matching ID
      const candidate = filteredCandidates.find(candidate => candidate.id === (candidateidInUrl));
      if (candidate) {
        setSelectedCandidate(candidate);
        fetchInterviewDetails(candidate.id)
      } else {
        // If no candidate found, reset selectedCandidate
        setSelectedCandidate(null);
      }
    } else {
      // If no candidateidInUrl, reset selectedCandidate
      setSelectedCandidate(null);
    }
  }, [candidateidInUrl, filteredCandidates]);

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
    if (selectedInterviewIdFromSearchParam && interviewData.length > 0) {
      const interview = interviewData.find(i => i.id === selectedInterviewIdFromSearchParam);
      if (interview) {
        setSelectedInterview(interview);
        setSelectedJobId(interview.job.id); // Set jobId from the interview
      } else {
        setSelectedInterview(null);
      }
    }
    else if (selectedJobId && interviewData.length > 0) {
      const interview = interviewData.find(i => i.job.id === selectedJobId);
      setSelectedInterview(interview);
    } else {
      // Reset selected interview when no jobId or on refresh
      setSelectedInterview(null);
    }
  }, [selectedJobId, interviewData, selectedInterviewIdFromSearchParam]);

  useEffect(() => {
    let filtered = candidates;
    if (selectedStatus !== 'all' && selectedStatus) {
      filtered = filtered.filter(candidate => candidate.status === selectedStatus);
    }

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        candidate =>
          candidate.name.toLowerCase().includes(searchLower) ||
          candidate.email.toLowerCase().includes(searchLower)
      );
    }

    // if (selectedStatus !== "all") {
    // filtered = filtered.filter(candidate =>
    //   candidate.interviews.some(interview =>
    //     interview.status === selectedStatus &&
    //     (!selectedJobId || interview.job.id === selectedJobId)
    //   )
    // );
    // }

    setFilteredCandidates(filtered);
  }, [searchTerm, candidates, selectedStatus])

  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue);
  };

  const handleCandidateClick = (candidate) => {
    // setSelectedCandidate(candidate);
    navigate(`/candidate/${candidate.id}`)
  };

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Candidates</h1>
          <AddCandidate>
            <Button>Add Candidate</Button>
        </AddCandidate>
      </div>
      <div className="flex">
        <div className="w-1/4 p-4 bg-gray-100">
          <Filter onSearch={handleSearch} onStatusChange={(status) => setSelectedStatus(status)} />
          <ScrollArea className="mt-4 h-[520px] overflow-y-auto">
            <ul className="space-y-2 cursor-pointer">
              {candidatesLoading ? (
                <CandidateLoader />
              ) : Array.isArray(filteredCandidates) && filteredCandidates.length > 0 ? (
                filteredCandidates.map((contact) => (
                  <li
                    key={contact.id}
                    className={`flex items-center p-4 rounded-lg shadow-sm hover:scale-105 transition-transform duration-300 ease-in-out ${contact.status === "accepted"
                      ? "bg-[#E5F2E6]"
                      : contact.status === "rejected"
                        ? "bg-[#FFE5E5]"
                        : contact.status === "pending"
                          ? "bg-[#FFFFE5]"
                          : contact.status === "hold"
                            ? "bg-purple-300"
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
                      {contact.status === "registered" && (
                        <FileSearch className="absolute -bottom-1 -right-1 text-blue-500 w-5 h-5 bg-white rounded-full" />
                      )}
                      {contact.status === "hold" && (
                        <LoaderCircle className="absolute -bottom-1 -right-1 text-blue-500 w-5 h-5 bg-white rounded-full" />
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
          ) : (interviewDataLoading) ? (
            <StudentDetailsSkeleton />
          ) : (
            <div>
                  <div className="bg-white p-6 rounded shadow mb-6 flex flex-wrap items-center">
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
                          <>
                            <p className="mt-2 flex items-center text-muted-foreground">
                              <Copy className="mr-2 w-5 h-5 cursor-pointer" onClick={() => copyLink(selectedInterview?.link)} />
                              Interview Link
                            </p>

                          </>
                        }
                        {
                          selectedInterview &&
                          <>
                            <p className="mt-2 flex items-center text-muted-foreground">
                              <Calendar className="mr-2 w-5 h-5" />
                              {selectedInterview?.date} @{selectedInterview?.time}
                            </p>
                            <p className="mt-2 flex items-center text-muted-foreground">
                              <SatelliteDishIcon className="mr-2 w-5 h-5" />
                              {selectedInterview?.status}
                            </p>
                          </>
                        }
                  </div>
                </div>
                    <div className="mx-4 w-40">
                  <Select
                        //  disabled={!!selectedJobId}

                    onValueChange={(value) => {
                      const interview = interviewData.find(
                        (interview) => interview.id === value
                      );
                      setSelectedInterview(interview);
                    }}
                        value={selectedInterview?.id || ""}
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
                              key={interview.id}
                              value={interview.id}
                            >
                              {interview.job.job_name}
                            </SelectItem>
                          ))
                          : "No Job Available"}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                    <div className="flex gap-2">
                      <a href={`mailto:${selectedCandidate?.email}`}>
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
                        <View className="w-4 h-4" />
                        View Resume
                  </Button>
                </div>
                  </div>
                  {selectedInterview && <InterviewQsns viewOnly={isInterviewEnded(selectedInterview?.status)} initialQuestions={selectedInterview?.interview_questions} interviewDetails={selectedInterview} />}
                  {
                    selectedInterview?.current_ctc || selectedInterview?.expected_ctc || selectedInterview?.reason_for_leaving_previous_job ?
                      <div>
                        <Card>
                          <CardHeader>
                            <CardTitle>CTC Details</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="w-full text-muted-foreground">

                              {
                                selectedInterview?.current_ctc &&
                                <div className="">
                                  Current CTC : {selectedInterview?.current_ctc} LPA
                                </div>
                              }
                              {
                                selectedInterview?.expected_ctc &&
                                <div className="">
                                  Expected CTC : {selectedInterview?.expected_ctc} LPA
                                </div>
                              }
                              {
                                selectedInterview?.reason_for_leaving_previous_job &&
                                <div className="">
                                  Reason For Change: {selectedInterview?.reason_for_leaving_previous_job}
                                </div>
                              }
                            </div>
                          </CardContent>

                        </Card>
                      </div>
                      : null
                  }
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
                              setSelectedInterview={setSelectedInterview}
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
                              {selectedInterview?.snapshots?.[0] ? "Video Recording" : "No Data available yet!"}
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

function handleMailToFallback() {
  const email = selectedCandidate?.email;
  const mailtoLink = `mailto:${email}`;

  // Check if mailto link is supported (in case of no email client)
  if (navigator.canShare && navigator.canShare({ url: mailtoLink })) {
    window.location.href = mailtoLink;
  } else {
    alert("Please use a desktop email client or open Gmail directly.");
    // You can also add a direct link to a web-based email service (like Gmail).
  }
};

export default StudentDetails;
