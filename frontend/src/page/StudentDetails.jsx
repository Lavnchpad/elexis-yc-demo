import React, { useEffect, useState } from "react";
import { Mail, Download, Phone, BriefcaseBusiness } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import ScheduleDrive from "@/components/component/drive/ScheduleDrive";
import Summary from "@/components/component/tabs/Summary";
import Transcript from "@/components/component/tabs/Transcript";
import Proctoring from "@/components/component/tabs/Proctoring";
import { useOutletContext } from "react-router-dom";
import StudentDetailsSkeleton from "@/components/component/Loader/StudentDetailsLoader";

const StudentDetails = () => {
  const [activeTab, setActiveTab] = useState("summary");
  const [loading, setLoading] = useState(true);
  const { selectedCandidate } = useOutletContext();

  useEffect(() => {
    if (selectedCandidate) {
      setLoading(true);
      setTimeout(() => setLoading(false), 1000); // Simulate loading delay
    }
  }, [selectedCandidate]);
  console.log(selectedCandidate)

  if (!selectedCandidate) {
    return <div>Please select a candidate from the sidebar.</div>;
  }
  if (loading) {
    return <StudentDetailsSkeleton />;
  }

  return (
    <div className="container mx-auto p-6">
      {/* Profile Header */}
      <div className="bg-white p-6 rounded shadow mb-6 flex items-center">
        <div className="flex items-center space-x-6">
          {/* Avatar */}
          <Avatar className="w-40 h-40 rounded-full">
            <AvatarImage
              src={selectedCandidate.avatar}
              alt="Brooklyn Simmons"
            />
            <AvatarFallback>BS</AvatarFallback>
          </Avatar>

          {/* User Information */}
          <div>
              <h1 className="text-2xl font-bold">{selectedCandidate.name}</h1>
              <p className="text-muted-foreground flex items-center mt-2">
                <Mail className="mr-2 w-5 h-5" />
                {selectedCandidate.email}
              </p>
              <p className="text-muted-foreground flex items-center mt-2">
                <Phone className="mr-2  w-5 h-5" />
                {selectedCandidate.phone_number}
              </p>
              <p className="text-muted-foreground flex items-center mt-2">
                <BriefcaseBusiness className="mr-2  w-5 h-5" />
                {selectedCandidate.applied_for}
              </p>
            </div>
        </div>

        {/* Buttons (Replacing Score) */}
        <div className="ml-auto flex space-x-4">
          <Button className="px-6 py-3">Accept</Button>
          <Button className="px-6 py-3">Reject</Button>
          <Button className="px-6 py-3">Hold</Button>
          <ScheduleDrive>
          <Button className="px-6 py-3">Schedule</Button>
          </ScheduleDrive>
        </div>
      </div>

      {/* Full-width Gray Background with Tabs and Buttons */}
       
      <div className="w-full px-6 py-4 bg-muted/30">
      <div className="flex items-center justify-between">
        <Tabs defaultValue="summary" className="w-full">
          <div className="flex items-center justify-between mb-4">
            <TabsList className="bg-background">
              <TabsTrigger 
                value="summary" 
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Summary
              </TabsTrigger>
              <TabsTrigger 
                value="transcript"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Transcript
              </TabsTrigger>
              <TabsTrigger 
                value="proctoring"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Proctoring
              </TabsTrigger>
            </TabsList>
            
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2">
                <Mail className="w-4 h-4" />
                Send Email
              </Button>
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Resume
              </Button>
            </div>
          </div>

          <TabsContent value="summary">
            <div className="p-4 bg-background rounded-lg">
             <Summary/>
            </div>
          </TabsContent>

          <TabsContent value="transcript">
            <div className="p-4 bg-background rounded-lg">
              <Proctoring/>
            </div>
          </TabsContent>

          <TabsContent value="proctoring">
            <div className="p-4 bg-background rounded-lg">
              <h2 className="text-lg font-semibold mb-2">Video Recording</h2>
             <Transcript />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>

      </div>
  );
};

export default StudentDetails;
