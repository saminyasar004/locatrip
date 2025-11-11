import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';
import ToastManager from 'toastify-react-native/components/ToastManager';

export default function OnboardingLayout() {
  return (
    <>
      <StatusBar backgroundColor="transparent" translucent={true} barStyle="dark-content" />
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
