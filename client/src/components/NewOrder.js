import { useContext, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import UserContext from '../context/UserContext'
// import * as Yup from 'yup'
// import { useFormik } from 'formik'

const NewOrder = () => {
  const navigate = useNavigate()
  const { user } = useContext(UserContext)
  const [ job, setJob ] = useState({})
  const [ searchParams ] = useSearchParams()

  // Get job_id from URL query parameter
  const jobId = searchParams.get('job')
  
  console.log('Job ID from URL:', jobId)
  console.log('User from NewOrder:', user)

  useEffect(() => {
    fetch(`/jobs/${jobId}`)
    .then(res => {
      if(!res.ok) {
        throw new Error("Failed to fetch job")
      }
      return res.json()
    })
    .then(jobData => {
      setJob(jobData)
    })
    .catch(err => {
      <p style={{ color: 'red'}}>{err}</p>
    })
  }, [jobId])

  return (
    <div className="new-order-container">
      <h1>Create New Order</h1>
      <div className="selected-job-info">
        <h2>Selected Job: {job.title}</h2>
        <p><strong>Category:</strong> {job.category}</p>
        <p><strong>Description:</strong> {job.description}</p>
        {job.duration && (
          <p><strong>Duration:</strong> {job.duration}</p>
        )}
      </div>
      
      {/* Order form will go here */}
      <div className="order-form">
        <p>Order form coming soon...</p>
        <button onClick={() => navigate('/home')} className="back-button">
          Back to Home
        </button>
      </div>
    </div>
  )
}

export default NewOrder