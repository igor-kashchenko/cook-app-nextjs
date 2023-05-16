import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Status } from '@/types/types';
import { getCategories, getIngredients } from '@utils/utils';

const initialState = {
  categories: [],
  ingredients: [],
  fetchStatus: Status.Idle,
  errorMessage: '',
};

export const fetchCategories = createAsyncThunk(
  'mealsCategories/fetch',
  async() => {
    const categoriesData = await getCategories();

    return categoriesData;
  }
);

export const fetchIngredients = createAsyncThunk(
  'mealsIngredients/fetch',
  async() => {
    const ingredientsData = await getIngredients();

    return ingredientsData;
  }
);

const mealsSlice = createSlice({
  name: 'meals',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.fetchStatus = Status.Loading;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.fetchStatus = Status.Succeeded;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.fetchStatus = Status.Failed;
        state.errorMessage = 'Failed fetching';
      })
      .addCase(fetchIngredients.pending, (state) => {
        state.fetchStatus = Status.Loading;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.fetchStatus = Status.Succeeded;
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state) => {
        state.fetchStatus = Status.Failed;
        state.errorMessage = 'Failed fetching';
      });
  }
});

export default mealsSlice.reducer;
