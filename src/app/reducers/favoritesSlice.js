import { createSlice } from '@reduxjs/toolkit';

const initialState = []; // Simplify the initial state directly as an array

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState, // Use the defined initial state here
  reducers: {
    addToFavorites: (state, action) => {
      if (!state.some((id) => id === action.payload)) {
        state.push(action.payload); // Save only the product ID
      }
    },
    removeFromFavorites: (state, action) => {
      return state.filter((id) => id !== action.payload); // Remove by ID
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
