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
import RoleRoute from './RoleRoute'
import RoleRedirect from './RoleRedirect'

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

        {/* Admin-only routes */}
        <Route
          element={
            <RoleRoute allowedRoles={['ADMIN']} />
          }
        >
          <Route
            path="/admin"
            element={
              <Navigate
                to={ROUTES.ADMIN_DASHBOARD}
                replace
              />
            }
          />

          <Route
            path={ROUTES.ADMIN_DASHBOARD}
            element={<AdminDashboard />}
          />
        </Route>

        {/* Team-member-only routes */}
        <Route
          element={
            <RoleRoute allowedRoles={['TEAM_MEMBER']} />
          }
        >
          <Route
            path="/member"
            element={
              <Navigate
                to={ROUTES.MEMBER_DASHBOARD}
                replace
              />
            }
          />

          <Route
            path={ROUTES.MEMBER_DASHBOARD}
            element={<MemberDashboard />}
          />
        </Route>
      </Route>

      {/* Unknown routes */}
      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </Routes>
  )
}