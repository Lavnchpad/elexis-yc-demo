import { JobsService } from "@/service/JobsInterviews";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CandidateHeader } from "../candidate/CandidateHeader";
import Experience from "@/components/component/candidate/skills-experience/Experience";
import Skills from "@/components/component/candidate/skills-experience/Skills";
import ErrorBoundary from "@/utils/ErrorBoundary";
import Summary from "@/components/component/tabs/Summary";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import ExpandedTranscript from "./result/ExpandedTranscript";

const PageStates = {
    LOADING: "loading",
    LOADED: "loaded",
    ERROR: "error"
}

class ComponentState{
    pageState;
    interview;
    errorMessage;
    constructor(pageState, interview, errorMessage) {
        this.pageState = pageState;
        this.interview = interview;
        this.errorMessage = errorMessage;
    }
}

export const InterviewPrintPreview = ({}) => {
    const {interviewId: interviewId} = useParams();
    const [componentState, setComponentState] = useState(new ComponentState(PageStates.LOADING, null, null));
    const printRef = useRef(null);
    const reactToPrintFn = useReactToPrint({ contentRef: printRef });

    useEffect(() => {
        if(componentState.pageState == PageStates.LOADING) {
            JobsService.getInterviewByInterviewId(interviewId).then((interview) => {
                setComponentState(new ComponentState(PageStates.LOADED, interview, null));
            }).catch((error) => {
                console.error(error)
                setComponentState(new ComponentState(PageStates.ERROR, null, "There was an error loading interview information."));
            })
        }
        
    }, [componentState]);
    switch(componentState.pageState) {
        case PageStates.LOADING:
            return <>
                <div className="flex flex-inline">
                    <Loader2 className="animate-spin">
                        
                    </Loader2>
                    Loading Interview Information
                </div> 
            </>
        case PageStates.ERROR:
            return <>
                <div className="flex flex-inline">
                    {componentState.errorMessage}
                </div> 
            </>
        case PageStates.LOADED:
            return <div className="w-full flex justify-center">
                <div className="w-3/5">
                    <div className="w-full p-4" >
                        <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
                            <CardContent className="pt-6 flex flex-inline justify-between">
                                <h1 className="text-2xl font-bold">Print Preview</h1>
                                <Button
                                    variant="default"
                                    className="gap-2"
                                    onClick={reactToPrintFn}
                                >
                                    <Printer className="w-4 h-4" />
                                    Print
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                        <div ref={printRef}>
                            <div className="w-full p-4">
                                <CandidateHeader interview={componentState.interview} candidate={componentState.interview.candidate}/>
                            </div>
                            <div className="w-full p-4">
                                <div className="grid gap-6 md:grid-cols-[300px_1fr]">
                                    <Experience experience={componentState.interview?.experience} />
                                    <Skills skills={componentState.interview?.skills} />
                                </div>
                            </div>
                            <ErrorBoundary>
                                <Summary interview_summary={componentState.interview.summary}/>
                            </ErrorBoundary>
                            <ErrorBoundary>
                                <div className="w-full p-4">
                                    <ExpandedTranscript interview_transcript_url={componentState.interview.transcript}/>
                                </div>
                            </ErrorBoundary>
                        </div>
                        
                    </div>
            </div>
    }
}