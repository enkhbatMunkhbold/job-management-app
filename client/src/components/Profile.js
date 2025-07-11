import { useContext, useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from '../context/UserContext'
import JobCard from './JobCard'
import ClientCard from './ClientCard'
import '../styling/jobCard.css'
import '../styling/profile.css'

const Profile = () => {
  const navigate = useNavigate()
  const { user, refreshUser } = useContext(UserContext)
  const [ showClients, setShowClients ] = useState(false)
  const [ showCreateOptions, setShowCreateOptions ] = useState(false)
  const createButtonRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (createButtonRef.current && !createButtonRef.current.contains(event.target)) {
        setShowCreateOptions(false)
      }
    }

    if (showCreateOptions) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showCreateOptions])

  const handleDeleteJob = async (jobId) => {
    try {
      const response = await fetch(`/jobs/${jobId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to delete job')
      }

      // Refresh user context to update the UI
      await refreshUser()
    } catch (err) {
      console.error('Error deleting job:', err)
      alert('Failed to delete job: ' + err.message)
    }
  }

   if (!user) {
    navigate('/login')
    return
  }

  const handleDeleteClient = async (clientId) => {
    try {
      const response = await fetch(`/clients/${clientId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to delete client')
      }

      // Refresh user context to update the UI
      await refreshUser()
    } catch (err) {
      console.error('Error deleting client:', err)
      alert('Failed to delete client: ' + err.message)
    }
  }

  const jobCards = user.jobs.map( job => {
    return <JobCard key={job.id} job={job} showDetails={true} onDelete={handleDeleteJob} />
  })

  const clientCards = user.clients.map( client => {
    return <ClientCard key={client.id} client={client} onDelete={handleDeleteClient} />
  })

  const capitalizedUsername = user?.username ? 
    user.username.charAt(0).toUpperCase() + user.username.slice(1).toLowerCase() : 'User'

  const handleCreateClick = () => {
    setShowCreateOptions(!showCreateOptions)
  }

  const handleCreateJob = () => {
    navigate('/new-job')
  }

  const handleCreateClient = () => {
    navigate('/new-client')
  }

  return (
    <div className="profile-container">
      <h1 className="profile-header">Welcome, {capitalizedUsername}</h1>
      <div className="profile-buttons">
        <button 
          className={`profile-button ${!showClients ? 'active' : ''}`} 
          onClick={() => setShowClients(false)}
        >
          Show My Jobs
        </button>
        <button 
          className={`profile-button ${showClients ? 'active' : ''}`} 
          onClick={() => setShowClients(true)}
        >
          Show My Clients
        </button>
        <div className="create-button-container" ref={createButtonRef}>
          <button 
            className={`profile-button ${showCreateOptions ? 'active' : ''}`}
            onClick={handleCreateClick}
          >
            Create
          </button>
          {showCreateOptions && (
            <div className="create-options">
              <button 
                className="create-option"
                onClick={handleCreateJob}
              >
                New Job
              </button>
              <button 
                className="create-option"
                onClick={handleCreateClient}
              >
                New Client
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="jobs-container">
        {showClients ? clientCards : jobCards}
      </div>
    </div>
  )
}

export default Profile