import React, { useState } from 'react';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Show loading
      Swal.fire({
        title: 'Logging in...',
        text: 'Please wait while we verify your credentials.',
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      // TODO: Replace with actual backend endpoint
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const userData = await response.json();
        
        // Store user data and token in localStorage
        localStorage.setItem('token', userData.token);
        localStorage.setItem('user', JSON.stringify(userData.user));

        await Swal.fire({
          title: 'Welcome Back! 👋',
          text: `Hello ${userData.user.username}!`,
          icon: 'success',
          confirmButtonColor: '#10b981',
          timer: 2000,
          timerProgressBar: true
        });

        // Redirect to dashboard or home
        window.location.href = '/dashboard';
      } else {
        const error = await response.json();
        await Swal.fire({
          title: 'Login Failed! ❌',
          text: error.message || 'Invalid username or password',
          icon: 'error',
          confirmButtonColor: '#ef4444'
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      await Swal.fire({
        title: 'Connection Error! 🔌',
        text: 'Unable to connect to the server. Please check your connection.',
        icon: 'error',
        confirmButtonColor: '#ef4444'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl">
        <div className="card-body">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-primary mb-2">🍽️ Grab Restaurant</h1>
            <h2 className="text-xl font-semibold mb-2">Welcome Back!</h2>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Username</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  className="input input-bordered w-full pl-10"
                  value={loginData.username}
                  onChange={handleChange}
                  required
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Password Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Password</span>
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="input input-bordered w-full pl-10"
                  value={loginData.password}
                  onChange={handleChange}
                  required
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex justify-between items-center">
              <label className="label cursor-pointer">
                <input type="checkbox" className="checkbox checkbox-primary checkbox-sm" />
                <span className="label-text ml-2">Remember me</span>
              </label>
              <Link to="/forgot-password" className="link link-primary text-sm">
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <div className="form-control mt-6">
              <button
                type="submit"
                className={`btn btn-primary w-full ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : '🔐 Sign In'}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="divider">or</div>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="link link-primary font-semibold">
                Sign up here
              </Link>
            </p>
          </div>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-info/10 rounded-lg">
            <h3 className="font-semibold text-info mb-2">🧪 Demo Credentials</h3>
            <div className="text-sm space-y-1">
              <p><strong>Admin:</strong> admin / password123</p>
              <p><strong>User:</strong> user / password123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
