import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import '../styling/orderList.css'

function OrderList() {
  const { clientId } = useParams()
  const [ orders, setOrders ] = useState([])
  const [ client, setClient ] = useState(null)
  const [ loading, setLoading ] = useState(true)
  const [ error, setError ] = useState(null)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/clients/${clientId}/orders`)

        if (!response.ok) {
          throw new Error('Failed to fetch orders')
        }

        const data = await response.json()
        setOrders(data.orders)
        setClient(data.client)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (clientId) {
      fetchOrders()
    }
  }, [clientId])

  if (loading) return <div className="loading">Loading...</div>
  if (error) return <div className="error">Error: {error}</div>
  if (!client) return <div className="error">Client not found</div>

  return (
    <div className="order-list-container">
      <div className="order-list-header">
        <h1>Orders for {client.name}</h1>
        <Link to="/profile" className="back-button">
          Back to Profile
        </Link>
      </div>
      
      {orders.length === 0 ? (
        <div className="no-orders">
          <p>No orders found for this client.</p>
        </div>
      ) : (
        <div className="orders-grid">
          {orders.map(order => (
            <div key={order.id} className="order-card">
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
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default OrderList 