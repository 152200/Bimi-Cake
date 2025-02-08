import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Cake, Palette, UtensilsCrossed, Cherry, PenTool } from 'lucide-react';
import { TiTickOutline } from "react-icons/ti";

export default function Customize() {
  const location = useLocation();

  const customizeSteps = [
    { icon: <Cake size={24} />, label: 'Shape', path: 'shape' },
    { icon: <Palette size={24} />, label: 'Flavor', path: 'flavor' },
    { icon: <UtensilsCrossed size={24} />, label: 'Color', path: 'color' },
    { icon: <Cherry size={24} />, label: 'Toppings', path: 'toppings' },
    { icon: <PenTool size={24} />, label: 'Write', path: 'write' }
  ];

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
           <button className='flex items-center gap-3 p-3 rounded-lg flex-shrink-0 lg:flex-shrink 
                 text-gray-600 hover:bg-[#E5C1C1] hover:text-white
                  cursor-pointer transition-colors w-full font-bold'>
            <TiTickOutline size={24}/>
            <span className="font-medium whitespace-nowrap">Confirm</span>
           </button>
        </div>

        {/* Main Customize Area */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Customize</h2>
            <div className="text-xl md:text-2xl font-bold text-[#E5C1C1]">100 <span className='text-3xl'>₪</span></div>
          </div>

          <Outlet />
        </div>
      </div>
    </main>
  );
}