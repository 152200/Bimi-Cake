import React from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Cake, Palette, UtensilsCrossed, Cherry, PenTool } from 'lucide-react';
import { TiTickOutline } from "react-icons/ti";
import { useSelector, useDispatch } from 'react-redux';
import { addCustomCake } from '../app/features/cartSlice';
import { resetCustomization } from '../app/features/customizeSlice';
import { toast } from 'react-hot-toast';

export default function Customize() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const customization = useSelector((state) => state.customize);

  const customizeSteps = [
    { icon: <Cake size={24} />, label: 'Shape', path: 'shape' },
    { icon: <Palette size={24} />, label: 'Flavor', path: 'flavor' },
    { icon: <UtensilsCrossed size={24} />, label: 'Color', path: 'color' },
    { icon: <Cherry size={24} />, label: 'Toppings', path: 'toppings' },
    { icon: <PenTool size={24} />, label: 'Write', path: 'write' }
  ];

  const handleConfirm = () => {
    // Check if all customizations are complete
    if (!customization.shape || 
        !customization.flavor || 
        !customization.color || 
        !customization.topping || 
        !customization.message) {
      toast.error('Please complete all customization steps before confirming');
      return;
    }

    // Add to cart
    dispatch(addCustomCake({
      shape: customization.shape,
      flavor: customization.flavor,
      color: customization.color,
      topping: customization.topping,
      message: customization.message,
      price: customization.price
    }));

    // Reset customization
    dispatch(resetCustomization());

    // Show success message
    toast.success('Custom cake added to cart!');

    // Navigate to cart
    navigate('/cart');
  };

  const renderPriceBreakdown = () => {
    const items = [];
    
    if (customization.shape) {
      items.push({
        label: 'Base Price',
        price: customization.basePrice
      });
    }
    
    if (customization.flavor?.price) {
      items.push({
        label: 'Flavor',
        price: customization.flavor.price
      });
    }
    
    if (customization.color?.price) {
      items.push({
        label: 'Color',
        price: customization.color.price
      });
    }
    
    if (customization.topping?.price) {
      items.push({
        label: 'Topping',
        price: customization.topping.price
      });
    }
    
    if (customization.message?.text) {
      items.push({
        label: 'Message',
        price: 4
      });
    }
    
    return (
      <div className="text-right">
        {items.map((item, index) => (
          <div key={index} className="text-sm text-gray-600 mb-1">
            {item.label}: {item.price} ₪
          </div>
        ))}
        <div className="text-xl md:text-2xl font-bold text-[#E5C1C1] mt-2">
          Total: {customization.price} <span className='text-3xl'>₪</span>
        </div>
      </div>
    );
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Customize Steps Sidebar */}
        <div className="lg:w-48 bg-[#FDF6F0] rounded-lg p-4 flex flex-col justify-between">
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible">
            {customizeSteps.map((step) => (
              <NavLink
                key={step.label}
                to={step.path}
                className={({ isActive }) => `
                  flex items-center gap-3 p-3 rounded-lg flex-shrink-0 lg:flex-shrink 
                  ${isActive ? 'bg-[#E5C1C1] text-white' : 'text-gray-600 hover:bg-[#E5C1C1] hover:text-white'}
                  cursor-pointer transition-colors
                `}
              >
                {step.icon}
                <span className="font-medium whitespace-nowrap">{step.label}</span>
              </NavLink>
            ))}
          </div>
          <button 
            onClick={handleConfirm}
            className='flex items-center gap-3 p-3 rounded-lg flex-shrink-0 lg:flex-shrink 
                text-gray-600 hover:bg-[#E5C1C1] hover:text-white
                cursor-pointer transition-colors w-full font-bold'
          >
            <TiTickOutline size={24}/>
            <span className="font-medium whitespace-nowrap">Confirm</span>
          </button>
        </div>

        {/* Main Customize Area */}
        <div className="flex-1">
          <div className="flex justify-between items-start mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Customize</h2>
            {renderPriceBreakdown()}
          </div>

          <Outlet />
        </div>
      </div>
    </main>
  );
}