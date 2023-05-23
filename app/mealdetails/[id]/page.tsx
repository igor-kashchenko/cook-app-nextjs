'use client';

import React from 'react';
import { ContentContainer } from '@components/ContentContainer';
import { MealDetails } from '@components/MealDetails';

export default function Page({ params } : {
  params: {id: string};
}) {
  const { id } = params;

  return (
    <ContentContainer>
      <MealDetails id={id} />
    </ContentContainer>
  );
}
