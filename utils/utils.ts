const API_URL_CATEGORIES = process.env.NEXT_PUBLIC_REACT_API_CATEGORIES_URL as string;
const API_URL_INGREDIENTS = process.env.NEXT_PUBLIC_REACT_API_INGREDIENTS_URL as string;
const API_URL_RANDOM_MEAL = process.env.NEXT_PUBLIC_REACT_API_RANDOM_MEAL_URL as string;

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

export const parseCardTags = (tags: string) => {
  return tags.split(',').slice(0, 4);
};
