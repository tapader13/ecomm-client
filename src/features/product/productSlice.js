import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchProduct,
  fetchProductByFilter,
  fetchBrands,
  fetchCategories,
  fetchProductById,
  createProduct,
  productUpdate,
} from './productAPI';

const initialState = {
  products: [],
  brands: [],
  categories: [],
  selectedProduct: {},
  totalItems: 0,
  status: 'idle',
};

export const productAsync = createAsyncThunk(
  'product/fetchProduct',
  async () => {
    const response = await fetchProduct();
    return response.data;
  }
);
export const productByIdAsync = createAsyncThunk(
  'product/fetchProductById',
  async (id) => {
    const response = await fetchProductById(id);
    return response.data;
  }
);
export const productUpdateAsync = createAsyncThunk(
  'product/productUpdate',
  async (product) => {
    const response = await productUpdate(product);
    return response.data;
  }
);
export const brandsAsync = createAsyncThunk('product/fetchBrands', async () => {
  const response = await fetchBrands();
  return response.data;
});
export const categoriesAsync = createAsyncThunk(
  'product/fetchCategories',
  async () => {
    const response = await fetchCategories();
    return response.data;
  }
);
export const fetchProductByFilterAsync = createAsyncThunk(
  'product/fetchProductByFilter',
  async ({ filter, sort, pagi, admin }) => {
    const response = await fetchProductByFilter(filter, sort, pagi, admin);
    return response.data;
  }
);
export const createProductAsync = createAsyncThunk(
  'product/createProduct',
  async (id) => {
    const response = await createProduct(id);
    return response.data;
  }
);
export const productSlice = createSlice({
  name: 'product',
  initialState,

  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    cleareSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(productAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(productAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      })
      .addCase(fetchProductByFilterAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductByFilterAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(brandsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(brandsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.brands = action.payload;
      })
      .addCase(categoriesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(categoriesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.categories = action.payload;
      })
      .addCase(productByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(productByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedProduct = action.payload;
      })
      .addCase(createProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products.push(action.payload);
      })
      .addCase(productUpdateAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(productUpdateAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.products.findIndex(
          (it) => it.id === action.payload.id
        );
        state.products[index] = action.payload;
      });
  },
});

export const { increment, cleareSelectedProduct } = productSlice.actions;

export const selectProductlist = (state) => state.product.products;
export const selectTotalItems = (state) => state.product.totalItems;
export const selectTotalBrands = (state) => state.product.brands;
export const selectTotalCategories = (state) => state.product.categories;
export const selectProductById = (state) => state.product.selectedProduct;
export const selectProdStatus = (state) => state.product.status;

export default productSlice.reducer;
