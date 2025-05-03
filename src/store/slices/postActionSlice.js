// src/store/slices/postActionsSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosInstance from '../../../utils/axiosInstance';

const baseurl = import.meta.env.VITE_API_URL;

export const savePost = createAsyncThunk('postActions/savePost', async (post, { rejectWithValue,getState }) => {
  try {
    const token = getState().auth.user.token; 
    const response = await axios.post(`${baseurl}/api/feed/save`, post,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data.message);
  }
});

export const sharePost = createAsyncThunk('postActions/sharePost', async (post, { rejectWithValue,getState }) => {
   
  try {
    const token = getState().auth.user.token;  
    const response = await axios.post(`${baseurl}/api/feed/share`, post,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data.message);
  }
});

export const reportPost = createAsyncThunk('postActions/reportPost', async (post, { rejectWithValue,getState }) => {
  try {
    const token= getState().auth.user.token; 
    const response = await axios.post(`${baseurl}/api/feed/report`, post,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data.message);
  }
});

const postActionsSlice = createSlice({
  name: 'postActions',
  initialState: {
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher((action) => action.type.startsWith('postActions/'), (state, action) => {
        if (action.type.endsWith('/pending')) {
          state.status = 'loading';
        } else if (action.type.endsWith('/fulfilled')) {
          state.status = 'succeeded';
        } else if (action.type.endsWith('/rejected')) {
          state.status = 'failed';
          state.error = action.payload;
        }
      });
  },
});

export default postActionsSlice.reducer;
