import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import authServiceInstance from '../services/auth.service';

const Login = () => {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');

  let navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await authServiceInstance.login(email, password);
      console.log(response);

      if (response.token) {
        navigate('/');
      } 

    } catch (error) {
      console.error('Login error:', error);
      alert('Login error:', error)
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label htmlFor="password">Password:</label>
        <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
