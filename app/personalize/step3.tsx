import { useRouter } from 'expo-router';
import { SafeAreaView, ScrollView, Text, TouchableHighlight, View } from 'react-native';

interface PersonalizeItemProps {
  id: number;
  title: string;
  isChecked: boolean;
}

export default function PersonalizeStep3() {
  const router = useRouter();

  return (
    <SafeAreaView className="bg-background">
      <ScrollView className="h-full w-full" contentContainerStyle={{ flexGrow: 1 }}>
        <View className="row flex h-[90vh] flex-col items-center justify-center gap-24">
          <View className="flex w-full items-center justify-center gap-5">
            <Text className="text-center text-3xl font-semibold">
              <Text className="text-primary">Let's Plan</Text> Your Perfect Trip!
            </Text>
            <Text className="text-center text-base text-dark-gray">
              By giving your trip details about your destination, dates, and travel style and we’ll
              create a personalized itinerary just for you!
            </Text>
          </View>
          <View className="flex w-full flex-row items-center justify-between gap-6">
            <TouchableHighlight
              onPress={() => router.push('/personalize/step4')}
              className="flex flex-1 items-center justify-center rounded-full bg-primary p-3 shadow-sm">
              <Text className="text-lg font-semibold text-white">Create Itinerary</Text>
            </TouchableHighlight>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
