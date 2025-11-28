import Layout from 'components/layout';
import { format, parseISO } from 'date-fns';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ArrowLeft, Calendar, ChevronRight, Clock, Plus } from 'lucide-react-native';
import { useEffect } from 'react';
import { ActivityIndicator, Image, Text, TouchableHighlight, View } from 'react-native';
import useUserItineraryStore from 'store/userItineraryStore';

export default function Index() {
  const router = useRouter();
  const { itineraryList, dayPlans, fetchActiveItineraries, fetchAllDayPlans, isLoading } =
    useUserItineraryStore();

  useEffect(() => {
    fetchActiveItineraries();
  }, []);

  useEffect(() => {
    if (itineraryList.length > 0) {
      fetchAllDayPlans(itineraryList[0].id);
    }
  }, [itineraryList]);

  return (
    <Layout>
      <View className="row flex h-auto min-h-full w-full flex-1 flex-col items-start">
        <View className="flex w-full flex-row items-center gap-3 bg-white pt-4">
          <TouchableHighlight onPress={() => router.back()} underlayColor={'transparent'}>
            <ArrowLeft size={24} color={'#63707C'} />
          </TouchableHighlight>

          <Text className="text-lg font-semibold text-[#313131]">My Plan</Text>
        </View>

        <View className="flex w-full items-center justify-center py-5">
          <TouchableHighlight
            onPress={() => router.push('/personalize/step4')}
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

        {isLoading ? (
          <View className="flex-1 items-center justify-center py-10">
            <ActivityIndicator size="large" color="#F86241" />
          </View>
        ) : itineraryList.length > 0 ? (
          <>
            {/* Active Itinerary Card */}
            <View className="h-44 w-full rounded-lg">
              <LinearGradient
                colors={['#F3592F', '#F35336', '#EF4740']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ borderRadius: 10 }}
                className="h-full w-full rounded-lg p-3">
                <View className="flex w-full flex-row items-center justify-between gap-3">
                  <View className="flex flex-col gap-2">
                    <Text className="text-lg font-semibold text-white" numberOfLines={1}>
                      {itineraryList[0].destination_name}
                    </Text>
                    <View className="flex w-full flex-row items-center gap-3">
                      <View className="flex flex-row items-center gap-2">
                        <Calendar size={16} color={'#ffffff'} />
                        <Text className="text-white">
                          {format(parseISO(itineraryList[0].start_date), 'MMM dd')} -{' '}
                          {format(parseISO(itineraryList[0].end_date), 'MMM dd, yyyy')}
                        </Text>
                      </View>

                      <View className="flex flex-row items-center gap-2">
                        <Clock size={16} color={'#ffffff'} />
                        <Text className="text-white">{itineraryList[0].duration} Days</Text>
                      </View>
                    </View>
                  </View>

                  <View className="h-8 rounded-full bg-white p-2 px-4">
                    <Text className="text-xs font-medium text-primary">
                      {itineraryList[0].days_left}
                    </Text>
                  </View>
                </View>

                <View className="flex flex-col items-center gap-2 py-8">
                  <View className="flex w-full flex-row items-center justify-between">
                    <Text className="text-base text-white">Trip Planning Progress</Text>
                    <Text className="text-lg font-medium text-white">
                      {itineraryList[0].planning_progress}% Complete
                    </Text>
                  </View>
                  <View className="flex h-3 w-full items-start rounded-full bg-[#F46F65]">
                    <View
                      style={{ width: `${itineraryList[0].planning_progress}%` }}
                      className="h-full rounded-full bg-white"></View>
                  </View>
                </View>
              </LinearGradient>
            </View>

            {/* Day Plans */}
            <View className="my-6 flex w-full flex-1">
              {dayPlans.length > 0 ? (
                <View className="flex w-full flex-col gap-4">
                  {dayPlans.map((day, dayIndex) => (
                    <View
                      key={dayIndex}
                      className="flex h-auto w-full flex-col items-center gap-3 rounded-lg bg-[#F86241]/15 p-3 py-6">
                      <View className="flex w-full flex-row items-center justify-between">
                        <Text className="text-lg font-semibold text-foreground">
                          Day {day.day_number}
                        </Text>

                        <View className="h-8 rounded-full bg-white p-1 px-4">
                          <Text className="text-base text-foreground">
                            {format(parseISO(day.date), 'MMM dd')}
                          </Text>
                        </View>
                      </View>

                      {day.places.map((place, placeIndex) => (
                        <TouchableHighlight
                          key={placeIndex}
                          onPress={() =>
                            router.push({
                              pathname: '/my-plan/plan-details',
                              params: {
                                place_id: place.place_id,
                                latitude: itineraryList[0]?.latitude || 0,
                                longitude: itineraryList[0]?.longitude || 0,
                                day_number: day.day_number,
                              },
                            })
                          }
                          underlayColor={'transparent'}
                          className="flex w-full">
                          <View className="flex flex-row items-center justify-between gap-4 rounded-lg bg-white p-3 shadow-md">
                            {/* img */}
                            <View className="flex h-20 w-24 items-center justify-center overflow-hidden rounded-lg">
                              <Image
                                source={{
                                  uri: place.place_image || 'https://via.placeholder.com/150',
                                }}
                                className="h-full w-full"
                              />
                            </View>

                            {/* text */}
                            <View className="flex flex-1 flex-col gap-1">
                              <Text className="text-lg font-medium" numberOfLines={1}>
                                {place.place_name}
                              </Text>
                              <Text className="text-base text-[#63707C]" numberOfLines={1}>
                                {place.place_location}
                              </Text>
                            </View>

                            {/* arrow */}
                            <TouchableHighlight>
                              <ChevronRight size={34} color={'#F86241'} />
                            </TouchableHighlight>
                          </View>
                        </TouchableHighlight>
                      ))}
                    </View>
                  ))}
                </View>
              ) : (
                <View className="flex-1 items-center justify-center py-10">
                  <Text className="text-gray-500">No day plans available yet.</Text>
                </View>
              )}
            </View>
          </>
        ) : (
          <View className="flex-1 items-center justify-center py-10">
            <Text className="text-gray-500">No active itineraries. Create one to get started!</Text>
          </View>
        )}
      </View>
    </Layout>
  );
}
