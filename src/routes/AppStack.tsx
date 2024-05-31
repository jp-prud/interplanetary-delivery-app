import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  CreateLocationScreen,
  EditLocationScreen,
  HomeScreen,
} from '../screens';

import {
  AppStackParamList,
  NAVIGATOR_STACK_SCREEN_OPTIONS,
} from './navigationTypes';
import { TabNavigationStack } from './TabNavigationStack';

const { Navigator, Screen } = createNativeStackNavigator<AppStackParamList>();

export function AppStackScreen() {
  return (
    <Navigator
      initialRouteName="AppTabNavigator"
      screenOptions={NAVIGATOR_STACK_SCREEN_OPTIONS}>
      <Screen name="AppTabNavigator" component={TabNavigationStack} />

      <Screen name="HomeScreen" component={HomeScreen} />
      <Screen name="CreateLocationScreen" component={CreateLocationScreen} />
      <Screen name="EditLocationScreen" component={EditLocationScreen} />
    </Navigator>
  );
}
