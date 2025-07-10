import "../styling/orderCard.css";

const OrderCard = ({ order, onDelete, isDeleting }) => {
  return (
    <div className="order-card">
      <div className="order-header">
        <h3>{order.job.title}</h3>
        <span className={`status status-${order.status.replace(' ', '-')}`}>
          {order.status}
        </span>
      </div>
      
      <div className="order-info">
        <div className="info-item">
          <span className="label">Description:</span>
          <span className="value">{order.description}</span>
        </div>
        <div className="info-item">
          <span className="label">Location:</span>
          <span className="value">{order.location}</span>
        </div>
        <div className="info-item">
          <span className="label">Rate:</span>
          <span className="value">{order.rate}</span>
        </div>
        <div className="info-item">
          <span className="label">Start Date:</span>
          <span className="value">{new Date(order.start_date).toLocaleDateString()}</span>
        </div>
        <div className="info-item">
          <span className="label">Client:</span>
          <span className="value">{order.client.name}</span>
        </div>
      </div>
      
      <div className="order-actions">
        <button
          className="delete-button"
          onClick={() => onDelete(order.id)}
          disabled={isDeleting}
        >
          {isDeleting ? 'Deleting...' : 'Delete Order'}
        </button>
      </div>
    </div>
  );
};

export default OrderCard;
