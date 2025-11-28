import Layout from 'components/layout';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, MapPin, Star, Users } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Text, TouchableHighlight, View } from 'react-native';
import useUserItineraryStore, {
  PlaceDetailsProps,
  SuggestedPlaceProps,
} from 'store/userItineraryStore';

export default function Index() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { place_id, latitude, longitude, day_number } = params;
  const { fetchPlaceDetails, fetchSuggestedPlaces } = useUserItineraryStore();

  const [details, setDetails] = useState<PlaceDetailsProps | null>(null);
  const [loading, setLoading] = useState(true);

  // Nearby places
  const [nearbyRestaurants, setNearbyRestaurants] = useState<SuggestedPlaceProps[]>([]);
  const [nearbyHotels, setNearbyHotels] = useState<SuggestedPlaceProps[]>([]);
  const [nearbyArt, setNearbyArt] = useState<SuggestedPlaceProps[]>([]);
  const [nearbyEvents, setNearbyEvents] = useState<SuggestedPlaceProps[]>([]);

  useEffect(() => {
    const loadDetails = async () => {
      console.log('Loading plan details with params:', {
        place_id,
        latitude,
        longitude,
        day_number,
      });

      if (place_id && latitude && longitude) {
        try {
          const data = await fetchPlaceDetails({
            place_id,
            latitude: Number(latitude),
            longitude: Number(longitude),
          });

          console.log('Fetched place details:', data);

          if (data) {
            setDetails(data);

            // Fetch nearby places
            const lat = data.coordinates?.lat || Number(latitude);
            const lng = data.coordinates?.lng || Number(longitude);

            console.log('Fetching nearby places with coords:', { lat, lng });

            // Fetch nearby restaurants
            const restaurants = await fetchSuggestedPlaces({
              latitude: lat,
              longitude: lng,
              radius: 5000,
              place_type: 'restaurant',
            });
            setNearbyRestaurants(restaurants.slice(0, 2));

            // Fetch nearby hotels
            const hotels = await fetchSuggestedPlaces({
              latitude: lat,
              longitude: lng,
              radius: 5000,
              place_type: 'lodging',
            });
            setNearbyHotels(hotels.slice(0, 2));

            // Fetch nearby art
            const art = await fetchSuggestedPlaces({
              latitude: lat,
              longitude: lng,
              radius: 5000,
              place_type: 'museum',
            });
            setNearbyArt(art.slice(0, 2));

            // Fetch nearby events
            const events = await fetchSuggestedPlaces({
              latitude: lat,
              longitude: lng,
              radius: 5000,
              place_type: 'night_club',
            });
            setNearbyEvents(events.slice(0, 2));
          } else {
            console.log('No data returned from fetchPlaceDetails');
          }
        } catch (error) {
          console.error('Error loading plan details:', error);
        } finally {
          setLoading(false);
        }
      } else {
        console.log('Missing required params:', { place_id, latitude, longitude });
        setLoading(false);
      }
    };
    loadDetails();
  }, [place_id, latitude, longitude]);

  if (loading) {
    return (
      <Layout>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#F86241" />
        </View>
      </Layout>
    );
  }

  if (!details) {
    return (
      <Layout>
        <View className="flex-1 items-center justify-center px-4">
          <Text className="text-center text-lg">Failed to load details.</Text>
          <Text className="mt-2 text-center text-sm text-gray-500">
            Place ID: {place_id || 'N/A'}
          </Text>
          <TouchableHighlight
            onPress={() => router.back()}
            className="mt-4 rounded-full bg-primary px-6 py-3">
            <Text className="font-semibold text-white">Go Back</Text>
          </TouchableHighlight>
        </View>
      </Layout>
    );
  }

  return (
    <Layout>
      <View className="row flex h-auto min-h-full w-full flex-1 flex-col items-start">
        <View className="flex w-full flex-row items-center gap-3 bg-white pt-4">
          <TouchableHighlight onPress={() => router.back()} underlayColor={'transparent'}>
            <ArrowLeft size={24} color={'#63707C'} />
          </TouchableHighlight>

          <Text className="w-full text-lg font-semibold text-[#313131]">
            {day_number ? `Day ${day_number}` : 'Plan Details'}
          </Text>
        </View>

        <View className="flex w-full flex-col gap-2 py-4">
          <Text className="text-2xl font-semibold">{details.name}</Text>

          <View className="flex w-full flex-row items-center gap-2">
            <MapPin size={18} color={'#63707C'} />

            <Text className="text-lg font-medium text-[#63707C]" numberOfLines={1}>
              {details.address}
            </Text>
          </View>

          <Text className="text-base text-[#63707C]">
            {details.description || 'Discover this amazing location.'}
          </Text>

          <View className="flex w-full flex-row items-center gap-3">
            <View className="flex flex-row items-center gap-2 rounded-full bg-accent px-3 py-2">
              <Users size={16} color={'#F86241'} />
              <Text className="text-primary">Small Group</Text>
            </View>

            <View className="flex flex-row items-center gap-2 rounded-full bg-accent px-3 py-2">
              <Star size={16} color={'#F86241'} />
              <Text className="text-primary">{details.total_rating || 'N/A'} rating</Text>
            </View>
          </View>

          <View className="flex w-full items-center justify-center py-2">
            <Image
              source={{ uri: details.photos?.[0] || 'https://via.placeholder.com/400' }}
              className="h-72 w-full rounded-xl"
            />
          </View>

          <View className="flex w-full flex-col gap-2">
            <Text className="text-xl font-semibold">About This Spot</Text>

            <Text className="text-base text-[#63707C]">
              {details.description ||
                'Explore this wonderful destination and create unforgettable memories.'}
            </Text>

            {details.opening_hours && details.opening_hours.length > 0 && (
              <Text className="text-base text-[#63707C]">
                The location is open and welcoming visitors. Check the practical information below
                for specific hours.
              </Text>
            )}
          </View>

          {details.photos && details.photos.length > 1 && (
            <>
              <View className="flex w-full flex-row items-center justify-between py-5">
                <Text className="text-xl font-semibold text-foreground">Aerial Views</Text>
                <TouchableHighlight
                  onPress={() =>
                    router.push({
                      pathname: '/my-plan/aerial-views',
                      params: {
                        photos: JSON.stringify(details.photos || []),
                      },
                    })
                  }
                  underlayColor={'transparent'}
                  className="flex items-end py-2">
                  <Text className="text-base font-semibold text-primary">View All</Text>
                </TouchableHighlight>
              </View>

              <View className="flex w-full flex-row flex-wrap gap-4">
                {details.photos.slice(1, 3).map((photo, index) => (
                  <View key={index} className="w-[48%] items-center justify-center">
                    <Image
                      source={{ uri: photo }}
                      className="h-52 w-full rounded-xl"
                      resizeMode="cover"
                    />
                  </View>
                ))}
              </View>
            </>
          )}

          <View className="flex w-full flex-col gap-2 py-4">
            <Text className="text-xl font-semibold">A Glimpse into the past</Text>

            <Text className="text-base text-[#63707C]">
              This location has a rich history and cultural significance. It has been a beloved
              destination for visitors seeking authentic experiences and memorable adventures.
            </Text>

            <Text className="text-base text-[#63707C]">
              Over the years, it has become known for its unique character and contribution to the
              local community, offering visitors an opportunity to connect with the area's heritage.
            </Text>
          </View>

          <View className="flex w-full flex-col gap-2 py-4">
            <Text className="text-xl font-semibold">Location</Text>

            <View className="flex w-full items-center justify-center py-4">
              <Image
                source={require('assets/map.png')}
                className="relative h-52 w-full rounded-xl"
                resizeMode="cover"
              />
              <TouchableHighlight
                onPress={() => {
                  if (details.maps_link) {
                    // Open maps link
                  }
                }}
                className="absolute bottom-8 right-4 flex w-min items-center justify-center rounded-full bg-background px-3 py-1.5 shadow-sm"
                underlayColor="transparent">
                <View className="flex flex-row items-center gap-2">
                  <MapPin size={18} color={'#F86241'} />

                  <Text className="flex items-center text-base font-bold text-primary">
                    View Full Map
                  </Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>

          {details.opening_hours && details.opening_hours.length > 0 && (
            <View className="flex w-full flex-col gap-2 py-4">
              <Text className="text-xl font-semibold">Practical Information</Text>

              <View className="flex w-full flex-row gap-4 py-4">
                <View className="flex flex-col gap-2 rounded-lg bg-primary/10 p-3">
                  <Text className="text-base font-medium text-primary">Opening Hours</Text>

                  <Text className="text-balance font-normal text-[#7c7c7c]">
                    {details.opening_hours[0]}
                  </Text>
                </View>
                <View className="flex flex-col gap-2 rounded-lg bg-primary/10 p-3">
                  <Text className="text-base font-medium text-primary">Best Time to Visit</Text>

                  <Text className="text-balance font-normal text-[#7c7c7c]">
                    Morning hours recommended
                  </Text>
                </View>
              </View>
            </View>
          )}

          {nearbyRestaurants.length > 0 && (
            <>
              <View className="flex w-full flex-row items-center justify-between py-2">
                <Text className="text-xl font-semibold text-foreground">Nearest Restaurant</Text>
                <TouchableHighlight
                  onPress={() =>
                    router.push({
                      pathname: '/my-plan/nearest-restaurant',
                      params: {
                        places: JSON.stringify(nearbyRestaurants),
                        latitude: details.coordinates?.lat || Number(latitude),
                        longitude: details.coordinates?.lng || Number(longitude),
                      },
                    })
                  }
                  underlayColor={'transparent'}
                  className="flex items-end py-2">
                  <Text className="text-base font-semibold text-primary">View All</Text>
                </TouchableHighlight>
              </View>

              <View className="flex w-full flex-row flex-wrap items-center justify-between gap-[10px] py-4">
                {nearbyRestaurants.map((place, index) => (
                  <View
                    key={index}
                    className="flex w-[48%] flex-col gap-3 rounded-lg bg-white pb-5">
                    <View className="flex h-40 items-center justify-center">
                      <Image
                        source={{ uri: place.thumbnail || 'https://via.placeholder.com/150' }}
                        className="h-full w-full rounded-lg"
                      />
                    </View>
                    <View className="flex flex-col gap-3 bg-white px-6">
                      <Text className="text-lg font-medium" numberOfLines={1}>
                        {place.name}
                      </Text>
                      <View className="flex w-full flex-row items-center justify-between">
                        <View className="flex flex-row items-center gap-2">
                          <Star size={16} fill={'#E7AE33'} color={'#E7AE33'} />
                          <Text className="font-medium text-[#63707C]">
                            {place.total_rating || 'N/A'}
                          </Text>
                        </View>
                        <Text className="text-[#63707C]">{place.distance?.toFixed(1)} Km</Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </>
          )}

          {nearbyHotels.length > 0 && (
            <>
              <View className="flex w-full flex-row items-center justify-between py-2">
                <Text className="text-xl font-semibold text-foreground">
                  Nearest Hotel & Resorts
                </Text>
                <TouchableHighlight
                  onPress={() =>
                    router.push({
                      pathname: '/my-plan/nearest-hotel',
                      params: {
                        places: JSON.stringify(nearbyHotels),
                        latitude: details.coordinates?.lat || Number(latitude),
                        longitude: details.coordinates?.lng || Number(longitude),
                      },
                    })
                  }
                  underlayColor={'transparent'}
                  className="flex items-end py-2">
                  <Text className="text-base font-semibold text-primary">View All</Text>
                </TouchableHighlight>
              </View>

              <View className="flex w-full flex-row flex-wrap items-center justify-between gap-[10px] py-4">
                {nearbyHotels.map((place, index) => (
                  <View
                    key={index}
                    className="flex w-[48%] flex-col gap-3 rounded-lg bg-white pb-5">
                    <View className="flex h-40 items-center justify-center">
                      <Image
                        source={{ uri: place.thumbnail || 'https://via.placeholder.com/150' }}
                        className="h-full w-full rounded-lg"
                      />
                    </View>
                    <View className="flex flex-col gap-3 bg-white px-6">
                      <Text className="text-lg font-medium" numberOfLines={1}>
                        {place.name}
                      </Text>
                      <View className="flex w-full flex-row items-center justify-between">
                        <View className="flex flex-row items-center gap-2">
                          <Star size={16} fill={'#E7AE33'} color={'#E7AE33'} />
                          <Text className="font-medium text-[#63707C]">
                            {place.total_rating || 'N/A'}
                          </Text>
                        </View>
                        <Text className="text-[#63707C]">{place.distance?.toFixed(1)} Km</Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </>
          )}

          {nearbyArt.length > 0 && (
            <>
              <View className="flex w-full flex-row items-center justify-between py-2">
                <Text className="text-xl font-semibold text-foreground">
                  Nearest Art Enthusiasts
                </Text>
                <TouchableHighlight
                  onPress={() =>
                    router.push({
                      pathname: '/my-plan/nearest-art',
                      params: {
                        places: JSON.stringify(nearbyArt),
                        latitude: details.coordinates?.lat || Number(latitude),
                        longitude: details.coordinates?.lng || Number(longitude),
                      },
                    })
                  }
                  underlayColor={'transparent'}
                  className="flex items-end py-2">
                  <Text className="text-base font-semibold text-primary">View All</Text>
                </TouchableHighlight>
              </View>

              <View className="flex w-full flex-row flex-wrap items-center justify-between gap-[10px] py-4">
                {nearbyArt.map((place, index) => (
                  <View
                    key={index}
                    className="flex w-[48%] flex-col gap-3 rounded-lg bg-white pb-5">
                    <View className="flex h-40 items-center justify-center">
                      <Image
                        source={{ uri: place.thumbnail || 'https://via.placeholder.com/150' }}
                        className="h-full w-full rounded-lg"
                      />
                    </View>
                    <View className="flex flex-col gap-3 bg-white px-6">
                      <Text className="text-lg font-medium" numberOfLines={1}>
                        {place.name}
                      </Text>
                      <View className="flex w-full flex-row items-center justify-between">
                        <View className="flex flex-row items-center gap-2">
                          <Star size={16} fill={'#E7AE33'} color={'#E7AE33'} />
                          <Text className="font-medium text-[#63707C]">
                            {place.total_rating || 'N/A'}
                          </Text>
                        </View>
                        <Text className="text-[#63707C]">{place.distance?.toFixed(1)} Km</Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </>
          )}

          {nearbyEvents.length > 0 && (
            <>
              <View className="flex w-full flex-row items-center justify-between py-2">
                <Text className="text-xl font-semibold text-foreground">
                  Nearest Local Festivals & Events
                </Text>
                <TouchableHighlight
                  onPress={() =>
                    router.push({
                      pathname: '/my-plan/nearest-local-festival',
                      params: {
                        places: JSON.stringify(nearbyEvents),
                        latitude: details.coordinates?.lat || Number(latitude),
                        longitude: details.coordinates?.lng || Number(longitude),
                      },
                    })
                  }
                  underlayColor={'transparent'}
                  className="flex items-end py-2">
                  <Text className="text-base font-semibold text-primary">View All</Text>
                </TouchableHighlight>
              </View>

              <View className="flex w-full flex-row flex-wrap items-center justify-between gap-[10px] py-4">
                {nearbyEvents.map((place, index) => (
                  <View
                    key={index}
                    className="flex w-[48%] flex-col gap-3 rounded-lg bg-white pb-5">
                    <View className="flex h-40 items-center justify-center">
                      <Image
                        source={{ uri: place.thumbnail || 'https://via.placeholder.com/150' }}
                        className="h-full w-full rounded-lg"
                      />
                    </View>
                    <View className="flex flex-col gap-3 bg-white px-6">
                      <Text className="text-lg font-medium" numberOfLines={1}>
                        {place.name}
                      </Text>
                      <View className="flex w-full flex-row items-center justify-between">
                        <View className="flex flex-row items-center gap-2">
                          <Star size={16} fill={'#E7AE33'} color={'#E7AE33'} />
                          <Text className="font-medium text-[#63707C]">
                            {place.total_rating || 'N/A'}
                          </Text>
                        </View>
                        <Text className="text-[#63707C]">{place.distance?.toFixed(1)} Km</Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </>
          )}
        </View>
      </View>
    </Layout>
  );
}
