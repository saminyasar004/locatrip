import Layout from '@/components/layout';
import { useRouter } from 'expo-router';
import { ArrowLeft, Search } from 'lucide-react-native';
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';

export default function Index() {
  const router = useRouter();

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

        <View className="flex w-full flex-1 flex-col gap-3">
          <View className="flex h-[50px] w-full flex-row items-center gap-3 rounded-full bg-[#FFF4F2] px-5 py-3">
            <Search size={20} color={'#808284'} />
            <TextInput
              className="h-[50px] w-full flex-1 text-base font-normal text-[#63707C] placeholder:text-[#808284]"
              placeholder="Search for an event"
            />
          </View>

          {Array.from({ length: 20 }).map((_, index) => (
            <View
              key={index}
              className="mt-5 flex w-full flex-1 flex-row items-center justify-between gap-3">
              <View className="flex flex-row items-center gap-3">
                <View className="flex h-[40px] w-[40px] items-center justify-center rounded-full">
                  <Image
                    source={require('@/assets/avatar.jpg')}
                    className="h-full w-full rounded-full"
                  />
                </View>

                <Text className="text-base font-medium text-black">Jane Cooper</Text>
              </View>

              <Pressable className="flex items-center justify-center rounded-full bg-primary px-6 py-2">
                <Text className="text-base font-medium text-white">Invite</Text>
              </Pressable>
            </View>
          ))}
        </View>
      </ScrollView>
    </Layout>
  );
}
