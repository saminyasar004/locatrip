import usePersonalizeStore, { PreferenceProps } from 'store/personalizeStore';
import { useRouter } from 'expo-router';
import { Check, Plus } from 'lucide-react-native';
import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { cn } from 'utils';
import { Toast } from 'toastify-react-native';
import axios from 'axios';
import { baseURL } from 'config';

export default function Index() {
  const router = useRouter();
  const { preferenceList, fetchAllPreferences, createPreference, isLoading, error } =
    usePersonalizeStore();
  const [count, setCount] = useState(0);
  const [selectedPreferenceIds, setSelectedPreferenceIds] = useState<number[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetchAllPreferences();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchAllPreferences();
    setRefreshing(false);
  }, [fetchAllPreferences]);

  const addPreferenceToList = (item: PreferenceProps) => {
    setSelectedPreferenceIds((prevSelectedPreferenceId) => [...prevSelectedPreferenceId, item.id]);
    setCount((prevCount) => (item ? prevCount + 1 : prevCount - 1));
  };

  const removePreferenceFromList = (item: PreferenceProps) => {
    setSelectedPreferenceIds((prevSelectedPreferenceId) =>
      prevSelectedPreferenceId.filter((id) => id !== item.id)
    );
    setCount((prevCount) => (item ? prevCount - 1 : prevCount + 1));
  };

  const handlePersonalizeNext = async () => {
    setIsCreating(true);
    try {
      const response = await createPreference(selectedPreferenceIds);

      if (response.status === 200) {
        Toast.success(response.data?.message || 'Preferences created successfully!');
        router.push('/personalize/step2');
      } else {
        Toast.error(
          response.data?.message ||
            response.data?.error ||
            'Failed to create preferences. Please try again.'
        );
      }
    } catch (err: any) {
    } finally {
      setIsCreating(false);
    }
  };

  if (isLoading)
    return (
      <View className="h-full w-full flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#F86241" />
      </View>
    );

  return (
    <SafeAreaView className="bg-primary">
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            progressViewOffset={80}
            onRefresh={onRefresh}
            colors={['#F86241']}
          />
        }
        className="h-full w-full"
        contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex min-h-max w-full flex-col gap-4">
          <View className="row gap-3 py-12">
            <Text className="text-2xl font-bold text-white">Let's Personalize Your Adventure</Text>
            <Text className="font-light leading-6 text-white">
              Help us understand your travel style so we can create perfect itineraries just for
              you.
            </Text>
          </View>
        </View>
        <View className="h-full w-full overflow-hidden rounded-[30px] rounded-bl-none rounded-br-none bg-background py-10">
          <View className="row flex flex-col gap-4">
            <View className="flex w-full items-center">
              <Text className="text-2xl font-semibold">Choose What You Like</Text>
            </View>

            <View className="flex w-full flex-row flex-wrap items-center gap-4">
              {preferenceList.map((item, index) => (
                <TouchableHighlight
                  onPress={() => {
                    if (selectedPreferenceIds.includes(item.id)) {
                      removePreferenceFromList(item);
                    } else {
                      addPreferenceToList(item);
                    }
                  }}
                  key={index}
                  className={cn(
                    'flex items-center justify-center rounded-full border px-4 py-1 shadow-sm',
                    selectedPreferenceIds.includes(item.id)
                      ? 'border-primary bg-primary'
                      : 'border-dark-gray/40 bg-background'
                  )}
                  underlayColor="transparent">
                  <View className="flex w-full flex-row items-center gap-3">
                    <Text
                      className={cn(
                        'text-lg font-medium',
                        selectedPreferenceIds.includes(item.id) ? 'text-white' : 'text-foreground'
                      )}>
                      {item.name}
                    </Text>
                    <Text
                      className={cn(
                        'text-lg font-medium',
                        selectedPreferenceIds.includes(item.id) ? 'text-white' : 'text-foreground'
                      )}>
                      {selectedPreferenceIds.includes(item.id) ? (
                        <Check size={12} color={'#FFFFFF'} />
                      ) : (
                        <Plus size={12} color={'#0F0F0F'} />
                      )}
                    </Text>
                  </View>
                </TouchableHighlight>
              ))}
            </View>

            <View className="flex w-full items-center justify-center py-3">
              <TouchableHighlight
                onPress={handlePersonalizeNext}
                className="flex w-full items-center justify-center rounded-full bg-primary p-3 shadow-sm">
                <Text className="text-lg font-bold text-white">
                  {isCreating ? 'Creating...' : `Next (${count})`}
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
