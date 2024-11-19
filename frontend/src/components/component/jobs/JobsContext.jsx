import React, { createContext, useState } from "react";

export const JobsContext = createContext();

export const JobsProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/jobs/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        setJobs(await response.json());
      } else {
        console.error("Failed to fetch jobs");
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  return (
    <JobsContext.Provider value={{ jobs, fetchJobs }}>
      {children}
    </JobsContext.Provider>
  );
};
