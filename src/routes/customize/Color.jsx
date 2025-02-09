import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cakeColors } from '../../../server/colors';
import { useDispatch, useSelector } from 'react-redux';
import { setColor } from '../../app/features/customizeSlice';

export default function Color() {
  const originalColor = useSelector( (state) => state.customize.color)
  const [selectedColor, setSelectedColor] = useState(originalColor? originalColor: '#FFFFFF');
  const navigate = useNavigate();
  
    const dispatch = useDispatch();

  const handleNext = () => {
    navigate('../toppings');
  };

  const handleSelectColor = (color) => {
      dispatch(setColor(color));
      setSelectedColor(color);
    }


return (
    <>

        
    <div className='flex flex-col align-middle justify-center mx-auto mt-8'>

    <div className="w-40 h-40 bg-gray-200 rounded-md mx-auto mb-8">
        <div
          className="w-full h-full rounded-md border-black border"
          style={{ backgroundColor: selectedColor || "#F3F4F6" }}
        ></div>
        
      </div>
      <div className="flex justify-center gap-2 mt-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${i === 2 ? 'bg-[#bd8989]' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      <br />
      <br />
      <div className="grid grid-cols-5 sm:gap-5 lg:gap-20 mt-4 mx-auto">
        {cakeColors.map((color, index) => (
          <button
            key={index}
            className="w-8 h-8 rounded-full border border-gray-300"
            style={{ backgroundColor: color }}
            onClick={() => {handleSelectColor(color)}}
          ></button>
        ))}
      </div>
      
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