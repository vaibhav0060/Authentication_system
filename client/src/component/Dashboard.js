import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./dashboard.css"
function Dashboard() {
  const [suc, setSuc] = useState();
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("http://localhost:5000/dashboard");
        if (response.data === "Success") {
          setSuc("Success");
        } else {
          navigate("/"); // Redirect to login on failure
        }
      } catch (err) {
        console.error(err); // Log error for debugging
        navigate("/error"); // Redirect to error page on failure
      }
    };

    checkAuth();
  }, []);

  const logout = async () => {
    try {
      const response = await axios.get('http://localhost:5000/logout');
      if (response.data.status === 'Success') {
        // Redirect to login page
        navigate('/');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="dashboard">
      {suc && <h1 className="dashboard-title">Dashboard</h1>} 
      <button className="logout-button" onClick={logout}>Logout</button>  
    </div>  
    </>
  );
}

export default Dashboard;
