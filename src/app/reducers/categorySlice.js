import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch all categories
export const fetchCategories = createAsyncThunk(
  'category/fetchCategories',
  async () => {
    const response = await axios.get('http://localhost:8000/api/categories');
    return response.data.data.results || []; 
  }
);

// Async thunk to fetch category by ID
export const fetchCategoryById = createAsyncThunk(
  'category/fetchCategoryById',
  async (categoryId) => {
    const response = await axios.get(`http://localhost:8000/api/categories/${categoryId}`);
    return response.data.data || {}; // Adjust based on actual response structure
  }
);

const initialState = {
  categories: [], // List of all categories
  selectedCategory: null, // Selected category details
  status: 'idle', // Possible values: 'idle', 'loading', 'succeeded', 'failed'
  error: null,    // Default error state
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all categories
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload || []; // Ensure payload is an array
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error?.message || 'Failed to fetch categories';
      })

      // Fetch category by ID
      .addCase(fetchCategoryById.pending, (state) => {
        state.status = 'loading';
        state.selectedCategory = null; // Clear previous selection
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedCategory = action.payload || null; // Ensure payload is valid
      })
      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error?.message || 'Failed to fetch category by ID';
      });
  },
});

export default categorySlice.reducer;
