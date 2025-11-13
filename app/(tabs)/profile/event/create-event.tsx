import DateInput from '@/components/ui/date-input';
import DropDown from '@/components/ui/dropdown';
import TimeInput from '@/components/ui/time-input';
import Layout from 'components/layout';
import { Textarea } from 'components/ui/textarea';
import * as DocumentPicker from 'expo-document-picker';
import { useRouter } from 'expo-router';
import { ArrowLeft, CloudUpload, X } from 'lucide-react-native';
import { useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';

export default function CreateEventScreen() {
  const router = useRouter();

  const [eventImageFile, setEventImageFile] = useState<any>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tag, setTag] = useState<string>('');

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
        alert('File size exceeds 3MB limit');
        return;
      }

      setEventImageFile(selected);
    } catch (err) {
      console.log('File selection error:', err);
    }
  };

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
            />
          </View>

          {/* Description */}
          <View className="mt-5">
            <Textarea
              inputStyle="border border-[#FFF4F2] bg-[#FFF4F2] px-5 text-foreground placeholder:text-[#63707C]"
              label="Description"
              placeholder="Write here..."
            />
          </View>

          {/* Category Dropdown */}
          <View className="z-50 mt-5">
            <DropDown
              list={[
                'Music',
                'Technology',
                'Food & Drink',
                'Outdoor',
                'Sports',
                'Art & Culture',
                'Education',
                'Health & Wellness',
              ]}
              title="Category"
              // value={careProviderData.profile_data.category_specific_details.type_of_care_provider}
              // onChange={(value: any) =>
              //   updateCareProviderData({
              //     profile_data: {
              //       ...careProviderData.profile_data,
              //       category_specific_details: {
              //         ...careProviderData.profile_data.category_specific_details,
              //         type_of_care_provider: value,
              //       },
              //     },
              //   })
              // }
            />
          </View>
        </View>

        <View className="mt-6">
          <Text className="mb-5 text-lg font-medium text-[#313131]">Date & Time</Text>

          <DateInput
            label="Event Date"
            placeholder="DD/MM/YY"
            showIcon={false}
            // value={careSeekerData.job_data.schedule.start_date as any}
            // onChange={(value: any) => {
            //   updateCareSeekerData({
            //     job_data: {
            //       ...careSeekerData.job_data,
            //       schedule: {
            //         ...careSeekerData.job_data.schedule,
            //         start_date: value,
            //       },
            //     },
            //   });
            // }}
          />
        </View>

        <View className="flex w-full flex-row items-center justify-between pt-6">
          <View className="flex w-[48%] flex-col gap-3">
            <TimeInput label="Start" placeholder="Start" value={null} />
          </View>

          <View className="flex w-[48%] flex-col gap-3">
            <TimeInput label="End" placeholder="End" value={null} />
          </View>
        </View>

        <View className="mt-5">
          <Text className="mb-5 text-lg font-medium text-[#313131]">Locations</Text>
          <Text className="text-base font-medium text-foreground">Venue Name</Text>
          <TextInput
            className="mt-1 h-14 rounded-lg bg-[#FFF4F2] px-5 text-foreground placeholder:text-[#63707C]"
            placeholder="Enter venue name"
          />
        </View>

        <View className="mt-5">
          <Text className="text-base font-medium text-foreground">Address</Text>
          <TextInput
            className="mt-1 h-14 rounded-lg bg-[#FFF4F2] px-5 text-foreground placeholder:text-[#63707C]"
            placeholder="Enter address"
          />
        </View>

        <View className="flex w-full flex-1 flex-row items-end justify-between gap-3 py-5">
          <View className="flex flex-1 flex-col gap-3">
            <Text className="text-base font-medium text-foreground">Tags</Text>
            <TextInput
              className="mt-1 h-14 rounded-lg bg-[#FFF4F2] px-5 text-foreground placeholder:text-[#63707C]"
              placeholder="Add tags"
              value={tag}
              onChangeText={(text) => setTag(text)}
            />
          </View>
          <Pressable
            onPress={() => {
              setTags([...tags, tag]);
              setTag('');
            }}
            className="flex items-center justify-center rounded-full bg-primary px-6 py-2">
            <Text className="text-base font-semibold text-white">Add</Text>
          </Pressable>
        </View>

        <View className="flex w-full flex-1 flex-row gap-2">
          {tags.map((tag, index) => (
            <View
              key={index}
              className="relative flex items-center justify-center rounded-full bg-primary/40 px-8 py-3">
              <Text>{tag}</Text>
              <Pressable
                onPress={() => {
                  setTags(tags.filter((t, c) => t !== tag && c !== index));
                }}
                className="absolute -right-2 -top-2 rounded-full bg-primary p-1">
                <X size={16} color={'#FFF4F2'} />
              </Pressable>
            </View>
          ))}
        </View>

        <View className="mt-5">
          <Text className="mb-5 text-lg font-medium text-[#313131]">Organizer Details</Text>
          <Text className="text-base font-medium text-foreground">Organizer Name</Text>
          <TextInput
            className="mt-1 h-14 rounded-lg bg-[#FFF4F2] px-5 text-foreground placeholder:text-[#63707C]"
            placeholder="Enter name"
          />
        </View>

        <View className="mt-5">
          <Text className="text-base font-medium text-foreground">Email Address</Text>
          <TextInput
            className="mt-1 h-14 rounded-lg bg-[#FFF4F2] px-5 text-foreground placeholder:text-[#63707C]"
            placeholder="Enter email address"
          />
        </View>

        <View className="mt-5">
          <Text className="text-base font-medium text-foreground">Phone Number</Text>
          <TextInput
            className="mt-1 h-14 rounded-lg bg-[#FFF4F2] px-5 text-foreground placeholder:text-[#63707C]"
            placeholder="Enter phone number"
          />
        </View>

        <View className="mt-5">
          <Text className="text-base font-medium text-foreground">
            Website <Text className="text-sm text-[#969696]">(Optional)</Text>
          </Text>
          <TextInput
            className="mt-1 h-14 rounded-lg bg-[#FFF4F2] px-5 text-foreground placeholder:text-[#63707C]"
            placeholder="Enter address"
          />
        </View>

        <Pressable className="mt-10 flex w-full items-center rounded-full bg-primary py-4">
          <Text className="text-lg font-medium text-white">Create</Text>
        </Pressable>
      </ScrollView>
    </Layout>
  );
}
