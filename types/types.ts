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

type FetchableEntity<T> = {
  data: T;
  status: Status;
  error: string;
};

export type initialState = {
  categories: FetchableEntity<Category[]>;
  ingredients: FetchableEntity<Ingredient[]>;
  randomMeals: FetchableEntity<Meal[]>;
  favourites: Meal[];
  mealDetails: FetchableEntity<Meal | null>;
  meals: FetchableEntity<Meal[]>;
  isSearchPerformed: boolean;
};

export enum inputType  {
  Title = 'title',
  Category = 'category',
  Ingredient = 'ingredient',
}

export enum FetchError {
  Categories = 'Failed to fetch categories',
  Ingredients = 'Failed to fetch ingredients',
  RandomMeals = 'Failed to fetch random meals',
  Meal = 'Failed to fetch meal',
  MealDetails = 'Failed to fetch meal details',
  Default = 'Failed fetching'
}
