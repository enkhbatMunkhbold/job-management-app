import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./NavBar";
import Register from "./Register";
import Home from "./Home";
import Login from "./Login";
import Profile from "./Profile";
import JobDetails from "./JobDetails";
import NewOrder from "./NewOrder";
import OrderList from "./OrderList";
import UserContext from '../context/UserContext';

function App() {
  const [ user, setUser ] = useState(null)
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    fetch("/check_session")
      .then((r) => {
        if (r.ok) {
          return r.json().then(user => {
            setUser(user)
            setIsLoading(false);
          })          
        } else if (r.status === 204) {
          setUser(null)
          setIsLoading(false)
        } else {
          throw new Error(`HTTP error! Status: ${r.status}`)
        }
      })
      .catch(error => {
        console.error("Error checking session:", error);
        setUser(null);
        setIsLoading(false);
      });
  }, []);

   if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <NavBar />
        <div className="main-content">
          {user ? (
            <Routes>
              
              <Route path="/home" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/jobs/:id" element={<JobDetails />} />
              <Route path="/clients/:clientId/orders" element={<OrderList />} />              
              <Route path="/new_order" element={<NewOrder />} />
              <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/" element={<Navigate to={user ? "/login" : "/register"} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          )}
          
        </div>
      </Router>
    </UserContext.Provider>    
  )
}

export default App;
