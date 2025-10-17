import Layout from 'components/layout';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { Image, Text, TouchableHighlight, View } from 'react-native';

export default function Index() {
  const router = useRouter();

  return (
    <Layout>
      <View className="row flex h-auto min-h-full w-full flex-1 flex-col items-start">
        <View className="flex w-full flex-row items-center gap-3 bg-white pt-8">
          <TouchableHighlight onPress={() => router.back()} underlayColor={'transparent'}>
            <ArrowLeft size={24} color={'#63707C'} />
          </TouchableHighlight>

          <Text className="text-lg font-semibold text-[#313131]">Aerial Views</Text>
        </View>

        <View className="flex w-full flex-row gap-5 py-3">
          <Image
            source={require('assets/aerial-views-1.jpg')}
            className="h-52 w-[48%] rounded-2xl"
            resizeMode="cover"
          />

          <Image
            source={require('assets/aerial-views-2.jpg')}
            className="h-52 w-[48%] rounded-2xl"
            resizeMode="cover"
          />
        </View>

        <View className="flex w-full flex-row gap-5 py-3">
          <Image
            source={require('assets/art-1.jpg')}
            className="h-52 w-[48%] rounded-2xl"
            resizeMode="cover"
          />

          <Image
            source={require('assets/art-2.jpg')}
            className="h-52 w-[48%] rounded-2xl"
            resizeMode="cover"
          />
        </View>

        <View className="flex w-full flex-row gap-5 py-3">
          <Image
            source={require('assets/landscape.jpg')}
            className="h-52 w-[48%] rounded-2xl"
            resizeMode="cover"
          />

          <Image
            source={require('assets/dinner.jpg')}
            className="h-52 w-[48%] rounded-2xl"
            resizeMode="cover"
          />
        </View>

        <View className="flex w-full flex-row gap-5 py-3">
          <Image
            source={require('assets/event-1.jpg')}
            className="h-52 w-[48%] rounded-2xl"
            resizeMode="cover"
          />

          <Image
            source={require('assets/event-2.jpg')}
            className="h-52 w-[48%] rounded-2xl"
            resizeMode="cover"
          />
        </View>

        <View className="flex w-full flex-row gap-5 py-3">
          <Image
            source={require('assets/event-3.jpg')}
            className="h-52 w-[48%] rounded-2xl"
            resizeMode="cover"
          />

          <Image
            source={require('assets/event-4.jpg')}
            className="h-52 w-[48%] rounded-2xl"
            resizeMode="cover"
          />
        </View>

        <View className="flex w-full flex-row gap-5 py-3">
          <Image
            source={require('assets/event-5.jpg')}
            className="h-52 w-[48%] rounded-2xl"
            resizeMode="cover"
          />

          <Image
            source={require('assets/event-6.jpg')}
            className="h-52 w-[48%] rounded-2xl"
            resizeMode="cover"
          />
        </View>
      </View>
    </Layout>
  );
}
