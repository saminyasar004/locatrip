import DateInput from '@/components/ui/date-input';
import DropDown from '@/components/ui/dropdown';
import TimeInput from '@/components/ui/time-input';
import Layout from 'components/layout';
import { Textarea } from 'components/ui/textarea';
import * as DocumentPicker from 'expo-document-picker';
import { useRouter } from 'expo-router';
import { ArrowLeft, CloudUpload } from 'lucide-react-native';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import apiClient from '@/lib/axios';

const CATEGORIES = [
  'Music',
  'Technology',
  'Food & Drink',
  'Outdoor',
  'Sports',
  'Art & Culture',
  'Education',
  'Health & Wellness',
];

export default function CreateEventScreen() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [eventImageFile, setEventImageFile] = useState<any>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    event_date: null as Date | null,
    start_time: null as Date | null,
    end_time: null as Date | null,
    venue_name: '',
    address: '',
    organizer_name: '',
    organizer_email: '',
    organizer_phone: '',
    organizer_website: '',
  });

  const handleInputChange = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleFilePick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['image/jpeg', 'image/png'],
        copyToCacheDirectory: true,
      });

      if (result.canceled) return;

      const selected = result.assets[0];
      if (!selected.size) return;

      if (selected.size > 3 * 1024 * 1024) {
        Alert.alert('Error', 'File size exceeds 3MB limit');
        return;
      }

      setEventImageFile(selected);
    } catch (err) {
      console.log('File selection error:', err);
    }
  };

  const handleCreateEvent = async () => {
    if (!formData.title || !formData.description || !formData.category || !formData.event_date) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);

      // Find category index (1-based as per sample)
      const categoryId = CATEGORIES.indexOf(formData.category) + 1;
      data.append('category', categoryId.toString());

      if (formData.event_date) {
        data.append('event_date', formData.event_date.toISOString().split('T')[0]);
      }

      if (formData.start_time) {
        data.append('start_time', formData.start_time.toTimeString().split(' ')[0]);
      }

      if (formData.end_time) {
        data.append('end_time', formData.end_time.toTimeString().split(' ')[0]);
      }

      data.append('venue_name', formData.venue_name);
      data.append('address', formData.address);
      data.append('organizer_name', formData.organizer_name);
      data.append('organizer_email', formData.organizer_email);
      data.append('organizer_phone', formData.organizer_phone);
      data.append('organizer_website', formData.organizer_website);

      if (eventImageFile) {
        data.append('image', {
          uri: eventImageFile.uri,
          type: eventImageFile.mimeType || 'image/jpeg',
          name: eventImageFile.name || 'image.jpg',
        } as any);
      }

      const response = await apiClient.post('/api/events/events/', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201 || response.status === 200) {
        Alert.alert('Success', 'Event created successfully');
        router.back();
      }
    } catch (error: any) {
      console.error('Error creating event:', error?.response?.data || error.message);
      Alert.alert('Error', error?.response?.data?.detail || 'Failed to create event');
    } finally {
      setIsLoading(false);
    }
  };

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
          <Text className="text-lg font-semibold text-[#313131]">Create Event</Text>
        </View>

        {/* Upload Section */}
        <View className="mt-3">
          <Text className="text-base font-semibold text-foreground">Event Image</Text>
          <Pressable
            onPress={handleFilePick}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-[#9F9F9F] bg-[#F6F6F6] px-4 py-8"
            style={({ pressed }) => ({
              opacity: pressed ? 0.9 : 1,
              transform: [{ scale: pressed ? 0.98 : 1 }],
            })}>
            {eventImageFile ? (
              <Image
                source={{ uri: eventImageFile.uri }}
                className="mb-3 h-24 w-24 rounded-md"
                resizeMode="cover"
              />
            ) : (
              <View className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <CloudUpload width={35} height={35} color={'#F86241'} />
              </View>
            )}

            <Text className="mb-1 py-2 text-base font-semibold text-[#63707C]">
              Upload Event Image
            </Text>
            <View className="flex h-12 w-56 items-center justify-center rounded-full bg-primary/10">
              <Text className="text-base font-semibold text-primary">Upload</Text>
            </View>
          </Pressable>
        </View>

        {/* Basic Info */}
        <View className="mt-6">
          <Text className="text-lg font-medium text-[#313131]">Basic Information</Text>

          {/* Event Title */}
          <View className="mt-5">
            <Text className="text-base font-medium text-foreground">Event Title</Text>
            <TextInput
              className="mt-1 h-14 rounded-lg bg-[#FFF4F2] px-5 text-foreground placeholder:text-[#63707C]"
              placeholder="Enter event title"
              value={formData.title}
              onChangeText={(text) => handleInputChange('title', text)}
            />
          </View>

          {/* Description */}
          <View className="mt-5">
            <Textarea
              inputStyle="border border-[#FFF4F2] bg-[#FFF4F2] px-5 text-foreground placeholder:text-[#63707C]"
              label="Description"
              placeholder="Write here..."
              value={formData.description}
              onChange={(text) => handleInputChange('description', text)}
            />
          </View>

          {/* Category Dropdown */}
          <View className="z-50 mt-5">
            <DropDown
              list={CATEGORIES}
              title="Category"
              value={formData.category}
              onChange={(value: string) => handleInputChange('category', value)}
            />
          </View>
        </View>

        <View className="mt-6">
          <Text className="mb-5 text-lg font-medium text-[#313131]">Date & Time</Text>

          <DateInput
            label="Event Date"
            placeholder="DD/MM/YY"
            showIcon={false}
            value={formData.event_date}
            onChange={(date) => handleInputChange('event_date', date)}
          />
        </View>

        <View className="flex w-full flex-row items-center justify-between pt-6">
          <View className="flex w-[48%] flex-col gap-3">
            <TimeInput
              label="Start"
              placeholder="Start"
              value={formData.start_time}
              onChange={(time) => handleInputChange('start_time', time)}
            />
          </View>

          <View className="flex w-[48%] flex-col gap-3">
            <TimeInput
              label="End"
              placeholder="End"
              value={formData.end_time}
              onChange={(time) => handleInputChange('end_time', time)}
            />
          </View>
        </View>

        <View className="mt-5">
          <Text className="mb-5 text-lg font-medium text-[#313131]">Locations</Text>
          <Text className="text-base font-medium text-foreground">Venue Name</Text>
          <TextInput
            className="mt-1 h-14 rounded-lg bg-[#FFF4F2] px-5 text-foreground placeholder:text-[#63707C]"
            placeholder="Enter venue name"
            value={formData.venue_name}
            onChangeText={(text) => handleInputChange('venue_name', text)}
          />
        </View>

        <View className="mt-5">
          <Text className="text-base font-medium text-foreground">Address</Text>
          <TextInput
            className="mt-1 h-14 rounded-lg bg-[#FFF4F2] px-5 text-foreground placeholder:text-[#63707C]"
            placeholder="Enter address"
            value={formData.address}
            onChangeText={(text) => handleInputChange('address', text)}
          />
        </View>

        {/* Organizer Details */}
        <View className="mt-5">
          <Text className="mb-5 text-lg font-medium text-[#313131]">Organizer Details</Text>
          <Text className="text-base font-medium text-foreground">Organizer Name</Text>
          <TextInput
            className="mt-1 h-14 rounded-lg bg-[#FFF4F2] px-5 text-foreground placeholder:text-[#63707C]"
            placeholder="Enter name"
            value={formData.organizer_name}
            onChangeText={(text) => handleInputChange('organizer_name', text)}
          />
        </View>

        <View className="mt-5">
          <Text className="text-base font-medium text-foreground">Email Address</Text>
          <TextInput
            className="mt-1 h-14 rounded-lg bg-[#FFF4F2] px-5 text-foreground placeholder:text-[#63707C]"
            placeholder="Enter email address"
            keyboardType="email-address"
            value={formData.organizer_email}
            onChangeText={(text) => handleInputChange('organizer_email', text)}
          />
        </View>

        <View className="mt-5">
          <Text className="text-base font-medium text-foreground">Phone Number</Text>
          <TextInput
            className="mt-1 h-14 rounded-lg bg-[#FFF4F2] px-5 text-foreground placeholder:text-[#63707C]"
            placeholder="Enter phone number"
            keyboardType="phone-pad"
            value={formData.organizer_phone}
            onChangeText={(text) => handleInputChange('organizer_phone', text)}
          />
        </View>

        <View className="mt-5">
          <Text className="text-base font-medium text-foreground">
            Website <Text className="text-sm text-[#969696]">(Optional)</Text>
          </Text>
          <TextInput
            className="mt-1 h-14 rounded-lg bg-[#FFF4F2] px-5 text-foreground placeholder:text-[#63707C]"
            placeholder="Enter address"
            value={formData.organizer_website}
            onChangeText={(text) => handleInputChange('organizer_website', text)}
          />
        </View>

        <Pressable
          onPress={handleCreateEvent}
          disabled={isLoading}
          className="mt-10 flex w-full items-center rounded-full bg-primary py-4">
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-lg font-medium text-white">Create</Text>
          )}
        </Pressable>
      </ScrollView>
    </Layout>
  );
}
