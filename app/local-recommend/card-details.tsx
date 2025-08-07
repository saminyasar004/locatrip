import Layout from 'components/layout';
import { useRouter } from 'expo-router';
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

          <Text className="text-lg font-semibold text-[#313131]">Local Recommend</Text>
        </View>

        <View className="relative mt-5 flex h-60 w-full items-center justify-center">
          <Image source={require(`assets/event-1.jpg`)} className="h-full w-full rounded-lg" />
          <TouchableHighlight className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white">
            <Heart size={16} color={'#F86241'} />
          </TouchableHighlight>

          <TouchableHighlight className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white">
            <Share2Icon size={16} color={'#F86241'} />
          </TouchableHighlight>
        </View>

        <View className="flex w-full flex-col items-start gap-3 py-4">
          <Text className="text-2xl font-semibold text-foreground">Arenal Sunrise Jungle Trek</Text>

          <View className="flex w-full flex-row items-center justify-start gap-5">
            <View className="flex flex-row items-center gap-2">
              <Star size={16} fill={'#E7AE33'} color={'#E7AE33'} />
              <Text className="font-medium text-[#63707C]">4.8</Text>
            </View>
            <Text className="text-[#63707C]">2.5 Km</Text>
          </View>

          <View className="flex w-full flex-col gap-2 py-3">
            <Text className="leading-normal text-[#63707C]">
              Embark on an unforgettable journey through the lush Arenal rainforest. This guided
              trek takes you deep into the heart of the jungle, offering breathtaking views of the
              Arenal Volcano at sunrise. Discover diverse flora and fauna, including monkeys,
              sloths, and exotic birds, in their natural habitat. Our experienced guides will share
              fascinating insights into the ecosystem and local culture. Perfect for nature lovers
              and adventure seekers!
            </Text>
          </View>

          <View className="flex w-full flex-row items-center gap-3">
            <Calendar size={16} color={'#F86241'} />
            <Text className="text-sm font-medium">Available Daily</Text>
          </View>

          <View className="flex w-full flex-row items-center gap-3">
            <Clock size={16} color={'#F86241'} />
            <Text className="text-sm font-medium">18:00 - 23:00</Text>
          </View>

          <View className="flex w-full flex-row items-center gap-3">
            <MapPin size={16} color={'#F86241'} />
            <Text className="text-sm font-medium">La Fortuna, Alajuela Province, Costa Rica</Text>
          </View>
        </View>

        <View className="flex w-full items-center justify-center py-10">
          <TouchableHighlight
            onPress={() => router.push('/personalize/step1')}
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
