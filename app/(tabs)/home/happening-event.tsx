import Layout from 'components/layout';
import { useRouter } from 'expo-router';
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Heart,
  MapPin,
  Share2Icon,
  Star,
} from 'lucide-react-native';
import React, { useState, useEffect, useRef } from 'react';
import {
  ActivityIndicator,
  Image,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { cn } from 'utils';
import useUserItineraryStore, { SuggestedPlaceProps } from 'store/userItineraryStore';

export default function Index() {
  const router = useRouter();
  const { fetchSuggestedPlaces } = useUserItineraryStore();

  const [isDayPickerOpen, setIsDayPickerOpen] = useState(false);
  const [pickedDay, setPickedDay] = useState<string | null>(null);
  const [day, setDay] = useState([
    { label: 'All Day', value: 'all-day' },
    { label: 'Morning', value: 'morning' },
    { label: 'Afternoon', value: 'afternoon' },
    { label: 'Evening', value: 'evening' },
  ]);

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
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const [currentLat, setCurrentLat] = useState<number | null>(null);
  const [currentLong, setCurrentLong] = useState<number | null>(null);

  const [places, setPlaces] = useState<SuggestedPlaceProps[]>([]);
  const [loadingPlaces, setLoadingPlaces] = useState(false);

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

  // Fetch Places
  useEffect(() => {
    const fetchData = async () => {
      if (!currentLat || !currentLong) return;

      setLoadingPlaces(true);
      const radius = pickedDistance ? parseInt(pickedDistance.split('-')[0]) * 1000 : 10000;

      // Map tags to place types
      const tagMap: { [key: string]: string } = {
        'Hiking & Tracking': 'park',
        Art: 'museum',
        'Local Festivals': 'night_club',
        'Food & Drink': 'restaurant',
        'Camping In Nature': 'campground',
      };

      let placeTypes = selectedTags.map((tag) => tagMap[tag]).filter(Boolean);

      // If no tags selected, fetch a default mix or all
      if (placeTypes.length === 0) {
        placeTypes = ['park', 'museum', 'night_club', 'restaurant', 'campground'];
      }

      try {
        const allPlaces: SuggestedPlaceProps[] = [];
        // Fetch for each type (API takes single type)
        // Limit to prevent too many requests if many tags selected
        for (const type of placeTypes) {
          const data = await fetchSuggestedPlaces({
            latitude: currentLat,
            longitude: currentLong,
            radius: radius,
            place_type: type,
          });
          allPlaces.push(...data);
        }

        // Remove duplicates based on place_id
        const uniquePlaces = Array.from(
          new Map(allPlaces.map((item) => [item.place_id, item])).values()
        );
        setPlaces(uniquePlaces);
      } catch (error) {
        console.log('Error fetching happening events:', error);
      } finally {
        setLoadingPlaces(false);
      }
    };

    fetchData();
  }, [currentLat, currentLong, pickedDistance, selectedTags]);

  return (
    <Layout>
      <View className="row flex h-auto min-h-full w-full flex-1 flex-col items-start">
        <View className="flex w-full flex-row items-center gap-3 bg-white pt-4">
          <TouchableHighlight onPress={() => router.back()} underlayColor={'transparent'}>
            <ArrowLeft size={24} color={'#63707C'} />
          </TouchableHighlight>

          <Text className="text-lg font-semibold text-[#313131]">What's Happening Around You</Text>
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

          <View className="flex h-full w-[30%] flex-col gap-2" style={{ zIndex: 1000 }}>
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

        {loadingPlaces ? (
          <View className="w-full flex-1 items-center justify-center py-10">
            <ActivityIndicator size="large" color="#F86241" />
          </View>
        ) : (
          <View className="flex w-full flex-row flex-wrap items-start justify-between gap-y-4 py-4">
            {places.map((place, index) => (
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
                      <Text className="text-xs text-[#63707C]">
                        {place.distance?.toFixed(1)} km
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableHighlight>
            ))}
            {places.length === 0 && !loadingPlaces && currentLat && (
              <View className="w-full items-center justify-center py-10">
                <Text className="text-gray-500">
                  No places found. Try a different location or radius.
                </Text>
              </View>
            )}
            {!currentLat && (
              <View className="w-full items-center justify-center py-10">
                <Text className="text-gray-500">
                  Search for a location to see happening events.
                </Text>
              </View>
            )}
          </View>
        )}
      </View>
    </Layout>
  );
}
