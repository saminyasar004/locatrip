import SVGImg from 'assets/adaptive-icon.svg';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { SafeAreaView, View } from 'react-native';

export default function App() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/onboarding');
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <SafeAreaView>
      <View className="row table h-screen items-center justify-center">
        <SVGImg width={200} height={200} />
      </View>
    </SafeAreaView>
  );
}
