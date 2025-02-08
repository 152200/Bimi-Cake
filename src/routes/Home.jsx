import React from 'react';
import { Search, ChevronRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cakes } from '../../server/cakes';

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      {/* Search Bar */}
      <div className="flex-1 max-w-2xl mx-auto mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="search"
            className="w-full px-4 py-2 rounded-full bg-gray-100"
          />
          <Search className="absolute right-4 top-2.5 text-gray-400" size={20} />
        </div>
      </div>

      {/* Hero Banner */}
      <Link to="/customize" className="block mb-12">
        <div className="relative rounded-lg overflow-hidden">
          <div className="bg-[#B8D1E7] p-8 flex items-center">
            <div className="flex-1">
              <h2 className="text-4xl font-bold text-gray-800 mb-2">Make your Bimi Cake!</h2>
              <p className="text-gray-600 text-lg">No one can do it better than you</p>
            </div>
            <img
              src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=300&h=300"
              alt="Featured Cake"
              className="w-64 h-64 object-cover rounded-lg"
            />
            <ChevronRight className="absolute right-4 text-gray-600" size={32} />
          </div>
        </div>
      </Link>

      {/* Collections */}
      {cakes.map((collection, index) => (
        <section key={index} className={index !== cakes.length - 1 ? "mb-12" : ""}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">{collection.collection}</h2>
            <Link 
              to={`/collection/${collection.collection.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-gray-500 hover:text-gray-700"
            >
              See all
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {collection.cakes.slice(0, 5).map((cake, cakeIndex) => (
              <div 
                key={`${index}-${cakeIndex}`} 
                className="bg-[#FDF6F0] rounded-lg p-4 relative group"
              >
                <img
                  src={cake.image}
                  alt={cake.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="font-semibold text-gray-800">{cake.name}</h3>
                <p className="text-gray-500 text-sm">{cake.flavor}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="font-bold text-gray-800">${cake.price}</span>
                  <ShoppingBag className="text-gray-600" size={20} />
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}