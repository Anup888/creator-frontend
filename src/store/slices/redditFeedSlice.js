import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Base URL for API calls
const baseurl = import.meta.env.VITE_API_URL;
const API_URL = `${baseurl}/api/feed`;

// Create an async thunk to fetch Reddit feed
export const fetchRedditFeed = createAsyncThunk(
  "redditFeed/fetchRedditFeed",
  async (after = null, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.user.token;
      const response = await axios.get(`${API_URL}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          after, // pass cursor to backend
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch Reddit feed");
    }
  }
);
// Create the Redux slice
const redditFeedSlice = createSlice({
  name: 'redditFeed',
  initialState: {
    posts: [],  // Array to hold posts
    loading: false,
    error: null,
    nextPage: null,  // To store the next 'after' value for pagination
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRedditFeed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRedditFeed.fulfilled, (state, action) => {
        // Append new posts to the current posts
        state.posts = [...state.posts, ...action.payload.posts];
        state.nextPage = action.payload.nextPage; // Update the nextPage value
        state.loading = false;
      })
      .addCase(fetchRedditFeed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default redditFeedSlice.reducer;

