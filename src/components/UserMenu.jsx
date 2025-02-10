import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LogOut, Heart, ShoppingBag, Settings, PlusCircle } from 'lucide-react';
import { logout } from '../app/features/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const UserMenu = ({ isOpen, onClose, isMobile = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.user);
  const isAdmin = user?.role === 'admin';

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully');
    navigate('/');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`absolute ${isMobile ? 'right-0 top-10' : 'right-0 top-12'} 
                 w-48 bg-white rounded-lg shadow-lg py-2 z-50`}
      onClick={(e) => e.stopPropagation()}
    >
      {/* User Info */}
      <div className="px-4 py-2 border-b">
        <p className="font-medium text-gray-800">{user?.name}</p>
        <p className="text-sm text-gray-500">{user?.email}</p>
        {isAdmin && (
          <span className="inline-block mt-1 px-2 py-1 bg-[#E5C1C1] text-white text-xs rounded-full">
            Admin
          </span>
        )}
      </div>

      {/* Menu Items */}
      <div className="py-1">
        <Link
          to="/favorites"
          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
          onClick={onClose}
        >
          <Heart size={18} className="mr-2" />
          Favorites
        </Link>

        <Link
          to="/cart"
          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
          onClick={onClose}
        >
          <ShoppingBag size={18} className="mr-2" />
          Cart
        </Link>

        {/* Admin Options */}
        {isAdmin && (
          <>
            <div className="border-t my-1"></div>
            <Link
              to="/admin/add-new-cake"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
              onClick={onClose}
            >
              <PlusCircle size={18} className="mr-2" />
              Add New Cake
            </Link>
            <Link
              to="/admin/manage-orders"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
              onClick={onClose}
            >
              <Settings size={18} className="mr-2" />
              Manage Orders
            </Link>
          </>
        )}

        <div className="border-t my-1"></div>
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
        >
          <LogOut size={18} className="mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserMenu; 