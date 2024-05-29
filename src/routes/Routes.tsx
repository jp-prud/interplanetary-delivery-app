import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { AppStackScreen } from './AppStack';

export function Router() {
  return (
    <NavigationContainer>
      <AppStackScreen />
    </NavigationContainer>
  );
}
