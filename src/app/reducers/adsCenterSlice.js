import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch ads data from the API
export const fetchAdsData = createAsyncThunk("ads/fetchData", async () => {
  const response = await fetch("http://www.api.mhbstore.com/api/ads");
  const data = await response.json();
  return data; // Assuming the response contains ad data
});

const adsCenterSlice = createSlice({
  name: "adsCenter",
  initialState: {
    adsData: null, // Stores the fetched ads data
    loading: false,
    error: null,
  },
  reducers: {
    clearAdsData: (state) => {
      state.adsData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdsData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAdsData.fulfilled, (state, action) => {
        state.loading = false;
        state.adsData = action.payload;
      })
      .addCase(fetchAdsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearAdsData } = adsCenterSlice.actions;

export default adsCenterSlice.reducer;
