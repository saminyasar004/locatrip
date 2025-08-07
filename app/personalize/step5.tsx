import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/home');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView className="bg-background">
      <ScrollView className="h-full w-full" contentContainerStyle={{ flexGrow: 1 }}>
        <View className="row flex h-[90vh] flex-col items-center justify-center gap-24">
          <View className="flex w-full items-center justify-center gap-5">
            <Text className="text-center text-3xl font-semibold">
              <Text className="text-primary">Your Personalized</Text> Travel Itinerary is Ready!
            </Text>
            <Text className="text-center text-base text-dark-gray">
              Based on your preferences and travel details, we've created a customized itinerary
              just for you. Explore your trip day-by-day, from must-see attractions to the best
              local dining spots. Get ready for an unforgettable journey!
            </Text>
          </View>
          <View className="flex w-full flex-row items-center justify-center gap-6">
            <Text className="text-lg text-[#63707C]">Please wait a second.....</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
