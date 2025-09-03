import { JobsService } from '@/service/JobsInterviews';
import axios from 'axioss';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function useJobInterviews({ jobId }) {
    const [interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);
    useEffect(() => {
        setLoading(true)
        const fetchJobInterviews = async () => {
            try {
                const response = await JobsService.getInterviewsOfJob({ jobId });
                setInterviews(response);
            } catch (error) {
                console.error("Error fetching job interviews:", error);
                toast.error("Failed to load interviews.");
                throw error;
            }
            finally {
                setLoading(false)
            }
        };

        if (jobId) {
            fetchJobInterviews();
        }
    }
        , [jobId]);
    return {
        interviews,
        loading
    }
}
