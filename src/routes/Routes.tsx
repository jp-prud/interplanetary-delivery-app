import React, { useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { settingsService } from '@services';
import { delay } from '@utils';

import { AppStackScreen } from './AppStack';

export function Router() {
  async function handleHideSplashScreen() {
    await delay();

    settingsService.hideSplashScreen();
  }

  useEffect(() => {
    handleHideSplashScreen();
  }, []);

  return (
    <NavigationContainer>
      <AppStackScreen />
    </NavigationContainer>
  );
}
