
import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom" ; 
function LoginComp () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
const navigate = useNavigate()
  axios.defaults.withCredentials = true;
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
   
axios.post("http://localhost:5000/login" ,{ email , password})
.then((result) => {
    if(result.data.status === "Success"){
        if(result.data.role === "admin"){
            navigate("/dashboard")
        } else {
            navigate("/home")
        }
    }
    
}).catch((err) => {
    console.log(err.message);
});
   

   
    
    setEmail('');
    setPassword('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="chk" aria-hidden="true">
        Login
      </label>
      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        name="pswd"
        placeholder="Password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginComp ;
