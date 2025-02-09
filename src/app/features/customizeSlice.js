import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  shape: null,
  flavor: null,
  color: null,
  topping: null,
  message: null,
  price: 0,
  basePrice: 0,
  addonsPrice: 0,
};

const customizeSlice = createSlice({
  name: 'customize',
  initialState,
  reducers: {
    setShape: (state, action) => {
      state.shape = action.payload;
      state.basePrice = action.payload.price || 0;
      state.price = state.basePrice + state.addonsPrice;
    },
    setFlavor: (state, action) => {
      const oldPrice = state.flavor?.price || 0;
      state.flavor = action.payload;
      const newPrice = action.payload?.price || 0;
      state.addonsPrice = state.addonsPrice - oldPrice + newPrice;
      state.price = state.basePrice + state.addonsPrice;
    },
    setColor: (state, action) => {
      const oldPrice = state.color?.price || 0;
      state.color = action.payload;
      const newPrice = action.payload?.price || 0;
      state.addonsPrice = state.addonsPrice - oldPrice + newPrice;
      state.price = state.basePrice + state.addonsPrice;
    },
    setTopping: (state, action) => {
      const oldPrice = state.topping?.price || 0;
      state.topping = action.payload;
      const newPrice = action.payload?.price || 0;
      state.addonsPrice = state.addonsPrice - oldPrice + newPrice;
      state.price = state.basePrice + state.addonsPrice;
    },
    setMessage: (state, action) => {
      const oldPrice = state.message?.text ? 4 : 0;
      state.message = action.payload;
      const newPrice = action.payload.text ? 4 : 0;
      state.addonsPrice = state.addonsPrice - oldPrice + newPrice;
      state.price = state.basePrice + state.addonsPrice;
    },
    resetCustomization: () => {
      return initialState;
    },
  },
});

export const { 
  setShape, 
  setFlavor, 
  setColor, 
  setTopping, 
  setMessage,
  resetCustomization 
} = customizeSlice.actions;

export default customizeSlice.reducer;