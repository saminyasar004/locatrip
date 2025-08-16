import Layout from 'components/layout';
import { useRouter } from 'expo-router';
import { ArrowLeft, MapPin, Star, Users } from 'lucide-react-native';
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

          <Text className="w-full text-lg font-semibold text-[#313131]">Day 3</Text>
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

          <View className="flex w-full items-center justify-center py-2">
            <Image source={require('assets/landscape.jpg')} className="h-72 w-full rounded-xl" />
          </View>

          <View className="flex w-full flex-col gap-2">
            <Text className="text-xl font-semibold">About This Spot</Text>

            <Text className="text-base text-[#63707C]">
              Embark on an unforgettable journey through Costa Rica's pristine rainforest ecosystem.
              This guided hike takes you through winding trails where you'll encounter an incredible
              diversity of wildlife in their natural habitat.
            </Text>

            <Text className="text-base text-[#63707C]">
              The trail is moderately challenging with well-maintained paths suitable for most
              fitness levels. Comfortable hiking shoes and light, breathable clothing are
              recommended.
            </Text>
          </View>

          <View className="flex w-full flex-row items-center justify-between py-5">
            <Text className="text-xl font-semibold text-foreground">Aerial Views</Text>
            <TouchableHighlight
              onPress={() => router.push('/my-plan/aerial-views')}
              underlayColor={'transparent'}
              className="flex items-end py-2">
              <Text className="text-base font-semibold text-primary">View All</Text>
            </TouchableHighlight>
          </View>

          <View className="flex w-full flex-row flex-wrap gap-4">
            <View className="w-[48%] items-center justify-center">
              <Image
                source={require('assets/aerial-views-2.jpg')}
                className="h-52 w-full rounded-xl"
                resizeMode="cover"
              />
            </View>
            <View className="w-[48%] items-center justify-center">
              <Image
                source={require('assets/aerial-views-1.jpg')}
                className="h-52 w-full rounded-xl"
                resizeMode="cover"
              />
            </View>
          </View>

          <View className="flex w-full flex-col gap-2 py-4">
            <Text className="text-xl font-semibold">A Glimpse into the past</Text>

            <Text className="text-base text-[#63707C]">
              Established in 1978, the Animal Welcome Center was created as part of Costa Rica's
              pioneering conservation initiative to protect its extraordinary biodiversity. The
              center was founded by a coalition of local conservationists and international wildlife
              organizations.
            </Text>

            <Text className="text-base text-[#63707C]">
              Over the decades, it has become a model for sustainable ecotourism, successfully
              balancing wildlife protection with educational tourism. The center has played a
              crucial role in the recovery of several endangered species and continues to be a vital
              research hub for tropical ecology.
            </Text>
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

          <View className="flex w-full flex-col gap-2 py-4">
            <Text className="text-xl font-semibold">Practical Information</Text>

            <View className="flex w-full flex-row gap-4 py-4">
              <View className="flex flex-col gap-2 rounded-lg bg-primary/10 p-3">
                <Text className="text-base font-medium text-primary">Opening Hours</Text>

                <Text className="text-balance font-normal text-[#7c7c7c]">
                  Daily: 7:00 AM - 5:00 PM
                </Text>
              </View>
              <View className="flex flex-col gap-2 rounded-lg bg-primary/10 p-3">
                <Text className="text-base font-medium text-primary">Best Time to Visit</Text>

                <Text className="text-balance font-normal text-[#7c7c7c]">
                  7-9 AM for wildlife activity
                </Text>
              </View>
            </View>
          </View>

          <View className="flex w-full flex-row items-center justify-between py-2">
            <Text className="text-xl font-semibold text-foreground">Nearest Restaurant</Text>
            <TouchableHighlight
              onPress={() => router.push('/my-plan/nearest-restaurant')}
              underlayColor={'transparent'}
              className="flex items-end py-2">
              <Text className="text-base font-semibold text-primary">View All</Text>
            </TouchableHighlight>
          </View>

          <View className="flex w-full flex-row flex-wrap items-center justify-between gap-[10px] py-4">
            {/* Event cards */}
            {Array.from({ length: 2 }).map((_, index) => (
              <View key={index} className="flex w-[48%] flex-col gap-3 rounded-lg bg-white pb-5">
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
            ))}
          </View>

          <View className="flex w-full flex-row items-center justify-between py-2">
            <Text className="text-xl font-semibold text-foreground">Nearest Hotel & Resorts</Text>
            <TouchableHighlight
              onPress={() => router.push('/my-plan/nearest-hotel')}
              underlayColor={'transparent'}
              className="flex items-end py-2">
              <Text className="text-base font-semibold text-primary">View All</Text>
            </TouchableHighlight>
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

          <View className="flex w-full flex-row items-center justify-between py-2">
            <Text className="text-xl font-semibold text-foreground">Nearest Art Enthusiasts</Text>
            <TouchableHighlight
              onPress={() => router.push('/my-plan/nearest-art')}
              underlayColor={'transparent'}
              className="flex items-end py-2">
              <Text className="text-base font-semibold text-primary">View All</Text>
            </TouchableHighlight>
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

          <View className="flex w-full flex-row items-center justify-between py-2">
            <Text className="text-xl font-semibold text-foreground">
              Nearest Local Festivals & Events
            </Text>
            <TouchableHighlight
              onPress={() => router.push('/my-plan/nearest-local-festival')}
              underlayColor={'transparent'}
              className="flex items-end py-2">
              <Text className="text-base font-semibold text-primary">View All</Text>
            </TouchableHighlight>
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
