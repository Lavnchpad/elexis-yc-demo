import React, { useState, useEffect, useContext } from "react";
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
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import axios from "axios";
import { JobsContext } from "./JobsContext";

const ManageJobs = ({ children }) => {
  const { jobs, setJobs } = useContext(JobsContext);
  const [jobTitle, setJobTitle] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("job_name", jobTitle);
    formData.append("additional_data", additionalInfo);
    if (pdfFile) formData.append("job_description", pdfFile);

    try {
      const token = localStorage.getItem("authToken");
      if (selectedJob) {
        const response = await axios.put(
          `${import.meta.env.VITE_API_BASE_URL}/jobs/${selectedJob.id}/`,
          formData,
          {
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
          }
        );
        setJobs((prevJobs) =>
          prevJobs.map((job) =>
            job.id === selectedJob.id ? { ...job, job_description: response.data.job_description } : job
          )
        );
        setSelectedJob(null);
      } else {
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/jobs/`, formData, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
        });
        setJobs((prevJobs) => [...prevJobs, response.data]);
      }
    } catch (error) {
      console.error("Error handling job submission:", error);
    }

    setJobTitle("");
    setAdditionalInfo("");
    setPdfFile(null);
  };

  const handleFileChange = (e) => setPdfFile(e.target.files[0]);

  return (
    <div>
      <Dialog>
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
                      setJobTitle(job.job_name);
                      setAdditionalInfo(job.additional_data);
                    }}
                  >
                    {job.job_name}
                  </li>
                ))}
              </ul>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input id="jobTitle" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="uploadPDF">Job Description (PDF)</Label>
                <Input id="uploadPDF" type="file" onChange={handleFileChange} />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="additionalInfo">Additional Information</Label>
                <Textarea
                  id="additionalInfo"
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  rows={3}
                />
              </div>
              <DialogFooter>
                <Button type="submit">Save Job Details</Button>
              </DialogFooter>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageJobs;
