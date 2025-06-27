import { Button } from '@/components/ui/button'
import { GenerateQuestionsService } from '@/service/QuestionsGenerate'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function AiGeneratedQuestions({
    getJdAndRole,
    setAiGeneratedQuestion,
    AiGeneratedQuestions,
    viewOnly = false,
    interviewId
}) {
    const [isLoading, setIsLoading] = useState(false)
    const [areQuestionsGenerated, setAreQuestionsGenerated] = useState(false)

    const generateQsns = async () => {
        const { jd, role } = getJdAndRole();
        if (!jd || !role) {
            toast.error("Job description and role are required to generate questions. Please provide them in the previous screens");
            return;
        }
        console.log("Generating questions for:", jd, role)
        try {
            setIsLoading(true)
            const response = await GenerateQuestionsService.generateQuestions(jd, role, interviewId)
            setAiGeneratedQuestion(response)
            setAreQuestionsGenerated(true)
        } catch (error) {
            setIsLoading(false)
            setAreQuestionsGenerated(false)
            console.error("Error generating questions:", error)
            toast.error("Failed to generate questions. Please try again later.")
        } finally {
            setIsLoading(false)
        }
    }

    if (areQuestionsGenerated) {
        return null
    }
    return (
        <Button onClick={generateQsns} className="w-full" disabled={viewOnly || isLoading} >Generate Questions? {isLoading && <span className='animate-spin'><Loader2 /></span>}</Button>
    )
}

