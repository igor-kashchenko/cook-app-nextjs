export enum Status {
  Idle = 'idle',
  Loading = 'loading',
  Succeeded = 'succeeded',
  Failed = 'failed',
}

export type Category = {
  idCategory: number;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export type Ingredient = {
  idIngredient: number;
  strIngredient: string;
  strDescription: string | null;
  strType: string | null;
}

export type Meal = {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate: string | null;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string;
  strYoutube: string;
  strSource: string;
  strImageSource: string | null;
  strCreativeCommonsConfirmed: string | null;
  dateModified: string | null;
} & {
  [K in `strIngredient${number}`]: string;
} & {
  [K in `strMeasure${number}`]: string;
}

export type initialState = {
  categories: Category[];
  ingredients: Ingredient[];
  randomMeals: Meal[];
  meals: Meal[];
  fetchStatus: Status;
  errorMessage: string;
}

export enum inputType  {
  Title = 'title',
  Category = 'category',
  Ingredient = 'ingredient',
}
