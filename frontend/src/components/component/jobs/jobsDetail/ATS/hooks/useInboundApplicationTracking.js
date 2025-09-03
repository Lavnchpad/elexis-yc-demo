import React, { useEffect, useState } from 'react'
import axios from 'axioss';

export default function useInboundApplicationTracking({ job_id, type }) {
    const [loading, setLoading] = useState(false);
    const [applications, setApplications] = useState([]);
    useEffect(() => {
        fetchApplications();
    }, []);
    async function fetchApplications() {
        if (!job_id || !type) {
            console.warn('Job ID or type is not provided.');
            return;
        }
        setLoading(true);
        try {
            const response = await axios.get('/job-ats/', {
                params: {
                    job_id: job_id,
                    stage: type,
                }
            });
            const data = response.data || [];
            if (type === 'candidate_onboard') {
                data?.sort((a, b) =>
                    b?.ai_evaluations[0]?.roleFitScore - a?.ai_evaluations[0]?.roleFitScore
                );
            } else {
                data?.sort((a, b) => {
                    const aDate = new Date(a?.created_date);
                    const bDate = new Date(b?.created_date);
                    return bDate - aDate; // Sort by created_at in descending order
                });
            }
            setApplications(data || []);
        } catch (error) {
            console.error('Error fetching inbound applications:', error);
        } finally {
            setLoading(false);
        }
    }
    return {
        loading,
        applications,
        setApplications,
        fetchApplications
    }
}
