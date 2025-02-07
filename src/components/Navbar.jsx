import React, { useState } from 'react';
import { Heart, ShoppingBag, MessageSquare, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-[#E5C1C1] p-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-3xl md:text-4xl font-script text-white">
          Bimi
        </Link>
        
        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu size={24} />
        </button>

        {/* Desktop Icons */}
        <div className="hidden lg:flex items-center gap-6">
          <Heart className="text-white cursor-pointer" size={24} />
          <MessageSquare className="text-white cursor-pointer" size={24} />
          <ShoppingBag className="text-white cursor-pointer" size={24} />
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=40&h=40"
            alt="Profile"
            className="w-10 h-10 rounded-full border-2 border-white cursor-pointer"
          />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-4 p-4 bg-white rounded-lg shadow-lg">
          <div className="flex justify-around">
            <Heart className="text-[#E5C1C1] cursor-pointer" size={24} />
            <MessageSquare className="text-[#E5C1C1] cursor-pointer" size={24} />
            <ShoppingBag className="text-[#E5C1C1] cursor-pointer" size={24} />
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=40&h=40"
              alt="Profile"
              className="w-8 h-8 rounded-full border-2 border-[#E5C1C1] cursor-pointer"
            />
          </div>
        </div>
      )}
    </nav>
  );
}