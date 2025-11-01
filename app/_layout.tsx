import 'nativewind';
import './global.css';
import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ToastManager from 'toastify-react-native';
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';
import { useEffect } from 'react';
import useAuthStore from './store/authStore';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 min cache
      retry: 3,
      refetchOnWindowFocus: false, // RN doesn't have window focus
    },
  },
});

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar translucent={true} backgroundColor={'#000'} barStyle="dark-content" hidden />
      <SafeAreaView className="h-full w-full flex-1">
        <Stack
          screenOptions={{
            headerShown: false,
          }}>
          {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
        <ToastManager />
      </SafeAreaView>
    </QueryClientProvider>
  );
}
