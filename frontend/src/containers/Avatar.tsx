import React from 'react'
import { UserContextType } from '../hooks/UserContext'

interface AvatarProps {
  user: UserContextType['user']
}

const readableRoleByRole = {
  dt: 'Director técnico',
  player: 'Jugador',
  admin: 'Administrador'
}

export const Avatar: React.FC<AvatarProps> = ({ user }) => {
  if (!user) return null

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const getRandomColor = (name: string) => {
    let hash = 0
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash)
    }
    const hue = hash % 360
    return `hsl(${hue}, 70%, 60%)`
  }

  const initials = getInitials(user.fullname_user)
  const backgroundColor = getRandomColor(user.fullname_user)
  const readableRole = readableRoleByRole[user.type_user as keyof typeof readableRoleByRole] || 'User'

  return (
    <div className="avatar-container">
      {user.avatarUrl && typeof user.avatarUrl === 'string' ? (
        <img 
          src={user.avatarUrl} 
          alt={`${user.fullname_user}'s avatar`} 
          className="avatar-image"
        />
      ) : (
        <div 
          className="avatar-initials"
          style={{ backgroundColor }}
          aria-label={`${user.fullname_user}'s avatar`}
        >
          {initials}
        </div>
      )}
      <div className="avatar-details">
        <span className="avatar-name">{user.fullname_user}</span>
        <span className="avatar-role">{readableRole}</span>
      </div>
    </div>
  )
}