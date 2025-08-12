import Layout from 'components/layout';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ArrowLeft, Calendar, ChevronRight, Clock, Plus } from 'lucide-react-native';
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

          <Text className="text-lg font-semibold text-[#313131]">My Plan</Text>
        </View>

        <View className="flex w-full items-center justify-center py-5">
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

        <View className="h-44 w-full rounded-lg">
          <LinearGradient
            colors={['#F3592F', '#F35336', '#EF4740']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ borderRadius: 10 }}
            className="h-full w-full rounded-lg p-3">
            <View className="flex w-full flex-row items-center justify-between gap-3">
              <View className="flex flex-col gap-2">
                <Text className="text-lg font-semibold text-white">Costa Rica</Text>
                <View className="flex w-full flex-row items-center gap-3">
                  <View className="flex flex-row items-center gap-2">
                    <Calendar size={16} color={'#ffffff'} />
                    <Text className="text-white">Nov 1 - Nov 5, 2025</Text>
                  </View>

                  <View className="flex flex-row items-center gap-2">
                    <Clock size={16} color={'#ffffff'} />
                    <Text className="text-white">5 Days</Text>
                  </View>
                </View>
              </View>

              <View className="h-8 rounded-full bg-white p-2 px-4">
                <Text className="text-xs font-medium text-primary">2 Days Left</Text>
              </View>
            </View>

            <View className="flex flex-col items-center gap-2 py-8">
              <View className="flex w-full flex-row items-center justify-between">
                <Text className="text-base text-white">Trip Planning Progress</Text>
                <Text className="text-lg font-medium text-white">75% Complete</Text>
              </View>
              <View className="flex h-3 w-full items-start rounded-full bg-[#F46F65]">
                <View className="h-full w-[60%] rounded-full bg-white"></View>
              </View>
            </View>
          </LinearGradient>
        </View>

        <View className="flex w-full flex-row items-center justify-between py-8">
          <Text className="text-xl font-semibold text-foreground">Your Itinerary</Text>
          <Text className="text-base font-semibold text-primary">View All</Text>
        </View>

        {/* Itinerary Cards */}
        <View className="flex w-full flex-col gap-4">
          <View className="flex h-auto w-full flex-col items-center gap-3 rounded-lg bg-[#F86241]/15 p-3 py-6">
            <View className="flex w-full flex-row items-center justify-between">
              <Text className="text-lg font-semibold text-foreground">Day 1</Text>

              <View className="h-8 rounded-full bg-white p-1 px-4">
                <Text className="text-base text-foreground">Nov 1</Text>
              </View>
            </View>

            {Array.from({ length: 3 }).map((_, index) => (
              <TouchableHighlight
                onPress={() => router.push('/my-plan/plan-details')}
                underlayColor={'transparent'}
                className="flex w-full">
                <View
                  key={index}
                  className="flex flex-row items-center justify-between gap-4 rounded-lg bg-white p-3 shadow-md">
                  {/* img */}
                  <View className="flex h-20 w-24 items-center justify-center overflow-hidden rounded-lg">
                    <Image source={require('assets/dinner.jpg')} className="h-full w-full" />
                  </View>

                  {/* text */}
                  <View className="flex flex-1 flex-col gap-1">
                    <Text className="text-lg font-medium">Central Market Tour</Text>
                    <Text className="text-base text-[#63707C]">Downtown San Jose</Text>
                  </View>

                  {/* arrow */}
                  <TouchableHighlight>
                    <ChevronRight size={34} color={'#F86241'} />
                  </TouchableHighlight>
                </View>
              </TouchableHighlight>
            ))}
          </View>

          <View className="flex h-auto w-full flex-col items-center gap-3 rounded-lg bg-[#F86241]/15 p-3 py-6">
            <View className="flex w-full flex-row items-center justify-between">
              <Text className="text-lg font-semibold text-foreground">Day 2</Text>

              <View className="h-8 rounded-full bg-white p-1 px-4">
                <Text className="text-base text-foreground">Nov 1</Text>
              </View>
            </View>

            {Array.from({ length: 3 }).map((_, index) => (
              <View
                key={index}
                className="flex flex-row items-center justify-between gap-4 rounded-lg bg-white p-3 shadow-md">
                {/* img */}
                <View className="flex h-20 w-24 items-center justify-center overflow-hidden rounded-lg">
                  <Image source={require('assets/dinner.jpg')} className="h-full w-full" />
                </View>

                {/* text */}
                <View className="flex flex-1 flex-col gap-1">
                  <Text className="text-lg font-medium">Central Market Tour</Text>
                  <Text className="text-base text-[#63707C]">Downtown San Jose</Text>
                </View>

                {/* arrow */}
                <TouchableHighlight>
                  <ChevronRight size={34} color={'#F86241'} />
                </TouchableHighlight>
              </View>
            ))}
          </View>

          <View className="flex h-auto w-full flex-col items-center gap-3 rounded-lg bg-[#F86241]/15 p-3 py-6">
            <View className="flex w-full flex-row items-center justify-between">
              <Text className="text-lg font-semibold text-foreground">Day 3</Text>

              <View className="h-8 rounded-full bg-white p-1 px-4">
                <Text className="text-base text-foreground">Nov 1</Text>
              </View>
            </View>

            {Array.from({ length: 3 }).map((_, index) => (
              <View
                key={index}
                className="flex flex-row items-center justify-between gap-4 rounded-lg bg-white p-3 shadow-md">
                {/* img */}
                <View className="flex h-20 w-24 items-center justify-center overflow-hidden rounded-lg">
                  <Image source={require('assets/dinner.jpg')} className="h-full w-full" />
                </View>

                {/* text */}
                <View className="flex flex-1 flex-col gap-1">
                  <Text className="text-lg font-medium">Central Market Tour</Text>
                  <Text className="text-base text-[#63707C]">Downtown San Jose</Text>
                </View>

                {/* arrow */}
                <TouchableHighlight>
                  <ChevronRight size={34} color={'#F86241'} />
                </TouchableHighlight>
              </View>
            ))}
          </View>

          <View className="flex h-auto w-full flex-col items-center gap-3 rounded-lg bg-[#F86241]/15 p-3 py-6">
            <View className="flex w-full flex-row items-center justify-between">
              <Text className="text-lg font-semibold text-foreground">Day 4</Text>

              <View className="h-8 rounded-full bg-white p-1 px-4">
                <Text className="text-base text-foreground">Nov 1</Text>
              </View>
            </View>

            {Array.from({ length: 3 }).map((_, index) => (
              <View
                key={index}
                className="flex flex-row items-center justify-between gap-4 rounded-lg bg-white p-3 shadow-md">
                {/* img */}
                <View className="flex h-20 w-24 items-center justify-center overflow-hidden rounded-lg">
                  <Image source={require('assets/dinner.jpg')} className="h-full w-full" />
                </View>

                {/* text */}
                <View className="flex flex-1 flex-col gap-1">
                  <Text className="text-lg font-medium">Central Market Tour</Text>
                  <Text className="text-base text-[#63707C]">Downtown San Jose</Text>
                </View>

                {/* arrow */}
                <TouchableHighlight>
                  <ChevronRight size={34} color={'#F86241'} />
                </TouchableHighlight>
              </View>
            ))}
          </View>

          <View className="flex h-auto w-full flex-col items-center gap-3 rounded-lg bg-[#F86241]/15 p-3 py-6">
            <View className="flex w-full flex-row items-center justify-between">
              <Text className="text-lg font-semibold text-foreground">Day 5</Text>

              <View className="h-8 rounded-full bg-white p-1 px-4">
                <Text className="text-base text-foreground">Nov 1</Text>
              </View>
            </View>

            {Array.from({ length: 3 }).map((_, index) => (
              <View
                key={index}
                className="flex flex-row items-center justify-between gap-4 rounded-lg bg-white p-3 shadow-md">
                {/* img */}
                <View className="flex h-20 w-24 items-center justify-center overflow-hidden rounded-lg">
                  <Image source={require('assets/dinner.jpg')} className="h-full w-full" />
                </View>

                {/* text */}
                <View className="flex flex-1 flex-col gap-1">
                  <Text className="text-lg font-medium">Central Market Tour</Text>
                  <Text className="text-base text-[#63707C]">Downtown San Jose</Text>
                </View>

                {/* arrow */}
                <TouchableHighlight>
                  <ChevronRight size={34} color={'#F86241'} />
                </TouchableHighlight>
              </View>
            ))}
          </View>
        </View>
      </View>
    </Layout>
  );
}
