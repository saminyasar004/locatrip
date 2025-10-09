import SVGImg from 'assets/adaptive-icon.svg';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { SafeAreaView, View } from 'react-native';
import useAuthStore from './store/authStore';

export default function App() {
  const { user, isAuthenticated, accessToken, isLoading } = useAuthStore();

  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!user || !isAuthenticated || !accessToken) {
        if (!isLoading) {
          router.replace('/onboarding');
        }
        return;
      }

      router.replace('/home');
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
