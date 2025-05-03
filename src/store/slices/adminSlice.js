// src/store/slices/adminSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch user analytics and feed activity
export const fetchUserAnalytics = createAsyncThunk(
  'admin/fetchUserAnalytics',
  async (_, { rejectWithValue,getState }) => {
    const baseurl = import.meta.env.VITE_API_URL;  
    try {
      const token = getState().auth.user.token;  
      const response = await axios.get(`${baseurl}/api/admin/analytics`,{
          headers:{
              Authorization: `Bearer ${token}`
          }
      });
      return response.data; // Returns user analytics and feed activity
    } catch (error) {
      return rejectWithValue('Failed to fetch user analytics or feed activity');
    }
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    userAnalytics: [],
    feedActivity: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserAnalytics.fulfilled, (state, action) => {
        const { users, activities } = action.payload;
        state.userAnalytics = users;
        state.feedActivity = activities;
        state.loading = false;
      })
      .addCase(fetchUserAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminSlice.reducer;
