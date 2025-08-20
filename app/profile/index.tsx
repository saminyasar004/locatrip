import Layout from 'components/layout';
import { useRouter } from 'expo-router';
import {
  Calendar,
  ChevronRight,
  Heart,
  Info,
  LogOut,
  Plane,
  ReceiptText,
  SlidersHorizontal,
  UserRound,
  Wallet,
} from 'lucide-react-native';
import { Image, SafeAreaView, ScrollView, Text, TouchableHighlight, View } from 'react-native';

export default function Index() {
  const router = useRouter();

  return (
    <Layout>
      <SafeAreaView className="bg-primary">
        <ScrollView className="h-full w-full" contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex min-h-max w-full flex-col gap-4">
            <View className="row gap-3 py-12">
              <View className="h-auto flex-row items-center gap-4">
                {/* Avatar */}
                <View className="h-20 w-20 overflow-hidden rounded-full">
                  <Image source={require('assets/avatar.jpg')} className="h-full w-full" />
                </View>
                {/* Greetings */}
                <View className="flex flex-col gap-0">
                  <Text className="text-2xl font-semibold text-white">Sarah Jonson</Text>
                  <Text className="text-white">sarah.jonson@gmail.com</Text>
                </View>
              </View>
            </View>
          </View>
          <View className="h-full w-full overflow-hidden rounded-[30px] rounded-bl-none rounded-br-none bg-background py-10">
            <View className="row flex flex-col gap-4">
              <Text className="text-lg font-normal text-[#63707C]">Account</Text>

              <View className="flex w-full flex-row items-center justify-between rounded-lg border-2 border-primary/40 bg-white px-3 py-4">
                <View className="flex flex-row items-center gap-4">
                  <UserRound size={24} color={'#F86241'} />

                  <Text className="font-medium">Personal Informations</Text>
                </View>

                <TouchableHighlight
                  onPress={() => router.push('/profile/personal-informations')}
                  underlayColor={'transparent'}>
                  <ChevronRight size={25} color={'#F86241'} />
                </TouchableHighlight>
              </View>

              <View className="flex w-full flex-row items-center justify-between rounded-lg border-2 border-primary/40 bg-white px-3 py-4">
                <View className="flex flex-row items-center gap-4">
                  <SlidersHorizontal size={24} color={'#F86241'} />

                  <Text className="font-medium">Preferences</Text>
                </View>

                <TouchableHighlight
                  onPress={() => router.push('/personalize/step1')}
                  underlayColor={'transparent'}>
                  <ChevronRight size={25} color={'#F86241'} />
                </TouchableHighlight>
              </View>

              <View className="flex w-full flex-row items-center justify-between rounded-lg border-2 border-primary/40 bg-white px-3 py-4">
                <View className="flex flex-row items-center gap-4">
                  <Wallet size={24} color={'#F86241'} />

                  <Text className="font-medium">Subscriptions</Text>
                </View>

                <TouchableHighlight
                  onPress={() => router.push('/profile/subscription')}
                  underlayColor={'transparent'}>
                  <ChevronRight size={25} color={'#F86241'} />
                </TouchableHighlight>
              </View>

              <View className="flex w-full flex-row items-center justify-between rounded-lg border-2 border-primary/40 bg-white px-3 py-4">
                <View className="flex flex-row items-center gap-4">
                  <Plane size={24} color={'#F86241'} />

                  <Text className="font-medium">My Trip</Text>
                </View>

                <TouchableHighlight
                  onPress={() => router.push('/personalize/step4')}
                  underlayColor={'transparent'}>
                  <ChevronRight size={25} color={'#F86241'} />
                </TouchableHighlight>
              </View>

              <View className="flex w-full flex-row items-center justify-between rounded-lg border-2 border-primary/40 bg-white px-3 py-4">
                <View className="flex flex-row items-center gap-4">
                  <Wallet size={24} color={'#F86241'} />

                  <Text className="font-medium">Subscriptions</Text>
                </View>

                <TouchableHighlight
                  onPress={() => router.push('/my-plan/reviews')}
                  underlayColor={'transparent'}>
                  <ChevronRight size={25} color={'#F86241'} />
                </TouchableHighlight>
              </View>

              <View className="flex w-full flex-row items-center justify-between rounded-lg border-2 border-primary/40 bg-white px-3 py-4">
                <View className="flex flex-row items-center gap-4">
                  <Heart size={24} color={'#F86241'} />

                  <Text className="font-medium">Bookmark</Text>
                </View>

                <TouchableHighlight
                  onPress={() => router.push('/my-plan/reviews')}
                  underlayColor={'transparent'}>
                  <ChevronRight size={25} color={'#F86241'} />
                </TouchableHighlight>
              </View>

              <View className="flex w-full flex-row items-center justify-between rounded-lg border-2 border-primary/40 bg-white px-3 py-4">
                <View className="flex flex-row items-center gap-4">
                  <Calendar size={24} color={'#F86241'} />

                  <Text className="font-medium">Event</Text>
                </View>

                <TouchableHighlight
                  onPress={() => router.push('/my-plan/reviews')}
                  underlayColor={'transparent'}>
                  <ChevronRight size={25} color={'#F86241'} />
                </TouchableHighlight>
              </View>

              <Text className="text-lg font-normal text-[#63707C]">Help & Support</Text>

              <View className="flex w-full flex-row items-center justify-between rounded-lg border-2 border-primary/40 bg-white px-3 py-4">
                <View className="flex flex-row items-center gap-4">
                  <Info size={24} color={'#F86241'} />

                  <Text className="font-medium">Help & Supoprt</Text>
                </View>

                <TouchableHighlight
                  onPress={() => router.push('/profile/help')}
                  underlayColor={'transparent'}>
                  <ChevronRight size={25} color={'#F86241'} />
                </TouchableHighlight>
              </View>

              <View className="flex w-full flex-row items-center justify-between rounded-lg border-2 border-primary/40 bg-white px-3 py-4">
                <View className="flex flex-row items-center gap-4">
                  <ReceiptText size={24} color={'#F86241'} />

                  <Text className="font-medium">Terms & Conditions</Text>
                </View>

                <TouchableHighlight
                  onPress={() => router.push('/my-plan/reviews')}
                  underlayColor={'transparent'}>
                  <ChevronRight size={25} color={'#F86241'} />
                </TouchableHighlight>
              </View>

              <View className="flex w-full items-center justify-center pt-8">
                <TouchableHighlight
                  onPress={() => router.push('/auth/login')}
                  underlayColor={'transparent'}
                  className="flex w-full flex-1 items-center justify-center">
                  <View className="flex w-full flex-row items-center justify-center gap-3 rounded-full border-2 border-primary p-3">
                    <LogOut size={20} color={'#F86241'} />
                    <Text className="text-xl font-bold text-primary">Log Out</Text>
                  </View>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Layout>
  );
}
