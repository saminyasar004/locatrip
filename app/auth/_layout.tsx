import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';
import ToastManager from 'toastify-react-native/components/ToastManager';

export default function AuthLayout() {
  return (
    <>
      <StatusBar backgroundColor="transparent" translucent={true} barStyle="light-content" />
      <Stack
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
      <ToastManager />
    </>
  );
}
