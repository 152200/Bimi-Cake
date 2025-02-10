import React, { useState, useRef, useEffect } from 'react';
import { Heart, ShoppingBag, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TbTruckDelivery } from "react-icons/tb";
import { useSelector } from 'react-redux';
import UserMenu from './UserMenu';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const userMenuRef = useRef(null);
  
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth.user);
  const cartItems = useSelector(state => state.cart.items);
  const favorites = useSelector(state => state.favorites.items);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleUserMenuClick = (e) => {
    e.stopPropagation();
    setIsUserMenuOpen(!isUserMenuOpen);
  };
  const handleMobileMenuClick = (e) => {
   
    e.stopPropagation();
    setIsMobileMenuOpen(!isMobileMenuOpen);
    
  }

  const renderAuthButtons = () => (
    <div className="flex gap-4">
      <Link
        to="/login"
        className="lg:text-white  sm:text-[#E5C1C1] hover:text-[#c09797] font-medium"
      >
        Sign in
      </Link>
      <Link
        to="/signup"
        className="lg:text-white  sm:text-[#E5C1C1] hover:text-[#c09797] font-medium"
      >
        Sign up
      </Link>
    </div>
  );

  const renderUserSection = (isMobile = false) => (
    <>
      <Link to="/favorites" className="relative">
        <Heart className={`${isMobile ? 'text-[#E5C1C1]' : 'text-white'} cursor-pointer`} size={24} />
        {favorites.length > 0 && (
          <span className={`absolute -top-2 -right-2 ${isMobile ? 'bg-[#E5C1C1] text-white' : 'bg-white text-[#E5C1C1]'} text-xs 
                         w-5 h-5 rounded-full flex items-center justify-center`}>
            {favorites.length}
          </span>
        )}
      </Link>
      <TbTruckDelivery className={`${isMobile ? 'text-[#E5C1C1]' : 'text-white'} cursor-pointer`} size={24} />
      <Link to="/cart" className="relative">
        <ShoppingBag className={`${isMobile ? 'text-[#E5C1C1]' : 'text-white'} cursor-pointer`} size={24} />
        {cartItems.length > 0 && (
          <span className={`absolute -top-2 -right-2 ${isMobile ? 'bg-[#E5C1C1] text-white' : 'bg-white text-[#E5C1C1]'} text-xs 
                         w-5 h-5 rounded-full flex items-center justify-center`}>
            {cartItems.length}
          </span>
        )}
      </Link>
      <div className="relative" ref={userMenuRef}>
        <button
          onClick={handleUserMenuClick}
          className="flex items-center focus:outline-none"
        >
          <img
            src={`https://ui-avatars.com/api/?name=${user?.name}&background=E5C1C1&color=fff`}
            alt="User"
            className={`w-8 h-8 rounded-full border-2 ${isMobile ? 'border-[#E5C1C1]' : 'border-white'}`}
          />
        </button>
        <UserMenu 
          isOpen={isUserMenuOpen} 
          onClose={() => setIsUserMenuOpen(false)}
          isMobile={isMobile}
        />
      </div>
    </>
  );

  return (
    <nav className="bg-[#E5C1C1] p-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-3xl md:text-4xl font-script text-white">
          Bimi
        </Link>
        
        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden text-white"
          onClick={handleMobileMenuClick }
        >
          <Menu size={24} />
        </button>

        {/* Desktop Icons */}
        <div className="hidden lg:flex items-center gap-6">
          {isAuthenticated ? renderUserSection() : renderAuthButtons()}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div 
          ref={mobileMenuRef}
          className="lg:hidden mt-4 p-4 bg-white rounded-lg shadow-lg"
        >
          <div className="flex justify-around">
            {isAuthenticated ? renderUserSection(true) : renderAuthButtons()}
          </div>
        </div>
      )}
    </nav>
  );
}