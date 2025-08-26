import React from 'react'
import Navbar from '../Component/Navbar'
import { Link } from 'react-router'
import Swal from 'sweetalert2'
import { API_ENDPOINTS } from '../config/api'

const AddRestaurant = () => {
    const [restaurant, setRestaurant] = React.useState({
        title: '',
        type: '',
        img: '',
    });
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setRestaurant({...restaurant, [name]: value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            // Show loading
            Swal.fire({
                title: 'Adding Restaurant...',
                text: 'Please wait while we add your restaurant.',
                allowOutsideClick: false,
                allowEscapeKey: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            const response = await fetch(API_ENDPOINTS.RESTAURANTS.BASE, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(restaurant),
            });

            if (response.ok) {
                await Swal.fire({
                    title: 'Success! 🎉',
                    text: 'Restaurant has been added successfully!',
                    icon: 'success',
                    confirmButtonColor: '#10b981',
                    showConfirmButton: true,
                    confirmButtonText: 'Add Another Restaurant',
                    showCancelButton: true,
                    cancelButtonText: 'Go to Home',
                    cancelButtonColor: '#6b7280',
                    reverseButtons: true
                }).then((result) => {
                    if (result.dismiss === Swal.DismissReason.cancel) {
                        window.location.href = '/';
                    }
                });
                
                setRestaurant({ title: '', type: '', img: '' });
            } else {
                await Swal.fire({
                    title: 'Error! ❌',
                    text: 'Failed to add restaurant. Please try again.',
                    icon: 'error',
                    confirmButtonColor: '#ef4444'
                });
            }
        } catch (error) {
            console.log('Error adding restaurant:', error);
            await Swal.fire({
                title: 'Error! ❌',
                text: 'Something went wrong. Please check your connection and try again.',
                icon: 'error',
                confirmButtonColor: '#ef4444'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-base-200">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <div className="breadcrumbs text-sm mb-6">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li>Add Restaurant</li>
                    </ul>
                </div>

                <div className="flex flex-col items-center justify-center">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold mb-2">Add New Restaurant</h1>
                        <p className="text-lg text-gray-600">Share your favorite restaurant with others!</p>
                    </div>

                    <div className="card w-full max-w-2xl bg-base-100 shadow-xl">
                        <figure className="px-10 pt-10">
                            <div className="avatar">
                                <div className="w-32 h-32 rounded-xl">
                                    <img
                                        src={restaurant.img || "https://via.placeholder.com/400x300?text=Upload+Image"}
                                        alt="Restaurant Preview"
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
                                        }}
                                    />
                                </div>
                            </div>
                        </figure>
                        
                        <div className="card-body">
                            <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold">Restaurant Name *</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter restaurant name..."
                                            className="input input-bordered w-full"
                                            name="title"
                                            onChange={handleChange}
                                            value={restaurant.title}
                                            required
                                        />
                                    </div>
                                    
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold">Food Type / Cuisine *</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="e.g., ชาไข่มุก, กาแฟ, ของหวาน..."
                                            className="input input-bordered w-full"
                                            name="type"
                                            onChange={handleChange}
                                            value={restaurant.type}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">Restaurant Image URL *</span>
                                    </label>
                                    <input
                                        type="url"
                                        placeholder="https://example.com/restaurant-image.jpg"
                                        className="input input-bordered w-full"
                                        name="img"
                                        onChange={handleChange}
                                        value={restaurant.img}
                                        required
                                    />
                                    <label className="label">
                                        <span className="label-text-alt">Tip: Use a high-quality image URL from the web</span>
                                    </label>
                                </div>

                                <div className="form-control mt-6">
                                    <div className="flex gap-4">
                                        <button 
                                            type="submit" 
                                            className={`btn btn-primary flex-1 ${isSubmitting ? 'loading' : ''}`}
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? 'Adding Restaurant...' : '🍽️ Add Restaurant'}
                                        </button>
                                        <Link to="/" className="btn btn-outline">
                                            Cancel
                                        </Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Quick Tips */}
                    <div className="card w-full max-w-2xl bg-info/10 mt-6">
                        <div className="card-body">
                            <h3 className="card-title text-info">📝 Quick Tips</h3>
                            <ul className="list-disc list-inside space-y-1 text-sm">
                                <li>Use a descriptive name that helps others identify the restaurant</li>
                                <li>Be specific about the food type (e.g., "Thai Food" instead of just "Food")</li>
                                <li>Use a high-quality image URL for better presentation</li>
                                <li>All fields are required to create a complete restaurant listing</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddRestaurant