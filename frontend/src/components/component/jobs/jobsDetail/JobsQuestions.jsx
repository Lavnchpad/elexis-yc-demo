
import React, { useState } from 'react'
import QuestionnaireEditor from '../components/AddQuestions';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import axios from 'axioss';
import CollapsibleSection from '../../resuable/CollapsibleSection';

export default function JobsQuestions({ job, defaultShow }) {
    const [questions, setQuestions] = useState(job?.questions || []);
    const saveJobQuestions = async () => {
        try {
            if (!questions || questions.length === 0) {
                toast.info('No questions to save.');
                return;
            }
            const payload = questions.map((q, index) => ({
                question: q.question,
                job: job.id,
                sort_order: index,
            }));
            await axios.post(`/job-questions/?job_id=${job.id}`, payload);
            toast.success('Job questions saved successfully!');
        } catch (error) {
            console.error('Error saving job questions:', error);
            toast.error('Failed to save job questions. Please try again.');
        }
    }
    return (
        <CollapsibleSection title="Questions" defaultShow={defaultShow}>
            <QuestionnaireEditor questions={questions} setQuestions={setQuestions} getJdAndRole={() => ({ role: job.job_name, jd: job.job_description })} jobView={true} />
            <Button onClick={saveJobQuestions}>Save</Button>
        </CollapsibleSection>
    )
}
