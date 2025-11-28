import Layout from 'components/layout';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  ArrowLeft,
  ChevronRight,
  Clock,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Star,
} from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Text, TouchableHighlight, View } from 'react-native';
import useUserItineraryStore, { PlaceDetailsProps } from 'store/userItineraryStore';

export default function Index() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { place_id, latitude, longitude } = params;
  const { fetchPlaceDetails } = useUserItineraryStore();

  const [details, setDetails] = useState<PlaceDetailsProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDetails = async () => {
      if (place_id && latitude && longitude) {
        const data = await fetchPlaceDetails({
          place_id,
          latitude: Number(latitude),
          longitude: Number(longitude),
        });
        setDetails(data);
        setLoading(false);
      } else {
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

          <Text className="w-full text-lg font-semibold text-[#313131]">Nearest Restaurant</Text>
        </View>

        <View className="flex w-full flex-col gap-2 py-4">
          <Text className="text-2xl font-semibold">{details.name}</Text>

          <Text className="text-base text-[#63707C]">
            {details.description || 'Discover this amazing restaurant.'}
          </Text>

          <View className="flex w-full items-center justify-center py-2">
            <Image
              source={{ uri: details.photos?.[0] || 'https://via.placeholder.com/400' }}
              className="h-72 w-full rounded-xl"
            />
          </View>

          <View className="flex w-full flex-col gap-3 py-3">
            <View className="flex w-full flex-row items-center justify-start gap-2">
              <MapPin size={18} color={'#F86241'} />
              <Text className="text-lg font-medium" numberOfLines={2}>
                {details.address}
              </Text>
            </View>

            {details.opening_hours && details.opening_hours.length > 0 && (
              <View className="flex w-full flex-row items-start gap-2">
                <Clock size={18} color={'#F86241'} />
                <View className="my-0 flex w-full flex-col gap-1 py-0">
                  <Text className="text-lg font-medium leading-tight">Opening Hours</Text>
                  {details.opening_hours.slice(0, 2).map((hours, index) => (
                    <Text key={index} className="text-lg font-normal text-[#63707C]">
                      {hours}
                    </Text>
                  ))}
                </View>
              </View>
            )}

            {details.phone_number && (
              <View className="flex w-full flex-row items-center justify-start gap-2">
                <Phone size={18} color={'#F86241'} />
                <Text className="text-lg font-medium">{details.phone_number}</Text>
              </View>
            )}

            {details.email && (
              <View className="flex w-full flex-row items-center justify-start gap-2">
                <Mail size={18} color={'#F86241'} />
                <Text className="text-lg font-medium">{details.email}</Text>
              </View>
            )}

            {details.social_media?.facebook && (
              <View className="flex w-full flex-row items-center justify-start gap-2">
                <Facebook size={18} color={'#F86241'} />
                <Text className="text-lg font-medium">{details.social_media.facebook}</Text>
              </View>
            )}

            {details.social_media?.instagram && (
              <View className="flex w-full flex-row items-center justify-start gap-2">
                <Instagram size={18} color={'#F86241'} />
                <Text className="text-lg font-medium">{details.social_media.instagram}</Text>
              </View>
            )}
          </View>

          <View className="flex w-full flex-row items-center justify-between rounded-lg border-2 border-primary/40 bg-white px-3 py-4">
            <View className="flex flex-row items-center gap-2">
              <Star size={16} fill={'#E7AE33'} color={'#E7AE33'} />

              <Text className="font-medium">
                {details.total_rating || 'N/A'}/5 ({details.reviews_count || 0} Reviews)
              </Text>
            </View>

            <TouchableHighlight
              onPress={() => router.push('/my-plan/reviews')}
              underlayColor={'transparent'}>
              <ChevronRight size={25} color={'#F86241'} />
            </TouchableHighlight>
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
        </View>
      </View>
    </Layout>
  );
}
