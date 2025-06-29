import { Link } from "react-router-dom";
import "../styling/jobCard.css";

const JobCard = ({ job }) => {
  return (
    <div className="job-card">
      <div className="job-card-content">
        <div className="job-header">
          <h3>{job.title}</h3>
          <span className="specialty">{job.description}</span>
        </div>
        <div className="job-info">
          <div className="info-item">
            <span className="label">Job Type:</span>
            <span className="value">{job.title}</span>
          </div>
          <div className="info-item">
            <span className="label">Description:</span>
            <span className="value">{job.description}</span>
          </div>
        </div>
        <div className="job-actions">
          <Link to={`/jobs/${job.id}`} className="view-profile">
            View Details
          </Link>
          <Link to={`/orders/new?job=${job.id}`} className="book-appointment">
            Create Order
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobCard;