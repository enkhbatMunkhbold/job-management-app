import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../styling/jobDetails.css'

function JobDetails() {
  const { jobId } = useParams()
  const [ job, setJob ] = useState(null)
  const [ loading, setLoading ] = useState(true)
  const [ error, setError ] = useState(null)

  useEffect(() => {
    const fetchJobDetails = async (jobId) => {
      try {
        setLoading(true)
        const response = await fetch(`/jobs/${jobId}`)

        if(!response.ok) {
          throw new Error('Failed to fetch job details')
        }

        const jobData = await response.json()
        setJob(jobData)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (jobId) {
      fetchJobDetails(jobId)
    }
  }, [jobId])

  if (loading) return <div className="loading">Loading...</div>
  if (error) return <div className="error">Error: {error}</div>
  if (!job) return <div className="error">Job not found</div>

  return (
    <div className="job-details-container">
      <div className="job-details-card">
        <div className="job-details-content">
          <div className="job-details-header">
            <h1>{job.title}</h1>
          </div>
          
          <div className="job-details-body">
            <div className="job-section">
              <h3>Description</h3>
              <p>{job.description}</p>
            </div>
            
            <div className="job-section">
              <h3>Job Information</h3>
              <div className="job-info-grid">
                <div className="info-item">
                  <span className="label">Job ID:</span>
                  <span className="value">{job.id}</span>
                </div>
                <div className="info-item">
                  <span className="label">Category:</span>
                  <span className="value">{job.category}</span>
                </div>
                <div className="info-item">
                  <span className="label">Job Length:</span>
                  <span className="value">{job.duration}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="job-details-actions">
            <button className="back-button" onClick={() => window.history.back()}>
              Back to Profile
            </button>
            <button className="create-order-button" onClick={() => window.location.href = `/new_order?job=${job.id}`}>
              Create Order
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobDetails