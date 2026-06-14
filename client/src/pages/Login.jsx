import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await API.post('/auth/login', formData);
      login(res.data.user, res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <div style={{ width: '100%', maxWidth: '400px', padding: '40px', background: 'white', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <h2 style={{ marginBottom: '20px', textAlign: 'center', color: '#2d3748' }}>Welcome Back</h2>
        {error && (
          <p style={{ color: '#e53e3e', textAlign: 'center', marginBottom: '15px', backgroundColor: '#fff5f5', padding: '8px', borderRadius: '6px' }}>
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '10px 12px' }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '10px 12px' }}
            />
          </div>
          <button type="submit" style={{ width: '100%', padding: '12px' }}>
            Login
          </button>
        </form>
        <p style={{ marginTop: '15px', textAlign: 'center', color: '#718096' }}>
          Don't have an account? <Link to="/register" style={{ color: '#4299e1', fontWeight: '600' }}>Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;