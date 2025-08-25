import axios from 'axioss';
import React, { useEffect, useState } from 'react'
import { AiEvaluationCard } from '../components/AiEvaluationCard';
import { toast } from 'sonner';

export default function SuggestedCandidates({ job }) {
    const [topCandidates, setTopCandidates] = useState([]);
    useEffect(() => {
        // Fetch suggested candidates based on job requirements
        // Example: fetchSuggestedCandidates(job.requirements);
        if (job.id) {
            console.log("Fetching suggested candidates for job ID:", job.id);
            fetchSuggestedCandidates(job.id);
        }
    }
        , [job.id]);

    const fetchSuggestedCandidates = async (jobId) => {
        try {
            const response = await axios.get('suggested-candidates/', {
                params: { job_id: jobId }
            })
            setTopCandidates(response.data.sort((a, b) => b?.aiResumeMatchingResponse?.roleFitScore - a?.aiResumeMatchingResponse?.roleFitScore));
            console.log("Suggested Candidates:", response.data);

        } catch (error) {
            console.error('Error fetching suggested candidates:', error);
        }
    }
    return (
        <div>
            <h2 className='text-muted-foreground font-bold text-xl'>
                Top Suggested Candidates for this Role
            </h2>
            {
                topCandidates.map((applicant) => (
                    <AiEvaluationCard successHandler={applicant.stage === 'archived' ? null : async (applicant) => {
                        //create a new JobResumeMatchingScore entry for this job 
                        // and archive the current applicant entry
                        try {
                            const payload = {
                                "job_id": job.id,
                                "candidate_id": applicant.candidate.id,
                                "score": null, // as it was the default written in the migration as well
                                "stage": "candidate_onboard",
                                "is_archived": false,
                                // if aiJdResumeMatchingEvaluationId is passed , we will not put a message i Queue to get the evaluation from LLM, instead , will will add the JobResumeMatchingScore mapping on AiJdResumeMatchingResponse table
                                "aiJdResumeMatchingEvaluationId": applicant?.aiResumeMatchingResponse?.id
                            }
                            await Promise.all([axios.patch(
                                `suggested-candidates/${applicant?.id}/`,
                                { stage: 'archived' },  // request body
                                { params: { job_id: job.id } }  // query params
                            )
                                , axios.post('/job-ats/bulk_create/',
                                    [payload]
                                )])
                            fetchSuggestedCandidates(job.id);
                            toast.success("Candidate added to this job pipelines successfully");
                        } catch (error) {
                            toast.error("Error adding candidate to job pipelines");
                            console.error("Error in successHandler:", error);
                        }
                        // refetchApplications()
                    }} archieveApplicantHandler={null} applicant={applicant} candidateData={{ ...applicant.candidate, ...applicant?.aiResumeMatchingResponse }} key={applicant?.id} />
                ))
            }
        </div>
    )
}
