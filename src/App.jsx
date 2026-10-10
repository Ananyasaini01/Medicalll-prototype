import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import EmergencyBanner from './components/EmergencyBanner';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

import LandingPage from './pages/LandingPage';
import ServicesPage from './pages/ServicesPage';
import QuickHelpPage from './pages/QuickHelpPage';
import ScheduledDeliveryPage from './pages/ScheduledDeliveryPage';
import MedicalEquipmentPage from './pages/MedicalEquipmentPage';
import RequestTrackingPage from './pages/RequestTrackingPage';
import UserDashboardPage from './pages/UserDashboardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased">
          
          {/* Top Emergency Safety Banner */}
          <EmergencyBanner />

          {/* Senior-Accessible Navigation Bar */}
          <Navbar />

          {/* Main Page Content */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/quick-help" element={<QuickHelpPage />} />
              <Route path="/scheduled-delivery" element={<ScheduledDeliveryPage />} />
              <Route path="/equipment" element={<MedicalEquipmentPage />} />
              <Route path="/track" element={<RequestTrackingPage />} />
              
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <UserDashboardPage />
                  </ProtectedRoute>
                } 
              />

              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute adminOnly={true}>
                    <AdminDashboardPage />
                  </ProtectedRoute>
                } 
              />

              {/* Fallback route */}
              <Route path="*" element={<LandingPage />} />
            </Routes>
          </main>

          {/* Healthcare Trust Footer */}
          <Footer />

        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
