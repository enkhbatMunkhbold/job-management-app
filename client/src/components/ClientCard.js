import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import "../styling/clientCard.css";

const ClientCard = ({ client, onDelete }) => {

  return (
    <div className={`client-card client-card-detailed`}>
      <div className="client-card-content">
        <div className="client-header">
          <h3>{client.name}</h3>
        </div>
        <div className="client-info">
          <div className="client-info-title">
            <h4>Client Info</h4>
          </div>
          <div className="info-item">
            <span className="label">Email:</span>
            <span className="value">{client.email}</span>
          </div>
          <div className="info-item">
            <span className="label">Phone:</span>
            <span className="value">{client.phone}</span>
          </div>
          <div className="info-item">
            <span className="label">Notes:</span>
            <span className="value">{client.notes}</span>
          </div>
          {client.jobs && client.jobs.length > 0 && (
            <div className="info-item">
              <span className="label">Jobs:</span>
              <span className="value">
                {client.jobs.map((job, index) => (
                  <span key={job.id}>
                    <Link to={`/jobs/${job.id}`} className="job-link">
                      {job.title}
                    </Link>
                    {index < client.jobs.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </span>
            </div>
          )}
        </div>
        
        <div className="client-actions">
          <Link to={`/clients/${client.id}/orders`} className="orders-button">
            View Orders
          </Link>
          <button 
            className="delete-button"
            onClick={() => onDelete && onDelete(client.id)}
            title="Delete Client"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientCard;