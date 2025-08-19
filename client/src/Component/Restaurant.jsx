import React from 'react'
import Card from './Card'

const Restaurant = ({ restaurants = [], onRefresh }) => {
  const handleDelete = (deletedId) => {
    if (onRefresh) {
      onRefresh();
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4'>
        {restaurants.length > 0 ? (
          restaurants.map((restaurant) => (
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
            <div className="max-w-md mx-auto">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-500 mb-2">No restaurants found</h3>
              <p className="text-gray-400 mb-6">
                It looks like there are no restaurants to display. 
                Be the first to add one!
              </p>
              <a href="/add-restaurant" className="btn btn-primary">
                Add First Restaurant
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Restaurant