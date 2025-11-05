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

export default function Index() {
  const router = useRouter();
  const { preferenceList, fetchAllPreferences, createPreference, isLoading, error } =
    usePersonalizeStore();
  const [count, setCount] = useState(0);
  const [selectedPreferenceId, setSelectedPreferenceId] = useState<number[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  // const [personalizeItems, setPersonalizeItems] = useState<PersonalizeItemProps[]>([
  //   { id: 1, title: 'Hiking & Trekking', isChecked: false },
  //   { id: 2, title: 'Art', isChecked: false },
  //   { id: 3, title: 'Animals', isChecked: false },
  //   { id: 4, title: 'Mountaineering', isChecked: false },
  //   { id: 5, title: 'Solo Adventure', isChecked: false },
  //   { id: 7, title: 'Local Festivals & Events', isChecked: false },
  //   { id: 6, title: 'Food & Drink', isChecked: false },
  //   { id: 8, title: 'Swimming', isChecked: false },
  //   { id: 9, title: 'Sunset Cruises', isChecked: false },
  //   { id: 10, title: 'Romantic Resorts', isChecked: false },
  //   { id: 11, title: 'Luxury Hotels & Resorts', isChecked: false },
  //   { id: 12, title: 'Historical Site Visits', isChecked: false },
  //   { id: 13, title: 'Religious and Cultural Festivals', isChecked: false },
  //   { id: 14, title: 'Organic Food Markets', isChecked: false },
  //   { id: 15, title: 'Green Hotels', isChecked: false },
  // ]);

  // const [personalizeItems, setPersonalizeItems] = useState<PreferenceProps[]>([]);

  useEffect(() => {
    fetchAllPreferences();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchAllPreferences();
    setRefreshing(false);
  }, [fetchAllPreferences]);

  const addPreferenceToList = (item: PreferenceProps) => {
    setSelectedPreferenceId((prevSelectedPreferenceId) => [...prevSelectedPreferenceId, item.id]);
    setCount((prevCount) => (item ? prevCount + 1 : prevCount - 1));
  };

  const removePreferenceFromList = (item: PreferenceProps) => {
    setSelectedPreferenceId((prevSelectedPreferenceId) =>
      prevSelectedPreferenceId.filter((id) => id !== item.id)
    );
    setCount((prevCount) => (item ? prevCount - 1 : prevCount + 1));
  };

  const handleCreatePreference = async () => {
    try {
      await createPreference(selectedPreferenceId);
      router.push('/personalize/step2');
    } catch (error: any) {
      console.log('Error occured while handling create preference form: ', error.message);
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
                    if (selectedPreferenceId.includes(item.id)) {
                      removePreferenceFromList(item);
                    } else {
                      addPreferenceToList(item);
                    }
                  }}
                  key={index}
                  className={cn(
                    'flex items-center justify-center rounded-full border px-4 py-1 shadow-sm',
                    selectedPreferenceId.includes(item.id)
                      ? 'border-primary bg-primary'
                      : 'border-dark-gray/40 bg-background'
                  )}
                  underlayColor="transparent">
                  <View className="flex w-full flex-row items-center gap-3">
                    <Text
                      className={cn(
                        'text-lg font-medium',
                        selectedPreferenceId.includes(item.id) ? 'text-white' : 'text-foreground'
                      )}>
                      {item.name}
                    </Text>
                    <Text
                      className={cn(
                        'text-lg font-medium',
                        selectedPreferenceId.includes(item.id) ? 'text-white' : 'text-foreground'
                      )}>
                      {selectedPreferenceId.includes(item.id) ? (
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
                // onPress={handlePersonalizeNext}
                className="flex w-full items-center justify-center rounded-full bg-primary p-3 shadow-sm">
                <Text className="text-lg font-bold text-white">Next ({count})</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
