import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from '../context/UserContext'
import '../styling/navbar.css'

const NavBar = () => {
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const handleSignOut = () => {
    fetch('/logout', {
      method: 'DELETE',
    }).then(() => {
      setUser(null)
      navigate('/login')
    })
  }

  return (
    <nav className="navbar">
      <h1>DOCTOR'S APPOINTMENTS</h1>
      {user && (
        <button className="signout-button" onClick={handleSignOut}>
          Sign Out
        </button>
      )}
      <hr className="navbar-divider" />
    </nav>
  )
}

export default NavBar