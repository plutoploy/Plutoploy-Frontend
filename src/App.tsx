// import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AuthPage from './Pages/AuthPage'
import DashboardPage from './Pages/DashboardPage'
import DeploymentsPage from './Pages/DeploymentsPage'
import EnvironmentPage from './Pages/EnvironmentPage'
import NewProjectPage from './Pages/NewProjectPage'
import NotFound from './Pages/NotFound'
import ProjectDetailsPage from './Pages/ProjectDetailsPage'
import ProjectsPage from './Pages/ProjectsPage'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/new" element={<NewProjectPage />} />
          <Route path="/projects/:id" element={<ProjectDetailsPage />} />
          <Route path="/deployments" element={<DeploymentsPage />} />
          <Route path="/deployments/:id" element={<ProjectDetailsPage />} />
          <Route path="/environment" element={<EnvironmentPage />} />
          {/* <Route path="/settings" element={<SettingsPage />} /> */}
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
