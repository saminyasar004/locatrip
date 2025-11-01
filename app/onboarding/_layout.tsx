import { Stack } from 'expo-router';
import { StatusBar, useColorScheme } from 'react-native';

export default function OnboardingLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <>
      <StatusBar
        translucent={true}
        backgroundColor={isDark ? 'transparent' : '#000'}
        barStyle="dark-content"
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </>
  );
}
