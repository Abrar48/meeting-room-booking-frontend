import RoleRoute from './RoleRoute'

export default function RequireTeamMember() {
  return <RoleRoute allowedRoles={['TEAM_MEMBER']} />
}