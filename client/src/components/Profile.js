import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from '../context/UserContext'
import JobCard from './JobCard'
import '../styling/jobCard.css'

const Profile = () => {
  const navigate = useNavigate()
  const { user } = useContext(UserContext)
  const [ jobs, setJobs ] = useState([])

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }

    fetch('/jobs')
    .then(res => {
      if (res.ok) {
        res.json().then(data => {
          setJobs(data)
        })
      } else {
        console.error("Error fetching jobs:", res.statusText)
        setJobs([])
      }
    })
    .catch(error => {
      console.error("Error fetching list of jobs:", error)
      setJobs([])
    })
  }, [user, navigate])

  if (!user) {
    return null
  }

  const jobCards = jobs.map( job => {
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