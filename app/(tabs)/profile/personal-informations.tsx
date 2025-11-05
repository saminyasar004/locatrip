import useProfileStore from 'store/profileStore';
import Layout from 'components/layout';
import { useRouter } from 'expo-router';
import { ArrowLeft, Search, SquarePen, Star } from 'lucide-react-native';
import { useState } from 'react';
import { Image, Text, TextInput, TouchableHighlight, View } from 'react-native';

export default function Index() {
  const { updateProfile, full_name, email } = useProfileStore();
  const router = useRouter();

  const [profileData, setProfileData] = useState<{ full_name?: string; email?: string }>({});

  const updatePersonalInfo = async () => {
    console.log('Updating profile with data:', profileData);
    try {
      await updateProfile(profileData as any);
      if (!useProfileStore.getState().error) {
        console.log('Profile updated successfully!');
        router.push('/(tabs)/profile');
      }
    } catch (err: any) {
      console.log('Error occured while handling login form: ', err.message);
    }
  };

  return (
    <Layout>
      <View className="row flex h-auto min-h-full w-full flex-1 flex-col items-start">
        <View className="flex w-full flex-row items-center gap-3 bg-white">
          <TouchableHighlight onPress={() => router.back()} underlayColor={'transparent'}>
            <ArrowLeft size={24} color={'#63707C'} />
          </TouchableHighlight>

          <Text className="w-full text-lg font-semibold text-[#313131]">Personal Information</Text>
        </View>

        <View className="flex w-full flex-col gap-1 py-4">
          <View className="relative h-auto flex-row items-center justify-center py-5">
            {/* Avatar */}
            <View className="relative h-28 w-28 overflow-hidden rounded-full">
              <Image source={require('assets/avatar.jpg')} className="h-full w-full" />
            </View>
            <TouchableHighlight>
              <View className="absolute -bottom-12 -right-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                <SquarePen size={16} color="#ffffff" />
              </View>
            </TouchableHighlight>
          </View>

          <View className="my-2 flex w-full flex-col gap-2">
            <Text className="font-medium text-[#575757]">Full Name</Text>
            <View className="flex h-14 w-full flex-row items-center justify-start gap-3 rounded-lg bg-accent px-5">
              <TextInput
                className="flex-1 text-foreground placeholder:text-[#63707C]"
                placeholder="Enter your name"
                value={profileData.full_name}
                defaultValue={full_name}
                onChangeText={(text) => setProfileData({ ...profileData, full_name: text })}
              />
            </View>
          </View>

          <View className="my-2 flex w-full flex-col gap-2">
            <Text className="font-medium text-[#575757]">Email Address</Text>
            <View className="flex h-14 w-full flex-row items-center justify-start gap-3 rounded-lg bg-accent px-5">
              <TextInput
                onChangeText={(text) => setProfileData({ ...profileData, email: text })}
                value={profileData.email}
                defaultValue={email}
                className="flex-1 text-foreground placeholder:text-[#63707C]"
                placeholder="Enter your email address"
              />
            </View>
          </View>

          <View className="flex w-full items-center justify-center py-5">
            <TouchableHighlight
              onPress={updatePersonalInfo}
              className="flex w-full items-center justify-center rounded-full bg-primary p-3 shadow-sm">
              <Text className="text-lg font-bold text-white">Edit Details</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Layout>
  );
}
