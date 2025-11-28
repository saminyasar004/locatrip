import Layout from 'components/layout';
import { format, parseISO } from 'date-fns';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
  Bell,
  Calendar,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Clock,
  Heart,
  MapPin,
  Plus,
  Share2Icon,
  Star,
} from 'lucide-react-native';
import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import useAuthStore from 'store/authStore';
import useUserItineraryStore, { ItineraryProps } from 'store/userItineraryStore';
import { cn } from 'utils';

export default function Index() {
  const { isAuthenticated, isLoading, user, accessToken, error } = useAuthStore();
  const {
    isLoading: isLoadingItinerary,
    itineraryList,
    fetchActiveItineraries,
    error: errorItinerary,
    fetchAllDayPlans,
    dayPlans,
  } = useUserItineraryStore();

  useEffect(() => {
    fetchActiveItineraries();
  }, []);

  useEffect(() => {
    if (itineraryList.length > 0) {
      fetchAllDayPlans(itineraryList[0].id);
    }
  }, [itineraryList]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchActiveItineraries();
    setRefreshing(false);
  }, [fetchActiveItineraries]);

  const router = useRouter();

  const [isDayPickerOpen, setIsDayPickerOpen] = useState(false);
  const [pickedDay, setPickedDay] = useState<string | null>(null);
  const [day, setDay] = useState([
    { label: 'All Day', value: 'all-day' },
    { label: 'Morning', value: 'morning' },
    { label: 'Afternoon', value: 'afternoon' },
    { label: 'Evening', value: 'evening' },
  ]);

  const [isDistancePickerOpen, setIsDistancePickerOpen] = useState(false);
  const [pickedDistance, setPickedDistance] = useState<string | null>(null);
  const [distance, setDistance] = useState([
    { label: '5 km', value: '5-km' },
    { label: '10 km', value: '10-km' },
    { label: '15 km', value: '15-km' },
    { label: '20 km', value: '20-km' },
  ]);

  const topicTags = [
    'Hiking & Tracking',
    'Art',
    'Local Festivals',
    'Food & Drink',
    'Camping In Nature',
  ];
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    console.log(
      `homepage: user access key: ${accessToken}\n and user is: ${user} \n and loading is: ${isLoading}\n and isAuthenticated is: ${isAuthenticated}`
    );

    if (!isLoading && !accessToken) {
      console.log('User is not authenticated, redirecting to login.');
      router.replace('/auth/login'); // Use replace to avoid back button issues
    }
  }, [isAuthenticated, user, isLoading, accessToken]);

  // Show loading while auth initializes
  if (isLoading || !accessToken || !isAuthenticated || !user) {
    return (
      <Layout>
        <View className="h-screen w-full flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#F86241" />
        </View>
      </Layout>
    );
  }

  return (
    <Layout
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#F86241']}
          tintColor="#F86241"
        />
      }>
      <View className="row flex h-auto min-h-full w-full flex-1 flex-col items-start">
        <View className="flex h-auto w-full flex-row items-center justify-between gap-5 pb-10">
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

        {/* Plan card */}

        {itineraryList.length > 0 && (
          <View className="flex w-full flex-col gap-3">
            {itineraryList.map((itinerary) => (
              <ActiveItineraryCard key={itinerary.id} itinerary={itinerary} />
            ))}
          </View>
        )}
        {itineraryList.length === 0 && (
          <View className="flex w-full items-center justify-center">
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
        )}

        <View className="flex w-full flex-row items-center justify-between py-8">
          <Text className="text-xl font-semibold text-foreground">Your Itinerary</Text>
          <Text className="text-base font-semibold text-primary">View All</Text>
        </View>

        {/* Itinerary Cards */}
        {dayPlans.length > 0 && (
          <View className="flex h-auto w-full flex-col items-center gap-3 rounded-lg bg-[#F86241]/15 p-3 py-6">
            {dayPlans.map((day, dayIndex) => (
              <View key={dayIndex} className="w-full gap-3">
                <View className="flex w-full flex-row items-center justify-between">
                  <Text className="text-lg font-semibold text-foreground">
                    Day {day.day_number}
                  </Text>

                  <View className="h-8 rounded-full bg-white p-1 px-4">
                    <Text className="text-base text-foreground">
                      {format(parseISO(day.date), 'MMM dd')}
                    </Text>
                  </View>
                </View>

                {day.places.map((place, placeIndex) => (
                  <View
                    key={placeIndex}
                    className="flex flex-row items-center justify-between gap-4 rounded-lg bg-white p-3 shadow-md">
                    {/* img */}
                    <View className="flex h-20 w-24 items-center justify-center overflow-hidden rounded-lg">
                      <Image source={{ uri: place.place_image }} className="h-full w-full" />
                    </View>

                    {/* text */}
                    <View className="flex flex-1 flex-col gap-1">
                      <Text className="text-lg font-medium" numberOfLines={1}>
                        {place.place_name}
                      </Text>
                      <Text className="text-base text-[#63707C]" numberOfLines={1}>
                        {place.place_location}
                      </Text>
                    </View>

                    {/* arrow */}
                    <TouchableHighlight>
                      <ChevronRight size={34} color={'#F86241'} />
                    </TouchableHighlight>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}

        <View className="flex w-full items-start pt-4">
          <Text className="text-lg font-semibold text-[#313131]">What's Happening Around You</Text>
        </View>

        <View className="flex h-auto w-full flex-row items-center gap-5 py-3">
          <View className="flex h-12 w-[30%] flex-row items-center justify-start rounded-lg bg-accent px-3">
            <MapPin color="#63707C" size={20} />
            <TextInput
              className="max-w-[90%] text-[#63707C] placeholder:text-[#63707C]"
              placeholder="Location"
            />
          </View>

          <View className="flex h-full w-[30%] flex-col gap-2" style={{ zIndex: 1000 }}>
            <DropDownPicker
              open={isDayPickerOpen}
              value={pickedDay}
              items={day}
              setOpen={setIsDayPickerOpen}
              setValue={setPickedDay}
              setItems={setDay}
              placeholder="All Day"
              style={{
                backgroundColor: '#f8dcd7',
                borderColor: '#f8dcd7',
                flex: 1,
                zIndex: 2000, // Higher zIndex for Trip Type
                minHeight: 40,
              }}
              ArrowDownIconComponent={({ style }) => <ChevronDown size={24} color={'#6E6E6E'} />}
              ArrowUpIconComponent={({ style }) => <ChevronUp size={24} color={'#6E6E6E'} />}
              dropDownContainerStyle={{
                backgroundColor: '#ffffff',
                borderColor: '#ffffff',
                borderRadius: 10,
                zIndex: 2000, // Match zIndex
              }}
              labelStyle={{
                color: '#575757',
                fontWeight: '500',
              }}
              selectedItemContainerStyle={{
                backgroundColor: '#f8dcd7',
                borderRadius: 8,
              }}
              closeOnBackPressed={true}
            />
          </View>

          <View className="flex h-full w-[30%] flex-col gap-2" style={{ zIndex: 1000 }}>
            <DropDownPicker
              open={isDistancePickerOpen}
              value={pickedDistance}
              items={distance}
              setOpen={setIsDistancePickerOpen}
              setValue={setPickedDistance}
              setItems={setDistance}
              placeholder="5Km"
              style={{
                backgroundColor: '#f8dcd7',
                borderColor: '#f8dcd7',
                flex: 1,
                zIndex: 2000, // Higher zIndex for Trip Type
                minHeight: 40,
              }}
              ArrowDownIconComponent={({ style }) => <ChevronDown size={24} color={'#6E6E6E'} />}
              ArrowUpIconComponent={({ style }) => <ChevronUp size={24} color={'#6E6E6E'} />}
              dropDownContainerStyle={{
                backgroundColor: '#ffffff',
                borderColor: '#ffffff',
                borderRadius: 10,
                zIndex: 2000, // Match zIndex
              }}
              labelStyle={{
                color: '#575757',
                fontWeight: '500',
              }}
              selectedItemContainerStyle={{
                backgroundColor: '#f8dcd7',
                borderRadius: 8,
              }}
              closeOnBackPressed={true}
            />
          </View>
        </View>

        <View className="flex w-full flex-row flex-wrap gap-3 py-3">
          {topicTags.map((tag, index) => (
            <TouchableHighlight
              onPress={() => {
                if (selectedTags.includes(tag)) {
                  setSelectedTags(selectedTags.filter((item) => item !== tag));
                } else {
                  setSelectedTags([...selectedTags, tag]);
                }
              }}
              underlayColor={'transparent'}
              key={index}
              className={cn(
                'h-auto rounded-full px-4 py-1',
                selectedTags.includes(tag) ? 'bg-primary' : 'bg-accent'
              )}>
              <Text
                className={cn('', selectedTags.includes(tag) ? 'text-white' : 'text-foreground')}>
                {tag}
              </Text>
            </TouchableHighlight>
          ))}
        </View>

        <TouchableHighlight
          onPress={() => router.push('/home/happening-event')}
          underlayColor={'transparent'}
          className="flex w-full items-end py-2">
          <Text className="text-base font-semibold text-primary">View All</Text>
        </TouchableHighlight>

        <View className="flex w-full flex-row flex-wrap items-center justify-between gap-[10px] py-4">
          {/* Event cards */}
          {Array.from({ length: 2 }).map((_, index) => (
            <View key={index} className="flex w-[48%] flex-col gap-3 rounded-lg bg-white pb-5">
              <View className="relative flex h-40 items-center justify-center">
                <Image
                  source={require(`assets/event-1.jpg`)}
                  className="h-full w-full rounded-lg"
                />
                <TouchableHighlight className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white">
                  <Heart size={16} color={'#F86241'} />
                </TouchableHighlight>

                <TouchableHighlight className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white">
                  <Share2Icon size={16} color={'#F86241'} />
                </TouchableHighlight>
              </View>
              <View className="flex flex-col gap-3 bg-white px-6">
                <Text className="text-lg font-medium">Dance Fiesta</Text>
                <View className="flex w-full flex-row items-center justify-between">
                  <View className="flex flex-row items-center gap-2">
                    <Star size={16} fill={'#E7AE33'} color={'#E7AE33'} />
                    <Text className="font-medium text-[#63707C]">4.8</Text>
                  </View>
                  <Text className="text-[#63707C]">2.5 Km</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        <View className="flex w-full flex-row items-center justify-between py-2">
          <Text className="text-xl font-semibold text-foreground">Most Visited Attractions</Text>
          <Text className="text-base font-semibold text-primary">View All</Text>
        </View>

        <View className="flex w-full flex-row flex-wrap items-center justify-between gap-[10px] py-4">
          {/* Event cards */}
          {Array.from({ length: 2 }).map((_, index) => (
            <View key={index} className="flex w-[48%] flex-col gap-3 rounded-lg bg-white pb-5">
              <View className="flex h-40 items-center justify-center">
                <Image
                  source={require(`assets/event-2.jpg`)}
                  className="h-full w-full rounded-lg"
                />
              </View>
              <View className="flex flex-col gap-3 bg-white px-6">
                <Text className="text-lg font-medium">Dance Fiesta</Text>
                <View className="flex w-full flex-row items-center justify-between">
                  <View className="flex flex-row items-center gap-2">
                    <Star size={16} fill={'#E7AE33'} color={'#E7AE33'} />
                    <Text className="font-medium text-[#63707C]">4.8</Text>
                  </View>
                  <Text className="text-[#63707C]">2.5 Km</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        <View className="flex w-full flex-row items-center justify-between py-2">
          <Text className="text-xl font-semibold text-foreground">
            Most Visited Art Enthusiasts
          </Text>
          <Text className="text-base font-semibold text-primary">View All</Text>
        </View>

        <View className="flex w-full flex-row flex-wrap items-center justify-between gap-[10px] py-4">
          {/* Event cards */}
          {Array.from({ length: 2 }).map((_, index) => (
            <View key={index} className="flex w-[48%] flex-col gap-3 rounded-lg bg-white pb-5">
              <View className="flex h-40 items-center justify-center">
                <Image
                  source={require(`assets/event-3.jpg`)}
                  className="h-full w-full rounded-lg"
                />
              </View>
              <View className="flex flex-col gap-3 bg-white px-6">
                <Text className="text-lg font-medium">Dance Fiesta</Text>
                <View className="flex w-full flex-row items-center justify-between">
                  <View className="flex flex-row items-center gap-2">
                    <Star size={16} fill={'#E7AE33'} color={'#E7AE33'} />
                    <Text className="font-medium text-[#63707C]">4.8</Text>
                  </View>
                  <Text className="text-[#63707C]">2.5 Km</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        <View className="flex w-full flex-row items-center justify-between py-2">
          <Text className="text-xl font-semibold text-foreground">
            Most Visited Local Festivals and Events
          </Text>
          <Text className="text-base font-semibold text-primary">View All</Text>
        </View>

        <View className="flex w-full flex-row flex-wrap items-center justify-between gap-[10px] py-4">
          {/* Event cards */}
          {Array.from({ length: 2 }).map((_, index) => (
            <View key={index} className="flex w-[48%] flex-col gap-3 rounded-lg bg-white pb-5">
              <View className="flex h-40 items-center justify-center">
                <Image
                  source={require(`assets/event-4.jpg`)}
                  className="h-full w-full rounded-lg"
                />
              </View>
              <View className="flex flex-col gap-3 bg-white px-6">
                <Text className="text-lg font-medium">Dance Fiesta</Text>
                <View className="flex w-full flex-row items-center justify-between">
                  <View className="flex flex-row items-center gap-2">
                    <Star size={16} fill={'#E7AE33'} color={'#E7AE33'} />
                    <Text className="font-medium text-[#63707C]">4.8</Text>
                  </View>
                  <Text className="text-[#63707C]">2.5 Km</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        <View className="flex w-full flex-row items-center justify-between py-2">
          <Text className="text-xl font-semibold text-foreground">Most Visited Restaurant</Text>
          <Text className="text-base font-semibold text-primary">View All</Text>
        </View>

        <View className="flex w-full flex-row flex-wrap items-center justify-between gap-[10px] py-4">
          {/* Event cards */}
          {Array.from({ length: 2 }).map((_, index) => (
            <View key={index} className="flex w-[48%] flex-col gap-3 rounded-lg bg-white pb-5">
              <View className="flex h-40 items-center justify-center">
                <Image
                  source={require(`assets/event-5.jpg`)}
                  className="h-full w-full rounded-lg"
                />
              </View>
              <View className="flex flex-col gap-3 bg-white px-6">
                <Text className="text-lg font-medium">Dance Fiesta</Text>
                <View className="flex w-full flex-row items-center justify-between">
                  <View className="flex flex-row items-center gap-2">
                    <Star size={16} fill={'#E7AE33'} color={'#E7AE33'} />
                    <Text className="font-medium text-[#63707C]">4.8</Text>
                  </View>
                  <Text className="text-[#63707C]">2.5 Km</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        <View className="flex w-full flex-row items-center justify-between py-2">
          <Text className="text-xl font-semibold text-foreground">
            Most Visited Hotel & Resorts
          </Text>
          <Text className="text-base font-semibold text-primary">View All</Text>
        </View>

        <View className="flex w-full flex-row flex-wrap items-center justify-between gap-[10px] py-4">
          {/* Event cards */}
          {Array.from({ length: 2 }).map((_, index) => (
            <View key={index} className="flex w-[48%] flex-col gap-3 rounded-lg bg-white pb-5">
              <View className="flex h-40 items-center justify-center">
                <Image
                  source={require(`assets/event-6.jpg`)}
                  className="h-full w-full rounded-lg"
                />
              </View>
              <View className="flex flex-col gap-3 bg-white px-6">
                <Text className="text-lg font-medium">Dance Fiesta</Text>
                <View className="flex w-full flex-row items-center justify-between">
                  <View className="flex flex-row items-center gap-2">
                    <Star size={16} fill={'#E7AE33'} color={'#E7AE33'} />
                    <Text className="font-medium text-[#63707C]">4.8</Text>
                  </View>
                  <Text className="text-[#63707C]">2.5 Km</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </Layout>
  );
}

function ActiveItineraryCard({ itinerary }: { itinerary: ItineraryProps }) {
  const formattedStartDate = format(parseISO(itinerary.start_date), 'MMM dd');
  const formattedEndDate = format(parseISO(itinerary.end_date), 'MMM dd yyyy');

  return (
    <View className="h-44 w-full rounded-lg">
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
              {itinerary.destination_name}
            </Text>

            <View className="flex w-full flex-row flex-wrap items-center gap-3">
              <View className="flex flex-row items-center gap-2">
                <Calendar size={16} color={'#ffffff'} />
                <Text className="text-white">
                  {formattedStartDate} - {formattedEndDate}
                </Text>
              </View>

              <View className="flex flex-row items-center gap-2">
                <Clock size={16} color={'#ffffff'} />
                <Text className="text-white">{itinerary.duration} Days</Text>
              </View>
            </View>
          </View>

          {/* RIGHT BADGE (no shrink) */}
          <View className="flex-shrink-0 self-start rounded-full bg-white px-4 py-1">
            <Text className="text-center text-xs font-medium text-primary">
              {itinerary.days_left}
            </Text>
          </View>
        </View>

        {/* PROGRESS SECTION */}
        <View className="flex flex-col items-center gap-2 px-3 py-8">
          <View className="flex w-full flex-row items-center justify-between">
            <Text className="text-base text-white">Trip Planning Progress</Text>
            <Text className="text-lg font-medium text-white">
              {itinerary.planning_progress}% Complete
            </Text>
          </View>
          <View className="flex h-3 w-full items-start rounded-full bg-[#F46F65]">
            <View
              style={{
                width: `${itinerary.planning_progress}%`,
              }}
              className="h-full rounded-full bg-white"
            />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}
