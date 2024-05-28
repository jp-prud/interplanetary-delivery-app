import { ScreenTabBarButtonProps } from '@components';
import { AppTabNavigatorParamList } from '@routes';

export const mappedScreensToProps: Record<
  keyof AppTabNavigatorParamList,
  ScreenTabBarButtonProps
> = {
  HomeScreen: {
    label: 'Home',
    icon: {
      focused: 'houseFill',
      unfocused: 'house',
    },
  },
  SearchScreen: {
    label: 'Busca',
    icon: {
      focused: 'search',
      unfocused: 'search',
    },
  },
};
