import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // To redirect after login

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Hook to handle navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Make the API call to the /login endpoint
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      // Check if the response is successful
      if (!response.ok) {
        throw new Error('Login failed. Please check your credentials.');
      }

      // Parse the response and get the token
      try{
      const data = await response.json();
      console.log(data)
      const token = data.access; // Assuming the token is in `data.token`
        localStorage.setItem('authToken', token);
      } catch(error){
        console.log(error)
      }
      // Store the token in localStorage

      // Redirect to another page (e.g., dashboard) upon successful login
      navigate('/'); // Change this route based on your app's routes
    } catch (error) {
      setError(error.message); // Set the error message if login fails
    } finally {
      setLoading(false); // Stop the loading spinner
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
            name="email"
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
            name="password"
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
            className="w-full p-2 bg-blue-600 text-white rounded-md"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
