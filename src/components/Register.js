import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authServiceInstance from '../services/auth.service';

import '../styles/Form.css'

const Register = () => {
  let [name, setName] = useState('');
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [confirmedPassword, setConfirmedPassword] = useState('');

  let navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await authServiceInstance.register(name, email, password);
      console.log(response);

      if (response.message === "User created successfully") {
        await authServiceInstance.login(email, password)
        // Redirect to the home page
        navigate('/profile');
      }
    } catch (error) {
      console.error('Register error:', error);
      alert('Register error:', error);
    }
  };

  return (
    <div className="register">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <label htmlFor="name">Name:</label>
        <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} required />

        <label htmlFor="email">Email:</label>
        <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label htmlFor="password">Password:</label>
        <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input type="password" name="confirmPassword" id="confirmPassword" value={confirmedPassword} onChange={(e) => setConfirmedPassword(e.target.value)} required />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
