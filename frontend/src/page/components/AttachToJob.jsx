import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import axios from 'axioss';
import MultiSelectSearch from '@/components/ui/combobox';
import LoadingButton from '@/components/component/LoadingButton';
import { toast } from 'sonner';
export default function AttachToJob({ selectedCandidate }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [notAssociatedJobs, setNotAssociatedJobs] = useState([]);
    const [selectedJobs, setselectedJobs] = useState([])
    useEffect(() => {
        if (selectedCandidate && open) {
            jobsForTheCandidate();
        }
    }, [selectedCandidate, open]);
    const jobsForTheCandidate = async () => {
        try {
            const response = await axios.get('/jobs/unassociated_jobs/', {
                params: {
                    candidate_id: selectedCandidate.id,
                },
            })
            setNotAssociatedJobs(response.data.map(job => ({
                value: job.id,
                label: job.job_name
            })));
        } catch (error) {
            console.error("Error fetching job pipelines:", error);
        }
    }

    async function addCandidateToJobPipelines() {
        try {
            if (!selectedJobs?.length) {
                toast.success("Please select at least one job pipeline to add the candidate");
                return;
            }
            setLoading(true);
            const payload = selectedJobs?.map(job => ({
                "job_id": job,
                "candidate_id": selectedCandidate.id,
                "score": 0.00,
                "stage": "candidate_onboard",
                "is_archieved": false
            }))
            await axios.post('/job-ats/bulk_create/',
                payload
            );
            toast.success("Candidate added to job pipelines successfully");
            setOpen(false)
        } catch (error) {
            toast.error("Error adding candidate to job pipelines");
            console.error("Error adding candidate to job pipelines:", error);
        } finally {
            setLoading(false);
        }

    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <Button className="" variant='secondary'>Add to a job pipeline</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Add to job pipeline</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <MultiSelectSearch onSelectionChange={(jobs) => { setselectedJobs(jobs) }} initialSelectedValues={[]} items={notAssociatedJobs} />
                    <LoadingButton loading={loading} onClick={async () => {
                        await addCandidateToJobPipelines();
                    }}>
                        Save
                    </LoadingButton>

                    <Button onClick={() => setOpen(false)} variant='secondary'>Close</Button>
                </div>

            </DialogContent>
        </Dialog>
    )
}

const frameworks = [
    {
        value: "next.js",
        label: "Next.js",
    },
    {
        value: "sveltekit",
        label: "SvelteKit",
    },
    {
        value: "nuxt.js",
        label: "Nuxt.js",
    },
    {
        value: "remix",
        label: "Remix",
    },
    {
        value: "astro",
        label: "Astro",
    },
]