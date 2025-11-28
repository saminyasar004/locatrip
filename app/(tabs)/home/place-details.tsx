import Layout from 'components/layout';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  ArrowLeft,
  ChevronRight,
  Clock,
  ExternalLink,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Star,
  Twitter,
} from 'lucide-react-native';
import { useEffect, useState, useRef } from 'react';
import {
  ActivityIndicator,
  Image,
  Linking,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
  FlatList,
  useWindowDimensions,
} from 'react-native';
import useUserItineraryStore, { PlaceDetailsProps } from 'store/userItineraryStore';

export default function PlaceDetails() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { place_id, latitude, longitude } = params;
  const { fetchPlaceDetails } = useUserItineraryStore();

  const [details, setDetails] = useState<PlaceDetailsProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDetails = async () => {
      if (place_id && latitude && longitude) {
        console.log('Fetching details for:', place_id);
        const data = await fetchPlaceDetails({
          place_id,
          latitude,
          longitude,
        });
        console.log('Details fetched:', data ? 'Success' : 'Failed');
        if (data) {
          console.log('Photos count:', data.photos?.length);
          console.log('First photo:', data.photos?.[0]);
        }
        setDetails(data);
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
        <View className="flex-1 items-center justify-center">
          <Text>Failed to load details.</Text>
        </View>
      </Layout>
    );
  }

  const { width } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState(0);

  const onViewRef = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index || 0);
    }
  });

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  return (
    <Layout>
      <View className="row flex h-auto min-h-full w-full flex-1 flex-col items-start">
        <View className="flex w-full flex-row items-center gap-3 bg-white pt-4">
          <TouchableHighlight onPress={() => router.back()} underlayColor={'transparent'}>
            <ArrowLeft size={24} color={'#63707C'} />
          </TouchableHighlight>

          <Text className="w-full text-lg font-semibold text-[#313131]" numberOfLines={1}>
            {details.name}
          </Text>
        </View>

        <ScrollView
          className="flex w-full flex-1 flex-col gap-2 py-4"
          showsVerticalScrollIndicator={false}>
          <Text className="text-2xl font-semibold">{details.name}</Text>

          <Text className="text-base text-[#63707C]">{details.description}</Text>

          <View className="flex w-full flex-col items-center justify-center py-2">
            <FlatList
              data={
                details.photos && details.photos.length > 0
                  ? details.photos
                  : ['https://via.placeholder.com/400']
              }
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={{ width: width }} className="items-center justify-center px-4">
                  <Image
                    source={{ uri: item }}
                    className="h-72 w-full rounded-xl"
                    resizeMode="cover"
                  />
                </View>
              )}
              onViewableItemsChanged={onViewRef.current}
              viewabilityConfig={viewConfigRef.current}
              className="w-full"
            />

            {/* Pagination Dots */}
            {details.photos && details.photos.length > 1 && (
              <View className="flex flex-row gap-2 pt-3">
                {details.photos.map((_, index) => (
                  <View
                    key={index}
                    className={`h-2 w-2 rounded-full ${
                      index === activeIndex ? 'bg-primary' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </View>
            )}
          </View>

          <View className="flex w-full flex-col gap-3 py-3">
            <View className="flex w-full flex-row items-start justify-start gap-2">
              <MapPin size={18} color={'#F86241'} className="mt-1" />
              <Text className="flex-1 text-lg font-medium">{details.address}</Text>
            </View>

            {details.opening_hours && details.opening_hours.length > 0 && (
              <View className="flex w-full flex-row items-start gap-2">
                <Clock size={18} color={'#F86241'} className="mt-1" />
                <View className="my-0 flex w-full flex-col gap-1 py-0">
                  <Text className="text-lg font-medium leading-tight">Opening Hours</Text>
                  {details.opening_hours.map((hour, index) => (
                    <Text key={index} className="text-lg font-normal text-[#63707C]">
                      {hour}
                    </Text>
                  ))}
                </View>
              </View>
            )}

            {details.phone && (
              <View className="flex w-full flex-row items-center justify-start gap-2">
                <Phone size={18} color={'#F86241'} />
                <Text className="text-lg font-medium">{details.phone}</Text>
              </View>
            )}

            {details.website && (
              <View className="flex w-full flex-row items-center justify-start gap-2">
                <ExternalLink size={18} color={'#F86241'} />
                <Text
                  className="text-lg font-medium text-primary underline"
                  onPress={() => Linking.openURL(details.website)}>
                  Visit Website
                </Text>
              </View>
            )}
          </View>

          {details.total_rating && (
            <View className="flex w-full flex-row items-center justify-between rounded-lg border-2 border-primary/40 bg-white px-3 py-4">
              <View className="flex flex-row items-center gap-2">
                <Star size={16} fill={'#E7AE33'} color={'#E7AE33'} />
                <Text className="font-medium">
                  {details.total_rating}/5 ({details.reviews?.length || 0} Reviews)
                </Text>
              </View>

              <TouchableHighlight underlayColor={'transparent'}>
                <ChevronRight size={25} color={'#F86241'} />
              </TouchableHighlight>
            </View>
          )}

          <View className="flex w-full flex-col gap-2 py-4">
            <Text className="text-xl font-semibold">Location</Text>

            <View className="flex w-full items-center justify-center py-4">
              <Image
                source={require('assets/map.png')}
                className="relative h-52 w-full rounded-xl"
                resizeMode="cover"
              />
              {details.maps_link && (
                <TouchableHighlight
                  onPress={() => Linking.openURL(details.maps_link!)}
                  className="absolute bottom-8 right-4 flex w-min items-center justify-center rounded-full bg-background px-3 py-1.5 shadow-sm"
                  underlayColor="transparent">
                  <View className="flex flex-row items-center gap-2">
                    <MapPin size={18} color={'#F86241'} />
                    <Text className="flex items-center text-base font-bold text-primary">
                      View Full Map
                    </Text>
                  </View>
                </TouchableHighlight>
              )}
            </View>
          </View>

          {/* Reviews Section */}
          {details.reviews && details.reviews.length > 0 && (
            <View className="flex w-full flex-col gap-4 pb-8">
              <View className="flex w-full flex-row items-center justify-between py-2">
                <Text className="text-xl font-semibold text-foreground">Visitors Reviews</Text>
                <Text className="text-base font-semibold text-primary">View All</Text>
              </View>

              {details.reviews.map((review, index) => (
                <View
                  key={index}
                  className="flex w-full flex-col gap-4 rounded-lg bg-white p-4 shadow-sm">
                  <View className="flex w-full flex-row items-center justify-start gap-2">
                    <Image
                      source={require('assets/avatar.jpg')}
                      className="h-10 w-10 rounded-full"
                    />
                    <View className="flex flex-col">
                      <Text className="text-lg font-medium">{review.author}</Text>
                      <View className="flex flex-row items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            fill={i < Math.round(review.rating) ? '#E7AE33' : 'none'}
                            color={'#E7AE33'}
                          />
                        ))}
                        <Text className="pl-2 text-sm text-[#63707C]">{review.time}</Text>
                      </View>
                    </View>
                  </View>
                  <View className="flex w-full items-center">
                    <Text className="text-base text-[#63707C]">{review.text}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    </Layout>
  );
}
