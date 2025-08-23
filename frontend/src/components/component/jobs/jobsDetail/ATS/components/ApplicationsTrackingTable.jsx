import React, { useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ConfirmationDialog, { ScheduleInterviewFromJobsPage } from '@/components/component/ConfirmationDialog/ConfirmationDialog';
import { toast } from 'sonner';
import axios from 'axioss';
import useInboundApplicationTracking from '../hooks/useInboundApplicationTracking';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/toolTip';
import { Loader } from 'lucide-react';
import { AiEvaluationCard } from '../../../components/AiEvaluationCard';
import { ListDetailsToggle } from '@/components/component/resuable/ListDetailsToggleButton';


export default function ApplicationsTrackingTable({ jobData, title, button1Text, applicationtype }) {
    const { loading, applications, fetchApplications: refetchApplications } = useInboundApplicationTracking({ job_id: jobData.id, type: applicationtype })
    const [listView, setListView] = useState(true); // State to toggle between list and detailed view
    const addInterviewHandler = async ({ isReschedule, payload }) => {
        try {
            if (isReschedule) {
                console.log("Rescheduling interview with payload", payload.interviewId);
                await axios.patch(`/interviews/${payload?.interviewId}/`,
                    payload
                );
                await refetchApplications();
                toast.success("Interview rescheduled successfully");
            } else {
                await axios.post('/interviews/', payload) // Schedule the interview
                await refetchApplications();
            }
        } catch (error) {
            throw error;
        }
    }
    const archieveApplicantHandler = async ({ applicant }) => {
        try {
            await axios.patch(`/job-ats/${applicant.id}/`, {
                is_archived: true,
            });
            await refetchApplications();
            toast.success("Applicant archived successfully");
        } catch (error) {
            console.log(error);
            toast.error("Failed to archive applicant");
        } finally {
        }
    }
    if (!applications) {
        return null
    }
    if (loading) {
        return (
            <div className='w-full flex items-center justify-center h-20'>
                <Loader className='h-28 animate-spin ease-in' />
            </div>
        )
    }
    const isCandidateOnboard = applicationtype === 'candidate_onboard';
    if (isCandidateOnboard) {
        return (
            <>
                {isCandidateOnboard && <ListDetailsToggle listView={listView} setListView={setListView} />}
                {!listView ?
                    <div className='space-y-4'>
                        {
                            applications.map((applicant) => (
                                <AiEvaluationCard candidateData={{ ...applicant.candidate, ...applicant?.ai_evaluations[0] }} key={applicant?.ai_evaluations[0]?.id} />
                            ))
                        }
                    </div>
                    :
                    <Table className='overflow-x-auto w-full'>
                        <TableCaption>Applications added for this job , sorted by their acceptability for this Job</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-center">Name</TableHead>
                                <TableHead className="text-center">Email</TableHead>
                                <TableHead className="text-center">Phone</TableHead>
                                <TableHead className="text-center">Added By</TableHead>
                                <TableHead className="text-center">Added At</TableHead>
                                <TableHead className="text-center">AI Rankings </TableHead>
                                <TableHead className="text-center">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                applications?.map((applicant) => {
                                    return (
                                        <ApplicantRow loading={loading} refetch={refetchApplications} applicationtype={applicationtype} archieveApplicantHandler={archieveApplicantHandler} addInterviewHandler={addInterviewHandler} applicant={applicant} button1Text={button1Text} title={title} jobData={jobData} />
                                    )
                                })
                            }
                        </TableBody>
                        <TableFooter>
                        </TableFooter>
                    </Table>
                }
            </>

        )
    }
    return (

        <Table className='overflow-x-auto w-full'>
            <TableCaption>Applications added for this job , sorted by their acceptability for this Job</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="text-center">Name</TableHead>
                    <TableHead className="text-center">Email</TableHead>
                    <TableHead className="text-center">Phone</TableHead>
                    <TableHead className="text-center">Added By</TableHead>
                    <TableHead className="text-center">Added At</TableHead>
                    <TableHead className="text-center">AI Rankings </TableHead>
                    <TableHead className="text-center">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    applications?.map((applicant) => {
                        return (
                            <ApplicantRow loading={loading} refetch={refetchApplications} applicationtype={applicationtype} archieveApplicantHandler={archieveApplicantHandler} addInterviewHandler={addInterviewHandler} applicant={applicant} button1Text={button1Text} title={title} jobData={jobData} />
                        )
                    })
                }
            </TableBody>
            <TableFooter>
            </TableFooter>
        </Table>

    )
}

const ApplicantRow = ({ archieveApplicantHandler, refetch, applicationtype, addInterviewHandler, jobData, applicant, button1Text, title = 'Confirm Action', description = 'Are you sure you want to shortlist this applicant?' }) => {
    const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
    const [selectedApplictionDetails, setSelectedApplictionDetails] = useState(null);
    const [loading, setLoading] = useState(false); // used for moving the candidate to the next stage
    const confirmationHandler = async () => {
        setLoading(true);
        try {
            await Promise.allSettled([axios.patch(`/job-ats/${applicant.id}/`, {
                is_archived: true,
            }),
            axios.post('/job-ats/', {
                job_id: jobData.id,
                candidate_id: applicant.candidate.id,
                stage: 'selected_for_interview',
                score: applicant.score,
                ranking: applicant.ranking
            })]);

            await refetch()
            setShowConfirmationDialog(false);
            toast.success("Applicant shortlisted successfully");
            setSelectedApplictionDetails(null);
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    }
    // const calculatedResumeMatchingScore = applicant.score ? `${(((parseFloat(applicant.score) + 1) / 2) * 100).toFixed()}%` : '-'
    return (
        <TableRow key={applicant.id}>
            {showConfirmationDialog && (
                ['selected_for_interview', 'completed_interview', 'scheduled_interview'].includes(applicationtype) ?
                    <ScheduleInterviewFromJobsPage isReschedule={applicationtype === 'scheduled_interview'} job={jobData} applicantdetails={selectedApplictionDetails} isOpen={setShowConfirmationDialog} onOpenChange={setShowConfirmationDialog} confirmationHandler={addInterviewHandler} />
                    :
                    <ConfirmationDialog loading={loading} isOpen={setShowConfirmationDialog} cancelHandler={() => setShowConfirmationDialog(prev => !prev)} onOpenChange={setShowConfirmationDialog} title={title} description={description} confirmationHandler={confirmationHandler} />
            )}
            <TableCell className="text-center">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button asChild variant="link" className="hover:underline">
                            <Link className="hover:underline" to={applicant.interviews?.[0]?.id ? `/candidate/${applicant.candidate?.id}?interview_id=${applicant.interviews?.[0]?.id}` : `/candidate/${applicant.candidate?.id}`}>
                                {applicant.candidate.name}
                            </Link>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <Link target='_blank' to={applicant.interviews?.[0]?.id ? `/candidate/${applicant.candidate?.id}?interview_id=${applicant.interviews?.[0]?.id}` : `/candidate/${applicant.candidate?.id}`}>Open in new tab</Link>
                    </TooltipContent>
                </Tooltip>

            </TableCell>
            <TableCell className="text-center">
                {applicant.candidate?.email}
            </TableCell>
            <TableCell className="text-center">
                {applicant.candidate?.phone_number}
            </TableCell>
            <TableCell className="text-center">
                {applicant.created_by?.name}
            </TableCell>
            <TableCell className="text-center">
                {applicant.created_date ? new Date(applicant.created_date).toLocaleString() : 'N/A'}
            </TableCell>
            <TableCell className="text-center">
                {applicant?.ranking}
            </TableCell>
            <TableCell className="text-center flex fle-wrap justify-center gap-2">
                {/* for scheduled_interview , this button will act like reschedule button */}
                {/* for completed intreview , this button will act like archieve the completed row and schedule one */}
                {<Button size="sm" disabled={applicationtype === 'completed_interview'} className='bg-gray-300 text-black hover:bg-gray-300 hover:scale-95' onClick={() => {
                    setSelectedApplictionDetails(applicant)
                    setShowConfirmationDialog(true);
                }}>{button1Text}</Button>
                }
                {!['scheduled_interview'].includes(applicationtype) && <Button variant="secondary" size="sm" className='bg-red-400 text-black hover:bg-red-300 hover:scale-95' onClick={() => archieveApplicantHandler({ applicant })}>
                    Archive
                </Button>
                }
            </TableCell>
        </TableRow>
    )
}
