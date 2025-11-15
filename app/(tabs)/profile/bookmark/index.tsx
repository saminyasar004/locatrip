import usePersonalizeStore from '@/store/personalizeStore';
import { cn } from '@/utils';
import { useRouter } from 'expo-router';
import {
  ArrowLeft,
  Calendar,
  Check,
  Heart,
  MapPin,
  Plus,
  Share2Icon,
  Star,
  Trash,
} from 'lucide-react-native';
import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Toast } from 'toastify-react-native';

export default function Index() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const {
    userPreferenceList,
    getUserPreferenceList,
    fetchAllPreferences,
    preferenceList,
    createPreference,
    deleteUserPreferences,
    isLoading,
    error,
  } = usePersonalizeStore();

  // UI States
  const [refreshing, setRefreshing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedPreferenceIdToAdd, setSelectedPreferenceIdToAdd] = useState<number[]>([]);
  const [deletePreferences, setDeletePreferences] = useState<number[]>([]);

  // Initial fetch
  useEffect(() => {
    getUserPreferenceList();
    fetchAllPreferences();

    setSelectedPreferenceIdToAdd(userPreferenceList.map((pref) => pref.preferences_id));
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([getUserPreferenceList(), fetchAllPreferences()]);
    setRefreshing(false);
  }, []);

  // Toggle selection for add/delete
  const toggleSelect = (id: number) => {
    setSelectedPreferenceIdToAdd((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleDeleteSelect = (id: number) => {
    setDeletePreferences((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Create Preferences
  const handleNextPreference = async () => {
    if (!selectedPreferenceIdToAdd.length) {
      Toast.warn('Please select at least one preference.');
      return;
    }
    setIsCreating(true);
    try {
      const response = await createPreference(selectedPreferenceIdToAdd);
      if (response.status === 200) {
        Toast.success(response.data?.message || 'Preferences created successfully!');
        setIsVisible(false);
        await getUserPreferenceList();
        setSelectedPreferenceIdToAdd([]);
      }
    } catch (err: any) {
      Toast.error(err?.message || 'Failed to create preferences.');
    } finally {
      setIsCreating(false);
    }
  };

  // Delete Preferences
  const handleDeletePreference = async () => {
    if (!deletePreferences.length) {
      Toast.warn('Please select at least one preference to delete.');
      return;
    }
    try {
      const response = await deleteUserPreferences(deletePreferences);
      if (response.status === 200) {
        Toast.success(response.data?.message || 'Preferences deleted successfully!');
        setIsDeleting(false);
        setDeletePreferences([]);
        await getUserPreferenceList();
      }
    } catch (err: any) {
      Toast.error(err?.message || 'Failed to delete preferences.');
    }
  };

  return (
    <View className="flex-1 bg-[#FBFEFE]" style={{ paddingTop: insets.top }}>
      <ScrollView
        className="h-full flex-1 bg-[#FBFEFE]"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            progressViewOffset={80}
            onRefresh={onRefresh}
            colors={['#F86241']}
          />
        }
        contentContainerStyle={{ paddingBottom: 0, paddingHorizontal: 20 }}>
        {/* Header */}
        <View className="mb-3 flex-row items-center gap-3">
          <Pressable onPress={() => router.back()}>
            <ArrowLeft size={24} color="#63707C" />
          </Pressable>
          <Text className="text-lg font-semibold text-[#313131]">Bookmark</Text>
        </View>

        {/* Refresh & Error */}
        {error && (
          <View className="items-center justify-center py-4">
            <Text className="text-[#63707C]">{error}</Text>
          </View>
        )}

        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              progressViewOffset={80}
              onRefresh={onRefresh}
              colors={['#F86241']}
            />
          }
          contentContainerStyle={{ paddingBottom: 80 }}
          showsVerticalScrollIndicator={false}>
          {isLoading ? (
            <View className="flex-1 items-center justify-center py-20">
              <ActivityIndicator size="large" color="#F86241" />
            </View>
          ) : (
            <View className="flex w-full flex-1 flex-col gap-3 pt-4">
              <Text className="text-base font-medium text-[#313131]">
                What's Happening Around You
              </Text>

              {Array.from({ length: 2 }).map((_, index) => (
                <View
                  key={index}
                  className="flex w-full flex-row items-center justify-between gap-3 py-2">
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
              ))}

              <Text className="text-base font-medium text-[#313131]">Events</Text>

              <View className="flex h-auto w-full flex-col gap-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <Pressable
                    key={index}
                    onPress={() => router.push('/profile/event/[id]')}
                    className="mt-5 h-auto w-full rounded-lg bg-white shadow-md">
                    <View className="flex w-full flex-col gap-3 rounded-lg bg-white pb-5">
                      <View className="relative flex h-44 items-center justify-center">
                        <Image
                          source={require(`assets/event-1.jpg`)}
                          className="h-full w-full rounded-lg"
                        />
                        <Pressable className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white">
                          <Heart size={16} color={'#F86241'} />
                        </Pressable>

                        <Pressable className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white">
                          <Share2Icon size={16} color={'#F86241'} />
                        </Pressable>
                      </View>
                      <View className="flex flex-col gap-3 bg-white px-6">
                        <Text className="text-lg font-semibold">Summer Music Festival</Text>
                        <Text className="text-sm font-normal">
                          Join us for an amazing outdoor music festival featuring local and
                          international artists.
                        </Text>
                        <View className="flex w-full flex-col gap-3">
                          <View className="flex w-full flex-1 flex-row items-center gap-3">
                            <Calendar size={16} color={'#63707C'} />
                            <Text className="text-sm font-medium text-[#63707C]">
                              15/08/2024 at 18:00
                            </Text>
                          </View>

                          <View className="flex w-full flex-1 flex-row items-center gap-3">
                            <MapPin size={16} color={'#63707C'} />
                            <Text className="text-sm font-medium text-[#63707C]">
                              Central Park, Costa Rica
                            </Text>
                          </View>
                        </View>

                        <Pressable
                          onPress={() => {
                            router.push('/profile/event/[id]');
                          }}
                          className="mt-5 flex w-full items-center justify-center rounded-full border-2 border-primary bg-primary px-4 py-3 shadow-sm">
                          <View className="flex flex-row items-center gap-2">
                            <Text className="flex items-center text-lg font-bold text-white">
                              View Details
                            </Text>
                          </View>
                        </Pressable>
                      </View>
                    </View>
                  </Pressable>
                ))}
              </View>
            </View>
          )}
        </ScrollView>
      </ScrollView>
    </View>
  );
}
