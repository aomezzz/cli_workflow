import React, { useState, useEffect } from 'react'
import { Link } from 'react-router'
import Swal from 'sweetalert2'

const Navbar = ({ user, onLogout }) => {
    const [currentUser, setCurrentUser] = useState(user || null);

    useEffect(() => {
        // If user prop is not provided, check localStorage
        if (!user) {
            const token = localStorage.getItem('token');
            const userData = localStorage.getItem('user');
            
            if (token && userData) {
                try {
                    const parsedUser = JSON.parse(userData);
                    setCurrentUser(parsedUser);
                } catch (error) {
                    console.error('Error parsing user data:', error);
                }
            }
        } else {
            setCurrentUser(user);
        }
    }, [user]);

    const MenuItem = [
        { name: "Add restaurant", url: "/add-restaurant" },
        { name: "Update Restaurant", url: "/update-restaurant" },
        { name: "Search", url: "/search" },
        { name: "SweetAlert Demo", url: "/sweetalert-demo" },
        { name: "About Us", url: "/about-us" },
    ];

    const handleLogout = async () => {
        if (onLogout) {
            onLogout();
        } else {
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
                setCurrentUser(null);
                
                await Swal.fire({
                    title: 'Logged Out! 👋',
                    text: 'You have been successfully logged out.',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                });

                window.location.href = '/login';
            }
        }
    };

    const getRoleDisplay = (roleId) => {
        const roles = {
            '1': { name: 'Admin', color: 'badge-error', icon: '👑' },
            '2': { name: 'User', color: 'badge-primary', icon: '👤' },
            '3': { name: 'Viewer', color: 'badge-secondary', icon: '👁️' }
        };
        return roles[roleId] || { name: 'User', color: 'badge-ghost', icon: '👤' };
    };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> 
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            {MenuItem.map((item, index) => (
                <li key={index}>
                    <Link to={item.url}>
                        {item.name}
                    </Link>
                </li>
            ))}
            {currentUser && (
                <>
                    <div className="divider my-1"></div>
                    <li>
                        <Link to="/dashboard">
                            🏠 Dashboard
                        </Link>
                    </li>
                </>
            )}
          </ul>
        </div>
      </div>
      
      <div className="navbar-center">
        <Link to="/" className="btn btn-ghost text-xl">
          🍽️ Grab Restaurant
        </Link>
      </div>
      
      <div className="navbar-end space-x-2">
        {currentUser ? (
            // Authenticated user menu
            <>
                <div className="dropdown dropdown-end hidden md:block">
                    <div className="flex items-center gap-3">
                        <Link to="/add-restaurant" className="btn btn-outline btn-primary btn-sm">
                            ➕ Add
                        </Link>
                        <Link to="/search" className="btn btn-outline btn-accent btn-sm">
                            🔍 Search
                        </Link>
                    </div>
                </div>
                
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full bg-primary text-primary-content flex items-center justify-center">
                            <span className="text-sm font-bold">
                                {currentUser.username.charAt(0).toUpperCase()}
                            </span>
                        </div>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-60 p-2 shadow">
                        <li className="menu-title">
                            <div className="flex flex-col">
                                <span className="font-semibold">{currentUser.username}</span>
                                <span className="text-xs text-gray-500">{currentUser.email}</span>
                                <span className={`badge ${getRoleDisplay(currentUser.roleId).color} badge-xs gap-1 mt-1`}>
                                    {getRoleDisplay(currentUser.roleId).icon} {getRoleDisplay(currentUser.roleId).name}
                                </span>
                            </div>
                        </li>
                        <div className="divider my-1"></div>
                        <li><Link to="/dashboard">🏠 Dashboard</Link></li>
                        <li><Link to="/profile">👤 Profile</Link></li>
                        <li><Link to="/settings">⚙️ Settings</Link></li>
                        <div className="divider my-1"></div>
                        <li>
                            <button onClick={handleLogout} className="text-error">
                                🚪 Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </>
        ) : (
            // Guest user menu
            <>
                <Link to="/add-restaurant" className="btn btn-outline btn-primary btn-sm hidden md:inline-flex">
                    ➕ Add restaurant
                </Link>
                <Link to="/search" className="btn btn-outline btn-accent btn-sm hidden md:inline-flex">
                    🔍 Search
                </Link>
                <Link to="/sweetalert-demo" className="btn btn-outline btn-secondary btn-sm hidden lg:inline-flex">
                    � SweetAlert Demo
                </Link>
                <div className="divider divider-horizontal mx-1"></div>
                <Link to="/login" className="btn btn-primary btn-sm">
                    🔐 Login
                </Link>
                <Link to="/register" className="btn btn-outline btn-sm">
                    🚀 Register
                </Link>
            </>
        )}
      </div>
    </div>
  )
}

export default Navbar