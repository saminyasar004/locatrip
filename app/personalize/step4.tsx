import { useState, useRef } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import { useRouter } from 'expo-router';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import { Calendar, ChevronDown, ChevronUp, Clock3, MapPin } from 'lucide-react-native';
import axios from 'axios';
import { Toast } from 'toastify-react-native';
import { baseURL } from 'config';
import useAuthStore from 'store/authStore';

export default function Index() {
  const router = useRouter();
  const { accessToken } = useAuthStore();

  if (!accessToken) return router.replace('/auth/login');

  // ---------- State ----------
  const [planData, setPlanData] = useState({
    destination_name: '',
    latitude: null as number | null,
    longitude: null as number | null,
    trip_type: '',
    budget: '',
    startDate: '',
    endDate: '',
  });

  const [tripType, setTripType] = useState([
    { label: 'Solo', value: 'SOLO' },
    { label: 'Couple', value: 'COUPLE' },
    { label: 'Family', value: 'FAMILY' },
    { label: 'Group', value: 'GROUP' },
  ]);

  const [budget, setBudget] = useState([
    { label: '$50/100 day', value: '50-100' },
    { label: '$100/200 day', value: '100-200' },
    { label: '$300/500 day', value: '300-500+' },
  ]);

  const [duration, setDuration] = useState([
    { label: '3 days', value: '3-days' },
    { label: '5 days', value: '5-days' },
    { label: '1 week', value: '1-week' },
    { label: '10 days', value: '10-days' },
    { label: '2 weeks', value: '2-weeks' },
  ]);

  const [isTripTypePickerOpen, setIsTripTypePickerOpen] = useState(false);
  const [isBudgetPickerOpen, setIsBudgetPickerOpen] = useState(false);
  const [isDurationPickerOpen, setIsDurationPickerOpen] = useState(false);
  const [pickedDuration, setPickedDuration] = useState(null);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  // ---------- Location Autocomplete ----------
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showList, setShowList] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const searchLocation = (text: string) => {
    setQuery(text);
    setPlanData({ ...planData, destination_name: text });

    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!text || text.trim().length < 1) {
      setResults([]);
      return;
    }

    setLoading(true);
    debounceRef.current = setTimeout(async () => {
      try {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          text
        )}&addressdetails=1&limit=5`;
        const res = await fetch(url, {
          headers: {
            'User-Agent': 'locatip/1.0 (support@locatip.com)',
            'Accept-Language': 'en',
          },
        });
        const data = await res.json();
        setResults(data);
        setShowList(true);
      } catch (err) {
        console.log('Location search error:', err);
      } finally {
        setLoading(false);
      }
    }, 400);
  };

  const selectLocation = (item: any) => {
    setPlanData({
      ...planData,
      destination_name: item.display_name,
      latitude: Number(item.lat),
      longitude: Number(item.lon),
    });
    setQuery(item.display_name);
    setResults([]);
    setShowList(false);
    Keyboard.dismiss();
  };

  // ---------- Date Pickers ----------
  const onStartDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || startDate;
    setShowStartDatePicker(false);
    setStartDate(currentDate);
    setPlanData({ ...planData, startDate: currentDate.toISOString().split('T')[0] });
  };

  const onEndDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || endDate;
    setShowEndDatePicker(false);
    setEndDate(currentDate);
    setPlanData({ ...planData, endDate: currentDate.toISOString().split('T')[0] });
  };

  // ---------- Confirm ----------
  const handleConfirm = async () => {
    if (
      !planData.destination_name ||
      !planData.latitude ||
      !planData.longitude ||
      !planData.trip_type ||
      !planData.budget ||
      !planData.startDate ||
      !planData.endDate
    ) {
      Toast.error('Please fill in all fields before confirming.');
      return;
    }

    const payload = {
      destination_name: planData.destination_name,
      latitude: planData.latitude,
      longitude: planData.longitude,
      trip_type: planData.trip_type,
      budget: planData.budget,
      start_date: planData.startDate,
      end_date: planData.endDate,
    };

    try {
      setLoadingSubmit(true);
      const response = await axios.post(`${baseURL}/api/personalize/itineraries/create/`, payload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log('Create Itinerary Response:', response.data);

      if (response.status === 201 || response.data?.status === 201) {
        Toast.success(response.data?.message || 'Itinerary created successfully!');
        router.push('/personalize/step5');
      } else {
        Toast.error(response.data?.message || 'Failed to create itinerary.');
      }
    } catch (error: any) {
      console.log('Create itinerary error:', error?.response?.data || error);
      Toast.error(error?.response?.data?.message || 'Something went wrong.');
    } finally {
      setLoadingSubmit(false);
    }
  };

  // ---------- Render ----------
  return (
    <SafeAreaView className="flex-1 bg-primary">
      <ScrollView className="h-full w-full" contentContainerStyle={{ flexGrow: 1 }}>
        <View className="px-4">
          <View className="py-12">
            <Text className="text-2xl font-bold text-white">Where to Next?</Text>
            <Text className="mt-2 font-light leading-6 text-white">
              Enter a destination or explore top picks around the world.
            </Text>
          </View>
        </View>

        <View className="flex-1 overflow-hidden rounded-t-[30px] bg-background px-4 py-10">
          <Text className="mb-6 text-center text-2xl font-semibold">Set Your Plan!</Text>

          {/* Location Input */}
          <View className="mb-4">
            <View className="mb-1 flex-row items-center gap-2">
              <MapPin size={16} color="#6A707C" />
              <Text className="text-lg font-semibold text-[#575757]">Find Destination</Text>
            </View>
            <Text className="mb-1 text-base text-dark-gray">
              Enter a city, country or attraction
            </Text>

            <View className="relative">
              <TextInput
                className="h-14 rounded-lg bg-[#f8dcd7] px-5 text-foreground placeholder:text-[#63707C]"
                placeholder="Enter destination"
                value={query}
                onChangeText={searchLocation}
                onFocus={() => results.length && setShowList(true)}
              />
              {loading && (
                <View className="absolute right-3 top-4">
                  <ActivityIndicator size="small" color="#F86241" />
                </View>
              )}
            </View>

            {showList && results.length > 0 && (
              <View
                className="absolute z-50 mt-2 w-full rounded-lg bg-white shadow-lg"
                style={{ maxHeight: 200 }}>
                <FlatList
                  nestedScrollEnabled
                  keyboardShouldPersistTaps="handled"
                  data={results}
                  keyExtractor={(item) => item.place_id.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => selectLocation(item)}
                      className="border-b border-gray-200 p-3">
                      <Text className="text-sm text-[#333]">{item.display_name}</Text>
                    </TouchableOpacity>
                  )}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            )}
          </View>

          {/* Trip Type */}
          <View className="z-30 mb-4">
            <Text className="mb-1 text-lg font-semibold text-[#575757]">Trip Type</Text>
            <DropDownPicker
              open={isTripTypePickerOpen}
              value={planData.trip_type}
              items={tripType}
              setOpen={setIsTripTypePickerOpen}
              setValue={(callback) =>
                setPlanData({
                  ...planData,
                  trip_type: callback(planData.trip_type),
                })
              }
              setItems={setTripType}
              placeholder="Choose your trip type"
              style={{ backgroundColor: '#f8dcd7', borderColor: '#f8dcd7' }}
              dropDownContainerStyle={{
                backgroundColor: '#fff',
                borderColor: '#fff',
              }}
              ArrowDownIconComponent={() => <ChevronDown size={20} color="#6E6E6E" />}
              ArrowUpIconComponent={() => <ChevronUp size={20} color="#6E6E6E" />}
            />
          </View>

          {/* Budget */}
          <View className="z-20 mb-4">
            <Text className="mb-1 text-lg font-semibold text-[#575757]">Budget</Text>
            <DropDownPicker
              open={isBudgetPickerOpen}
              value={planData.budget}
              items={budget}
              setOpen={setIsBudgetPickerOpen}
              setValue={(callback) =>
                setPlanData({
                  ...planData,
                  budget: callback(planData.budget),
                })
              }
              setItems={setBudget}
              placeholder="Pick your daily budget range"
              style={{ backgroundColor: '#f8dcd7', borderColor: '#f8dcd7' }}
              dropDownContainerStyle={{
                backgroundColor: '#fff',
                borderColor: '#fff',
              }}
              ArrowDownIconComponent={() => <ChevronDown size={20} color="#6E6E6E" />}
              ArrowUpIconComponent={() => <ChevronUp size={20} color="#6E6E6E" />}
            />
          </View>

          {/* Duration */}
          <View className="z-10 mb-4">
            <View className="mb-1 flex-row items-center gap-2">
              <Clock3 size={16} color="#6A707C" />
              <Text className="text-lg font-semibold text-[#575757]">Duration</Text>
            </View>
            <DropDownPicker
              open={isDurationPickerOpen}
              value={pickedDuration}
              items={duration}
              setOpen={setIsDurationPickerOpen}
              setValue={setPickedDuration}
              setItems={setDuration}
              placeholder="Select duration"
              style={{ backgroundColor: '#f8dcd7', borderColor: '#f8dcd7' }}
              dropDownContainerStyle={{
                backgroundColor: '#fff',
                borderColor: '#fff',
              }}
              ArrowDownIconComponent={() => <ChevronDown size={20} color="#6E6E6E" />}
              ArrowUpIconComponent={() => <ChevronUp size={20} color="#6E6E6E" />}
            />
          </View>

          {/* Travel Dates */}
          <View className="mb-6">
            <View className="mb-1 flex-row items-center gap-2">
              <Calendar size={16} color="#6A707C" />
              <Text className="text-lg font-semibold text-[#575757]">Travel Dates</Text>
            </View>
            <Text className="mb-2 text-base text-dark-gray">Select your travel dates</Text>

            <View className="flex-row justify-between gap-4">
              {/* Start */}
              <View className="flex-1">
                <Text className="mb-1 font-semibold text-[#575757]">Start</Text>
                {showStartDatePicker && (
                  <DateTimePicker
                    value={startDate}
                    mode="date"
                    display="default"
                    onChange={onStartDateChange}
                  />
                )}
                <TouchableOpacity
                  className="flex-row items-center rounded-lg bg-[#f8dcd7] p-3"
                  onPress={() => setShowStartDatePicker(true)}>
                  <Calendar size={20} color="#3D3D3D" />
                  <Text className="ml-2 text-base text-[#808284]">{startDate.toDateString()}</Text>
                </TouchableOpacity>
              </View>

              {/* End */}
              <View className="flex-1">
                <Text className="mb-1 font-semibold text-[#575757]">End</Text>
                {showEndDatePicker && (
                  <DateTimePicker
                    value={endDate}
                    mode="date"
                    display="default"
                    onChange={onEndDateChange}
                  />
                )}
                <TouchableOpacity
                  className="flex-row items-center rounded-lg bg-[#f8dcd7] p-3"
                  onPress={() => setShowEndDatePicker(true)}>
                  <Calendar size={20} color="#3D3D3D" />
                  <Text className="ml-2 text-base text-[#808284]">{endDate.toDateString()}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Confirm */}
          <TouchableHighlight
            onPress={handleConfirm}
            underlayColor="#f1583d"
            className="flex items-center justify-center rounded-full bg-primary py-4 shadow-sm">
            {loadingSubmit ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text className="text-lg font-bold text-white">Confirm</Text>
            )}
          </TouchableHighlight>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
