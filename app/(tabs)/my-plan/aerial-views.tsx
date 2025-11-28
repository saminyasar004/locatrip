import Layout from 'components/layout';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { Image, Text, TouchableHighlight, View } from 'react-native';

export default function Index() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { photos: photosParam } = params;

  // Parse photos from params
  const photos = photosParam ? JSON.parse(photosParam as string) : [];

  return (
    <Layout>
      <View className="row flex h-auto min-h-full w-full flex-1 flex-col items-start">
        <View className="flex w-full flex-row items-center gap-3 bg-white pt-4">
          <TouchableHighlight onPress={() => router.back()} underlayColor={'transparent'}>
            <ArrowLeft size={24} color={'#63707C'} />
          </TouchableHighlight>

          <Text className="text-lg font-semibold text-[#313131]">Aerial Views</Text>
        </View>

        {photos.length > 0 ? (
          <View className="flex w-full flex-row flex-wrap justify-between py-3">
            {photos.map((photo: string, index: number) => (
              <View key={index} className="mb-[10px] w-[48%]">
                <Image
                  source={{ uri: photo }}
                  className="h-52 w-full rounded-2xl"
                  resizeMode="cover"
                />
              </View>
            ))}
          </View>
        ) : (
          <View className="flex-1 items-center justify-center py-10">
            <Text className="text-gray-500">No photos available.</Text>
          </View>
        )}
      </View>
    </Layout>
  );
}
