import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cartSlice';
import customizeReducer from './features/customizeSlice';
import favoriteReducer from './features/favoriteSlice';
import modalReducer from './features/modalSlice';
import authReducer from './features/authSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    customize: customizeReducer,
    favorites: favoriteReducer,
    modal: modalReducer,
    auth: authReducer,
  },
})

// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch