import React from 'react';
import { useParams } from 'react-router-dom';
import { cakes } from '../../server/cakes';
import { ShoppingBag } from 'lucide-react';

const Favorites = () => {
  const { collectionName } = useParams();
  
  // Find the collection that matches the URL parameter
  const collection = cakes.find(
    c => c.collection === 'Girl Vibes Collection'
  );

  if (!collection) {
    return <div className="text-center py-8">Collection not found</div>;
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Favorites</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {collection.cakes.map((cake) => (
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
    </main>
  );
};

export default Favorites; 