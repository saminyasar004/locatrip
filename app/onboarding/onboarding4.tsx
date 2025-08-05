import Onboarding4Img from 'assets/onboarding-doodle-4.svg';
import { Link, useRouter } from 'expo-router';
import { SafeAreaView, ScrollView, Text, TouchableHighlight, View } from 'react-native';

export default function Onboarding4() {
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
            <Onboarding4Img width={350} height={350} />
          </View>
          <View className="flex w-full flex-col items-center justify-center gap-4 py-10">
            <Text className="text-center text-3xl font-bold">
              Join Us and Start Your Adventure!
            </Text>
            <Text className="text-center">
              Create an account or log in to access your personalized travel itineraries and
              recommendations.
            </Text>
          </View>

          <View className="flex w-full flex-col items-center justify-center gap-4 py-0">
            <TouchableHighlight
              onPress={() => router.push('/auth/register')}
              className="flex w-full items-center justify-center rounded-full bg-primary px-4 py-4 shadow-sm">
              <Text className="text-lg font-bold text-white">Register</Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => router.push('/auth/login')}
              className="flex w-full items-center justify-center rounded-full border-2 border-primary bg-background px-4 py-4 shadow-sm"
              underlayColor="transparent">
              <Text className="text-lg font-bold text-primary">Log In</Text>
            </TouchableHighlight>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
