import {
  Navigate,
  Route,
  Routes,
} from 'react-router'

import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import NotFoundPage from '../pages/NotFoundPage'
import ForbiddenPage from '../pages/ForbiddenPage'

import AdminDashboard from '../pages/admin/AdminDashboard'
import MemberDashboard from '../pages/member/MemberDashboard'

import ProtectedRoute from './ProtectedRoute'
import GuestRoute from './GuestRoute'
import RoleRedirect from './RoleRedirect'
import RequireAdmin from './RequireAdmin'
import RequireTeamMember from './RequireTeamMember'

import { ROUTES } from './routePaths'

import '../styles/route-pages.css'

export default function AppRoutes() {
  return (
    <Routes>
      {/* Application entry */}
      <Route
        path={ROUTES.ROOT}
        element={<RoleRedirect />}
      />

      {/* Guest-only routes */}
      <Route element={<GuestRoute />}>
        <Route
          path={ROUTES.LOGIN}
          element={<LoginPage />}
        />
      </Route>

      {/* Authentication-protected routes */}
      <Route element={<ProtectedRoute />}>
        {/* Shared authenticated routes */}
        <Route
          path={ROUTES.SESSION_CHECK}
          element={<HomePage />}
        />

        <Route
          path={ROUTES.FORBIDDEN}
          element={<ForbiddenPage />}
        />

        {/* Strict Admin Panel boundary */}
        <Route
          path="/admin"
          element={<RequireAdmin />}
        >
          <Route
            index
            element={
              <Navigate
                to={ROUTES.ADMIN_DASHBOARD}
                replace
              />
            }
          />

          <Route
            path="dashboard"
            element={<AdminDashboard />}
          />

          {/* Protect all unmatched admin routes */}
          <Route
            path="*"
            element={<NotFoundPage />}
          />
        </Route>

        {/* Strict Team Member Panel boundary */}
        <Route
          path="/member"
          element={<RequireTeamMember />}
        >
          <Route
            index
            element={
              <Navigate
                to={ROUTES.MEMBER_DASHBOARD}
                replace
              />
            }
          />

          <Route
            path="dashboard"
            element={<MemberDashboard />}
          />

          {/* Protect all unmatched member routes */}
          <Route
            path="*"
            element={<NotFoundPage />}
          />
        </Route>
      </Route>

      {/* Public unknown routes */}
      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </Routes>
  )
}