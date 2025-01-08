"use client";

import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../ui/button";
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
import { Textarea } from "../../ui/textarea";
import axios from "axios";
import { JobsContext } from "./JobsContext";
import { Loader } from "lucide-react";
import { toast } from "sonner";

const jobSchema = z.object({
  title: z.string().min(1, { message: "Job title is required" }),
  description: z.string().min(1, { message: "Job description is required" }),
});

const ManageJobs = ({ children }) => {
  const { jobs, setJobs } = useContext(JobsContext);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(false);
   const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/jobs/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);

    try {
      const token = localStorage.getItem("authToken");
      if (selectedJob) {
        if (data.title.trim() === "" || data.description.trim() === "") {
          setSelectedJob(null);
          return; // Don't update if fields are cleared
        }
        const response = await axios.put(
          `${import.meta.env.VITE_API_BASE_URL}/jobs/${selectedJob.id}/`,
          formData,
          {
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
          }
        );
        setJobs((prevJobs) =>
          prevJobs.map((job) =>
            job.id === selectedJob.id
              ? { ...job, title: response.data.title, description: response.data.description }
              : job
          )
        );        
        setSelectedJob(null);
        toast.success("Job updated successfully!");
      } else {
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/jobs/`, formData, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
        });
        setJobs((prevJobs) => [...prevJobs, response.data]);
        toast.success("New job created successfully!");
      }
      form.reset();
      setOpen(false);
    } catch (error) {
      console.error("Error handling job submission:", error);
      toast.error("An error occurred. Please try again!");
    }finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[900px]">
          <DialogHeader>
            <DialogTitle>Manage Job</DialogTitle>
            <DialogDescription>Fill in the job details below. Click save when you're done.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 grid-cols-1 sm:grid-cols-2">
            <div className="space-y-2">
              <h3 className="font-medium text-lg">Existing Jobs</h3>
              <ul>
                {jobs.map((job) => (
                  <li
                    key={job.id}
                    className="p-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      setSelectedJob(job);
                      form.setValue("title", job.title);
                      form.setValue("description", job.description);
                    }}
                  >
                    {job.title}
                  </li>
                ))}
              </ul>
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter job title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter job description" {...field} rows={3} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit" disabled={loading}>
              {loading ? <Loader className="animate-spin mr-2" size={16} /> : "Save Job Details"}
            </Button>
                </DialogFooter>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageJobs;
