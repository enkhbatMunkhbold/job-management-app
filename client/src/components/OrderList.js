import { useEffect, useState, useCallback, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import OrderCard from './OrderCard'
import UserContext from '../context/UserContext'
import '../styling/orderList.css'

function OrderList() {
  const { clientId, jobId } = useParams()
  const { refreshUser } = useContext(UserContext)
  const [ orders, setOrders ] = useState([])
  const [ client, setClient ] = useState(null)
  const [ job, setJob ] = useState(null)
  const [ loading, setLoading ] = useState(true)
  const [ error, setError ] = useState(null)
  const [ deletingOrderId, setDeletingOrderId ] = useState(null)

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true)
      let response
      let data

      if (clientId) {
        // Fetch client orders
        response = await fetch(`/clients/${clientId}/orders`)
        if (!response.ok) {
          throw new Error('Failed to fetch client orders')
        }
        data = await response.json()
        setOrders(data.orders)
        setClient(data.client)
      } else if (jobId) {
        // Fetch job orders
        response = await fetch(`/jobs/${jobId}/orders`)
        if (!response.ok) {
          throw new Error('Failed to fetch job orders')
        }
        data = await response.json()
        setOrders(data.orders)
        setJob(data.job)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [clientId, jobId])

  useEffect(() => {
    if (clientId || jobId) {
      fetchOrders()
    }
  }, [clientId, jobId, fetchOrders])

  const handleDeleteOrder = async (orderId) => {
    try {
      setDeletingOrderId(orderId)
      const response = await fetch(`/orders/${orderId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to delete order')
      }

      // Remove the deleted order from the state
      setOrders(orders.filter(order => order.id !== orderId))
      
      // Refresh user context to update client/job data in other components
      await refreshUser()
    } catch (err) {
      setError(err.message)
    } finally {
      setDeletingOrderId(null)
    }
  }

  const handleEditOrder = (order) => {
    // Navigate to edit order page
    window.location.href = `/edit_order/${order.id}`
  }

  if (loading) return <div className="loading">Loading...</div>
  if (error) return <div className="error">Error: {error}</div>
  if (!client && !job) return <div className="error">Not found</div>

  const title = client ? `Orders for ${client.name}` : `Orders for ${job.title}`
  const noOrdersMessage = client ? "No orders found for this client." : "No orders found for this job."

  return (
    <div className="order-list-container">
      <div className="order-list-header">
        <h1>{title}</h1>
        <Link to="/profile" className="back-button">
          Back to Profile
        </Link>
      </div>
      
      {orders.length === 0 ? (
        <div className="no-orders">
          <p>{noOrdersMessage}</p>
        </div>
      ) : (
        <div className="orders-grid">
          {orders.map(order => (
            <OrderCard
              key={order.id}
              order={order}
              onDelete={handleDeleteOrder}
              isDeleting={deletingOrderId === order.id}
              onEdit={handleEditOrder}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default OrderList 