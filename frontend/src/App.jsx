import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import StudentDetails from './page/StudentDetails';
import AppLayout from './layout/AppLayout';
import LoginPage from './components/component/login/Login';
import ProtectedRoute from './components/component/ProtectedRoute';
import CandidatesProvider from './components/component/candidate/CandidatesContext';
const App = () => {
  return (
    // <CandidatesProvider>
    <BrowserRouter>
      <Routes>
      <Route path="/login" element={<LoginPage />} />
        <Route path='/' element={<CandidatesProvider><AppLayout /></CandidatesProvider>} children={
          
          [
            <Route path="/" element={ <ProtectedRoute><StudentDetails /></ProtectedRoute>} />,
          ]
        }>
        </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
