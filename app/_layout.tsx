import { Stack } from 'expo-router';
import 'nativewind';
import { StatusBar, useColorScheme } from 'react-native';
import { Host } from 'react-native-portalize';
import ToastManager from 'toastify-react-native';
import './global.css';

export default function RootLayout() {
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
