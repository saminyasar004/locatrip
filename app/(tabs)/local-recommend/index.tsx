import Layout from 'components/layout';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
  ArrowLeft,
  Bell,
  Calendar,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Clock,
  Heart,
  MapPin,
  MoveLeft,
  Share2Icon,
  Star,
} from 'lucide-react-native';
import { useState } from 'react';
import { Image, Text, TextInput, TouchableHighlight, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { cn } from 'utils';

export default function Index() {
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
  const topicTags = [
    'Hiking & Tracking',
    'Art',
    'Local Festivals',
    'Food & Drink',
    'Camping In Nature',
  ];
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  return (
    <Layout>
      <View className="row flex h-auto min-h-full w-full flex-1 flex-col items-start">
        <View className="flex w-full flex-row items-center gap-3 bg-white pt-8">
          <TouchableHighlight onPress={() => router.back()} underlayColor={'transparent'}>
            <ArrowLeft size={24} color={'#63707C'} />
          </TouchableHighlight>

          <Text className="text-lg font-semibold text-[#313131]">Local Recommend</Text>
        </View>

        <View className="flex h-auto w-full flex-row items-center gap-5 py-3">
          <View className="flex h-12 w-[30%] flex-row items-center justify-start rounded-lg bg-accent px-3">
            <MapPin color="#63707C" size={20} />
            <TextInput className="max-w-[90%] text-[#63707C]" placeholder="Location" />
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
                zIndex: 2000, // Higher zIndex for Trip Type
                minHeight: 40,
              }}
              ArrowDownIconComponent={({ style }) => <ChevronDown size={24} color={'#6E6E6E'} />}
              ArrowUpIconComponent={({ style }) => <ChevronUp size={24} color={'#6E6E6E'} />}
              dropDownContainerStyle={{
                backgroundColor: '#ffffff',
                borderColor: '#ffffff',
                borderRadius: 10,
                zIndex: 2000, // Match zIndex
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
                zIndex: 2000, // Higher zIndex for Trip Type
                minHeight: 40,
              }}
              ArrowDownIconComponent={({ style }) => <ChevronDown size={24} color={'#6E6E6E'} />}
              ArrowUpIconComponent={({ style }) => <ChevronUp size={24} color={'#6E6E6E'} />}
              dropDownContainerStyle={{
                backgroundColor: '#ffffff',
                borderColor: '#ffffff',
                borderRadius: 10,
                zIndex: 2000, // Match zIndex
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

        <View className="flex w-full flex-row flex-wrap gap-3 py-3">
          {topicTags.map((tag, index) => (
            <TouchableHighlight
              onPress={() => {
                if (selectedTags.includes(tag)) {
                  setSelectedTags(selectedTags.filter((item) => item !== tag));
                } else {
                  setSelectedTags([...selectedTags, tag]);
                }
              }}
              underlayColor={'transparent'}
              key={index}
              className={cn(
                'h-auto rounded-full px-4 py-1',
                selectedTags.includes(tag) ? 'bg-primary' : 'bg-accent'
              )}>
              <Text
                className={cn('', selectedTags.includes(tag) ? 'text-white' : 'text-foreground')}>
                {tag}
              </Text>
            </TouchableHighlight>
          ))}
        </View>

        <View className="flex w-full flex-row flex-wrap items-center justify-between gap-[10px] py-4">
          {/* Event cards */}
          {Array.from({ length: 2 }).map((_, index) => (
            <TouchableHighlight
              key={index}
              onPress={() => router.push('/local-recommend/card-details')}
              underlayColor={'transparent'}
              className="w-[48%]">
              <View className="flex w-full flex-col gap-3 rounded-lg bg-white pb-5">
                <View className="relative flex h-40 items-center justify-center">
                  <Image
                    source={require(`assets/event-1.jpg`)}
                    className="h-full w-full rounded-lg"
                  />
                  <TouchableHighlight className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white">
                    <Heart size={16} color={'#F86241'} />
                  </TouchableHighlight>

                  <TouchableHighlight className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white">
                    <Share2Icon size={16} color={'#F86241'} />
                  </TouchableHighlight>
                </View>
                <View className="flex flex-col gap-3 bg-white px-6">
                  <Text className="text-lg font-medium">Dance Fiesta</Text>
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
              <View className="relative flex h-40 items-center justify-center">
                <Image
                  source={require(`assets/event-2.jpg`)}
                  className="h-full w-full rounded-lg"
                />
                <TouchableHighlight className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white">
                  <Heart size={16} color={'#F86241'} />
                </TouchableHighlight>

                <TouchableHighlight className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white">
                  <Share2Icon size={16} color={'#F86241'} />
                </TouchableHighlight>
              </View>
              <View className="flex flex-col gap-3 bg-white px-6">
                <Text className="text-lg font-medium">Dance Fiesta</Text>
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
              <View className="relative flex h-40 items-center justify-center">
                <Image
                  source={require(`assets/event-3.jpg`)}
                  className="h-full w-full rounded-lg"
                />
                <TouchableHighlight className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white">
                  <Heart size={16} color={'#F86241'} />
                </TouchableHighlight>

                <TouchableHighlight className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white">
                  <Share2Icon size={16} color={'#F86241'} />
                </TouchableHighlight>
              </View>
              <View className="flex flex-col gap-3 bg-white px-6">
                <Text className="text-lg font-medium">Dance Fiesta</Text>
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
              <View className="relative flex h-40 items-center justify-center">
                <Image
                  source={require(`assets/event-4.jpg`)}
                  className="h-full w-full rounded-lg"
                />
                <TouchableHighlight className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white">
                  <Heart size={16} color={'#F86241'} />
                </TouchableHighlight>

                <TouchableHighlight className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white">
                  <Share2Icon size={16} color={'#F86241'} />
                </TouchableHighlight>
              </View>
              <View className="flex flex-col gap-3 bg-white px-6">
                <Text className="text-lg font-medium">Dance Fiesta</Text>
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
              <View className="relative flex h-40 items-center justify-center">
                <Image
                  source={require(`assets/event-5.jpg`)}
                  className="h-full w-full rounded-lg"
                />
                <TouchableHighlight className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white">
                  <Heart size={16} color={'#F86241'} />
                </TouchableHighlight>

                <TouchableHighlight className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white">
                  <Share2Icon size={16} color={'#F86241'} />
                </TouchableHighlight>
              </View>
              <View className="flex flex-col gap-3 bg-white px-6">
                <Text className="text-lg font-medium">Dance Fiesta</Text>
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
              <View className="relative flex h-40 items-center justify-center">
                <Image
                  source={require(`assets/event-6.jpg`)}
                  className="h-full w-full rounded-lg"
                />
                <TouchableHighlight className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white">
                  <Heart size={16} color={'#F86241'} />
                </TouchableHighlight>

                <TouchableHighlight className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white">
                  <Share2Icon size={16} color={'#F86241'} />
                </TouchableHighlight>
              </View>
              <View className="flex flex-col gap-3 bg-white px-6">
                <Text className="text-lg font-medium">Dance Fiesta</Text>
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
    </Layout>
  );
}
