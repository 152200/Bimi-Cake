import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../app/features/cartSlice';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
    toast.success('Item removed from cart');
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      dispatch(clearCart());
      toast.success('Cart cleared');
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  };

  const renderCustomCake = (item) => (
    <div className="flex flex-col sm:flex-row gap-4">
      {/* Custom Cake Image */}
      <div className="w-full sm:w-48 h-48 flex-shrink-0">
        <img
          src={item.shape?.image}
          alt="Custom Cake"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Custom Cake Details */}
      <div className="flex-grow">
        <div className="flex justify-between">
          <h3 className="font-semibold text-lg text-gray-800">Custom Cake</h3>
          <button
            onClick={() => handleRemoveItem(item.id)}
            className="text-gray-400 hover:text-red-500"
          >
            <Trash2 size={20} />
          </button>
        </div>
        <div className="text-gray-500 space-y-1 mt-2">
          <p>Shape: {item.shape?.name}</p>
          <p>Flavor: {item.flavor?.name}</p>
          <p>Color: {item.color?.name}</p>
          <p>Topping: {item.topping?.name}</p>
          {item.message?.text && <p>Message: {item.message.text}</p>}
        </div>
        
        {/* Price and Quantity */}
        <div className="mt-4 flex justify-between items-center">
          <div className="font-bold text-gray-800">{item.price} ₪</div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleUpdateQuantity(item.id, (item.quantity || 1) - 1)}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <Minus size={16} />
            </button>
            <span className="w-8 text-center">{item.quantity || 1}</span>
            <button
              onClick={() => handleUpdateQuantity(item.id, (item.quantity || 1) + 1)}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPresetCake = (item) => (
    <div className="flex flex-col sm:flex-row gap-4">
      {/* Preset Cake Image */}
      <div className="w-full sm:w-48 h-48 flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Preset Cake Details */}
      <div className="flex-grow">
        <div className="flex justify-between">
          <h3 className="font-semibold text-lg text-gray-800">{item.name}</h3>
          <button
            onClick={() => handleRemoveItem(item.id)}
            className="text-gray-400 hover:text-red-500"
          >
            <Trash2 size={20} />
          </button>
        </div>
        <p className="text-gray-500">{item.flavor}</p>
        
        {/* Price and Quantity */}
        <div className="mt-4 flex justify-between items-center">
          <div className="font-bold text-gray-800">{item.price} ₪</div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleUpdateQuantity(item.id, (item.quantity || 1) - 1)}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <Minus size={16} />
            </button>
            <span className="w-8 text-center">{item.quantity || 1}</span>
            <button
              onClick={() => handleUpdateQuantity(item.id, (item.quantity || 1) + 1)}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Cart is Empty</h2>
          <p className="text-gray-500 mb-8">Add some delicious cakes to your cart!</p>
          <Link 
            to="/"
            className="text-[#E5C1C1] hover:text-[#d8b4b4] font-medium"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Shopping Cart</h1>
        <button
          onClick={handleClearCart}
          className="text-red-500 hover:text-red-700 font-medium"
        >
          Clear Cart
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm p-4">
              {item.type === 'custom' ? renderCustomCake(item) : renderPresetCake(item)}
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h3>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>{calculateTotal()} ₪</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-bold">
                <span>Total</span>
                <span>{calculateTotal()} ₪</span>
              </div>
            </div>
            <button 
              className="w-full bg-[#E5C1C1] text-white py-3 rounded-lg font-semibold
                       hover:bg-[#d8b4b4] transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
