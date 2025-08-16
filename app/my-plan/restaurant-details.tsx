import Layout from 'components/layout';
import { useRouter } from 'expo-router';
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

          <Text className="w-full text-lg font-semibold text-[#313131]">Nearest Restaurant</Text>
        </View>

        <View className="flex w-full flex-col gap-2 py-4">
          <Text className="text-2xl font-semibold">Café Mundo</Text>

          <Text className="text-base text-[#63707C]">
            Authentic Costa Rican Cuisine in the Heart of San José.
          </Text>

          <View className="flex w-full items-center justify-center py-2">
            <Image source={require('assets/landscape.jpg')} className="h-72 w-full rounded-xl" />
          </View>

          <View className="flex w-full flex-col gap-3 py-3">
            <View className="flex w-full flex-row items-center justify-start gap-2">
              <MapPin size={18} color={'#F86241'} />
              <Text className="text-lg font-medium">San José, Central Avenue, Costa Rica</Text>
            </View>

            <View className="flex w-full flex-row items-start gap-2">
              <Clock size={18} color={'#F86241'} />
              <View className="my-0 flex w-full flex-col gap-1 py-0">
                <Text className="text-lg font-medium leading-tight">Opening Hours</Text>
                <Text className="text-lg font-normal text-[#63707C]">
                  Mon-Fri: 10 AM - 10:00 PM
                </Text>
                <Text className="text-lg font-normal text-[#63707C]">
                  Sat-Sun: 90 AM - 11:00 PM
                </Text>
              </View>
            </View>

            <View className="flex w-full flex-row items-center justify-start gap-2">
              <Phone size={18} color={'#F86241'} />
              <Text className="text-lg font-medium">+506 2222 5555</Text>
            </View>

            <View className="flex w-full flex-row items-center justify-start gap-2">
              <Mail size={18} color={'#F86241'} />
              <Text className="text-lg font-medium">info@cafemundo.cr</Text>
            </View>

            <View className="flex w-full flex-row items-center justify-start gap-2">
              <Facebook size={18} color={'#F86241'} />
              <Text className="text-lg font-medium">@cafemundocr</Text>
            </View>

            <View className="flex w-full flex-row items-center justify-start gap-2">
              <Instagram size={18} color={'#F86241'} />
              <Text className="text-lg font-medium">@cafemundocr</Text>
            </View>
          </View>

          <View className="flex w-full flex-row items-center justify-between rounded-lg border-2 border-primary/40 bg-white px-3 py-4">
            <View className="flex flex-row items-center gap-2">
              <Star size={16} fill={'#E7AE33'} color={'#E7AE33'} />

              <Text className="font-medium">4.5/5 (200 Reviews)</Text>
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
                onPress={() => router.push('/personalize/step1')}
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
