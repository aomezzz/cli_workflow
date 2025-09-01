import React, { useState } from 'react';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import { API_ENDPOINTS } from '../config/api';

const Register = () => {
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    roleId: '2' // Default to user role (assuming 1=admin, 2=user)
  });
  const [isLoading, setIsLoading] = useState(false);

  const roles = [
    { id: '1', name: 'Admin', description: 'Full access to all features' },
    { id: '2', name: 'User', description: 'Can add and manage restaurants' },
    { id: '3', name: 'Viewer', description: 'Can only view restaurants' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const validateForm = () => {
    if (registerData.password !== registerData.confirmPassword) {
      Swal.fire({
        title: 'Password Mismatch! ❌',
        text: 'Password and confirm password do not match.',
        icon: 'error',
        confirmButtonColor: '#ef4444'
      });
      return false;
    }

    if (registerData.password.length < 6) {
      Swal.fire({
        title: 'Weak Password! ⚠️',
        text: 'Password must be at least 6 characters long.',
        icon: 'warning',
        confirmButtonColor: '#f59e0b'
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);

    try {
      // Show loading
      Swal.fire({
        title: 'Creating Account...',
        text: 'Please wait while we create your account.',
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      // Prepare data for backend (exclude confirmPassword)
      const { confirmPassword, ...dataToSend } = registerData;

      // TODO: Replace with actual backend endpoint when backend friend creates it
      const response = await fetch(API_ENDPOINTS.AUTH.REGISTER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        const result = await response.json();

        await Swal.fire({
          title: 'Account Created! 🎉',
          text: 'Your account has been created successfully. You can now sign in.',
          icon: 'success',
          confirmButtonColor: '#10b981',
          confirmButtonText: 'Go to Login'
        });

        // Redirect to login page
        window.location.href = '/login';
      } else {
        const error = await response.json();
        await Swal.fire({
          title: 'Registration Failed! ❌',
          text: error.message || 'An error occurred during registration',
          icon: 'error',
          confirmButtonColor: '#ef4444'
        });
      }
    } catch (error) {
      console.error('Registration error:', error);
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
    <div className="min-h-screen bg-gradient-to-br from-secondary/10 to-accent/10 flex items-center justify-center p-4">
      <div className="card w-full max-w-lg bg-base-100 shadow-2xl">
        <div className="card-body">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-secondary mb-2">🍽️ Grab Restaurant</h1>
            <h2 className="text-xl font-semibold mb-2">Create Account</h2>
            <p className="text-gray-600">Join our restaurant management platform</p>
          </div>

          {/* Register Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Username *</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="username"
                  placeholder="Choose a username"
                  className="input input-bordered w-full pl-10"
                  value={registerData.username}
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

            {/* Email Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Email *</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="input input-bordered w-full pl-10"
                  value={registerData.email}
                  onChange={handleChange}
                  required
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Role Selection */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Role *</span>
              </label>
              <select
                name="roleId"
                className="select select-bordered w-full"
                value={registerData.roleId}
                onChange={handleChange}
                required
              >
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name} - {role.description}
                  </option>
                ))}
              </select>
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Password *</span>
                </label>
                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    placeholder="Create password"
                    className="input input-bordered w-full pl-10"
                    value={registerData.password}
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

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Confirm Password *</span>
                </label>
                <div className="relative">
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    className="input input-bordered w-full pl-10"
                    value={registerData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="form-control">
              <label className="label cursor-pointer justify-start">
                <input type="checkbox" className="checkbox checkbox-primary checkbox-sm" required />
                <span className="label-text ml-2">
                  I agree to the{' '}
                  <Link to="/terms" className="link link-primary">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="link link-primary">
                    Privacy Policy
                  </Link>
                </span>
              </label>
            </div>

            {/* Register Button */}
            <div className="form-control mt-6">
              <button
                type="submit"
                className={`btn btn-secondary w-full ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : '🚀 Create Account'}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="divider">or</div>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="link link-secondary font-semibold">
                Sign in here
              </Link>
            </p>
          </div>

          {/* Password Requirements */}
          <div className="mt-4 p-4 bg-warning/10 rounded-lg">
            <h3 className="font-semibold text-warning mb-2">📋 Password Requirements</h3>
            <ul className="text-sm space-y-1">
              <li>• At least 6 characters long</li>
              <li>• Should contain letters and numbers</li>
              <li>• Avoid common passwords</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
