import React, {useEffect} from 'react';
import { CandidateInterviewInformationResponse } from '@/service/CandidateInterview';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Loader } from 'lucide-react';

export class PreInterviewFormSubmission {
    currentCtc;
    expectedCtc;
    reasonForLeavingJob;
    language;
    constructor(currentCtc, expectedCtc, reasonForLeavingJob, language) {
        this.currentCtc = currentCtc;
        this.expectedCtc = expectedCtc;
        this.reasonForLeavingJob = reasonForLeavingJob;
        this.language = language;
    }
}

export const PreInterviewForm = ({ interviewData, onSubmit = async (data) => {}}) => {
    const [submitting, setSubmitting] = React.useState(false);
    if (!(interviewData instanceof CandidateInterviewInformationResponse)) {
        throw new Error("Invalid interview data provided to PreInterviewForm");
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        // Use HTML5 form validation
        if (!form.reportValidity()) {
            return;
        }
        // Collect form data
        const formData = new FormData(form);
        const currentCtc = formData.get("currentCtc") || null;
        const expectedCtc = formData.get("expectedCtc") || null;
        const reasonForLeavingJob = formData.get("reasonForLeavingJob") || null;
        const language = formData.get("language") || null;

        const submission = new PreInterviewFormSubmission(
            currentCtc,
            expectedCtc,
            reasonForLeavingJob,
            language
        );
        if (onSubmit) {
            setSubmitting(true);            
        }
    }

    useEffect(() => {
        if (submitting) {
            onSubmit(new PreInterviewFormSubmission(
                interviewData.currentCtc,
                interviewData.expectedCtc,
                interviewData.reasonForLeavingJob,
                interviewData.language
            )).then(() => {
                setSubmitting(false);
                toast.success("Interview started successfully!");
            }).catch((error) => {
                setSubmitting(false);
                toast.error("Failed to start interview: " + error.message);
            });
        }
    }, [submitting, onSubmit, interviewData]);


    const requiresInformationToBeFilled = interviewData.requiresCtcInfo || interviewData.requiresReasonForLeavingJob || interviewData.requiresLanguageInfo;
    return (<div className="p-6 space-y-4">
        <div className="text-center max-w-md mx-auto">
            <h1 className="text-xl font-bold">Start Interview</h1>
            <p className="text-black-600 mb-6">Hello {interviewData.candidateName}, your AI Interview has been schduled for {interviewData.jobName}.</p>
            {requiresInformationToBeFilled && (
                <p className="text-left text-gray-500">Please fill the following information before starting the interview.</p>
            )}
            <p className="text-left text-gray-500">To start the interview, click on the Start Interview button bellow.</p>
        </div>
        <form className="space-y-4 max-w-md mx-auto" onSubmit={handleSubmit}>
            {interviewData?.requiresCtcInfo && (
                <div>
                    <label htmlFor="currentCtc" className="block mb-2">Current CTC:</label>
                    <div className="flex space-x-2 vertical-center">
                        <input
                            type="number"
                            id="currentCtc"
                            name="currentCtc"
                            className="border p-2 w-full"
                            maxLength={13}
                            step="0.01"
                            required
                        />
                        <div className="flex vertical-center items-center">L.P.A</div>
                    </div>
                </div>
            )}
            {interviewData?.requiresCtcInfo && (
                <div>
                    <label htmlFor="expectedCtc" className="block mb-2">Expected CTC:</label>
                    <div className="flex space-x-2 vertical-center">
                        <input
                            type="number"
                            id="expectedCtc"
                            name="expectedCtc"
                            className="border p-2 w-full"
                            maxLength={13}
                            step="0.01"
                            required
                        />
                        <div className="flex vertical-center items-center">L.P.A</div>
                    </div>
                </div>
            )}
            {interviewData?.requiresReasonForLeavingJob && (
                <div>
                    <label htmlFor="reasonForLeavingJob" className="block mb-2">Reason for leaving previous job:</label>
                    <input required type="text" id="reasonForLeavingJob" name="reasonForLeavingJob" className="border p-2 w-full" />
                </div>
            )}
            {interviewData?.requiresLanguageInfo && (
                <div className="flex space-x-2 vertical-center mb-2">
                    <label htmlFor="language" className="flex space-x-2 vertical-center">Language:</label>
                    <select required name="language" id="language" className="border w-full">
                        <option value="english">English</option>
                        <option value="hindi">Hindi</option>
                    </select>
                </div>
            )}
            <Button disabled={submitting} className="w-full">
                Start Interview
                {submitting && <Loader className="animate-spin ml-2" />}
            </Button>
        </form>
    </div>);

}