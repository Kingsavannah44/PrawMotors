import React, { useState } from 'react';

const AdminLogin = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [showForgot, setShowForgot] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Entered username:', credentials.username);
    console.log('Entered password:', credentials.password);
    
    if (credentials.username.trim() === 'admin' && credentials.password.trim() === 'admin123') {
      localStorage.setItem('isAdmin', 'true');
      onLogin();
    } else {
      alert(`Invalid credentials. You entered: ${credentials.username} / ${credentials.password}`);
    }
  };

  const handleForgotPassword = () => {
    alert('Default Admin Credentials:\nUsername: admin\nPassword: admin123\n\nContact system administrator to reset password.');
    setShowForgot(false);
  };

  return (
    <div className="admin-login">
      <div className="login-form">
        <h2>🔐 Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={credentials.username}
            onChange={(e) => setCredentials({...credentials, username: e.target.value})}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
            required
          />
          <button type="submit" className="btn-primary">Login</button>
        </form>
        <div className="login-footer">
          <p className="login-hint">Username: admin | Password: admin123</p>
          <button 
            type="button" 
            className="forgot-btn"
            onClick={handleForgotPassword}
          >
            Forgot Password?
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;