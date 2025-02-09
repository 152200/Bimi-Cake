import React from 'react';
import { useParams } from 'react-router-dom';
import { cakes } from '../../server/cakes';
import CakeCard from '../components/CakeCard';

const Collection = () => {
  const { collectionName } = useParams();
  
  // Find the collection that matches the URL parameter
  const collection = cakes.find(c => c.id === collectionName);

  if (!collection) {
    return <div className="text-center py-8">Collection not found</div>;
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">{collection.collection}</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {collection.cakes.map((cake) => (
          <CakeCard key={cake.id} cake={cake} />
        ))}
      </div>
    </main>
  );
};

export default Collection; 