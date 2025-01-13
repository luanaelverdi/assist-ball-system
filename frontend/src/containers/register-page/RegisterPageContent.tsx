import { RegisterUserForm } from './RegisterUserForm'
// import { DniUserForm } from './DniUserForm'
// import { LicenseUserForm } from './LicenseUserForm'
import '../../styles/views/register-page.css'

export const RegisterPageContent = () => {
  return (
    <div className="register-page-content">
      <RegisterUserForm />
      {/* <DniUserForm />
      <LicenseUserForm /> */}
      {/* <div className="register-actions">
        <button className="cancel-button">Cancelar</button>
        <button className="confirm-button">Confirmar</button>
      </div> */}
    </div>
  )
}