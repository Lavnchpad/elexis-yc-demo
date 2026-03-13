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
import DemoTalentProfile from './page/demo/DemoTalentProfile';
import BallerCorpTalentProfile from './page/demo/BallerCorpTalentProfile';
import BallerCorpJobDetail from './page/demo/BallerCorpJobDetail';
import KamleshTalentProfile from './page/demo/KamleshTalentProfile';
import PrashantTalentProfile from './page/demo/PrashantTalentProfile';
import NitishTalentProfile from './page/demo/NitishTalentProfile';
import PrachiTalentProfile from './page/demo/PrachiTalentProfile';
import AmanTalentProfile from './page/demo/AmanTalentProfile';
import ArticulusQAProfile from './page/demo/ArticulusQAProfile';
import PranilTalentProfile from './page/demo/PranilTalentProfile';
import GaurangTalentProfile from './page/demo/GaurangTalentProfile';
import BalakrishnaTalentProfile from './page/demo/BalakrishnaTalentProfile';
import MohsinTalentProfile from './page/demo/MohsinTalentProfile';
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
            <Route path="/demo/baller-job" element={<BallerCorpJobDetail />} />
            <Route path="/demo/candidate" element={<DemoCandidate />} />
          </Route>

          {/* Shareable Talent Profile — standalone, no app chrome */}
          <Route path="/demo/profile" element={<DemoTalentProfile />} />
          <Route path="/demo/baller-profile" element={<BallerCorpTalentProfile />} />
          <Route path="/demo/kamlesh-profile" element={<KamleshTalentProfile />} />
          <Route path="/kamlesh-profile" element={<KamleshTalentProfile />} />
          <Route path="/demo/prashant-profile" element={<PrashantTalentProfile />} />
          <Route path="/prashant-profile" element={<PrashantTalentProfile />} />
          <Route path="/demo/nitish-profile" element={<NitishTalentProfile />} />
          <Route path="/nitish-profile" element={<NitishTalentProfile />} />
          <Route path="/demo/prachi-profile" element={<PrachiTalentProfile />} />
          <Route path="/prachi-profile" element={<PrachiTalentProfile />} />
          <Route path="/demo/aman-profile" element={<AmanTalentProfile />} />
          <Route path="/aman-profile" element={<AmanTalentProfile />} />
          <Route path="/demo/articulus-qa-profile" element={<ArticulusQAProfile />} />
          <Route path="/articulus-qa-profile" element={<ArticulusQAProfile />} />
          <Route path="/demo/pranil-profile" element={<PranilTalentProfile />} />
          <Route path="/pranil-profile" element={<PranilTalentProfile />} />
          <Route path="/demo/gaurang-nodejs-profile" element={<GaurangTalentProfile />} />
          <Route path="/gaurang-nodejs-profile" element={<GaurangTalentProfile />} />
          <Route path="/demo/balakrishna-nodejs-profile" element={<BalakrishnaTalentProfile />} />
          <Route path="/balakrishna-nodejs-profile" element={<BalakrishnaTalentProfile />} />
          <Route path="/demo/mohsin-nodejs-profile" element={<MohsinTalentProfile />} />
          <Route path="/mohsin-nodejs-profile" element={<MohsinTalentProfile />} />

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
