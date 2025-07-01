import { useEffect, useState, useContext } from 'react'
import UserContext from '../context/UserContext'
import JobCard from './JobCard'
import '../styling/jobCard.css'

const Home = () => {
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
    return <JobCard key={job.id} job={job} />
  })

  const capitalizedUsername = user?.username ? 
    user.username.charAt(0).toUpperCase() + user.username.slice(1).toLowerCase() : 
    'User'

  return (
    <div>
      <h1>Welcome, {capitalizedUsername}</h1>
      <div className="jobs-container">
        {jobCards}
      </div>
    </div>
  )
}

export default Home