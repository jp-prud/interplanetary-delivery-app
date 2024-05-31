import 'react-native-gesture-handler/jestSetup';
import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';

export const mockedNavigate = jest.fn();

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/src/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

jest.mock('@gorhom/bottom-sheet', () => ({
  __esModule: true,
  ...require('@gorhom/bottom-sheet/mock'),
}));

jest.mock('react-native-safe-area-context', () => mockSafeAreaContext);

jest.mock('@react-navigation/native', () => {
  const originalModule = jest.requireActual('@react-navigation/native');

  return {
    ...originalModule,
    useScrollToTop: jest.fn(),
    useNavigation: () => {
      return {
        navigate: mockedNavigate,
        goBack: jest.fn(),
      };
    },
  };
});

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);
