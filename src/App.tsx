// import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AuthPage from './Pages/AuthPage'
import AuthCallbackPage from './Pages/AuthCallbackPage'
import DashboardPage from './Pages/DashboardPage'
import DeploymentsPage from './Pages/DeploymentsPage'
import EnvironmentPage from './Pages/EnvironmentPage'
import NewProjectPage from './Pages/NewProjectPage'
import NotFound from './Pages/NotFound'
import ProjectDetailsPage from './Pages/ProjectDetailsPage'
import ProjectsPage from './Pages/ProjectsPage'
import ProtectedRoute from './components/ProtectedRoute'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/auth/callback" element={<AuthCallbackPage />} />
          
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/projects" element={<ProtectedRoute><ProjectsPage /></ProtectedRoute>} />
          <Route path="/projects/new" element={<ProtectedRoute><NewProjectPage /></ProtectedRoute>} />
          <Route path="/projects/:id" element={<ProtectedRoute><ProjectDetailsPage /></ProtectedRoute>} />
          <Route path="/deployments" element={<ProtectedRoute><DeploymentsPage /></ProtectedRoute>} />
          <Route path="/deployments/:id" element={<ProtectedRoute><ProjectDetailsPage /></ProtectedRoute>} />
          <Route path="/environment" element={<ProtectedRoute><EnvironmentPage /></ProtectedRoute>} />
          {/* <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} /> */}
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
