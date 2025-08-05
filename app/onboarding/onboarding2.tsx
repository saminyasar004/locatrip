import Onboarding2Img from 'assets/onboarding-doodle-2.svg';
import { Link, useRouter } from 'expo-router';
import { SafeAreaView, ScrollView, Text, TouchableHighlight, View } from 'react-native';

export default function Onboarding2() {
  const router = useRouter();

  return (
    <SafeAreaView>
      <ScrollView className="h-full w-full" contentContainerStyle={{ flexGrow: 1 }}>
        <View className="row">
          <View className="flex w-full items-end justify-end py-8">
            <Link href="/auth/login">
              <Text className="text-lg font-medium">Skip</Text>
            </Link>
          </View>
          <View className="flex items-center justify-center py-10">
            <Onboarding2Img width={350} height={350} />
          </View>
          <View className="flex w-full flex-col items-center justify-center gap-4 py-10">
            <Text className="text-center text-3xl font-bold">Tailored Trips for Every Style</Text>
            <Text className="text-center">
              From relaxing escapes to cultural deep dives, your trip adapts to your interests and
              travel style.
            </Text>
          </View>

          <TouchableHighlight
            onPress={() => router.push('/onboarding/onboarding3')}
            className="flex items-center justify-center rounded-full bg-primary px-4 py-4 shadow-sm">
            <Text className="text-lg font-bold text-white">Continue</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
