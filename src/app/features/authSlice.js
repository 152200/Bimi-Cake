import { createSlice } from '@reduxjs/toolkit';
import { users } from '../../../server/auth';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  isAuthenticated: !!localStorage.getItem('user'),
  isAdmin: JSON.parse(localStorage.getItem('user'))?.role === 'admin' || false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isAdmin = action.payload.role === 'admin';
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isAdmin = false;
      localStorage.removeItem('user');
    },
    signup: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isAdmin = action.payload.role === 'admin';
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
  },
});

export const { login, logout, signup } = authSlice.actions;

// Async thunk for login
export const loginUser = (phone, password) => (dispatch) => {
  try {
    // Find user without phone formatting to make comparison easier
    const user = users.find(u => {
      // Remove any formatting from both phone numbers for comparison
      const cleanUserPhone = u.phone.replace(/\+970|^0/, '');
      const cleanInputPhone = phone.replace(/\+970|^0/, '');
      return cleanUserPhone === cleanInputPhone;
    });
    
    if (user && user.password === password) {
      // Include all user data including role
      const userData = {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      };
      
      dispatch(login(userData));
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials' };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: 'Login failed' };
  }
};

// Async thunk for signup
export const signupUser = (userData) => (dispatch) => {
  try {
    const existingUser = users.find(
      u => u.phone === userData.phone || u.email === userData.email
    );

    if (existingUser) {
      return { 
        success: false, 
        error: 'User with this phone number or email already exists' 
      };
    }

    // Create new user with role
    const newUser = {
      id: users.length + 1,
      ...userData,
      role: 'user' // Default role for new users
    };

    users.push(newUser);

    // Login the new user with all data including role
    dispatch(signup(newUser));

    return { success: true };
  } catch (error) {
    return { success: false, error: 'Registration failed' };
  }
};

export default authSlice.reducer; 