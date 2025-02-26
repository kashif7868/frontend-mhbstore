import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async actions for handling API calls
export const fetchUserPeerals = createAsyncThunk('user/fetchPeerals', async (userId) => {
  const response = await axios.get(`http://localhost:8000/api/peerals/${userId}`);
  return response.data.peerals; // Return the peerals from API response
});

export const addSignUpBonus = createAsyncThunk('user/addSignUpBonus', async (userId) => {
  const response = await axios.post('http://localhost:8000/api/peerals/signup-bonus', { userId });
  return response.data.peerals; // Return the updated peerals
});

export const addShoppingBonus = createAsyncThunk('user/addShoppingBonus', async ({ userId, spentAmount }) => {
  const response = await axios.post('http://localhost:8000/api/peerals/shopping-bonus', { userId, spentAmount });
  return response.data.peerals; // Return the updated peerals
});

export const redeemPeerals = createAsyncThunk('user/redeemPeerals', async ({ userId, redeemAmount }) => {
  const response = await axios.post('http://localhost:8000/api/peerals/redeem', { userId, redeemAmount });
  return response.data.peerals; // Return the updated peerals after redemption
});

const initialState = {
  user: null,
  pearls: 0, // Initial pearls state
  status: 'idle', // To track loading state
  error: null, // To track any error
};

const userPeeralsSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    updateUserPearls: (state, action) => {
      state.pearls = action.payload.pearls;
    },
  },
  extraReducers: (builder) => {
    // Handling async actions (fetch, sign-up bonus, shopping bonus, redeem)
    builder
      .addCase(fetchUserPeerals.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserPeerals.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.pearls = action.payload;
      })
      .addCase(fetchUserPeerals.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addSignUpBonus.fulfilled, (state, action) => {
        state.pearls = action.payload;
      })
      .addCase(addShoppingBonus.fulfilled, (state, action) => {
        state.pearls = action.payload;
      })
      .addCase(redeemPeerals.fulfilled, (state, action) => {
        state.pearls = action.payload;
      });
  },
});

export const { setUser, updateUserPearls } = userPeeralsSlice.actions;
export default userPeeralsSlice.reducer;
