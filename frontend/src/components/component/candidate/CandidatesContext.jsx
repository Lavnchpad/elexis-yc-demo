import React, { createContext, useState, useEffect } from "react";

export const CandidatesContext = createContext();

const CandidatesProvider = ({ children }) => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setloading] = useState(true); // loading state for candidates
  const [loadingAvatars, setLoadingAvatars] = useState(false); // loading state for avatars
  const [error, setError] = useState(null);

  const fetchCandidates = async () => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        setError("No auth token found.");
        setloading(false);
        return;
      }

      const response = await fetch("http://127.0.0.1:8000/candidates/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch candidates");
      }

      const data = await response.json();
      await addAvatarsToCandidates(data);  // Add avatars after fetching candidates
    } catch (error) {
      setError(error.message);
    } finally {
      setloading(false);
    }
  };

  const addAvatarsToCandidates = async (candidates) => {
    setLoadingAvatars(true);

    try {
      const updatedCandidates = await Promise.all(
        candidates.map(async (candidate) => {
          const avatarResponse = await fetch("https://randomuser.me/api/?gender=male");
          const avatarData = await avatarResponse.json();
          const avatarUrl = avatarData.results[0]?.picture?.large;
          return { ...candidate, avatar: avatarUrl };
        })
      );

      setCandidates(updatedCandidates); // Update candidates with avatars
    } catch (error) {
      setError("Failed to fetch avatars");
    } finally {
      setLoadingAvatars(false);
    }
  };

  // useEffect to fetch candidates when component mounts
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      fetchCandidates();
    } else {
      setloading(false); // If no token, don't load candidates
    }
  }, []); // Empty dependency array makes sure it only runs once when the component mounts

  return (
    <CandidatesContext.Provider value={{ candidates, setCandidates, loading, loadingAvatars, error }}>
      {children}
    </CandidatesContext.Provider>
  );
};

export default CandidatesProvider;
