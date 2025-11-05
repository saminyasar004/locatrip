import { QueryClient } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import 'nativewind';
import { StatusBar, useColorScheme } from 'react-native';
import { Host } from 'react-native-portalize';
import ToastManager from 'toastify-react-native';
import '../global.css';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  return (
    <Host>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      <Stack
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
      <ToastManager />
    </Host>
  );
}
