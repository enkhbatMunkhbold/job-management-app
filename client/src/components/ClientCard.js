import "../styling/clientCard.css";

const ClientCard = ({ client }) => {
  return (
    <div className={`client-card client-card-detailed`}>
      <div className="client-card-content">
        <div className="client-header">
          <h3>{client.name}</h3>
        </div>
        <hr className="client-divider" />
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
        </div>
      </div>
    </div>
  );
};

export default ClientCard;