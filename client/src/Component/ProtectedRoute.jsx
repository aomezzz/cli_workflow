import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Swal from 'sweetalert2';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { isAuthenticated, user, hasRole, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg"></span>
          <p className="text-lg mt-4">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated()) {
    Swal.fire({
      title: 'Access Denied! 🔒',
      text: 'Please login to access this page.',
      icon: 'warning',
      confirmButtonColor: '#f59e0b',
      confirmButtonText: 'Go to Login'
    }).then(() => {
      window.location.href = '/login';
    });
    return null;
  }

  if (requiredRole && !hasRole(requiredRole)) {
    Swal.fire({
      title: 'Access Denied! ⛔',
      text: 'You do not have permission to access this page.',
      icon: 'error',
      confirmButtonColor: '#ef4444',
      confirmButtonText: 'Go Back'
    }).then(() => {
      window.location.href = '/dashboard';
    });
    return null;
  }

  return children;
};

export default ProtectedRoute;
