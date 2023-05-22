import { ContentContainer } from '@components/ContentContainer';
import { MealList } from '@components/MealList';
import { RandomMealList } from '@components/RandomMealList';
import { SearchForm } from '@components/SearchForm';

export default function Home() {
  return (
    <ContentContainer>
      <SearchForm />

      <MealList />

      <RandomMealList />
    </ContentContainer>
  );
}
