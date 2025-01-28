import { Users } from '../../shared'
import { 
  FaUser, 
  FaEnvelope,
  FaCalendarPlus,
  FaCalendarMinus,
  FaIdCard,
  FaUserTag,
  FaCheckCircle,
} from 'react-icons/fa'

export const UserDetailPageContent = ({
  user
}: { user: Users | null }) => {
  if (user === null) return null

  const userFields = [
    { icon: FaIdCard, label: 'ID usuario', value: user.id_user },
    { icon: FaUser, label: 'DNI usuario', value: user.dni_user },
    { icon: FaUser, label: 'Nombre usuario', value: user.fullname_user },
    { icon: FaEnvelope, label: 'Email', value: user.email_user },
    { icon: FaUserTag, label: 'Tipo usuario', value: user.type_user },
    { icon: FaCheckCircle, label: 'Categoría', value: user.category_user },
    { icon: FaCheckCircle, label: 'Estado', value: user.state_user },
    { icon: FaCalendarPlus, label: 'Fecha Alta', value: new Date(user.fecha_alta_user).toLocaleDateString() },
    { icon: FaCalendarMinus, label: 'Fecha Baja', value: user.fecha_baja_user? new Date(user.fecha_baja_user).toLocaleDateString() : ' N/A' }
  ]
 
  return (
    <div className='user-detail-page-content'>
      <div className="user-detail-container">
        <h1 className="page-title">Detalle del usuario</h1>

        <div className="user-info-list">
          {userFields.map((field) => {
            const Icon = field.icon
            return (
              <div key={field.label} className="info-row">
                <div className="icon-container">
                  <Icon className="field-icon" />
                </div>
                <div className="field-content">
                  <span className="field-label">{field.label}:</span>
                  <span className="field-value">{String(field.value) || 'N/A'}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}