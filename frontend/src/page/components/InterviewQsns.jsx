import QuestionnaireEditor from '@/components/component/jobs/components/AddQuestions'
import { Button } from '@/components/ui/button'
import { DialogFooter, DialogHeader, DialogTrigger, Dialog, DialogClose, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import axios from 'axioss';
import React, { useState } from 'react'
import { toast } from 'sonner';

export default function InterviewQsns({ viewOnly = false, initialQuestions, interviewDetails }) {
  const [questions, setQuestions] = useState(initialQuestions?.map(qsn => ({ ...qsn, isSaved: true }) || []));
  const saveQuestionInDb = async () => {
    if (!questions || questions?.length === 0) {
      toast.info('No questions to save.');
      return;
    }
    if (!interviewDetails?.id) {
      toast.error('Interview details are not available.');
      return;
    }
    const payload = questions.map(q => ({
      question: q.question,
      interview: interviewDetails?.id
    }))
    await axios.post(`/interview-questions/?interview_id=${interviewDetails.id}`,
      [...payload]
    );
    toast.success('Questions Updated successfully!');
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link">Interview Questions</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Questions</DialogTitle>
          <DialogDescription>
            Question to be asked for the selected interview
          </DialogDescription>
        </DialogHeader>
        <QuestionnaireEditor questions={questions} setQuestions={setQuestions} viewOnly={viewOnly} getJdAndRole={() => ({ role: interviewDetails?.job.job_name, jd: interviewDetails?.job.job_description })} interviewId={interviewDetails?.id} />
        <DialogFooter className="sm:justify-start">
          <Button disabled={viewOnly} type="button" onClick={saveQuestionInDb}>
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
