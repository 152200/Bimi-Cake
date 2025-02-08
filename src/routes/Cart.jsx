import React, { useState } from "react";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus } from "lucide-react";

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
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items Section */}
        <div className="flex-grow lg:w-2/3">
          <h2 className="text-3xl font-bold mb-6">Shopping Cart</h2>
          
          {cartItems.length === 0 ? (
            <div className="text-center py-8 bg-white rounded-lg shadow">
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-lg shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-4"
                >
                  {/* Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  
                  {/* Item Details */}
                  <div className="flex-grow">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.flavor}</p>
                  </div>
                  
                  {/* Price and Controls */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
                    {/* Quantity Controls */}
                    <div className="flex items-center border rounded-lg overflow-hidden">
                      <button
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="px-3 py-1 hover:bg-gray-100 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-4 py-1 border-x">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="px-3 py-1 hover:bg-gray-100 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    
                    {/* Price */}
                    <div className="text-lg font-medium min-w-[80px] text-right">
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
              ))}
            </div>
          )}
        </div>

        {/* Order Summary Section */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
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
            <div className="space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">{total} ₪</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">Free</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-4 border-t">
                <span>Total</span>
                <span>{total} ₪</span>
              </div>
            </div>
            
            {/* Checkout Button */}
            <button 
              className="w-full py-3 bg-[#E5C1C1] text-white font-semibold rounded-lg hover:bg-[#d8b4b4] transition-colors"
              disabled={cartItems.length === 0}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;
