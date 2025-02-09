import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearFavorites } from '../app/features/favoriteSlice';
import CakeCard from '../components/CakeCard';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const favorites = useSelector(state => state.favorites.items);
  const dispatch = useDispatch();

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all favorites?')) {
      dispatch(clearFavorites());
    }
  };

  if (favorites.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Favorites</h2>
          <p className="text-gray-500 mb-6">You haven't added any cakes to your favorites yet.</p>
          <Link 
            to="/collection/all" 
            className="text-[#E5C1C1] hover:text-[#d8b4b4] font-medium"
          >
            Browse Our Collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Your Favorites</h2>
        <button
          onClick={handleClearAll}
          className="text-red-500 hover:text-red-700 font-medium"
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favorites.map(cake => (
          <CakeCard key={cake.id} cake={cake} />
        ))}
      </div>
    </div>
  );
};

export default Favorites; 