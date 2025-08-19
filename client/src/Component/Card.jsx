import React from 'react'
import Swal from 'sweetalert2'

const Card = (props) => {
  const handleDelete = async () => {
    const result = await Swal.fire({
      title: '🗑️ Delete Restaurant?',
      text: `Are you sure you want to delete "${props.title}"? This action cannot be undone!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, Delete It!',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
      focusCancel: true
    });

    if (result.isConfirmed) {
      try {
        // Show loading
        Swal.fire({
          title: 'Deleting...',
          text: 'Please wait while we delete the restaurant.',
          allowOutsideClick: false,
          allowEscapeKey: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });

        const response = await fetch(`http://localhost:3001/restaurants/${props.id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          await Swal.fire({
            title: 'Deleted! 🎉',
            text: 'Restaurant has been successfully deleted.',
            icon: 'success',
            confirmButtonColor: '#10b981',
            timer: 2000,
            timerProgressBar: true
          });
          
          if (props.onDelete) {
            props.onDelete(props.id);
          }
        } else {
          await Swal.fire({
            title: 'Error! ❌',
            text: 'Failed to delete restaurant. Please try again.',
            icon: 'error',
            confirmButtonColor: '#ef4444'
          });
        }
      } catch (error) {
        console.error('Error deleting restaurant:', error);
        await Swal.fire({
          title: 'Error! ❌',
          text: 'Something went wrong. Please check your connection and try again.',
          icon: 'error',
          confirmButtonColor: '#ef4444'
        });
      }
    }
  };

  const handleEdit = () => {
    window.location.href = `/update-restaurant/${props.id}`;
  };

  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
      <figure className="h-48 overflow-hidden">
        <img
          src={props.img}
          alt={props.title}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
          }}
        />
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title text-lg font-bold text-base-content line-clamp-2">
          {props.title}
        </h2>
        <div className="flex items-center gap-2 mb-4">
          <span className="badge badge-primary badge-sm">🍽️</span>
          <p className="text-sm text-base-content/70 line-clamp-1">{props.type}</p>
        </div>
        <div className="card-actions justify-between items-center">
          <div className="flex gap-2">
            <button 
              onClick={handleEdit}
              className="btn btn-outline btn-warning btn-sm hover:btn-warning"
              title="Edit Restaurant"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit
            </button>
            <button 
              onClick={handleDelete}
              className="btn btn-outline btn-error btn-sm hover:btn-error"
              title="Delete Restaurant"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card