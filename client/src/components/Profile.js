import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from '../context/UserContext'
import JobCard from './JobCard'
import '../styling/jobCard.css'
import '../styling/profile.css'

const Profile = () => {
  const navigate = useNavigate()
  const { user } = useContext(UserContext)

  if (!user) {
    navigate('/login')
    return
  }

  const jobCards = user.jobs.map( job => {
    return <JobCard key={job.id} job={job} showDetails={true} />
  })

  const capitalizedUsername = user?.username ? 
    user.username.charAt(0).toUpperCase() + user.username.slice(1).toLowerCase() : 'User'

  return (
    <div className="profile-container">
      <h1 className="profile-header">Welcome, {capitalizedUsername}</h1>
      <div className="profile-buttons">
        <button className="profile-button">Show My Jobs</button>
        <button className="profile-button">Show My Clients</button>
      </div>
      <div className="jobs-container">
        {jobCards}
      </div>
    </div>
  )
}

export default Profile