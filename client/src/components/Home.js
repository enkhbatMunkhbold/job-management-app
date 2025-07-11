import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from '../context/UserContext'
import JobCard from './JobCard'
import '../styling/jobCard.css'

const Home = () => {
  const navigate = useNavigate()
  const { user } = useContext(UserContext)
  const [ jobs, setJobs ] = useState([])

  useEffect(() => {
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
  }, [])

  const jobCards = jobs.map( job => {
    return <JobCard key={job.id} job={job} showDetails={false} />
  })

  const capitalizedUsername = user?.username ? 
    user.username.charAt(0).toUpperCase() + user.username.slice(1).toLowerCase() : 
    'User'

  return (
    <div className="home-container">
      <h1 className="home-header">Welcome, {capitalizedUsername}</h1>
      <div className="home-buttons">
        <button 
          onClick={() => navigate('/new_job')} 
          className="home-button"
        >
          Create New Job
        </button>
      </div>      
      <div className="jobs-container">
        {jobCards}
      </div>
    </div>
  )
}

export default Home