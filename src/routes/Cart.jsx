import React, { useState } from "react";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Graduation Topping",
      flavor: "Choco Crunch",
      price: 140,
      quantity: 1,
      image: "https://miniandco.com.au/cdn/shop/products/image_1b9cd78f-cce6-4fc9-ae00-74d820273e24.jpg?v=1685414102&width=360",
    },
    {
      id: 2,
      name: "Football Topping",
      flavor: "Red Velvet",
      price: 100,
      quantity: 1,
      image: "https://miniandco.com.au/cdn/shop/products/image_551e7c3f-5e8a-449d-90ea-1e96cad141b7.jpg?v=1677646147&width=713",
    },
  ]);

  const handleQuantityChange = (id, change) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const handleRemove = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col xl:flex-row gap-8">
          {/* Cart Items Section */}
          <div className="flex-grow xl:w-2/3">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Shopping Cart</h2>
            
            {cartItems.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <p className="text-gray-500 text-lg">Your cart is empty</p>
                <Link to="/" className="text-[#E5C1C1] hover:text-[#d8b4b4] mt-4 inline-block">
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white p-4 md:p-6 rounded-lg shadow-sm"
                  >
                    <div className="flex flex-col md:flex-row gap-4 md:items-center">
                      {/* Image */}
                      <div className="w-full md:w-24 h-48 md:h-24 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      
                      {/* Item Details */}
                      <div className="flex-grow">
                        <h3 className="font-semibold text-lg md:text-xl">{item.name}</h3>
                        <p className="text-gray-500 text-sm md:text-base">{item.flavor}</p>
                      </div>
                      
                      {/* Price and Controls */}
                      <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-start gap-4 w-full md:w-auto mt-4 md:mt-0">
                        {/* Price for mobile */}
                        <div className="text-lg font-medium md:hidden">
                          {item.price * item.quantity} ₪
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center border rounded-lg overflow-hidden">
                          <button
                            onClick={() => handleQuantityChange(item.id, -1)}
                            className="p-2 md:px-3 md:py-1 hover:bg-gray-100 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="px-4 py-1 border-x min-w-[40px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.id, 1)}
                            className="p-2 md:px-3 md:py-1 hover:bg-gray-100 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        
                        {/* Price for desktop */}
                        <div className="hidden md:block text-lg font-medium min-w-[80px] text-right">
                          {item.price * item.quantity} ₪
                        </div>
                        
                        {/* Remove Button */}
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="text-red-500 hover:text-red-700 transition-colors p-2"
                          aria-label="Remove item"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Order Summary Section */}
          <div className="xl:w-1/3">
            <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 sticky top-8">
              <h3 className="text-xl font-bold mb-4">Order Summary</h3>
              
              {/* Card Message Section */}
              <div className="mb-6 pb-6 border-b">
                <h4 className="text-lg font-semibold mb-2">Card Message</h4>
                <p className="text-sm text-gray-500 mb-2">
                  There's no card message included with your order
                </p>
                <button className="text-[#E5C1C1] hover:text-[#d8b4b4] transition-colors">
                  Add Card Message
                </button>
              </div>
              
              {/* Price Summary */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm md:text-base">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{total} ₪</span>
                </div>
                <div className="flex justify-between text-sm md:text-base">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">Free</span>
                </div>
                <div className="flex justify-between text-base md:text-lg font-bold pt-4 border-t">
                  <span>Total</span>
                  <span>{total} ₪</span>
                </div>
              </div>
              
              {/* Checkout Button */}
              <button 
                className="w-full py-3 bg-[#E5C1C1] text-white font-semibold rounded-lg hover:bg-[#d8b4b4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;
