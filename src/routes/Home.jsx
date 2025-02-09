import React from 'react';
import { Link } from 'react-router-dom';
import { cakes } from '../../server/cakes';
import CakeCard from '../components/CakeCard';
import { ChevronRight } from 'lucide-react';

const Home = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-16">
        <div className="relative rounded-2xl overflow-hidden bg-[#FDF6F0]">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&q=80&w=2000&h=600"
              alt="Cake Background"
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          
          <div className="relative flex items-center justify-between px-8 py-12 lg:py-16">
            <div className="max-w-xl">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
                Make Your Dream Cake Come True
              </h1>
              <p className="text-gray-600 text-lg mb-8">
                Design your perfect cake for any occasion. Choose from our curated collections 
                or create your own masterpiece.
              </p>
              <Link
                to="/customize/shape"
                className="inline-flex items-center gap-2 bg-[#E5C1C1] text-white px-8 py-3 
                         rounded-lg font-semibold hover:bg-[#d8b4b4] transition-colors"
              >
                Start Customizing
                <ChevronRight size={20} />
              </Link>
            </div>

            <div className="hidden lg:block">
              <div className="relative w-80 h-80">
                <img
                  src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=400&h=400"
                  alt="Featured Cake"
                  className="w-full h-full object-cover rounded-2xl shadow-2xl transform 
                         -rotate-6 hover:rotate-0 transition-transform duration-300"
                />
                <div className="absolute inset-0 rounded-2xl border-4 border-white 
                            transform rotate-6 hover:rotate-0 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collections */}
      {cakes.map((collection) => (
        <section key={collection.id} className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">{collection.collection}</h2>
            <Link
              to={`/collection/${collection.id}`}
              className="text-[#E5C1C1] hover:text-[#d8b4b4] font-medium"
            >
              See All
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {collection.cakes.slice(0, 4).map((cake) => (
              <CakeCard key={cake.id} cake={cake} />
            ))}
          </div>
        </section>
      ))}
    </main>
  );
};

export default Home;