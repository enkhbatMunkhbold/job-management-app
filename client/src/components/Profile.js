import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from '../context/UserContext'
import JobCard from './JobCard'
import '../styling/jobCard.css'

const Profile = () => {
  const navigate = useNavigate()
  const { user } = useContext(UserContext)

  if (!user) {
    navigate('/login')
    return
  }

  console.log('User from Profile:', user)

  const jobCards = user.jobs.map( job => {
    return <JobCard key={job.id} job={job} />
  })

  const capitalizedUsername = user?.username ? 
    user.username.charAt(0).toUpperCase() + user.username.slice(1).toLowerCase() : 'User'

  return (
    <div>
      <h1>Welcome, {capitalizedUsername}</h1>
      <div className="jobs-container">
        {jobCards}
      </div>
    </div>
  )
}

export default Profile