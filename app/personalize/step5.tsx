import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import useUserItineraryStore from '@/store/userItineraryStore';
import { Toast } from 'toastify-react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const TIMER_DURATION = 45 * 1000; // 45 seconds

export default function Index() {
  const router = useRouter();
  const { itineraryId } = useLocalSearchParams();
  const { generateDay } = useUserItineraryStore();

  const [isTimerDone, setIsTimerDone] = useState(false);
  const [isApiDone, setIsApiDone] = useState(false);
  const [apiSuccess, setApiSuccess] = useState(false);

  // Animation shared value
  const progress = useSharedValue(0);

  useEffect(() => {
    // 1. Start progress animation
    progress.value = withTiming(1, {
      duration: TIMER_DURATION,
      easing: Easing.linear,
    });

    // 2. Start 45-second timer
    const timer = setTimeout(() => {
      setIsTimerDone(true);
    }, TIMER_DURATION);

    // 3. Call API immediately
    const callApi = async () => {
      if (!itineraryId) {
        setIsApiDone(true);
        setApiSuccess(false);
        return;
      }

      try {
        const response = await generateDay(Number(itineraryId));
        if (response?.status === 200) {
          setApiSuccess(true);
        } else {
          setApiSuccess(false);
          Toast.error('Failed to generate itinerary details.');
        }
      } catch (error) {
        console.error('Generate day error:', error);
        setApiSuccess(false);
      } finally {
        setIsApiDone(true);
      }
    };

    callApi();

    return () => clearTimeout(timer);
  }, [itineraryId, generateDay]);

  // Animated styles for progress bar
  const animatedBarStyle = useAnimatedStyle(() => {
    return {
      width: `${progress.value * 100}%`,
    };
  });

  // 4. Check both conditions
  useEffect(() => {
    if (isTimerDone && isApiDone) {
      if (apiSuccess) {
        router.replace('/(tabs)/home');
      } else {
        console.log('API failed, not redirecting automatically.');
        Toast.error('Generation failed. Please try again.');
      }
    }
  }, [isTimerDone, isApiDone, apiSuccess, router]);

  return (
    <SafeAreaView className="bg-background">
      <ScrollView className="h-full w-full" contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex h-[90vh] flex-col items-center justify-center gap-16 px-6">
          <View className="flex w-full items-center justify-center gap-5">
            <Text className="text-center text-3xl font-semibold">
              <Text className="text-primary">Your Personalized</Text> Travel Itinerary is Ready!
            </Text>
            <Text className="text-center text-base leading-6 text-dark-gray">
              Based on your preferences and travel details, we've created a customized itinerary
              just for you. Explore your trip day-by-day, from must-see attractions to the best
              local dining spots.
            </Text>
          </View>

          {/* Progress Section */}
          <View className="w-full flex-col items-center gap-6">
            <Text className="text-center text-lg font-medium text-[#63707C]">
              Please wait while we curate your trip...
            </Text>

            {/* Progress Bar Container */}
            <View className="h-4 w-full overflow-hidden rounded-full bg-gray-100">
              <Animated.View className="h-full bg-primary" style={animatedBarStyle} />
            </View>

            <Text className="text-sm italic text-[#9CA3AF]">Generating your perfect journey</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
