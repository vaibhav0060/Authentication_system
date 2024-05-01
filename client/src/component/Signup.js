import React, { useState } from 'react';
import './Login.css'; // Import your CSS file
import LoginComp from './Login'; // Import the Register component (if needed)
import axios from 'axios';
function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
axios.post("http://localhost:5000/register" ,{name , email , password})
.then((result) => {
    console.log(result.data);
    alert(" User is created")
}).catch((err) => {
    console.log(err.message);
});
   

    // Optionally clear input fields after successful signup
    // alert('User Registered successfully!');
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="main">
        <input type="checkbox" id="chk" aria-hidden="true" />
      <div className="signup">
        <form onSubmit={handleSignup}>
          <label htmlFor="chk" aria-hidden="true">Sign Up</label>
          <input
            type="text"
            name="txt"
            placeholder="User name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <button type="submit">Sign Up</button>
        </form>
      </div>
      <div className="login">
       <LoginComp/>
       </div>
       </div>
  );
}

export default Signup;
