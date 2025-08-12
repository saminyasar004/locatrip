import Layout from 'components/layout';
import { useRouter } from 'expo-router';
import { ArrowLeft, MapPin, Star, Users } from 'lucide-react-native';
import { Text, TouchableHighlight, View } from 'react-native';

export default function Index() {
  const router = useRouter();

  return (
    <Layout>
      <View className="row flex h-auto min-h-full w-full flex-1 flex-col items-start">
        <View className="flex w-full flex-row items-center gap-3 bg-white pt-8">
          <TouchableHighlight onPress={() => router.back()} underlayColor={'transparent'}>
            <ArrowLeft size={24} color={'#63707C'} />
          </TouchableHighlight>

          <Text className="text-lg font-semibold text-[#313131]">Day 3</Text>
        </View>

        <View className="flex w-full flex-col gap-2 py-4">
          <Text className="text-2xl font-semibold">
            Hike to Animal Welcome Center & National Park
          </Text>

          <View className="flex w-full flex-row items-center gap-2">
            <MapPin size={18} color={'#63707C'} />

            <Text className="text-lg font-medium text-[#63707C]">
              La Fortuna, Alajuela Province, Costa Rica
            </Text>
          </View>

          <Text className="text-base text-[#63707C]">
            Discover diverse wildlife and lush rainforest trails in this immersive nature
            experience.
          </Text>

          <View className="flex w-full flex-row items-center gap-3">
            <View className="flex flex-row items-center gap-2 rounded-full bg-accent px-3 py-2">
              <Users size={16} color={'#F86241'} />
              <Text className="text-primary">Small Group</Text>
            </View>

            <View className="flex flex-row items-center gap-2 rounded-full bg-accent px-3 py-2">
              <Star size={16} color={'#F86241'} />
              <Text className="text-primary">4.8 rating</Text>
            </View>
          </View>
        </View>
      </View>
    </Layout>
  );
}
