import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cakeShapes } from '../../../server/shapes';
import { useDispatch, useSelector } from 'react-redux';
import { setShape } from '../../app/features/customizeSlice';

export default function Shape() {

  const originalShape = useSelector( (state) => state.customize.shape)
  const [selectedShape, setSelectedShape] = useState(originalShape? originalShape.id :'double-round');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  
  const handleNext = () => {
    navigate('../flavor');
  };

  const handleSelectShape = (shape) => {
    dispatch(setShape(shape))
    setSelectedShape(shape.id)
  }


  return (
    <>
      {/* Cake Display */}
      <div className="mb-8">
        <div className="aspect-square max-w-xs md:max-w-md mx-auto">
          <img
            src={cakeShapes.find(shape => shape.id === selectedShape).image}
            alt="Selected Cake"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="flex justify-center gap-2 mt-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-[#bd8989]' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      </div>

      {/* Shape Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {cakeShapes.map((shape) => (
          <div
            key={shape.id}
            onClick={() => {handleSelectShape(shape)} }
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
            <p className="text-sm text-gray-500">{shape.specs}</p>
            <p className="text-xs text-gray-400 mt-1">{shape.size}</p>
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
} 