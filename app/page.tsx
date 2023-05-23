import { ContentContainer } from '@components/ContentContainer';
import { MealList } from '@components/MealList';
import { SearchForm } from '@components/SearchForm';
import React from 'react';
import { RandomMealList } from '@components/RandomMealList';

export default function Home() {
  return (
    <ContentContainer >
      <SearchForm />

      <MealList />

      <RandomMealList/>
    </ContentContainer>
  );
}
