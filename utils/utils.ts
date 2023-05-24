import { Ingredient, Meal, inputType } from '@/types/types';

const API_URL_CATEGORIES = process.env.NEXT_PUBLIC_REACT_API_CATEGORIES_URL as string;
const API_URL_INGREDIENTS = process.env.NEXT_PUBLIC_REACT_API_INGREDIENTS_URL as string;
const API_URL_RANDOM_MEAL = process.env.NEXT_PUBLIC_REACT_API_RANDOM_MEAL_URL as string;
export const API_URL_MEAL_BY_NAME = process.env.NEXT_PUBLIC_REACT_API_GET_MEAL_BY_NAME_URL as string;
export const API_URL_MEAL_BY_FIRST_LETTER = process.env.NEXT_PUBLIC_REACT_API_GET_MEALS_BY_FIRST_LETTER_URL as string;
const API_URL_MEAL_FULL_INFO_BY_ID = process.env.NEXT_PUBLIC_REACT_API_GET_MEAL_FULL_INFO_BY_ID_URL as string;
export const API_URL_MEAL_BY_MAIN_INGREDIENT = process.env.NEXT_PUBLIC_REACT_API_GET_MEALS_BY_MAIN_INGREDIENT_URL as string;
export const API_URL_MEAL_BY_CATEGORY= process.env.NEXT_PUBLIC_REACT_API_GET_MEALS_BY_CATEGORY_URL as string;


export const getCategories = async () => {
  const categoriesResponse = await fetch(API_URL_CATEGORIES);

  const data = await categoriesResponse.json();

  return data.categories;
};

export const getIngredients = async () => {
  const ingredientsResponse = await fetch(API_URL_INGREDIENTS);

  const data = await ingredientsResponse.json();

  return data.meals;
};

export const getRandomMeal = async () => {
  const randomMealResponse = await fetch(API_URL_RANDOM_MEAL);

  const data = await randomMealResponse.json();

  return data.meals[0];
};

export const getMeal = async ([searchQuery, API_URL]: [string, string]) => {
  const mealResponse = await fetch(`${API_URL}${searchQuery}`);

  const data = await mealResponse.json();

  return data.meals;
};

export const getSearchQueryAndURL = (searchType: inputType, searchQuery: string, selectedCategory: string, selectedIngredient: Ingredient | null) => {
  switch(searchType) {
  case inputType.Title:
    return searchQuery.length === 1
      ? [searchQuery, API_URL_MEAL_BY_FIRST_LETTER]
      : [searchQuery, API_URL_MEAL_BY_NAME];

  case inputType.Category:
    return [selectedCategory, API_URL_MEAL_BY_CATEGORY];

  case inputType.Ingredient:
    return selectedIngredient
      ? [selectedIngredient.strIngredient, API_URL_MEAL_BY_MAIN_INGREDIENT]
      : [null, null];

  default:
    console.log('Unexpected search type');
    return [null, null];
  }
};

export const getMealById = async (id: string) => {
  const response = await fetch(`${API_URL_MEAL_FULL_INFO_BY_ID}${id}`);

  const data = await response.json();

  return data.meals[0];
};


export const parseTags = (tags: string) => {
  return tags.split(',');
};

export function parseMeal(meal: Meal | null) {
  let ingredients: string[] = [];
  let measures: string[] = [];

  if (meal === null) {
    return { ingredients, measures };
  }

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`] && meal[`strIngredient${i}`] !== '') {
      ingredients.push(meal[`strIngredient${i}`]);
      measures.push(meal[`strMeasure${i}`]);
    }
  }

  return { ingredients, measures };
}
