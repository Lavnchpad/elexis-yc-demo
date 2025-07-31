import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from 'react'
import InboundApplications from "./components/InboundApplications";
import useInboundApplications from "./hooks/useInboundApplications";

export default function Ats({ jobData }) {
    const { loading: inboubndApplicantsLoading, applications: inboundAplicants, setApplications: setInboundApplicants } = useInboundApplications({ job_id: jobData.id })
    async function inboundApplicantActions({ type, ...application }) {
        switch (type) {
            case "shortlist":
            // Shortlist the applicant , move this candidate to next stage only if API returns 200, remove from this inboundAplicants and put into shortlistedforInterview candidates state with current user as updated
            default:
                console.error("Unknown action type:", type);
                break;
        }
    }

    return (
        <Tabs defaultValue="Inbound Applicants">
            <TabsList>
                <TabsTrigger
                    className=""
                    value="Inbound Applicants"
                >
                    Inbound Applicants

                </TabsTrigger>
                <TabsTrigger
                    className=""
                    value="Selected for Interview"
                >
                    Selected for Interview
                </TabsTrigger>
                <TabsTrigger
                    className=""
                    value="Interview Scheduled"
                >
                    Interview Scheduled
                </TabsTrigger>
                <TabsTrigger
                    className=""
                    value="Interview Completed"
                >
                    Interview Completed
                </TabsTrigger>
            </TabsList>
            <TabsContent className="mt-0" value="Inbound Applicants">
                <InboundApplications jobData={jobData} applicants={inboundAplicants} inboundApplicantActions={inboundApplicantActions} />
            </TabsContent>
        </Tabs>
    )
}
