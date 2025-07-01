import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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

  const handleHome = () => {
    navigate('/home')
  }

  return (
    <nav className="navbar">
      <h1>JOB MANAGEMENT APP</h1>
      {user && (
        <div className="nav-buttons">
          <button className="nav-button home-button" onClick={handleHome}>
            Home
          </button>
          <button className="nav-button signout-button" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>        
      )}
      <hr className="navbar-divider" />
    </nav>
  )
}

export default NavBar