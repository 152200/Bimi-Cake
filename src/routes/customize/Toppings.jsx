import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { cakeToppings } from '../../../server/toppings';
import {useSelector, useDispatch} from 'react-redux';
import {setTopping} from '../../app/features/customizeSlice'

const Toppings = () => {
  const originalTopping = useSelector((state) => state.customize.topping)
  const navigate = useNavigate();
  const [selectedTopping, setSelectedTopping] = useState(originalTopping? originalTopping.image :cakeToppings[0].toppings[0].image);
  const [selectedCategory, setSelectedCategory] = useState(cakeToppings[0].id);

  const handleNext = () => {
    navigate('../write');
  };
  const dispatch = useDispatch();

  const handleSelectTopping = (topping) => {
     dispatch(setTopping(topping));
     setSelectedTopping(topping.image);
  }

  return (
    <div>
      {/* Topping Display */}
      <div className="mb-8">
        <div className="aspect-square max-w-xs md:max-w-md mx-auto">
          <img
            src={selectedTopping}
            alt="Selected Topping"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="flex justify-center gap-2 mt-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${i === 3 ? 'bg-[#bd8989]' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      </div>

      {/* Category Selection */}
      <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
        {cakeToppings.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              selectedCategory === category.id
                ? 'bg-[#E5C1C1] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category.category}
          </button>
        ))}
      </div>

      {/* Toppings Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cakeToppings
          .find((cat) => cat.id === selectedCategory)
          ?.toppings.map((topping) => (
            <div
              key={topping.id}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                selectedTopping === topping.image
                  ? 'border-[#E5C1C1]'
                  : 'border-gray-200 hover:border-[#E5C1C1]'
              }`}
              onClick={() => {handleSelectTopping(topping)}}
            >
              <div className="aspect-square mb-2">
                <img
                  src={topping.image}
                  alt={topping.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <h3 className="font-medium text-gray-800">{topping.name}</h3>
              <p className="text-[#E5C1C1] font-semibold mt-1">{topping.price} ₪</p>
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
    </div>
  );
}

export default Toppings;