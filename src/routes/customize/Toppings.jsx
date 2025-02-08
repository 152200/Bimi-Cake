import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { cakeToppings } from '../../../server/toppings';

const Toppings = () => {
  const navigate = useNavigate();
  const [selectedTopping, setSelectedTopping] = useState(cakeToppings[0].toppings[0].image);
  const [selectedCategory, setSelectedCategory] = useState(cakeToppings[0].id);

  const handleNext = () => {
    navigate('../write');
  };

  return (
    <div>
      <div className='flex flex-col align-middle justify-center mx-auto mt-8'>
        {/* Selected Topping Display */}
        <div className="w-40 h-40 bg-gray-200 rounded-md mx-auto mb-8">
          <img
            className="w-full h-full rounded-md object-cover"
            src={selectedTopping}
            alt='Selected topping'
          />
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mt-4 mb-8">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${i === 3 ? 'bg-[#bd8989]' : 'bg-gray-300'}`}
            />
          ))}
        </div>

        {/* Category Selection */}
        <div className="flex justify-center gap-4 mb-8">
          {cakeToppings.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === category.id
                  ? 'bg-[#E5C1C1] text-white'
                  : 'bg-[#FDF6F0] text-gray-600 hover:bg-[#E5C1C1] hover:text-white'
              }`}
            >
              {category.category}
            </button>
          ))}
        </div>

        {/* Toppings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cakeToppings
            .find(category => category.id === selectedCategory)
            ?.toppings.map((topping) => (
              <button
                key={topping.id}
                className={`p-4 rounded-lg border transition-all ${
                  selectedTopping === topping.image
                    ? 'border-[#E5C1C1] ring-2 ring-[#E5C1C1]'
                    : 'border-gray-200 hover:border-[#E5C1C1]'
                }`}
                onClick={() => setSelectedTopping(topping.image)}
              >
                <div className="aspect-square mb-2">
                  <img 
                    src={topping.image} 
                    alt={topping.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <p className="text-sm text-gray-800 font-medium">{topping.name}</p>
              </button>
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
    </div>
  );
}

export default Toppings;