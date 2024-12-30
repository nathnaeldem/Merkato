import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Admin.css';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/bermenah/login.php', {
        username: credentials.username,
        password: credentials.password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const { token, role } = response.data;
  
      // Debugging logs
      console.log('Token:', token);
      console.log('Role:', role);
  
      // Store the token and role
      localStorage.setItem('authToken', token);
      localStorage.setItem('userRole', role);
  
      if (role === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/login');
      }
    } catch (err) {
      console.error(err);
      setError('Invalid username or password. Please try again.');
    }
  };
  

  return (
    <div className="admin-login-container">
      <form className="admin-login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="admin-form-group">
          <input
            type="text"
            placeholder="Username"
            value={credentials.username}
            onChange={(e) =>
              setCredentials({ ...credentials, username: e.target.value })
            }
            required
          />
        </div>
        <div className="admin-form-group">
          <input
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            required
          />
        </div>
        <button type="submit" className="admin-submit-btn">
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
