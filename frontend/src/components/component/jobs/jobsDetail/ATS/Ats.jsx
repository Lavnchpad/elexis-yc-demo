import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from 'react'
import ApplicationsTrackingTable from "./components/ApplicationsTrackingTable";

export default function Ats({ jobData }) {

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
                <ApplicationsTrackingTable jobData={jobData} button1Text='Shortlist' title='Confirm Action' applicationtype='candidate_onboard' />
            </TabsContent>
            <TabsContent className="mt-0" value="Selected for Interview">
                <ApplicationsTrackingTable jobData={jobData} button1Text='Schedule Interview' title='Schedule Interview' applicationtype='selected_for_interview' />
            </TabsContent>
            <TabsContent className="mt-0" value="Interview Scheduled">
                <ApplicationsTrackingTable jobData={jobData} applicationtype='scheduled_interview' button1Text='Reschedule' />
            </TabsContent>
            <TabsContent className="mt-0" value="Interview Completed">
                <ApplicationsTrackingTable jobData={jobData} button1Text='Schedule Again?' applicationtype='completed_interview' />
            </TabsContent>
        </Tabs>
    )
}
