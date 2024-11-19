import React, { useEffect, useContext } from "react";
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
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { useForm } from "react-hook-form";
import { CandidatesContext } from "../candidate/CandidatesContext";
import { JobsContext } from "../jobs/JobsContext";

const AddCandidate = ({ children }) => {
  const { register, handleSubmit, setValue, watch, reset } = useForm();
  const { candidates, setCandidates } = useContext(CandidatesContext);
  const { jobs, fetchJobs } = useContext(JobsContext); // Fetch jobs and jobs state from context


  useEffect(() => {
    fetchJobs();
  }, []);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone_number", data.phone);
    formData.append("applied_for", data.applied_for);
    formData.append("job_id", data.jobRole);
    if (data.profilePic?.[0]) formData.append("profile_picture", data.profilePic[0]);
    if (data.resume?.[0]) formData.append("resume", data.resume[0]);

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/candidates/`, {
        method: "POST",
        body: formData,
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const newCandidate = await response.json();
        const avatarResponse = await fetch("https://randomuser.me/api/?gender=male");
        const avatarData = await avatarResponse.json();
        const avatarUrl = avatarData.results[0]?.picture?.large;
        const candidateWithAvatar = { ...newCandidate, avatar: avatarUrl };
      setCandidates([...candidates, candidateWithAvatar]);
        alert("Candidate added successfully!");
        reset(); // Reset form state after success
      } else {
        alert("Failed to add candidate.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Candidate</DialogTitle>
          <DialogDescription>Fill out the details for the candidate below.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4 grid-cols-1 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter full name" {...register("name")} />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="Enter email address" {...register("email")} />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" placeholder="Enter phone number" {...register("phone")} />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="jobRole">Job Role</Label>
            <Select
              onValueChange={(value) => {
                const selectedJob = jobs.find((job) => job.id === value);
                setValue("jobRole", selectedJob?.id || "");
                setValue("applied_for", selectedJob?.job_name || "");
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder={jobs.length ? "Select a job role" : "Loading jobs..."} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {jobs.map((job) => (
                    <SelectItem key={job.id} value={job.id}>
                      {job.job_name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="profilePic">Profile Picture</Label>
            <Input id="profilePic" type="file" {...register("profilePic")} />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="resume">Resume</Label>
            <Input id="resume" type="file" {...register("resume")} />
          </div>
          <DialogFooter>
            <Button type="submit">Add Candidate</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCandidate;
