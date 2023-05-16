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
