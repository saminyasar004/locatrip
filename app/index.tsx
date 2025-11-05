import SVGImg from 'assets/adaptive-icon.svg';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';
import useAuthStore from '../store/authStore';
import useProfileStore from '../store/profileStore';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const { user, isAuthenticated, clearError, accessToken, isLoading, fetchProfile } =
    useAuthStore();

  const { init } = useProfileStore();

  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        await fetchProfile();
        console.log('Profile fetched successfully on app load.');
        console.log({ isAuthenticated, user, accessToken, from: 'useEffect' });
      } catch (error) {
        console.log('Error fetching profile on app load:', error);
      }
      clearError();
    })();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    setTimeout(() => {
      console.log({
        isAuthenticated,
        user,
        accessToken,
      });
      if (isAuthenticated && user && accessToken) {
        init({
          full_name: user.full_name,
          email: user.email,
          image: null,
        });
        router.replace('/(tabs)/home');
      } else {
        router.replace('/onboarding');
      }
    }, 300);
  }, [isAuthenticated, user, isLoading]);

  return (
    <SafeAreaView className="flex-1 bg-transparent">
      <View className="row table h-screen items-center justify-center">
        <SVGImg width={200} height={200} />
      </View>
    </SafeAreaView>
  );
}
