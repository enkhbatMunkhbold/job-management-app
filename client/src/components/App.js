import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./NavBar";
import Register from "./Register";
import Home from "./Home";
import Login from "./Login";
import Profile from "./Profile";
import JobDetails from "./JobDetails";
import ClientDetails from "./ClientDetails";
import NewOrder from "./NewOrder";
import OrderList from "./OrderList";
import NewJob from "./NewJob";
import NewClient from "./NewClient";
import UserContext, { UserProvider } from '../context/UserContext';

function AppContent() { 
  const { user, isLoading } = useContext(UserContext)

   if (isLoading) {
    return <div>Loading...</div>;
  }

  return (    
    <Router>
      <NavBar />
      <div className="main-content">
        {user ? (
          <Routes>
            
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/jobs/:jobId" element={<JobDetails />} />
            <Route path="/clients/:clientId" element={<ClientDetails />} />
            <Route path="/clients/:clientId/orders" element={<OrderList />} />
            <Route path="/jobs/:jobId/orders" element={<OrderList />} />              
            <Route path="/new_order" element={<NewOrder />} />
            <Route path="/new_job" element={<NewJob />} />
            <Route path="/new_client" element={<NewClient />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Navigate to="/register" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        )}
        
      </div>
    </Router>       
  )
}

function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  )
}

export default App;
