import React from 'react';
import { Heart, ShoppingBag } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../app/features/cartSlice';
import { toggleFavorite } from '../app/features/favoriteSlice';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CakeCard = ({ cake }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const favorites = useSelector(state => state.favorites.items);
  const isFavorite = favorites.some(item => item.id === cake.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      navigate('/login');
      return;
    }
    
    const cakeToAdd = {
      ...cake,
      quantity: 1,
      type: 'preset'
    };
    
    try {
      dispatch(addToCart(cakeToAdd));
      toast.success('Added to cart!');
    } catch (error) {
      toast.error('Failed to add to cart');
    }
  };

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      toast.error('Please login to add favorites');
      navigate('/login');
      return;
    }
    
    try {
      dispatch(toggleFavorite(cake));
      toast.success(isFavorite ? 'Removed from favorites!' : 'Added to favorites!');
    } catch (error) {
      toast.error('Failed to update favorites');
    }
  };

  return (
    <div className="bg-[#FDF6F0] rounded-lg p-4 relative group">
      <div className="relative">
        <img
          src={cake.image}
          alt={cake.name}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <button
          onClick={handleToggleFavorite}
          className="absolute top-2 right-2 p-2 rounded-full bg-white/80 
                     hover:bg-white transition-colors"
        >
          <Heart
            size={20}
            className={isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-600'}
          />
        </button>
      </div>

      <h3 className="font-semibold text-gray-800">{cake.name}</h3>
      <p className="text-gray-500 text-sm">{cake.flavor}</p>
      <div className="flex justify-between items-center mt-2">
        <span className="font-bold text-gray-800">{cake.price} ₪</span>
        <button
          onClick={handleAddToCart}
          className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#E5C1C1] hover:text-white
                   text-gray-600 transition-colors"
        >
          <ShoppingBag size={20} />
        </button>
      </div>
    </div>
  );
};

export default CakeCard; 