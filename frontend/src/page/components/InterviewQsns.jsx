import QuestionnaireEditor from '@/components/component/jobs/components/AddQuestions'
import { Button } from '@/components/ui/button'
import { DialogFooter, DialogHeader, DialogTrigger, Dialog, DialogClose, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import React, { useState } from 'react'
import { toast } from 'sonner';

export default function InterviewQsns({ viewOnly = false }) {
  const [questions, setQuestions] = useState([{ 'id': 1, "question": 'What is your greatest strength?' }, { "question": 'Describe a challenge you faced and how you overcame it.', "id": 2 }]);
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
        <QuestionnaireEditor questions={questions} setQuestions={setQuestions} viewOnly={viewOnly} />
        <DialogFooter className="sm:justify-start">
          <Button disabled={viewOnly} type="button" onClick={() => {
            // do the needful
            toast.success('Questions saved successfully!');
          }}>
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
