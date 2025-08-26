import React from 'react'
import { useParams, Link } from 'react-router'
import Navbar from '../Component/Navbar'
import Swal from 'sweetalert2'
import { API_ENDPOINTS } from '../config/api'

const UpdateRestaurant = () => {
    // Get the restaurant ID
    const { id } = useParams();
    const [restaurant, setRestaurant] = React.useState({
        title: '',
        type: '',
        img: '',
    });
    const [loading, setLoading] = React.useState(true);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    
    // Get the restaurant by ID
    React.useEffect(()=>{
        const fetchRestaurant = async () => {
            try {
                const response = await fetch(API_ENDPOINTS.RESTAURANTS.BY_ID(id));
                if (response.ok) {
                    const data = await response.json();
                    setRestaurant(data);
                } else {
                    await Swal.fire({
                        title: 'Restaurant Not Found! ❌',
                        text: 'The restaurant you are looking for does not exist.',
                        icon: 'error',
                        confirmButtonColor: '#ef4444'
                    });
                    window.location.href = '/';
                }
            } catch (error) {
                console.error('Error fetching restaurant:', error);
                await Swal.fire({
                    title: 'Error! ❌',
                    text: 'Failed to load restaurant data. Please check your connection.',
                    icon: 'error',
                    confirmButtonColor: '#ef4444'
                });
            } finally {
                setLoading(false);
            }
        };
        
        fetchRestaurant();
    }, [id]);
    
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
                title: 'Updating Restaurant...',
                text: 'Please wait while we update the restaurant information.',
                allowOutsideClick: false,
                allowEscapeKey: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            const response = await fetch(API_ENDPOINTS.RESTAURANTS.BY_ID(id), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(restaurant),
            });

            if (response.ok) {
                await Swal.fire({
                    title: 'Updated! 🎉',
                    text: 'Restaurant information has been updated successfully!',
                    icon: 'success',
                    confirmButtonColor: '#10b981',
                    confirmButtonText: 'Go to Home'
                });
                window.location.href = '/';
            } else {
                await Swal.fire({
                    title: 'Error! ❌',
                    text: 'Failed to update restaurant. Please try again.',
                    icon: 'error',
                    confirmButtonColor: '#ef4444'
                });
            }
        } catch (error) {
            console.log('Error updating restaurant:', error);
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

    if (loading) {
        return (
            <div className="min-h-screen bg-base-200">
                <Navbar />
                <div className="flex justify-center items-center min-h-[50vh]">
                    <div className="text-center">
                        <span className="loading loading-spinner loading-lg"></span>
                        <p className="text-lg mt-4">Loading restaurant data...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-200">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <div className="breadcrumbs text-sm mb-6">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li>Update Restaurant</li>
                        <li className="text-primary">{restaurant.title}</li>
                    </ul>
                </div>

                <div className="flex flex-col items-center justify-center">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold mb-2">Update Restaurant</h1>
                        <p className="text-lg text-gray-600">Edit restaurant information</p>
                    </div>

                    <div className="card w-full max-w-2xl bg-base-100 shadow-xl">
                        <figure className="px-10 pt-10">
                            <div className="avatar">
                                <div className="w-32 h-32 rounded-xl">
                                    <img
                                        src={restaurant.img || "https://via.placeholder.com/400x300?text=No+Image"}
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
                                            {isSubmitting ? 'Updating Restaurant...' : '✏️ Update Restaurant'}
                                        </button>
                                        <Link to="/" className="btn btn-outline">
                                            Cancel
                                        </Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Warning */}
                    <div className="card w-full max-w-2xl bg-warning/10 mt-6">
                        <div className="card-body">
                            <h3 className="card-title text-warning">⚠️ Important</h3>
                            <p className="text-sm">
                                Make sure all information is accurate before updating. 
                                Changes will be reflected immediately across the platform.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateRestaurant