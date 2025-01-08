import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import StudentDetails from './page/StudentDetails';
import AppLayout from './layout/AppLayout';
import LoginPage from './components/component/login/Login';
import ProtectedRoute from './components/component/ProtectedRoute';
import CandidatesProvider from './components/component/candidate/CandidatesContext';
import { JobsProvider } from './components/component/jobs/JobsContext';
import StartInterview from './page/StartInterview';
import { Toaster } from "@/components/ui/sonner"
const App = () => {
  return (
    // <CandidatesProvider>
    <BrowserRouter>
     <Toaster richColors toastOptions={{}} />
      <Routes>
      <Route path="/login" element={<LoginPage />} />
        <Route path='/' element={<CandidatesProvider><JobsProvider><AppLayout /></JobsProvider></CandidatesProvider>} children={
          
          [
            <Route path="/" element={ <ProtectedRoute><StudentDetails /></ProtectedRoute>} />,
          ]
        }>
        </Route>
        <Route path="/interviews/:interviewId/start" element={<StartInterview />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
