import React from 'react';
import { Search, ChevronRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const weddingCakes = [
    {
      name: "Forever Bliss",
      flavor: "Buttermilk",
      price: 400,
      image: "https://images.unsplash.com/photo-1623428453655-44feaf537b1b?auto=format&fit=crop&q=80&w=400&h=400"
    },
    {
      name: "Pure Romance",
      flavor: "Vanilla",
      price: 140,
      image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&q=80&w=400&h=400"
    },
    {
      name: "Elegant Charm",
      flavor: "Chocolate",
      price: 120,
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=400&h=400"
    },
    {
      name: "Dreamy Delight",
      flavor: "Fruits",
      price: 160,
      image: "https://images.unsplash.com/photo-1535254043276-5914d30e0850?auto=format&fit=crop&q=80&w=400&h=400"
    },
    {
      name: "Sweet Harmony",
      flavor: "Red Velvet",
      price: 200,
      image: "https://images.unsplash.com/photo-1559620192-032c4bc4674e?auto=format&fit=crop&q=80&w=400&h=400"
    }
  ];

  const girlCakes = [
    {
      name: "Pink Ribbons",
      flavor: "Buttermilk",
      price: 40,
      image: "https://images.unsplash.com/photo-1627834377411-8da5f4f09de8?auto=format&fit=crop&q=80&w=400&h=400"
    },
    {
      name: "Queen",
      flavor: "Vanilla",
      price: 50,
      image: "https://images.unsplash.com/photo-1562777717-dc6984f65a63?auto=format&fit=crop&q=80&w=400&h=400"
    },
    {
      name: "Butterflies",
      flavor: "Chocolate",
      price: 60,
      image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&q=80&w=400&h=400"
    },
    {
      name: "Pink Hearts",
      flavor: "Fruits",
      price: 50,
      image: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&q=80&w=400&h=400"
    },
    {
      name: "Ballerina",
      flavor: "Red Velvet",
      price: 50,
      image: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?auto=format&fit=crop&q=80&w=400&h=400"
    }
  ];

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

      {/* Wedding Collection */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Wedding Vibes Collection</h2>
          <button className="text-gray-500 hover:text-gray-700">See all</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {weddingCakes.map((cake) => (
            <div key={cake.name} className="bg-[#FDF6F0] rounded-lg p-4 relative group">
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

      {/* Girl Collection */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Girl Vibes Collection</h2>
          <button className="text-gray-500 hover:text-gray-700">See all</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {girlCakes.map((cake) => (
            <div key={cake.name} className="bg-[#FDF6F0] rounded-lg p-4 relative group">
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
    </main>
  );
}