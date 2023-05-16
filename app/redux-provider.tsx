'use client';

import React, { createContext } from 'react';
import { store } from '@redux/store';
import { Provider } from 'react-redux';

export const ReduxContext = createContext({});

type Props = {
  children: React.ReactNode;
}

export const ReduxProvider: React.FC<Props> = ({children}) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};
