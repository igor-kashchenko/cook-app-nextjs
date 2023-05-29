'use client';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FetchError, Meal, Status, initialState } from '@/types/types';
import {
  getCategories,
  getIngredients,
  getMeal,
  getMealById,
  getRandomMeal,
} from '@utils/utils';

const loadFavoritesFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    return JSON.parse(localStorage.getItem('favorites') ?? '[]');
  }
  return [];
};

const saveFavoritesToLocalStorage = (favorites: Meal[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
};

const initialState: initialState = {
  categories: {
    data: [],
    status: Status.Idle,
    error: '',
  },
  ingredients: {
    data: [],
    status: Status.Idle,
    error: '',
  },
  randomMeals: {
    data: [],
    status: Status.Idle,
    error: '',
  },
  favourites: loadFavoritesFromLocalStorage(),
  mealDetails: {
    data: null,
    status: Status.Idle,
    error: '',
  },
  meals: {
    data: [],
    status: Status.Idle,
    error: '',
  },
  isSearchPerformed: false,
};

export const fetchCategories = createAsyncThunk(
  'mealsCategories/fetch',
  async () => {
    const categoriesData = await getCategories();

    return categoriesData;
  }
);

export const fetchIngredients = createAsyncThunk(
  'mealsIngredients/fetch',
  async () => {
    const ingredientsData = await getIngredients();

    return ingredientsData;
  }
);

export const fetchRandomMeals = createAsyncThunk(
  'mealsRandom/fetch',
  async () => {
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
  async ([searchQuery, API_URL]: [string, string]) => {
    const mealData = await getMeal([searchQuery, API_URL]);

    return mealData;
  }
);

export const fetchMealDetails = createAsyncThunk(
  'mealdetails/fetch',
  async (id: string) => {
    const mealData = await getMealById(id);

    return mealData;
  }
);

const mealsSlice = createSlice({
  name: 'meals',
  initialState,
  reducers: {
    setIsSearchPerformed: (state, action) => {
      state.isSearchPerformed = action.payload;
    },
    resetMeals: (state) => {
      state.meals.data = [];
    },
    addToFavourites: (state, action) => {
      state.favourites.push(action.payload);
      saveFavoritesToLocalStorage(state.favourites);
    },
    removeFromFavourites: (state, action) => {
      const mealId = action.payload;
      state.favourites = state.favourites.filter(
        (meal) => meal.idMeal !== mealId
      );
      saveFavoritesToLocalStorage(state.favourites);
    },
    resetFavourites: (state) => {
      state.favourites = [];
      saveFavoritesToLocalStorage(state.favourites);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.categories.status = Status.Loading;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories.status = Status.Succeeded;
        state.categories.data = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.categories.status = Status.Failed;
        state.categories.error = action.error.message || FetchError.Categories;
      })
      .addCase(fetchIngredients.pending, (state) => {
        state.ingredients.status = Status.Loading;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.ingredients.status = Status.Succeeded;
        state.ingredients.data = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.ingredients.status = Status.Failed;
        state.ingredients.error = action.error.message || FetchError.Ingredients;
      })
      .addCase(fetchRandomMeals.pending, (state) => {
        state.randomMeals.status = Status.Loading;
      })
      .addCase(fetchRandomMeals.fulfilled, (state, action) => {
        state.randomMeals.status = Status.Succeeded;
        state.randomMeals.data = action.payload;
      })
      .addCase(fetchRandomMeals.rejected, (state, action) => {
        state.randomMeals.status = Status.Failed;
        state.randomMeals.error = action.error.message || FetchError.RandomMeals;
      })
      .addCase(fetchMeal.pending, (state) => {
        state.meals.status = Status.Loading;
      })
      .addCase(fetchMeal.fulfilled, (state, action) => {
        state.meals.status = Status.Succeeded;
        state.meals.data = action.payload;
      })
      .addCase(fetchMeal.rejected, (state, action) => {
        state.meals.error = action.error.message || FetchError.Meal;
      })
      .addCase(fetchMealDetails.pending, (state) => {
        state.mealDetails.status= Status.Loading;
      })
      .addCase(fetchMealDetails.fulfilled, (state, action) => {
        state.mealDetails.status = Status.Succeeded;
        state.mealDetails.data = action.payload;
      })
      .addCase(fetchMealDetails.rejected, (state, action) => {
        state.mealDetails.error = action.error.message || FetchError.MealDetails;
      });
  },
});

export const { setIsSearchPerformed, resetMeals, addToFavourites, removeFromFavourites, resetFavourites } = mealsSlice.actions;

export default mealsSlice.reducer;
