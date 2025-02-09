import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: JSON.parse(localStorage.getItem('cart')) || [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = {
        ...action.payload,
        id: action.payload.id || Date.now(),
      };
      
      // Check if item already exists (for preset cakes)
      const existingItem = state.items.find(
        item => item.id === newItem.id && item.type === 'preset'
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push(newItem);
      }
      
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    addCustomCake: (state, action) => {
      const newItem = {
        ...action.payload,
        id: Date.now(),
        type: 'custom',
        quantity: 1
      };
      state.items.push(newItem);
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.quantity = Math.max(1, quantity);
        localStorage.setItem('cart', JSON.stringify(state.items));
      }
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.setItem('cart', JSON.stringify([]));
    },
  },
});

export const { 
  addToCart, 
  addCustomCake, 
  removeFromCart, 
  updateQuantity, 
  clearCart 
} = cartSlice.actions;

export default cartSlice.reducer;