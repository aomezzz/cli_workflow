import React, { useState, useEffect } from 'react';
import Navbar from '../Component/Navbar';
import Card from '../Component/Card';
import Swal from 'sweetalert2';
import { API_ENDPOINTS } from '../config/api';

const Search = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [loading, setLoading] = useState(true);

  const fetchRestaurants = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.RESTAURANTS.BASE);
      const data = await response.json();
      setRestaurants(data);
      setFilteredRestaurants(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      setLoading(false);
      
      // Show error with SweetAlert2
      await Swal.fire({
        title: 'Connection Error! 🌐',
        text: 'Unable to load restaurants for search. Please check if the server is running.',
        icon: 'error',
        confirmButtonColor: '#ef4444',
        confirmButtonText: 'Retry',
        showCancelButton: true,
        cancelButtonText: 'Go to Home',
        cancelButtonColor: '#6b7280'
      }).then((result) => {
        if (result.isConfirmed) {
          setLoading(true);
          fetchRestaurants();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          window.location.href = '/';
        }
      });
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  useEffect(() => {
    let filtered = restaurants;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(restaurant =>
        restaurant.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter(restaurant =>
        restaurant.type.toLowerCase().includes(selectedType.toLowerCase())
      );
    }

    setFilteredRestaurants(filtered);
  }, [searchTerm, selectedType, restaurants]);

  const handleRefresh = () => {
    setLoading(true);
    fetchRestaurants();
  };

  const handleDelete = (deletedId) => {
    handleRefresh();
  };

  // Get unique types for filter dropdown
  const uniqueTypes = [...new Set(restaurants.map(restaurant => restaurant.type))];

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Search Restaurants</h1>
          <p className="text-lg text-gray-600">Find your favorite restaurant</p>
        </div>

        {/* Search Filters */}
        <div className="card bg-base-100 shadow-xl mb-8">
          <div className="card-body">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              {/* Search Input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Search by name or type</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter restaurant name or food type..."
                  className="input input-bordered w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Type Filter */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Filter by type</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option value="all">All Types</option>
                  {uniqueTypes.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Clear Button */}
              <div className="form-control">
                <button
                  className="btn btn-outline"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedType('all');
                  }}
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">
              Search Results ({filteredRestaurants.length} found)
            </h2>
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

        {/* Restaurant Grid */}
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <span className="loading loading-spinner loading-lg"></span>
              <p className="mt-4 text-lg">Loading restaurants...</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRestaurants.length > 0 ? (
              filteredRestaurants.map((restaurant) => (
                <Card
                  key={restaurant.id}
                  id={restaurant.id}
                  title={restaurant.title}
                  type={restaurant.type}
                  img={restaurant.img}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-gray-500">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <h3 className="text-lg font-medium">No restaurants found</h3>
                  <p className="text-sm">Try adjusting your search criteria</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
