import { ToastProvider } from '@context';
import { ThemeProvider } from '@shopify/restyle';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Toast } from '@components';
import { theme } from '@theme';

import { Router } from './routes/Routes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      retry: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <ThemeProvider theme={theme}>
            {/* <BottomSheetModalProvider> */}
            <ToastProvider>
              <Router />
              <Toast />
            </ToastProvider>
            {/* </BottomSheetModalProvider> */}
          </ThemeProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

export default App;
