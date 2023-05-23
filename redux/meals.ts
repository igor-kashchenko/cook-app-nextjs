import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Status, initialState } from '@/types/types';
import { getCategories, getIngredients, getMeal, getMealById, getRandomMeal } from '@utils/utils';

const initialState: initialState = {
  categories: [],
  ingredients: [],
  randomMeals: [],
  mealDetails: null,
  meals: [],
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

export const fetchRandomMeals = createAsyncThunk(
  'mealsRandom/fetch',
  async() => {
    const mealPromises = [];

    for (let i = 0; i < 4; i++) {
      mealPromises.push(getRandomMeal());
    }

    const meals = await Promise.all(mealPromises);

    return meals;
  }
);

export const fetchMeal = createAsyncThunk(
  'meal/fetch',
  async([searchQuery, API_URL]: [string, string]) => {
    const mealData = await getMeal([searchQuery, API_URL]);

    return mealData;
  }
);

export const fetchMealDetails = createAsyncThunk(
  'mealdetails/fetch',
  async(id: string) => {
    const mealData = await getMealById(id);

    return mealData;
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
      })
      .addCase(fetchRandomMeals.pending, (state) => {
        state.fetchStatus = Status.Loading;
      })
      .addCase(fetchRandomMeals.fulfilled, (state, action) => {
        state.fetchStatus = Status.Succeeded;
        state.randomMeals = action.payload;
      })
      .addCase(fetchRandomMeals.rejected, (state) => {
        state.fetchStatus = Status.Failed;
        state.errorMessage = 'Failed fetching';
      })
      .addCase(fetchMeal.pending, (state) => {
        state.fetchStatus = Status.Loading;
      })
      .addCase(fetchMeal.fulfilled, (state, action) => {
        state.fetchStatus = Status.Succeeded;
        state.meals = action.payload;
      })
      .addCase(fetchMeal.rejected, (state) => {
        state.errorMessage = 'Failed fetching';
      })
      .addCase(fetchMealDetails.pending, (state) => {
        state.fetchStatus = Status.Loading;
      })
      .addCase(fetchMealDetails.fulfilled, (state, action) => {
        state.fetchStatus = Status.Succeeded;
        state.mealDetails = action.payload;
      })
      .addCase(fetchMealDetails.rejected, (state) => {
        state.errorMessage = 'Failed fetching';
      });
  }
});

export default mealsSlice.reducer;
