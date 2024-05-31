import React, { ReactElement } from 'react';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '@shopify/restyle';
import {
  QueryClient,
  QueryClientConfig,
  QueryClientProvider,
} from '@tanstack/react-query';
import {
  RenderHookOptions,
  RenderOptions,
  render,
  renderHook,
} from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { theme } from '@theme';

const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: false,
      gcTime: Infinity,
    },
    mutations: {
      retry: false,
      gcTime: Infinity,
    },
  },
};

export const wrapAllProviders = () => {
  const queryClient = new QueryClient(queryClientConfig);

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <NavigationContainer>{children} </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

function customRender<T = unknown>(
  component: ReactElement<T>,
  options?: Omit<RenderOptions, 'wrapper'>,
) {
  return render(component, { wrapper: wrapAllProviders(), ...options });
}

export const wrapScreenProviders = () => {
  const queryClient = new QueryClient(queryClientConfig);

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider
        initialMetrics={{
          frame: { x: 0, y: 0, width: 0, height: 0 },
          insets: { top: 0, left: 0, right: 0, bottom: 0 },
        }}>
        <ThemeProvider theme={theme}>
          <BottomSheetModalProvider>
            <NavigationContainer>{children} </NavigationContainer>
          </BottomSheetModalProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
};

export function renderScreen<T = unknown>(
  component: ReactElement<T>,
  options?: Omit<RenderOptions, 'wrapper'>,
) {
  return render(component, { wrapper: wrapScreenProviders(), ...options });
}

function customRenderHook<Result, Props>(
  renderCallback: (props: Props) => Result,
  options?: Omit<RenderHookOptions<Props>, 'wrapper'>,
) {
  return renderHook(renderCallback, {
    wrapper: wrapAllProviders(),
    ...options,
  });
}

export * from '@testing-library/react-native';
export { customRender as render, customRenderHook as renderHook };

