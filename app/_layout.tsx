import { Stack, useRouter, useSegments } from 'expo-router';
import 'nativewind';
import { useEffect } from 'react';
import useAuthStore from 'store/authStore';
import ToastManager from 'toastify-react-native';
import './global.css';

export default function RootLayout() {
  const { isAuthenticated, isLoading } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(tabs)' || segments[0] === 'personalize';
    const inPublicGroup = segments[0] === 'auth' || segments[0] === 'onboarding';

    if (isAuthenticated && inPublicGroup) {
      // If user is signed in and tries to access public routes (login, register, onboarding), redirect to home
      router.replace('/(tabs)/home');
    } else if (!isAuthenticated && inAuthGroup) {
      // If user is not signed in and tries to access protected routes ((tabs), personalize), redirect to login
      router.replace('/auth/login');
    }
  }, [isAuthenticated, segments, isLoading]);

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="auth" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="personalize" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
      <ToastManager />
    </>
  );
}
