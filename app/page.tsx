import { Content } from '@components/Content';
import { ContentContainer } from '@components/ContentContainer';
import { RandomMealList } from '@components/RandomMealList';

export default function Home() {
  return (
    <ContentContainer>
      <Content />

      <RandomMealList />
    </ContentContainer>
  );
}
