import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import useUserItineraryStore from '@/store/userItineraryStore';
import { Toast } from 'toastify-react-native';

export default function Index() {
  const router = useRouter();
  const { itineraryId } = useLocalSearchParams();
  console.log('Step 5 - Received Itinerary ID:', itineraryId);
  const { generateDay } = useUserItineraryStore();

  const [isTimerDone, setIsTimerDone] = useState(false);
  const [isApiDone, setIsApiDone] = useState(false);
  const [apiSuccess, setApiSuccess] = useState(false);

  useEffect(() => {
    // 1. Start 3-minute timer
    const timer = setTimeout(
      () => {
        setIsTimerDone(true);
      },
      3 * 60 * 1000
    ); // 3 minutes

    // 2. Call API immediately
    const callApi = async () => {
      if (!itineraryId) {
        console.log('No itinerary ID found');
        // If no ID, maybe just wait for timer or handle error?
        // For now, let's treat it as API done but failed
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

  // 3. Check both conditions
  useEffect(() => {
    if (isTimerDone && isApiDone) {
      if (apiSuccess) {
        router.replace('/(tabs)/home');
      } else {
        // If API failed but timer is done, maybe redirect anyway or show error?
        // User request: "after this api response status will 200 only then i will redirect"
        // So if failed, we probably shouldn't redirect or should show an error state.
        // For now, let's redirect to home but maybe show a toast before?
        // Or strictly follow "only then redirect". If failed, maybe stay here?
        // Let's stay here if failed so user knows something went wrong.
        console.log('API failed, not redirecting automatically.');
        Toast.error('Generation failed. Please try again.');
        // Optionally redirect to home after a delay or let user retry?
        // Falling back to home for safety if user is stuck?
        // Let's stick to the strict requirement: "status 200 only then i will redirect"
      }
    }
  }, [isTimerDone, isApiDone, apiSuccess, router]);

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
            <Text className="text-lg text-[#63707C]">
              Please wait a few minutes while we curate your trip...
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
