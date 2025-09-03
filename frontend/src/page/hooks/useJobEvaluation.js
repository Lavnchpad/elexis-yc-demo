import { useEffect, useState } from 'react'
import axios from '../../utils/api'
import { toast } from 'sonner';

export default function useJobEvaluation({ jobId }) {
  const [evaluations, setEvaluations] = useState({});
  const [loading, setLoading] = useState(false)
  const [criterias, setCriterias] = useState([]);
  useEffect(() => {
    if (!jobId) {
      return;
    }
    (async () => {
      try {
        setLoading(true)
        const data = await fetchJobEvaluations(jobId);
        setEvaluations(data?.candidateEvaluations);
        setCriterias(data?.criterias);
      } catch (error) {
        toast.error('Something went wromg')
        console.log('useJobEvaluation ::: error', error)
      } finally {
        setLoading(false)
      }
    })()
  }, [jobId])

  return {
    evaluations,
    criterias,
    loading
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
