import React from 'react';
import { Routes, Route, BrowserRouter, Outlet } from 'react-router-dom';
import StudentDetails from './page/StudentDetails';
import AppLayout from './layout/AppLayout';
import LoginPage from './components/component/login/Login';
import ProtectedRoute from './components/component/ProtectedRoute';
import CandidatesProvider from './components/component/candidate/CandidatesContext';
import { JobsProvider } from './components/component/jobs/JobsContext';
import StartInterview from './page/StartInterview';
import { Toaster } from "@/components/ui/sonner";
import { InterviewProvider } from './components/component/interview/InterviewContext';
import MyProfile from './components/component/profile/MyProfile';
import MyTeam from './components/component/profile/MyTeam';

const App = () => {
  return (
    <BrowserRouter>
      <Toaster richColors toastOptions={{}} />
      <Routes>
        {/* Login Route */}
        <Route path="/login" element={<LoginPage />} />

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
          <Route path="/my-profile" element={<ProtectedRoute><MyProfile /></ProtectedRoute>} />
          <Route path="/my-team" element={<ProtectedRoute><MyTeam /></ProtectedRoute>} />
        </Route>

        {/* Start Interview Route */}
        <Route path="/interviews/:interviewId/start" element={<StartInterview />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
