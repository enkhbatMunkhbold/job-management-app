import { Link } from "react-router-dom";
import "../styling/jobCard.css";

const JobCard = ({ job, showDetails = false }) => {
  return (
    <div className={`job-card ${showDetails ? 'job-card-detailed' : ''}`}>
      <div className="job-card-content">
        <div className="job-header">
          <h3>{job.title}</h3>
          {/* <span className="specialty">{job.description}</span> */}
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
              {/* <div className="info-item">
                <span className="label">Job ID:</span>
                <span className="value">#{job.id}</span>
              </div> */}
            </div>
          </>
        )}
        
        <div className="job-actions">
          {!showDetails && (
            <Link to={`/jobs/${job.id}`} className="view-profile">
              View Details
            </Link>
          )}
          <Link to={`/orders/new?job=${job.id}`} className="book-appointment">
            Create Order
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobCard;