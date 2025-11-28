import Layout from 'components/layout';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Search, Star } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Text, TextInput, TouchableHighlight, View } from 'react-native';
import useUserItineraryStore, { SuggestedPlaceProps } from 'store/userItineraryStore';

export default function Index() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { places: placesParam, latitude, longitude } = params;
  const { fetchSuggestedPlaces } = useUserItineraryStore();

  const [places, setPlaces] = useState<SuggestedPlaceProps[]>([]);
  const [allPlaces, setAllPlaces] = useState<SuggestedPlaceProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadPlaces = async () => {
      if (placesParam) {
        const parsedPlaces = JSON.parse(placesParam as string);
        setPlaces(parsedPlaces);
        setAllPlaces(parsedPlaces);
        setLoading(false);
      } else if (latitude && longitude) {
        const data = await fetchSuggestedPlaces({
          latitude: Number(latitude),
          longitude: Number(longitude),
          radius: 10000,
          place_type: 'lodging',
        });
        setPlaces(data);
        setAllPlaces(data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    };
    loadPlaces();
  }, [placesParam, latitude, longitude]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setPlaces(allPlaces);
    } else {
      const filtered = allPlaces.filter((place) =>
        place.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setPlaces(filtered);
    }
  }, [searchQuery, allPlaces]);

  return (
    <Layout>
      <View className="row flex h-auto min-h-full w-full flex-1 flex-col items-start">
        <View className="flex w-full flex-row items-center gap-3 bg-white pt-4">
          <TouchableHighlight onPress={() => router.back()} underlayColor={'transparent'}>
            <ArrowLeft size={24} color={'#63707C'} />
          </TouchableHighlight>

          <Text className="w-full text-lg font-semibold text-[#313131]">
            Nearest Hotel & Resort
          </Text>
        </View>

        <View className="flex w-full flex-col gap-1 py-4">
          <View className="flex h-14 w-full flex-row items-center justify-start gap-3 rounded-lg bg-accent pl-5 pr-5">
            <TouchableHighlight underlayColor="transparent">
              <Search size={20} color="#808284" />
            </TouchableHighlight>
            <TextInput
              className="max-w-[90%] text-foreground placeholder:text-[#63707C]"
              placeholder="Search for hotel & resorts"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {loading ? (
            <View className="flex-1 items-center justify-center py-10">
              <ActivityIndicator size="large" color="#F86241" />
            </View>
          ) : places.length > 0 ? (
            <View className="flex w-full flex-row flex-wrap items-center justify-between gap-[10px] py-4">
              {places.map((place, index) => (
                <TouchableHighlight
                  key={index}
                  className="flex w-[48%] flex-col gap-3 rounded-lg bg-white pb-5"
                  onPress={() =>
                    router.push({
                      pathname: '/my-plan/hotel-details',
                      params: {
                        place_id: place.place_id,
                        latitude: latitude || 0,
                        longitude: longitude || 0,
                      },
                    })
                  }
                  underlayColor={'transparent'}>
                  <View>
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
                </TouchableHighlight>
              ))}
            </View>
          ) : (
            <View className="flex-1 items-center justify-center py-10">
              <Text className="text-gray-500">
                {searchQuery ? 'No hotels found matching your search.' : 'No hotels available.'}
              </Text>
            </View>
          )}
        </View>
      </View>
    </Layout>
  );
}
