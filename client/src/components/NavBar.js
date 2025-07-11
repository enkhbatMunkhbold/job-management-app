import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from '../context/UserContext'
import '../styling/navbar.css'

const NavBar = () => {
  const { user, setUser } = useContext(UserContext)
  const [ profile, setProfile ] = useState(true)
  const navigate = useNavigate()

  console.log('NavBar - user:', user)
  console.log('NavBar - profile state:', profile)

  const handleSignOut = () => {
    fetch('/logout', {
      method: 'DELETE',
    }).then(() => {
      setUser(null)
      navigate('/login')
    })
  }

  const handleHome = () => {
    setProfile(!profile)
    if (profile) {
      navigate('/profile')
    } else {
      navigate('/home')
    }
   }

  return (
    <nav className="navbar">
      <h1>JOB MANAGEMENT APP</h1>
      {user && (
        <div className="nav-buttons">
          <button className="nav-button home_button" onClick={handleHome}>
            {profile ? 'Profile' : 'Home'}
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