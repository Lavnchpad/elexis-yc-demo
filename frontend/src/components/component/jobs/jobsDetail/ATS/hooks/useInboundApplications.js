import React, { useEffect } from 'react'
import axios from 'axioss';

export default function useInboundApplications({ job_id }) {
    const [loading, setLoading] = React.useState(false);
    const [applications, setApplications] = React.useState([]);
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get('/job-ats/', {
                    params: {
                        job_id: job_id
                    }
                });
                console.log(response.data);
                setApplications(response.data);
            } catch (error) {
                console.error('Error fetching inbound applications:', error);
            }
        }
        )();
    }
        , []);
    return {
        loading,
        applications,
        setApplications
    }
}
