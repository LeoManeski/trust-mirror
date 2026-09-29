import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Register from './pages/Register'
import StudentDashboard from './pages/StudentDashboard'
import TeacherDashboard from './pages/TeacherDashboard'
import ScenarioView from './pages/ScenarioView'
import TrustMirror from './pages/TrustMirror'
import StudentTrustMirrorView from './pages/StudentTrustMirrorView'
import TrustMirrorInfo from './pages/TrustMirrorInfo'
import './App.css'
import DeceptionPlaybook from './pages/DeceptionPlaybook'

function PrivateRoute({ children, requiredRole }) {
  const { user, loading } = useAuth()
  
  if (loading) {
    return <div className="loading-screen">Loading...</div>
  }
  
  if (!user) {
    return <Navigate to="/login" />
  }
  
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to={user.role === 'STUDENT' ? '/student/dashboard' : '/teacher/dashboard'} />
  }
  
  return children
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route 
        path="/student/dashboard" 
        element={
          <PrivateRoute requiredRole="STUDENT">
            <StudentDashboard />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/student/scenario/:id" 
        element={
          <PrivateRoute requiredRole="STUDENT">
            <ScenarioView />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/student/trust-mirror" 
        element={
          <PrivateRoute requiredRole="STUDENT">
            <TrustMirror />
          </PrivateRoute>
        } 
      />

      <Route 
        path="/student/deception-playbook" 
        element={
          <PrivateRoute>
            <DeceptionPlaybook />
          </PrivateRoute>
        } 
      />
      
      <Route 
        path="/teacher/deception-playbook" 
        element={
          <PrivateRoute>
            <DeceptionPlaybook />
          </PrivateRoute>
        } 
      />
      
      <Route 
        path="/teacher/dashboard" 
        element={
          <PrivateRoute requiredRole="TEACHER">
            <TeacherDashboard />
          </PrivateRoute>
        } 
      />
      
      <Route 
        path="/teacher/student/:studentId/trust-mirror" 
        element={
          <PrivateRoute requiredRole="TEACHER">
            <StudentTrustMirrorView />
          </PrivateRoute>
        } 
      />
      
      <Route 
        path="/teacher/trust-mirror-info" 
        element={
          <PrivateRoute requiredRole="TEACHER">
            <TrustMirrorInfo />
          </PrivateRoute>
        } 
      />
      
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  )
}

export default App
