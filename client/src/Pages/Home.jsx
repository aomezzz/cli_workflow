import React, { useState, useEffect } from 'react'
import Navbar from '../Component/Navbar'
import Restaurant from '../Component/Restaurant'
import { Link } from 'react-router'
import Swal from 'sweetalert2'

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRestaurants = async () => {
    try {
      const response = await fetch('http://localhost:3001/restaurants');
      const data = await response.json();
      setRestaurants(data);
      setFilteredRestaurants(data);
      setLoading(false);
    } catch (error) {
      console.error('Error ไม่สามารถดู restaurants ได้:', error);
      setLoading(false);
      
      // Show error with SweetAlert2
      await Swal.fire({
        title: 'Connection Error! 🌐',
        text: 'Unable to load restaurants. Please check if the server is running and try again.',
        icon: 'error',
        confirmButtonColor: '#ef4444',
        confirmButtonText: 'Retry',
        showCancelButton: true,
        cancelButtonText: 'Continue Offline',
        cancelButtonColor: '#6b7280'
      }).then((result) => {
        if (result.isConfirmed) {
          setLoading(true);
          fetchRestaurants();
        }
      });
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    if (searchTerm === '') {
      setFilteredRestaurants(restaurants);
    } else {
      const filtered = restaurants.filter(restaurant =>
        restaurant.title.toLowerCase().includes(searchTerm) ||
        restaurant.type.toLowerCase().includes(searchTerm)
      );
      setFilteredRestaurants(filtered);
    }
  };

  const handleRefresh = () => {
    setLoading(true);
    fetchRestaurants();
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-base-200'>
        <Navbar />
        <div className="min-h-screen py-8 flex justify-center items-center">
          <div className="text-center">
            <span className="loading loading-spinner loading-lg"></span>
            <p className="text-lg mt-4">Loading restaurants...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-base-200'>
      <Navbar />
      
      {/* Hero Section */}
      <div className="hero bg-gradient-to-r from-primary to-secondary text-primary-content py-16">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">🍽️ Grab Restaurant</h1>
            <p className="mb-5 text-lg">
              Discover amazing restaurants and delicious food in your area. 
              Explore, add, and manage your favorite dining spots!
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/add-restaurant" className="btn btn-accent btn-lg">
                Add Restaurant
              </Link>
              <Link to="/search" className="btn btn-outline btn-lg">
                Advanced Search
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className='container mx-auto px-4'>
        {/* Stats Section */}
        <div className="stats shadow w-full my-8">
          <div className="stat">
            <div className="stat-figure text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </div>
            <div className="stat-title">Total Restaurants</div>
            <div className="stat-value text-primary">{restaurants.length}</div>
            <div className="stat-desc">Available in our database</div>
          </div>
          
          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <div className="stat-title">Showing</div>
            <div className="stat-value text-secondary">{filteredRestaurants.length}</div>
            <div className="stat-desc">Restaurants found</div>
          </div>
          
          <div className="stat">
            <div className="stat-figure text-accent">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"></path>
              </svg>
            </div>
            <div className="stat-title">Categories</div>
            <div className="stat-value text-accent">{[...new Set(restaurants.map(r => r.type))].length}</div>
            <div className="stat-desc">Different food types</div>
          </div>
        </div>

        {/* Search Section */}
        <div className="card bg-base-100 shadow-xl mb-8">
          <div className="card-body">
            <h2 className="card-title justify-center text-2xl mb-4">Find Your Perfect Restaurant</h2>
            <div className="flex justify-center items-center">
              <div className="relative w-full max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input 
                  type="search" 
                  placeholder="Search by name or food type..." 
                  className="input input-bordered w-full pl-10 pr-4"
                  onChange={handleSearch}
                />
              </div>
              <div className="ml-4">
                <button 
                  className="btn btn-outline btn-sm"
                  onClick={handleRefresh}
                  disabled={loading}
                >
                  {loading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    'Refresh'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Link to="/add-restaurant" className="card bg-primary text-primary-content shadow-lg hover:shadow-xl transition-shadow">
            <div className="card-body text-center">
              <h3 className="card-title justify-center">➕ Add Restaurant</h3>
              <p>Share your favorite restaurant with others</p>
            </div>
          </Link>
          
          <Link to="/search" className="card bg-secondary text-secondary-content shadow-lg hover:shadow-xl transition-shadow">
            <div className="card-body text-center">
              <h3 className="card-title justify-center">🔍 Advanced Search</h3>
              <p>Use filters to find exactly what you want</p>
            </div>
          </Link>
          
          <Link to="/about-us" className="card bg-accent text-accent-content shadow-lg hover:shadow-xl transition-shadow">
            <div className="card-body text-center">
              <h3 className="card-title justify-center">ℹ️ About Us</h3>
              <p>Learn more about our project and team</p>
            </div>
          </Link>
        </div>

        {/* New Feature Alert */}
        <div className="alert alert-info shadow-lg mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <div className="flex-1">
            <h3 className="font-bold">🍭 New Feature: SweetAlert2!</h3>
            <div className="text-xs">We've upgraded all alerts and notifications with beautiful, user-friendly modals. Check out the demo!</div>
          </div>
          <div className="flex-none">
            <Link to="/sweetalert-demo" className="btn btn-sm btn-outline">
              Try Demo
            </Link>
          </div>
        </div>

        {/* Restaurants Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-center mb-6">Featured Restaurants</h2>
          <Restaurant 
            restaurants={filteredRestaurants} 
            onRefresh={handleRefresh}
          />
        </div>
      </div>
    </div>
  )
}

export default Home