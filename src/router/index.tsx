import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from '../layout/AppLayout';
import ProtectedRoute from '../components/common/ProtectedRoute';

// Page components
import DashboardPage from '../pages/dashboard/DashboardPage';
import ProjectsPage from '../pages/projects/ProjectsPage';
import KanbanPage from '../pages/tasks/KanbanPage';
import ChatPage from '../pages/chat/ChatPage';
import NotificationsPage from '../pages/notifications/NotificationsPage';
import SettingsPage from '../pages/settings/SettingsPage';
import AdminPage from '../pages/admin/AdminPage';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Auth Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected Routes (Requires valid authentication token) */}
      <Route element={<ProtectedRoute />}>
        {/* Seamless Animated App Frame */}
        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/supernova" element={<Navigate to="/dashboard" replace />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/kanban" element={<KanbanPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Route>
      </Route>

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};
export default AppRoutes;

