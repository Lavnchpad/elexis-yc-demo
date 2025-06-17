import axios from "axioss";
import React, { createContext, useState, useEffect } from "react";

export const CandidatesContext = createContext();

const CandidatesProvider = ({ children }) => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setloading] = useState(true); // loading state for candidates
  const [error, setError] = useState(null);

  const fetchCandidates = async () => {
    try {
      const response = await axios.get('/candidates/');
      return (response.data);  // Add avatars after fetching candidates
    } catch (error) {
      setError(error.message);
    } finally {
      setloading(false);
    }
  };

  // useEffect to fetch candidates when component mounts
  useEffect(() => {
    (async () => {
      try {
        setloading(true);
        const candidatesResponse = await fetchCandidates();
        setCandidates(candidatesResponse);
        localStorage.removeItem("jobState");
      } catch (error) { } finally {
        setloading(false);
      }
    })()
  }, []); // Empty dependency array makes sure it only runs once when the component mounts

  return (
    <CandidatesContext.Provider value={{ candidates, setCandidates, loading, error }}>
      {children}
    </CandidatesContext.Provider>
  );
};

export default CandidatesProvider;
