
import { Navigate, Outlet } from 'react-router-dom'
import { isRegistered, isLoggedIn } from '../utils/auth'

export default function ProtectedRoute() {
  if (!isRegistered()) return <Navigate to="/daftar" replace />
  if (!isLoggedIn())  return <Navigate to="/masuk" replace />
  return <Outlet />
}
