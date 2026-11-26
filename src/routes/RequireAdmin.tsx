import RoleRoute from './RoleRoute'

export default function RequireAdmin() {
  return <RoleRoute allowedRoles={['ADMIN']} />
}