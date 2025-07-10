import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import '../styling/clientDetails.css'

function ClientDetails() {
  const { clientId } = useParams()
  const [ client, setClient ] = useState(null)
  const [ loading, setLoading ] = useState(true)
  const [ error, setError ] = useState(null)

  useEffect(() => {
    const fetchClientDetails = async (clientId) => {
      try {
        setLoading(true)
        const response = await fetch(`/clients/${clientId}`)

        if(!response.ok) {
          throw new Error('Failed to fetch client details')
        }

        const clientData = await response.json()
        setClient(clientData)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (clientId) {
      fetchClientDetails(clientId)
    }
  }, [clientId])

  if (loading) return <div className="loading">Loading...</div>
  if (error) return <div className="error">Error: {error}</div>
  if (!client) return <div className="error">Client not found</div>

  return (
    <div className="client-details-container">
      <div className="client-details-card">
        <div className="client-details-content">
          <div className="client-details-header">
            <h1>{client.name}</h1>
          </div>
          
          <div className="client-details-body">
            <div className="client-section">
              <h3>Contact Information</h3>
              <div className="client-info-grid">
                <div className="info-item">
                  <span className="label">Email:</span>
                  <span className="value">{client.email}</span>
                </div>
                <div className="info-item">
                  <span className="label">Phone:</span>
                  <span className="value">{client.phone}</span>
                </div>
                <div className="info-item">
                  <span className="label">Client ID:</span>
                  <span className="value">{client.id}</span>
                </div>
              </div>
            </div>
            
            <div className="client-section">
              <h3>Notes</h3>
              <p>{client.notes}</p>
            </div>
            
            <div className="client-section">
              <h3>Associated Jobs</h3>
              {client.jobs && client.jobs.length > 0 ? (
                <div className="jobs-list">
                  {client.jobs.map((job) => (
                    <div key={job.id} className="job-item">
                      <Link to={`/jobs/${job.id}`} className="job-link">
                        {job.title}
                      </Link>
                      <span className="job-category">{job.category}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-jobs">
                  No jobs associated with this client yet.
                </div>
              )}
            </div>
          </div>
          
          <div className="client-details-actions">
            <button className="back-button" onClick={() => window.history.back()}>
              Back to Profile
            </button>
            <Link to={`/clients/${client.id}/orders`} className="view-orders-button">
              View Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClientDetails