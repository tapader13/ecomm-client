import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchLoggedInUserOrders,
  fetchLoginUserInfo,
  updateUserInfo,
} from './userAPI';

const initialState = {
  value: 0,
  userOrders: [],
  status: 'idle',
  userInfo: null,
};

export const fetchLoggedInUserOrdersAsync = createAsyncThunk(
  'user/fetchLoggedInUserOrders',
  async () => {
    const response = await fetchLoggedInUserOrders();
    return response.data;
  }
);
export const updateUserInfoAsync = createAsyncThunk(
  'user/updateUserInfo',
  async (userdata) => {
    const response = await updateUserInfo(userdata);
    return response.data;
  }
);
export const fetchLoginUserInfoAsync = createAsyncThunk(
  'user/fetchLoginUserInfo',
  async () => {
    const response = await fetchLoginUserInfo();
    return response.data;
  }
);
export const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userOrders = action.payload;
      })
      .addCase(updateUserInfoAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserInfoAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload;
      })
      .addCase(fetchLoginUserInfoAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoginUserInfoAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload;
      });
  },
});

export const { increment } = userSlice.actions;

export const selectUserOrders = (state) => state.user.userOrders;
export const selectUserInfo = (state) => state.user.userInfo;

export default userSlice.reducer;
