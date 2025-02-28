import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import { useUser } from '../recruiter/UserContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Login API call using axios
      const loginResponse = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/login/`,
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const { access: token, recruiter_id } = loginResponse.data;
      localStorage.setItem('authToken', token); // Save token in localStorage

      // Fetch user details using axios
      const userResponse = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/recruiters/${recruiter_id}/`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const userData = userResponse.data;
      localStorage.setItem('user', JSON.stringify(userData));
      navigate('/'); // Redirect to home page
    } catch (err) {
      console.log(err)
      setError(err.response?.data?.detail || 'Login failed. Please try again.'); // Better error handling
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Password Input */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Enter your password"
            required
          />
        </div>

        {/* Error Message */}
        {error && <div className="text-red-500 text-sm">{error}</div>}

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full p-2 text-white rounded-md ${
              loading ? 'bg-gray-400' : 'bg-blue-600'
            }`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
