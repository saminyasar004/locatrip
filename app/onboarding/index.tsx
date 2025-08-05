import Onboarding1Img from 'assets/onboarding-doodle-1.svg';
import { Link, useRouter } from 'expo-router';
import { SafeAreaView, ScrollView, Text, TouchableHighlight, View } from 'react-native';

export default function Onboarding1() {
  const router = useRouter();

  return (
    <SafeAreaView>
      <ScrollView className="w-full" contentContainerStyle={{ flexGrow: 1 }}>
        <View className="row">
          <View className="flex w-full items-end justify-end py-8">
            <Link href="/auth/login">
              <Text className="text-lg font-medium">Skip</Text>
            </Link>
          </View>
          <View className="flex items-center justify-center py-10">
            <Onboarding1Img width={350} height={350} />
          </View>
          <View className="flex w-full flex-col items-center justify-center gap-4 py-10">
            <Text className="text-center text-3xl font-bold">Plan Smarter, Travel Better</Text>
            <Text className="text-center">
              Discover unforgettable journeys with personalized itineraries made just for you.
            </Text>
          </View>

          <TouchableHighlight
            onPress={() => router.push('/onboarding/onboarding2')}
            className="flex items-center justify-center rounded-full bg-primary px-4 py-4 shadow-sm">
            <Text className="text-lg font-bold text-white">Get Started</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
