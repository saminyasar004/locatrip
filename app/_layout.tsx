import 'nativewind';
import '../global.css';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          //   headerStyle: { backgroundColor: '#3b82f6' },
          //   headerTintColor: '#fff',
          //   headerTitleStyle: { fontWeight: 'bold' },
          headerShown: false,
        }}>
        <Stack.Screen name="index" options={{ title: 'Home', headerShown: false }} />
      </Stack>
    </SafeAreaView>
  );
}
