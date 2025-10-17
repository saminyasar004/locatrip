import Layout from 'components/layout';
import { useRouter } from 'expo-router';
import { ArrowLeft, Search, Star } from 'lucide-react-native';
import { Image, Text, TextInput, TouchableHighlight, View } from 'react-native';

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

        <View className="flex w-full flex-col gap-1 py-4">
          <View className="flex h-14 w-full flex-row items-center justify-start gap-3 rounded-lg bg-accent pl-5 pr-5">
            <TouchableHighlight underlayColor="transparent">
              <Search size={20} color="#808284" />
            </TouchableHighlight>
            <TextInput
              className="max-w-[90%] text-foreground"
              placeholder="Search for restaurants"
            />
          </View>

          <View className="flex w-full flex-row flex-wrap items-center justify-between gap-[10px] py-4">
            {/* Event cards */}
            {Array.from({ length: 2 }).map((_, index) => (
              <TouchableHighlight
                className="flex w-[48%] flex-col gap-3 rounded-lg bg-white pb-5"
                onPress={() => router.push('/my-plan/restaurant-details')}
                underlayColor={'transparent'}
                key={index}>
                <View>
                  <View className="flex h-40 items-center justify-center">
                    <Image
                      source={require(`assets/restaurant.jpg`)}
                      className="h-full w-full rounded-lg"
                    />
                  </View>
                  <View className="flex flex-col gap-3 bg-white px-6">
                    <Text className="text-lg font-medium">Museo Nacional</Text>
                    <View className="flex w-full flex-row items-center justify-between">
                      <View className="flex flex-row items-center gap-2">
                        <Star size={16} fill={'#E7AE33'} color={'#E7AE33'} />
                        <Text className="font-medium text-[#63707C]">4.8</Text>
                      </View>
                      <Text className="text-[#63707C]">2.5 Km</Text>
                    </View>
                  </View>
                </View>
              </TouchableHighlight>
            ))}
          </View>

          <View className="flex w-full flex-row flex-wrap items-center justify-between gap-[10px] py-4">
            {/* Event cards */}
            {Array.from({ length: 2 }).map((_, index) => (
              <View key={index} className="flex w-[48%] flex-col gap-3 rounded-lg bg-white pb-5">
                <View className="flex h-40 items-center justify-center">
                  <Image
                    source={require(`assets/resorts.jpg`)}
                    className="h-full w-full rounded-lg"
                  />
                </View>
                <View className="flex flex-col gap-3 bg-white px-6">
                  <Text className="text-lg font-medium">Fiesta de los Diablitos</Text>
                  <View className="flex w-full flex-row items-center justify-between">
                    <View className="flex flex-row items-center gap-2">
                      <Star size={16} fill={'#E7AE33'} color={'#E7AE33'} />
                      <Text className="font-medium text-[#63707C]">4.8</Text>
                    </View>
                    <Text className="text-[#63707C]">2.5 Km</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>

          <View className="flex w-full flex-row flex-wrap items-center justify-between gap-[10px] py-4">
            {/* Event cards */}
            {Array.from({ length: 2 }).map((_, index) => (
              <View key={index} className="flex w-[48%] flex-col gap-3 rounded-lg bg-white pb-5">
                <View className="flex h-40 items-center justify-center">
                  <Image
                    source={require(`assets/art-1.jpg`)}
                    className="h-full w-full rounded-lg"
                  />
                </View>
                <View className="flex flex-col gap-3 bg-white px-6">
                  <Text className="text-lg font-medium">Fiesta de los Diablitos</Text>
                  <View className="flex w-full flex-row items-center justify-between">
                    <View className="flex flex-row items-center gap-2">
                      <Star size={16} fill={'#E7AE33'} color={'#E7AE33'} />
                      <Text className="font-medium text-[#63707C]">4.8</Text>
                    </View>
                    <Text className="text-[#63707C]">2.5 Km</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>

          <View className="flex w-full flex-row flex-wrap items-center justify-between gap-[10px] py-4">
            {/* Event cards */}
            {Array.from({ length: 2 }).map((_, index) => (
              <View key={index} className="flex w-[48%] flex-col gap-3 rounded-lg bg-white pb-5">
                <View className="flex h-40 items-center justify-center">
                  <Image
                    source={require(`assets/event-3.jpg`)}
                    className="h-full w-full rounded-lg"
                  />
                </View>
                <View className="flex flex-col gap-3 bg-white px-6">
                  <Text className="text-lg font-medium">Fiesta de los Diablitos</Text>
                  <View className="flex w-full flex-row items-center justify-between">
                    <View className="flex flex-row items-center gap-2">
                      <Star size={16} fill={'#E7AE33'} color={'#E7AE33'} />
                      <Text className="font-medium text-[#63707C]">4.8</Text>
                    </View>
                    <Text className="text-[#63707C]">2.5 Km</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </Layout>
  );
}
