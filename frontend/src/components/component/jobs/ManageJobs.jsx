import React, { useState } from "react";
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
import { Loader } from "lucide-react";

// Validation schema
const jobSchema = z.object({
  job_name: z.string().min(1, { message: "Job name is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  min_ctc: z.string().min(1, { message: "Min CTC is required" }),
  max_ctc: z.string().min(1, { message: "Max CTC is required" }),
  job_description: z.string().min(1, { message: "Description is required" }),
  additional_data: z.string().optional(),
});

const ManageJobs = ({ onJobCreated, children }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      job_name: "",
      location: "",
      min_ctc: "",
      max_ctc: "",
      job_description: "",
      additional_data: "",
    },
  });

  // Check permissions from localStorage
  const authUser = JSON.parse(localStorage.getItem("user"));
  const canManageJobs = authUser?.can_manage_jobs || authUser?.is_admin;
  console.log(canManageJobs)

  const onSubmit = async (data) => {
    if (!canManageJobs) {
      alert("You do not have permission to manage jobs.");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("authToken");

      const formData = new FormData();
      formData.append("job_name", data.job_name);
      formData.append("location", data.location);
      formData.append("min_ctc", data.min_ctc);
      formData.append("max_ctc", data.max_ctc);
      formData.append("job_description", data.job_description);
      if (data.additional_data) {
        formData.append("additional_data", data.additional_data);
      }

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/jobs/`, {
        method: "POST",
        body: formData,
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        if (onJobCreated) {
          onJobCreated();
        }
        console.log("Job created successfully:", await response.json());
        form.reset();
        setOpen(false);
      } else {
        throw new Error("Failed to create job.");
      }
    } catch (error) {
      console.error("Error creating job:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[900px]">
          <DialogHeader>
            <DialogTitle>Create Job</DialogTitle>
            <DialogDescription>
              Fill in the job details below. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          {!canManageJobs ? (
            <div className="text-red-500 text-center">You do not have permission to manage jobs.</div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="job_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter job name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter job location" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="min_ctc"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Min CTC</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter minimum CTC" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="max_ctc"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Max CTC</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter maximum CTC" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="job_description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Description (File)</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Job Description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="additional_data"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Information</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter additional information"
                          {...field}
                          rows={3}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <Loader className="animate-spin mr-2" size={16} />
                    ) : (
                      "Create Job"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageJobs;
