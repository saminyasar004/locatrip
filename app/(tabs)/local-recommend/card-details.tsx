import Layout from 'components/layout';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Heart,
  MapPin,
  Plus,
  Share2Icon,
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
          latitude,
          longitude,
        });
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

  return (
    <Layout>
      <View className="row flex h-auto min-h-full w-full flex-1 flex-col items-start">
        <View className="flex w-full flex-row items-center gap-3 bg-white pt-4">
          <TouchableHighlight onPress={() => router.back()} underlayColor={'transparent'}>
            <ArrowLeft size={24} color={'#63707C'} />
          </TouchableHighlight>

          <Text className="text-lg font-semibold text-[#313131]">Local Recommend</Text>
        </View>

        <View className="relative mt-5 flex h-60 w-full items-center justify-center">
          <Image
            source={{ uri: details.photos?.[0] || 'https://via.placeholder.com/400' }}
            className="h-full w-full rounded-lg"
          />
          <TouchableHighlight className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white">
            <Heart size={16} color={'#F86241'} />
          </TouchableHighlight>

          <TouchableHighlight className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white">
            <Share2Icon size={16} color={'#F86241'} />
          </TouchableHighlight>
        </View>

        <View className="flex w-full flex-col items-start gap-3 py-4">
          <Text className="text-2xl font-semibold text-foreground">{details.name}</Text>

          <View className="flex w-full flex-row items-center justify-start gap-5">
            <View className="flex flex-row items-center gap-2">
              <Star size={16} fill={'#E7AE33'} color={'#E7AE33'} />
              <Text className="font-medium text-[#63707C]">{details.total_rating || 'N/A'}</Text>
            </View>
            <Text className="text-[#63707C]">
              {details.coordinates
                ? `${details.coordinates.lat.toFixed(2)}, ${details.coordinates.lng.toFixed(2)}`
                : 'Location unavailable'}
            </Text>
          </View>

          <View className="flex w-full flex-col gap-2 py-3">
            <Text className="leading-normal text-[#63707C]">
              {details.description || 'No description available.'}
            </Text>
          </View>

          {details.opening_hours && details.opening_hours.length > 0 && (
            <>
              <View className="flex w-full flex-row items-center gap-3">
                <Calendar size={16} color={'#F86241'} />
                <Text className="text-sm font-medium">Available Daily</Text>
              </View>

              <View className="flex w-full flex-row items-center gap-3">
                <Clock size={16} color={'#F86241'} />
                <Text className="text-sm font-medium">{details.opening_hours[0]}</Text>
              </View>
            </>
          )}

          <View className="flex w-full flex-row items-center gap-3">
            <MapPin size={16} color={'#F86241'} />
            <Text className="text-sm font-medium">{details.address}</Text>
          </View>
        </View>

        <View className="flex w-full items-center justify-center py-10">
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
      </View>
    </Layout>
  );
}
