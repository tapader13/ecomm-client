import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  addToCartItems,
  clearCartAfterOrderPlaced,
  deleteQuantityCart,
  fetchCartByUserId,
  updateQuantityCart,
} from './cartAPI';

const initialState = {
  value: 0,
  items: [],
  status: 'idle',
  cartLoad: false,
};

export const addToCartItemsAsync = createAsyncThunk(
  'cart/addToCartItems',
  async (cartData) => {
    const response = await addToCartItems(cartData);
    return response.data;
  }
);

export const fetchCartByUserIdAsync = createAsyncThunk(
  'cart/fetchCartByUserId',
  async () => {
    const response = await fetchCartByUserId();
    return response.data;
  }
);

export const updateQuantityCartAsync = createAsyncThunk(
  'cart/updateQuantityCart',
  async (updateCart) => {
    const response = await updateQuantityCart(updateCart);
    return response.data;
  }
);

export const deleteQuantityCartAsync = createAsyncThunk(
  'cart/deleteQuantityCart',
  async (cartId) => {
    const response = await deleteQuantityCart(cartId);
    return response.data;
  }
);

export const clearCartAfterOrderPlacedAsync = createAsyncThunk(
  'cart/clearCartAfterOrderPlaced',
  async () => {
    const response = await clearCartAfterOrderPlaced();
    return response.data;
  }
);
export const cartSlice = createSlice({
  name: 'cart',
  initialState,

  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(addToCartItemsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCartItemsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload);
      })
      .addCase(fetchCartByUserIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCartByUserIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
        state.cartLoad = true;
      })
      .addCase(fetchCartByUserIdAsync.rejected, (state, action) => {
        state.status = 'idle';
        // state.cartLoad = true;
      })
      .addCase(updateQuantityCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateQuantityCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex(
          (it) => it.id === action.payload.id
        );
        state.items[index] = action.payload;
      })
      .addCase(deleteQuantityCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteQuantityCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        console.log(action.payload.id, 'async');
        const index = state.items.findIndex(
          (it) => it.id === action.payload.id
        );
        console.log(index, 'as');
        state.items.splice(index, 1);
      })
      .addCase(clearCartAfterOrderPlacedAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(clearCartAfterOrderPlacedAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = [];
      });
  },
});

export const { increment } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartLoad = (state) => state.cart.cartLoad;

export default cartSlice.reducer;
