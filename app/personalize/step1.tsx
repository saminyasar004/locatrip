import { useRouter } from 'expo-router';
import { Check, Plus } from 'lucide-react-native';
import { useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableHighlight, View } from 'react-native';
import { cn } from 'utils';

interface PersonalizeItemProps {
  id: number;
  title: string;
  isChecked: boolean;
}

export default function PersonalizeStep1() {
  const router = useRouter();
  const [count, setCount] = useState(0);
  const [personalizeItems, setPersonalizeItems] = useState<PersonalizeItemProps[]>([
    { id: 1, title: 'Hiking & Trekking', isChecked: false },
    { id: 2, title: 'Art', isChecked: false },
    { id: 3, title: 'Mountaineering', isChecked: false },
    { id: 4, title: 'Animals', isChecked: false },
    { id: 5, title: 'Solo Adventure', isChecked: false },
    { id: 6, title: 'Local Festivals & Events', isChecked: false },
    { id: 7, title: 'Food & Drink', isChecked: false },
    { id: 8, title: 'Swimming', isChecked: false },
    { id: 9, title: 'Camping in Nature', isChecked: false },
    { id: 10, title: 'Sunset Cruises', isChecked: false },
    { id: 11, title: 'Romantic Resorts', isChecked: false },
    { id: 12, title: 'Luxury Hotels & Resorts', isChecked: false },
    { id: 13, title: 'Architectural Sites', isChecked: false },
    { id: 14, title: 'Historical Site Visits', isChecked: false },
    { id: 15, title: 'Religious and Cultural Festivals', isChecked: false },
    { id: 16, title: 'Coastal Routes', isChecked: false },
    { id: 17, title: 'Organic Food Markets', isChecked: false },
    { id: 18, title: 'Green Hotels', isChecked: false },
  ]);

  const addItemToPersonalize = (item: PersonalizeItemProps) => {
    setPersonalizeItems((prevItems) =>
      prevItems.map((prevItem) =>
        prevItem.id === item.id ? { ...prevItem, isChecked: !prevItem.isChecked } : prevItem
      )
    );
    setCount((prevCount) => (item.isChecked ? prevCount - 1 : prevCount + 1));
  };

  return (
    <SafeAreaView className="bg-primary">
      <ScrollView className="h-full w-full" contentContainerStyle={{ flexGrow: 1 }}>
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
              {personalizeItems.map((item, index) => (
                <TouchableHighlight
                  onPress={() => addItemToPersonalize(item)}
                  key={index}
                  className={cn(
                    'flex items-center justify-center rounded-full border px-4 py-1 shadow-sm',
                    item.isChecked
                      ? 'border-primary bg-primary'
                      : 'border-dark-gray/40 bg-background'
                  )}
                  underlayColor="transparent">
                  <View className="flex w-full flex-row items-center gap-3">
                    <Text
                      className={cn(
                        'text-lg font-medium',
                        item.isChecked ? 'text-white' : 'text-foreground'
                      )}>
                      {item.title}
                    </Text>
                    <Text
                      className={cn(
                        'text-lg font-medium',
                        item.isChecked ? 'text-white' : 'text-foreground'
                      )}>
                      {item.isChecked ? (
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
                onPress={() => router.push('/personalize/step2')}
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
