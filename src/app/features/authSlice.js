import { createSlice } from '@reduxjs/toolkit';
import { users } from '../../../server/auth';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  isAuthenticated: !!localStorage.getItem('user'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
    },
    signup: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
  },
});

export const { login, logout, signup } = authSlice.actions;

// Async thunk for login
export const loginUser = (phone, password) => (dispatch) => {
  const user = users.find(u => u.phone === phone);
  if (user && user.password === password) {
    dispatch(login(user));
    return { success: true };
  }
  return { success: false, error: 'Invalid credentials' };
};

// Async thunk for signup
export const signupUser = (userData) => (dispatch) => {
  try {
    // Check if user already exists
    const existingUser = users.find(
      u => u.phone === userData.phone || u.email === userData.email
    );

    if (existingUser) {
      return { 
        success: false, 
        error: 'User with this phone number or email already exists' 
      };
    }

    // Create new user
    const newUser = {
      id: users.length + 1,
      ...userData
    };

    // In a real app, this would be an API call
    users.push(newUser);

    // Login the new user
    dispatch(signup(newUser));

    return { success: true };
  } catch (error) {
    return { success: false, error: 'Registration failed' };
  }
};

export default authSlice.reducer; 