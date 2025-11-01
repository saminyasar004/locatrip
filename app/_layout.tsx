import 'nativewind';
import './global.css';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ToastManager from 'toastify-react-native';
import { StatusBar, useColorScheme } from 'react-native';
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
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar translucent={true} backgroundColor={isDark ? 'transparent' : '#000'} />
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
