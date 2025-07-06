import { Link } from "react-router-dom";
import "../styling/jobCard.css";

const JobCard = ({ job, showDetails = false }) => {
  console.log("Job from JobCard:", job)
  return (
    <div className={`job-card ${showDetails ? 'job-card-detailed' : ''}`}>
      <div className="job-card-content">
        <div className="job-header">
          <h3>{job.title}</h3>
        </div>
        
        {showDetails && (
          <>
            <hr className="job-divider" />
            <div className="job-info">
              <div className="info-item">
                <span className="label">Category:</span>
                <span className="value">{job.category}</span>
              </div>
              <div className="info-item">
                <span className="label">Description:</span>
                <span className="value">{job.description}</span>
              </div>
              {job.duration && (
                <div className="info-item">
                  <span className="label">Duration:</span>
                  <span className="value">{job.duration}</span>
                </div>
              )}
              {job.clients && job.clients.length > 0 && (
                <div className="info-item">
                  <span className="label">Clients:</span>
                  <span className="value">
                    {job.clients.map((client, index) => (
                      <span key={client.id}>
                        {client.name}
                        {index < job.clients.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </span>
                </div>
              )}
            </div>
          </>
        )}
        
        <div className="job-actions">
          {!showDetails && (
            <Link to={`/jobs/${job.id}`} className="view-profile">
              View Details
            </Link>
          )}
          {!showDetails && (
            <Link to={`/new_order?job=${job.id}`} className="book-appointment">
              Create Order
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobCard;