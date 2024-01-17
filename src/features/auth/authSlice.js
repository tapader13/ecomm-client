import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  checkAlreadyLogged,
  checkUser,
  fetchLogout,
  fetchUser,
} from './authApi';

const initialState = {
  loggedinUserToken: null,
  error: null,
  status: 'idle',
  checkedUser: false,
};

export const createUserAsync = createAsyncThunk(
  'user/fetchUser',
  async (formdata) => {
    const response = await fetchUser(formdata);
    return response.data;
  }
);
export const checkUserAsync = createAsyncThunk(
  'user/checkUser',
  async (formdata, { rejectWithValue }) => {
    try {
      const response = await checkUser(formdata);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
export const checkAlreadyLoggedAsync = createAsyncThunk(
  'user/checkAlreadyLogged',
  async () => {
    try {
      const response = await checkAlreadyLogged();
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const fetchLogoutAsync = createAsyncThunk(
  'user/fetchLogout',
  async (userinfo) => {
    const response = await fetchLogout(userinfo);
    return response.data;
  }
);
export const authSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedinUserToken = action.payload;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedinUserToken = action.payload;
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchLogoutAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLogoutAsync.fulfilled, (state, action) => {
        state.loggedinUserToken = null;
      })
      .addCase(checkAlreadyLoggedAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkAlreadyLoggedAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedinUserToken = action.payload;
        state.checkedUser = true;
      })
      .addCase(checkAlreadyLoggedAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.checkedUser = true;
      });
  },
});

export const { increment } = authSlice.actions;

export const selectLoggedinUser = (state) => state.auth.loggedinUserToken;
export const selectErr = (state) => state.auth.error;
export const selectCkededUser = (state) => state.auth.checkedUser;

export default authSlice.reducer;
