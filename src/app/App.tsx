import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import OTPPage from './pages/auth/OTPPage';

// Profile & Assessment
import ProfileOptionPage from './pages/ProfileOptionPage';
import LevelsOverviewPage from './pages/LevelsOverviewPage';
import AssessmentPage from './pages/AssessmentPage';
import Level2PopupPage from './pages/Level2PopupPage';
import PsychometricSummaryPage from './pages/PsychometricSummaryPage';
import PsychometricDetailedPage from './pages/PsychometricDetailedPage';

// Dashboard Pages
import DashboardLayout from './components/DashboardLayout';
import HomePage from './pages/dashboard/HomePage';
import MyResumePage from './pages/dashboard/MyResumePage';
import ResumeBuilderPage from './pages/dashboard/ResumeBuilderPage';
import ResumeAssessmentPage from './pages/dashboard/ResumeAssessmentPage';
import ResumeSummaryPage from './pages/dashboard/ResumeSummaryPage';
import ResumeDetailedPage from './pages/dashboard/ResumeDetailedPage';
import CareerPage from './pages/dashboard/CareerPage';
import ProfilePage from './pages/dashboard/ProfilePage';
import CareerGuidancePage from './pages/dashboard/CareerGuidancePage';
import LearningPage from './pages/dashboard/LearningPage';
import JobsPage from './pages/dashboard/JobsPage';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);

  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage onLogin={() => setIsAuthenticated(true)} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/otp" element={<OTPPage onVerify={() => setIsAuthenticated(true)} />} />

        {/* Profile & Assessment Routes */}
        <Route
          path="/profile-option"
          element={isAuthenticated ? <ProfileOptionPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/levels-overview"
          element={isAuthenticated ? <LevelsOverviewPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/assessment/:level"
          element={isAuthenticated ? <AssessmentPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/level2-popup"
          element={isAuthenticated ? <Level2PopupPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/psychometric-summary"
          element={isAuthenticated ? <PsychometricSummaryPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/psychometric-detailed"
          element={isAuthenticated ? <PsychometricDetailedPage /> : <Navigate to="/login" />}
        />

        {/* Dashboard Routes */}
        <Route
          path="/dashboard"
          element={isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />}
        >
          <Route index element={<HomePage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="my-resume" element={<MyResumePage />} />
          <Route path="resume-builder" element={<ResumeBuilderPage />} />
          <Route path="resume-assessment" element={<ResumeAssessmentPage />} />
          <Route path="resume-summary" element={<ResumeSummaryPage />} />
          <Route path="resume-detailed" element={<ResumeDetailedPage />} />
          <Route path="career" element={<CareerPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="career-guidance" element={<CareerGuidancePage />} />
          <Route path="learning" element={<LearningPage />} />
          <Route path="jobs" element={<JobsPage />} />
        </Route>

        {/* Default Route */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}