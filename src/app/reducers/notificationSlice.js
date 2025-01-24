// src/redux/notificationSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async action to create notification
export const createNotification = createAsyncThunk(
  'notification/create',
  async (notificationData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://www.api.mhbstore.com/api/notifications/create', notificationData);
      return response.data.notification;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    notifications: [],
    status: 'idle',  // can be 'idle', 'loading', 'succeeded', 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNotification.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createNotification.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.notifications.push(action.payload);
      })
      .addCase(createNotification.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default notificationSlice.reducer;
