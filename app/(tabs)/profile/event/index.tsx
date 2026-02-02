import Layout from 'components/layout';
import { useRouter } from 'expo-router';
import {
  ArrowLeft,
  Calendar,
  ChevronDown,
  ChevronUp,
  Heart,
  MapPin,
  Plus,
  Share2Icon,
} from 'lucide-react-native';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { cn } from 'utils';
import apiClient from '@/lib/axios';
import { baseURL } from '@/config';

interface Event {
  id: number;
  title: string;
  description: string;
  image: string | null;
  event_date: string;
  start_time: string;
  venue_name: string;
  address: string;
}

export default function Index() {
  const router = useRouter();

  const [selectedTab, setSelectedTab] = useState<'event-for-you' | 'my-event'>('event-for-you');

  return (
    <Layout>
      <View className="row flex h-auto min-h-full w-full flex-1 flex-col items-start px-5">
        <View className="flex w-full flex-row items-center gap-3 bg-white py-3">
          <TouchableHighlight onPress={() => router.back()} underlayColor={'transparent'}>
            <ArrowLeft size={24} color={'#63707C'} />
          </TouchableHighlight>

          <Text className="text-lg font-semibold text-[#313131]">Event</Text>
        </View>

        <View className="flex w-full items-center justify-center py-5">
          <TouchableHighlight
            onPress={() => router.push('/profile/event/create-event')}
            className="flex w-full items-center justify-center rounded-full border-2 border-primary bg-background px-4 py-4 shadow-sm"
            underlayColor="transparent">
            <View className="flex flex-row items-center gap-2">
              <Plus size={20} color={'#F86241'} />

              <Text className="flex items-center text-lg font-bold text-primary">Create Event</Text>
            </View>
          </TouchableHighlight>
        </View>

        {/* Tabs */}
        <View className="my-4 flex h-[60px] w-full flex-row items-center rounded-[30px] bg-[#FBEFEB]">
          <TouchableHighlight
            onPress={() => setSelectedTab('event-for-you')}
            underlayColor={'transparent'}
            className={cn(
              'flex h-full flex-1 items-center justify-center rounded-[30px]',
              selectedTab === 'event-for-you' ? 'bg-primary' : 'bg-[#FBEFEB]'
            )}>
            <Text
              className={cn(
                'text-base font-normal',
                selectedTab === 'event-for-you' ? 'text-white' : 'text-[#828282]'
              )}>
              Event For You
            </Text>
          </TouchableHighlight>

          <TouchableHighlight
            onPress={() => setSelectedTab('my-event')}
            underlayColor={'transparent'}
            className={cn(
              'flex h-full flex-1 items-center justify-center rounded-[30px]',
              selectedTab === 'my-event' ? 'bg-primary' : 'bg-[#FBEFEB]'
            )}>
            <Text
              className={cn(
                'text-base font-normal',
                selectedTab === 'my-event' ? 'text-white' : 'text-[#828282]'
              )}>
              My Event
            </Text>
          </TouchableHighlight>
        </View>

        <View className="w-full flex-1">
          {selectedTab === 'event-for-you' && <EventForYouTab />}
          {selectedTab === 'my-event' && <MyEventTab />}
        </View>
      </View>
    </Layout>
  );
}

const getFullImageUrl = (path: string | null) => {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  const cleanBaseURL = baseURL.endsWith('/') ? baseURL.slice(0, -1) : baseURL;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${cleanBaseURL}${cleanPath}`;
};

function EventCard({ event, onPress }: { event: Event; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      className="mt-5 h-auto w-full overflow-hidden rounded-lg bg-white shadow-md">
      <View className="flex w-full flex-col gap-3 rounded-lg bg-white pb-5">
        <View className="relative flex h-44 items-center justify-center bg-gray-100">
          {event.image ? (
            <Image
              source={{
                uri: getFullImageUrl(event.image) || '',
              }}
              className="h-full w-full"
              resizeMode="cover"
            />
          ) : (
            <Image
              source={require(`assets/event-1.jpg`)}
              className="h-full w-full"
              resizeMode="cover"
            />
          )}
          <Pressable className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white">
            <Heart size={16} color={'#F86241'} />
          </Pressable>

          <Pressable className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white">
            <Share2Icon size={16} color={'#F86241'} />
          </Pressable>
        </View>
        <View className="flex flex-col gap-3 bg-white px-6">
          <Text className="text-lg font-semibold">{event.title}</Text>
          <Text className="text-sm font-normal text-[#63707C]" numberOfLines={2}>
            {event.description}
          </Text>
          <View className="flex w-full flex-col gap-3">
            <View className="flex w-full flex-1 flex-row items-center gap-3">
              <Calendar size={16} color={'#63707C'} />
              <Text className="text-sm font-medium text-[#63707C]">
                {event.event_date} at {event.start_time.slice(0, 5)}
              </Text>
            </View>

            <View className="flex w-full flex-1 flex-row items-center gap-3">
              <MapPin size={16} color={'#63707C'} />
              <Text className="text-sm font-medium text-[#63707C]" numberOfLines={1}>
                {event.venue_name}, {event.address}
              </Text>
            </View>
          </View>

          <Pressable
            onPress={onPress}
            className="mt-5 flex w-full items-center justify-center rounded-full border-2 border-primary bg-primary px-4 py-3 shadow-sm">
            <View className="flex flex-row items-center gap-2">
              <Text className="flex items-center text-lg font-bold text-white">View Details</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}

function EventForYouTab() {
  const router = useRouter();

  const [isDayPickerOpen, setIsDayPickerOpen] = useState(false);
  const [pickedDay, setPickedDay] = useState<string | null>(null);
  const [day, setDay] = useState([
    { label: 'All Day', value: 'all-day' },
    { label: 'Morning', value: 'morning' },
    { label: 'Afternoon', value: 'afternoon' },
    { label: 'Evening', value: 'evening' },
  ]);

  const [isDistancePickerOpen, setIsDistancePickerOpen] = useState(false);
  const [pickedDistance, setPickedDistance] = useState<string | null>(null);
  const [distance, setDistance] = useState([
    { label: '5 km', value: '5-km' },
    { label: '10 km', value: '10-km' },
    { label: '15 km', value: '15-km' },
    { label: '20 km', value: '20-km' },
  ]);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="flex h-auto w-full flex-row items-center gap-5 py-3">
        <View className="flex h-12 w-[30%] flex-row items-center justify-start rounded-lg bg-accent px-3">
          <MapPin color="#63707C" size={20} />
          <TextInput
            className="max-w-[90%] text-[#63707C] placeholder:text-[#63707C]"
            placeholder="Location"
          />
        </View>

        <View className="flex h-full w-[30%] flex-col gap-2" style={{ zIndex: 1000 }}>
          <DropDownPicker
            open={isDayPickerOpen}
            value={pickedDay}
            items={day}
            setOpen={setIsDayPickerOpen}
            setValue={setPickedDay}
            setItems={setDay}
            placeholder="All Day"
            style={{
              backgroundColor: '#f8dcd7',
              borderColor: '#f8dcd7',
              flex: 1,
              zIndex: 2000,
              minHeight: 40,
            }}
            ArrowDownIconComponent={({ style }) => <ChevronDown size={24} color={'#6E6E6E'} />}
            ArrowUpIconComponent={({ style }) => <ChevronUp size={24} color={'#6E6E6E'} />}
            dropDownContainerStyle={{
              backgroundColor: '#ffffff',
              borderColor: '#ffffff',
              borderRadius: 10,
              zIndex: 2000,
            }}
            labelStyle={{
              color: '#575757',
              fontWeight: '500',
            }}
            selectedItemContainerStyle={{
              backgroundColor: '#f8dcd7',
              borderRadius: 8,
            }}
            closeOnBackPressed={true}
          />
        </View>

        <View className="flex h-full w-[30%] flex-col gap-2" style={{ zIndex: 1000 }}>
          <DropDownPicker
            open={isDistancePickerOpen}
            value={pickedDistance}
            items={distance}
            setOpen={setIsDistancePickerOpen}
            setValue={setPickedDistance}
            setItems={setDistance}
            placeholder="5Km"
            style={{
              backgroundColor: '#f8dcd7',
              borderColor: '#f8dcd7',
              flex: 1,
              zIndex: 2000,
              minHeight: 40,
            }}
            ArrowDownIconComponent={({ style }) => <ChevronDown size={24} color={'#6E6E6E'} />}
            ArrowUpIconComponent={({ style }) => <ChevronUp size={24} color={'#6E6E6E'} />}
            dropDownContainerStyle={{
              backgroundColor: '#ffffff',
              borderColor: '#ffffff',
              borderRadius: 10,
              zIndex: 2000,
            }}
            labelStyle={{
              color: '#575757',
              fontWeight: '500',
            }}
            selectedItemContainerStyle={{
              backgroundColor: '#f8dcd7',
              borderRadius: 8,
            }}
            closeOnBackPressed={true}
          />
        </View>
      </View>

      <View className="mb-10 flex h-auto w-full flex-col gap-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <EventCard
            key={index}
            event={{
              id: index,
              title: 'Summer Music Festival',
              description:
                'Join us for an amazing outdoor music festival featuring local and international artists.',
              image: null,
              event_date: '15/08/2024',
              start_time: '18:00:00',
              venue_name: 'Central Park',
              address: 'Costa Rica',
            }}
            onPress={() => router.push('/profile/event/[id]')}
          />
        ))}
      </View>
    </ScrollView>
  );
}

function MyEventTab() {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMyEvents = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.get('/api/events/events/');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching my events:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMyEvents();
  }, []);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center py-20">
        <ActivityIndicator color="#F86241" size="large" />
      </View>
    );
  }

  return (
    <FlatList
      data={events}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <EventCard event={item} onPress={() => router.push(`/profile/event/${item.id}`)} />
      )}
      ListEmptyComponent={
        <View className="flex-1 items-center justify-center py-20">
          <Text className="text-base text-[#63707C]">No events found.</Text>
        </View>
      }
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 40 }}
    />
  );
}
