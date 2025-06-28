import QuestionnaireEditor from '@/components/component/jobs/components/AddQuestions'
import { Button } from '@/components/ui/button'
import { DialogFooter, DialogHeader, DialogTrigger, Dialog, DialogClose, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import axios from 'axioss';
import { Icon } from 'lucide-react';
import React, { useState } from 'react'
import { toast } from 'sonner';
import { Settings } from 'lucide-react';

export default function InterviewQsns({ viewOnly = false, initialQuestions, interviewDetails, jobView = false }) {
  // If jobView is true, it means we are on the job page and we need to handle questions differently
  const [questions, setQuestions] = useState(initialQuestions?.map(qsn => ({ ...qsn, isSaved: true }) || []));
  const [open, setOpen] = useState(false);
  const saveQuestionInDb = async () => {
    try {

      if (!questions || questions?.length === 0) {
        toast.info('No questions to save.');
        return;
      }
      const payload = questions.map((q, index) => ({
        question: q.question,
        interview: interviewDetails?.id,
        sort_order: index,
      }))
      await axios.post(`/interview-questions/${!jobView ? `?interview_id=${interviewDetails.id}` : ''}`,
        [...payload]
      );
      toast.success('Questions Updated successfully!');
      setOpen(false);
    } catch (error) {
      console.error('Error saving questions:', error);
      toast.error('Failed to save questions. Please try again.');
      return;
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setOpen(true)}>
          <Settings/>
          Manage Interview Questions
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Questions</DialogTitle>
          <DialogDescription>
            {/* Question to be asked in the interview. */}
            <p className='warning-text text-red-300'>
              Minimum 10 questions required
            </p>
          </DialogDescription>
        </DialogHeader>
        <QuestionnaireEditor questions={questions} setQuestions={setQuestions} viewOnly={viewOnly} getJdAndRole={() => ({ role: interviewDetails?.job.job_name, jd: interviewDetails?.job.job_description })} interviewId={interviewDetails?.id} />
        <DialogFooter className="sm:justify-start">
          <Button disabled={viewOnly || questions?.length < 10} type="button" onClick={saveQuestionInDb}>
            Save
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="secondary" >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
