import React, { useState, useEffect } from 'react';
import Navbar from '../Component/Navbar';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalRestaurants: 0,
    myRestaurants: 0,
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      Swal.fire({
        title: 'Access Denied! 🔒',
        text: 'Please login to access the dashboard.',
        icon: 'warning',
        confirmButtonColor: '#f59e0b',
        confirmButtonText: 'Go to Login'
      }).then(() => {
        window.location.href = '/login';
      });
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      fetchDashboardData();
    } catch (error) {
      console.error('Error parsing user data:', error);
      handleLogout();
    }
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch restaurants count
      const restaurantsResponse = await fetch('http://localhost:3001/restaurants');
      const restaurants = await restaurantsResponse.json();
      
      setStats({
        totalRestaurants: restaurants.length,
        myRestaurants: restaurants.length, // In real app, filter by user
        recentActivity: [
          { action: 'Added restaurant', item: 'New Thai Restaurant', time: '2 hours ago' },
          { action: 'Updated restaurant', item: 'Pizza Corner', time: '1 day ago' },
          { action: 'Deleted restaurant', item: 'Old Cafe', time: '3 days ago' }
        ]
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: 'Logout Confirmation',
      text: 'Are you sure you want to logout?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, Logout',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      await Swal.fire({
        title: 'Logged Out! 👋',
        text: 'You have been successfully logged out.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      });

      window.location.href = '/login';
    }
  };

  const getRoleDisplay = (roleId) => {
    const roles = {
      '1': { name: 'Admin', color: 'badge-error', icon: '👑' },
      '2': { name: 'User', color: 'badge-primary', icon: '👤' },
      '3': { name: 'Viewer', color: 'badge-secondary', icon: '👁️' }
    };
    return roles[roleId] || { name: 'Unknown', color: 'badge-ghost', icon: '❓' };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200">
        <Navbar />
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="text-center">
            <span className="loading loading-spinner loading-lg"></span>
            <p className="text-lg mt-4">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  const roleInfo = getRoleDisplay(user.roleId);

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar user={user} onLogout={handleLogout} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {user.username}! 👋
              </h1>
              <div className="flex items-center gap-3">
                <span className={`badge ${roleInfo.color} gap-2`}>
                  {roleInfo.icon} {roleInfo.name}
                </span>
                <span className="text-gray-600">{user.email}</span>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="btn btn-outline btn-error"
            >
              🚪 Logout
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="stat bg-base-100 shadow-lg rounded-box">
            <div className="stat-figure text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div className="stat-title">Total Restaurants</div>
            <div className="stat-value text-primary">{stats.totalRestaurants}</div>
            <div className="stat-desc">Available in platform</div>
          </div>

          <div className="stat bg-base-100 shadow-lg rounded-box">
            <div className="stat-figure text-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="stat-title">My Contributions</div>
            <div className="stat-value text-secondary">{stats.myRestaurants}</div>
            <div className="stat-desc">Restaurants you added</div>
          </div>

          <div className="stat bg-base-100 shadow-lg rounded-box">
            <div className="stat-figure text-accent">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="stat-title">Role Access</div>
            <div className="stat-value text-accent">{roleInfo.name}</div>
            <div className="stat-desc">Your permission level</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Quick Actions Card */}
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h2 className="card-title">🚀 Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <Link to="/add-restaurant" className="btn btn-primary btn-outline">
                  ➕ Add Restaurant
                </Link>
                <Link to="/search" className="btn btn-secondary btn-outline">
                  🔍 Search
                </Link>
                <Link to="/" className="btn btn-accent btn-outline">
                  🏠 Browse All
                </Link>
                <Link to="/about-us" className="btn btn-info btn-outline">
                  ℹ️ About Us
                </Link>
              </div>
            </div>
          </div>

          {/* Recent Activity Card */}
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h2 className="card-title">📈 Recent Activity</h2>
              <div className="space-y-3 mt-4">
                {stats.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 hover:bg-base-200 rounded">
                    <div className="avatar placeholder">
                      <div className="bg-neutral text-neutral-content rounded-full w-8">
                        <span className="text-xs">📝</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.item}</p>
                    </div>
                    <span className="text-xs text-gray-400">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Account Information */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title">👤 Account Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <h3 className="font-semibold mb-3">Personal Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Username:</span>
                    <span className="font-medium">{user.username}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium">{user.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Role:</span>
                    <span className={`badge ${roleInfo.color} gap-1`}>
                      {roleInfo.icon} {roleInfo.name}
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Quick Settings</h3>
                <div className="space-y-3">
                  <button className="btn btn-outline btn-sm w-full">
                    ✏️ Edit Profile
                  </button>
                  <button className="btn btn-outline btn-sm w-full">
                    🔒 Change Password
                  </button>
                  <button className="btn btn-outline btn-sm w-full">
                    ⚙️ Account Settings
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
