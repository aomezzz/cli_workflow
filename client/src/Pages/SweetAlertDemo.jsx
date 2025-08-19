import React from 'react';
import Navbar from '../Component/Navbar';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const SweetAlertDemo = () => {
  const showSuccessAlert = () => {
    Swal.fire({
      title: 'Success! 🎉',
      text: 'Your operation completed successfully!',
      icon: 'success',
      confirmButtonColor: '#10b981',
      timer: 3000,
      timerProgressBar: true
    });
  };

  const showErrorAlert = () => {
    Swal.fire({
      title: 'Error! ❌',
      text: 'Something went wrong. Please try again.',
      icon: 'error',
      confirmButtonColor: '#ef4444'
    });
  };

  const showWarningAlert = () => {
    Swal.fire({
      title: 'Warning! ⚠️',
      text: 'This action might have consequences.',
      icon: 'warning',
      confirmButtonColor: '#f59e0b'
    });
  };

  const showInfoAlert = () => {
    Swal.fire({
      title: 'Information ℹ️',
      text: 'Here is some useful information for you.',
      icon: 'info',
      confirmButtonColor: '#3b82f6'
    });
  };

  const showQuestionAlert = () => {
    Swal.fire({
      title: 'Question? 🤔',
      text: 'Do you want to proceed with this action?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#10b981',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, proceed!',
      cancelButtonText: 'No, cancel'
    });
  };

  const showCustomAlert = () => {
    Swal.fire({
      title: '🍽️ Restaurant App',
      html: `
        <div style="text-align: left;">
          <p><strong>Features:</strong></p>
          <ul style="margin: 10px 0; padding-left: 20px;">
            <li>✨ Beautiful UI with Tailwind CSS</li>
            <li>🔍 Advanced search functionality</li>
            <li>📱 Fully responsive design</li>
            <li>🎨 Sweet alerts for better UX</li>
          </ul>
        </div>
      `,
      confirmButtonColor: '#8b5cf6',
      confirmButtonText: 'Awesome!'
    });
  };

  const showLoadingAlert = async () => {
    Swal.fire({
      title: 'Loading...',
      text: 'Please wait while we process your request.',
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    // Simulate loading time
    setTimeout(() => {
      Swal.fire({
        title: 'Completed! ✅',
        text: 'Loading finished successfully!',
        icon: 'success',
        confirmButtonColor: '#10b981'
      });
    }, 3000);
  };

  const showToast = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    });

    Toast.fire({
      icon: 'success',
      title: 'This is a toast notification!'
    });
  };

  const showInputAlert = async () => {
    const { value: restaurantName } = await Swal.fire({
      title: 'Quick Add Restaurant',
      input: 'text',
      inputLabel: 'Restaurant Name',
      inputPlaceholder: 'Enter restaurant name...',
      showCancelButton: true,
      confirmButtonColor: '#10b981',
      cancelButtonColor: '#6b7280',
      inputValidator: (value) => {
        if (!value) {
          return 'Please enter a restaurant name!'
        }
      }
    });

    if (restaurantName) {
      Swal.fire({
        title: 'Restaurant Name Entered!',
        text: `You entered: ${restaurantName}`,
        icon: 'info',
        confirmButtonColor: '#3b82f6'
      });
    }
  };

  const demos = [
    { title: 'Success Alert', description: 'Show success message', action: showSuccessAlert, color: 'btn-success' },
    { title: 'Error Alert', description: 'Show error message', action: showErrorAlert, color: 'btn-error' },
    { title: 'Warning Alert', description: 'Show warning message', action: showWarningAlert, color: 'btn-warning' },
    { title: 'Info Alert', description: 'Show information', action: showInfoAlert, color: 'btn-info' },
    { title: 'Question Alert', description: 'Ask confirmation', action: showQuestionAlert, color: 'btn-secondary' },
    { title: 'Custom Alert', description: 'Custom HTML content', action: showCustomAlert, color: 'btn-primary' },
    { title: 'Loading Alert', description: 'Show loading state', action: showLoadingAlert, color: 'btn-accent' },
    { title: 'Toast Notification', description: 'Non-blocking notification', action: showToast, color: 'btn-ghost' },
    { title: 'Input Alert', description: 'Get user input', action: showInputAlert, color: 'btn-outline' }
  ];

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="breadcrumbs text-sm mb-6">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li>SweetAlert2 Demo</li>
          </ul>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">🍭 SweetAlert2 Demo</h1>
          <p className="text-lg text-gray-600">
            Explore the beautiful alerts and notifications we're using in our app!
          </p>
        </div>

        {/* Info Card */}
        <div className="card bg-info/10 mb-8">
          <div className="card-body">
            <h2 className="card-title text-info">✨ Why SweetAlert2?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Benefits:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Beautiful, customizable modals</li>
                  <li>Better user experience than browser alerts</li>
                  <li>Loading states and animations</li>
                  <li>Toast notifications</li>
                  <li>Input validation support</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Features Used:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Delete confirmations with custom styling</li>
                  <li>Success messages with timers</li>
                  <li>Error handling with retry options</li>
                  <li>Loading states during API calls</li>
                  <li>Form submission feedback</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {demos.map((demo, index) => (
            <div key={index} className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
              <div className="card-body">
                <h3 className="card-title text-lg">{demo.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{demo.description}</p>
                <div className="card-actions justify-end">
                  <button 
                    className={`btn ${demo.color} btn-sm`}
                    onClick={demo.action}
                  >
                    Try It!
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Implementation Examples */}
        <div className="card bg-base-100 shadow-xl mt-8">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4">🔧 Implementation Examples</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Delete Confirmation (Card.jsx):</h3>
                <div className="mockup-code text-xs">
                  <pre><code>{`const result = await Swal.fire({
  title: '🗑️ Delete Restaurant?',
  text: 'This action cannot be undone!',
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#ef4444',
  confirmButtonText: 'Yes, Delete It!'
});

if (result.isConfirmed) {
  // Proceed with deletion
}`}</code></pre>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Success Message (AddRestaurant.jsx):</h3>
                <div className="mockup-code text-xs">
                  <pre><code>{`await Swal.fire({
  title: 'Success! 🎉',
  text: 'Restaurant added successfully!',
  icon: 'success',
  confirmButtonColor: '#10b981',
  timer: 2000,
  timerProgressBar: true
});`}</code></pre>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold mb-2">Loading State Example:</h3>
              <div className="mockup-code text-xs">
                <pre><code>{`// Show loading
Swal.fire({
  title: 'Processing...',
  allowOutsideClick: false,
  didOpen: () => Swal.showLoading()
});

// After API call completes
Swal.fire({
  title: 'Completed!',
  icon: 'success'
});`}</code></pre>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Link to="/" className="btn btn-primary btn-lg">
            🏠 Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SweetAlertDemo;
