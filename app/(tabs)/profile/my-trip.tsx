import Layout from 'components/layout';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Bell, Calendar, ChevronRight, Clock, Plus } from 'lucide-react-native';
import {
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { parseISO, format } from 'date-fns';
import useAuthStore from 'store/authStore';
import useUserItineraryStore, { ItineraryProps } from 'store/userItineraryStore';
import { useCallback, useEffect, useState } from 'react';

export default function Index() {
  const router = useRouter();
  const { user } = useAuthStore();

  const { itineraryList, fetchActiveItineraries, isLoading, error } = useUserItineraryStore();

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchActiveItineraries();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchActiveItineraries();
    setRefreshing(false);
  }, [fetchActiveItineraries]);

  if (isLoading && !refreshing) {
    return (
      <SafeAreaView className="flex h-full w-full items-center justify-center">
        <Text className="text-base font-medium">Loading itineraries...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex h-full w-full items-center justify-center">
        <Text className="text-base font-medium text-red-500">{error}</Text>
      </SafeAreaView>
    );
  }

  if (!itineraryList.length) {
    return (
      <SafeAreaView className="flex h-full w-full items-center justify-center">
        <Text className="text-base font-medium">No active itinerary found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <Layout>
      <View className="row flex h-auto min-h-full w-full flex-1 flex-col items-start">
        <View className="flex h-auto w-full flex-row items-center justify-between gap-5 pb-3">
          <View className="h-auto flex-row items-center gap-4">
            {/* Avatar */}
            <View className="h-20 w-20 overflow-hidden rounded-full">
              <Image source={require('assets/avatar.jpg')} className="h-full w-full" />
            </View>
            {/* Greetings */}
            <View className="flex flex-col gap-0">
              <Text>Good Evening!</Text>
              <Text className="text-2xl font-semibold">{user?.full_name}</Text>
            </View>
          </View>
          {/* Notification */}
          <TouchableHighlight
            onPress={() => router.push('/notifications')}
            underlayColor={'transparent'}>
            <View className="relative flex h-14 w-14 items-center justify-center rounded-full bg-accent">
              <Bell size={28} color="#F86241" />
              <View className="absolute right-2 top-2 h-6 w-6 items-center justify-center rounded-full bg-primary">
                <Text className="text-xs text-white">1</Text>
              </View>
            </View>
          </TouchableHighlight>
        </View>

        <View className="flex w-full items-center justify-center py-5">
          <TouchableHighlight
            onPress={() => router.push('/personalize/step4')}
            className="flex w-full items-center justify-center rounded-full border-2 border-primary bg-background px-4 py-4 shadow-sm"
            underlayColor="transparent">
            <View className="flex flex-row items-center gap-2">
              <Plus size={20} color={'#F86241'} />

              <Text className="flex items-center text-lg font-bold text-primary">
                Create Itinerary
              </Text>
            </View>
          </TouchableHighlight>
        </View>

        {/* Trip Details */}

        <ScrollView
          className="bg-white"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#F86241']} />
          }
          contentContainerStyle={{
            flexGrow: 1,
          }}
          contentContainerClassName="gap-6">
          {itineraryList.map((itinerary) => (
            <TripDetails
              key={itinerary.id}
              id={itinerary.id}
              destination_name={itinerary.destination_name}
              latitude={itinerary.latitude}
              longitude={itinerary.longitude}
              trip_type={itinerary.trip_type}
              budget={itinerary.budget}
              duration={itinerary.duration}
              start_date={itinerary.start_date}
              end_date={itinerary.end_date}
              days_left={itinerary.days_left}
              planning_progress={itinerary.planning_progress}
            />
          ))}
        </ScrollView>
      </View>
    </Layout>
  );
}

function TripDetails({
  id,
  destination_name,
  latitude,
  longitude,
  trip_type,
  budget,
  duration,
  start_date,
  end_date,
  days_left,
  planning_progress,
}: ItineraryProps) {
  const formattedStartDate = format(parseISO(start_date), 'MMM dd yyyy');
  const formattedEndDate = format(parseISO(end_date), 'MMM dd yyyy');

  return (
    <>
      <View className="h-52 w-full rounded-lg">
        <LinearGradient
          colors={['#F3592F', '#F35336', '#EF4740']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ borderRadius: 10 }}
          className="h-full w-full rounded-lg">
          <View className="flex w-full flex-row items-start justify-between gap-3 p-3 pb-0">
            {/* LEFT CONTENT */}
            <View className="flex-1 flex-col gap-2">
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                className="flex-shrink text-lg font-semibold text-white">
                {destination_name}
              </Text>

              <View className="flex w-full flex-row flex-wrap items-center gap-3">
                <View className="flex flex-row flex-wrap items-center gap-2">
                  <Calendar size={16} color={'#ffffff'} />
                  <Text className="text-wrap text-white">
                    {formattedStartDate} - {formattedEndDate}
                  </Text>
                </View>

                <View className="flex flex-row items-center gap-2">
                  <Clock size={16} color={'#ffffff'} />
                  <Text className="text-white">4 Days</Text>
                </View>
              </View>
            </View>

            {/* RIGHT BADGE (no shrink) */}
            <View className="flex-shrink-0 self-start rounded-full bg-white px-4 py-1">
              <Text className="text-center text-xs font-medium text-primary">{days_left}</Text>
            </View>
          </View>

          {/* PROGRESS SECTION */}
          <View className="flex flex-col items-center gap-2 px-3 py-8">
            <View className="flex w-full flex-row items-center justify-between">
              <Text className="text-base text-white">Trip Planning Progress</Text>
              <Text className="text-lg font-medium text-white">{planning_progress}% Complete</Text>
            </View>
            <View className="flex h-3 w-full items-start rounded-full bg-[#F46F65]">
              <View
                style={{
                  width: `${planning_progress}%`,
                }}
                className="h-full rounded-full bg-white"
              />
            </View>
          </View>
        </LinearGradient>
      </View>

      <View className="flex w-full flex-row items-center justify-between py-2">
        <Text className="text-xl font-semibold text-foreground">Your Itinerary</Text>
        <Text className="text-base font-semibold text-primary">View All</Text>
      </View>

      {/* Itinerary Cards */}
      <View className="flex h-auto w-full flex-col items-center gap-3 rounded-lg bg-[#F86241]/15 p-3 py-6">
        <View className="flex w-full flex-row items-center justify-between">
          <Text className="text-lg font-semibold text-foreground">Day 3</Text>

          <View className="h-8 rounded-full bg-white p-1 px-4">
            <Text className="text-base text-foreground">Nov 1</Text>
          </View>
        </View>

        {Array.from({ length: 3 }).map((_, index) => (
          <View
            key={index}
            className="flex flex-row items-center justify-between gap-4 rounded-lg bg-white p-3 shadow-md">
            {/* img */}
            <View className="flex h-20 w-24 items-center justify-center overflow-hidden rounded-lg">
              <Image source={require('assets/dinner.jpg')} className="h-full w-full" />
            </View>

            {/* text */}
            <View className="flex flex-1 flex-col gap-1">
              <Text className="text-lg font-medium">Central Market Tour</Text>
              <Text className="text-base text-[#63707C]">Downtown San Jose</Text>
            </View>

            {/* arrow */}
            <TouchableHighlight>
              <ChevronRight size={34} color={'#F86241'} />
            </TouchableHighlight>
          </View>
        ))}
      </View>

      <View className="flex w-full flex-row items-center justify-between py-2">
        <Text className="text-xl font-semibold text-foreground">Trip Details</Text>
      </View>

      <View className="flex flex-col gap-3 rounded-lg bg-[#F7F4F3] p-3 px-5">
        <View className="w-full flex-row items-center justify-between py-2">
          <Text className="text-[#63707C]">Destination</Text>
          <Text className="font-medium text-black">{destination_name}</Text>
        </View>

        <View className="w-full flex-row items-center justify-between py-2">
          <Text className="text-[#63707C]">Duration</Text>
          <Text className="font-medium text-black">{duration} Days</Text>
        </View>

        <View className="w-full flex-row items-center justify-between py-2">
          <Text className="text-[#63707C]">Start</Text>
          <Text className="font-medium text-black">{formattedStartDate}</Text>
        </View>

        <View className="w-full flex-row items-center justify-between py-2">
          <Text className="text-[#63707C]">End</Text>
          <Text className="font-medium text-black">{formattedEndDate}</Text>
        </View>

        <View className="w-full flex-row items-center justify-between py-2">
          <Text className="text-[#63707C]">Status</Text>
          <Text className="font-medium text-black">
            {new Date(end_date) > new Date() ? 'Active' : 'Complete'}
          </Text>
        </View>
      </View>
    </>
  );
}
