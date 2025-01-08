import React, { useContext, useState } from "react";
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

const scheduleSchema = z.object({
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  jobId: z.string().min(1, "Job role is required"),
});

const ScheduleDrive = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const { jobs } = useContext(JobsContext);
  const { selectedCandidate } = useOutletContext();
   const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(scheduleSchema),
    defaultValues: {
      date: "",
      time: "",
      jobId: "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);

    const payload = {
      date: data.date,
      time: data.time,
      job_id: data.jobId,
      candidate_id: selectedCandidate.id,
    };

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/interviews/`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("Schedule saved successfully!");
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
            <DialogTitle>Schedule Drive</DialogTitle>
            <DialogDescription>
              Please provide the date, time, and job role for the drive below. Click "Save Schedule" to confirm.
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
    <FormField
      control={form.control}
      name="jobId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Job Role</FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue placeholder={jobs.length ? "Select a job role" : "Loading jobs..."} />
              </SelectTrigger>
              <SelectContent>
                {jobs.map((job) => (
                  <SelectItem key={job.id} value={job.id}>
                    {job.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    {/* Save Schedule Button */}
    <DialogFooter>
      <Button type="submit" disabled={loading}>
        {loading ? <Loader className="animate-spin mr-2" size={16} /> : "Save Schedule"}
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
