import axios from "axioss";
import React, { createContext, useEffect, useState } from "react";

export const JobsContext = createContext();

export const JobsProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true); // loading state for jobs

  const fetchJobs = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`/jobs/`)
      setJobs(response);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false)
    }
  };
  useEffect(() => {
    fetchJobs();  // Ensure jobs are fetched on component mount
  }, []);

  return (
    <JobsContext.Provider value={{ jobs, setJobs, fetchJobs, jobsLoading: loading }}>
      {children}
    </JobsContext.Provider>
  );
};
