import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createOrder,
  fetchAllOrder,
  fetchCount,
  updateOrderStatus,
} from './orderAPI';

const initialState = {
  value: 0,
  orders: [],
  currentOrderPlaced: null,
  status: 'idle',
  totalOrdersCount: 0,
};

export const createOrderAsync = createAsyncThunk(
  'order/createOrder',
  async (orderInfo) => {
    const response = await createOrder(orderInfo);
    return response.data;
  }
);

export const fetchAllOrderAsync = createAsyncThunk(
  'order/fetchAllOrder',
  async ({ pagi, sort }) => {
    console.log({ pagi, sort });
    const response = await fetchAllOrder(pagi, sort);
    return response.data;
  }
);
export const updateOrderStatusAsync = createAsyncThunk(
  'order/updateOrderStatus',
  async (orderInfo) => {
    const response = await updateOrderStatus(orderInfo);
    return response.data;
  }
);
export const orderSlice = createSlice({
  name: 'order',
  initialState,

  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    resetCurrentOrder: (state) => {
      state.currentOrderPlaced = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders.push(action.payload);
        state.currentOrderPlaced = action.payload;
      })
      .addCase(fetchAllOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders = action.payload.products;
        state.totalOrdersCount = action.payload.totalItems;
      })
      .addCase(updateOrderStatusAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateOrderStatusAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.orders.findIndex(
          (it) => it.id === action.payload.id
        );
        state.orders[index] = action.payload;
      });
  },
});

export const { increment, resetCurrentOrder } = orderSlice.actions;

export const selectCurrentOrder = (state) => state.order.currentOrderPlaced;
export const selectAllOrder = (state) => state.order.orders;
export const selectTotalOrderCount = (state) => state.order.totalOrdersCount;

export default orderSlice.reducer;
