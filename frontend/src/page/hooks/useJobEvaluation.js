import { useEffect, useState } from 'react'
import axios from '../../utils/api'

export default function useJobEvaluation({ jobId }) {
  const [evaluations, setEvaluations] = useState({});
  const [criterias, setCriterias] = useState([]);
  useEffect(() => {
    if (!jobId) {
      return;
    }
    (async () => {
      const data = await fetchJobEvaluations(jobId);
      setEvaluations(data?.candidateEvaluations);
      setCriterias(data?.criterias);
    })()
  }, [jobId])

  return {
    evaluations,
    criterias
  }
}

async function fetchJobEvaluations(jobId) {
  try {
    const response = await axios.get(`/jobs/${jobId}/ranked_candidates/`);
    return response.data
  } catch (error) {
    console.error('Error fetching job evaluations:', error);
    throw error;
  }
};
