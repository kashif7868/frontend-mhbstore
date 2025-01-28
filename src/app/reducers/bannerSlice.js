import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Base API URL
const BASE_URL = 'http://localhost:8000/api/banners';

// Create a banner
export const createBanner = createAsyncThunk(
  'banners/create',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(BASE_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;  // Return the complete banner object
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get all banners
export const getAllBanners = createAsyncThunk(
  'banners/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;  // Return the list of banners
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get a banner by ID
export const getBannerById = createAsyncThunk(
  'banners/getById',
  async (bannerId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/${bannerId}`);
      return response.data;  // Return the banner data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update a banner
export const updateBannerAsync = createAsyncThunk(
  'banners/update',
  async ({ bannerId, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${BASE_URL}/${bannerId}`, updatedData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;  // Return the updated banner data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete a banner
export const deleteBanner = createAsyncThunk(
  'banners/delete',
  async (bannerId, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/${bannerId}`);
      return bannerId;  // Return the ID of the deleted banner
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Banner slice
const bannerSlice = createSlice({
  name: 'banners',
  initialState: {
    banners: [],
    currentBanner: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    updateBanner: (state, action) => {
      const updatedBanner = action.payload;
      const index = state.banners.findIndex(
        (banner) => banner._id === updatedBanner._id
      );
      if (index !== -1) {
        state.banners[index] = updatedBanner; // Update the banner in the state
      } else {
        state.banners.push(updatedBanner); // In case the updated banner is not in the list
      }

      // If the current banner being viewed is updated, update `currentBanner` too
      if (state.currentBanner && state.currentBanner._id === updatedBanner._id) {
        state.currentBanner = updatedBanner;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Create banner
      .addCase(createBanner.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createBanner.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.banners.push(action.payload.banner); // Add the created banner
      })
      .addCase(createBanner.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Get all banners
      .addCase(getAllBanners.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllBanners.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.banners = action.payload.banners; // Replace with fetched banners
      })
      .addCase(getAllBanners.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Get banner by ID
      .addCase(getBannerById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getBannerById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentBanner = action.payload.banner; // Set the fetched banner as current
      })
      .addCase(getBannerById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Update banner
      .addCase(updateBannerAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateBannerAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Update the banner in the `banners` array
        const updatedBanner = action.payload.banner;
        const index = state.banners.findIndex(
          (banner) => banner._id === updatedBanner._id
        );
        if (index !== -1) {
          state.banners[index] = updatedBanner; // Update banner in state
        } else {
          state.banners.push(updatedBanner); // If not found, add the new updated banner
        }

        // Update `currentBanner` after the update
        if (state.currentBanner && state.currentBanner._id === updatedBanner._id) {
          state.currentBanner = updatedBanner;
        }
      })
      .addCase(updateBannerAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Delete banner
      .addCase(deleteBanner.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteBanner.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.banners = state.banners.filter(
          (banner) => banner._id !== action.payload
        ); // Remove the deleted banner from the state
      })
      .addCase(deleteBanner.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { updateBanner } = bannerSlice.actions;

export default bannerSlice.reducer;
