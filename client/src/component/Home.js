import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./home.css"
function Home() {
    const navigate = useNavigate();
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
    <div className="home">
    <h1 className="home-title">Home</h1>
    <button className="logout-button" onClick={logout}>Logout</button>  
  </div>
  )
}

export default Home