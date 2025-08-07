import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import { Calendar, ChevronDown, ChevronUp, Clock3, MapPin } from 'lucide-react-native';
import { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

export default function Index() {
  const router = useRouter();
  const [isTripTypePickerOpen, setIsTripTypePickerOpen] = useState(false);
  const [isBudgetPickerOpen, setIsBudgetPickerOpen] = useState(false);
  const [isDurationPickerOpen, setIsDurationPickerOpen] = useState(false);
  const [pickedTripType, setPickedTripType] = useState(null);
  const [pickedBudget, setPickedBudget] = useState(null);
  const [pickedDuration, setPickedDuration] = useState(null);
  const [tripType, setTripType] = useState([
    { label: 'Solo', value: 'solo' },
    { label: 'Couple', value: 'couple' },
    { label: 'Family', value: 'family' },
    { label: 'Group', value: 'group' },
  ]);
  const [budget, setBudget] = useState([
    { label: '$50/100 day', value: 'low' },
    { label: '$100/200 day', value: 'medium' },
    { label: '$300/500 day', value: 'high' },
  ]);
  const [duration, setDuration] = useState([
    { label: '3 days', value: '3-days' },
    { label: '5 days', value: '5-days' },
    { label: '1 week', value: '1-week' },
    { label: '10 days', value: '10-days' },
    { label: '2 weeks', value: '2-weeks' },
  ]);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const onStartDateChange = (event: DateTimePickerEvent, selectedDate?: Date | undefined) => {
    console.log('Selected date:', selectedDate);
    const currentDate = selectedDate || startDate;
    setShowStartDatePicker(false); // Hide picker after selection
    setStartDate(currentDate);
  };

  const onEndDateChange = (event: DateTimePickerEvent, selectedDate?: Date | undefined) => {
    console.log('Selected date:', selectedDate);
    const currentDate = selectedDate || startDate;
    setShowEndDatePicker(false); // Hide picker after selection
    setEndDate(currentDate);
  };

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <ScrollView className="h-full w-full" contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex w-full flex-col gap-4">
          <View className="row gap-3 py-12">
            <Text className="text-2xl font-bold text-white">Where to Next?</Text>
            <Text className="font-light leading-6 text-white">
              Enter a destination or explore top picks around the world.
            </Text>
          </View>
        </View>
        <View className="h-full w-full overflow-hidden rounded-[30px] rounded-bl-none rounded-br-none bg-background py-10">
          <View className="flex flex-col gap-4 px-4">
            <View className="flex w-full items-center">
              <Text className="text-2xl font-semibold">Set Your Plan!</Text>
            </View>

            <View className="flex w-full flex-col gap-2">
              <View className="flex w-full flex-row items-center justify-start gap-2">
                <MapPin size={16} color={'#6A707C'} />
                <Text className="text-lg font-semibold text-[#575757]">Find Destination</Text>
              </View>
              <Text className="text-base text-dark-gray">Enter a city, country or attraction</Text>
              <TextInput
                className="h-14 rounded-lg bg-accent p-5 pl-5 text-foreground"
                placeholder="Enter destination"
              />
            </View>

            <View className="flex w-full flex-col gap-2" style={{ zIndex: 3000 }}>
              <Text className="text-lg font-semibold text-[#575757]">Trip Type</Text>
              <DropDownPicker
                open={isTripTypePickerOpen}
                value={pickedTripType}
                items={tripType}
                setOpen={setIsTripTypePickerOpen}
                setValue={setPickedTripType}
                setItems={setTripType}
                placeholder="Choose your trip type"
                style={{
                  backgroundColor: '#f8dcd7',
                  borderColor: '#f8dcd7',
                  flex: 1,
                  zIndex: 2000, // Higher zIndex for Trip Type
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

            <View className="flex w-full flex-col gap-2" style={{ zIndex: 2000 }}>
              <Text className="text-lg font-semibold text-[#575757]">Budget</Text>
              <DropDownPicker
                open={isBudgetPickerOpen}
                value={pickedBudget}
                items={budget}
                setOpen={setIsBudgetPickerOpen}
                setValue={setPickedBudget}
                setItems={setBudget}
                placeholder="Pick your daily budget range"
                style={{
                  backgroundColor: '#f8dcd7',
                  borderColor: '#f8dcd7',
                  flex: 1,
                  zIndex: 2000, // Lower zIndex for Budget
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

            <View className="flex w-full flex-col gap-2" style={{ zIndex: 1000 }}>
              <View className="flex w-full flex-row items-center justify-start gap-2">
                <Clock3 size={16} color={'#6A707C'} />
                <Text className="text-lg font-semibold text-[#575757]">Duration</Text>
              </View>
              <Text className="text-base text-dark-gray">How many days?</Text>
              <DropDownPicker
                open={isDurationPickerOpen}
                value={pickedDuration}
                items={duration}
                setOpen={setIsDurationPickerOpen}
                setValue={setPickedDuration}
                setItems={setDuration}
                placeholder="Select durations"
                style={{
                  backgroundColor: '#f8dcd7',
                  borderColor: '#f8dcd7',
                  flex: 1,
                  zIndex: 2000, // Higher zIndex for Trip Type
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

            <View className="flex w-full flex-col gap-2">
              <View className="flex w-full flex-row items-center justify-start gap-2">
                <Calendar size={16} color={'#6A707C'} />
                <Text className="text-lg font-semibold text-[#575757]">Travel Dates</Text>
              </View>
              <Text className="text-base text-dark-gray">Select your travel dates</Text>

              <View className="flex w-full flex-row items-center justify-between gap-4 pt-1">
                <View className="flex-1 justify-center gap-3">
                  <Text className="font-semibold text-[#575757]">Start</Text>

                  {showStartDatePicker && (
                    <DateTimePicker
                      value={startDate}
                      mode="date"
                      display="default"
                      onChange={onStartDateChange}
                    />
                  )}

                  <TouchableOpacity
                    className="flex-row items-center justify-start rounded-lg bg-accent p-3"
                    onPress={() => setShowStartDatePicker(true)}>
                    <Calendar size={20} color="#3D3D3D" />
                    <Text className="ml-2 text-base text-[#808284]">
                      {startDate.toDateString() || 'Pick a date'}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View className="flex-1 justify-center gap-3">
                  <Text className="font-semibold text-[#575757]">End</Text>

                  {showEndDatePicker && (
                    <DateTimePicker
                      value={endDate}
                      mode="date"
                      display="default"
                      onChange={onEndDateChange}
                    />
                  )}

                  <TouchableOpacity
                    className="flex-row items-center justify-start rounded-lg bg-accent p-3"
                    onPress={() => setShowEndDatePicker(true)}>
                    <Calendar size={20} color="#3D3D3D" />
                    <Text className="ml-2 text-base text-[#808284]">
                      {endDate.toDateString() || 'Pick a date'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View className="flex w-full flex-col gap-5 py-6">
              <TouchableHighlight
                onPress={() => router.push('/personalize/step5')}
                className="flex items-center justify-center rounded-full bg-primary px-4 py-4 shadow-sm">
                <Text className="text-lg font-bold text-white">Confirm</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
