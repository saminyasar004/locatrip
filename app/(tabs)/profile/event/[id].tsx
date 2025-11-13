import Layout from '@/components/layout';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Globe,
  Mail,
  MapPin,
  Phone,
  Share,
  Share2,
  UserPlus,
} from 'lucide-react-native';
import { Image, Pressable, ScrollView, Text, TouchableHighlight, View } from 'react-native';

export default function Index() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  return (
    <Layout>
      <ScrollView
        className="flex-1 bg-white"
        contentContainerStyle={{ paddingBottom: 0, paddingHorizontal: 20 }}>
        {/* Header */}
        <View className="flex w-full flex-row items-center gap-3 py-3">
          <TouchableHighlight onPress={() => router.back()} underlayColor={'transparent'}>
            <ArrowLeft size={24} color={'#63707C'} />
          </TouchableHighlight>
          <Text className="text-lg font-semibold text-[#313131]">Event</Text>
        </View>

        <View className="flex w-full flex-1 flex-col gap-4">
          <View className="h-auto w-full">
            <Image
              source={require('@/assets/aerial-views-2.jpg')}
              className="h-[200px] w-full rounded-lg"
            />
          </View>

          <Text className="text-lg font-semibold text-black">Summer Music Festival</Text>
          <Text className="text-sm font-normal text-[#63707C]">
            Join us for an amazing outdoor music festival featuring local and international artists.
            Experience live performances, food trucks, and a vibrant atmosphere under the stars.
          </Text>

          <View className="flex w-full flex-row items-center gap-3">
            <Calendar size={16} color={'#F86241'} />
            <Text className="text-sm font-medium">Thursday, August 15, 2025</Text>
          </View>

          <View className="flex w-full flex-row items-center gap-3">
            <Clock size={16} color={'#F86241'} />
            <Text className="text-sm font-medium">18:00 - 23:00</Text>
          </View>

          <View className="flex w-full flex-row items-center gap-3">
            <MapPin size={16} color={'#F86241'} />
            <Text className="text-sm font-medium">La Fortuna, Alajuela Province, Costa Rica</Text>
          </View>

          <View className="mt-5 flex w-full flex-row items-center gap-3">
            <Pressable className="flex w-[48%] flex-row items-center justify-center gap-3 rounded-full bg-primary py-3">
              <Share2 size={20} color={'#fff'} />
              <Text className="text-base font-normal text-white">Share</Text>
            </Pressable>
            <Pressable
              onPress={() => router.push('/profile/event/invite')}
              className="flex w-[48%] flex-row items-center justify-center gap-3 rounded-full bg-primary py-3">
              <UserPlus size={20} color={'#fff'} />
              <Text className="text-base font-normal text-white">Invite</Text>
            </Pressable>
          </View>

          <Text className="mt-5 text-lg font-semibold text-black">About This Event</Text>
          <Text className="text-sm font-normal text-[#63707C]">
            Get ready for the most spectacular music festival of the summer! Our Summer Music
            Festival brings together music lovers from all walks of life for three days of non-stop
            entertainment.
          </Text>
          <Text className="mt-5 text-lg font-semibold text-black">Tag</Text>
          <View className="flex h-auto w-full flex-1 flex-row flex-wrap gap-3">
            <View className="flex items-center justify-center rounded-full bg-primary/10 px-4 py-2">
              <Text className="font-medium text-primary">Hiking & Tracking</Text>
            </View>

            <View className="flex items-center justify-center rounded-full bg-primary/10 px-4 py-2">
              <Text className="font-medium text-primary">Art</Text>
            </View>

            <View className="flex items-center justify-center rounded-full bg-primary/10 px-4 py-2">
              <Text className="font-medium text-primary">Local Festivals</Text>
            </View>

            <View className="flex items-center justify-center rounded-full bg-primary/10 px-4 py-2">
              <Text className="font-medium text-primary">Food & Drink</Text>
            </View>

            <View className="flex items-center justify-center rounded-full bg-primary/10 px-4 py-2">
              <Text className="font-medium text-primary">Camping in Nature</Text>
            </View>
          </View>

          <View className="flex h-auto w-full flex-col gap-4 rounded-lg bg-primary/10 p-4">
            <Text className="text-base font-medium text-black">Organizer</Text>

            <View className="flex w-full flex-row items-start gap-4">
              <View className="flex h-[40px] w-[40px] items-center justify-center rounded-full">
                <Image
                  source={require('@/assets/avatar.jpg')}
                  className="h-full w-full rounded-full"
                />
              </View>

              <View className="flex flex-col gap-3">
                <Text className="text-base font-medium text-black">Music Events Co.</Text>

                <View className="flex flex-row items-center gap-2">
                  <Mail size={16} color={'#63707C'} />
                  <Text className="text-sm font-medium text-[#63707C]">info@musiceventco.com</Text>
                </View>

                <View className="flex flex-row items-center gap-2">
                  <Phone size={16} color={'#63707C'} />
                  <Text className="text-sm font-medium text-[#63707C]">+1 (555) 555-5555</Text>
                </View>

                <View className="flex flex-row items-center gap-2">
                  <Globe size={16} color={'#63707C'} />
                  <Text className="text-sm font-medium text-[#63707C]">www.musiceventco.com</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
}
