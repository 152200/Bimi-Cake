import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cakeFlavors } from '../../../server/flavors';

export default function Flavor() {
  const [selectedShape, setSelectedShape] = useState('double-round');
  const navigate = useNavigate();
  
  // const cakeShapes = [
  //   {
  //     id: 'double-round',
  //     name: 'Double Round',
  //     image: 'https://images.unsplash.com/photo-1535254043276-5914d30e0850?auto=format&fit=crop&q=80&w=400&h=400',
  //     price: 140,
  //     specs: 'Good for 15-20 people',
  //     size: '4.5kg | 8×6+6×6'
  //   },
  //   {
  //     id: 'standard',
  //     name: 'Standard',
  //     image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=400&h=400',
  //     price: 110,
  //     specs: 'Good for 25 people',
  //     size: '2.5kg | 11×7×3'
  //   },
  //   {
  //     id: 'classic-round',
  //     name: 'Classic Round',
  //     image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&q=80&w=400&h=400',
  //     price: 70,
  //     specs: 'Good for 15 people',
  //     size: '1.8kg | 8×6×3'
  //   },
  //   {
  //     id: 'heart',
  //     name: 'Heart',
  //     image: 'https://images.unsplash.com/photo-1562777717-dc6984f65a63?auto=format&fit=crop&q=80&w=400&h=400',
  //     price: 50,
  //     specs: 'Good for 10 people',
  //     size: '1.4kg | 8×6×3'
  //   },
  //   {
  //     id: 'sheet',
  //     name: 'Sheet',
  //     image: 'https://images.unsplash.com/photo-1627834377411-8da5f4f09de8?auto=format&fit=crop&q=80&w=400&h=400',
  //     price: 100,
  //     specs: 'Good for 22 people',
  //     size: '2.5kg | 11×7×3'
  //   }
  // ];

  const handleNext = () => {
    navigate('../color');
  };

  return (
    <>
      {/* Cake Display */}
      <div className="mb-8">
        <div className="aspect-square max-w-xs md:max-w-md mx-auto">
          <img
            // src={cakeFlavors.find(shape => shape.id === selectedShape).image}
            alt="Selected Cake"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="flex justify-center gap-2 mt-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-[#E5C1C1]' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      </div>

      {/* Shape Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {cakeFlavors.map((shape) => (
          <div
            key={shape.id}
            onClick={() => setSelectedShape(shape.id)}
            className={`bg-[#FDF6F0] rounded-lg p-4 cursor-pointer transition-all ${
              selectedShape === shape.id ? 'ring-2 ring-[#E5C1C1]' : ''
            }`}
          >
            <img
              src={shape.image}
              alt={shape.name}
              className="w-full aspect-square object-cover rounded-lg mb-4"
            />
            <h3 className="font-semibold text-gray-800">{shape.name}</h3>
            <p className="font-bold text-gray-800 mt-2">{shape.price} <span className='text-3xl'>₪</span></p>
          </div>
        ))}
      </div>

      {/* Next Button */}
      <button 
        onClick={handleNext}
        className="w-full mt-8 bg-[#E5C1C1] text-white py-3 rounded-lg font-semibold hover:bg-[#d8b4b4] transition-colors"
      >
        Next
      </button>
    </>
  );

  // return (
  //   <div></div>
  // );
} 