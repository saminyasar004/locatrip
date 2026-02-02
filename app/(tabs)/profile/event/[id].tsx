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
  Share2,
  UserPlus,
} from 'lucide-react-native';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import apiClient from '@/lib/axios';
import { baseURL } from '@/config';

interface EventDetails {
  id: number;
  title: string;
  description: string;
  image: string | null;
  event_date: string;
  start_time: string;
  end_time: string | null;
  venue_name: string;
  address: string;
  organizer_name: string;
  organizer_email: string;
  organizer_phone: string;
  organizer_website: string | null;
  tag_list: string[];
}

export default function Index() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [event, setEvent] = useState<EventDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getFullImageUrl = (path: string | null) => {
    if (!path) return null;
    if (path.startsWith('http')) return path;
    const cleanBaseURL = baseURL.endsWith('/') ? baseURL.slice(0, -1) : baseURL;
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${cleanBaseURL}${cleanPath}`;
  };

  const fetchEventDetails = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.get(`/api/events/events/${id}/`);
      setEvent(response.data);
    } catch (error: any) {
      console.error('Error fetching event details:', error);
      // Alert.alert('Error', 'Failed to fetch event details');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchEventDetails();
    }
  }, [id]);

  if (isLoading) {
    return (
      <Layout>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#F86241" />
        </View>
      </Layout>
    );
  }

  if (!event) {
    return (
      <Layout>
        <View className="flex-1 items-center justify-center p-5">
          <Text className="text-lg font-medium text-[#63707C]">Event not found</Text>
          <Pressable
            onPress={() => router.back()}
            className="mt-4 rounded-full bg-primary px-6 py-2">
            <Text className="font-medium text-white">Go Back</Text>
          </Pressable>
        </View>
      </Layout>
    );
  }

  return (
    <Layout>
      <ScrollView
        className="flex-1 bg-white"
        contentContainerStyle={{ paddingBottom: 40, paddingHorizontal: 20 }}>
        {/* Header */}
        <View className="flex w-full flex-row items-center gap-3 py-3">
          <TouchableHighlight onPress={() => router.back()} underlayColor={'transparent'}>
            <ArrowLeft size={24} color={'#63707C'} />
          </TouchableHighlight>
          <Text className="text-lg font-semibold text-[#313131]">Event Details</Text>
        </View>

        <View className="flex w-full flex-1 flex-col gap-4">
          <View className="h-auto w-full">
            {event.image ? (
              <Image
                source={{
                  uri: getFullImageUrl(event.image) || '',
                }}
                className="h-[200px] w-full rounded-lg"
                resizeMode="cover"
                style={{ height: 200, width: '100%' }}
                onError={(e) =>
                  console.log(
                    'Image Load Error:',
                    e.nativeEvent.error,
                    'URL:',
                    getFullImageUrl(event.image)
                  )
                }
              />
            ) : (
              <Image
                source={require('@/assets/aerial-views-2.jpg')}
                className="h-[200px] w-full rounded-lg"
                resizeMode="cover"
                style={{ height: 200, width: '100%' }}
              />
            )}
          </View>

          <Text className="text-xl font-bold text-black">{event.title}</Text>
          <Text className="text-sm font-normal leading-5 text-[#63707C]">{event.description}</Text>

          <View className="flex w-full flex-row items-center gap-3">
            <Calendar size={16} color={'#F86241'} />
            <Text className="text-sm font-medium">{event.event_date}</Text>
          </View>

          <View className="flex w-full flex-row items-center gap-3">
            <Clock size={16} color={'#F86241'} />
            <Text className="text-sm font-medium">
              {event.start_time.slice(0, 5)}{' '}
              {event.end_time ? `- ${event.end_time.slice(0, 5)}` : ''}
            </Text>
          </View>

          <View className="flex w-full flex-row items-center gap-3">
            <MapPin size={16} color={'#F86241'} />
            <Text className="text-sm font-medium">
              {event.venue_name}, {event.address}
            </Text>
          </View>

          <View className="mt-5 flex w-full flex-row items-center justify-between gap-3">
            <Pressable className="flex flex-1 flex-row items-center justify-center gap-3 rounded-full bg-primary py-3">
              <Share2 size={20} color={'#fff'} />
              <Text className="text-base font-medium text-white">Share</Text>
            </Pressable>
            <Pressable
              onPress={() => router.push('/profile/event/invite')}
              className="flex flex-1 flex-row items-center justify-center gap-3 rounded-full bg-primary py-3">
              <UserPlus size={20} color={'#fff'} />
              <Text className="text-base font-medium text-white">Invite</Text>
            </Pressable>
          </View>

          <View className="mt-5 flex h-auto w-full flex-col gap-4 rounded-lg border border-primary/10 bg-primary/5 p-5">
            <Text className="text-lg font-bold text-black">Organizer Details</Text>

            <View className="flex w-full flex-row items-start gap-4">
              <View className="flex h-[50px] w-[50px] items-center justify-center rounded-full border border-primary/20 bg-primary/10">
                <Image
                  source={require('@/assets/avatar.jpg')}
                  className="h-full w-full rounded-full"
                />
              </View>

              <View className="flex flex-1 flex-col gap-3">
                <Text className="text-base font-bold text-black">{event.organizer_name}</Text>

                <View className="flex flex-row items-center gap-3">
                  <Mail size={16} color={'#63707C'} />
                  <Text className="flex-1 text-sm font-medium text-[#63707C]">
                    {event.organizer_email}
                  </Text>
                </View>

                <View className="flex flex-row items-center gap-3">
                  <Phone size={16} color={'#63707C'} />
                  <Text className="text-sm font-medium text-[#63707C]">
                    {event.organizer_phone}
                  </Text>
                </View>

                {event.organizer_website && (
                  <View className="flex flex-row items-center gap-3">
                    <Globe size={16} color={'#63707C'} />
                    <Text className="text-sm font-medium text-[#63707C]">
                      {event.organizer_website}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
}
