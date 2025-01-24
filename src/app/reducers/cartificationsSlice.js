import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk for fetching certifications
export const fetchCertifications = createAsyncThunk(
  "certifications/fetchCertifications",
  async () => {
    const response = await axios.get("http://www.api.mhbstore.com/api/certificates");
    return response.data.data;  // Assuming the data array is in 'data' key
  }
);

const certificationsSlice = createSlice({
  name: "certifications",
  initialState: {
    certifications: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCertifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCertifications.fulfilled, (state, action) => {
        state.loading = false;
        state.certifications = action.payload;
      })
      .addCase(fetchCertifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default certificationsSlice.reducer;
