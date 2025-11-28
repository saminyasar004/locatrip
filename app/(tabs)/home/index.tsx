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
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
  FlatList,
  Pressable,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import useAuthStore from 'store/authStore';
import useUserItineraryStore, {
  ItineraryProps,
  SuggestedPlaceProps,
} from 'store/userItineraryStore';
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
    fetchSuggestedPlaces,
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

  // Radius Picker
  const [isDistancePickerOpen, setIsDistancePickerOpen] = useState(false);
  const [pickedDistance, setPickedDistance] = useState<string | null>('10-km');
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

  // Suggested Places State
  const [locationQuery, setLocationQuery] = useState('');
  const [locationResults, setLocationResults] = useState<any[]>([]);
  const [showLocationList, setShowLocationList] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const debounceRef = React.useRef<NodeJS.Timeout | null>(null);

  const [currentLat, setCurrentLat] = useState<number | null>(null);
  const [currentLong, setCurrentLong] = useState<number | null>(null);

  const [attractions, setAttractions] = useState<SuggestedPlaceProps[]>([]);
  const [artPlaces, setArtPlaces] = useState<SuggestedPlaceProps[]>([]);
  const [festivals, setFestivals] = useState<SuggestedPlaceProps[]>([]);
  const [restaurants, setRestaurants] = useState<SuggestedPlaceProps[]>([]);
  const [hotels, setHotels] = useState<SuggestedPlaceProps[]>([]);

  // Location Search
  const searchLocation = (text: string) => {
    setLocationQuery(text);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!text || text.trim().length < 1) {
      setLocationResults([]);
      return;
    }

    setLocationLoading(true);
    debounceRef.current = setTimeout(async () => {
      try {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          text
        )}&addressdetails=1&limit=5`;
        const res = await fetch(url, {
          headers: {
            'User-Agent': 'locatip/1.0 (support@locatip.com)',
            'Accept-Language': 'en',
          },
        });
        const data = await res.json();
        setLocationResults(data);
        setShowLocationList(true);
      } catch (err) {
        console.log('Location search error:', err);
      } finally {
        setLocationLoading(false);
      }
    }, 400);
  };

  const selectLocation = (item: any) => {
    setLocationQuery(item.display_name);
    setCurrentLat(Number(item.lat));
    setCurrentLong(Number(item.lon));
    setLocationResults([]);
    setShowLocationList(false);
  };

  // Fetch Suggested Places
  useEffect(() => {
    const fetchData = async () => {
      if (!currentLat || !currentLong) return;

      const radius = pickedDistance ? parseInt(pickedDistance.split('-')[0]) * 1000 : 10000;

      const fetchSection = async (type: string, setter: any) => {
        const data = await fetchSuggestedPlaces({
          latitude: currentLat,
          longitude: currentLong,
          radius: radius,
          place_type: type,
        });
        setter(data);
      };

      await Promise.all([
        fetchSection('park', setAttractions), // Most Visited Attractions
        fetchSection('museum', setArtPlaces), // Art Enthusiasts
        fetchSection('night_club', setFestivals), // Local Festivals (proxy)
        fetchSection('restaurant', setRestaurants), // Restaurants
        fetchSection('lodging', setHotels), // Hotels
      ]);
    };

    fetchData();
  }, [currentLat, currentLong, pickedDistance]);

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
          <Pressable onPress={() => router.push('/my-plan')}>
            <Text className="text-base font-semibold text-primary">View All</Text>
          </Pressable>
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
                  <TouchableHighlight
                    key={placeIndex}
                    onPress={() =>
                      router.push({
                        pathname: '/my-plan/plan-details',
                        params: {
                          place_id: place.place_id,
                          latitude: itineraryList[0]?.latitude || 0,
                          longitude: itineraryList[0]?.longitude || 0,
                          day_number: day.day_number,
                        },
                      })
                    }
                    underlayColor={'transparent'}
                    className="flex w-full">
                    <View className="flex flex-row items-center justify-between gap-4 rounded-lg bg-white p-3 shadow-md">
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
                  </TouchableHighlight>
                ))}
              </View>
            ))}
          </View>
        )}

        <View className="flex w-full flex-row items-center justify-between pt-4">
          <Text className="text-lg font-semibold text-[#313131]">What's Happening Around You</Text>
          <Text
            className="text-base font-semibold text-primary"
            onPress={() => router.push('/home/happening-event')}>
            View All
          </Text>
        </View>

        <View
          className="relative flex h-auto w-full flex-row items-center gap-5 py-3"
          style={{ zIndex: 3000 }}>
          <View className="flex h-12 flex-1 flex-row items-center justify-start rounded-lg bg-accent px-3">
            <MapPin color="#63707C" size={20} />
            <TextInput
              className="flex-1 text-[#63707C] placeholder:text-[#63707C]"
              placeholder="Location"
              value={locationQuery}
              onChangeText={searchLocation}
            />
            {locationLoading && <ActivityIndicator size="small" color="#F86241" />}
          </View>

          {/* Location Autocomplete List */}
          {showLocationList && locationResults.length > 0 && (
            <View
              className="absolute left-0 top-16 z-50 max-h-60 w-full overflow-hidden rounded-lg bg-white shadow-lg"
              style={{ elevation: 5 }}>
              <View className="flex flex-col">
                {locationResults.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    className="border-b border-gray-100 p-3"
                    onPress={() => selectLocation(item)}>
                    <Text className="text-sm text-gray-700">{item.display_name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          <View className="flex h-full w-[35%] flex-col gap-2" style={{ zIndex: 1000 }}>
            <DropDownPicker
              open={isDistancePickerOpen}
              value={pickedDistance}
              items={distance}
              setOpen={setIsDistancePickerOpen}
              setValue={setPickedDistance}
              setItems={setDistance}
              placeholder="10 km"
              style={{
                backgroundColor: '#f8dcd7',
                borderColor: '#f8dcd7',
                flex: 1,
                zIndex: 2000,
                minHeight: 40,
              }}
              ArrowDownIconComponent={({ style }) => <ChevronDown size={24} color={'#6E6E6E'} />}
              ArrowUpIconComponent={({ style }) => <ChevronUp size={24} color={'#6E6E6E'} />}
              dropDownContainerStyle={{
                backgroundColor: '#ffffff',
                borderColor: '#ffffff',
                borderRadius: 10,
                zIndex: 2000,
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

        <SuggestedPlaceSection
          title="Most Visited Attractions"
          places={attractions}
          currentLat={currentLat}
          currentLong={currentLong}
        />
        <SuggestedPlaceSection
          title="Most Visited Art Enthusiasts"
          places={artPlaces}
          currentLat={currentLat}
          currentLong={currentLong}
        />
        <SuggestedPlaceSection
          title="Most Visited Local Festivals and Events"
          places={festivals}
          currentLat={currentLat}
          currentLong={currentLong}
        />
        <SuggestedPlaceSection
          title="Most Visited Restaurant"
          places={restaurants}
          currentLat={currentLat}
          currentLong={currentLong}
        />
        <SuggestedPlaceSection
          title="Most Visited Hotel & Resorts"
          places={hotels}
          currentLat={currentLat}
          currentLong={currentLong}
        />
      </View>
    </Layout>
  );
}

function SuggestedPlaceSection({
  title,
  places,
  currentLat,
  currentLong,
}: {
  title: string;
  places: SuggestedPlaceProps[];
  currentLat: number | null;
  currentLong: number | null;
}) {
  const router = useRouter();

  if (!places || places.length === 0) return null;

  return (
    <View className="w-full">
      <View className="flex w-full flex-row items-center justify-between py-2">
        <Text className="text-xl font-semibold text-foreground">{title}</Text>
        <Text className="text-base font-semibold text-primary">View All</Text>
      </View>

      <View className="flex w-full flex-row flex-wrap items-start justify-between gap-y-4 py-4">
        {places.slice(0, 4).map((place, index) => (
          <TouchableHighlight
            key={index}
            className="w-[48%] rounded-lg bg-white shadow-sm"
            underlayColor="#f0f0f0"
            onPress={() => {
              if (currentLat && currentLong) {
                router.push({
                  pathname: '/home/place-details',
                  params: {
                    place_id: place.place_id,
                    latitude: currentLat,
                    longitude: currentLong,
                  },
                });
              }
            }}>
            <View className="flex w-full flex-col gap-3 pb-5">
              <View className="relative flex h-40 items-center justify-center overflow-hidden rounded-t-lg">
                <Image
                  source={{ uri: place.thumbnail || 'https://via.placeholder.com/150' }}
                  className="h-full w-full"
                  resizeMode="cover"
                />
                <TouchableHighlight className="absolute left-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/80">
                  <Heart size={16} color={'#F86241'} />
                </TouchableHighlight>

                <TouchableHighlight className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/80">
                  <Share2Icon size={16} color={'#F86241'} />
                </TouchableHighlight>
              </View>
              <View className="flex flex-col gap-2 px-3">
                <Text className="text-base font-medium" numberOfLines={1}>
                  {place.name}
                </Text>
                <View className="flex w-full flex-row items-center justify-between">
                  <View className="flex flex-row items-center gap-1">
                    <Star size={14} fill={'#E7AE33'} color={'#E7AE33'} />
                    <Text className="text-xs font-medium text-[#63707C]">
                      {place.total_rating || 'N/A'}
                    </Text>
                  </View>
                  <Text className="text-xs text-[#63707C]">{place.distance?.toFixed(1)} km</Text>
                </View>
              </View>
            </View>
          </TouchableHighlight>
        ))}
      </View>
    </View>
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
