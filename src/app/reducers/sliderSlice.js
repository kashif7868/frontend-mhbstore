import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch slider data from API
export const fetchSliderImages = createAsyncThunk(
  'slider/fetchSliderImages',
  async () => {
    const response = await fetch('http://localhost:8000/api/homeslider');
    const data = await response.json();
    return data.data; // Return the array of slider images
  }
);

const sliderSlice = createSlice({
  name: 'slider',
  initialState: {
    images: [],
    status: 'idle', // can be 'idle', 'loading', 'succeeded', 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSliderImages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSliderImages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.images = action.payload;
      })
      .addCase(fetchSliderImages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default sliderSlice.reducer;
