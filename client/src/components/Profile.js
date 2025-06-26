import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from '../context/UserContext'
import DoctorCard from './DoctorCard'
import '../styling/DoctorCard.css'

const Profile = () => {
  const navigate = useNavigate()
  const { user } = useContext(UserContext)
  const [ doctors, setDoctors ] = useState([])

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }

    fetch('/doctors')
    .then(res => {
      if (res.ok) {
        res.json().then(data => {
          setDoctors(data)
        })
      } else {
        console.error("Error fetching doctors:", res.statusText)
        setDoctors([])
      }
    })
    .catch(error => {
      console.error("Error fetching list of doctors:", error)
      setDoctors([])
    })
  }, [user, navigate])

  if (!user) {
    return null
  }

  const doctorCards = doctors.map( doctor => {
    return <DoctorCard key={doctor.id} doctor={doctor} />
  })

  const capitalizedUsername = user.username.charAt(0).toUpperCase() + user.username.slice(1).toLowerCase()

  return (
    <div>
      <h1>Welcome, {capitalizedUsername}</h1>
      <div className="doctors-container">
        {doctorCards}
      </div>
    </div>
  )
}

export default Profile