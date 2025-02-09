import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cakeFlavors } from '../../../server/flavors';
import { useDispatch, useSelector } from 'react-redux';
import { setFlavor } from '../../app/features/customizeSlice';

export default function Flavor() {
   
  const originalFlavor = useSelector((state) => state.customize.flavor)
  const [selectedFlavor, setSelectedFlavor] = useState(originalFlavor? originalFlavor.id :'1');
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleSelectFlavor = (flavor) => {
     dispatch(setFlavor(flavor))
     setSelectedFlavor(flavor.id)
  } 

  const handleNext = () => {
    navigate('../color');
  };

  return (
    <>
      {/* Cake Display */}
      <div className="mb-8">
        <div className="aspect-square max-w-xs md:max-w-md mx-auto">
          <img
            src={cakeFlavors.find(flavor => flavor.id === selectedFlavor).image}
            alt="Selected Cake"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="flex justify-center gap-2 mt-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${i === 1 ? 'bg-[#bd8989]' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      </div>

      {/* Flavor Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {cakeFlavors.map((flavor) => (
          <div 
            key={flavor.id}
            onClick={() => handleSelectFlavor(flavor)}
            className={`bg-[#FDF6F0] rounded-lg p-4 cursor-pointer transition-all ${
              selectedFlavor === flavor.id ? 'ring-2 ring-[#E5C1C1]' : ''
            }`}
          >
            <img
              src={flavor.image}
              alt={flavor.name}
              className="w-full aspect-square object-cover rounded-lg mb-4"
            />
            <h3 className="font-semibold text-gray-800">{flavor.name}</h3>
            <p className="font-bold text-gray-800 mt-2">{flavor.price} <span className='text-3xl'>₪</span></p>
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