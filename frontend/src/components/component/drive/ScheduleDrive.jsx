import React, { useContext, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "../../ui/select";
import { Button } from "../../ui/button";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { JobsContext } from "../jobs/JobsContext";
import { useOutletContext } from "react-router-dom";
import { toast } from "sonner";
import { InterviewContext } from "../interview/InterviewContext";
import { InterviewStatus } from "@/utils/StatusButton";

const scheduleSchema = z
  .object({
    date: z.string().min(1, "Date is required"),
    time: z.string().min(1, "Time is required"),
    jobId: z.string().optional(),
    interview: z.string().optional(),
  })
  .refine(
    (data) => data.jobId || data.interview,
    {
      message: "Either jobId or interview is required",
      path: ["jobId"], // You can also point to 'interview' or use both
    }
  );
// scheduleInterview : true/ false , This component is used for scheduling and rescheduling as well , so handled with this prop
const ScheduleDrive = ({ children, value, selectedCandidate, scheduleInterview = true }) => {
  const [loading, setLoading] = useState(false);
  const { jobs, fetchJobs } = useContext(JobsContext);
  const { interviewData, fetchInterviewDetails, setSelectedJob } = useContext(InterviewContext);
  const [interviewId, setInterviewId] = useState()
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(scheduleSchema),
    defaultValues: {
      date: "",
      time: "",
      interview: "",
      jobId: ""
    },
  });
  form.watch('interview')


  const onSubmit = async (data) => {
    setLoading(true);

    const payload = {
      date: data.date,
      time: data.time,
      ...(scheduleInterview ? { job_id: data.jobId } : null),
      ...(scheduleInterview ? { candidate_id: selectedCandidate.id } : null),
    };
    console.log({ payload });

    try {
      const token = localStorage.getItem("authToken");
      let response;


      if (interviewData && value) {
        // Reschedule: Update existing interview
        response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/interviews/${interviewId}/`, {
          method: "PATCH",
          body: JSON.stringify(payload),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      } else {
        // Schedule Interview
        response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/interviews/`, {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      }

      if (response.ok) {
        toast.success("Schedule saved successfully!");
        fetchInterviewDetails(selectedCandidate.id);
        form.reset();
      } else {
        const errorData = await response.json();
        toast.error(errorData.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.errorData(error);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{interviewData && value ? "Reschedule Drive" : "Schedule Drive"}</DialogTitle>
            <DialogDescription>
              {interviewData && value
                ? "Please provide the new date and time for the interview below."
                : "Please provide the date, time, and job role for the drive."}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Input Fields in a Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Date Field */}
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Input type="date" placeholder="Select a date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Time Field */}
                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a time" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                              <SelectItem key={hour} value={`${hour.toString().padStart(2, "0")}:00`}>
                                {`${hour.toString().padStart(2, "0")}:00`}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Job Role Field */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Schedule Interview */}
                {scheduleInterview ? <FormField
                  control={form.control}
                  name="jobId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Role</FormLabel>
                      <FormControl>
                        <Select onValueChange={(value) => {
                          field.onChange(value);  // Update the selected job id
                          const selectedInterview = interviewData.find((interview) => interview.job.id === value);
                          if (selectedInterview) {
                            setInterviewId(selectedInterview.id);  // Store the interviewId in the state
                            form.setValue("date", selectedInterview.date);
                            form.setValue("time", selectedInterview.time);
                          }
                        }} value={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder={jobs?.length || interviewData?.job?.length ? "Select a job role" : "No jobs found"} />
                          </SelectTrigger>
                          <SelectContent>
                            {interviewData && value ? (
                              interviewData.map((interview) => (
                                <SelectItem key={interview.id} value={interview.job.id}>
                                  {interview.job.job_name}
                                </SelectItem>
                              ))

                            ) :
                              (
                                jobs.data?.map((job) => (
                                <SelectItem key={job.id} value={job.id}>
                                  {job.job_name}
                                </SelectItem>
                              ))
                            )}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                  :
                  // Reschedule Interview
                  <FormField
                    control={form.control}
                    name="interview"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Role</FormLabel>
                        <FormControl>
                          <Select onValueChange={(value) => {
                            field.onChange(value);  // Update the selected job id
                            const selectedInterview = interviewData.find((interview) => interview.id === value);
                            if (selectedInterview) {
                              setInterviewId(selectedInterview.id);  // Store the interviewId in the state
                              form.setValue("date", selectedInterview.date);
                              form.setValue("time", selectedInterview.time);
                            }
                          }} value={field.value}>
                            <SelectTrigger>
                              <SelectValue placeholder={jobs?.length || interviewData?.job?.length ? "Select a job role" : "No jobs found"} />
                            </SelectTrigger>
                            <SelectContent>
                              {interviewData && value ? (
                                interviewData.filter(interview => ![InterviewStatus.ACCEPTED, InterviewStatus.ENDED, InterviewStatus.REJECTED, InterviewStatus.HOLD].includes(interview.status)).map((interview) => (
                                  <SelectItem key={interview.id} value={interview.id}>
                                    {interview.job.job_name}
                                  </SelectItem>
                                ))

                              ) : (
                                jobs.map((job) => (
                                  <SelectItem key={job.id} value={job.id}>
                                    {job.job_name}
                                  </SelectItem>
                                ))
                              )}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                }
                <FormField
                  control={form.control}
                  name="additionalField"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Field</FormLabel>
                      <FormControl>
                        <Input placeholder="Additional Field" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Save Schedule Button */}
              <DialogFooter>
                <Button type="submit" disabled={loading}>
                  {loading ? <Loader className="animate-spin mr-2" size={16} /> : interviewData && value ? "Reschedule" : "Save Schedule"}
                </Button>
              </DialogFooter>
            </form>
          </Form>

        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ScheduleDrive;
