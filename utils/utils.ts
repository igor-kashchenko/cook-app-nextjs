export const API_URL_CATEGORIES = process.env.NEXT_PUBLIC_REACT_API_CATEGORIES_URL as string;
export const API_ULR_INGREDIENTS = process.env.NEXT_PUBLIC_REACT_API_INGREDIENTS_URL as string;

export const getCategories = async () => {
  const categoriesResponse = await fetch(API_URL_CATEGORIES);

  const data = await categoriesResponse.json();

  return data.categories;
};

export const getIngredients = async () => {
  const ingredientsResponse = await fetch(API_ULR_INGREDIENTS);

  const data = await ingredientsResponse.json();

  return data.meals;
};
