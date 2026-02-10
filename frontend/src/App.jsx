import React from 'react';
import { Routes, Route, BrowserRouter, Outlet } from 'react-router-dom';
import StudentDetails from './page/StudentDetails';
import AppLayout from './layout/AppLayout';
import LoginPage from './components/component/login/Login';
import ProtectedRoute from './components/component/ProtectedRoute';
import CandidatesProvider from './components/component/candidate/CandidatesContext';
import { JobsProvider } from './components/component/jobs/JobsContext';
import StartInterview from './page/interview/StartInterview';
import { Toaster } from "@/components/ui/sonner";
import { InterviewProvider } from './components/component/interview/InterviewContext';
import MyProfile from './components/component/profile/MyProfile';
import MyTeam from './components/component/profile/MyTeam';
import JobsPage from './page/JobsPage';
import JobDetails from './components/component/jobs/jobsDetail/JobsDetails';
import { UserProvider } from './components/component/recruiter/UserContext';
import Analytics from './page/Analytics';
import MyTeamDetails from './components/component/profile/MyTeamDetails';
import InterviewFilter from './page/InterviewFilter';
import {Maintenance} from './page/Maintenance';
import { InterviewPrintPreview } from './page/interview/InterviewPrintPreview';
import DemoJobsList from './page/demo/DemoJobsList';
import DemoJobDetail from './page/demo/DemoJobDetail';
import DemoCandidate from './page/demo/DemoCandidate';
const App = () => {
  return (
    <BrowserRouter>
      <UserProvider> {/* Move UserProvider outside to wrap all routes */}
        <Toaster richColors toastOptions={{}} />
        <Routes>
          {/* Login Route */}
          <Route path="/login" element={<LoginPage />} />
          {/* Maintenance Route */}
          <Route path="/maintenance" element={<Maintenance />} />
          {/* Protected Routes with AppLayout */}
          <Route
            path="/"
            element={
              <CandidatesProvider>
                <JobsProvider>
                  <InterviewProvider>
                    <AppLayout>
                      <Outlet /> {/* Outlet for rendering child routes */}
                    </AppLayout>
                  </InterviewProvider>
                </JobsProvider>
              </CandidatesProvider>
            }
          >
            {/* Nested Routes */}
            <Route index element={<ProtectedRoute><StudentDetails /></ProtectedRoute>} />
            <Route path="/candidate/:id" element={<ProtectedRoute><StudentDetails /></ProtectedRoute>} />
            <Route path="/my-profile" element={<ProtectedRoute><MyProfile /></ProtectedRoute>} />
            <Route path="/my-team" element={<ProtectedRoute><MyTeam /></ProtectedRoute>} />
            <Route path="/team-details/:memberId" element={<ProtectedRoute><MyTeamDetails /></ProtectedRoute>} />
            <Route path="/jobs" element={<ProtectedRoute><JobsPage /></ProtectedRoute>} />
            <Route path="/job/:jobId" element={<ProtectedRoute><JobDetails /></ProtectedRoute>} />
            <Route path="/interviewFilter" element={<ProtectedRoute><InterviewFilter /></ProtectedRoute>} />
            <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
            <Route path="/interviews/:interviewId/print-preview" element={<ProtectedRoute><InterviewPrintPreview/></ProtectedRoute>} />
            {/* Demo Routes — No auth required, hardcoded data */}
            <Route path="/demo/jobs" element={<DemoJobsList />} />
            <Route path="/demo/job" element={<DemoJobDetail />} />
            <Route path="/demo/candidate" element={<DemoCandidate />} />
          </Route>

          {/* Start Interview Route */}
          <Route
            path="/interviews/:interviewId/start"
            element={
              <StartInterview />
            }
          />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
